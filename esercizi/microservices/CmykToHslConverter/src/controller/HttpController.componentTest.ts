import chai from "chai";
import chaiHttp from "chai-http";
import * as config from "../../server-config.json";
import { hsl2cmykTestData } from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();
chai.use(chaiHttp);

describe("Test CmykToHsl REST API", () => {
  const url =
    process.env.npm_config_rgb2hex_test_url ||
    `http://localhost:${config.port}`;
  console.log("Test URL: " + url);

  hsl2cmykTestData.forEach((test) => {
    it(`Should include in the response body the HSL value corresponding to the query: ${test.cmykValue}`, (done) => {
      chai
        .request(url)
        .get("/")
        .query(`color=${JSON.stringify(test.cmykValue)}`)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.deep.equal(test.hslValue);
          done();
        });
    });
  });

  it("Should return an error message when no value is provided as query parameter", (done) => {
    const errMsg =
      "Error! The correct usage for this service is: localhost:CmykToHslController?color={'cyan': <number>, 'magenta': <number>, 'yellow': <number>, 'black': <number>}";
    const errJson = { error: errMsg };
    chai
      .request(url)
      .get("/")
      .query(`color=`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.deep.equal(errJson);
        done();
      });
  });

  it("Should return an error message when an invalid value is provided as query parameter", (done) => {
    const errMsg =
      "Error! The correct usage for this service is: localhost:CmykToHslController?color={'cyan': <number>, 'magenta': <number>, 'yellow': <number>, 'black': <number>}";
    const errJson = { error: errMsg };
    const badRequest =
      "{'cyan': 200, 'magenta': 40, 'yellow': 0, 'black': -70}";
    chai
      .request(url)
      .get("/")
      .query(`color=${badRequest}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.deep.equal(errJson);
        done();
      });
  });

  it("Should return an error message when an incomplete value is provided query parameter", (done) => {
    const errMsg =
      "Error! The correct usage for this service is: localhost:CmykToHslController?color={'cyan': <number>, 'magenta': <number>, 'yellow': <number>, 'black': <number>}";
    const errJson = { error: errMsg };
    const badRequest = "{'cyan': 200, 'yellow': 0, 'black': 70}";
    chai
      .request(url)
      .get("/")
      .query(`color=${badRequest}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.deep.equal(errJson);
        done();
      });
  });
});
