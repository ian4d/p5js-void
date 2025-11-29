import type { Field } from "../../common/field";
import type { Polygon } from "../../common/pegs/polygon";
import { PolygonField } from "../../common/polygonfield";

let sketch1WaveCount = 0;
let sketch1PegRadiusDelta = 0;

export const sketch: PolygonField = new PolygonField({
    // Default values
    fieldHeight: 600,
    fieldWidth: 600,
    canvasHeight: 600,
    canvasWidth: 600,
    animationEnabled: true,
    autoInit: true,

    // Specific to this field
    verticeCount: 3,

    fieldUpdateFunction: (field: Field) => {
        // console.debug(`Updating Field ${field}`);
        sketch1WaveCount = sketch1WaveCount + 2 * (Math.PI / 180);
        sketch1WaveCount = sketch1WaveCount % (2 * Math.PI);
        sketch1PegRadiusDelta = 2 * Math.sin(sketch1WaveCount);
    },

    pegUpdateFunction: (peg: Polygon) => {
        peg.rotation = (peg.rotation + Math.PI / 100) % (2 * Math.PI);
        peg.setRadius(3 + sketch1PegRadiusDelta);
    }
});
