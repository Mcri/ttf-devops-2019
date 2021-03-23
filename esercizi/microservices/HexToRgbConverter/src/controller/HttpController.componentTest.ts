import chai from 'chai';
import chaiHttp from 'chai-http';
import * as config from '../../server-config.json'
import {hex2rgbTestData} from "../../../commons/src/test-data/colors";

chai.config.includeStack = true;
const should = chai.should();
chai.use(chaiHttp);

describe('Test HexToRgbConverter REST API', () => {
    const url = process.env.npm_config_rgb2hex_test_url || `http://localhost:${config.port}`;
    console.log('Test URL: ' + url);

    hex2rgbTestData.forEach((test) => {
        it(`Should include in the response body the RGB value corresponding to the query: ${test.hexValue.hex}`, (done) => {
            chai.request(url)
                .get('/')
                .query(`color=${JSON.stringify(test.hexValue)}`)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.deep.equal(test.rgbValue);
                    done();
                });
        });
    });
});
