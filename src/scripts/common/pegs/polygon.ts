import type { Graphics, p5 } from "p5";
import type { Vertex } from "../vertex";
import type { Peg } from "./peg";
import { BasePeg } from "./basePeg";

/**
 * Represents common properties used to create a new Polygon.
 */
export interface PolygonProperties {
    graphics: Graphics
    radius: number,
    pointCount: number
}

/**
 * Class that renders and wiggles
 */
export class Polygon extends BasePeg implements Peg {
    props: PolygonProperties;
    radius: number = 10;
    initialRadius: number = 10;
    points: Vertex[] = [];

    /**
     * Constructor
     */
    constructor(polygonProps: PolygonProperties) {
        super();
        this.props = polygonProps;
    }

    /**
     * @returns The initial radius assigned to thisp eg
     */
    getInitialRadius(): number {
        return this.initialRadius;
    }

    /**
     * @returns Radius of circle polygon is inscribed in
     */
    getRadius(): number {
        return this.radius;
    }

    /**
     * Setter for radius of circle to inscribe polygon in.
     * @param {*} radius 
     */
    setRadius(radius: number) {
        this.radius = radius;
    }

    /**
     * Draws the polygon
     */
    draw(): void {
        this.props.graphics.stroke('black');
        this.props.graphics.noFill();

        this.points = [];
        for (let i = 0; i < this.props.pointCount; i++) {
            let radians = i * 2 * Math.PI / this.props.pointCount;
            this.points.push(
                {
                    x: this.radius * Math.cos(radians + this.rotation) + this.x,
                    y: this.radius * Math.sin(radians + this.rotation) + this.y
                }
            );
        }

        // Connect every point
        this.props.graphics.beginShape();
        this.points.forEach((point: Vertex) => {
            this.props.graphics.vertex(this.x + point.x, this.y + point.y);
        });
        this.props.graphics.vertex(this.x + this.points[0].x, this.y + this.points[0].y);
        this.props.graphics.endShape();
    }
}