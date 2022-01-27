# Express PostgreSQL Template

This template is designed for the beginners, the learners, and the curious individuals who want to learn the basics of building a database for their projects with Express.js and PostgreSQL.

## Motivation

This small project was inspired by an article that I am writing, How to Side Project (link to this article will be posted once published). I wanted to help those who started their journey in the tech industry to understand the very basics of building a database for their side projects without learning a new programming language.

## Dependencies

- body-parser
- dotenv
- express
- helmet
- morgan
- pg

## Setup

This project requires you to have some knowledge of JavaScript and PostgreSQL.

1. Click on the green "Use this template" button
2. Clone your repo
3. Create your environment:
   - Create a `.env` file by running `cp .env.example .env` in your command line
   - Setup your desired user, password, and database name
4. Install all dependencies: `npm i`
5. Seed data:
   - For M1 MacBooks running homebrew: `brew services start postgresql`
   - Open up PostgreSQL command line for your database by running: `psql -U <your user> -h localhost <your database name>`
   - Seed data by running `\i src/db/create_tables.sql`
6. In another terminal or command prompt, start the Express server by running `npm start`
7. You can now go to `http://localhost:8080` to see the server running.

## File Structure and Navigation

Majority of the files that you will be interacting will be in the `src` folder.

- The `index.js` file in the root folder is where all the interactions between the `.env` file and all the files in the `src` folder.
- The `src/lib/db.js` file is the interaction between your database, and `.env` file. It sets up the environment that connects your JavaScript code to your PostgreSQL code.
- The `src/routes/` folder is where all the RESTful API requests interactions happens. GET, POST, PUT, and DELETE requests for each table happens here.
- The `src/db/` folder is where your PostgreSQL files are stored.
- The `src/db/create_tables.sql` file is where all the tables of your database are dropped, and then created, and seeded with data.
- The `src/db/seeds/` folder consists of all the initial seeding of data.

## ERD of This Template

![Template ERD](./public/template%20erd.drawio.png)

Now you can connect this template to your front end with [axios](https://github.com/axios/axios) or just plain old JavaScript [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

If using `axios`, you can connect to this template with:

```
axios.get("localhost:8080")
   .then((response) => {
      console.log(response);
   })
   .catch((error) => {
      console.log(error.message);
   });
```

Happy coding🥳
