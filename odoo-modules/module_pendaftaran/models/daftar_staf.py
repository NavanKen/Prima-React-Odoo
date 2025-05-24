from odoo import fields, models

class DaftarStaf(models.Model):
    _name = "daftar.staf"
    _description = "Data Pendaftaran Staf"

    name = fields.Char(string="Nama", required=True)
    nik = fields.Char(string="NIK")
    posisi = fields.Char(string="Posisi / Jabatan")
    umur = fields.Integer(string="Umur")
    tanggal_lahir = fields.Date(string="Tanggal Lahir")
    jenis_kelamin = fields.Selection([
        ('laki', 'Laki-laki'),
        ('perempuan', 'Perempuan')
    ], string="Jenis Kelamin")
    tanggal_daftar = fields.Date(string="Tanggal Daftar", default=fields.Date.today)
    status_verifikasi = fields.Selection([
        ('pending', 'Pending'),
        ('verified', 'Terverifikasi'),
    ], default="pending", string="Status Verifikasi")


