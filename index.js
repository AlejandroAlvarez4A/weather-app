const { readInput } = require("./helpers/inquirer");

const main = async () => {
    const text = await readInput('Hola: ');
    console.log( text );
}

main(); 