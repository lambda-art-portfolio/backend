const db = require("../../data/dbConfig.js");
const Accounts = require("../model.js");

describe("Accounts Model", () => {
  beforeEach(async () => {
    await db("accounts").truncate();
  });

  describe("insert()", () => {
    it("should insert new users into the database", async () => {
      await Accounts.insert({ username: "test1", password: "asdf" });
      await Accounts.insert({ username: "test2", password: "asdf" });
      await Accounts.insert({ username: "test3", password: "asdf" });

      const accounts = await db("accounts");
      expect(accounts).toHaveLength(3);
    });

    it.skip("should fail to add duplicate users", async () => {
      const newAccount = { username: "test1", password: "asdf" };
      await Accounts.insert(newAccount);
      const accounts = await db("accounts");

      expect.assertions(1);
      expect(() => {
        Accounts.insert(newAccount);
      }).toThrow("asdf");
      //expect(() => {drinkFlavor('octopus');}).toThrow();
    });

    it.skip("should fail to add accounts with missing username or password", async () => {
      //await Accounts.insert({ username: "test12", password: "asdf" });

      try {
        await Accounts.insert({ username: "test22" });
      } catch (err) {
        expect(err.error).toBe(
          "SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.username"
        );
      }
      // try {
      //   await Accounts.insert({ password: "asdf" });
      // } catch (err) {
      //   expect(err.error).toBe(
      //     "SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.username"
      //   );
      // }
    });
  });
});
