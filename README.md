# sails-multitenancy-example

> Sails with [Multitenancy](http://en.wikipedia.org/wiki/Multitenancy) by using *dynamically* loaded Tenant-specific collections and their corresponding connections.

See Pull Requests:
- https://github.com/balderdashy/sails/pull/2553
- https://github.com/balderdashy/waterline/pull/787

---

## Step 1

Generate a project

```bash
sails generate new sails-multitenancy-example
```

## Step 2

Install [sails-generate-auth](https://github.com/kasperisager/sails-generate-auth):

```bash
npm install sails-generate-auth --save
```

## Step 3

Generate the authentication source code:

```bash
sails generate auth
```

### Add dependencies for [Passport](https://www.npmjs.com/package/passport) authentication

We will be using [Passport](https://www.npmjs.com/package/passport) with
[Passport-local strategy](https://github.com/jaredhanson/passport-local),
for this example app.

```
npm install --save passport
npm install --save passport-local
npm install --save validator
npm install --save bcryptjs
```

## Step 4

Configure for authentication. See https://github.com/kasperisager/sails-generate-auth#requirements

### `config/passport.js`

Setup appropriate Passport providers.

### `config/bootstrap.js`

Add following line:

```javascript
sails.services.passport.loadStrategies();
```

### `config/policies.js`

Add following line:

```javascript
'*': [ 'passport' ]
```

### `config/routes.json`

Add routes:

```javascript
'get /login': 'AuthController.login',
'get /logout': 'AuthController.logout',
'get /register': 'AuthController.register',

'post /auth/local': 'AuthController.callback',
'post /auth/local/:action': 'AuthController.callback',

'get /auth/:provider': 'AuthController.provider',
'get /auth/:provider/callback': 'AuthController.callback',
'get /auth/:provider/:action': 'AuthController.callback',
```

### `config/models.js`

If you see

```
Excuse my interruption, but it looks like this app
does not have a project-wide "migrate" setting configured yet.
(perhaps this is the first time you're lifting it with models?)

In short, this setting controls whether/how Sails will attempt to automatically
rebuild the tables/collections/sets/etc. in your database schema.
You can read more about the "migrate" setting here:
http://sailsjs.org/#/documentation/concepts/ORM/model-settings.html?q=migrate

In a production environment (NODE_ENV==="production") Sails always uses
migrate:"safe" to protect inadvertent deletion of your data.
However during development, you have a few other options for convenience:

1. safe  - never auto-migrate my database(s). I will do it myself (by hand)
2. alter - auto-migrate, but attempt to keep my existing data (experimental)
3. drop  - wipe/drop ALL my data and rebuild models every time I lift Sails

What would you like Sails to do?

info: To skip this prompt in the future, set `sails.config.models.migrate`.
info: (conventionally, this is done in `config/models.js`)

warn: ** DO NOT CHOOSE "2" or "3" IF YOU ARE WORKING WITH PRODUCTION DATA **

prompt: ?:
```

Setup migration, so the Sails warning does not appear, by adding the following line to `config/models.js`:

```javascript
migrate: 'alter'
```

## Step 5

Test that you can currently register and login.

### Start Sails server

```bash
sails lift
```

### Register
Go to http://localhost:1337/register

Example User:
- Username: `sails`
- Email: `sails@sails.com`
- Passport: `sails123`

### Login
Go to http://localhost:1337/login and login with the same information you used to register above.
