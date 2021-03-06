import { convert } from "../service/Service";
import { Express } from "express";
import { TtfHsl, TtfRgb } from "../../../commons/src/model/Color";

class HttpController {
  constructor(server: Express) {
    server.get("/", (req, res) => {
      try {
        const color = JSON.parse(req.query.color as string) as TtfHsl;
        const convertedColor: TtfRgb = convert(color);
        res.send(convertedColor);
      } catch (err) {
        const errMsg =
          "Error! The correct usage for this service is: localhost:HslToRgbController?color={'hue': <number>, 'saturation': <number>, 'lightness': <number>}";
        res.status(400).json({ error: errMsg });
      }
    });
  }
}

export default HttpController;
