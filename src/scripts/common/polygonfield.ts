import p5 from "p5";
import { Field } from "../common/field";
import { Polygon } from "../common/pegs/polygon";
import type { Peg } from "./pegs/peg";

const defaultCanvasWidth = 600;
const defaultCanvasHeight = 600;

// Settings for animated fields
// let fields: Field[] = [];
// let fieldsWithWheelHandlers: Field[] = [];

const defaultBackgroundColor = 'white';

/**
 * Properties needed to instantiate a PolygonField.
 */
export interface PolygonFieldProperties {

    /**
     * Width of the field to draw in.
     */
    fieldWidth: number,

    /**
     * Height of the field to draw in.
     */
    fieldHeight: number,

    /**
     * Number of vertices to use for shapes in this field.
     */
    verticeCount: number,

    /**
     * Whether animation is currently enabled or not
     */
    animationEnabled: boolean,

    /**
     * Height of the canvas to draw in
     */
    canvasHeight?: number,

    /**
     * Width of the canvas to draw in
     */
    canvasWidth?: number,

    /**
     * Optional: DOM Id of the canvas to load the sketch into
     */
    canvasId?: string,

    /**
     * Background color to assign to the field. Default is 'white'
     */
    backgroundColor?: string,

    /**
     * Executed on each Field update.
     */
    readonly fieldUpdateFunction?: (field: Field) => void,

    /**
     * Function used to update each peg before the next draw loop.
     */
    readonly pegUpdateFunction?: (peg: Polygon) => void,

    /**
     * Function run in response to any MouseWheel events.
     */
    readonly mouseWheelHandler?: (wheelEvent: WheelEvent) => void

    /**
     * Function run in response to any KeyPress events
     */
    readonly keyPressHandler?: (KeyboardEvent: KeyboardEvent) => void
}

/**
 * Draws a field of polygons that rotate and scale on the output of a sine wave.
 */
export class PolygonField {

    p5!: p5;
    props: PolygonFieldProperties;
    uid: string = `UID-${Math.random()}`;
    animationEnabled = false;

    field: Field | undefined;
    fields: Field[] = [];
    fieldsWithWheelHandlers: Field[] = [];

    drawFrameCount: number = 0;
    drawFrameBuffer: boolean = false;

    /**
     * Processing Closure, used in p5 constructor.
     * @param s p5 instance
     */
    sketch = (s: p5) => {

        /**
         * Sets up the canvas.
         */
        s.setup = () => {
            let canvas = s.createCanvas(this.props.canvasWidth || defaultCanvasWidth, this.props.canvasHeight || defaultCanvasHeight);
            // canvas.id(this.props.canvasId);
            canvas.id(this.props.canvasId || 'sketch');
            s.frameRate(30);
            s.colorMode(s.RGB);
            this.buildPolygonField(this.props.verticeCount);
            this.fieldsWithWheelHandlers = this.fields.filter((field: Field) => field.mouseWheelHandler !== undefined);
        };

        /**
         * Draw loop.
         */
        s.draw = () => {

            if (this.drawFrameBuffer) {
                this.drawFrameCount = Math.max(0, this.drawFrameCount - 1);
                if (this.drawFrameCount == 0) {
                    this.drawFrameBuffer = false;
                    this.animationEnabled = false;
                }
            }

            s.background(this.props.backgroundColor || defaultBackgroundColor);
            this.fields.forEach((field: Field) => {
                field.draw();
                if (this.props.fieldUpdateFunction && this.animationEnabled === true) {
                    this.props.fieldUpdateFunction(field);
                }
                if (this.props.pegUpdateFunction && this.animationEnabled === true) {
                    field.getPegs().forEach((peg: Peg) => this.props.pegUpdateFunction!(peg as Polygon));
                }
            });
        };

        /**
         * MouseWheel handler.
         * @param wheelEvent WheelEvent that describes what happened
         */
        s.mouseWheel = (wheelEvent: WheelEvent) => {
            this.fieldsWithWheelHandlers.forEach((field: Field) => {
                field.mouseWheelHandler!(wheelEvent);
            })
        }

        /**
         * 
         * @param keyEvent Key event handler
         */
        s.keyPressed = (keyEvent: KeyboardEvent) => {
            if (this.props.keyPressHandler) {
                this.props.keyPressHandler(keyEvent);
            } else {
                if (keyEvent.key === 's') {
                    s.saveGif('mySketch', 3, {
                        delay: 1
                    });
                }
            }
        };

    };

    /**
     * Constructor.
     * 
     * @param props Properties used to build the field
     */
    constructor(props: PolygonFieldProperties) {
        this.props = props;
        if (window.autoInit) {
            this.init();
            this.start();
        }
    }

    /**
     * Builds the field of polygons.
     * @param verticeCount Number of points to use in each polygon in the field.
     */
    buildPolygonField = (verticeCount: number) => {

        // Build the field
        // let field = new Field({
        
        this.field = new Field({    
            p5: this.p5,
            x: 0,
            y: 0,
            width: this.props.fieldWidth,
            height: this.props.fieldHeight,
            backgroundColor: this.props.backgroundColor || defaultBackgroundColor,
            labelText: 'Label Text',
        });

        // Populate the field with pegs
        let pegWidth = 5;
        let pegHeight = 5;
        let pegBaseSize = 30;
        let paddingFactor = 1.1;

        let rowLimit = this.props.fieldHeight / (pegHeight * paddingFactor);
        let colLimit = this.props.fieldWidth / (pegWidth * paddingFactor);
        
        for (let row = 0; row < rowLimit; row++) {
            for (let col = 0; col < colLimit; col++) {
                let peg: Peg = new Polygon({
                    graphics: this.field.graphics,
                    radius: pegBaseSize,
                    pointCount: verticeCount
                });
                let xPos = pegWidth * paddingFactor * col;
                let yPos = pegHeight * paddingFactor * row;
                peg.setPosition(xPos, yPos);
                this.field.addPeg(peg);
            }
        }

        // Add field to field list
        this.fields.push(this.field);
        return this.field;
    }

    init = () => {
        if (!this.p5) {
            let canvasId = this.props.canvasId || 'sketch';
            this.p5 = new p5(this.sketch, document.getElementById(canvasId) as HTMLElement);
            // this.p5.draw();
        }
    }

    stop = () => {
        if (this.p5) {
            this.animationEnabled = false;
            this.props.animationEnabled = false;
        }
    }

    start = () => {
        if (this.p5) {
            this.animationEnabled = true;
            this.props.animationEnabled = true;
        }
    }

    draw = () => {
        if (this.p5) {
            this.p5.draw();
        }
    }

    drawFrames = (frameCount: number) => {
        this.drawFrameCount = frameCount;
        this.drawFrameBuffer = true;
    }

}