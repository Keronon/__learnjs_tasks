import { Body, Controller, Post } from '@nestjs/common';
import { User        } from 'src/structs/users.struct';
import { AuthService } from '../services/auth.service';

@Controller( 'auth' )
export class AuthController
{
    constructor ( private service: AuthService ) { }

    @Post(`/login`)
    Login ( @Body() data: User )
    {
        return this.service.Login( data );
    }
}
