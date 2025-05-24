from odoo import http
from odoo.http import request
import json

class GuruAPI(http.Controller):

    def _make_cors_response(self, data, status=200):
        return request.make_response(
            json.dumps(data),
            headers=[
                ('Content-Type', 'application/json'),
                ('Access-Control-Allow-Origin', 'http://localhost:5173'),
                ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
                ('Access-Control-Allow-Headers', 'Content-Type'),
            ],
            status=status
        )

    @http.route('/api/guru', auth='public', type='http', methods=['GET'], csrf=False)
    def get_all_guru(self, **kwargs):
        guru_records = request.env['daftar.guru'].sudo().search([])
        data = []
        for guru in guru_records:
            data.append({
                'id': guru.id,
                'nama': guru.name,
                'nip': guru.nip,
                'tanggal_lahir': guru.tanggal_lahir.strftime('%Y-%m-%d') if guru.tanggal_lahir else None,
                'umur': guru.umur,
                'jenis_kelamin': guru.jenis_kelamin,
                'jurusan': guru.jurusan,
                'tanggal_daftar': guru.tanggal_daftar.strftime('%Y-%m-%d') if guru.tanggal_daftar else None,
                'status_verifikasi': guru.status_verifikasi,
            })
        return self._make_cors_response({'status': 200, 'data': data})

    @http.route('/api/guru/create', auth='public', type='http', methods=['POST'], csrf=False)
    def create_guru(self, **kwargs):
        try:
            data = json.loads(request.httprequest.data)
            required_fields = ['name', 'nip', 'tanggal_lahir', 'umur', 'jenis_kelamin', 'jurusan']
            for field in required_fields:
                if field not in data or data[field] in (None, ''):
                    return self._make_cors_response(
                        {'status': 400, 'error': f'Field "{field}" wajib diisi.'}, status=400
                    )

            guru = request.env['daftar.guru'].sudo().create({
                'name': data['name'],
                'nip': data['nip'],
                'tanggal_lahir': data['tanggal_lahir'],
                'umur': data['umur'],
                'jenis_kelamin': data['jenis_kelamin'],
                'jurusan': data['jurusan'],
                'tanggal_daftar': data.get('tanggal_daftar'),
                'status_verifikasi': data.get('status_verifikasi', 'pending')
            })

            return self._make_cors_response(
                {'status': 201, 'message': 'Guru berhasil dibuat', 'id': guru.id}, status=201
            )

        except Exception as e:
            return self._make_cors_response({'status': 500, 'error': str(e)}, status=500)

    @http.route('/api/guru/update/<int:guru_id>', auth='public', type='http', methods=['PUT'], csrf=False)
    def update_guru(self, guru_id, **kwargs):
        try:
            guru = request.env['daftar.guru'].sudo().browse(guru_id)
            if not guru.exists():
                return self._make_cors_response({'status': 404, 'error': 'Data guru tidak ditemukan'}, status=404)

            data = json.loads(request.httprequest.data)
            guru.write(data)
            return self._make_cors_response({'status': 200, 'message': 'Data guru berhasil diperbarui.'})

        except Exception as e:
            return self._make_cors_response({'status': 500, 'error': str(e)}, status=500)

    @http.route('/api/guru/delete/<int:guru_id>', auth='public', type='http', methods=['DELETE'], csrf=False)
    def delete_guru(self, guru_id, **kwargs):
        try:
            guru = request.env['daftar.guru'].sudo().browse(guru_id)
            if not guru.exists():
                return self._make_cors_response({'status': 404, 'error': 'Data guru tidak ditemukan'}, status=404)

            guru.unlink()
            return self._make_cors_response({'status': 200, 'message': 'Data guru berhasil dihapus.'})

        except Exception as e:
            return self._make_cors_response({'status': 500, 'error': str(e)}, status=500)

    @http.route([
        '/api/guru',
        '/api/guru/create',
        '/api/guru/update/<int:guru_id>',
        '/api/guru/delete/<int:guru_id>'
    ], auth='public', type='http', methods=['OPTIONS'], csrf=False)
    def cors_preflight(self, **kwargs):
        return request.make_response(
            "",
            headers=[
                ('Access-Control-Allow-Origin', 'http://localhost:5173'),
                ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
                ('Access-Control-Allow-Headers', 'Content-Type'),
            ]
        )
