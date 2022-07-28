const contacts = require('./contacts')

const main = async () => {
    const nama = await contacts.tulisPertanyaan('Nama: ');
    const email = await contacts.tulisPertanyaan('Email: ');
    const noHP = await contacts.tulisPertanyaan('No HP: ');

    contacts.simpanContact(nama, email, noHP);
};

main();