
// элементы NestJS
import { Body, Controller, Post, Get, Param, UseGuards, Query } from '@nestjs/common';

// структуры БД
import { User } from './users.data';

// сервисы
import { UsersService } from './users.service';

// вспомогательные объекты
import { UsersGuard } from 'src/guards/users.guard';

// декораторы
import { Roles } from 'src/decorators/role.decorator';

// Сетевой контроллер пользователей ->>

@Controller( 'users' )
export class UsersController
{
    // подключение сервисов
    constructor ( private service: UsersService ) { }
    
    // доступ к авторизации
    @Post(`/login`) // путь запроса
    Login ( @Body() data: User )
    {
        return this.service.Login( data );
    }

    // доступ к получению информации о всех пользователях
    @UseGuards( UsersGuard ) // запуск защиты по данным пользователя
    @Roles('admin')           // определение допущенных к использованию ролей
    @Get()                             // путь запроса
    GetAll ()
    {
        return this.service.GetUsers();
    }

    // доступ к получению информации о пользователе по идентификатору
    @UseGuards( UsersGuard ) // запуск защиты по данным пользователя
    @Roles('admin')           // определение допущенных к использованию ролей
    @Get(`/:id`)                  // путь запроса
    GetById ( @Param(`id`) u_id: number )
    {
        return this.service.GetUserById( u_id );
    }

    // доступ к добавлению роли пользователю
    @UseGuards( UsersGuard ) // запуск защиты по данным пользователя
    @Roles('admin')           // определение допущенных к использованию ролей
    @Post(`/:id/role`)            // путь запроса
    AddRole ( @Param(`id`) u_id: number, @Body() data: {r_name: string} )
    {
        return this.service.AddRole( u_id, data.r_name );
    }
}
