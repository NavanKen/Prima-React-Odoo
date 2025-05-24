from odoo import http
from odoo.http import request
import json


class StafAPI(http.Controller):

    def _cors_headers(self):
        return [
            ('Access-Control-Allow-Origin', '*'),
            ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
            ('Access-Control-Allow-Headers', 'Content-Type'),
        ]

    @http.route('/api/staf', auth='public', type='http', methods=['GET', 'OPTIONS'], csrf=False)
    def get_staf(self, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())

        staf_list = request.env['daftar.staf'].sudo().search([])
        data = [{
            'id': s.id,
            'name': s.name,
            'nik': s.nik,
            'posisi': s.posisi,
            'umur': s.umur,
            'tanggal_lahir': s.tanggal_lahir.strftime('%Y-%m-%d') if s.tanggal_lahir else None,
            'jenis_kelamin': s.jenis_kelamin,
            'tanggal_daftar': s.tanggal_daftar.strftime('%Y-%m-%d') if s.tanggal_daftar else None,
            'status_verifikasi': s.status_verifikasi
        } for s in staf_list]

        response = request.make_response(
            json.dumps({'status': 200, 'data': data}),
            headers=[('Content-Type', 'application/json')] + self._cors_headers()
        )
        return response

    @http.route('/api/staf/create', auth='public', type='http', methods=['POST', 'OPTIONS'], csrf=False)
    def create_staf(self, **kwargs):
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

        required_fields = ['name', 'nik', 'posisi', 'tanggal_lahir', 'umur', 'jenis_kelamin']
        for field in required_fields:
            if field not in data or data[field] in (None, ''):
                return request.make_response(
                    json.dumps({'status': 400, 'error': f'Field "{field}" wajib diisi.'}),
                    headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                    status=400
                )

        try:
            staf = request.env['daftar.staf'].sudo().create({
                'name': data['name'],
                'nik': data['nik'],
                'posisi': data['posisi'],
                'tanggal_lahir': data['tanggal_lahir'],
                'umur': data['umur'],
                'jenis_kelamin': data['jenis_kelamin'],
                'tanggal_daftar': data.get('tanggal_daftar'),
                'status_verifikasi': data.get('status_verifikasi', 'pending')
            })

            return request.make_response(
                json.dumps({'status': 201, 'message': 'Staf berhasil dibuat', 'id': staf.id}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=201
            )
        except Exception as e:
            return request.make_response(
                json.dumps({'status': 500, 'error': str(e)}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=500
            )

    @http.route('/api/staf/update/<int:staf_id>', auth='public', type='http', methods=['PUT', 'OPTIONS'], csrf=False)
    def update_staf(self, staf_id, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())

        staf = request.env['daftar.staf'].sudo().browse(staf_id)
        if not staf.exists():
            return request.make_response(
                json.dumps({'status': 404, 'error': 'Data staf tidak ditemukan.'}),
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
            staf.write(data)
            return request.make_response(
                json.dumps({'status': 200, 'message': 'Data staf berhasil diperbarui.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers()
            )
        except Exception as e:
            return request.make_response(
                json.dumps({'status': 500, 'error': str(e)}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=500
            )

    @http.route('/api/staf/delete/<int:staf_id>', auth='public', type='http', methods=['DELETE', 'OPTIONS'], csrf=False)
    def delete_staf(self, staf_id, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return request.make_response('', headers=self._cors_headers())

        staf = request.env['daftar.staf'].sudo().browse(staf_id)
        if not staf.exists():
            return request.make_response(
                json.dumps({'status': 404, 'error': 'Data staf tidak ditemukan.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=404
            )
        try:
            staf.unlink()
            return request.make_response(
                json.dumps({'status': 200, 'message': 'Data staf berhasil dihapus.'}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers()
            )
        except Exception as e:
            return request.make_response(
                json.dumps({'status': 500, 'error': str(e)}),
                headers=[('Content-Type', 'application/json')] + self._cors_headers(),
                status=500
            )
