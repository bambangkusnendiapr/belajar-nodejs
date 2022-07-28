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
}).demandCommand();

//menampilkan kontak
yargs.command({
    command: 'list',
    describe: 'Menampilkan kontak',
    handler() {
        contacts.listContact();
    }
})

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
});

yargs.command({
    command: 'delete',
    describe: 'Menghapus kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
});

yargs.parse()