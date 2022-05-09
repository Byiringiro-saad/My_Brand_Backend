process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Test experience apis", () => {
  /**
   * Testing creating an experience api
   */

  describe("POST /experiences/create", () => {
    it("It should create an experience", () => {
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
                .post("/api/experiences/create")
                .set("authorization", "Bearer " + token)
                .send({
                  company: "testing",
                  role: "frontend developer",
                  startDate: Date.now(),
                  endDate: Date.now(),
                  content: ["mocha", "chai"],
                })
                .end((err, res) => {
                  console.log(res);
                  res.should.have.status(200);
                  res.body.should.have.property("message");
                  res.body.message.should.equal("experience created");
                  // done();
                });
            });
        });
    });
  });

  /**
   * Testing get all experiences
   */

  describe("GET /experiences", () => {
    it("It should get all experiences", () => {
      chai
        .request(server)
        .get("/api/experiences")
        .end((err, res) => {
          //   console.log(res);
          res.should.have.status(200);
          res.body.should.have.property("data");
          //   ();
        });
    });
  });

  /**
   * Testing getting an experience
   */

  describe("GET /experiences/:id", () => {
    it("It should get an experience", () => {
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
                .get("/api/experiences")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .get(`/api/experiences/${res.body.data[0]._id}`)
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
   * Testing updating an experience
   */

  describe("PUT /experiences/:id", () => {
    it("It should update an experience", () => {
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
                .get("/api/experiences")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .put(`/api/experiences/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .send({
                      company: "testing",
                      role: "frontend developer",
                      startDate: Date.now(),
                      endDate: Date.now(),
                      content: ["mocha", "chai"],
                    })
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("experience updated");
                      //   ();
                    });
                });
            });
        });
    });
  });

  /**
   * Testing deleting a experience
   */

  describe("DELETE /experiences/:id", () => {
    it("It should update a experience", () => {
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
                .get("/api/experiences")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .delete(`/api/experiences/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("experience deleted");
                      //   ();
                    });
                });
            });
        });
    });
  });
});
