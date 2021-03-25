import chai from "chai";
import { convert } from "./Service";
import { hsl2rgbTestData } from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();

describe("test suite description", () => {
  hsl2rgbTestData.forEach((color) => {
    it(`Should convert ${JSON.stringify(
      color.hslValue
    )} to corresponding ${JSON.stringify(color.rgbValue)}`, () => {
      convert(color.hslValue).should.deep.equal(color.rgbValue);
    });
  });
});
