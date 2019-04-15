const server = require("../../server.js");
const request = require("supertest");
const db = require("../../data/dbConfig.js");

describe("Account Creation", () => {
  describe("/register", () => {
    const endpoint = "/api/account/register";
    it("should return 201 on successful creation", async () => {
      await db("account").truncate();
      const newAccount = { username: "test", password: "asdf" };
      const res = await request(server)
        .post(endpoint)
        .send(newAccount);

      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
      expect(res.username).toBe("test");
      expect(res.id).toBe(1);
      expect(res.avatar).toBe("https://bit.ly/2GlN9TU");
    });

    it("should return 400 on bad creditials", () => {
      const noData = await request(endpoint).post({});
      const noPassword = await request(endpoint).post({ username: "test2" });
      const noUsername = await request(endpoint).post({ password: "asdf" });

      expect(noData.status && noPassword.status && noUsername.status).toBe(400);
    });
  });
});
