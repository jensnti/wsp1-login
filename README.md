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


