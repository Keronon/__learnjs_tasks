
const log = console.log;

// собственные дополнительные элементы
import { DB, QUERYes } from 'src/db.core';

// элементы NestJS
import { Injectable } from '@nestjs/common';

// структуры БД
import { Role } from './roles.data';

// Сервис работы с ролями ->>

@Injectable()
export class RolesService
{
    // создание роли
    async CreateRole (data: Role)
    {
        log(`  - > S-Roles : create role`);

        const row: Role = (await DB.query( QUERYes.INSERT<Role>( `roles`, data ) )).rows[0];
        return row;
    }

    // получение информации о всех ролях
    async GetRoles ()
    {
        log(`  - > S-Roles : get roles`);

        const rows: Role[] = (await DB.query( QUERYes.SELECT(`roles`) )).rows;
        return rows;
    }

    // получение информации о роли по идентификатору
    async GetRoleById (r_id: number)
    {
        log(`  - > S-Roles : get role by id`);

        const row: Role = (await DB.query( QUERYes.SELECT(`roles`, `r_id = ${r_id}`) )).rows[0];
        return row;
    }

    // получение информации о роли по названию
    async GetRoleByName (r_name: string)
    {
        log(`  - > S-Roles : get role by name`);

        const row: Role = (await DB.query( QUERYes.SELECT(`roles`, `r_name = '${r_name}'`) )).rows[0];
        return row;
    }
}
