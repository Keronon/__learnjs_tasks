
// элементы NestJS
import { Module } from '@nestjs/common';

// объекты этого модуля
import { ProfilesService    } from './profiles.service';
import { ProfilesController } from './profiles.controller';

// сторонние модули
import { UsersModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';
import { RolesModule } from '../roles/roles.module';

// Модуль работы с профилями ->>

@Module({
    providers  : [ ProfilesService    ],
    controllers: [ ProfilesController ],
    exports    : [ ProfilesService    ],
    imports    : [ FilesModule, UsersModule, RolesModule ]
})
export class ProfilesModule { }
