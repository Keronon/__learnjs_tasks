
// элементы NestJS
import { Module } from '@nestjs/common';

// объекты этого модуля
import { TextBlocksController } from './text_blocks.controller';
import { TextBlocksService    } from './text_blocks.service';

// сторонние модули
import { FilesModule } from '../files/files.module';
import { RolesModule } from '../roles/roles.module';

// Модуль работы с текстовыми блоками ->>

@Module({
    controllers: [ TextBlocksController ],
    providers  : [ TextBlocksService    ],
    imports    : [ FilesModule, RolesModule ]
})
export class TextBlocksModule {}
