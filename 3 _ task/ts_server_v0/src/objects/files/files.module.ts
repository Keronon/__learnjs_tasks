
// элементы NestJS
import { Module } from '@nestjs/common';

// сервисы
import { FilesService } from './files.service';

// Модуль работы с файлами ->>

@Module({
    providers: [ FilesService ],
    exports  : [ FilesService ]
})
export class FilesModule {}
