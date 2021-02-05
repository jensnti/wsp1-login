# Login

Installera ramverket

```bash
mkdir projektnamn
cd projektnamn
express -v pug -c sass --git
npm install
```

Installera ytterligare deps

```bash
npm install dotenv mysql
npm install nodemon --save-dev
```

Nodemon kan behövas installeras som root globalt.
```bash
sudo npm install -g nodemon
```

## Ändringar med repot

Bort med express exempel, user route.
Byte till scss istället för sass.
Nodemon till start i package.json

https://github.com/jensnti/wsp1-login/blob/360205f849ffff1e02059b140e1643d739b5b74a/app.js

## Login

Databas, importera eller skapa.

mysql> describe users;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int unsigned | NO   | PRI | NULL    | auto_increment |
| username | varchar(50)  | NO   |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
| email    | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

Password är okrypterat tillsvidare. Email används inte.

/dashboard är den skyddade routen för att testa inloggning.

/login för att logga in

### TODO

bcrypt för password
nav för att ta sig emellan sidor

remember me

## Eget arbete

* registrera ny användare
* skicka mail
* något att göra som inloggad