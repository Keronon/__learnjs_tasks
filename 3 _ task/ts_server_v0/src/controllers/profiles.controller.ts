import { Body, Controller, Post } from '@nestjs/common';
import { Registrate      } from 'src/structs/registrate.struct';
import { ProfilesService } from '../services/profiles.service';

@Controller('profiles')
export class ProfilesController
{
    constructor ( private service: ProfilesService ) { }

    @Post(`/reg`)
    Registrate ( @Body() data: Registrate )
    {
        return this.service.Registrate( data );
    }
}
