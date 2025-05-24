from odoo import fields, models

class DaftarSiswa(models.Model):
    _name = "daftar.siswa"
    _description = "Data Pendaftaran Siswa"

    name = fields.Char(string="Nama Lengkap", required=True)
    nisn = fields.Char(string="NISN")
    umur = fields.Integer(string="Umur")
    tanggal_lahir = fields.Date(string="Tanggal Lahir")
    jenis_kelamin = fields.Selection([
        ('laki', 'Laki-laki'),
        ('perempuan', 'Perempuan')
    ], string="Jenis Kelamin")
    asal_sekolah = fields.Char(string="Asal Sekolah")
    tanggal_daftar = fields.Date(string="Tanggal Daftar", default=fields.Date.today)
    status_verifikasi = fields.Selection([
        ('pending', 'Pending'),
        ('verified', 'Terverifikasi'),
    ], default="pending", string="Status Verifikasi")
