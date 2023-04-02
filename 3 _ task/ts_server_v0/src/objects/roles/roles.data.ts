export interface Role
{
    r_id     : number;
    r_name   : string;
    r_comment: string;
}
export function HasMinimal (object: Role)
{
    return ( 'r_name' in object );
}
