import type { Graphics } from "p5";

/**
 * Represents any type of peg that we might want to render.
 */
export interface Peg {

    /**
     * X coordinate of this peg.
     */
    x: number;

    /**
     * Y coordinate of this peg.
     */
    y: number;

    /**
     * Rotation of the peg in radians;
     */
    rotation: number;

    /**
     * Graphics instance to draw to.
     */
    graphics: Graphics;

    /**
     * Sets the position of the peg.
     * @param xVal New X coordinate
     * @param yVal New Y coordinate
     */
    setPosition(xVal: number, yVal: number): void;

    /**
     * Sets the X coordinate for this peg.
     * @param xVal New X coordinate
     */
    setX(xVal: number): void;

    /**
     * Sets the Y coordinate for this peg.
     * @param yVal New Y coordinate
     */
    setY(yVal: number): void;

    /**
     * Sets the rotation of this peg.
     * @param radians Rotation in radians
     */
    setRotation(radians: number): void;

    /**
     * Draws the peg to the screen.
     */
    draw(): void;
}