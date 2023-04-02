
const log = console.log;

// собственные дополнительные элементы
import { DB, QUERYes } from 'src/db.core';

// элементы NestJS
import { Injectable } from '@nestjs/common';

// структуры БД
import { TextBlock } from 'src/objects/text_blocks/text_blocks.data';
import { DBFile    } from 'src/objects/files/files.data';

// сервисы
import { FilesService } from '../files/files.service';

// Сервис работы с текстовыми блоками ->>

@Injectable()
export class TextBlocksService
{
    // подключение сервисов
    constructor ( private filesService: FilesService ) {}

    // добавление нового блока
    async AddBlock ( data: TextBlock, image: any )
    {
        log(`  = > add text-block : ${data.tb_html_id} > ${data.tb_group}`);

        // добавление нового текстового блока в БД
        let row: TextBlock = (await DB.query( QUERYes.INSERT<TextBlock>( `text_blocks`, data ) )).rows[0];

        // если с блоком было передано изображение, то добавить его к записи
        if (image) row = await this.AddImage( row.tb_id, image );

        log(`  - > ok`);
        return row;
    }

    // добавление изображения к тектовому блоку
    async AddImage (tb_id: number, image: any)
    {
        // добавление изображения в БД
        const file: DBFile = await this.filesService.AddFile( image );

        // связывание данных об изображении с текстовым блоком
        let row: TextBlock = (await DB.query( 
            QUERYes.UPDATE( `text_blocks`, [["tb_id_image", file.f_id]], `tb_id = ${tb_id}` ) )).rows[0];
        
        // дописывание имени файла к информации о текстовом блоке
        row.image_name = file.f_name;

        return row;
    }
}
