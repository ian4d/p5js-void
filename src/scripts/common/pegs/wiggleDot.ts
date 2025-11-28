import type { Graphics } from "p5";

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
     * @param {number} baseSize
     * @param {Graphics} graphics 
     */
    constructor(baseSize: number, graphics: Graphics) {
        this.baseSize = baseSize;
        this.graphics = graphics;
    }
    setPosition(xVal: number, yVal: number) {
        this.x = xVal;
        this.y = yVal;
    }
    setRotation(_: number) { }
    getSize() {
        return this.size;
    }
    getBaseSize() {
        return this.baseSize;
    }

    setBaseSize(newBaseSize: number) {
        this.baseSize = newBaseSize;
    }
    setSize(newSize: number) {
        this.size = newSize;
    }

    draw() {
        this.graphics.stroke('black');
        this.graphics.fill('white');
        this.graphics.circle(this.x, this.y, this.size);
    }
}