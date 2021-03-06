import {convert} from '../service/Service';
import {Express} from 'express';
import { TtfHex, TtfHsl } from '../../../commons/src/model/Color';

class HttpController {
    constructor(server: Express) {
        server.get('/', (req, res) => {
            try {
                const color = JSON.parse(req.query.color as string) as TtfHex;
                const convertedColor: TtfHsl = convert(color);
                res.send(convertedColor);
            }
            catch (err) {
                const errMsg ="Error! The correct usage for this service is: localhost/hex_to_hsl?color={'hex': <string>}";
                res.status(400).json({ error: errMsg });
            }
        });
    }
}

export default HttpController;
