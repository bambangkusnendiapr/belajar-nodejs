//Core Modules
//FIle System
const fs = require('fs/promises');

//menuliskan string ke file sync
// console.log(fs);
// fs.writeFileSync('test.txt', 'Hello Sync');

//menuliskan string ke file async
// fs.writeFile('test.txt', 'Hello async ya', (err) => {
//     console.log(err);
// });

//membaca isi file
// fs.readFile('test.txt', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

//Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Nama: ', (nama) => {
    rl.question('Umur: ', (umur) => {
        console.log(`nama ${nama}, umur ${umur}`);
        rl.close();
    });
});