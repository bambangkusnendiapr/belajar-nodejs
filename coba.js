function cetakNama(nama) {
    return `Hello, nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama: 'Bams',
    umur: 20,
    cetakMahasiswa() {
        return `Hallo, nama saya ${this.nama}`;
    }
}

module.exports.cetakNama = cetakNama;
module.exports.PI = PI;
module.exports.mahasiswa = mahasiswa;