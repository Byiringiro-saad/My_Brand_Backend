process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Test messages APIs", () => {
  /**
   * Testing send message api
   */

  describe("POST /messages/add", () => {
    it("It should send a message", () => {
      chai
        .request(server)
        .post("/api/messages/add")
        .send({
          names: "testing user",
          email: "testing@example.com",
          message: "just testing messages",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.message.should.equal("message sent");
          // ();
        });
    });
  });

  /**
   * Testing get all messages api
   */

  describe("GET /messages", () => {
    it("It should get all messages", () => {
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
                .get("/api/messages")
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");
                  // ();
                });
            });
        });
    });
  });

  /**
   * Tetsing get one message api
   */

  describe("GET /messages/{id}", () => {
    it("It should get one message", () => {
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
                .get("/api/messages")
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .get(`/api/messages/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("data");
                      // ();
                    });
                });
            });
        });
    });
  });

  /**
   * Testing send reply api
   */

  describe("POST /messages/reply", () => {
    it("It should send a reply to a message", () => {
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
                .get("/api/messages")
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .post("/api/messages/reply")
                    .set("authorization", "Bearer " + token)
                    .send({
                      reply: "Hello there, i am just testing my apis",
                      messageId: res.body.data[0]._id,
                    })
                    .end((err, res) => {
                      // console.log(res);
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("message replied");
                      // ();
                    });
                });
            });
        });
    });
  });

  /**
   * Testing delete message api
   */

  describe("DELETE /messages/{id}", () => {
    it("It should delete a message", () => {
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
                .get("/api/messages")
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .delete(`/api/messages/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("message deleted");
                      // ();
                    });
                });
            });
        });
    });
  });
});
