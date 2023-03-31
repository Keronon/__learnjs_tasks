import * as bcrypt from 'bcryptjs';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User         } from 'src/structs/users.struct';
import { Registrate   } from 'src/structs/registrate.struct';
import { UsersService } from './users.service';
import { JwtService   } from '@nestjs/jwt';

@Injectable()
export class ProfilesService
{
    constructor ( private userService: UsersService,
                  private jwtService : JwtService ) {}

    async Registrate ( data: Registrate )
    {
        if ( await this.userService.GetUserByEmail( data.u_email ) )
            throw new HttpException ( `There is user with this email`, HttpStatus.BAD_REQUEST );
            
        const hashPass = await bcrypt.hash(data.u_password, 8);
        const user     = await this.userService.CreateUser( {...data, u_password: hashPass} );
        return this.GetToken( user );
    }

    async GetToken (user: User)
    {
        const payload = { id: user.u_id, email: user.u_email, roles: user.roles };
        return { token: this.jwtService.sign( payload ) }
    }
}
