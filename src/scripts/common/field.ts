import type { Graphics } from "p5";
import p5 from "p5";
import type { Polygon } from "./pegs/polygon";
import type { Peg } from "./pegs/peg";

const defaultBackgroundColor = 'white';

/**
 * Properties used to construct fields.
 */
export interface FieldProperties {
    p5: p5,

    // Fields have dimensions
    width: number,
    height: number,

    // Fields have positions
    x: number,
    y: number,

    // Fields have a bg color
    backgroundColor: string,

    // Text to display under field
    labelText?: string

    // Custom handler for MouseWheel events
    mouseWheelHandler?: (wheelEvent: WheelEvent) => void
}

/**
 * Represents a region where pegs are drawn
 */
export class Field {

    p5: p5;
    props: FieldProperties;

    // Fields have positions
    x: number;
    y: number;

    // Fields have a graphics buffer they draw on
    graphics: Graphics;

    // Fields have a set of pegs that they draw iteratively
    pegs: Peg[] = [];

    animate:boolean = false;

    mouseWheelHandler?: (wheelEvent: WheelEvent) => void

    /**
     * Constructor.
     * @param props FieldProperties used to initialize field
     */
    constructor(props: FieldProperties) {
        this.p5 = props.p5;
        this.props = props;
        this.x = props.x;
        this.y = props.y;
        this.graphics = this.p5.createGraphics(this.props.width, this.props.height);
        this.mouseWheelHandler = this.props.mouseWheelHandler;
    }

    /**
     * Sets the position of the field in 2d space
     * @param {*} xVal 
     * @param {*} yVal 
     */
    setPosition(xVal: number, yVal: number) {
        this.x = xVal;
        this.y = yVal;
    }

    /**
     * @returns Field pegs
     */
    getPegs() {
        return this.pegs;
    }

    /**
     * Adds a peg to this field
     * @param {*} peg 
     */
    addPeg(peg: Peg) {
        this.pegs.push(peg);
    }

    /**
     * Draws field background and all pegs on the field
     */
    draw() {
        this.graphics.background(this.props.backgroundColor || defaultBackgroundColor);
        this.pegs.forEach((peg: Peg) => peg.draw());
        this.p5.image(this.graphics, this.x, this.y);
    }

}