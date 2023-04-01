import * as bcrypt from 'bcryptjs';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DB           } from 'src/db.core';
import { User         } from 'src/structs/users.struct';
import { Registrate   } from 'src/structs/registrate.struct';
import { Profile      } from 'src/structs/profiles.struct';
import { DBFile       } from 'src/structs/files.struct';
import { UsersService } from './users.service';
import { JwtService   } from '@nestjs/jwt';
import { FilesService } from './files.service';

@Injectable()
export class ProfilesService
{
    constructor ( private userService: UsersService,
                  private jwtService : JwtService,
                  private filesService: FilesService ) {}

    async Registrate ( data: Registrate, image: any )
    {
        if ( await this.userService.GetUserByEmail( data.u_email ) )
            throw new HttpException ( `There is user with this email`, HttpStatus.BAD_REQUEST );
            
        const hashPass = await bcrypt.hash(data.u_password, 8);
        const user     = await this.userService.CreateUser( {...data, u_password: hashPass} );

        let row: Profile = (await DB.query(`
        INSERT INTO profiles (p_id_user, p_surname, p_birthday, p_gender)
        VALUES ('${ data.p_id_user }', '${ data.p_surname }', '${ data.p_birthday }', '${ data.p_gender }') RETURNING *;
        `)).rows[0];

        if (image)
        {
            row = await this.AddImage( row.p_id, image );
        }

        return this.GetToken( user );
    }

    async AddImage (p_id: number, image: any)
    {
        const file: DBFile = await this.filesService.AddFile( image, `profiles`, p_id );

        let row: Profile = (await DB.query(` UPDATE profiles SET p_id_avatar = $1 WHERE p_id = $2 RETURNING *; `, [ file.f_id, p_id ])).rows[0];
        row.p_id_avatar = file.f_name;

        return row;
    }

    async Delete ( u_id: number )
    {
        if ( await this.userService.GetUserById( u_id ) )
            throw new HttpException ( `There is not this user`, HttpStatus.BAD_REQUEST );

        return await this.userService.DeleteUser( u_id );
    }

    async GetToken (user: User)
    {
        const payload = { id: user.u_id, email: user.u_email, roles: user.roles };
        return { token: this.jwtService.sign( payload ) }
    }
}
