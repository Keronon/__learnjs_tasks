import { Injectable } from '@nestjs/common';
import { DB           } from 'src/db.core';
import { TextBlock    } from 'src/structs/text_blocks.struct';
import { FilesService } from './files.service';
import { DBFile } from 'src/structs/files.struct';

const log = console.log;

@Injectable()
export class TextBlocksService
{
    constructor ( private filesService: FilesService ) {}

    async AddBlock ( data: TextBlock, image: any )
    {
        log(`  = > add text-block : ${data.tb_html_id} > ${data.tb_group}`);

        let row: TextBlock = (await DB.query(`
        INSERT INTO text_blocks (${ Object.keys(data).join(`, `) })
        VALUES (${ Object.values(data).map( (v) => `'${v}'` ).join( `, ` ) }) RETURNING *;
        `)).rows[0];

        if (image)
        {
            row = await this.AddImage( row.tb_id, image );
        }

        log(`  - > ok`);
        return row;
    }

    async AddImage (tb_id: number, image: any)
    {
        const file: DBFile = await this.filesService.AddFile( image, `text_blocks`, tb_id );

        let row: TextBlock = (await DB.query(` UPDATE text_blocks SET tb_id_image = $1 WHERE tb_id = $2 RETURNING *; `, [ file.f_id, tb_id ])).rows[0];
        row.tb_id_image = file.f_name;

        return row;
    }
}
