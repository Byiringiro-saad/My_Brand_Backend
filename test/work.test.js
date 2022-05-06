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
                .post("/api/work/create")
                .set("authorization", "Bearer " + token)
                .send({
                  title: "testing",
                  link: "link",
                  description: "i am just testing",
                  cards: ["mocha", "chai"],
                })
                .end((err, res) => {
                  console.log(res);
                  res.should.have.status(200);
                  res.body.should.have.property("message");
                  res.body.message.should.equal("work created");
                  // done();
                });
            });
        });
    });
  });

  /**
   * Testing get all works
   */

  describe("GET /work", () => {
    it("It should get all works", () => {
      chai
        .request(server)
        .get("/api/work")
        .end((err, res) => {
          //   console.log(res);
          res.should.have.status(200);
          res.body.should.have.property("data");
          //   ();
        });
    });
  });

  /**
   * Testing getting a work
   */

  describe("GET /work/:id", () => {
    it("It should get a work", () => {
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
                .get("/api/work")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .get(`/api/work/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("data");
                      //   ();
                    });
                });
            });
        });
    });
  });

  /**
   * Testing updating a work
   */

  describe("PUT /work/:id", () => {
    it("It should update a work", () => {
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
                .get("/api/work")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .put(`/api/work/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .send({
                      title: "testing",
                      link: "link",
                      description: "i am just testing",
                      cards: ["mocha", "chai"],
                    })
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("work updated");
                      //   ();
                    });
                });
            });
        });
    });
  });

  /**
   * Testing deleting a work
   */

  describe("PUT /work/:id", () => {
    it("It should update a work", () => {
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
                .get("/api/work")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .delete(`/api/work/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("work deleted");
                      //   ();
                    });
                });
            });
        });
    });
  });
});
