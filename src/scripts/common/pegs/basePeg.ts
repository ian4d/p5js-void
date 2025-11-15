import type { Graphics } from "p5";
import type { Peg } from "./peg";

/**
 * Abstract base implementation of Peg interface.
 */
export abstract class BasePeg implements Peg {
    draw(): void {
        throw new Error("Method not implemented.");
    }
    
    x: number = 0;
    y: number = 0;
    rotation: number = 0;
    abstract graphics: Graphics;

    /**
     * {@inheritdoc Peg.setPosition}
     */
    setPosition(xVal: number, yVal: number): void {
        this.x = xVal;
        this.y = yVal;
    }

    /**
     * {@inheritdoc Peg.setX}
     */
    setX(xVal: number): void {
        this.x = xVal;
    }

    /**
     * {@inheritdoc Peg.setY}
     */
    setY(yVal: number): void {
        this.y = yVal;
    }

    /**
     * {@inheritdoc Peg.setRotation}
     */
    setRotation(radians: number): void {
        this.rotation = radians;
    }
}