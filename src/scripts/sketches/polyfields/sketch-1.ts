import type { Field } from "../../common/field";
import type { Polygon } from "../../common/pegs/polygon";
import { PolygonField } from "../../common/polygonfield";

let sketch1WaveCount = 0;
let sketch1PegRadiusDelta = 0;

const sketchDiv: HTMLElement = document.getElementById('sketch')!;
const sketchDivStyle: CSSStyleDeclaration = window.getComputedStyle(sketchDiv);
const paddingLeft = parseFloat(sketchDivStyle.getPropertyValue('padding-left'));
const paddingRight = parseFloat(sketchDivStyle.getPropertyValue('padding-right'));
const canvasWidth: number = Math.min(600, sketchDiv.getBoundingClientRect().width - paddingLeft - paddingRight);
const canvasHeight: number = 600;
export const sketch: PolygonField = new PolygonField({
    // Default values
    fieldHeight: canvasHeight,
    fieldWidth: canvasWidth,
    canvasHeight: canvasHeight,
    canvasWidth: canvasWidth,
    animationEnabled: true,
    autoInit: true,

    // Specific to this field
    verticeCount: 3,

    fieldUpdateFunction: (field: Field) => {
        sketch1WaveCount = sketch1WaveCount + 2 * (Math.PI / 180);
        sketch1WaveCount = sketch1WaveCount % (2 * Math.PI);
        sketch1PegRadiusDelta = 2 * Math.sin(sketch1WaveCount);
    },

    pegUpdateFunction: (peg: Polygon) => {
        peg.rotation = (peg.rotation + Math.PI / 100) % (2 * Math.PI);
        peg.setRadius(3 + sketch1PegRadiusDelta);
    }
});
