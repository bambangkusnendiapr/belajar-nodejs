var validator = require('validator');
var chalk = require('chalk');

// console.log(validator.isEmail('foo@bar.c'));
// console.log(validator.isMobilePhone('087885272495', 'id-ID'));
// console.log(validator.isNumeric('087885272495a'));

console.log(chalk.blue('Hello world!'));
console.log(chalk.black.bgBlue.italic('Hello world!'));

const nama = 'nendi'
const pesan = chalk`satu dua {bgRed.black tiga} empat {bgGreen.yellow lima}, nama: ${nama}`;
console.log(pesan);