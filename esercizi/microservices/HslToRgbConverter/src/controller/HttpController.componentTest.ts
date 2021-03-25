import chai from "chai";
import chaiHttp from "chai-http";
import * as config from "../../server-config.json";
import { hsl2rgbTestData } from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();
chai.use(chaiHttp);

describe("Test HslToRgbConverter", () => {
  const url =
    process.env.npm_config_rgb2hex_test_url ||
    `http://localhost:${config.port}`;
  console.log("Test URL: " + url);

  hsl2rgbTestData.forEach((color) => {
    it(`Should include in the response body the RGB value corresponding to the query: ${color.rgbValue}`, (done) => {
      chai
        .request(url)
        .get("/")
        .query(`color=${JSON.stringify(color.hslValue)}`)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.deep.equal(color.rgbValue);
          done();
        });
    });
  });

  it("Should return an error message when no value is provided as query parameter", (done) => {
    const errMsg =
      "Error! The correct usage for this service is: localhost:HslToRgbController?color={'hue': <number>, 'saturation': <number>, 'lightness': <number>}";
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
});
