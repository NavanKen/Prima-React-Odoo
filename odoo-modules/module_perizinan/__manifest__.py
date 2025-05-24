{
       'name': 'PRIMA Perizinan',
       'author': 'fz-dev',
       'category': 'Security ',
       'depends':['base', 'web'],
       'data': {
             'security/ir.model.access.csv',
             'views/izin_siswa_views.xml',
             'views/menu.xml' 
       },
       # 'assets': {
       #        'web.assets_backend': [

       #        ],
       # },
       'application': True,
       'installable': True
}