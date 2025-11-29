
const sketchContainer = document .getElementById("sketch");
const sketchData = sketchContainer?.dataset.source;
const actualSketch = import (sketchData as string);
console.debug(`Actual Sketch: ${actualSketch}`);
actualSketch.then((module) => {

    if (module && module.sketch) {
        console.log(`Initializing Sketch: ${module.sketch}`);
        module.sketch.init(sketchContainer as HTMLElement);
    } else {
        console.error("No sketch found in module");
    }
});