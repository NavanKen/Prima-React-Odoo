from odoo import fields, models

class DaftarGuru(models.Model):
    _name = "daftar.guru"
    _description = "Data Pendaftaran Guru"

    name = fields.Char(string="Nama", required=True)
    nip = fields.Char(string="NIP")
    tanggal_lahir = fields.Date(string="Tanggal Lahir")
    umur = fields.Integer(string="Umur")
    jenis_kelamin = fields.Selection([
        ('laki', 'Laki-laki'),
        ('perempuan', 'Perempuan')
    ], string="Jenis Kelamin")
    jurusan = fields.Char(string="Jurusan")
    tanggal_daftar = fields.Date(string="Tanggal Daftar", default=fields.Date.today)
    status_verifikasi = fields.Selection([
        ('pending', 'Pending'),
        ('verified', 'Terverifikasi'),
    ], default="pending", string="Status Verifikasi")
