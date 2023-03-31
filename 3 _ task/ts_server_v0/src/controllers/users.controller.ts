import { Body, Controller, Post, Get, Param, UseGuards, Query } from '@nestjs/common';
import { User         } from '../structs/users.struct';
import { UsersService } from '../services/users.service';
import { AuthGuard    } from 'src/guards/auth.guard';
import { Roles        } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards( AuthGuard )
@Controller( 'users' )
export class UsersController
{
    constructor ( private service: UsersService ) { }

    @Post()
    Create ( @Body() data: User )
    {
        return this.service.CreateUser( data );
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    GetAll ()
    {
        return this.service.GetUsers();
    }

    @Get(`/:id`)
    GetById ( @Param(`id`) id: number )
    {
        return this.service.GetUserById( id );
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post(`/:id/role`)
    AddRole ( @Param(`id`) u_id: number, @Body() data: {r_id: number} )
    {
        return this.service.AddRole( u_id, data.r_id );
    }
}
