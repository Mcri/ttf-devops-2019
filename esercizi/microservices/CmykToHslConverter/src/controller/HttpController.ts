import { convert } from "../service/Service";
import { Express } from "express";
import { TtfCmyk, TtfHsl } from "../../../commons/src/model/Color";

class HttpController {
  constructor(server: Express) {
    server.get("/", (req, res) => {
      try {
        const color = JSON.parse(req.query.color as string) as TtfCmyk;

        if (
          color.cyan === undefined ||
          !color.magenta === undefined ||
          !color.yellow === undefined ||
          !color.black == undefined
        )
          throw new Error();

        const convertedColor: TtfHsl = convert(color);
        res.send(convertedColor);
      } catch (err) {
        const errMsg =
          "Error! The correct usage for this service is: localhost:CmykToHslController?color={'cyan': <number>, 'magenta': <number>, 'yellow': <number>, 'black': <number>}";
        res.status(400).json({ error: errMsg });
      }
    });
  }
}

export default HttpController;
