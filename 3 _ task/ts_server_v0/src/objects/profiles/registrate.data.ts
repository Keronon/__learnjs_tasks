
const log = console.log;

import { Profile                     } from "./profiles.data";
import { User                        } from "../users/users.data";
import { HasMinimal as HasMinUser    } from "../users/users.data";
import { HasMinimal as HasMinProfile } from "./profiles.data";

export interface Registrate extends User, Profile {}

// определяет содержание обязательных полей БД в объекте
export function HasMinimal (object: Registrate)
{
    log(`  - > D-Registrate : has minimal`);

    return ( HasMinUser(object) && HasMinProfile(object) );
}
