import inquirer from 'inquirer';

const answers = await inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?',
  },
  {
    type: 'confirm',
    name: 'student',
    message: 'Are you a student?',
  },
  {
    type: 'list',
    name: 'color',
    message: 'Choose your favorite color',
    choices: ['Red', 'Green', 'Blue'],
  },
  {
    type: 'checkbox',
    name: 'hobbies',
    message: 'Select your hobbies',
    choices: ['Music', 'Sports', 'Games', 'Coding'],
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter password',
  },
  {
    type: 'editor',
    name: 'bio',
    message: 'Write something about yourself',
  },
]);

console.log('\nRESULT:');
console.log(answers);