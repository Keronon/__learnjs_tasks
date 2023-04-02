
// элементы NestJS
import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

// структуры БД
import { TextBlock         } from 'src/objects/text_blocks/text_blocks.data';

// сервисы
import { TextBlocksService } from 'src/objects/text_blocks/text_blocks.service';

// вспомогательные объекты
import { FileInterceptor   } from '@nestjs/platform-express';
import { UsersGuard } from 'src/guards/users.guard';

// декораторы
import { Roles } from 'src/decorators/role.decorator';

// Сетевой контроллер текстовых блоков ->>

@UseGuards( UsersGuard ) // запуск защиты по данным пользователя
@Controller('blocks')
export class TextBlocksController
{
    // подключение сервисов
    constructor ( private blocksService: TextBlocksService ) {}

    // доступ к добавлению нового текстового блока в БД
        // определитель пришедших в запросе файлов
    @UseInterceptors( FileInterceptor( `image` ) )
    @Roles('admin') // определение допущенных к использованию ролей
    @Post()                  // путь запроса
    Add (@Body() data: TextBlock,
         @UploadedFile() image)
    {
        return this.blocksService.AddBlock(data, image);
    }
}
