
const log = console.log;

// структура записи в БД о файле
export interface DBFile
{
    f_id       : number; // идентификатор записи
    f_date_load: string; // дата добавления файла в систему
    f_name     : string; // имя файла
}

// определяет содержание обязательных полей БД в объекте
export function HasMinimal (object: DBFile)
{
    log(`  - > D-Files : has minimal`);

    return ( 'f_date_load' in object &&
             'f_name'      in object );
}
