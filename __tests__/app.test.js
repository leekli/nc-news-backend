const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics Tests", () => {
  test("Status 200: Responds with an array of topic objects, each of which have the 'slug' and 'description' properties", () => {
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
  test("Status 200: Responds with an array of a specific article specific by ID in the request query", () => {
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
