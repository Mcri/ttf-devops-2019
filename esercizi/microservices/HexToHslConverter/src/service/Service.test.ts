import chai from 'chai';
import {convert} from './Service';
import {hex2hslTestData} from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();

describe('test Hex to HSL converter', () => {
    hex2hslTestData.forEach((test) => {
        it(`Should return the HSL value corresponding to the provided Hex value`, () => {
            convert(test.hexValue).should.deep.equal(test.hslValue);
        });
    });
});
