
const log = console.log;

// элементы NestJS
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

// сервисы
import { JwtService } from "@nestjs/jwt";

// вспомогательные объекты
import { Observable } from "rxjs";
import { Reflector  } from "@nestjs/core";

// структуры БД
import { User } from "src/objects/users/users.data";

// ключи декораторов
import { ROLES_DECOR } from "src/decorators/role.decorator";
import { SELF_DECOR  } from "src/decorators/role.decorator copy";

@Injectable()
export class UsersGuard implements CanActivate
{
    constructor ( private reflector : Reflector,
                  private jwtService: JwtService ) {}

    // защита по признакам пользователя
    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
    {
        log(`  = > G-Users : can activate`);

        try
        {
            // получение данных о запросе
            const req = context.switchToHttp().getRequest();

            // получение декоратора допуска выполнения над своими данными
            const canSelf = this.reflector.getAllAndOverride<string[]>(SELF_DECOR, [
                context.getHandler(),
                context.getClass()
            ]);

            // проверка допуска выполнения над своими данными
            if ( canSelf )
            {
                // проверка авторизации
                const user = this.verify( req.headers.authorization );

                const u_id = req.params[`u_id`];
                if ( u_id && user.u_id === +u_id ) return true;
            }

            // получение декоратора допущенных ролей
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_DECOR, [
                context.getHandler(),
                context.getClass()
            ]);

            if ( !requiredRoles ) return true;

            // проверка авторизации
            const user = this.verify( req.headers.authorization );
            
            if ( typeof(user.roles) === 'string' ) throw new InternalServerErrorException( ` Ошибка типа данных в ролях пользователя ` );
            return user.roles.some( role => requiredRoles.includes(role) );
        }
        catch (e)
        {
            throw new ForbiddenException( { message: `Ошибка проверки доступа` } );
        }
    }

    verify(authHeader): User
    {
        log(`  = > G-Users : verify`);

        const [ bearer, token ] = authHeader.split(' ');
            
        if ( bearer != 'Bearer' || !token )
        {
            throw new UnauthorizedException( { message: `Пользователь не авторизован` } );
        }
            
        return this.jwtService.verify( token );
    }
}