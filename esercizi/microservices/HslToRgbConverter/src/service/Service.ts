import colorConverter from "color-convert";
import { HSL } from "color-convert/conversions";
import { TtfHsl, TtfRgb } from "../../../commons/src/model/Color";

export function convert(color: TtfHsl): TtfRgb {
  const colorToConvert: HSL = [color.hue, color.saturation, color.lightness];
  const convertedColor = colorConverter.hsl.rgb(colorToConvert);
  return {
    red: convertedColor[0],
    green: convertedColor[1],
    blue: convertedColor[2],
  } as TtfRgb;
}
