import colorConverter from 'color-convert'
import { RGB } from 'color-convert/conversions';
import {TtfHex, TtfRgb} from "../../../commons/src/model/Color";

export function convert(color: TtfHex): TtfRgb {
    const colorToConvert:TtfHex = color;
    const convertedColor:RGB = colorConverter.hex.rgb(color.hex); 
    return {red: convertedColor[0], green: convertedColor[1], blue: convertedColor[2]} as TtfRgb; 
}
