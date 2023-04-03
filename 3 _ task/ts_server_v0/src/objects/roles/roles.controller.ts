
const log = ( text: string ) => console.log(  `${colours.fg.yellow}${text}${colours.reset}` );

// элементы NestJS
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';

// собственные дополнительные элементы
import { colours } from 'src/console.colors';

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
        log(`\n  = > C-Roles : create\n`);

        return this.service.CreateRole( data );
    }

    // доступ к получению списка ролей
    @Roles('admin') // определение допущенных к использованию ролей
    @Get()                    // путь запроса
    GetAll ()
    {
        log(`\n  = > C-Roles : get all\n`);

        return this.service.GetRoles();
    }
}
