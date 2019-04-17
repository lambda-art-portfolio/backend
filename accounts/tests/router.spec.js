const server = require("../../server.js");
const request = require("supertest");
const db = require("../../data/dbConfig.js");
const Accounts = require("../model.js");

describe("Account Creation", () => {
  describe("/register", () => {
    const endpoint = "/api/account/register";
    it("should return 201 on successful creation", async () => {
      await db("accounts").truncate();
      const newAccount = { username: "test", password: "asdf" };
      const res = await request(server)
        .post(endpoint)
        .send(newAccount);

      expect(res.status).toBe(201);
      expect(res.type).toBe("application/json");
      expect(res.body.username).toBe("test");
      expect(res.body.id).toBe(1);
      expect(res.body.avatar).toBe("https://bit.ly/2GlN9TU");
      expect(res.body.token).toBeDefined();
    });

    it("should return 400 on bad creditials", async () => {
      const noData = await request(server)
        .post(endpoint)
        .send({});
      const noPassword = await request(server)
        .post(endpoint)
        .send({ username: "test2" });
      const noUsername = await request(server)
        .post(endpoint)
        .send({ password: "asdf" });

      expect(noData.status && noPassword.status && noUsername.status).toBe(400);
    });

    it("should return 409 on duplicate account", async () => {
      const duplicate = await request(server)
        .post(endpoint)
        .send({ username: "test", password: "asdf" });

      expect(duplicate.status).toBe(409);
    });
  });

  describe("/edit/:id", () => {
    let token;
    beforeEach(async () => {
      await db("accounts").truncate();
      const endpoint = "/api/account/register";
      const account = { username: "test", password: "asdf" };

      const login = await request(server)
        .post(endpoint)
        .send(account);

      token = login.body.token;
      console.log("ID", login.body.id);
    });
    it.only("should return 200 & the updated object on put", async () => {
      console.log(token);
      const endpoint = "/api/account/edit/1";
      const account = { token, avatar: "updated" };
      const updated = await request(server)
        .put(endpoint)
        .send(account);
      expect(updated.body.avatar).toBe("updated");
    });
  });
});
