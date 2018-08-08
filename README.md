<p align="center"> 
  <a href="https://codeclimate.com/github/FreebeeTeam/freebee-telegram-bot/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/d053b7eee6887a11046d/maintainability" />
  </a>
  <a class="badge-align" href="https://www.codacy.com/app/GitStearis/freebee-telegram-bot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=FreebeeTeam/freebee-telegram-bot&amp;utm_campaign=Badge_Grade">
    <img src="https://api.codacy.com/project/badge/Grade/bfc11c270b71494181491d35fba0306a"/>
  </a>
</p>

<p align="center"> 
  <img src='https://drive.google.com/uc?id=1albVAA6GrHQaG0EvN3a1WFCs9irSv5Lk' alt='Freebee logo' width="200" />
</p>

# Freebee Navigator

It's a Telegram bot api, designed to search free facilities (simply put, *freebies*) around user.

* [Small VK public page](https://vk.com/freebeeapp);
* [Freebee at Social Weekend Hackathon](http://telegra.ph/Social-Weekend-Hackathon--kak-ehto-bylo-02-26).

## Getting started

Clone project to your computer.

```
$ git clone https://github.com/FreebeeTeam/freebee-telegram-bot.git
```

### Prerequisites

To start with Freebee API, you should have [Node](https://nodejs.org/en/download/package-manager/) installed.

### Installing

Install all dependencies.

```
$ npm install
```

To launch Freebee API you should create `.env` file in a root directory. File should contain:

```
PORT = 3000
TELEGRAM_TOKEN = 
MONGODB_CONNECTION = 
```

* `TELEGRAM_TOKEN` - A token, provided by the BotFather. Read more [here](https://core.telegram.org/bots/api#making-requests);
* `MONGODB_CONNECTION` - a MongoDB [connection string](https://docs.mongodb.com/manual/reference/connection-string/) with credentials;

To run server on localhost type  `npm start`  in root folder.

```
$ npm start
```

## Deployment

To deploy with Heroku, visit [official guide page](https://devcenter.heroku.com/articles/git).

Briefly:

```
$ heroku login
Enter your Heroku credentials.
$ heroku create
$ git push heroku master
```

Add `env` variables via Heroku CLI:

```
$ heroku config:set TELEGRAM_TOKEN=blahblahblah
```

Ensure the app is running.

```
heroku ps:scale web=1
heroku open
```

## Built With

- [Node.js](https://github.com/nodejs/node) - JavaScript runtime for server;
- [npm](https://github.com/npm/npm) - Package manager for JavaScript;
- [Express.js](https://github.com/expressjs/express) - Framework for Node.js;
- [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api) - Node.js module to interact with official Telegram Bot API.

### Deployment

- [Heroku](https://www.heroku.com/home) - Deployment platform for testing needs.

### Database

- [MongoDB](https://www.mongodb.com/) - NoSQL Database;
- [Mongoose](http://mongoosejs.com/) - ODM for MongoDB.

## Hints

Some advices that can save your time :bulb:

* Your project should provide a [Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile) when you deploy to Heroku;
* Use `git push heroku your_branch_name:master` command if you want to deploy a non-master branch to Heroku.

## Developed by

* **Егор Пуйша** - [GitStearis](https://github.com/GitStearis) - Author, Full-stack Development;
