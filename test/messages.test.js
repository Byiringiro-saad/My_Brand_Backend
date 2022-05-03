process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Test message APIs", () => {
  /**
   * Testing send message api
   */

  describe("POST /message/add", () => {
    it("It should send a message", () => {
      chai
        .request(server)
        .post("/api/message/add")
        .send({
          names: "testing user",
          email: "testing@example.com",
          message: "just testing messages",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.message.should.equal("message sent");
          // done();
        });
    });
  });

  /**
   * Testing get all messages api
   */

  describe("GET /message", () => {
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
                .get("/api/message")
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");
                  // done();
                });
            });
        });
    });
  });

  /**
   * Tetsing get one message api
   */

  describe("GET /message/{id}", () => {
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
                .get("/api/message")
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .get(`/api/message/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
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

  /**
   * Testing send reply api
   */

  // describe("POST /message/reply", () => {
  //   it("It should send a reply to a message", () => {
  //     chai
  //       .request(server)
  //       .post("/api/user/signup")
  //       .send({
  //         name: "testing",
  //         email: "test@example.com",
  //         password: "test@123",
  //         role: "admin",
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);

  //         chai
  //           .request(server)
  //           .post("/api/user/login")
  //           .send({
  //             email: "test@example.com",
  //             password: "test@123",
  //           })
  //           .end((err, res) => {
  //             res.body.should.have.property("data");
  //             let token = res.body.data;

  //             chai
  //               .request(server)
  //               .get("/api/message")
  //               .set("authorization", "Bearer " + token)
  //               .end((err, res) => {
  //                 res.should.have.status(200);
  //                 res.body.should.have.property("data");

  //                 chai
  //                   .request(server)
  //                   .post("/api/message/reply")
  //                   .set("authorization", "Bearer " + token)
  //                   .send({
  //                     reply: "Hello there, i am just testing my apis",
  //                     messageId: res.body.data[0]._id,
  //                   })
  //                   .end((err, res) => {
  //                     res.should.have.status(200);
  //                     res.body.should.have.property("message");
  //                     res.body.message.should.equal("message replied");
  //                     done();
  //                   });
  //               });
  //           });
  //       });
  //   });
  // });

  /**
   * Testing delete message api
   */

  describe("DELETE /message/{id}", () => {
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
                .get("/api/message")
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .delete(`/api/message/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("message deleted");
                      // done();
                    });
                });
            });
        });
    });
  });
});
