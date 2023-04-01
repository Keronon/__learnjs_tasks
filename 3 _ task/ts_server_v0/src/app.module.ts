import { Module            } from "@nestjs/common";
import { ConfigModule      } from "@nestjs/config";
import { UsersModule       } from './modules/users.module';
import { RolesModule       } from "./modules/roles.module";
import { AuthModule        } from './modules/auth.module';
import { ProfilesModule    } from './modules/profiles.module';
import { TextBlocksModule  } from "./modules/text_blocks.module";
import { FilesModule       } from './modules/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as path  from 'path';

@Module( {
    imports:
    [
        ConfigModule.forRoot( { envFilePath: `.${process.env.NODE_ENV}.env` } ),
        ServeStaticModule.forRoot( { rootPath: path.resolve( __dirname, `loads` ) } ),
        UsersModule, RolesModule, AuthModule, ProfilesModule, TextBlocksModule, FilesModule
    ]
} )
export class AppModule { }
