
const log = console.log;

// дополнительные библиотеки
import * as path from 'path';
import * as fs   from 'fs';
import * as uuid from 'uuid';

// собственные дополнительные элементы
import { DB, QUERYes } from 'src/db.core';

// элементы NestJS
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// структуры БД
import { DBFile } from 'src/objects/files/files.data';

// Сервис работы с файлами ->>

@Injectable()
export class FilesService
{
    // Добавление нового файла в БД и систему
    async AddFile( file: any )
    {
        log(`  - > S-Files : add file`);

        try
        {
            const file_name: string = file.originalname;
            const f_name = uuid.v4() + file_name.substring( file_name.lastIndexOf('.') ); // генерация имени файла
            const f_path = path.resolve( __dirname, '..', 'loads' );                                // составление пути для файла

            // если составленного пути нет - создать недостающие папки
            if ( !fs.existsSync(f_path) )
                fs.mkdirSync( f_path, { recursive: true } );

            // запись файла по составленному пути
            fs.writeFileSync( path.join( f_path, f_name ), file.buffer );

            // подготовка данных
            const dbFile: DBFile = {
                f_id       : 0,
                f_date_load: (new Date()).toLocaleDateString('en-US'),
                f_name     : f_name
            }
            delete dbFile.f_id;

            // запись информации о файле в БД
            const  row: DBFile = (await DB.query( QUERYes.INSERT<DBFile>( `files`, dbFile ) )).rows[0];
            return row;
        }
        catch (e)
        {
            throw new HttpException( `Ошибка записи файла`, HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Удаление файла из БД и системы
    async DeleteFile( file: DBFile )
    {
        log(`  - > S-Files : delete file`);

        try
        {
            // составление пути файла
            const f_path = path.resolve( __dirname, '..', 'loads' );

            // удаление файла из системы
            fs.rmSync( path.join( f_path, file.f_name ) );

            // удаление файла из БД
            let row: DBFile = (await DB.query(QUERYes.DELETE( `files`, `f_id = ${file.f_id}` ) )).rows[0];
            return row;
        }
        catch (e)
        {
            throw new HttpException( `Ошибка удаления файла`, HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }
    
    // Получение информации о файле по идентификатору
    async GetFileById ( f_id: number )
    {
        log(`  - > S-Files : get file by id`);

        const row: DBFile = (await DB.query(QUERYes.SELECT( `files`, `f_id = ${f_id}` ) )).rows[0];
        return row;
    }
    
    // Получение информации о файлах на которые нет ссылок
    async GetFilesUnlinked ()
    {
        log(`  - > S-Files : get files unlinked`);

        const rows: DBFile[] = (await DB.query( `
            SELECT f_id, f_date_load, f_name FROM files
            LEFT JOIN profiles    ON f_id = p_id_avatar
            LEFT JOIN text_blocks ON f_id = tb_id_image;
        ` )).rows;
        return rows;
    }
}
