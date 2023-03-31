import { Module         } from "@nestjs/common";
import { ConfigModule   } from "@nestjs/config";
import { UsersModule    } from './modules/users.module';
import { RolesModule    } from "./modules/roles.module";
import { AuthModule     } from './modules/auth.module';
import { ProfilesModule } from './modules/profiles.module';

@Module( {
    imports:
    [
        ConfigModule.forRoot( { envFilePath: `.${process.env.NODE_ENV}.env` } ),
        UsersModule, RolesModule, AuthModule, ProfilesModule
    ]
} )
export class AppModule { }
