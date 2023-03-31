import { Body, Controller, Post, Get } from '@nestjs/common';
import { Role                        } from '../structs/roles.struct';
import { RolesService                } from '../services/roles.service';

@Controller( 'roles' )
export class RolesController
{
    constructor ( private service: RolesService ) { }

    @Post()
    Create ( @Body() data: Role )
    {
        return this.service.CreateRole( data );
    }

    @Get()
    GetAll ()
    {
        return this.service.GetRoles();
    }
}
