/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

import {gsap, ExpoScaleEase, Flip, MotionPathPlugin, RoughEase, SlowMo, SplitText} from "./scripts/external/greensock/all.js";
import U from "./scripts/utilities.js";
import C from "./scripts/constants.js";
import DEBUG from "./scripts/debug.js";
import TarotDeck from "./scripts/tarot-deck.js";
import TarotCard from "./scripts/tarot-card.js";

// ▮▮▮▮▮▮▮[INITIALIZATION] Initialization, Configuration & Constants ▮▮▮▮▮▮▮
gsap.registerPlugin(ExpoScaleEase, Flip, MotionPathPlugin, RoughEase, SlowMo, SplitText);
gsap.config({force3D: true, nullTargetWarn: false});
gsap.registerEffect({
	name: "slowRotate",
	effect(targets, config) {
		targets = targets.filter((target) => /rotation-container/.test(target.id));
		return gsap.to(targets, {
			rotationZ: config.rotationZ,
			duration: config.duration,
			delay: config.delay,
			repeat: -1,
			ease: "none",
			onUpdate() {
				return gsap.set(`#${targets[0].id} > .tarot-card-main`, {
					rotationZ: -1 * gsap.getProperty(targets[0], "rotationZ")
				});
			}
		});
	},
	defaults: {
		rotationZ: "+=360",
		duration: 150,
		delay: 1
	}
});
gsap.registerEffect({
	name: "splashGhostText",
	extendTimeline: true,
	defaults: {
		duration: 10,
		ease: "none",
		delay: 0.5
	},
	effect: (targets, config = {}) => {
		gsap.set(targets, {filter: "blur(0px) brightness(1) drop-shadow(20px 20px 10px black)"});
		const [ghostContainer] = $(targets[0]).parents("div.ghost-container");
		const timeToStaggerTargets = 0.1 * targets.length;
		return gsap.timeline({delay: config.delay})
			.fromTo(ghostContainer, {
				x: `-=${0.5 * gsap.getProperty(ghostContainer, "width")}`
			}, {
				x: `+=${gsap.getProperty(ghostContainer, "width")}`,
				duration: config.duration + timeToStaggerTargets,
				ease: "slow(0.1, 2, false)"
			})
			.fromTo(targets, {
				filter: "blur(20px) brightness(1) drop-shadow(20px 20px 10px black)"
			}, {
				filter: "blur(0px) brightness(8) drop-shadow(20px 20px 10px black)",
				duration: (0.2 * config.duration) / 2,
				ease: config.ease,
				stagger: {
					amount: 0.5,
					ease: "none",
					start: "end"
				}
			}, 0)
			.from(targets, {
				duration: 0.1,
				opacity: 0,
				ease: "none",
				stagger: {
					each: 0.02,
					ease: "power2"
				}
			}, 0)
			.to(targets, {
				filter: "blur(30px) brightness(10) drop-shadow(20px 20px 10px black)",
				duration: (0.2 * config.duration) / 2,
				ease: config.ease,
				stagger: {
					amount: 0.5,
					ease: "none",
					from: "end",
					onComplete() {
						gsap.to(this.targets()[0], {
							duration: 0.1,
							opacity: 0,
							ease: "none",
							clearProps: "filter"
						});
					}
				}
			}, config.duration - (0.2 * config.duration) / 2 + timeToStaggerTargets - 0.5)
			.timeScale(gsap.utils.random(0.8, 1.2)); // - timeToStaggerTargets);
	}
});
gsap.registerEffect({
	name: "splashPopText",
	extendTimeline: true,
	defaults: {
		duration: 5,
		ease: "expo.inOut",
		delay: 0
	},
	effect: (targets, config = {}) => {
		gsap.set(targets, {filter: "blur(0px) drop-shadow(20px 20px 10px black)"});
		const [popContainer] = $(targets[0]).parents("div.pop-container");
		const [cardElem] = $(popContainer).parent();
		const cardInst = TarotDeck.GetCard(cardElem);
		const timeToStaggerTargets = (0.1 * targets.length) / 2;
		return gsap.timeline({delay: config.delay, onComplete() { cardInst.isShowingPopText = false }})
			.to(popContainer, {
				z: "+=100",
				scale: 3,
				duration: config.duration + timeToStaggerTargets,
				ease: "slow(0.1, 1, false)"
			})
			.fromTo(targets, {
				filter: "blur(20px) drop-shadow(20px 20px 30px black)"
			}, {
				filter: "blur(0px) drop-shadow(20px 20px 10px black)",
				duration: (0.2 * config.duration) / 2,
				ease: config.ease,
				stagger: {
					amount: 0.5,
					ease: "none",
					start: "edges"
				}
			}, 0)
			.from(targets, {
				duration: 0.1,
				opacity: 0,
				ease: "none",
				stagger: {
					each: 0.02,
					ease: "power2",
					start: "center"
				}
			}, 0)
			.to(targets, {
				filter: "blur(30px) drop-shadow(20px 20px 30px black)",
				duration: (0.2 * config.duration) / 2,
				ease: config.ease,
				stagger: {
					amount: 0.5,
					ease: "none",
					from: "center",
					onComplete() {
						gsap.to(this.targets()[0], {
							duration: 0.1,
							opacity: 0,
							ease: "none",
							clearProps: "filter"
						});
					}
				}
			}, config.duration - (0.2 * config.duration) / 2 + timeToStaggerTargets - 0.5);
	}
});
// gsap.registerEffect({
// 	name: "slowBob",
// 	effect: (targets, config) => {

// 	},

// 		name, effect}));

// 		this._bobAnim = gsap.timeline({
// 			paused: true,
// 			repeat: -1,
// 			yoyo: true
// 		})
// 			.to(this.deckElem, {
// 				z: "+=50",
// 				ease: "sine.out",
// 				duration:
// 		})

const SessionData = {
	deck: false,
	decks: [],
	template: false,
	_phase: C.phases.deckSelection,
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
	ghostText: {
		intervalTimer: null,
		slotBins: {
			1: [],
			2: [],
			3: [],
			4: [],
			5: []
		},
		slotQueue: [],
		categories: {
			individual: true,
			location: true,
			organization: true,
			situation: true,
			creature: true,
			item: true
		},
		get next() {
			const isShuffling = SessionData.ghostText.slotQueue.length === 0;
			const validSlots = Object.entries(SessionData.ghostText.slotBins)
				.filter(([slot, texts]) => texts.length)
				.map(([slot]) => slot);
			for (const slot of validSlots) {
				if (!SessionData.ghostText.slotQueue.includes(slot)) {
					SessionData.ghostText.slotQueue.unshift(slot);
				}
			}
			if (SessionData.ghostText.slotQueue.length === 0) {
				return false;
			}
			if (isShuffling) {
				SessionData.ghostText.slotQueue = gsap.utils.shuffle(SessionData.ghostText.slotQueue);
			}
			const thisSlot = SessionData.ghostText.slotQueue.shift();
			SessionData.ghostText.slotQueue.push(thisSlot);
			return [thisSlot, gsap.utils.random(SessionData.ghostText.slotBins[thisSlot])];
		}
	},
	get nextFaceDownSlot() { return [1, 2, 3, 4, 5].find((slot) => this.layout[slot].card && this.layout[slot].isFaceUp === false) },
	get nextEmptySlot() { return [1, 2, 3, 4, 5].find((slot) => this.layout[slot].card === false) },
	get cards() { return Object.values(this.layout).map(({card}) => card) }
};

const initGhostTextTimer = (stagger = 5, duration = 10) => {
	stopGhostText();
	function showNextGhostText() {
		SessionData.ghostText.timer = gsap.delayedCall(stagger, showNextGhostText);
		const [slot, text] = SessionData.ghostText.next || [];
		if (text) {
			ghostText(slot, text, duration);
		}
	}
	showNextGhostText();
};

const stopGhostText = () => {
	SessionData.ghostText.timer?.kill();
	delete SessionData.ghostText.timer;
	gsap.to(".ghost-text", {
		opacity: 0,
		duration: 0.25,
		onComplete(i, elem) {
			$(elem).remove();
		}
	});
};

function ghostPopText(text, card, yPercent, z = 0, {css = {}, vars = {}} = {}) {
	card.isShowingPopText = true;
	// First create the internal text element, to measure its width.
	const $textElem = $("<span class=\"pop-text\"></span>")
		.text(text)
		.appendTo(card.cardElem);
	gsap.set($textElem, {
		whiteSpace: "nowrap",
		...css,
		textAlign: "center"
	});
	const textWidth = parseInt(gsap.getProperty($textElem[0], "width", "px"));
	// const textHeight = parseInt(gsap.getProperty($textElem[0], "height", "px"));
	// gsap.set($ghostElem, {
	// 	backgroundColor: "rgba(255, 0, 0, 0.2)",
	// 	outline: "1px dotted red"
	// });

	// Now create the container to control translation animations
	const $textContainer = $(`<div class="pop-container pop-container-slot-${card.slot}"></div>`)
		.append($textElem)
		.appendTo(card.cardElem);
	gsap.set($textContainer, {
		display: "block",
		xPercent: -50,
		yPercent: -50,
		// height: textHeight,
		width: textWidth,
		position: "absolute",
		pointerEvents: "none",
		transformOrigin: "50% 50%",
		x: C.card.width / 2,
		y: C.card.height * (yPercent / 100),
		z,
		rotationX: -25,
		// backgroundColor: "rgba(0, 255, 255, 0.2)",
		// outline: "2px dotted cyan"
	});
	const split = new SplitText($textElem[0], {type: "chars,words,lines"});
	gsap.effects.splashPopText(split.chars, vars).then(() => $($textContainer).remove());
}

function ghostBanner(text, {x, y, z} = {}) {
	x = x ?? C.slotPos[1].x;
	y = y ?? C.slotPos[1].y;
	z = z ?? 300;
	const [ghostElem] = $("<span class=\"ghost-text ghost-banner\"></span>").text(text).appendTo("#control-layer");
	gsap.set(ghostElem, {
		x,
		y,
		z,
		transformOrigin: "50% 50%"
		// backgroundColor: "rgba(255, 255, 255, 0.2)",
		// outline: "2px dotted white"
	});
	const split = new SplitText(ghostElem, {type: "chars,words,lines", position: "absolute"});
	gsap.effects.splashGhostText(split.chars, {x, y, horizSpan: 0.25 * gsap.getProperty("#control-layer", "width")}).then(() => $(ghostElem).remove());
	// DEBUG.PING({x: C.slotPos[1].x, y: C.slotPos[1].y, z: 0}, {parentSelector: $("#control-layer")[0], label: "Slot Pos", color: "cyan", bgColor: "lime", shadowColor: "black"});
	// DEBUG.PING({x: gsap.getProperty("#control-layer", "x"), y: gsap.getProperty("#control-layer", "y"), z: gsap.getProperty("#control-layer", "z")}, {parentSelector: $("#control-layer")[0], label: "Control Pos", color: "yellow", bgColor: "cyan", shadowColor: "black"});
}

function ghostText(slot, text, duration) {
	// First create the internal text element, to measure its width.
	const $ghostElem = $("<span class=\"ghost-text\"></span>")
		.text(text)
		.appendTo(`#ghost-slot-${slot}`);
	gsap.set($ghostElem, {
		whiteSpace: "nowrap"
	});
	const ghostWidth = parseInt(gsap.getProperty($ghostElem[0], "width", "px"));
	const ghostHeight = parseInt(gsap.getProperty($ghostElem[0], "height", "px"));
	// gsap.set($ghostElem, {
	// 	backgroundColor: "rgba(255, 0, 0, 0.2)",
	// 	outline: "1px dotted red"
	// });

	// Now create the container to control translation animations
	const $ghostContainer = $(`<div class="ghost-container ghost-container-slot-${slot}"></div>`)
		.append($ghostElem)
		.appendTo(`#ghost-slot-${slot}`);
	gsap.set($ghostContainer, {
		display: "blocK",
		xPercent: -50,
		yPercent: -50,
		height: ghostHeight,
		width: ghostWidth,
		position: "absolute",
		pointerEvents: "none",
		transformOrigin: "50% 50%",
		x: gsap.utils.random(0.5 * ghostWidth, gsap.getProperty(`#ghost-slot-${slot}`, "width") - 0.5 * ghostWidth),
		y: gsap.utils.random(0.5 * ghostHeight, gsap.getProperty(`#ghost-slot-${slot}`, "height") - 0.5 * ghostHeight),
		z: 0
		// backgroundColor: "rgba(0, 255, 255, 0.2)",
		// outline: "2px dotted cyan"
	});
	const split = new SplitText($ghostElem[0], {type: "chars,words,lines"});
	gsap.effects.splashGhostText(split.chars, {duration}).then(() => $($ghostContainer).remove());
}

const SetPhase = (phase, data) => {
	phase = phase in C.phases ? C.phases[phase] : phase;
	if (Object.values(C.phases).includes(phase)) {
		SessionData.phase = phase;
		console.log(`*** SWITCHING PHASE TO: ${phase}`);
		switch (phase) {
			case C.phases.deckSelection: return initDeckSelection();
			case C.phases.cardsInOrbit: return initCardsOrbit(data);
			case C.phases.cardsDealt: return initCardsDealt();
			case C.phases.cardsRevealed: return initCardsRevealed();
			default: return true;
		}
	}
	return false;
};

const Update = () => { };

const initDeckSelection = () => {
	SessionData.inTransition = true;
	gsap.timeline()
		.set(".deck-box .face", {opacity: 0})
		.fromTo("#reading-section", {
			rotationZ: 65
			// y: 0
		}, {
			rotationZ: 0,
			// y: "-15vh",
			duration: 16,
			ease: "back.out(2)"
		}, 0)
		.fromTo(".deck-box", {
			z: -25
		}, {
			z: 25,
			duration: 2,
			stagger: {
				each: 0.5,
				from: "random",
				onStart() {
					gsap.to(`#${this.targets()[0].id} .face:not(.face-back)`, {
						opacity: 1,
						ease: "none",
						duration: 3
					});
				}
			},
			onComplete() {
				SessionData.inTransition = false;
				ghostBanner("Which of the Tarot will guide you?", {y: C.slotPos[1].y - 100});
			},
			ease: "power2.out"
		}, 0)
		.fromTo("#reading-section", {
			scale: 2
		}, {
			scale: 1,
			duration: 16,
			ease: "expoScale(2, 1, back.out(2))"
		}, 0)
		.to("#blackout-layer", {
			opacity: 0,
			duration: 0.5,
			rotationX: 45,
			ease: "sine",
			onComplete() { $("#blackout-layer").remove() }
		}, 0)
		.to(".canvas-layer:not(#control-layer)", {
			rotationX: 45,
			duration: 10,
			ease: "elastic.out(1, 0.75)" // "sine"
		}, 0);
};

const initCardsOrbit = ({deck}) => {
	SessionData.inTransition = true;
	SessionData.deck = deck;
	SessionData.deck.initMainDeck();
};

const initCardsDealt = () => {
	SessionData.inTransition = true;
	gsap.timeline()
		.to("#reading-section", {
			perspective: 1000,
			y: "-=1.5vh",
			duration: 7,
			scale: 1
		}, 0)
		.to("#over-layer", {
			scale: 5,
			duration: 2,
			ease: "power2.out",
			onComplete() {
				$("#over-layer > .rotation-container").remove();
				gsap.set("#over-layer", {scale: 1, rotationX: 35});
			}
		}, 0)
		.to(".canvas-layer:not(#over-layer):not(#control-layer)", {
			scale: 1,
			rotationX: 35,
			duration: 7,
			ease: "sine",
			onComplete() {
				SessionData.inTransition = false;
				ghostBanner("The Core Card", {x: C.slotPos[2].x});
				initGhostTextTimer(7, 10);
			}
		}, 0)
		.then(() => {
			for (let i = 1; i <= 5; i++) {
				const $ghostZone = $(`<div id="ghost-slot-${i}" class="ghost-zone"></div>`)
					.appendTo("#over-layer");
				gsap.set($ghostZone, {
					xPercent: -50,
					yPercent: -50,
					height: 1.25 * C.card.height,
					width: 2 * C.card.width,
					// backgroundColor: "rgba(0, 255, 0, 0.2)",
					// outline: "2px dashed lime",
					position: "absolute",
					pointerEvents: "none",
					display: "block",
					x: C.slotPos[i].x,
					y: C.slotPos[i].y + U.getPixels(13, "vh"),
					z: 150,
					rotationX: -1 * gsap.getProperty("#over-layer", "rotationX")
				});
			}
		});
};

const initCardsRevealed = () => {
	SessionData.inTransition = true;
	gsap.timeline()
		.to(".canvas-layer:not(#control-layer)", {
			x: "-=30vw",
			rotationX: "-=10",
			ease: "back.out(2)",
			duration: 3,
			onComplete() {
				SessionData.inTransition = false;
			}
		}, 0)
		.to(".ghost-zone", {
			x: "+=5vw",
			ease: "back.out(2)",
			duration: 3
		}, 0);
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
				case "control-layer": return 0;
				default: return 0;
			}
		},
		rotationX(i, elem) {
			if (/control-layer/.test(elem.id)) {
				return 0;
			}
			return 80;
		},
		scale: 1,
		immediateRender: true
	});

	// Build Decks
	const deckTypes = Object.keys(C.numCardBacksByType);

	const decks = Object.keys(C.numCardBacksByType).map((deckType) => new TarotDeck(deckType, SessionData));

	if (DEBUG.isLimitingDeckSize) {
		decks.forEach((deck) => (deck._deck = deck._deck.slice(0, DEBUG.isLimitingDeckSize)));
	}

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
	// Add invisible debug button
	$("<button id=\"start-debug\"></button>")
		.prependTo("#debug-layer")
		.click(() => {
			console.log("CLICKED!");
			DEBUG.initialize();
		});
	gsap.set("#start-debug", {
		position: "absolute",
		top: 0,
		left: 0,
		height: 50,
		width: 50,
		border: "none",
		outline: "none",
		opacity: 0,
		pointerEvents: "all"
	});

	// Initialize deck and card classes
	TarotDeck.Initialize();
	TarotCard.Initialize();

	// Step One: Select Reading Template

	// Step Two: Select Deck
	initDeckSelection();
};

console.clear();
InitializeDomElements();
$(document).ready(() => {
	Initialize();
});

export {
	InitializeDomElements,
	Initialize,
	SessionData,
	SetPhase,
	Update,
	ghostPopText
};