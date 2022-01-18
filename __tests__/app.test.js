const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics Tests", () => {
  test("/api/topics - Status 200: Responds with an array of topic objects, each of which have the 'slug' and 'description' properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
        res.body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/articles Tests", () => {
  test("/api/articles/:article_id - Status 200: Responds with an array of a specific article specific by ID in the request query with an additional comment_count column", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toBeInstanceOf(Object);
        expect(res.body.article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String),
        });
      });
  });
  test("/api/articles - Status 200: Responds with an array of all articles with an additional comment_count column", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        res.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
      });
  });
});

describe("PATCH /api/articles Tests", () => {
  test("/api/articles/:article_id - Status 200: Test 1 - Updates the specificed article ID votes column with the value input, and responds with the updated article - Increases article 1 votes by +1", () => {
    const voteUpdate = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(200)
      .then((res) => {
        expect(res.body.article).toBeInstanceOf(Object);
        expect(res.body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-08T23:00:00.000Z",
          votes: 101,
        });
      });
  });
  test("/api/articles/:article_id - Status 200: Test 2 - Updates the specificed article ID votes column with the value input, and responds with the updated article - Decreases article 2 votes by -100", () => {
    const voteUpdate = { inc_votes: -100 };
    return request(app)
      .patch("/api/articles/2")
      .send(voteUpdate)
      .expect(200)
      .then((res) => {
        expect(res.body.article).toBeInstanceOf(Object);
        expect(res.body.article).toEqual({
          article_id: 2,
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: "2020-10-15T23:00:00.000Z",
          votes: -100,
        });
      });
  });
});

describe("Error Testing", () => {
  test("Status 404: Error 404 returned if the topic pathway is mis-spelt as 'topicz'", () => {
    return request(app)
      .get("/api/topicz")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Invalid URL");
      });
  });
  test("Status 404: Error 404 returned if an article ID is requested that does not exist", () => {
    return request(app)
      .get("/api/articles/3423234")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Not found");
      });
  });
});
