/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

import {gsap, ExpoScaleEase, Flip, MotionPathPlugin, RoughEase, SlowMo, SplitText} from "./external/greensock/all.js";
import {InitializeDomElements, Initialize, SessionData, SetPhase, Update} from "../kult.js";
import U from "./utilities.js";
import C from "./constants.js";
import TarotDeck from "./tarot-deck.js";
import TarotCard from "./tarot-card.js";

const DEBUG = {
	isTestingMajorArcana: true,
	// isLimitingDeckSize: 2,
	FUNCS: {
		"To Orbit": [() => {
			gsap.globalTimeline.timeScale(10);
			gsap.delayedCall(5, () => {
				const deck = SessionData.decks[2];
				SetPhase(C.phases.cardsInOrbit, {deck});
				gsap.delayedCall(13, () => {
					gsap.globalTimeline.timeScale(1);
				});
			});
		}, () => {
			gsap.globalTimeline.timeScale(10);
			gsap.delayedCall(5, () => {
				const deck = SessionData.decks[2];
				deck._deck = deck._deck.filter((deckData) => !("suit" in deckData) || ["Crescents", "Eyes", "Hourglasses"].includes(deckData.suit));
				SetPhase(C.phases.cardsInOrbit, {deck});
				gsap.delayedCall(13, () => {
					gsap.globalTimeline.timeScale(1);
				});
			});
		}, "black", "white"],
		"To Dealt": [() => {
			gsap.globalTimeline.timeScale(10);
			gsap.delayedCall(5, () => {
				const deck = SessionData.decks[2];
				SetPhase(C.phases.cardsInOrbit, {deck});
				gsap.delayedCall(13, () => {
					SessionData.deck.cards.slice(0, 5).forEach((card) => card.deal());
					gsap.delayedCall(13, () => {
						gsap.globalTimeline.timeScale(1);
					});
				});
			});
		}, () => {
			gsap.globalTimeline.timeScale(10);
			gsap.delayedCall(5, () => {
				const deck = SessionData.decks[2];
				deck._deck = deck._deck.filter((deckData) => !("suit" in deckData) || ["Crescents", "Eyes", "Hourglasses"].includes(deckData.suit));
				SetPhase(C.phases.cardsInOrbit, {deck});
				gsap.delayedCall(13, () => {
					SessionData.deck.cards.slice(0, 5).forEach((card) => card.deal());
					gsap.delayedCall(13, () => {
						gsap.globalTimeline.timeScale(1);
					});
				});
			});
		}, "black", "white"],
		"To Revealed": [() => {
			gsap.globalTimeline.timeScale(10);
			gsap.delayedCall(5, () => {
				const deck = SessionData.decks[2];
				SetPhase(C.phases.cardsInOrbit, {deck});
				gsap.delayedCall(13, () => {
					SessionData.deck.cards.slice(0, 5).forEach((card) => card.deal());
					gsap.delayedCall(13, () => {
						Object.values(SessionData.layout).forEach(({card}) => card.flip());
						gsap.globalTimeline.timeScale(1);
					});
				});
			});
		}, () => {
			gsap.globalTimeline.timeScale(10);
			gsap.delayedCall(5, () => {
				const deck = SessionData.decks[2];
				deck._deck = deck._deck.filter((deckData) => !("suit" in deckData) || ["Crescents", "Eyes", "Hourglasses"].includes(deckData.suit));
				SetPhase(C.phases.cardsInOrbit, {deck});
				gsap.delayedCall(13, () => {
					SessionData.deck.cards.slice(0, 5).forEach((card) => card.deal());
					gsap.delayedCall(13, () => {
						Object.values(SessionData.layout).forEach(({card}) => card.flip());
						gsap.globalTimeline.timeScale(1);
					});
				});
			});
		}, "black", "white"],
		"RotX": [() => gsap.set(".canvas-layer:not(#control-layer)", {rotationX: "+=5"}), () => gsap.set(".canvas-layer:not(#control-layer)", {rotationX: "-=5"}), "#ff66d9"],
		"RotY": [() => gsap.set(".canvas-layer:not(#control-layer)", {rotationY: "+=5"}), () => gsap.set(".canvas-layer:not(#control-layer)", {rotationY: "-=5"}), "#ff66d9"],
		"RotZ": [() => gsap.set(".canvas-layer:not(#control-layer)", {rotationZ: "+=5"}), () => gsap.set(".canvas-layer:not(#control-layer)", {rotationZ: "-=5"}), "#ff66d9"],
		"Perspective": [() => gsap.set(".master-layer", {perspective: "+=100"}), () => gsap.set(".master-layer", {perspective: "-=100"}), "#4da6ff"],
		"X": [() => gsap.set(".canvas-layer:not(#control-layer)", {x: "+=5"}), () => gsap.set(".canvas-layer:not(#control-layer)", {x: "-=5"}), "#ffff33"],
		"Y": [() => gsap.set(".canvas-layer:not(#control-layer)", {y: "+=5"}), () => gsap.set(".canvas-layer:not(#control-layer)", {y: "-=5"}), "#ffff33"],
		"Z": [() => gsap.set(".canvas-layer:not(#control-layer)", {z: "+=5"}), () => gsap.set(".canvas-layer:not(#control-layer)", {z: "-=5"}), "#ffff33"],
		"Scale": [() => gsap.set("#reading-section", {scale: gsap.getProperty("#reading-section", "scale") * 1.1}), () => gsap.set("#reading-section", {scale: gsap.getProperty("#reading-section", "scale") / 1.1}), "navy", "white"],
		"Pause": [
			(event) => {
				if (gsap.globalTimeline.paused()) {
					gsap.globalTimeline.play();
					$(event.target).text("Pause").css({backgroundColor: "#990000"});
				} else {
					gsap.globalTimeline.pause();
					$(event.target).text("Play").css({backgroundColor: "#009900"});
				}
			},
			null,
			"#990000"
		],
		"Time": [() => gsap.globalTimeline.timeScale(gsap.globalTimeline.timeScale() * 1.5), () => gsap.globalTimeline.timeScale(gsap.globalTimeline.timeScale() / 1.5), "brown"],
		"∆⏰∆": [
			(event) => {
				if (gsap.globalTimeline.timeScale() === 10) { // At Max: Go to Min
					gsap.globalTimeline.timeScale(0.2);
					$(event.target).text("▲⏰▲").css({color: "black", backgroundColor: "brown"});
				} else {
					gsap.globalTimeline.timeScale(10);
					$(event.target).text("▼⏰▼").css({color: "white", backgroundColor: "#330033"});
				}
			},
			() => gsap.globalTimeline.timeScale(1),
			"brown"
		],
		"Zero": [
			() => {
				DEBUG.startVals = {
					x: gsap.getProperty("#background-layer", "x"),
					y: gsap.getProperty("#background-layer", "y"),
					z: gsap.getProperty("#background-layer", "z"),
					rotationX: gsap.getProperty("#background-layer", "rotationX"),
					rotationY: gsap.getProperty("#background-layer", "rotationY"),
					rotationZ: gsap.getProperty("#background-layer", "rotationZ"),
					scale: gsap.getProperty("#background-layer", "scale"),
					ghostX: gsap.getProperty("#ghost-slot-1", "x"),
					ghostY: gsap.getProperty("#ghost-slot-1", "y"),
					ghostZ: gsap.getProperty("#ghost-slot-1", "z")
				};
			},
			null,
			"#666666",
			"white"
		],
		"G-X": [() => gsap.set(".ghost-zone", {x: "+=5"}), () => gsap.set(".ghost-zone", {x: "-=5"}), "lime"],
		"G-Y": [() => gsap.set(".ghost-zone", {y: "+=5"}), () => gsap.set(".ghost-zone", {y: "-=5"}), "lime"],
		"G-Z": [() => gsap.set(".ghost-zone", {z: "+=5"}), () => gsap.set(".ghost-zone", {z: "-=5"}), "lime"],
		"G-Height": [() => gsap.set(".ghost-zone", {height: "+=5"}), () => gsap.set(".ghost-zone", {height: "-=5"}), "lime"],
		"G-Width": [() => gsap.set(".ghost-zone", {width: "+=5"}), () => gsap.set(".ghost-zone", {width: "-=5"}), "lime"],
		"G-Scale": [gsap.set(".ghost-zone", {scale: gsap.getProperty("#ghost-slot-1", "scale") * 1.1}), () => gsap.set(".ghost-zone", {scale: gsap.getProperty("#ghost-slot-1", "scale") / 1.1}), "lime"],
		"G-RotX": [() => gsap.set(".ghost-zone", {rotationX: "+=5"}), () => gsap.set(".ghost-zone", {rotationX: "-=5"}), "lime"],
		"PopText": [() => $("#reading-section").toggleClass("show-pop-text"), null, "white"],
		"GhostText": [() => $("#reading-section").toggleClass("show-ghost-text"), null, "white"],
	},
	DATADISPLAYS: {
		get PERSPECTIVE() { return [U.roundNum(gsap.getProperty("#reading-section", "perspective")), "#4da6ff"] },
		get ROTATION() {
			return [[
				`X: ${U.roundNum(gsap.getProperty("#background-layer", "rotationX"))}deg (${U.signNum(U.roundNum(U.getAngleDelta(DEBUG.startVals?.rotationX, gsap.getProperty("#background-layer", "rotationX"))))})`,
				`Y: ${U.roundNum(gsap.getProperty("#background-layer", "rotationY"))}deg (${U.signNum(U.roundNum(U.getAngleDelta(DEBUG.startVals?.rotationY, gsap.getProperty("#background-layer", "rotationY"))))})`,
				`Z: ${U.roundNum(gsap.getProperty("#background-layer", "rotationZ"))}deg (${U.signNum(U.roundNum(U.getAngleDelta(DEBUG.startVals?.rotationZ, gsap.getProperty("#background-layer", "rotationZ"))))})`,
			].join(" "), "#ff66d9"];
		},
		get SHIFTS() {
			return [[
				`X: ${U.signNum(U.roundNum(gsap.getProperty("#background-layer", "x") - DEBUG.startVals?.x))}px`,
				`Y: ${U.signNum(U.roundNum(gsap.getProperty("#background-layer", "y") - DEBUG.startVals?.y))}px`,
				`Z: ${U.signNum(U.roundNum(gsap.getProperty("#background-layer", "z") - DEBUG.startVals?.z))}px`
			].join(" "), "#ffff33"];
		},
		get TIMESCALE() {
			return [gsap.globalTimeline.timeScale(), "brown"];
		},
		get SCALE() {
			return [U.roundNum(gsap.getProperty("#reading-section", "scale"), 2), "cyan"]
		},
		get GHOST() {
			return [[
				`X: ${U.signNum(U.roundNum(gsap.getProperty("#ghost-slot-1", "x") - DEBUG.startVals?.ghostX))}px, ${U.roundNum(gsap.getProperty("#ghost-slot-1", "rotationX"))}deg`,
				`Y: ${U.signNum(U.roundNum(gsap.getProperty("#ghost-slot-1", "y") - DEBUG.startVals?.ghostY))}px, ${U.roundNum(gsap.getProperty("#ghost-slot-1", "rotationY"))}deg`,
				`Z: ${U.signNum(U.roundNum(gsap.getProperty("#ghost-slot-1", "z") - DEBUG.startVals?.ghostZ))}px, ${U.roundNum(gsap.getProperty("#ghost-slot-1", "rotationZ"))}deg`,
				`Height: ${U.roundNum(gsap.getProperty("#ghost-slot-1", "height"))}`,
				`Width: ${U.roundNum(gsap.getProperty("#ghost-slot-1", "width"))}`,
				`Scale: ${U.roundNum(gsap.getProperty("#ghost-slot-1", "scale"))}`
				].join(" "), "lime"];
		}
	},
	PING: (posRef, {parentSelector, label, color = "cyan", bgColor = "lime", shadowColor = "black"} = {}) => {
		let x, y, z;
		if ("id" in posRef) {
			parentSelector = $(parentSelector ?? $(posRef).parent());
			x = gsap.getProperty(posRef, "x");
			y = gsap.getProperty(posRef, "y");
			z = gsap.getProperty(posRef, "z");
		} else {
			parentSelector = $(parentSelector ?? "body");
			({x, y, z} = posRef);
		}
		const backgroundColor = `rgba(${[...gsap.utils.splitColor(bgColor), 0.2].join(", ")})`;
		console.log(backgroundColor);
		const textShadow = Boolean(shadowColor) ? new Array(4).fill(`0 0 4px ${shadowColor}`).join(", ") : "none";
		const [pingElem] = $("<div class=\"ping\"></div>").appendTo(parentSelector);
		if (label) {
			const [labelElem] = $(`<span class=\"label\">${label}</span>`).appendTo(pingElem);
			gsap.set(labelElem, {
				display: "block",
				marginTop: -20,
				width: "80%",
				textAlign: "center",
				marginLeft: "-40%",
				color: "white",
				background: "inherit",
				outline: "inherit",
				borderRadius: 25,
				fontFamily: "Arial",
				textShadow: new Array(8).fill(`0 0 4px black`).join(", ") 
			});
		}
		const [coordElem] = $("<span class=\"coords\"></span>").appendTo(pingElem)
			.html([parseInt(x), parseInt(y), parseInt(z)].join("<br>"));
		gsap.set(pingElem, {
			xPercent: -50,
			yPercent: -50,
			x, y, z,
			rotationZ: -1 * gsap.getProperty(parentSelector[0], "rotationZ"),
			height: 60,
			width: 60,
			borderRadius: 50,
			position: "absolute",
			backgroundImage: "radial-gradient(black, white 3px, black 6px, white 9px, transparent 9px)",
			backgroundColor,
			outline: `2px solid ${bgColor}`,
			color,
			fontFamily: "Fira Code",
			fontWeight: "bold",
			textAlign: "center",
			lineHeight: "20px",
			fontSize: 14,
			zIndex: 1000000,
			paddingLeft: 60,
			textShadow 
		});
		return pingElem;
	},
	C, U,
	gsap, ExpoScaleEase, Flip, MotionPathPlugin, RoughEase, SlowMo, SplitText,
	TarotDeck, TarotCard,
	initialize: () => {
		// Fetch debug layer & kill everything inside it.
		const $debugLayer = $("#debug-layer"); // .children().remove();
	
		// Store debug data on debug layer for console retrieval:
		DEBUG.SessionData = SessionData;
		DEBUG.SetPhase = SetPhase;
		DEBUG.Update = Update;
		$debugLayer.data({DB: DEBUG});

		console.log("INITIALIZING DEBUG");
		console.log($debugLayer[0]);
		
		// Log .canvas-layer data for deltas comparison:
		DEBUG.startVals = {
			x: gsap.getProperty("#background-layer", "x"),
			y: gsap.getProperty("#background-layer", "y"),
			z: gsap.getProperty("#background-layer", "z"),
			rotationX: gsap.getProperty("#background-layer", "rotationX"),
			rotationY: gsap.getProperty("#background-layer", "rotationY"),
			rotationZ: gsap.getProperty("#background-layer", "rotationZ"),
			scale: gsap.getProperty("#background-layer", "scale"),
			ghostX: gsap.getProperty("#ghost-slot-1", "x"),
			ghostY: gsap.getProperty("#ghost-slot-1", "y"),
			ghostZ: gsap.getProperty("#ghost-slot-1", "z")
		};

		// Create display container:
		const $displayContainer = $("<div id=\"display-container\"></div>")
			.appendTo($debugLayer)
			.css({
				display: "flex",
				flexFlow: "row",
				position: "absolute",
				bottom: 50,
				flexWrap: "wrap"
			});

		// Create displays for each data type, as well as animationStep function to update them:
		for (const displayName of Object.keys(DEBUG.DATADISPLAYS)) {
			const [, color] = DEBUG.DATADISPLAYS[displayName];
			
			// ... Create data container:
			const $dataContainer = $("<span class=\"debug-display\"></span>")
				.appendTo($displayContainer)
				.css({
					display: "inline-block",
					color,
					fontFamily: "Fira Code",
					fontSize: 16,
					textShadow: "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
					lineHeight: "20px",
					height: 20,
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
				.text(DEBUG.DATADISPLAYS[displayName][0]);
			// ... Create update function:
			gsap.ticker.add(() => $dataOutput.text(DEBUG.DATADISPLAYS[displayName][0]));
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
		for (const [name, data] of Object.entries(DEBUG.FUNCS)) {
			const [clickFunc, contextFunc, backgroundColor = gsap.utils.random(["lime", "cyan", "yellow", "magenta", "gold", "lightgrey"]), color = "black"] = data;
			const $button = $(`<button class="debug-button">${name}</button>`)
				.appendTo($buttonContainer)
				.css({
					display: "block",
					margin: 5,
					height: 25,
					width: 100,
					borderRadius: 5,
					pointerEvents: "all",
					color,
					backgroundColor
				});
			if (clickFunc) {
				$button.click((event) => {
					event.preventDefault();
					clickFunc(event);
					gsap.to($button, {
						filter: "invert(1)",
						duration: 0.25,
						ease: "sine.inOut",
						repeat: 1,
						yoyo: true
					});
				});
			}
			if (contextFunc) {
				$button.contextmenu((event) => {
					event.preventDefault();
					contextFunc(event);
					gsap.to($button, {
						filter: "invert(1)",
						duration: 0.25,
						ease: "sine.inOut",
						repeat: 1,
						yoyo: true
					});
				});
			}
		}
	}
};

export default DEBUG;