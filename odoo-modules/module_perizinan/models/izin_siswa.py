from odoo import fields, models, api

class Siswa(models.Model):
       _name = 'izin.siswa'

       # umum
       siswa = fields.Char(string='Siswa',required=True)
       alasan = fields.Char(string='Alasan',required=True)
       # rentang izin
       tanggal_keluar = fields.Date(string='Tanggal Keluar',required=True)
       tanggal_masuk = fields.Date(string='Tanggal Masuk',required=True)
       # dokumen pendukung
       surat_dokter = fields.Binary(string='Dokumen SKS')
       surat_izin = fields.Binary(string='Dokumen Pendukung')
       # durasi izin siswa keluar
       durasi_izin = fields.Integer(string='durasi izin', compute='_compute_durasi_izin', store=True)
       