{
    'name':'PRIMA Pendaftaran',
    'author':'fizz.devstack',
    'category':'Administrasi',
    'depends': ['base', 'web'],
    "data": [
        "security/ir.model.access.csv",
        "views/daftar_guru_views.xml",
        "views/daftar_siswa_views.xml",
        "views/daftar_staf_views.xml",
        "views/menu.xml",
    ],
    'assets': {
        'web.assets_backend': [
            'module_pendaftaran/static/src/**/*.js',
            'module_pendaftaran/static/src/**/*.xml',
            'module_pendaftaran/static/src/**/*.scss',
        ],
    },
    'images': ['static/description/icon.png'],
    'installable': True,
    'application': True
}