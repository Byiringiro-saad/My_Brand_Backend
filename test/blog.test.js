process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe('Testing blog apis', () => {
    /**
    * Testing creating a blog api
    */

    describe('POST /blogs/create', () => {
        it("should create a blog", () => {
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
                                .post("/api/blogs/create")
                                .set("authorization", "Bearer " + token)
                                .attach("picture", "images/Splash.jpg")
                                .attach("blog", "files/text.txt")
                                .end((err, res) => {
                                    console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("message");
                                    res.body.message.should.equal("blog created");
                                    // done();
                                });
                        });
                });
        })
    })

    /**
     * Testing get all blogs
     */

    describe("GET /blogs", () => {
        it("It should get all blogs", () => {
            chai
                .request(server)
                .get("/api/blogs")
                .end((err, res) => {
                    //   console.log(res);
                    res.should.have.status(200);
                    res.body.should.have.property("data");
                    //   ();
                });
        });
    });

    /**
     * Testing get a blog
     */

    describe("GET /blogs/{id}", () => {
        it("It should get a blog", () => {
            chai
                .request(server)
                .get("/api/blogs")
                .end((err, res) => {
                    //   console.log(res);
                    res.should.have.status(200);
                    res.body.should.have.property("data");
                    //   ();

                    chai
                        .request(server)
                        .get(`/api/blogs/${res.body.data[0]._id}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                        })
                });
        });
    });

    /**
    * Testing updating a blog
    */

    describe('PUT /blogs/{id}', () => {
        it("should update a blog", () => {
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
                                .get("/api/blogs")
                                .end((err, res) => {
                                    //   console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("data");
                                    //   ();

                                    chai
                                        .request(server)
                                        .put(`/api/blogs/${res.body.data[0]._id}`)
                                        .set("authorization", "Bearer " + token)
                                        .send({
                                            title: "updated"
                                        })
                                        .attach("blog", "files/text.txt")
                                        .end((err, res) => {
                                            console.log(res);
                                            res.should.have.status(200);
                                            res.body.should.have.property("message");
                                            res.body.message.should.equal("blog updated");
                                            // done();
                                        });
                                });

                        });
                });
        })
    })

    /**
    * Testing liking a blog
    */

    describe('PUT /blogs/{id}/like', () => {
        it("should like a blog", () => {
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
                                .get("/api/blogs")
                                .end((err, res) => {
                                    //   console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("data");
                                    //   ();

                                    chai
                                        .request(server)
                                        .put(`/api/blogs/${res.body.data[0]._id}/like`)
                                        .set("authorization", "Bearer " + token)
                                        .end((err, res) => {
                                            console.log(res);
                                            res.should.have.status(200);
                                            res.body.should.have.property("status");
                                            res.body.message.should.equal("success");
                                            // done();
                                        });
                                });

                        });
                });
        })
    })

    /**
    * Testing commenting on a blog
    */

    describe('PUT /blogs/{id}/comment', () => {
        it("should comment on a blog", () => {
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
                                .get("/api/blogs")
                                .end((err, res) => {
                                    //   console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("data");
                                    //   ();

                                    chai
                                        .request(server)
                                        .put(`/api/blogs/${res.body.data[0]._id}/comment`)
                                        .set("authorization", "Bearer " + token)
                                        .send({
                                            comment: "just testing"
                                        })
                                        .end((err, res) => {
                                            console.log(res);
                                            res.should.have.status(200);
                                            res.body.should.have.property("status");
                                            res.body.message.should.equal("success");
                                            // done();
                                        });
                                });

                        });
                });
        })
    })

    /**
    * Testing delete a blog
    */

    describe('DELETE /blogs/{id}', () => {
        it("should comment on a blog", () => {
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
                                .get("/api/blogs")
                                .end((err, res) => {
                                    //   console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("data");
                                    //   ();

                                    chai
                                        .request(server)
                                        .delete(`/api/blogs/${res.body.data[0]._id}`)
                                        .set("authorization", "Bearer " + token)
                                        .end((err, res) => {
                                            console.log(res);
                                            res.should.have.status(200);
                                            res.body.should.have.property("status");
                                            res.body.message.should.equal("success");
                                            // done();
                                        });
                                });

                        });
                });
        })
    })

})