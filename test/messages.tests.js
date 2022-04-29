import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("Test message APIs", () => {
  /**
   * Testing get all messages api
   */

  describe("GET /message", () => {
    it("It should get all messages", () => {
      chai
        .request(server)
        .get("/api/messages")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Tetsing get one message api
   */
  /**
   * Testing send reply api
   */
  /**
   * Testing send message api
   */
  /**
   * Testing delete message api
   */
});
