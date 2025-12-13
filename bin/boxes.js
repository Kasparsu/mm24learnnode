import boxen from 'boxen';
import chalk from 'chalk';

// 1
console.log(
  boxen(chalk.red('UNICORN'), { padding: 1 })
);

// 2
console.log(
  boxen(
    chalk.green('UNICORN'),
    { padding: 1, margin: 1, borderStyle: 'double' }
  )
);

// 3
console.log(
  boxen(
    chalk.blue('UNICORNS LOVE RAINBOWS'),
    { title: 'MAGICAL', titleAlignment: 'center' }
  )
);

// 4
console.log(
  boxen(
    chalk.yellow.bold('HELLO'),
    { borderStyle: 'round', padding: 1 }
  )
);

// 5
console.log(
  boxen(
    chalk.magenta('FANTASY'),
    { borderStyle: 'bold', padding: 2 }
  )
);

// 6
console.log(
  boxen(
    chalk.inverse('THE END'),
    { padding: { top: 1, bottom: 1, left: 4, right: 4 } }
  )
);
