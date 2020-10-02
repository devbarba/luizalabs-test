
# Luiza Labs Challenge

## Intro

Challenge proposed by Luiza Labs in a selection process for a Back-end Developer job that consists of developing a back-end application, with the following requirements:

- Build a parser for the games.log log file and expose a query API.

- After building the parser, build an API that exposes a query method that returns a report for each game.

First of all I would like to thank you for the opportunity to be able to take the test and have the chance to join a company as innovative as LuizaLabs. Given the challenge of parsing a game quake log file and creating a query api, I decided to use the Node.JS language due to its greater familiarity / experience among those proposed (Java, Golang and Node.JS).

[README of the proposed challenge](https://github.com/harbsprog/luizalabs-test/blob/master/README-DESAFIO.md)

## Demonstration

  I carried out a demonstration of the project running and making a GET request on the 2 routes via insomnia, follow link:
 
  [Demo Video](https://youtu.be/89An4dgqv44)
  
  PS: MAC development environment.
  
## Project Behavior

- **Parsing**

  Basically I make calls to methods that find patterns in the log using REGEX. I persist the data in a sqLite database and display the data in 2 different routes, the first `/ games /: id`, given the game id, the user is shown data related to it and the second` / games`, where data from all games are displayed.

* **Persistence**

  It was not requested, however, I found it interesting to persist the data in a sqLite database using the ORM Sequelize where I also created a migration facilitating the creation and versioning of the bank.

- **API**

  For the exposure of routes in the RESTFul model with JSON format I used the Express micro-framework for being very lean, simple to work with and for having a lot more contact. I could have used Hapi without any problem.

- **TESTS**

  To perform unit and integration tests, the Mocha, Chai and Supertest facilities were used.

- **LOGS**

  I performed the implementation of a feature that was not requested, that saves the death logs and makes a small translation, I thought it would be interesting and would make the application more complete consuming almost completely the log information as we can see below:

  ![Route](https://image.prntscr.com/image/Mm1OShxPSOCJOhYEhXAH7g.png)

- ### PS:
  Due to one of the requirements when <'world'> to kill a player, the same one loses 1 of his kills, in the array of deaths the values ​​end up being negative where in my conception it is right, however if necessary a small change would resolve not letting go 0 the player's kills.


# End-points

### Games

| resource                  | description                       |
| :------------------------ | :-------------------------------- |
| `/api/games/{id}` **GET** | Get the game data with related id |


`/api/games/{id}` **GET** - RESPONSE

```shell
  "game_5": {
    "total_kills": 2,
    "players": [
      "Mocinha",
      "Isgalamido"
    ],
    "kills": [
      "Mocinha": 1,
      "Isgalamido": 1
    ],
    "log": [
      "Mochinha matou o player Isgalamido com MOD_RAILGUN",
      "Isgalamido matou o player Mochinha com MOD_RAILGUN"]
  }
```

| resource             | description            |
| :------------------- | :--------------------- |
| `/api/games` **GET** | Get all the games data |

`/api/games` **GET** - RESPONSE

```shell
  "game_1": {
    "total_kills": 2,
    "players": [
      "Mocinha",
      "Isgalamido"
    ],
    "kills": [
      "Mocinha": 1,
      "Isgalamido": 1
    ],
    "log": [
      "Mochinha matou o player Isgalamido com MOD_RAILGUN",
      "Isgalamido matou o player Mochinha com MOD_RAILGUN"]
  },
  "game_2": {
    "total_kills": 1,
    "players": [
      "Isgalamido"
    ],
    "kills": [
      "Mocinha": -1,
    ],
    "log": [
      "<world> matou o player Isgalamido com MOD_TRIGGER_HURT",
  }
```

## Used Technologies

- [Node](https://nodejs.org/en/) - v13.7.0
- [Yarn](https://yarnpkg.com/) - 1.21.1
- [Bole](https://www.npmjs.com/package/bole) - 4.0.0
- [Dotenv](https://www.npmjs.com/package/dotenv) - 8.2.0
- [Esm](https://www.npmjs.com/package/esm) - 3.2.25
- [Express](https://expressjs.com/) - 4.17.1
- [Fs](https://www.npmjs.com/package/fs) - 0.0.1-security
- [Path](https://www.npmjs.com/package/path) - 0.12.7
- [Sequelize](https://www.npmjs.com/package/sequelize) - 5.21.5
- [Sqlite3](https://www.npmjs.com/package/sqlite3) - 4.1.1
- [Chai](https://www.chaijs.com/) - 4.2.0
- [Mocha](https://mochajs.org/) - 7.1.0
- [Nodemon](https://nodemon.io/) - 2.0.2
- [Sequelize-cli](https://www.npmjs.com/package/sequelize-cli) - 5.5.1
- [Async](https://www.npmjs.com/package/async) - 3.2.0
- [Supertest](https://www.npmjs.com/package/supertest) - 4.0.2

## Instalation

### Prerequisites

To run the application it is only necessary to have Node installed in version v13.7.0.

### Phases

To run the application on your machine, follow these steps:

1. git clone [https://github.com/harbsprog/luizalabs-test](https://github.com/harbsprog/luizalabs-test)

2) cd luizalabs-test `Access the project folder`

3. yarn install `Performs installation of dependencies`

4) cp .env.example .env `Copy environment variables`

5. npx sequelize db:migrate `Run migrations`

6) yarn start `(Run the application)`

7. Access: http://127.0.0.1:8081/ If you present a welcome message everything went well.

## Tests

Integration tests and unit tests were carried out:

To run the integration tests run the following command:
`yarn test-integration`

To run the unit tests run the following command:
`yarn test-unit`

## Author

[Harbs](https://github.com/harbsprog)
