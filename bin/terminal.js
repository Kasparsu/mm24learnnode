function write(text) {
    process.stdout.write(text);
}

import chalk from "chalk";

write(chalk.red.bgYellow.strikethrough('DANGER!!'));
write(chalk.bgAnsi256(67)('COLOR'));
write(chalk.bgRgb(255,0,0)('COLOR'));

import inquirer from "inquirer";

let answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
    },
    {
        type: 'number',
        name: 'age',
        message: 'What is your age?',
    },
]);

console.log(`Hello ${answers.name}!!!!`);
console.log(`You are ${answers.age} years old!`);