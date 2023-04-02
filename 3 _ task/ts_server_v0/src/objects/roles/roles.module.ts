
// элементы NestJS
import { Module          } from '@nestjs/common';

// объекты этого модуля
import { RolesController } from './roles.controller';
import { RolesService    } from './roles.service';

// сторонние модули
import { JwtModule } from '@nestjs/jwt';

// Модуль работы с ролями ->>

@Module( {
    controllers: [ RolesController ],
    providers  : [ RolesService    ],
    exports    : [ RolesService, JwtModule ],
    imports    : [
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || `pKey`,
            signOptions: {
                expiresIn: `24h`
            }
        })
    ]
} )
export class RolesModule { }
