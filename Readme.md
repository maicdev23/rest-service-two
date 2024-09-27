### Servicio REST simple

    - NodeJS
    - Express
    - Sequelize
    - Supabase
---

#### Docker

    > docker build -t servicio_rest .
    > docker run --rm -it -p 4000:4000 --env-file .env --name app servicio_rest