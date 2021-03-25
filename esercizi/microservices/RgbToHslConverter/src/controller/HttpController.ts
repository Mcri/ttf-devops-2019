import { convert } from "../service/Service";
import { Express } from "express";
import { TtfRgb, TtfHsl } from "../../../commons/src/model/Color";

class HttpController {
  constructor(server: Express) {
    server.get("/", (req, res) => {
      try {
        const color = JSON.parse(req.query.color as string) as TtfRgb;
        if (
          color.red === undefined ||
          !color.green === undefined ||
          !color.blue === undefined
        )
          throw new Error();
        const convertedColor: TtfHsl = convert(color);
        res.send(convertedColor);
      } catch (err) {
        const errMsg =
          "Error! The correct usage for this service is: localhost:RgbToHslController?color={'red': <number>, 'green': <number>, 'blue': <number>}";
        res.status(400).json({ error: errMsg });
      }
    });
  }
}

export default HttpController;
