import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TextBlock         } from 'src/structs/text_blocks.struct';
import { TextBlocksService } from 'src/services/text_blocks.service';
import { FileInterceptor   } from '@nestjs/platform-express';

@Controller('blocks')
export class TextBlocksController
{
    constructor ( private blocksService: TextBlocksService ) {}

    @Post()
    @UseInterceptors( FileInterceptor( `image` ) )
    Add (@Body() data: TextBlock,
         @UploadedFile() image)
    {
        return this.blocksService.AddBlock(data, image);
    }
}
