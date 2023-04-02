
// элементы NestJS
import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

// структуры БД
import { Registrate } from 'src/objects/profiles/registrate.data';

// сервисы
import { ProfilesService } from './profiles.service';

// вспомогательные объекты
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersGuard      } from 'src/guards/users.guard';

// декораторы
import { Roles } from 'src/decorators/role.decorator';
import { Self  } from 'src/decorators/role.decorator copy';

// Сетевой контроллер профилей ->>

@Controller('profiles')
export class ProfilesController
{
    // подключение сервисов
    constructor ( private service: ProfilesService ) { }

    // доступ к регистрации
        // определитель пришедших в запросе файлов
    @UseInterceptors( FileInterceptor( `image` ) )
    @Post(`/reg`)                     // путь запроса
    Registrate ( @Body() data: Registrate, // тело запроса
                 @UploadedFile() image )   // пришедший в запросе файл
    {
        return this.service.RegistrateAccount( data, image );
    }
    
    // доступ к удалению профиля
    @UseGuards( UsersGuard ) // запуск защиты по данным пользователя
    @Self()                            // допуск использования над своими данными
    @Roles('admin')           // определение допущенных к использованию ролей
    @Post(`/:u_id/del`)             // путь запроса
    Delete ( @Param(`u_id`) u_id: number )
    {
        return this.service.DeleteAccount( u_id );
    }

    // доступ к информации о профиле по идентификатору
    @UseGuards( UsersGuard ) // запуск защиты по данным пользователя
    @Roles('admin')           // определение допущенных к использованию ролей
    @Get(`/:id`)                  // путь запроса
    GetById ( @Param(`id`) p_id: number )
    {
        return this.service.GetProfileById( p_id );
    }

    // доступ к установке аватара профиля
        // определитель пришедших в запросе файлов
    @UseInterceptors( FileInterceptor( `image` ) )
    @UseGuards( UsersGuard ) // запуск защиты по данным пользователя
    @Post(`/:id/avatar`)          // путь запроса
    SetAvatar ( @Param(`id`) id: number, @UploadedFile() image )
    {
        return this.service.SetAvatar( id, image );
    }
}
