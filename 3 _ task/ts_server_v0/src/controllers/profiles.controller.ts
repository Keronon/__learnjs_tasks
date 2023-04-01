import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Registrate      } from 'src/structs/registrate.struct';
import { ProfilesService } from '../services/profiles.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profiles')
export class ProfilesController
{
    constructor ( private service: ProfilesService ) { }

    @Post(`/reg`)
    @UseInterceptors( FileInterceptor( `image` ) )
    Registrate ( @Body() data: Registrate,
                 @UploadedFile() image )
    {
        return this.service.Registrate( data, image );
    }
    
    @Post(`/del/:id`)
    Delete ( @Param(`id`) u_id: number )
    {
        return this.service.Delete( u_id );
    }
}
