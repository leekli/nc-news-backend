# **NorthCoders News - Back End API** 🗞

## **Portfolio Project - Back End**

---

## **Built by:** Lee Kirkham (2022)

---

## **Back-End**

- Back-end - Hosted version Link: https://lee-nc-news.herokuapp.com/
- Back-End - Git-Hub Repo Link: https://github.com/leekli/nc-news

## **Front-End (For this Back-End API)**

- Front-End - Hosted version Link: https://fe-nc-news-app.netlify.app/
- Front-End - Git-Hub Repo Link: https://github.com/leekli/fe-nc-news

---

## **Description**

A 'News API' build using Node.js, Express.js server and a PostgreSQL database.

All endpoints can be found in the `endpoints.json` file or go to https://lee-nc-news.herokuapp.com/api/ which lists all endpoints which can be interacted with.

There is a front-end app available for this API, which will allow you to interact with it, available at: https://fe-nc-news-app.netlify.app/

---

# **Setup Instructions**

### **Installation requirements:**

- Node.js 17.x
- Postgres 14.x

### **Cloning the repositry:**

- In your teminal CLI:

```
$ git clone https://github.com/leekli/nc-news.git
$ cd nc-news
```

### **Installing dependencies:**

- Required dependencies will be pulled from the `package.json` file. In your teminal CLI:

```
$ npm install
```

### **Environment setup:**

- Once the repo has been clongedYou will need to create two .env files in the root folder: with the `.env.test` and `.env.development` file names.
- In each of these `.env` files you will need to add `PGDATABASE=<database_name_here>` to each file, pointing to the relevant database:

  > .development database is `nc_news`

  > .test database is `nc_news_test`

### **Database set-up and seeding:**

- Before using or testing the application, you will need to set the database up and then seed it with the data:

```
$ npm run setup-dbs
$ npm run seed
```

# **Testing**

- `Jest` is the framework used to test this application.

- To run tests:

```
$ npm test
```

---

### **Application dependencies:**

<i>

- npm 8.x
- express 4.x
- pg 8.x
- pg-format 1.x
- dotenv 14.x
- nodemon 2.x
  </i>

### **Developer only dependencies:**

<i>

- jest 27.x
- jest-sorted 1.x
- supertest 6.x
  </i>
