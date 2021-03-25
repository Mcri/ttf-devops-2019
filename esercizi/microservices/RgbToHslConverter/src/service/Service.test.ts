import chai from "chai";
import { convert } from "./Service";
import { rgb2hslTestData } from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();

describe("Test RGB to HSL converter", () => {
  rgb2hslTestData.forEach((color) => {
    it(`should convert Rgb value ${JSON.stringify(
      color.rgbValue
    )} to corresponding Hsl value ${JSON.stringify(color.hslValue)}`, () => {
      convert(color.rgbValue).should.deep.equal(color.hslValue);
    });
  });
});
