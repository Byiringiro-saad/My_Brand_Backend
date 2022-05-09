process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Test skills apis", () => {
  /**
   * Testing create skill api
   */

  describe("POST /skills/create", () => {
    it("Shoult create a skill", () => {
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
                .post("/api/skills/create")
                .set("authorization", "Bearer " + token)
                .send({
                  title: "Testing",
                  banner: "testing",
                  skills: [
                    {
                      name: "test",
                      percent: "10",
                    },
                    {
                      name: "test",
                      percent: "40",
                    },
                  ],
                })
                .end((err, res) => {
                  //   console.log(res);
                  res.body.should.have.property("message");
                  res.body.message.should.equal("skill created");
                  //   ();
                });
            });
        });
    });
  });

  /**
   * Testing get skills
   */

  describe("GET /skills", () => {
    it("It should get all skills", () => {
      chai
        .request(server)
        .get("/api/skills")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          //   ();
        });
    });
  });

  /**
   * Testing updating a skill
   */

  describe("PUT /skills/:id", () => {
    it("It should update a skill", () => {
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
                .get("/api/skills")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .put(`/api/skills/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .send({
                      title: "Testing",
                      banner: "testing",
                      skills: [
                        {
                          name: "test",
                          percent: "10",
                        },
                        {
                          name: "test",
                          percent: "40",
                        },
                      ],
                    })
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("skill updated");
                      //   ();
                    });
                });
            });
        });
    });
  });

  /**
   * Testing deleting a skill
   */

  describe("DELETE /skills/:id", () => {
    it("It should delete a skill", () => {
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
                .get("/api/skills")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property("data");

                  chai
                    .request(server)
                    .delete(`/api/skills/${res.body.data[0]._id}`)
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property("message");
                      res.body.message.should.equal("skill deleted");
                      //   ();
                    });
                });
            });
        });
    });
  });
});
