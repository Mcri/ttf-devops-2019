import chai from 'chai';
import {convert} from './Service';
import {hex2rgbTestData} from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();

describe('test suite description', () => {
    hex2rgbTestData.forEach((test) => {
        it(`Should convert Hex value to corresponding RGB value`, () => {
            convert(test.hexValue).should.deep.equal(test.rgbValue);
        });
    });
});
