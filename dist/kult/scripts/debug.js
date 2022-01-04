/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

import {InitializeDomElements, Initialize} from "./kult-tarot.js";

export default {
	isTestingMajorArcana: true,
	// isLimitingDeckSize: 10,
	FUNCS: {
		"RotX+": () => gsap.set(".canvas-layer", {rotateX: "+=5"}),
		"RotX-": () => gsap.set(".canvas-layer", {rotateX: "-=5"}),
		"RotY+": () => gsap.set(".canvas-layer", {rotateY: "+=5"}),
		"RotY-": () => gsap.set(".canvas-layer", {rotateY: "-=5"}),
		"RotZ+": () => gsap.set(".canvas-layer", {rotateZ: "+=5"}),
		"RotZ-": () => gsap.set(".canvas-layer", {rotateZ: "-=5"}),
		"Persp+": () => gsap.set(".master-layer", {perspective: "+=100"}),
		"Persp-": () => gsap.set(".master-layer", {perspective: "-=100"}),
		"X+": () => gsap.set(".canvas-layer", {x: "+=5"}),
		"X-": () => gsap.set(".canvas-layer", {x: "-=5"}),
		"Y+": () => gsap.set(".canvas-layer", {y: "+=5"}),
		"Y-": () => gsap.set(".canvas-layer", {y: "-=5"}),
		"Z+": () => gsap.set(".canvas-layer", {z: "+=5"}),
		"Z-": () => gsap.set(".canvas-layer", {z: "-=5"}),
		"Persp-": () => gsap.set(".master-layer", {
			perspective(i, elem) { return gsap.getProperty(elem, "perspective") - 100 },
			immediateRender: true
		}),
		"Pause": () => gsap.globalTimeline.pause(),
		"Play": () => gsap.globalTimeline.play(),
		"Reset": () => {
			InitializeDomElements();
			Initialize();
		}
	},
	DATADISPLAYS: {
		get PERSPECTIVE() { return U.roundNum(gsap.getProperty("#tarot-reading-layer", "perspective")) },
		get ROTATION() {
			return [
				`X: ${U.roundNum(gsap.getProperty("#background-layer", "rotationX"))}deg`,
				`Y: ${U.roundNum(gsap.getProperty("#background-layer", "rotationY"))}deg`,
				`Z: ${U.roundNum(gsap.getProperty("#background-layer", "rotationZ"))}deg`,
				`(${U.roundNum(gsap.getProperty("#background-layer", "rotation"))}deg)`
			].join(" ");
		}
	},
	initialize: () => {
		// Create debug layer:
		const $debugLayer = $("<section id=\"debug-layer\"></section>")
			.appendTo("body")
			.css({
				position: "fixed",
				zIndex: 10000,
				height: "100%",
				width: "100%"
			});

		// Store global variables and classes on layer:
		$debugLayer.data({gsap, Draggable, Flip, TarotDeck, TarotCard});

		// Create display container:
		const $displayContainer = $("<div id=\"display-container\"></div>")
			.appendTo($debugLayer)
			.css({
				display: "flex",
				flexFlow: "row",
				position: "absolute",
				bottom: 150,
				flexWrap: "wrap"
			});

		// Create displays for each data type, as well as animationStep function to update them:
		for (const displayName of Object.keys(DEBUG.DATADISPLAYS)) {
			// ... Create data container:
			const $dataContainer = $("<span class=\"debug-display\"></span>")
				.appendTo($displayContainer)
				.css({
					display: "inline-block",
					color: gsap.utils.random(["lime", "cyan", "yellow", "magenta", "gold", "lightgrey"]),
					fontFamily: "Fira Code",
					fontSize: 16,
					textShadow: "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
					lineHeight: 16,
					height: 16,
					width: "auto"
				});
			// ... Create data label:
			const $dataLabel = $("<span class=\"debug-data-label\"></span>")
				.appendTo($dataContainer)
				.css({
					fontWeight: "bold",
					marginRight: 10,
					marginLeft: 10
				})
				.text(`${displayName}:`);
			// ... Create data output:
			const $dataOutput = $("<span class=\"debug-data-output\"></span>")
				.appendTo($dataContainer)
				.text(DEBUG.DATADISPLAYS[displayName]);
			// ... Create update function:
			gsap.ticker.add(() => $dataOutput.text(DEBUG.DATADISPLAYS[displayName]));
		}

		// Create button panel container:
		const $buttonContainer = $("<div id=\"button-container\"></div>")
			.appendTo($debugLayer)
			.css({
				"display": "flex",
				"flexWrap": "wrap",
				"flexDirection": "column",
				"alignContent": "end",
				"float": "right",
				"maxHeight": "25%"
			});

		// Create buttons for configured debug functions:
		for (const [name, func] of Object.entries(DEBUG.FUNCS)) {
			$(`<button class="debug-button">${name}</button>`)
				.appendTo($buttonContainer)
				.css({
					display: "block",
					margin: 5,
					height: 25,
					width: 50,
					borderRadius: 5,
					pointerEvents: "all",
					backgroundColor: gsap.utils.random(["lime", "cyan", "yellow", "magenta", "gold", "lightgrey"])
				})
				.click(func);
		}
	}
};