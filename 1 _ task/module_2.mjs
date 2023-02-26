export function test_run()
{
    console.log();

    const Summ = (...to_summ) =>
    {
        let result = 0;
        to_summ.forEach((elem) => { result += elem; });
        return result;
    };

    const Subtract = (s_from, s_that) =>
    {
        return s_from - s_that;
    };

    const Multiply = (...multipliers) =>
    {
        let result = 1;
        multipliers.forEach((elem) => { result *= elem; });
        return result;
    };

    const Divide = (d_that, d_by) =>
    {
        return d_that / d_by;
    };

    const x1 = 59346872963598734258973625872349857634285634295634928763249876347852;
    const x2 = 8572034652734658342756932745634569283458563429563492876324987634785;
    const x3 = 503264635;
    const x4 = 426457;

    console.log(`x1 : ${x1}`);
    console.log(`x2 : ${x2}`);
    console.log(`x3 : ${x3}`);
    console.log(`x4 : ${x4}`);
    console.log();

    console.log(`x1 + x2 + x3 + x4 = ${Summ    (x1, x2, x3, x4)}`);
    console.log(`x1 - x2           = ${Subtract(x1, x2)        }`);
    console.log(`x1 * x2 * x3 * x4 = ${Multiply(x1, x2, x3, x4)}`);
    console.log(`x1 / x2           = ${Divide  (x1, x2)        }`);

}
