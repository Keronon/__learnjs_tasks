import { UnauthorizedException } from "@nestjs/common";

export interface Token
{
    u_id   ?: number;
    u_email : string;
    roles  ?: string[] | string;
}

export interface User extends Token
{
    u_password : string;
    u_login   ?: string;
}

// определяет содержание обязательных полей БД в объекте
export function HasMinimal (object: User)
{
    return ( 'u_email'    in object &&
             'u_password' in object );
}

// определяет содержание полей авторизации в объекте
export function HasLogin (object: User)
{
    if ( 'u_password' in object && ( 'u_email' in object || 'u_login' in object) )
        return true;

    throw new UnauthorizedException( `Недостаточно данных для авторизации` );
}

export const min_template: User = { u_email: '', u_password: '' };
export const template: User = { u_id: 0, u_email: '', u_password: '', u_login: '', roles: '' };
