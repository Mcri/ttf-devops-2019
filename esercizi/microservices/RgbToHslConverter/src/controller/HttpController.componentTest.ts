import chai from "chai";
import chaiHttp from "chai-http";
import * as config from "../../server-config.json";
import { rgb2hslTestData } from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();
chai.use(chaiHttp);

describe("Test RgbtoHslConverter API", () => {
  const url =
    process.env.npm_config_rgb2hex_test_url ||
    `http://localhost:${config.port}`;
  console.log("Test URL: " + url);

  rgb2hslTestData.forEach((color) => {
    it(`should include in the response body the correct hsl value ${JSON.stringify(
      color.hslValue
    )}`, (done) => {
      chai
        .request(url)
        .get("/")
        .query(`color=${JSON.stringify(color.rgbValue)}`)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.deep.equal(color.hslValue);
          done();
        });
    });
  });

  it("Should return an error message when no value is provided as query parameter", (done) => {
    const errMsg =
      "Error! The correct usage for this service is: localhost/rgb_to_hslr?color={'red': <number>, 'green': <number>, 'blue': <number>}";
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
      "Error! The correct usage for this service is: localhost/rgb_to_hsl?color={'red': <number>, 'green': <number>, 'blue': <number>}";
    const errJson = { error: errMsg };
    const badRequest = "{'red': 200, 'green': 0, 'blue':-50}";
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
      "Error! The correct usage for this service is: localhost/rgb_to_hsl?color={'red': <number>, 'green': <number>, 'blue': <number>}";
    const errJson = { error: errMsg };
    const badRequest = "{'red': 200, 'green': 0}";
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
