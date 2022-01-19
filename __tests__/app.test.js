const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api Tests", () => {
  test("/api - Status 200: Responds with the endpoints.json file describing all the available endpoints of the API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body.allEndPoints).toBeInstanceOf(Object);
      });
  });
});

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
  test("/api/articles - Status 200: Articles are sorted by date by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted("created_at");
      });
  });
  test("/api/articles?sort_by=title - Status 200: Articles are sorted by a passed query ('title' in this case)", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted("title");
      });
  });
  test("/api/articles?sort_by=author - Status 200: Articles are sorted by a passed query ('author' in this case)", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted("author");
      });
  });
  test("/api/articles?sort_by=article_id - Status 200: Articles are sorted by a passed query ('article_id' in this case)", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted("article_id");
      });
  });
  test("/api/articles?sort_by=topic - Status 200: Articles are sorted by a passed query ('topic' in this case)", () => {
    return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted("topic");
      });
  });
  test("/api/articles?sort_by=votes - Status 200: Articles are sorted by a passed query ('votes' in this case)", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted("votes");
      });
  });
  test("/api/articles?sort_by=comment_count - Status 200: Articles are sorted by a passed query ('comment_count' in this case)", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSorted("comment_count");
      });
  });
  test("/api/articles?order=desc - Status 200: Articles are ordered by descending by default", () => {
    return request(app)
      .get("/api/articles")
      .query("order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("/api/articles?order=asc - Status 200: Articles are ordered by ascending when passed as a query and sorted using the default 'created_at' column", () => {
    return request(app)
      .get("/api/articles")
      .query("order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("created_at", {
          descending: false,
        });
      });
  });
  test("/api/articles?topic=cats - Status 200: Returns the results from articles which only contain 'cats' in the topic", () => {
    return request(app)
      .get("/api/articles")
      .query("topic=cats")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles).toHaveLength(1);
        expect(res.body.articles).toEqual(
          expect.arrayContaining([expect.objectContaining({ topic: "cats" })])
        );
      });
  });
  test("/api/articles?topic=mitch - Status 200: Returns the results from articles which only contain 'mitch' in the topic", () => {
    return request(app)
      .get("/api/articles")
      .query("topic=mitch")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles).toHaveLength(11);
        expect(res.body.articles).toEqual(
          expect.arrayContaining([expect.objectContaining({ topic: "mitch" })])
        );
      });
  });
  test("/api/articles/:article_id/comments - Status 200: Returns an array of comments for the given article_id which is input as a query - Using article 1 for the test", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toBeInstanceOf(Array);
        res.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
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

describe("POST /api/articles Tests", () => {
  test("/api/articles/:article_id/comments - Status 201: Creates a new comment with the properties: 'username' and 'body', returns a response with the posted comment", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "butter_bridge", body: "This is a new comment!" })
      .expect(201)
      .then((res) => {
        expect(res.body.newComment).toBeInstanceOf(Array);
        res.body.newComment.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            article_id: expect.any(Number),
            created_at: expect.any(String),
          });
        });
        expect(res.body.newComment).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ body: "This is a new comment!" }),
          ])
        );
      });
  });
});

describe("DELETE /api/comments Tests", () => {
  test("/api/comments/:comment_id - Status 204 deletes the given comment by :comment_id, returns a 204 status and no content", () => {
    return request(app).delete("/api/comments/18").expect(204);
  });
});

describe("GET - Error Testing", () => {
  test("/notARoute - Status 404: Error 404 returned if a GET ALL is requested on a route that does not exist'", () => {
    return request(app)
      .get("/notARoute")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Invalid URL");
      });
  });
  test("/api/topicss - Status 404: Error 404 returned if the topic pathway is mis-spelt as 'topicz'", () => {
    return request(app)
      .get("/api/topicss")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Invalid URL");
      });
  });
  test("/api/articles/3423234 - Status 404: Error 404 returned if an article ID is requested that does not exist", () => {
    return request(app)
      .get("/api/articles/3423234")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Not found");
      });
  });
  test("/api/articles/notAnId - Status 400: Error 400 returned if an invalid ID is requested on a valid path", () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad request");
      });
  });
  test("/api/articles?sort_by=nosuchcolumn - Status 400: Returns an error for an invalid sort_by column name passed as a query", () => {
    return request(app)
      .get("/api/articles?sort_by=nosuchcolumn")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad request");
      });
  });
  test("/api/articles?order=ascending - Status 400: Returns an error for an invalid order column name passed as a query", () => {
    return request(app)
      .get("/api/articles?order=ascending")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad request");
      });
  });
  test("/api/articles?topic=paper - Status 200: the queried topic ('paper') exists but has no topics with paper assigned to it yet, returns an empty array", () => {
    return request(app)
      .get("/api/articles")
      .query("topic=paper")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles).toHaveLength(0);
      });
  });
});

describe("POST - Error Testing", () => {
  test("/api/articles/:article_id/comments - Status 400: A malformed body / missing required fields returns a Error 400 Bad Request as a response", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "icellusedkars" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad request");
      });
  });
});

describe("DELETE - Error Testing", () => {
  test("/api/comments/:comment_id - Status 404 when resource/ID does not exist during a DELETE operation", () => {
    return request(app)
      .delete("/api/comments/12348798")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Not found");
      });
  });
  test("/api/comments/:comment_id - Status 400 when an invalid ID is input to a path which exists on a DELETE operation", () => {
    return request(app)
      .delete("/api/comments/notAnId")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad request");
      });
  });
});

describe("PATCH/PUT - Error Testing", () => {
  test("/api/articles/:article_id - Status 404: Error 404 returned if an article ID is requested that does not exist", () => {
    const voteUpdate = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/11434")
      .send(voteUpdate)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Not found");
      });
  });
  test("/api/articles/:article_id - Status 400: Incorrect data type put on to a PATCH request, a string input instead of an integer", () => {
    const voteUpdate = { inc_votes: "Incorrect input" };
    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad request");
      });
  });
  test("/api/articles/:article_id - Status 400: Malformed body / Missing required fields returns an error 400", () => {
    const voteUpdate = {};
    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad request");
      });
  });
});
