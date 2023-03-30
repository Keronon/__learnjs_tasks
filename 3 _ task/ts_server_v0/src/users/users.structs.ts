export class User_required
{
    public email: string;
    public password: string;
}

export class User extends User_required
{
    public login: string;
}
