![Logo](https://i.imgur.com/Z7ci0uP.png)

# Artwit

> A simple website about art

`Artwit` is a simple [Node.js](https://nodejs.org/) web application for dynamic content that includes a blog.
It was created as the basis for [Generatia Tech](https://generatiatech.ro/), but everyone is welcome to use it.
The implementation strives to be simple and free of unnecessary dependencies.

## Goals

This project aims to use a blog and add resources for the field of Art.
It is intended for everyone who wants to publish their art together with a description. Users must be logged in first, to then be able to use this blog site.
It is a simple site that can be used by anyone.

## Features

-   An easy way to create a simple, secure website with a blog
-   Support for text-based and photo-based blog formats
-   Easy authoring in HTML, Markdown (with code formatting), or JSON
-   Ordering of posts by publish date or content date
-   Easy customization of site layout and formatting

## Structure

-   `/app.js` Entry point for the application, configures the server and static/dynamic content
-   `/blog.js` Implementation of the blog, titles, authors
-   `/config` Environment variables used to control basic behavior
-   `/routes` Define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions.
-   `/models` Blog, Users schema used for defining validations or sanitizations on requests.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SESSION_SECRET` = keyboard cat

`PORT` = 3000

`COOKIE_NAME` = ArtBlogSecure

`MONGODB` = CHANGE_HERE (MongoDB API)

## Installation

    1. Install Node.js
    2. Fork and clone repository
    3. Create directory under `/blog` or use one of the samples
    4. Add static content to `/blog/yoursite/static`
    5. `npm install`
    6. `npm run compile`
    7. `npm start`
    8. Open <http://localhost:3000/> and verify
    9. Commit changes to repository
    10. Deploy repository to hosting service

## Configuration

-   In folder `config` create `keys.js` file
-   add & change the `CHANGE_HERE` value from `keys.js`;

Here:
`module.exports = { MongoURI: CHANGE_HERE, } `

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
  npm i
```

Start the server

```bash
  npm run start
```

## Screenshots

<details>
    <summary><b>Welcome</b> Page</summary>
    <img src="https://user-images.githubusercontent.com/12413810/201081178-79a79719-6224-4126-8d66-fb95c326f5ec.png"/>
</details>

<details>
    <summary><b>Login</b> Page</summary>
    <img src="https://user-images.githubusercontent.com/12413810/201081197-8b6c28d7-57d2-4667-8336-430d7d2d910f.png"/>
</details>

<details>
    <summary><b>Home</b> Page</summary>
    <img src="https://user-images.githubusercontent.com/12413810/201479666-096b8ea6-03e1-4c9b-aa56-87dd98467c7a.png"/>
</details>

<details>
    <summary><b>Latest</b> Page</summary>
    <img src="https://user-images.githubusercontent.com/12413810/201479680-0d593f91-6808-4985-8a1d-935616f3de94.png"/>
</details>

<details>
    <summary><b>Create Article</b> Section</summary>
    <img src="https://user-images.githubusercontent.com/12413810/201479684-44706cdc-a611-45cd-a46d-7b5181a2a016.png"/>
</details>

<details>
    <summary><b>Create</b> Page</summary>
    <img src="https://user-images.githubusercontent.com/12413810/201479693-d9e08e31-7eb5-4eed-b1e4-4540c344d88d.png"/>
</details>

<details>
    <summary><b>Dashboard</b> Page</summary>
    <img src="https://user-images.githubusercontent.com/12413810/201479704-6a9801dd-43e4-44df-a553-7656ed341349.png"/>
</details>

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

Easy way

-   Open issue, discuss proposal
-   Fork and clone repository
-   Change code and update tests
-   `npm test`
-   `npm run lint`
-   Review changes
-   Send pull request

Thanks to [Open Source Code of Conduct](https://opensource.fb.com/code-of-conduct/) and [React](https://github.com/facebook/react)

## Dependencies

| Project     | Home Page                     |
| ----------- | ----------------------------- |
| Express     | <https://expressjs.com/>      |
| NodeJS      | <https://nodejs.org/en/>      |
| MongoDB     | <https://www.mongodb.com/>    |
| EJS         | <https://ejs.co/>             |
| Passport.js | <https://www.passportjs.org/> |
| Bootstrap   | <https://getbootstrap.com/>   |

## Usage/Examples

```javascript
const router = require('express').Router()
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')

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

[Documentation](https://classroom.google.com/u/0/c/NTI3MDY3MDI0Mzk3/a/NTI3MDY3MDI0NDU4/details)

Tema: Blog despre Arta

Entitate: Articole

Campuri:

<details>
<summary>
Categorii
</summary>
Titlu Categoriei
</details>

<details>
  <summary>Articole</summary>
  titlu,imagine, descriere, id, Data Adaugarii, buton Articol(adaugare, stergere, actualizare),login,register.
</details>

> Special thanks to [Victor Locoman](https://github.com/LyMc)

## Badges

[![Github Stars](https://img.shields.io/github/stars/timi-petre/artwit?style=social)](https://choosealicense.com/licenses/mit/)
[![Issues](https://img.shields.io/github/issues/timi-petre/artwit)](https://opensource.org/licenses/)
[![Commits](https://img.shields.io/github/commit-activity/w/timi-petre/artwit)](http://www.gnu.org/licenses/agpl-3.0)

Add badges from somewhere like: [shields.io](https://shields.io/)

## Authors

-   [@timi-petre](https://github.com/timi-petre)

## Support

For support, email timoteisorin.petre@gmail.com or join my Discord channel.

## Feedback

If you have any feedback, please reach out to us at timoteisorin.petre@gmail.com
