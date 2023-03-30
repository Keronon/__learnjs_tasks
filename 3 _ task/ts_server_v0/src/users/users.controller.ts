import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService                } from './users.service';
import { User_required               } from './users.structs';

@Controller( 'users' )
export class UsersController
{
    constructor ( private service: UsersService ) { }

    @Post()
    Create ( @Body() data: User_required )
    {
        return this.service.CreateUser( data );
    }

    @Get()
    GetAll ()
    {
        return this.service.GetUsers();
    }
}
