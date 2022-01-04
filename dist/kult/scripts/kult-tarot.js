/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

import {gsap, Draggable, Flip, InertiaPlugin, SlowMo, RoughEase} from "./external/greensock/all.js";
import U from "./utilities.js";
import C from "./constants.js";
// import Table from "./table.js";
import TarotDeck from "./tarot-deck.js";
import TarotCard from "./tarot-card.js";

gsap.registerPlugin(Draggable, Flip, InertiaPlugin, SlowMo, RoughEase);

// ▮▮▮▮▮▮▮[UTILITY] Utility Functions ▮▮▮▮▮▮▮

// ▮▮▮▮▮▮▮[INITIALIZATION] Initialization, Configuration & Constants ▮▮▮▮▮▮▮
Object.entries({
	explodeOutOverLayer: () => {
		$("#over-layer *").off("click mouseenter");
		const tl = gsap.timeline();
		tl.to("#over-layer", {
			scale: 2,
			opacity: 0,
			ease: "expo.out",
			duration: 2.5,
			onComplete() {
				$("#over-layer *").remove();
				gsap.set("#over-layer", {scale: 1, opacity: 1});
			}
		}, 0);
		tl.to(".canvas-layer:not(#over-layer)", {
			scale: 1,
			duration: 3,
			ease: "expo.out"
		}, 0);
		return tl;
	},
	fadeInTable: () => {
		const tl = gsap.timeline(/* {immediateRender: true} */);
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
			ease: "sine"
			// immediateRender: true
		}, 0);
		tl.to(".canvas-layer:not(#control-layer):not(#blackout-layer)", {
			scale: 1,
			opacity: 1,
			rotationX: 45,
			duration: 6,
			ease: "sine"
			// immediateRender: true
		}, 0);
		return tl;
	}
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
	phase = phase in C.phases ? C.phases[phase] : phase;
	if (Object.values(C.phase).includes(phase)) {
		SessionData.phase = phase;
		console.log(`*** SWITCHING PHASE TO: ${phase}`);
		switch (phase) {
			case C.phases.deckSelection: return initDeckSelection();
			case C.phases.cardsInOrbit: return initCardsOrbit(data);
			default: return true;
		}
	}
	return false;
};

const Update = () => { };

const initDeckSelection = () => {
	SessionData.inTransition = true;
	const tl = gsap.timeline(/* {immediateRender: true} */)
		.fromTo("#reading-section", {
			rotationZ: 65
		}, {
			rotationZ: 0,
			duration: 6,
			ease: "sine"
		})
		.to("#blackout-layer", {
			opacity: 0,
			duration: 6,
			rotationX: 45,
			ease: "sine"
			// immediateRender: true
		}, 0)
		.to(".canvas-layer:not(#control-layer):not(#blackout-layer)", {
			scale: 1,
			opacity: 1,
			rotationX: 45,
			duration: 6,
			ease: "sine"
			// immediateRender: true
		}, 0)
		.then(() => {
			$("#blackout-layer").remove();
			SessionData.inTransition = false;
		});
};

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
};

const InitializeDomElements = () => {
	$(".canvas-layer *").remove();
	if ($("#blackout-layer").length === 0) {
		$("<div id=\"blackout-layer\"></div>").prependTo("body");
	}
	gsap.set("#blackout-layer, .canvas-layer", {
		xPercent: -50,
		yPercent: -50,
		x: C.slotPos[1].x,
		y: C.slotPos[1].y,
		z(i, elem) {
			switch (elem.id) {
				case "blackout-layer": return 500;
				case "background-layer": return C.layers.baseZ - 2;
				case "under-layer": return C.layers.baseZ - 1;
				case "card-layer": return C.layers.baseZ;
				case "over-layer": return C.layers.baseZ + C.layers.vertShift;
				case "control-layer": return C.layers.baseZ + (2 * C.layers.vertShift);
				default: return 0;
			}
		},
		rotationX: 80,
		// opacity: 1,
		// scale(i, elem) {
		// 	switch (elem.id) {
		// 		case "background-layer":
		// 		case "under-layer":
		// 		case "card-layer":
		// 		case "over-layer": // return 3;
		// 		case "blackout-layer":
		// 		case "control-layer":
		// 		default: return 1;
		// 	}
		// },
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
		deck.y = Number(C.card.height);
		SessionData.decks.push(deck);
		deck.render(1);
	});
	row2.forEach((deck, i) => {
		deck.x = row2Margin + (0.5 * C.card.width) + i * (C.spacing.x + C.card.width);
		deck.y = 2.5 * C.card.height;
		SessionData.decks.push(deck);
		deck.render(2);
	});
};

const Initialize = () => {
	// Initialize deck and card classes
	TarotDeck.Initialize();
	TarotCard.Initialize();

	// Step One: Select Reading Template

	// Step Two: Select Deck
	initDeckSelection();
};

InitializeDomElements();
$(document).ready(Initialize); /*
$(document).ready(() => {
	// DEBUG.initialize();
	Table.Initialize();
}); */

export {
	InitializeDomElements,
	Initialize,
	SessionData,
	SetPhase,
	Update
};