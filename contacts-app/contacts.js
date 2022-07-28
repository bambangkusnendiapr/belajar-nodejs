const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//membuat folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//membuat file jika blum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    //cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if(duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar'));
        return false;
    }

    //cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid'));
            return false;
        }
    }

    //cek nomer hp
    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Nomor HP tidak valid'));
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold('makasih'));
};

module.exports = {simpanContact};