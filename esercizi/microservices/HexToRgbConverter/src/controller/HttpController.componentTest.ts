import chai from "chai";
import chaiHttp from "chai-http";
import * as config from "../../server-config.json";
import { hex2rgbTestData } from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();
chai.use(chaiHttp);

describe("Test HexToRgbConverter REST API", () => {
  const url =
    process.env.npm_config_rgb2hex_test_url ||
    `http://localhost:${config.port}`;
  console.log("Test URL: " + url);

  hex2rgbTestData.forEach((test) => {
    it(`Should include in the response body the RGB value corresponding to the query: ${test.hexValue.hex}`, (done) => {
      chai
        .request(url)
        .get("/")
        .query(`color=${JSON.stringify(test.hexValue)}`)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.deep.equal(test.rgbValue);
          done();
        });
    });
  });

  it("Should return an error message when no value is provided as query parameter", (done) => {
    const errMsg =
      "Error! The correct usage for this service is: localhost/hex_to_rgb?color={'hex': <string>}";
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
      "Error! The correct usage for this service is: localhost/hex_to_rgb?color={'hex': <string>}";
    const errJson = { error: errMsg };
    chai
      .request(url)
      .get("/")
      .query(`color="{'hex': 'sf#na&jsfnaf'}"`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.deep.equal(errJson);
        done();
      });
  });
});
