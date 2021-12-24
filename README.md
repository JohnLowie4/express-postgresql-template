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
