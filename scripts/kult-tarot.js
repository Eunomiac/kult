console.clear();
/*
WHEN DONE:  @Weremir wants to test it 
*/

import {gsap, Draggable, Flip, InertiaPlugin, SlowMo, RoughEase} from "./external/greensock/all.js";
import U from "./utilities.js";
import C from "./constants.js";
// import Table from "./table.js";
import TarotDeck from "./tarot-deck.js";
import TarotCard from "./tarot-card.js";

gsap.registerPlugin(Draggable, Flip, InertiaPlugin, SlowMo, RoughEase);

// #region ▮▮▮▮▮▮▮[UTILITY] Utility Functions ▮▮▮▮▮▮▮ ~


// #endregion ▮▮▮▮[UTILITY]▮▮▮▮

// #region ▮▮▮▮▮▮▮[INITIALIZATION] Initialization, Configuration & Constants ▮▮▮▮▮▮▮ ~
Object.entries({
	explodeOutOverLayer: () => {
		$("#over-layer *").off("click mouseenter");
		const fadeTimeline = gsap.timeline({
			onComplete() {
				Table.Phase = "CardsDealt";
				Table.ReadyReading();
			}
		});
		fadeTimeline.to("#over-layer", {
			// scale: 2,
			opacity: 0,
			ease: "expo.out",
			duration: 2.5,
			onComplete() {
				$("#over-layer *").remove();
				gsap.set("#over-layer", {scale: 1, opacity: 1});
			}
		}, 0);
		fadeTimeline.to(".canvas-layer:not(#over-layer)", {
			scale: 1,
			duration: 3,
			ease: "expo.out"
		}, 0);
		return fadeTimeline;
	},
	fadeInTable: () => {
		const tl = gsap.timeline(/*{immediateRender: true}*/);
		tl.fromTo("#reading-section", {
			rotationZ: 45
		}, {
			rotationZ: 0,
			duration: 6,
			ease: "sine"
		});
		tl.to("#blackout-layer", {
				opacity: 0,
				duration: 6,
				rotationX: 45,
				ease: "sine",
				// immediateRender: true
			}, 0);
		tl.to(".canvas-layer:not(#control-layer):not(#blackout-layer)", {
				scale: 1,
				opacity: 1,
				rotationX: 45,
				duration: 6,
				ease: "sine",
				// immediateRender: true
			}, 0);
		return tl;
	},
	// zoomTo65: (targets) => gsap.to(targets, {
	// 	scale: 0.65,
	// 	duration: 2,
	// 	ease: "power2.out"
	// }),
}).forEach(([name, effect]) => gsap.registerEffect({name, effect}));

const SessionData = {
	deck: false,
	decks: [],
	template: false,
	_phase: C.phases.initDeckSelection,
	inTransition: true,
	get phase() {
		if (this.inTransition) {
			return C.phases.inTransition;
		}
		return this._phase;
	},
	set phase(v) { this._phase = v },
	layout: {
		1: {card: false, shiftCard: false, pos: C.slotPos[1], isFaceUp: false, ghostText: false, promptText: false},
		2: {card: false, shiftCard: false, pos: C.slotPos[2], isFaceUp: false, ghostText: false, promptText: false},
		3: {card: false, shiftCard: false, pos: C.slotPos[3], isFaceUp: false, ghostText: false, promptText: false},
		4: {card: false, shiftCard: false, pos: C.slotPos[4], isFaceUp: false, ghostText: false, promptText: false},
		5: {card: false, shiftCard: false, pos: C.slotPos[5], isFaceUp: false, ghostText: false, promptText: false}
	},
	get nextFaceDownSlot() { return [1, 2, 3, 4, 5].find((slot) => this.layout[slot].card && this.layout[slot].isFaceUp === false) },
	get nextEmptySlot() { return [1, 2, 3, 4, 5].find((slot) => this.layout[slot].card === false) },
	get cards() { return Object.values(this.layout).map(({card}) => card) }
};

const SetPhase = (phase, data) => {
	if (phase in C.phases) {
		SessionData.phase = C.phases[phase];
		console.log(`*** SWITCHING PHASE TO: ${C.phases[phase]}`);
		switch (phase) {
			case C.phases.deckSelection: return initDeckSelection();
			case C.phases.cardsInOrbit: return initCardsOrbit(data);
			default: return true;
		}
	}
}

const Update = () => { }

const initDeckSelection = () => {
	SessionData.inTransition = true;	
	gsap.effects.fadeInTable().then(() => {
		$("#blackout-layer").remove();
		SessionData.inTransition = false;
	});
}

const initCardsOrbit = ({deck}) => {
	SessionData.inTransition = true;
	SessionData.deck = deck;
	console.log("Starting Orbit");
	console.log(SessionData);
	SessionData.deck.initMainDeck();
	// Vanish other decks
	// center chosen deck
	// replace chosen deck 'box' with pile of cards
	// then tell deck to deal cards
	// SessionData.inTransition = false;
}

const InitializeDomElements = () => {
	gsap.set("#blackout-layer, .canvas-layer", {
		xPercent: -50,
		yPercent: -50,
		x: "50vw",
		y: "50vh",
		z(i, elem) {
			switch (elem.id) {
				case "blackout-layer": return 500;
				case "background-layer": return C.layers.baseZ - 2;
				case "under-layer": return C.layers.baseZ - 1;
				case "card-layer": return C.layers.baseZ;
				case "over-layer": return C.layers.baseZ + C.layers.vertShift;
				case "control-layer": return C.layers.baseZ + (2 * C.layers.vertShift);
			}
		},
		rotationX(i, elem) {
			switch (elem.id) {
				case "control-layer": return 0;
				default: return 80;
			}
		},
		opacity: 1,
		scale(i, elem) {
			switch (elem.id) {
				case "background-layer":
				case "under-layer":
				case "card-layer": 
				case "over-layer": // return 3;
				case "blackout-layer":
				case "control-layer": return 1;
			}
		},
		immediateRender: true
	});
	
	// Build Decks
	const deckTypes = Object.keys(C.numCardBacksByType);

	const decks = Object.keys(C.numCardBacksByType).map((deckType) => new TarotDeck(deckType, SessionData));
	const [row1, row2] = U.partition(decks, (v, k) => k <= Math.ceil(decks.length / 2) - 1);

	const row1Margin = (gsap.getProperty("#card-layer", "width") - (C.card.width * row1.length) - (C.spacing.x * (row1.length - 1))) / 2;
	const row2Margin = (gsap.getProperty("#card-layer", "width") - (C.card.width * row2.length) - (C.spacing.x * (row2.length - 1))) / 2;

	row1.forEach((deck, i) => {
		deck.x = row1Margin + (0.5 * C.card.width) + i * (C.spacing.x + C.card.width);
		deck.y = 1 * C.card.height;
		SessionData.decks.push(deck);
		console.log({[`Row 1, Deck ${i}`]: {x: deck.x, y: deck.y}});
		deck.render(1);
	});
	row2.forEach((deck, i) => {
		deck.x = row2Margin + (0.5 * C.card.width) + i * (C.spacing.x + C.card.width);
		deck.y = 2.5 * C.card.height;
		SessionData.decks.push(deck);
		console.log({[`Row 2, Deck ${i}`]: {x: deck.x, y: deck.y}});
		deck.render(2);
	});
}



const Initialize = () => {
	// Initialize deck and card classes
	TarotDeck.Initialize();
	TarotCard.Initialize();
	
	// Render decks behind blackout layer
	// SessionData.decks.forEach((deck) => deck.render());
	
	// Step One: Select Reading Template
	
	// Step Two: Select Deck
	initDeckSelection();
};

// #endregion ▮▮▮▮[INITIALIZATION]▮▮▮▮

const DEBUG = {
	isTestingMajorArcana: true,
	// isLimitingDeckSize: 10,
	FUNCS: {
		"RotX+": () => gsap.set(".canvas-layer", {
				rotateX: function(i, elem) { 
					if (["control-layer"].includes(elem.id)) {
						return 0;
					}
					return gsap.getProperty(elem, "rotationX") + 5;
				},
				immediateRender: true
			}),
		"RotX-": () => gsap.set(".canvas-layer", {
				rotateX: function(i, elem) { 
					if (["control-layer"].includes(elem.id)) {
						return 0;
					}
					return gsap.getProperty(elem, "rotationX") - 5;
				},
				immediateRender: true
			}),
		"RotY+": () => gsap.set(".canvas-layer", {
				rotateY: function(i, elem) { 
					if (["control-layer"].includes(elem.id)) {
						return 0;
					}
					return gsap.getProperty(elem, "rotationY") + 5;
				},
				immediateRender: true
			}),
		"RotY-": () => gsap.set(".canvas-layer", {
				rotateY: function(i, elem) { 
					if (["control-layer"].includes(elem.id)) {
						return 0;
					}
					return gsap.getProperty(elem, "rotationY") - 5;
				},
				immediateRender: true
			}),	
		"RotZ+": () => gsap.set(".canvas-layer", {
				rotateZ: function(i, elem) { 
					if (["control-layer"].includes(elem.id)) {
						return 0;
					}
					return gsap.getProperty(elem, "rotationZ") + 5;
				},
				immediateRender: true
			}),
		"RotZ-": () => gsap.set(".canvas-layer", {
				rotateZ: function(i, elem) { 
					if (["control-layer"].includes(elem.id)) {
						return 0;
					}
					return gsap.getProperty(elem, "rotationZ") - 5;
				},
				immediateRender: true
			}),
		"Persp+": () => gsap.set(".master-layer", {
				perspective: function(i, elem) { return gsap.getProperty(elem, "perspective") + 100; },
				immediateRender: true
			}),
		"Persp-": () => gsap.set(".master-layer", {
				perspective: function(i, elem) { return gsap.getProperty(elem, "perspective") - 100; },
				immediateRender: true
			}),
		"Pause": () => gsap.globalTimeline.pause(),
		"Play": () => gsap.globalTimeline.play(),
		"Reset": () => Table.Initialize(DEBUG.isForcingDeckType || gsap.utils.random(["eye", "keys", "kult-official", "kult-red", "lunar", "moon", "wendigo"])),
		"Random": () => Table.Initialize(gsap.utils.random(["eye", "keys", "kult-official", "kult-red", "lunar", "moon", "wendigo"])),
		"Moon": () => Table.Initialize("moon"),
		"Keys": () => Table.Initialize("keys"),
		"Eyes": () => Table.Initialize("eye")
	},
	DATADISPLAYS: {
		get PERSPECTIVE() { return U.roundNum(gsap.getProperty("#tarot-reading-layer", "perspective")) },
		get ROTATION() { return [
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
		$debugLayer.data({gsap, Draggable, Flip, Table, TarotDeck, TarotCard});
		
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
				display: "flex",
				flexWrap: "wrap",
				flexDirection: "column",
				alignContent: "end",
				float: "right",
				maxHeight: "25%"
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


InitializeDomElements();
$(document).ready(Initialize); /*
$(document).ready(() => {
	// DEBUG.initialize();
	Table.Initialize();
}); */

export {
	SessionData,
	SetPhase,
	Update
}