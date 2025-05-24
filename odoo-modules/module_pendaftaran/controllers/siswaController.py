from odoo import http
from odoo.http import request
import json

class SiswaAPI(http.Controller):

    def _cors_headers(self):
        return [
            ('Access-Control-Allow-Origin', '*'),
            ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
            ('Access-Control-Allow-Headers', 'Content-Type'),
        ]

    @http.route('/api/siswa', auth='public', type='http', methods=['GET', 'OPTIONS'], csrf=False)
    def get_siswa(self, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())

        siswa_list = request.env['daftar.siswa'].sudo().search([])
        data = [{
            'id': s.id,
            'name': s.name,
            'nisn': s.nisn,
            'umur': s.umur,
            'tanggal_lahir': s.tanggal_lahir.strftime('%Y-%m-%d') if s.tanggal_lahir else None,
            'jenis_kelamin': s.jenis_kelamin,
            'asal_sekolah': s.asal_sekolah,
            'tanggal_daftar': s.tanggal_daftar.strftime('%Y-%m-%d') if s.tanggal_daftar else None,
            'status_verifikasi': s.status_verifikasi
        } for s in siswa_list]

        response = request.make_response(
            json.dumps({'status': 200, 'data': data}),
            headers=[('Content-Type', 'application/json')] + self._cors_headers()
        )
        return response

    @http.route('/api/siswa/create', auth='public', type='http', methods=['POST', 'OPTIONS'], csrf=False)
    def create_siswa(self, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())

        try:
            data = json.loads(request.httprequest.data)
        except Exception:
            return request.make_response(
                json.dumps({'status': 400, 'error': 'Request harus dalam format JSON valid.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=400
            )

        required_fields = ['name', 'nisn', 'tanggal_lahir', 'umur', 'jenis_kelamin', 'asal_sekolah']
        for field in required_fields:
            if field not in data or data[field] in (None, ''):
                return request.make_response(
                    json.dumps({'status': 400, 'error': f'Field "{field}" wajib diisi.'}),
                    headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                    status=400
                )

        try:
            siswa = request.env['daftar.siswa'].sudo().create({
                'name': data['name'],
                'nisn': data['nisn'],
                'tanggal_lahir': data['tanggal_lahir'],
                'umur': data['umur'],
                'jenis_kelamin': data['jenis_kelamin'],
                'asal_sekolah': data['asal_sekolah'],
                'tanggal_daftar': data.get('tanggal_daftar'),
                'status_verifikasi': data.get('status_verifikasi', 'pending')
            })

            return request.make_response(
                json.dumps({'status': 201, 'message': 'Siswa berhasil dibuat', 'id': siswa.id}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=201
            )
        except Exception as e:
            return request.make_response(
                json.dumps({'status': 500, 'error': str(e)}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=500
            )

    @http.route('/api/siswa/update/<int:siswa_id>', auth='public', type='http', methods=['PUT', 'OPTIONS'], csrf=False)
    def update_siswa(self, siswa_id, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())

        siswa = request.env['daftar.siswa'].sudo().browse(siswa_id)
        if not siswa.exists():
            return request.make_response(
                json.dumps({'status': 404, 'error': 'Data siswa tidak ditemukan.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=404
            )
        try:
            data = json.loads(request.httprequest.data)
        except Exception:
            return request.make_response(
                json.dumps({'status': 400, 'error': 'Request harus dalam format JSON valid.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=400
            )
        try:
            siswa.write(data)
            return request.make_response(
                json.dumps({'status': 200, 'message': 'Data siswa berhasil diperbarui.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers()
            )
        except Exception as e:
            return request.make_response(
                json.dumps({'status': 500, 'error': str(e)}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=500
            )

    @http.route('/api/siswa/delete/<int:siswa_id>', auth='public', type='http', methods=['DELETE', 'OPTIONS'], csrf=False)
    def delete_siswa(self, siswa_id, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())

        siswa = request.env['daftar.siswa'].sudo().browse(siswa_id)
        if not siswa.exists():
            return request.make_response(
                json.dumps({'status': 404, 'error': 'Data siswa tidak ditemukan.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=404
            )
        try:
            siswa.unlink()
            return request.make_response(
                json.dumps({'status': 200, 'message': 'Data siswa berhasil dihapus.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers()
            )
        except Exception as e:
            return request.make_response(
                json.dumps({'status': 500, 'error': str(e)}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=500
            )


