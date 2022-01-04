import {gsap, Draggable, Flip, InertiaPlugin, SlowMo, RoughEase} from "./external/greensock/all.js";
import U from "./utilities.js";
import C from "./constants.js";
import {SessionData, SetPhase, Update} from "./kult-tarot.js";
import Table from "./table.js";
import TarotCard from "./tarot-card.js";

export default class TarotDeck {
	static GetCard(cardElem) { return SessionData.deck?.cards.find((card) => card.cardNum === parseInt(cardElem.dataset.cardNum)) }
	
	static Initialize() {
	}

	constructor(deckType, sessionData) {
		this._session = sessionData;
		this._deck = [
			// Gather Major Arcana
			...C.TAROTDATA["major-arcana"],
			// Gather Minor Arcana
			...["crescents", "eyes", "hourglasses", "roses", "skulls"]
				.map((suit) => C.TAROTDATA["minor-arcana"][suit].slice(1))
				.flat()			
		];
		gsap.utils.shuffle(this._deck);
		this._deckType = deckType;
	}
		
	get x() { return this._x }
	set x(v) { this._x = v }
	get y() { return this._y }
	set y(v) { this._y = v }
	get z() { return this._z }
	set z(v) { this._z = v }
	get session() { return this._session }
	get layout() { return this.session.layout }
	get deck() { return this._deck }
	get deckElem() { return this._deckElem }
	get cards() { return this._cards }
	get cardElems() { return this.cards.map((card) => card.cardElem) }
	get type() { return this._deckType }
	get id() { return `deck-box-${this.type}` }
	get isMain() { return this.session.deck && this.session.deck.type === this.type }
	get cardBack() { return (this._cardBack = this._cardBack ?? U.getImgCSS(`${this.type}/card-back-${gsap.utils.random(1, C.numCardBacksByType[this.type], 1)}.webp`)) }
	
	render(rowNum) {
		const $deckBox = U.make3dBox({
			id: this.id,
			classes: "deck-box",
			dimensions: {x: C.card.width, y: C.card.height, z: C.deckHeight },
			faces: {
				bottom: "linear-gradient(#222, #000)",
				right: "linear-gradient(#222, #000)",
				left: "linear-gradient(#222, #000)",
				front: this.cardBack,
				back: "black",
				top: "black"
			},
			parentElem: $("#card-layer")[0]
		});
		gsap.set($deckBox, {
			x: this.x,
			y: this.y,
			pointerEvents: "all"
		});
		$($deckBox).hover(this.onHover.bind(this), this.offHover.bind(this));
		$($deckBox).click(this.onClick.bind(this));
		[this._deckElem] = $deckBox;
		this._hoverAnim = gsap.timeline({paused: true});
		this._hoverAnim.to(this.deckElem, {
			// x: C.slotPos[1].x, // - 0.5 * C.card.width,
			y: `+=${(rowNum === 1 ? 1.5 : 0.5) * U.pInt(C.card.height)}`,
			z: 350,
			scale: 2,
			rotationX: -45,
			boxShadow: "0 0 60px red",
			duration: 0.5,
			ease: "power.inOut"
		});
		this._hoverAnim.to(`#${this.id} > .face-bottom`, {
			boxShadow: "none",
			duration: 0.25,
			ease: "none"
		}, 0);
	}
	
	onHover(event) {
		console.log("Hover On");
		if (!this.session.inTransition) {
			event.preventDefault();
			this._hoverAnim.play();
		}
	}
	
	offHover(event) {
		event.preventDefault();
		this._hoverAnim.reverse();
	}
	
	onClick(event) {
		if (!this.session.inTransition) {
			event.preventDefault();
			SetPhase(C.phases.cardsInOrbit, {deck: this});
		}
	}
	
	async initMainDeck() {
		const tl = gsap.timeline();
		this.x = C.slotPos[1].x;
		this.y = C.slotPos[1].y;
		this.z = -0.4 * C.deckHeight;
			
		tl.to(`.deck-box:not(#${this.id})`, {
			opacity: 0,
			ease: "sine.inOut",
			duration: 1,
			stagger: {
				each: 0.5,
				from: "random",
				onComplete() { $(this.targets()[0]).remove() }
			}
		});
		tl.to(this.deckElem, {
			x: this.x,
			y: this.y,
			z: this.z,
			ease: "sine.inOut",
			duration: 2
		}, 1.5);
		tl.to(".canvas-layer", {
			scale: 0.65,
			ease: "power",
			duration: 5,
			callbackScope: this,
			onComplete() { return this.renderCards().then(this.circleFan.bind(this)) }
		}, 0);
		tl.to(".canvas-layer:not(#control-layer)", {
			rotationX: 25,
			duration: 5,
			ease: "power"
		}, 0);
		return tl;
	}
	
	async renderCards() {
		this._cards = this.deck.map((cardData, cardNum, deck) => new TarotCard(cardData, cardNum, this));
		this.cards.forEach((card) => card.render());
		return gsap.to(".tarot-card-main", {
			opacity: 1,
			duration: 0.5,
			stagger: {
				amount: 0.05,
				from: "end"
			}
		});
	}

	circleFan() {
		$("<div id=\"rotation-container-0\" class=\"rotation-container\"></div>").appendTo($("#over-layer"));
		$("<div id=\"rotation-container-1\" class=\"rotation-container\"></div>").appendTo($("#over-layer"));
		gsap.set(".rotation-container", {
			xPercent: -50,
			yPercent: -50,
			x: "50%",
			y: "50%",
			height: "100%",
			width: "100%"
		});
		
		$(".tarot-card-main").each((i, elem) => $(elem).appendTo($(`#rotation-container-${U.randInt(0, 1)}`)));
		const [xCenter, yCenter] = [this.x, this.y];
		const radius = C.deckRadiusPercent * (yCenter - C.padding.y);
		const stepAngle = 360 / (this.cards.length / 2);
		const stepOffset = C.deckOffset / this.cards.length;
		
		const tl = gsap.timeline();
		tl.to(".tarot-card-main", {
			x(cardNum, cardElem) { return xCenter + (radius * U.sinOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150) },
			y(cardNum, cardElem) { return yCenter + (radius * U.cosOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150) },
			z() { return 200 + gsap.utils.random(0, 100) },
			duration: 1,
			stagger: {
				each: -0.05,
				// from: "random",
				onComplete() {
					gsap.effects.cardWander(this.targets()[0]);
				}
			},
			ease: "power2.out",
			onStart() {
				$(SessionData.deck.deckElem).remove();
			},
			onComplete() {
				gsap.set(".tarot-card-main", {pointerEvents: "all"});
				SessionData.inTransition = false;
			}
		});
		tl.to("#rotation-container-0, #rotation-container-1 > .tarot-card-main", {
			rotationZ: "+=360",
			duration: 150,
			repeat: -1,
			ease: "none"
		}, 1);
		tl.to("#rotation-container-1, #rotation-container-0 > .tarot-card-main", {
			rotationZ: "-=360",
			duration: 150,
			repeat: -1,
			ease: "none"
		}, 1);
		return tl;
		// return gsap.to("#rotation-container > .tarot-card-main", {
		// 	x: function(cardNum) {
		// 		return xCenter + (radius * U.sinOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150);
		// 	},
		// 	y: function(cardNum) {
		// 		return yCenter + (radius * U.cosOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150);
		// 	},
		// 	z: function(cardNum) {
		// 		return 200 + gsap.utils.random(0, 100);
		// 	},
		// 	// scale: "random(0.8, 1.2)",
		// 	duration: 1,
		// 	outlineColor: "random([#FFFFFF, #777777, #000000])",
		// 	stagger: {
		// 		each: -0.05,
		// 		onComplete() {
		// 			gsap.effects.cardWander(this.targets()[0]);
		// 		}
		// 	},
		// 	ease: "power2.out",
		// 	onComplete(...args) {
		// 		$("#rotation-container > .tarot-card-main").on("click", function(event) {
		// 			event.preventDefault();
		// 			$(event.target).off("click mouseenter mouseleave");
		// 			gsap.killTweensOf(event.target);
		// 			TarotDeck.Main.deal(event.target);
		// 		});
		// 		$("#rotation-container > .tarot-card-main").hover(
		// 			function handlerIn(event) {
		// 				event.preventDefault();
		// 				gsap.killTweensOf(event.target); //, "x,y,scale");
		// 				gsap.effects.cardWanderHoverOn(event.target);
		// 			}, function handlerOut(event) {
		// 				event.preventDefault();
		// 				gsap.effects.cardWanderHoverOff(event.target);
		// 			}
		// 		);
		// 		gsap.set("#rotation-container > .tarot-card-main", {pointerEvents: "all"});
		// 		// gsap.effects.cardWander("#rotation-container > .tarot-card-main");
		// 	}
		// });
		// // gsap.effects.dealCircleFan();
		// Table.Phase = "CardOrbit";
	}

	deal(cardElem) {
		const card = this.constructor.GetCard(cardElem);
		const slot = this.table.nextEmptySlot;
		if (slot) {
			this.layout[slot].card = card;
			card.slot = slot;
			const cardState = Flip.getState(cardElem, "outlineColor,outlineWidth");
			// gsap.set("#control-layer", {zIndex: 100});
			$(cardElem).appendTo("#control-layer");
			gsap.set(cardElem, {
				rotation: 0,
				scale: 1,
				boxShadow: "rgb(255 166 33) 0px 0px 0px",
				...this.table.layout[slot].pos
			});
			Flip.from(cardState, {
				duration: 2,
				ease: "expo.out",
				absolute: true,
				nested: true,
				prune: true,
				scale: true,
				onComplete() {
					$(cardElem).appendTo("#card-layer");
					if (slot === 5) {
						// gsap.set("#control-layer", {zIndex: null});
						gsap.killTweensOf(".canvas-layer");
						gsap.effects.explodeOutOverLayer() }
				}
			});
		}
	}
}