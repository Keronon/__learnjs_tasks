
const log = console.log;

// дополнительные библиотеки
import * as bcrypt from 'bcryptjs';

// собственные дополнительные элементы
import { DB, QUERYes } from 'src/db.core';

// элементы NestJS
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

// структуры БД
import { HasLogin, Token, User } from './users.data';
import { Role } from '../roles/roles.data';

// сервисы
import { RolesService } from '../roles/roles.service';
import { JwtService   } from '@nestjs/jwt';

// Сервис работы с пользователями ->>

@Injectable()
export class UsersService
{
    // подключение сервисов
    constructor ( private jwtService     : JwtService,
                  private roleService    : RolesService) {}
    
    // авторизация пользователя
    async Login ( data: User )
    {
        log(`  - > S-Users : login`);

        const user = await this.LoginValid( data ); // проверка существования пользователя
        return this.GetToken( user );               // выдача токена авторизации
    }

    // проверка данных авторизации
    private async LoginValid( data: User )
    {
        log(`  - > S-Users : valid`);

        // получение поля для авторизации
        const field = HasLogin(data);

        // поиск пользователя в БД по email'у
        let user = await this.GetUserByUnic( data );

        // если пользователь найден
        if ( user )
        {
            // проверка корректности пароля
            if ( await bcrypt.compare( data.u_password, user.u_password ) )
                return user;
            else
                throw new UnauthorizedException( { message: `Неверный пароль` } );
        }
        throw new UnauthorizedException( { message: `Неверный email` } );
    }

    // получение токена авторизации
    async GetToken (user: User)
    {
        log(`  - > S-Users : get token`);

        const payload: Token = user;
        return { token: this.jwtService.sign( payload ) }
    }

    // Создание нового пользователя
    async CreateUser (data: User)
    {
        log(`  - > S-Users : create user`);

        // выделение ролей
        const roles = data.roles;
        delete data.roles;

        // добавление пользователя в БД
        let row: User = (await DB.query( QUERYes.INSERT<User>( `users`, data ) )).rows[0];

        if ( roles && roles.length > 0 )
            for (let role of roles)
                // добавление указанных ролей пользователю
                await this.AddRole(row.u_id, role);
        else
            // добавление стандартной роли пользователю
            await this.AddRole(row.u_id, `user`);

        // вписывание названия роли в возвращаемое значение
        row.roles = ( roles && roles.length > 0 ) ? roles : [ `user` ];
        return row;
    }

    // добавление роли пользователю
    async AddRole (u_id: number, r_name: string)
    {
        log(`  - > S-Users : add role`);

        const user = await this.GetUserById (u_id);            // получение информации о пользователе
        const role = await this.roleService.GetRoleByName(r_name); // получение информации о роли

        // определение, найдены ли пользователь и роль
        if (!user || !role)
            throw new HttpException( `Пользователь или Роль не найдены`, HttpStatus.NOT_FOUND );
        
        // добавление записи в перекрёстную таблицу
        const user_role = (await DB.query(
            ` INSERT INTO user_roles (ur_id_user, ur_id_role) VALUES (${user.u_id}, ${role.r_id}) RETURNING *; ` )).rows[0];

        return user_role;
    }

    // удаление пользователя
    async DeleteUser ( u_id: number )
    {
        log(`  - > S-Users : delete user`);

        await DB.query( QUERYes.DELETE( `users`, `u_id = ${u_id}` ) );
        return true;
    }

    // получение информации о всех пользователях
    async GetUsers ()
    {
        log(`  - > S-Users : get users`);

        // получение основной информации
        const rows : User[] = (await DB.query( QUERYes.SELECT( `users` ) )).rows;
        const users: User[] = [];

        // получение ролей каждого из пользователей
        for (let row of rows)
        {
            // получение списка названий ролей по идентификатору пользователя через перекрёстную таблицу
            const roles: Role[] = (await DB.query( `
                SELECT r_name FROM roles AS r
                INNER JOIN user_roles AS ur ON ur.ur_id_role = r.r_id
                WHERE ur_id_user = ${row.u_id}; ` )).rows;
            
            // запись ролей пользователю
            row.roles = [];
            for (let role of roles)
                row.roles.push(role.r_name);

            users.push(row);
        }

        return users;
    }

    // получение информации о пользователе по идентификатору
    async GetUserById (u_id: number)
    {
        log(`  - > S-Users : get user by id`);

        // получение основной информации о пользователе
        const user: User = (await DB.query( QUERYes.SELECT( `users`, `u_id = ${u_id}` ) )).rows[0];
        
        // получение названий ролей пользователя
        const roles: Role[] = (await DB.query(`
            SELECT r_name FROM roles AS r
            INNER JOIN user_roles AS ur ON ur.ur_id_role = r.r_id
            WHERE ur_id_user = ${u_id}; ` )).rows;
        
        // запись ролей пользователю
        user.roles = [];
        for (let role of roles)
            user.roles.push(role.r_name);

        return user;
    }

    // поучение информации о пользователе по уникальному полю
    async GetUserByUnic (data: User)
    {
        log(`  - > S-Users : get user by unic`);

        // определение имеющегося уникального поля и поиск по нему
        let user: User;
        if ( `u_login` in data )
            user = (await DB.query( QUERYes.SELECT( `users`, `u_login = '${data.u_login}'` ) )).rows[0];
        if ( `u_email` in data )
            user = (await DB.query( QUERYes.SELECT( `users`, `u_email = '${data.u_email}'` ) )).rows[0];
        
        if (!user) return user;

        // получение названий ролей пользователя
        const roles: Role[] = (await DB.query(`
            SELECT r_name FROM roles AS r
            INNER JOIN user_roles AS ur ON ur.ur_id_role = r.r_id
            WHERE ur_id_user = ${user.u_id}; ` )).rows;
        
        // запись ролей пользователю
        user.roles = [];
        for (let role of roles)
            user.roles.push(role.r_name);

        return user;
    }
}
