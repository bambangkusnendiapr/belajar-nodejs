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

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer);

    const contacts = loadContact();

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

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('List Contacts'));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(chalk.cyan.inverse.bold(contact.noHP));
    if(contact.email) {
        console.log(chalk.cyan.inverse.bold(contact.email));
    }
} 

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if(contacts.length === newContact.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));

    console.log(chalk.green.inverse.bold(`${nama} terhapus`));
}

module.exports = {simpanContact, listContact, detailContact, deleteContact};