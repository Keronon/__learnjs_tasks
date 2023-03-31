import { Injectable } from '@nestjs/common';
import { DB         } from 'src/db.core';
import { Role       } from '../structs/roles.struct';

const log = console.log;

@Injectable()
export class RolesService
{
    async CreateRole (data: Role) // res : created row
    {
        const { r_name } = data;
        log(`  = > create role : ${r_name} `);

        const row: Role = (await DB.query(`
            INSERT INTO roles (r_name) VALUES ($1) RETURNING *;
            `, [ r_name ])).rows[0];

        log(`  - > ok`);
        return row;
    }

    async GetRoles () // res : rows array
    {
        log(`  = > get roles`);

        const rows: Role[] = (await DB.query(`SELECT * FROM roles`)).rows;

        log(`  - > ok`);
        return rows;
    }

    async GetRoleById (id: number) // res : row
    {
        log(`  = > get role by id ${id}`);

        const row: Role = (await DB.query(`SELECT * FROM roles WHERE r_id = $1`, [ id ])).rows[0];

        log(`  - > ok`);
        return row;
    }
}
