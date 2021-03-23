import chai from "chai";
import { convert } from "./Service";
import { rgb2hslTestData } from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();

describe("test suite description", () => {
  rgb2hslTestData.forEach((color) => {
    it(`should convert Rgb value to corresponding Hsl value`, () => {
      convert(color.rgbValue).should.deep.equal(color.hslValue);
    });
  });
});
