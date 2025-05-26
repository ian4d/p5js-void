
/**
 * Class that renders and wiggles
 */
export class WiggleDot {
    x = 0;
    y = 0;
    size = 10;
    baseSize = 10;
    graphics;

    /**
     * Constructor
     * 
     * @param {*} baseSize 
     * @param {*} graphics 
     */
    constructor(baseSize, graphics) {
        this.baseSize = baseSize;
        this.graphics = graphics;
    }
    setPosition(xVal, yVal) {
        this.x = xVal;
        this.y = yVal;
    }
    setRotation(degrees) { }

    getSize() {
        return this.size;
    }
    getBaseSize() {
        return this.baseSize;
    }

    setBaseSize(newBaseSize) {
        this.baseSize = newBaseSize;
    }
    setSize(newSize) {
        this.size = newSize;
    }

    draw() {
        this.graphics.stroke('black');
        this.graphics.fill('white');
        this.graphics.circle(this.x, this.y, this.size, this.size);
    }
}