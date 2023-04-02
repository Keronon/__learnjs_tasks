export interface Profile
{
    p_id        ?: number;
    p_id_user   ?: number;
    p_surname    : string;
    p_name      ?: string;
    p_fathername?: string;
    p_birthday   : string;
    p_gender     : string;
    p_phone     ?: string;
    p_id_avatar ?: number;
    avatar_name ?: string;
}

// определяет содержание обязательных полей БД в объекте
export function HasMinimal (object: Profile)
{
    return ( 'p_surname'  in object &&
             'p_birthday' in object &&
             'p_gender'   in object );
}

export const min_template: Profile =
{ p_surname : '', p_birthday : '', p_gender : '' };
export const template: Profile =
{ p_id : 0, p_id_user : 0, p_surname : '', p_name : '', p_fathername: '', p_birthday : '', p_gender : '', p_phone : '', p_id_avatar : 0 };
