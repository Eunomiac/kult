import {gsap, Flip, SlowMo, RoughEase} from "./external/greensock/all.js";
import U from "./utilities.js";
import C from "./constants.js";
import {SessionData, SetPhase, Update} from "../kult.js";
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
			dimensions: {x: C.card.width, y: C.card.height, z: C.deckHeight},
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
		this._hoverAnim = gsap.timeline({paused: true})
			.to(this.deckElem, {
				z: gsap.getProperty(this.deckElem, "z") + 100,
				rotationX: "-=25",
				scale: 1.5,
				duration: 0.5,
				ease: "power.inOut"
			}, 0)
			.to(`#${this.id} > .face-back`, {
				boxShadow: "none",
				duration: 0.25,
				ease: "none"
			}, 0);
		// this._bobAnim = gsap.timeline({
		// 	paused: true,
		// 	repeat: -1,
		// 	yoyo: true
		// })
		// 	.to(this.deckElem, {
		// 		z: "+=50",
		// 		ease: "sine.out",
		// 		duration:
		// })

		// $("#over-layer *").off("click mouseenter");
		// const tl = gsap.timeline();
		// tl.to("#over-layer", {
		// 	scale: 4,
		// 	opacity: 0,
		// 	ease: `expoScale(${gsap.getProperty("#over-layer", "scale")}, 4, expo.out)`,
		// 	duration: 2.5,
		// 	onComplete() {
		// 		$("#over-layer *").remove();
		// 		gsap.set("#over-layer", {scale: 1, opacity: 1});
		// 	}
		// }, 0);
		// tl.to(".canvas-layer:not(#over-layer)", {
		// 	scale: 1,
		// 	duration: 3,
		// 	ease: `expoScale(${gsap.getProperty("#card-layer", "scale")}, 4, expo.out)`
		// }, 0);
		// return tl;
		this._shakeAnim = gsap.timeline({
			repeat: -1,
			yoyo: true,
			paused: true
		});
	}

	onHover(event) {
		if (!this.session.inTransition) {
			event.preventDefault();
			this._hoverAnim.play();
			this._shakeAnim.play();
		}
	}

	offHover(event) {
		event.preventDefault();
		this._shakeAnim.restart().pause();
		this._hoverAnim.reverse();
	}

	onClick(event) {
		console.log(SessionData);
		if (!SessionData.inTransition && SessionData.phase === C.phases.deckSelection) {
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
		tl.to(".canvas-layer:not(#control-layer)", {
			scale: 0.65,
			rotationX: 25,
			y: "-=9vh",
			ease: "power",
			duration: 5,
			callbackScope: this,
			onComplete() { return this.renderCards().then(this.circleFan.bind(this)) }
		}, 0);
		// tl.to("#reading-section", {
		// 	y: "+=100"
		// }, 0)
		return tl;
	}

	async renderCards() {
		this._cards = this.deck.map((cardData, cardNum, deck) => new TarotCard(cardData, cardNum, this));
		this.cards.forEach((card) => card.render());
		gsap.set(this.cardElems, {
			filter: "brightness(1.5)"
		});
		gsap.set(this.cardElems[0], {
			filter: "brightness(1.5) drop-shadow(30px 30px 10px rgba(0,0,0,0.7))"
		});
		return gsap.to(this.cardElems, {
			opacity: 1,
			duration: 0,
			stagger: {
				each: 0.05,
				from: "start"
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

		gsap.fromTo(this.cardElems, {
			filter: "none"
		}, {
			x(cardNum, cardElem) { return xCenter + (radius * U.sinOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150) },
			y(cardNum, cardElem) { return yCenter + (radius * U.cosOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150) },
			z() { return 100 + gsap.utils.random(0, 50) },
			filter: "brightness(0.4) saturate(0.5) drop-shadow(30px 30px 10px rgba(0,0,0,0.7))",
			duration: 1,
			stagger: {
				each: 0.05,
				from: "end",
				onStart() {
					TarotDeck.GetCard(this.targets()[0])._startAngle = parseInt(stepAngle * parseInt(this.targets()[0].dataset.cardNum));
				},
				onComplete() { gsap.effects.cardWander(this.targets()[0]) }
			},
			ease: "power2.out",
			onStart() { $(SessionData.deck.deckElem).remove() },
			onComplete() { SessionData.inTransition = false }
		});

		gsap.effects.slowRotate("#rotation-container-0", {rotationZ: "+=360", delay: 1});
		gsap.effects.slowRotate("#rotation-container-1", {rotationZ: "-=360", delay: 1});
	}

}