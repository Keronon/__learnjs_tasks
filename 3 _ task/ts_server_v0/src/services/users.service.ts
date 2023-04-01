import { HttpException, HttpStatus, Injectable   } from '@nestjs/common';
import { DB           } from 'src/db.core';
import { User         } from '../structs/users.struct';
import { Role         } from '../structs/roles.struct';
import { RolesService } from './roles.service';

const log = console.log;

@Injectable()
export class UsersService
{
    constructor (private roleService: RolesService) {}

    async CreateUser (data: User) // res : created row
    {
        const { u_email, u_password } = data;
        log(`  = > create user : ${u_email} > ${u_password}`);

        let row: User = (await DB.query(`
            INSERT INTO users (u_email, u_password) VALUES ($1, $2) RETURNING *;
            `, [ u_email, u_password ])).rows[0];

        await this.AddRole(row.u_id, 2);

        const role: Role = await this.roleService.GetRoleById(2);
        row.roles = [ role.r_name ?? null ];

        log(`  - > ok`);
        return row;
    }

    async DeleteUser ( u_id: number )
    {
        await DB.query(` DELETE FROM users WHERE u_id = $1 RETURNING *; `, [ u_id ]);

        return true;
    }

    async GetUsers () // res : rows array
    {
        log(`  = > get users`);

        const rows = (await DB.query(`SELECT * FROM users`)).rows;
        const users: User[] = [];
        for (let row of rows)
        {
            let user: User = row;

            const roles: Role[] = (await DB.query(`
                SELECT r_name FROM roles WHERE r_id IN
                ( SELECT ur_id_role FROM user_roles WHERE ur_id_user = $1 );
                `, [ user.u_id ] )).rows;
            
            user.roles = [];
            for (let role of roles)
                user.roles.push(role.r_name);

            users.push(user);
        }

        log(`  - > ok`);
        return users;
    }

    async GetUserById (id: number) // res : row
    {
        log(`  = > get user by id : ${id}`);

        const user: User = (await DB.query(`SELECT * FROM users WHERE u_id = $1`, [ id ])).rows[0];
        
        const roles: Role[] = (await DB.query(`
            SELECT r_name FROM roles WHERE r_id IN
            ( SELECT ur_id_role FROM user_roles WHERE ur_id_user = $1 );
            `, [ user.u_id ] )).rows;
        
        user.roles = [];
        for (let role of roles)
            user.roles.push(role.r_name);

        log(`  - > ok`);
        return user;
    }

    async GetUserByEmail (email: string) // res : row
    {
        log(`  = > get user by email : ${email}`);

        const user: User = (await DB.query(`SELECT * FROM users WHERE u_email = $1`, [ email ])).rows[0];
        
        if (!user) return user;

        const roles: Role[] = (await DB.query(`
            SELECT r_name FROM roles WHERE r_id IN
            ( SELECT ur_id_role FROM user_roles WHERE ur_id_user = $1 );
            `, [ user.u_id ] )).rows;
        
        user.roles = [];
        for (let role of roles)
            user.roles.push(role.r_name);

        log(`  - > ok`);
        return user;
    }

    async AddRole (u_id: number, r_id: number)
    {
        const user = await this.GetUserById (u_id);
        const role = await this.roleService.GetRoleById(r_id);

        if (!user || !role)
            throw new HttpException( `Пользователь или Роль не найдены`, HttpStatus.NOT_FOUND );
        
        const user_role = (await DB.query(`
        INSERT INTO user_roles (ur_id_user, ur_id_role) VALUES ($1, $2) RETURNING *;
        `, [ user.u_id, role.r_id ])).rows[0];

        return user_role;
    }
}
