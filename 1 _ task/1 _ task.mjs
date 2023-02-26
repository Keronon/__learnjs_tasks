import * as M_1 from './module_1.mjs';
import * as M_2 from './module_2.mjs';
import * as M_3 from './module_3.mjs';

const mod = process.argv[process.argv.length - 1];
switch (mod)
{
    case `1`: M_1.test_run(); break;
    case `2`: M_2.test_run(); break;
    case `3`: M_3.test_run(); break;
    default : console.log(`\nhere is not module ${mod}`); break;
}
