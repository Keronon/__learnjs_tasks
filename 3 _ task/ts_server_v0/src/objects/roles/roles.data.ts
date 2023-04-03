
const log = console.log;

export interface Role
{
    r_id     : number;
    r_name   : string;
    r_comment: string;
}

export function HasMinimal (object: Role)
{
    log(`  - > D-Roles : has minimal`);

    return ( 'r_name' in object );
}
