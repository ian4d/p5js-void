const sketchCache: Map<EventTarget, Element> = new Map();
document.querySelectorAll('div.collectionLinkContainer').forEach(async (linkContainer: Element, linkContainerKey: number) => {

        /// TODO DELETE THIS

            // Grab the data off of the surrounding div
            const dataSet: DOMStringMap = linkContainer.dataset;
            const scriptSrc: string = dataSet.scriptSrc!;

            // Load the sketch script, set its properties, and init it
            const module = await import(scriptSrc);
            let loadedSketch = module.sketch;
            loadedSketch.props = {
                ...loadedSketch.props,
                fieldWidth: 100,
                fieldHeight: 100,
                canvasWidth: 100,
                canvasHeight: 100,
                canvasId: `thumbnail-animation-${dataSet.sketchId}`
            };
            loadedSketch.init();
            loadedSketch.drawFrames(2);
            loadedSketch.start();
            sketchCache.set(linkContainer, loadedSketch);
        ///

    linkContainer.addEventListener('mouseover', async (event: MouseEvent) => {
        // If we've never started the animation for this container...
        if (!sketchCache.has(linkContainer)) {

            // Grab the data off of the surrounding div
            const dataSet: DOMStringMap = linkContainer.dataset;
            const scriptSrc: string = dataSet.scriptSrc!;

            // Load the sketch script, set its properties, and init it
            const module = await import(scriptSrc);
            let loadedSketch = module.sketch;
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
            let loadedSketch = sketchCache.get(linkContainer)!;
            loadedSketch.start();
        }
    });

    linkContainer.addEventListener('mouseout', async (event: MouseEvent) => {
        if (sketchCache.has(linkContainer)) {
            sketchCache.get(linkContainer).stop();
        }
    });

});