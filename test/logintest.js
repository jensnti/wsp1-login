const assert = require("assert");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");

describe("/login", () => {
  describe('GET /', () => {
    it("should return OK status", async () => {
      const res = await request(app).get("/login");
      expect(res.status).to.equal(200);
    });

    it("should return message on rendering", async () => {
      const res = await request(app).get("/login");
      expect(res.text).to.contain("Please sign in");
    });
  });

  describe('POST /', () => {
    it('should log the user in with a correct request body'), async () => {
      const res = await request(app)
        .post("/login")
        .send({email: 'jens.andreasson@ga.ntig.se', password: 'password'});
      expect(res.status).to.equal(200);
    }
  });
});
