
// элементы NestJS
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';

// структуры БД
import { Role         } from './roles.data';
import { RolesService } from './roles.service';

// вспомогательные объекты
import { UsersGuard } from 'src/guards/users.guard';

// декораторы
import { Roles } from 'src/decorators/role.decorator';

// Сетевой контроллер ролей ->>

@UseGuards( UsersGuard ) // запуск защиты по данным пользователя
@Controller( 'roles' )
export class RolesController
{
    // подключение сервисов
    constructor ( private service: RolesService ) { }

    // доступ к созданию роли
    @Roles('admin') // определение допущенных к использованию ролей
    @Post()                   // путь запроса
    Create ( @Body() data: Role )
    {
        return this.service.CreateRole( data );
    }

    // доступ к получению списка ролей
    @Roles('admin') // определение допущенных к использованию ролей
    @Get()                    // путь запроса
    GetAll ()
    {
        return this.service.GetRoles();
    }
}
