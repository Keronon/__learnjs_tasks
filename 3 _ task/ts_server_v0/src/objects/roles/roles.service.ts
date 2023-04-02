
const log = console.log;

// собственные дополнительные элементы
import { DB, QUERYes         } from 'src/db.core';

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
        log(`  = > create role : ${data.r_name} `);

        const row: Role = (await DB.query( QUERYes.INSERT<Role>( `roles`, data ) )).rows[0];

        log(`  - > ok`);
        return row;
    }

    // получение информации о всех ролях
    async GetRoles ()
    {
        log(`  = > get roles`);

        const rows: Role[] = (await DB.query( QUERYes.SELECT(`roles`) )).rows;

        log(`  - > ok`);
        return rows;
    }

    // получение информации о роли по идентификатору
    async GetRoleById (r_id: number)
    {
        log(`  = > get role by id ${r_id}`);

        const row: Role = (await DB.query( QUERYes.SELECT(`roles`, `r_id = ${r_id}`) )).rows[0];

        log(`  - > ok`);
        return row;
    }

    // получение информации о роли по названию
    async GetRoleByName (r_name: string)
    {
        log(`  = > get role by name ${r_name}`);

        const row: Role = (await DB.query( QUERYes.SELECT(`roles`, `r_name = '${r_name}'`) )).rows[0];

        log(`  - > ok`);
        return row;
    }
}
