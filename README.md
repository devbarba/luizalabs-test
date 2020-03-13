# Desafio Luiza Labs

## Intro

Desafio proposto pela Luiza Labs em processo seletivo para vaga de Desenvolvedor Back-end que consiste em desenvolver uma aplicação backend, com os requisitos:

- Construa um parser para o arquivo de log games.log e exponha uma API de consulta.

- Após construir o parser construa uma API que faça a exposição de um método de consulta que retorne um relatório de cada jogo.

Primeiramente gostaria de agradecer a oportunidade de poder realizar o teste e ter a chance de entrar para uma empresa tão inovadora como é o LuizaLabs. Dado o desafio de parsear um arquivo de logs do game quake e criar uma api de consulta decidi utilizar a linguagem Node.JS devido ter maior familiaridade/vivência dentre as que foram propostas (Java, Golang e Node.JS).

- [README do desafio proposto](<[https://github.com/harbsprog/luizalabs-test/blob/master/README.md](https://github.com/harbsprog/luizalabs-test/blob/master/README-DESAFIO.md)>)

## Comportamento do Projeto

- **Parseamento**
  
  Basicamente realizo chamadas a métodos que encontram padrões no log utilizando REGEX. faço a persistência dos dados em um banco sqLite e exibo os dados em 2 diferentes rotas, a primeira `/games/:id`, dado o id do game, é mostrado ao usuário dados referentes ao mesmo e a segunda `/games`, onde são exibidos dados de todos os games.

* **Persistência**

     Não foi solicitado, porém, achei interessante persistir os dados em um banco sqLite utilizando o ORM Sequelize onde também criei uma migration facilitando na criação e versionamento do banco.

- **API**

     Para a exposição das rotas no modelo RESTFul com formato JSON utilizei o micro-framework Express por ser bem enxuto, simples de trabalhar e por ter bem mais contato. Poderia ter utilizado o Hapi sem problema algum.

- **LOGS**

     Realizei a implementação de uma feature que não foi pedida, que salva os logs de morte e faz uma pequena tradução, achei que seria interessante e deixaria a aplicação mais completa consumindo quase que por completo as informações de log como podemos ver abaixo:

 
  ![Rota](https://image.prntscr.com/image/Mm1OShxPSOCJOhYEhXAH7g.png)


- ### PS:
   Devido a um dos requisitos de quando  <'world'> matar um player, o mesmo perder 1 de suas kills, no array de mortes os valores acabam ficando negativos onde na minha concepção está certo, porém se necessário uma pequena alteração resolveria não deixando passar de 0 as kills dos player.

## Tecnologias utilizadas

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
- [Supertest](https://www.npmjs.com/package/supertest) - 4.0.2

## Instalação

### Pré-requisitos

Para rodar a aplicação é necessário somente ter instalado o Node na versão v13.7.0

### Etapas

Para rodar a aplicação em sua máquina siga os seguintes passos:

1. git clone [https://github.com/harbsprog/luizalabs-test](https://github.com/harbsprog/luizalabs-test)

2) cd luizalabs-test `Acessa a pasta do projeto`

3. yarn install `Realiza instlação das dependências`

4) cp .env.example .env `Copia as variáveis de ambiente`

5. npx sequelize db:migrate `Roda as migrations`

6) yarn start `(Roda a aplicação)`

7. Acesse: http://127.0.0.1.8081/ Se apresentar uma mensagem de boas-vindas ocorreu tudo bem.

## Testes

Foram realizados testes de integração e testes unitários:

Para rodar os testes de integração rode o seguinte comando:
`yarn test-integration`

Para rodar os testes unitários rode o seguinte comando:
`yarn test-unit`

## Author

- [Harbs](<[https://github.com/harbsprog](https://github.com/harbsprog)>)
