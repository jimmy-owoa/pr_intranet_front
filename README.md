# Readme

Iniciar proyecto

~~~
npm install
~~~
~~~
npm run dev
~~~

server: http://localhost:8000

# Ingresar con token de usuario

url: http://localhost:8000/login?code=id_exa_encrypted

Generar `id_exa_encrypted` en `rails console`

~~~bash
InternalAuth.encrypt(id_exa)
~~~

Ejemplo:
~~~bash
u = General::User.find(9)

InternalAuth.encrypt("#{u.id_exa}")

n11mOvHie9GBQlgiI27PX3dVqxOiTwNLJ0XlEfQS7wM%3D
~~~

url: http://localhost:8000/login?code=n11mOvHie9GBQlgiI27PX3dVqxOiTwNLJ0XlEfQS7wM%3D


# Iconos SVG

https://www.flaticon.es/uicons

https://heroicons.com/
