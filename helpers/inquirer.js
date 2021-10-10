const inquirer = require('inquirer') ;
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Create task`
            },
            {
                value: '2',
                name: `${ '2.'.green } List task`
            },
            {
                value: '3',
                name: `${ '3.'.green } List completed task`
            },
            {
                value: '4',
                name: `${ '4.'.green } List pending task `
            },
            {
                value: '5',
                name: `${ '5.'.green } Complete tasks`
            },
            {
                value: '6',
                name: `${ '6.'.green } Delete tasks`
            },
            {
                value: '0',
                name: `${ '0.'.green } Exit`
            }
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('==============================='.green);
    console.log('       Select an option        '.green)
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\n Press ${ 'ENTER'.green } to continue ... \n`,
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate ( value ) {
                if ( value.length === 0 ) {
                    return 'Please input a value';
                } else {
                    return true;
                }
            }
        }
    ];
    
    const { description } = await inquirer.prompt(question);
    return description;
}

const listTaskDeleted = async ( tasks = [] ) => {
    const choices = tasks.map( ( task, index) => {
        const idx = `${ index + 1}.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.desc}`
        };
    });

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancel`
    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]
    const { id } = await inquirer.prompt(questions);
    return id;
}

const showCheckList = async ( tasks = [] ) => {
    const choices = tasks.map( ( task, index) => {
        const idx = `${ index + 1}.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`,
            checked: ( task.completed ) ? true : false
        };
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selected',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(questions);
    return ids;
}

const confirm = async ( message = '') => {
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ]
    const { ok } = await inquirer.prompt(questions);
    return ok;
}
module.exports = { 
    inquirerMenu,
    pause,
    readInput,
    listTaskDeleted,
    confirm,
    showCheckList
}