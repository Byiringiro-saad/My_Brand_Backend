process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Test work apis", () => {
  /**
   * Testing create work api
   */

  describe("POST /work/create", () => {
    it("It should create a work", () => {
      chai
        .request(server)
        .post("/api/user/signup")
        .send({
          name: "testing",
          email: "test@example.com",
          password: "test@123",
          role: "admin",
        })
        .end((err, res) => {
          res.should.have.status(200);

          chai
            .request(server)
            .post("/api/user/login")
            .send({
              email: "test@example.com",
              password: "test@123",
            })
            .end((err, res) => {
              res.body.should.have.property("data");
              let token = res.body.data;

              chai
                .request(server)
                .get("/api/work/create")
                .set("authorization", "Bearer " + token)
                .send({
                  title: "testing",
                  link: "https://testing.com",
                  description: "i am just testing",
                  cards: ["mocha", "chai"],
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");
                  // done();
                });
            });
        });
    });
  });
});
