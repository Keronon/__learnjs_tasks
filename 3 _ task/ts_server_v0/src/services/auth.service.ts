import * as bcrypt from 'bcryptjs';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User            } from 'src/structs/users.struct';
import { ProfilesService } from './profiles.service';
import { UsersService    } from './users.service';

@Injectable()
export class AuthService
{
    constructor ( private profilesService: ProfilesService, private usersService: UsersService ) {}

    async Login ( data: User )
    {
        const user = await this.ValidUser( data );
        return this.profilesService.GetToken( user );
    }

    private async ValidUser( data: User )
    {
        const user = await this.usersService.GetUserByEmail( data.u_email );

        if ( user )
        {
            if ( await bcrypt.compare( data.u_password, user.u_password ) )
                return user;
            else
                throw new UnauthorizedException( { message: `Неверный пароль` } );
        }
        throw new UnauthorizedException( { message: `Неверный email` } );
    }
}
