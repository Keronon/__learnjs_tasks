import { Module, forwardRef } from '@nestjs/common';
import { AuthService    } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { ProfilesModule } from './profiles.module';
import { UsersModule    } from './users.module';

@Module({
    providers  : [ AuthService    ],
    controllers: [ AuthController ],
    exports    : [ AuthService    ],
    imports    : [
        forwardRef(() => ProfilesModule),
        forwardRef(() => UsersModule)
    ]
})
export class AuthModule {}
