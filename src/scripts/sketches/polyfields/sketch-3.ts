import type { Field } from "../../common/field";
import type { Polygon } from "../../common/pegs/polygon";
import {PolygonField, type PolygonFieldProperties } from "../../common/polygonfield";

let sketch3WaveCount = 0;
let sketch3PegRadiusDelta = 0;

const sketchDiv: HTMLElement = document.getElementById('sketch')!;
const sketchDivStyle: CSSStyleDeclaration = window.getComputedStyle(sketchDiv);
const paddingLeft = parseFloat(sketchDivStyle.getPropertyValue('padding-left'));
const paddingRight = parseFloat(sketchDivStyle.getPropertyValue('padding-right'));
const canvasWidth: number = Math.min(600, sketchDiv.getBoundingClientRect().width - paddingLeft - paddingRight);
const canvasHeight: number = 600;

export const SketchProps: PolygonFieldProperties = {
    // Default values
    fieldHeight: canvasHeight,
    fieldWidth: canvasWidth,
    canvasHeight: canvasHeight,
    canvasWidth: canvasWidth,
    animationEnabled: true,
    autoInit: true,

    // Specific to this field
    verticeCount: 5,
    
    fieldUpdateFunction: (field: Field) => {
        // console.debug(`Updating Field ${field}`);
        sketch3WaveCount = sketch3WaveCount + 2 * (Math.PI / 180);
        sketch3WaveCount = sketch3WaveCount % (2 * Math.PI);
        sketch3PegRadiusDelta = 2 * Math.sin(sketch3WaveCount);
    },
    pegUpdateFunction: (peg: Polygon) => {
        peg.rotation = (peg.rotation + Math.PI / 100) % (2 * Math.PI);
        peg.setRadius(3 + sketch3PegRadiusDelta);
    }
};

export const sketch = new PolygonField(SketchProps);