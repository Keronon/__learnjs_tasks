import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService    } from '../services/users.service';
import { AuthModule      } from './auth.module';
import { ProfilesModule } from './profiles.module';
import { RolesModule } from './roles.module';

@Module( {
    controllers: [ UsersController ],
    providers  : [ UsersService    ],
    exports    : [ UsersService    ],
    imports    : [
        RolesModule,
        forwardRef(() => AuthModule),
        forwardRef(() => ProfilesModule)
    ]
} )
export class UsersModule { }
