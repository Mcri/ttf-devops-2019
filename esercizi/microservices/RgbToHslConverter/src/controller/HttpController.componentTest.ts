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
    it(`should include in the response body the correct hsl value`, (done) => {
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
});
