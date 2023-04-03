
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
        log(`  - > S-Blocks : add block`);

        // добавление нового текстового блока в БД
        let row: TextBlock = (await DB.query( QUERYes.INSERT<TextBlock>( `text_blocks`, data ) )).rows[0];

        // если с блоком было передано изображение, то добавить его к записи
        if (image) row = await this.AddImage( row.tb_id, image );
        return row;
    }

    // добавление изображения к тектовому блоку
    async AddImage (tb_id: number, image: any)
    {
        log(`  - > S-Blocks : add image`);

        // добавление изображения в БД
        const file: DBFile = await this.filesService.AddFile( image );
        
        // связывание данных об изображении с текстовым блоком
        let row: TextBlock = (await DB.query( 
            QUERYes.UPDATE( `text_blocks`, [["tb_id_image", file.f_id]], `tb_id = ${tb_id}` ) )).rows[0];
        
        // дописывание имени файла к информации о текстовом блоке
        row.image_name = file.f_name;
        return row;
    }

    // получение информации о текстовых блоках с указанными группами
    async GetTextBlocksByGroups ( data: { groups: string[] } )
    {
        log(`  - > S-Blocks : get blocks by groups`);

        const IN = data.groups.map( ( group ) => `'${group}'` ).join(`, `);
        const hold_tb: TextBlock[] = (await DB.query( QUERYes.SELECT( `text_blocks`, `tb_group IN (${IN})` ) )).rows;

        let text_blocks: TextBlock[] = [];
        for (let text_block of hold_tb)
        {
            if ( text_block.tb_id_image )
                text_block.image_name = (await this.filesService.GetFileById( text_block.tb_id_image )).f_name;
            text_blocks.push( text_block );
        }

        return text_blocks;
    }
}
