import { Module, forwardRef } from '@nestjs/common';
import { ProfilesService    } from '../services/profiles.service';
import { ProfilesController } from '../controllers/profiles.controller';
import { UsersModule        } from './users.module';
import { JwtModule          } from '@nestjs/jwt';
import { FilesModule } from './files.module';

@Module({
    providers  : [ ProfilesService    ],
    controllers: [ ProfilesController ],
    exports    : [ ProfilesService, JwtModule ],
    imports    : [ 
        FilesModule,
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || `pKey`,
            signOptions: {
                expiresIn: `24h`
            }
        })
    ]
})
export class ProfilesModule { }
