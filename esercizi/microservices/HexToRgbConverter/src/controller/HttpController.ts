import { convert } from "../service/Service";
import { Express } from "express";
import { TtfHex, TtfRgb } from "../../../commons/src/model/Color";

class HttpController {
  constructor(server: Express) {
    server.get("/", (req, res) => {
      try {
        const color: TtfHex = JSON.parse(req.query.color as string) as TtfHex;
        if (color.hex === undefined) throw new Error();
        const convertedColor: TtfRgb = convert(color);

        res.send(convertedColor);
      } catch (err) {
        const errMsg =
          "Error! The correct usage for this service is: localhost/hex_to_rgb?color={'hex': <string>}";
        res.status(400).json({ error: errMsg });
      }
    });
  }
}

export default HttpController;
