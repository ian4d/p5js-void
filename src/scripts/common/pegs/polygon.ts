
/**
 * Class that renders and wiggles
 */
export class PolygonPeg {
    p5;
    x = 0;
    y = 0;
    radius = 10;
    initRadius = 10;
    graphics;
    rotation = 0;
    points = [];
    pointCount = 3;

    /**
     * Constructor
     * 
     * @param {*} radius 
     * @param {*} graphics 
     */
    constructor(p5, radius, graphics, pointCount) {
        this.p5 = p5;
        this.radius = radius;
        this.initRadius = radius;
        this.graphics = graphics;
        this.pointCount = pointCount;
    }

    /**
     * Sets position of the polygon in 2d space.
     * 
     * @param {*} xVal 
     * @param {*} yVal 
     */
    setPosition(xVal, yVal) {
        this.x = xVal;
        this.y = yVal;
    }

    /**
     * @returns The initial radius assigned to thisp eg
     */
    getInitialRadius() {
        return this.initRadius;
    }

    /**
     * @returns Radius of circle polygon is inscribed in
     */
    getRadius() {
        return this.radius;
    }

    /**
     * Setter for radius of circle to inscribe polygon in.
     * @param {*} radius 
     */
    setRadius(radius) {
        this.radius = radius;
    }

    /**
     * Draws the polygon
     */
    draw() {
        this.graphics.stroke('black');
        // this.graphics.fill('black');
        this.graphics.noFill();

        this.points = [];
        for (let i = 0; i < this.pointCount; i++) {
            let radians = i*2*Math.PI/this.pointCount;
            this.points.push(
                {
                    x: this.radius*Math.cos(radians + this.rotation)+this.x, 
                    y: this.radius*Math.sin(radians + this.rotation)+this.y
                }
            );
        }

        // Connect every point
        this.graphics.beginShape();
        for(let i = 0; i < this.points.length; i++) {
            this.graphics.vertex(this.x + this.points[i].x, this.y + this.points[i].y);
        }
        this.graphics.endShape(this.p5.CLOSE);

        // Connect last point
        this.rotation = (this.rotation+Math.PI/100) % (2*Math.PI);
    }
}