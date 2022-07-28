// Contact Apps Bagian 2
const yargs = require('yargs');
const contacts = require('./contacts');

//mengambil argumen dari command line
yargs.command({
    command: 'add',
    describe: 'Tambah', //keterangan
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true, //mandatory
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false, //mandatory
            type: 'string'
        },
        noHP: {
            describe: 'Nomor HP',
            demandOption: true, //mandatory
            type: 'string'
        }
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP)
    }
})

yargs.parse()