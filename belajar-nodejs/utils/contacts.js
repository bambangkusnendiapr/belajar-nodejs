const fs = require('fs');

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

const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    return contact;
}

const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact)
    saveContacts(contacts)
}

const cekDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama)
}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const filterContacts = contacts.filter((contact) => contact.nama !== nama)
    saveContacts(filterContacts)
}

const updateContact = (contactBaru) => {
    // console.log(`ada${contactBaru.oldNama}yaa`);
    // if(contactBaru.oldNama == 'Apri') {
    //     console.log('sama');
    // } else {
    //     console.log('beda');
    // }
    const contacts = loadContact();
    const filterContacts = contacts.filter((contact) => contact.nama != contactBaru.oldNama)
    console.log(filterContacts, contactBaru);
    delete contactBaru.oldNama;
    filterContacts.push(contactBaru);
    saveContacts(filterContacts);    
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact}