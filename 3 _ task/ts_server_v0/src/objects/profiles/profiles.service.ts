
const log = console.log;

// дополнительные библиотеки
import * as bcrypt from 'bcryptjs';

// собственные дополнительные элементы
import { DB, QUERYes } from 'src/db.core';

// элементы NestJS
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

// структуры БД
import { HasMinimal, Registrate } from 'src/objects/profiles/registrate.data';
import { DBFile                 } from 'src/objects/files/files.data';
import { User,    template as u_t, min_template as u_mt } from '../users/users.data';
import { Profile, template as p_t, min_template as p_mt } from 'src/objects/profiles/profiles.data';

// сервисы
import { UsersService } from '../users/users.service';
import { FilesService } from '../files/files.service';

// Сервис работы с профилями ->>

@Injectable()
export class ProfilesService
{
    // подключение сервисов
    constructor ( private userService: UsersService,
                  private filesService: FilesService ) {}

    // регистрация нового аккаунта ( пользователя + профиль )
    async RegistrateAccount ( data: Registrate, image: any )
    {
        // проверка к-ва предоставленных данных
        if ( !HasMinimal(data) )
            throw new BadRequestException(`Недостаточно данных для регистрации`);

        if (typeof(data.roles) === 'string')
            data.roles = data.roles.split( ', ' );

        // разделение данных
        let u_data: User    = u_mt;
        let p_data: Profile = p_mt;
        for (const key of Object.keys(data))
        {
            if ( key in u_t ) u_data[key] = data[key];
            else
            if ( key in p_t ) p_data[key] = data[key];
        }

        // проверка на существование пользователя с указзаным email'ом
        if ( await this.userService.GetUserByUnic( u_data ) )
            throw new HttpException ( `Уже есть пользователь, использующий такой email`, HttpStatus.BAD_REQUEST );
        
        // шифрование пароля пользователя
            // создание нового пользователя
        const hashPass = await bcrypt.hash(u_data.u_password, 8);
        const user     = await this.userService.CreateUser( {...u_data, u_password: hashPass} );

        // добавление записи о профиле в БД
        let row: Profile = (await DB.query( QUERYes.INSERT<Profile>( `profiles`, {...p_data, p_id_user: user.u_id} ) )).rows[0];

        // если был передан аватар для профиля - установить
        await this.SetAvatar( row.p_id, image );

        // возврат токена авторизации для нового пользователя
        return this.userService.GetToken( user );
    }

    // удаление аккаунта ( пользователя + профиль )
    async DeleteAccount ( u_id: number )
    {
        // проверка существования профиля, который запрошено удалить
        const user = await this.userService.GetUserById( u_id );
        if ( !user )
            throw new HttpException ( `Нет пользователя с указанным идентификатором`, HttpStatus.BAD_REQUEST );

        // удаление пользователя, связанного с профилем. профиль удалится каскадно
        return await this.userService.DeleteUser( u_id );
    }

    // получение информации о профиле по идентификатору
    async GetProfileById ( p_id: number ) // res : row
    {
        log(`  = > get profile by id : ${p_id}`);

        let profile: Profile = (await DB.query( QUERYes.SELECT( `profiles`, `p_id = ${p_id}` ) )).rows[0];
        
        profile = { ...profile, avatar_name: (await this.filesService.GetFileById( profile.p_id_avatar )).f_name };

        log(`  - > ok`);
        return profile;
    }

    // изменение аватара пользователю
    async SetAvatar ( p_id: number, image: any )
    {
        // если изображение было передано - установить аватар, если нет - удалить аватар
        let row: Profile;
        if (image)
            row = await this.AddAvatar( p_id, image );
        else
            row = await this.RemoveAvatar( p_id );
            
        return row;
    }

    // установка аватара пользователя
    private async AddAvatar ( p_id: number, image: any )
    {
        // добавление изображение в систему
        const file: DBFile = await this.filesService.AddFile( image );

        // связь изображения с профилем
        let row: Profile = (await DB.query( QUERYes.UPDATE( `profiles`, [['p_id_avatar', file.f_id]],
            `p_id = ${p_id}` ) )).rows[0];

        row.avatar_name = file.f_name;
        return row;
    }

    // удаление аватара пользователя
    private async RemoveAvatar ( p_id: number )
    {
        // отсоединение изображения от профиля
        let row: Profile = (await DB.query( QUERYes.UPDATE( `profiles`, [['p_id_avatar', null]],
        `p_id = '${p_id}'` ) )).rows[0];

        return row;
    }
}
