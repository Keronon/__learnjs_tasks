export function test_run()
{
    console.log();

    class Product
    {
        constructor(name, price, quantity, description)
        {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.description = description;
        }
    }

    const Check_str = (str, command, value) =>
    {
        switch(command)
        {
        case `contains`: return str.includes(value);
        case `starts`  : return str.startsWith(value);
        case `ends`    : return str.endsWith(value);
        default        : console.log(`Check_str : def`);
        }
    }

    const Check_num = (num, filter) =>
    {
        let command, value;
        [, command, value] = filter.match(/(.+)(\d)/);
        switch(command)
        {
        case `<` : return (num <  value);
        case `=` : return (num =  value);
        case `>` : return (num >  value);
        case `<=`: return (num <= value);
        case `>=`: return (num >= value);
        default  : console.log(`Check_num : def`);
        }
    }

    const FilterProducts = (mass, filter) =>
    {
        let instructions = filter.split(`&`).map((inst) => inst.match(/[^-]+/g));
        console.log(instructions);
        return mass.filter((product) =>
        {
            let get_it = true;
            instructions.forEach((inst, i) =>
            {
                if (!get_it) return;
                switch(inst[0])
                {
                case `name`:
                case `description`:
                {
                    if (!Check_str(product[inst[0]], inst[1], inst[2])) get_it = !get_it;
                }
                break;

                case `price`:
                case `quantity`:
                {
                    if (!Check_num(product[inst[0]], inst[1])) get_it = !get_it;
                }
                break;

                default: console.log(`here isn't : ` + inst[0]);
                }
            });
            return get_it;
        });
    }

    const mass =
    [
        new Product(`p_0`, 0, 0, `d_0`),
        new Product(`p_1`, 1, 1, `d_1`),
        new Product(`p_2`, 2, 2, `d_2`),
        new Product(`p_3`, 3, 3, `d_3`),
        new Product(`p_4`, 4, 4, `d_4`),

        new Product(`p_5`, 5, 5, `d_5`),
        new Product(`p_6`, 6, 6, `d_6`),
        new Product(`p_7`, 7, 7, `d_7`),
        new Product(`p_8`, 8, 8, `d_8`),
        new Product(`p_9`, 9, 9, `d_9`)
    ];

    const filter_1 = `name-contains-_&price-=7&quantity->5&description-ends-7`;
    const filter_2 = `name-starts-p_&quantity-<=6`;

    console.log(mass);
    console.log();
    console.log(FilterProducts(mass, filter_1));
    console.log();
    console.log(FilterProducts(mass, filter_2));

}
