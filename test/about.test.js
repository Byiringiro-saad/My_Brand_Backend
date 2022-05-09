process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe('Testing about apis', () => {
    /**
    * Testing creating an about api
    */

    describe('POST /about/create', () => {
        it("should create an about", () => {
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
                                .post("/api/about/create")
                                .set("authorization", "Bearer " + token)
                                .attach("picture", "images/Splash.jpg")
                                .attach("about", "files/text.txt")
                                .end((err, res) => {
                                    console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("message");
                                    res.body.message.should.equal("about created");
                                    // done();
                                });
                        });
                });
        })
    })

    /**
     * Testing get an about
     */

    describe("GET /about", () => {
        it("It should get an about", () => {
            chai
                .request(server)
                .get("/api/about")
                .end((err, res) => {
                    //   console.log(res);
                    res.should.have.status(200);
                    res.body.should.have.property("data");
                    //   ();
                });
        });
    });

    /**
    * Testing upadting an about content api
    */

    describe('POST /about/{id}/content', () => {
        it("should update an about content", () => {
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
                                .get("/api/about")
                                .end((err, res) => {
                                    //   console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("data");
                                    //   ();

                                    chai
                                        .request(server)
                                        .post(`/api/about/${res.body.data[0]._id}/content`)
                                        .set("authorization", "Bearer " + token)
                                        .attach("about", "files/text.txt")
                                        .end((err, res) => {
                                            console.log(res);
                                            res.should.have.status(200);
                                            res.body.should.have.property("message");
                                            res.body.message.should.equal("about updated");
                                            // done();
                                        });
                                });

                        });
                });
        })
    })

    /**
    * Testing upadting an about image api
    */

    describe('POST /about/{id}/image', () => {
        it("should update an about image", () => {
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
                                .get("/api/about")
                                .end((err, res) => {
                                    //   console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.have.property("data");
                                    //   ();

                                    chai
                                        .request(server)
                                        .post(`/api/about/${res.body.data[0]._id}/image`)
                                        .set("authorization", "Bearer " + token)
                                        .attach("picture", "images/Splash.jpg")
                                        .end((err, res) => {
                                            console.log(res);
                                            res.should.have.status(200);
                                            res.body.should.have.property("message");
                                            res.body.message.should.equal("about updated");
                                            // done();
                                        });
                                });

                        });
                });
        })
    })

})