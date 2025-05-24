from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha512"], deprecated="auto")
hash = pwd_context.hash("prima213_module_odoo")
print(hash)
