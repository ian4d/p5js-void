import p5 from "p5";
import { Field } from "../common/field";
import { PolygonPeg } from "../common/pegs/polygon";

const canvasWidth = 620; //window.innerWidth;
const canvasHeight = 620; //window.innerHeight;

// Settings for animated fields
let fields: any = [];
let fieldWidth = 200;
let fieldHeight = 200;
let fieldMargin = 10;
let waveCount = 0;

export const sketch = (s: p5) => {
  s.setup = () => {
    let canvas = s.createCanvas(canvasWidth, canvasHeight);
    canvas.id("primaryCanvas");
    s.colorMode(s.RGB);

    for (let i = 3; i < 12; i++) {
      // Builds the field, adds it to fields
      buildPolygonField(i);
    }

    positionFields();
  };

  /**
   * Positions all the fields in a roughly square grid
   */
  function positionFields() {
    let maxRowCount = Math.floor(Math.sqrt(fields.length));
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      let fieldX =
        Math.floor(i % maxRowCount) *
        (fieldWidth + fieldMargin);
      let fieldY =
        Math.floor(i / maxRowCount) *
        (fieldHeight + fieldMargin);
      field.setPosition(fieldX, fieldY);
    }
  }

  /**
   * Builds a field of wiggly dots
   */
  function buildWiggleDotField() {
    // Create field
    let field = new Field(s, 10, 10, fieldWidth, fieldHeight, 'fieldlabel');

    // Function to interrupt peg drawing and scale pegs
    let minFieldBase = 1;
    let maxFieldBase = 30;
    let fieldBase = 10;
    field.pegDrawHandler = (peg) => {
      // // Find diff between current peg size and base peg size
      let currentSize = peg.getSize();
      let baseSize = peg.getBaseSize();
      let sizeDiff = currentSize - baseSize;

      // Adjust the current size back toward the base (on average)
      currentSize +=
        Math.random() > sizeDiff / fieldBase ? 1 : -1;

      // Update size and draw
      peg.setSize(currentSize);
      peg.draw();
    };

    // Function to respond to mouse events
    field.mouseWheelHandler = (mouseEvent, pegs) => {
      let delta = mouseEvent.deltaY / 10;
      field.percent += delta;
      field.percent = Math.max(
        Math.min(field.percent, 100),
        0,
      );
      pegs.forEach((peg) => {
        peg.setBaseSize(
          minFieldBase +
          (field.percent / 100) *
          (maxFieldBase - minFieldBase),
        );
      });
    };

    // Generate actual pegs
    let pegWidth = 10;
    let pegHeight = 10;
    let paddingFactor = 1.1;
    for (
      row = 0;
      row < fieldHeight / (pegHeight * paddingFactor);
      row++
    ) {
      for (
        col = 0;
        col < fieldWidth / (pegWidth * paddingFactor);
        col++
      ) {
        let peg = new WiggleDot(5, field.graphics);
        let xPos = pegWidth * paddingFactor * col;
        let yPos = pegHeight * paddingFactor * row;
        peg.setPosition(xPos, yPos);
        peg.setBaseSize(10);
        field.addPeg(peg);
      }
    }
    // Add field to field ist
    fields.push(field);
  }

  function buildPolygonField(pointCount) {
    // Build Field
    let field = new Field(
      s,
      0,
      0,
      fieldWidth,
      fieldHeight,
      `${pointCount} sides`,
    );

    // Function to handle mouse wheel events
    let fieldBase = 10;
    let minFieldBase = fieldBase / 2;
    let maxFieldBase = fieldBase * 2;
    field.mouseWheelHandler = (mouseEvent, pegs) => {
      let delta = mouseEvent.deltaY / 10;
      field.percent += delta;
      field.percent = Math.max(
        Math.min(field.percent, 100),
        0,
      );

      fieldBase =
        minFieldBase +
        (field.percent / 100) *
        (maxFieldBase - minFieldBase);

      pegs.forEach((peg) => {
        peg.setRadius(fieldBase);
      });
    };

    // Create pegs
    let pegWidth = 5;
    let pegHeight = 5;
    let pegBaseSize = 30;
    let paddingFactor = 1.1;
    for (
      let row = 0;
      row < fieldHeight / (pegHeight * paddingFactor);
      row++
    ) {
      for (
        let col = 0;
        col < fieldWidth / (pegWidth * paddingFactor);
        col++
      ) {
        let peg = new PolygonPeg(
          p5,
          5,
          field.graphics,
          pointCount,
        );
        let xPos = pegWidth * paddingFactor * col;
        let yPos = pegHeight * paddingFactor * row;
        peg.setPosition(xPos, yPos);
        peg.setRadius(pegBaseSize);
        field.addPeg(peg);
      }
    }

    // Add field to field list
    fields.push(field);
    return field;
  }

  /**
   * Catches and delgates wheel events
   * @param {*} event
   */
  function mouseWheel(event) {
    // fields.forEach(field => field.handleMouseWheel(event));
  }

  s.draw = () => {
    s.background("white");

    let updateVal = 4 * Math.sin(waveCount);

    // console.log(`Update Value: ${updateVal}`);
    fields.forEach((field) => {
      field.draw();
      field.getPegs().forEach((peg) => {
        peg.setRadius(peg.getInitialRadius() + updateVal);
      });
    });
    waveCount = waveCount + 2 * (Math.PI / 180);
    waveCount = waveCount % (2 * Math.PI);
  };
};
new p5(sketch, document.getElementById('sketch'));
