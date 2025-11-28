import type { Field } from "../../common/field";
import type { Polygon } from "../../common/pegs/polygon";
import { PolygonField } from "../../common/polygonfield";

let sketch2WaveCount = 0;
let sketch2PegRadiusDelta = 0;

export const sketch = new PolygonField({
    // Default values
    fieldHeight: 600,
    fieldWidth: 600,
    canvasHeight: 600,
    canvasWidth: 600,
    animationEnabled: true,

    // Specific to this field
    verticeCount: 4,

    fieldUpdateFunction: (field: Field) => {
        console.debug(`Updating Field ${field}`);
        sketch2WaveCount = sketch2WaveCount + 2 * (Math.PI / 180);
        sketch2WaveCount = sketch2WaveCount % (2 * Math.PI);
        sketch2PegRadiusDelta = 2 * Math.sin(sketch2WaveCount);
    },

    pegUpdateFunction: (peg: Polygon) => {
        peg.rotation = (peg.rotation + Math.PI / 100) % (2 * Math.PI);
        peg.setRadius(3 + sketch2PegRadiusDelta);
    }
});