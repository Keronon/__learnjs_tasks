
// элементы NestJS
import { Module } from '@nestjs/common';

// объекты этого модуля
import { UsersController } from './users.controller';
import { UsersService    } from './users.service';

// сторонние модули
import { RolesModule } from '../roles/roles.module';

// Модуль работы с пользователями ->>

@Module( {
    controllers: [ UsersController ],
    providers  : [ UsersService    ],
    exports    : [ UsersService    ],
    imports    : [ RolesModule     ]
} )
export class UsersModule { }
