export function test_run()
{
    console.log();

    // [ 1.1 ]
    const StrToOwnName = (str) =>
    {
        return str.replace
        (
            /(\s*)(\w)(.*)/,    //         whitespaces, first simbol, other
            (_1, _2, _3, _4) => // all str, arg1       , arg2        , arg3
            {
                return `${_2}${_3.toUpperCase()}${_4.toLowerCase()}` ;
            }
        );
    }

    // [ 1.2 ]
    const StrCorrection = (str) =>
    {
        return str.
        replace( /^\s+/, `` ).                  // rem start whites
        replace( /\s+$/, `` ).                  // rem end   whites
        replace( /\s*([.,!?:])\s*/g, `$1 ` ).   // correct   symbols
        replace( /\s+/g, ` ` );                 // rem multi whites
    }

    // [ 1.3 ]
    const StrCountWords = (str) =>
    {
        return (str.match(/[a-z_0-9$а-я]+/ig) || []).length;
    }

    // [ 1.4 ]
    const StrCountUniqWords = (str) =>
    {
        const words = {};
        str.toLowerCase().replace(/[a-z_0-9$а-я]+/g, word => word in words ? words[word]++ : words[word] = 1);
        console.log(words);
        return Object.keys(words).length;
    }

    // = = = = = = = = = = = = =
    // = = = = = TESTS = = = = =
    // = = = = = = = = = = = = =

    console.log( `[ 1.1 ]` );
    let line_1 = `  s0Me Strang3 l!ne `;
    console.log( line_1 + `\n` + StrToOwnName(line_1) );

    console.log();

    console.log( `[ 1.2 ]` );
    let line_2 = `   Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , 
    а перед знаками их быть не должно .  
      Если есть лишние подряд идущие пробелы, они должны быть устранены.  `;
    console.log( line_2 + `\n= = =\n` + StrCorrection(line_2) );

    console.log();

    console.log( `[ 1.3 ]` );
    console.log( `[ used 1.2 line ]\n` + StrCountWords(line_2) );

    console.log();

    console.log( `[ 1.4 ]` );
    let line_4 = `Текст с дубликатами слов: слово1, слово2, Слово1, слОво2, Слово3`;
    console.log(line_4);
    console.log(StrCountUniqWords(line_4));
}
