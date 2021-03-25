import chai from 'chai';
import {convert} from './Service';
import {hsl2cmykTestData} from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();

describe('test suite description', () => {
    hsl2cmykTestData.forEach((test) => {
        it(`Should convert CMYK value to corresponding HSL value`, () => {
            convert(test.cmykValue).should.deep.equal(test.hslValue);
        });
    });
});
