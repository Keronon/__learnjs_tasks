import { Injectable    } from '@nestjs/common';
import { DB            } from 'src/db.controller';
import { User_required } from './users.structs';

const log = console.log;

@Injectable()
export class UsersService
{
    async CreateUser (data: User_required) : Promise<any> // res : created row
    {
        const { email, password } = data;
        log(`  = > create user : ${email} > ${password}`);

        const newRecord = await DB.query(`
            INSERT INTO users (u_email, u_password) VALUES ($1, $2) RETURNING *;
            `, [ email, password ]);

        log(`  - > ok`);
        return newRecord.rows[0];
    }

    async GetUsers () // res : rows array
    {
        log(`  = > get users`);

        const genres = await DB.query(`SELECT * FROM users`);

        log(`  - > ok`);
        return genres.rows;
    }
}
