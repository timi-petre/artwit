![Logo](https://i.imgur.com/xOCHf0N.png)

# Artwit

> A simple website about art

`Artwit` is a simple [Node.js](https://nodejs.org/) web application for dynamic content that includes a blog.
It was created as the basis for [Generatia Tech](https://generatiatech.ro/), but everyone is welcome to use it.
The implementation strives to be simple and free of unnecessary dependencies.

## Goals

This project aims to use a blog and add resources for the field of Art.
It is intended for everyone who wants to publish their art together with a description. Users must be logged in first, to then be able to use this blog site.
It is a simple site that can be used by anyone.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SESSION_SECRET_KEY`

`PORT_KEY`

`COOKIE_NAME_KEY`

## Run Locally

Clone the project

```bash
  git clone https://github.com/timi-petre/artwit.git
```

Go to the project directory

```bash
  cd artwit
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Screenshots

![App Screenshot](https://user-images.githubusercontent.com/12413810/201081178-79a79719-6224-4126-8d66-fb95c326f5ec.png)
![App Screenshot](https://user-images.githubusercontent.com/12413810/201081197-8b6c28d7-57d2-4667-8336-430d7d2d910f.png)
![App Screenshot](https://user-images.githubusercontent.com/12413810/201479666-096b8ea6-03e1-4c9b-aa56-87dd98467c7a.png)
![App Screenshot](https://user-images.githubusercontent.com/12413810/201479680-0d593f91-6808-4985-8a1d-935616f3de94.png)
![App Screenshot](https://user-images.githubusercontent.com/12413810/201479684-44706cdc-a611-45cd-a46d-7b5181a2a016.png)
![App Screenshot](https://user-images.githubusercontent.com/12413810/201479693-d9e08e31-7eb5-4eed-b1e4-4540c344d88d.png)
![App Screenshot](https://user-images.githubusercontent.com/12413810/201479704-6a9801dd-43e4-44df-a553-7656ed341349.png)

## Authors

-   [@timi-petre](https://github.com/timi-petre)

## Contributing

Contributions are always welcome!

The main purpose of this repository is to continue evolving this project, making it faster and easier to use. Development of Artwit happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements.

Examples of behavior that contributes to creating a positive environment include:

    1. Using welcoming and inclusive language
    2. Being respectful of differing viewpoints and experiences
    3. Gracefully accepting constructive criticism
    4. Focusing on what is best for the community
    5. Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

    1. The use of sexualized language or imagery and unwelcome sexual attention or advances
    2. Trolling, insulting/derogatory comments, and personal or political attacks
    3. Public or private harassment
    4. Publishing others’ private information, such as a physical or electronic address, without explicit permission
    5. Other conduct which could reasonably be considered inappropriate in a professional setting

Thanks to [Open Source Code of Conduct ](https://opensource.fb.com/code-of-conduct/) and [React](https://github.com/facebook/react)

## Tech Stack

**Client:** HTML, CSS, Javascript, EJS, Bootstrap

**Server:** Node, Express

**Database:** MongoDB

## Support

For support, email timoteisorin.petre@gmail.com or join my Discord channel.

## Usage/Examples

```javascript
const router = require('express').Router()
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')

const User = require('../models/User')
require('./passport')(passport)

router.use(flash())
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
)
router.use(passport.initialize())
router.use(passport.session())

module.exports = {
    authenticate(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Please log in to view this page')
        res.redirect('/login')
    },

    notAuthenticate(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/index')
        }
        next()
    },
}
```

## Documentation

[Documentation](https://linktodocumentation)

Tema: Blog despre Arta

Entitate: Articole

Campuri:

-Categorii: titlu categoriei

-Articole: titlu,imagine, descriere, id, Data Adaugarii, buton Articol(adaugare, stergere, actualizare),login,register.

<summary>
Special thanks to https://www.theartleague.org/about/
</summary>
