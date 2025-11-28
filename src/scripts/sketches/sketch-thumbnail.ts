import type { PolygonField } from "../common/polygonfield";

const sketchCache: Map<EventTarget, PolygonField> = new Map();
document.querySelectorAll('div.collectionLinkContainer').forEach(async (container: Element, _: number) => {

        /// TODO DELETE THIS

            // Grab the data off of the surrounding div
            // const dataSet: DOMStringMap = linkContainer.dataset;
            // const scriptSrc: string = dataSet.scriptSrc!;

            // // Load the sketch script, set its properties, and init it
            // const module = await import(scriptSrc);
            // let loadedSketch = module.sketch;
            // loadedSketch.props = {
            //     ...loadedSketch.props,
            //     fieldWidth: 100,
            //     fieldHeight: 100,
            //     canvasWidth: 100,
            //     canvasHeight: 100,
            //     canvasId: `thumbnail-animation-${dataSet.sketchId}`
            // };
            // loadedSketch.init();
            // loadedSketch.drawFrames(2);
            // loadedSketch.start();
            // sketchCache.set(linkContainer, loadedSketch);
        ///

    let linkContainer = container as HTMLElement
    linkContainer.addEventListener('mouseover', async (_: MouseEvent) => {
        // If we've never started the animation for this container...
        if (!sketchCache.has(linkContainer)) {

            // Grab the data off of the surrounding div
            const dataSet: DOMStringMap = linkContainer.dataset;
            const scriptSrc: string = dataSet.scriptSrc!;

            // Load the sketch script, set its properties, and init it
            const module = await import(scriptSrc);
            let loadedSketch: PolygonField = module.sketch;
            loadedSketch.props = {
                ...loadedSketch.props,
                fieldWidth: 100,
                fieldHeight: 100,
                canvasWidth: 100,
                canvasHeight: 100,
                canvasId: `thumbnail-animation-${dataSet.sketchId}`
            };
            loadedSketch.init();
            sketchCache.set(linkContainer, loadedSketch);
        } else {
            // Get the sketch from the cache and restart it
            let loadedSketch: PolygonField = sketchCache.get(linkContainer)!;
            loadedSketch.start();
        }
    });

    linkContainer.addEventListener('mouseout', async (_: MouseEvent) => {
        if (sketchCache.has(linkContainer)) {
            let loadedSketch: PolygonField = sketchCache.get(linkContainer)!;
            loadedSketch.stop();
        }
    });

});