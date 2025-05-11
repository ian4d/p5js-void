

export class Field {

    p5;

    // Fields have dimensions
    width;
    height;

    // Fields have positions
    x;
    y;

    // Fields have a graphics buffer they draw on
    graphics;

    // Fields have a set of pegs that they draw iteratively
    pegs = [];

    // Fields have a bg color
    bgColor = 'white';

    // A function used to override default peg draw behavior
    pegDrawHandler;

    // A function used to override default wheel behavior
    // Expects mouse event and collection of pegs
    mouseWheelHandler;

    percent = 50;

    labelText;

    /**
     * Constructor.
     * 
     * @param {*} x X position of field 
     * @param {*} y Y position of field
     * @param {*} width width of field
     * @param {*} height height of field
     * @param {*} labelText text to display on label
     */
    constructor(p5, x, y, width, height, labelText) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.graphics = p5.createGraphics(width, height);
        this.labelText = labelText;
        // this.label = this.graphics.text("LABEL",width,height);
    }

    /**
     * Sets the position of the field in 2d space
     * @param {*} xVal 
     * @param {*} yVal 
     */
    setPosition(xVal, yVal) {
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
    addPeg(peg) {
        this.pegs.push(peg);
    }

    /**
     * Draws field background and all pegs on the field
     */
    draw() {
        // Reset the background of the graphics
        this.graphics.background(this.bgColor);

        // Draw all the pegs using default method, or using draw handler if availble
        this.pegDrawHandler
            ? this.pegs.forEach((peg) => this.pegDrawHandler(peg))
            : this.pegs.forEach((peg) => peg.draw());

        // this.graphics.line(0, this.height, (this.percent / 100) * this.width, this.height);

        this.p5.image(this.graphics, this.x, this.y);
        // text(this.labelText, this.x, this.y + this.height);
    }

    // Fields are prepared to handle mouse wheel events
    handleMouseWheel(mouseEvent) {
        if (this.mouseWheelHandler) {
            this.mouseWheelHandler(mouseEvent, this.pegs);
        }
    }


}