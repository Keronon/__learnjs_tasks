import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DB     } from 'src/db.core';
import { DBFile } from 'src/structs/files.struct';

import * as path  from 'path';
import * as fs    from 'fs';
import * as uuid  from 'uuid';


@Injectable()
export class FilesService
{
    async AddFile( file: any, table: string, table_id )
    {
        try
        {
            const f_name = uuid.v4() + '.jpg';
            const f_path = path.resolve( __dirname, '..', 'loads' );
            if ( !fs.existsSync(f_path) )
                fs.mkdirSync( f_path, { recursive: true } );

            fs.writeFileSync( path.join( f_path, f_name ), file.buffer );

            let row: DBFile = (await DB.query(`
            INSERT INTO files (f_date_load, f_ref_table, f_ref_id, f_name) VALUES ($1, $2, $3, $4) RETURNING *;
            `, [ (new Date()).toLocaleDateString('en-US'), table, table_id, f_name ] )).rows[0];

            return row;
        }
        catch (e)
        {
            throw new HttpException( `Ошибка записи файла`, HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }
}
