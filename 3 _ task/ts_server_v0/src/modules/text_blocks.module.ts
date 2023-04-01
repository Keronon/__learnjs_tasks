import { Module               } from '@nestjs/common';
import { TextBlocksController } from '../controllers/text_blocks.controller';
import { TextBlocksService    } from '../services/text_blocks.service';
import { FilesModule } from './files.module';

@Module({
    controllers: [ TextBlocksController ],
    providers  : [ TextBlocksService    ],
    imports    : [ FilesModule          ]
})
export class TextBlocksModule {}
