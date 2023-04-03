
const log = console.log;

// дополнительные библиотеки
import * as path from 'path';

// NestJS-конфигурация модулей
import { Module            } from "@nestjs/common";
import { ConfigModule      } from "@nestjs/config";
import { ServeStaticModule } from '@nestjs/serve-static';

// сторонние модули
import { UsersModule      } from './objects/users/users.module';
import { RolesModule      } from "./objects/roles/roles.module";
import { ProfilesModule   } from './objects/profiles/profiles.module';
import { TextBlocksModule } from "./objects/text_blocks/text_blocks.module";
import { FilesModule      } from './objects/files/files.module';

// сервисы
import { FilesService } from './objects/files/files.service';

@Module( {
    imports:
    [
        ConfigModule.forRoot( { envFilePath: `.${process.env.NODE_ENV}.env` } ),

        ServeStaticModule.forRoot( { rootPath: path.resolve( __dirname, `objects`, `loads` ) } ),
        
        UsersModule, RolesModule, ProfilesModule, TextBlocksModule, FilesModule
    ]
} )
export class AppModule
{
    constructor ( private fileService: FilesService )
    {
        log(`\n  = > M-App : construct\n`);

        // удаление несвязанных файлов
        setInterval(async () =>
        {
            for ( let file of await fileService.GetFilesUnlinked() )
                await fileService.DeleteFile( file );
        }, 1000 * 60 * 60);
    }
}
