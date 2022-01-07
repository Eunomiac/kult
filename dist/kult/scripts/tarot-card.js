/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

import {gsap, Flip, MotionPathPlugin, RoughEase} from "./external/greensock/all.js";
import U from "./utilities.js";
import C from "./constants.js";
import {SessionData, SetPhase, Update, ghostPopText} from "../kult.js";
import TarotDeck from "./tarot-deck.js";

export default class TarotCard {
	static Initialize() {
		gsap.registerEffect({name: "cardWander",
												 effect: (targets) => {
													 const tl = gsap.timeline();
													 tl.to(targets, {
														 x(i, cardElem) { return gsap.getProperty(cardElem, "x") + gsap.utils.random(-150, 150) },
														 ease: "sine.inOut",
														 duration: 3,
														 stagger: {
															 repeat: -1,
															 yoyo: true,
															 amount: 3,
															 ease: "rough({ strength: 0.5, points: 20, template: none.inOut, taper: none, randomize: true, clamp: false })", // "elastic.inOut",
															 from: "random"
														 }
													 });
													 tl.to(targets, {
														 y(i, cardElem) { return gsap.getProperty(cardElem, "y") + gsap.utils.random(-50, 50) },
														 ease: "sine.inOut",
														 duration: 3,
														 stagger: {
															 repeat: -1,
															 yoyo: true,
															 amount: 3,
															 ease: "rough({ strength: 0.5, points: 20, template: none.inOut, taper: none, randomize: true, clamp: false })", // "elastic.inOut",
															 from: "random"
														 }
													 }, 0);
													 return tl;
												 }
		});
	}

	constructor(cardData, cardNum, deck) {
		this._data = cardData;
		this._cardNum = cardNum;
		this._height = C.card.height;
		this._width = C.card.width;
		this._deck = deck;
		this._x = this.deck.x;
		this._y = this.deck.y;
		this._z = cardNum * (C.deckHeight / 67);
		[this._cardElem] = $(`<div id="${this.id}" class="tarot-card tarot-card-main tarot-card-${this.deck.type}" data-card-num="${this.cardNum}"></div>`).appendTo("#card-layer");
	}

	get deck() { return this._deck }
	get data() { return this._data }
	get x() { return (this._x = this._x ?? this.deck.x) }
	get y() { return (this._y = this._y ?? this.deck.y) }
	get z() { return (this._z = this._z ?? this.deck.z) }
	get height() { return this._height }
	get width() { return this._width }
	get id() { return `card-main-${this.deck.type}-${this.cardNum}` }
	get selector() { return `#${this.id}` }
	get cardNum() { return this._cardNum }
	get cardElem() { return this._cardElem ?? false }
	get cardBack() { return (this._cardBack = this._cardBack ?? U.getImgCSS(`${this.deck.type}/card-back-${gsap.utils.random(1, C.numCardBacksByType[this.deck.type], 1)}.webp`)) }

	get name() { return this.data.name }
	get suit() { return (this.data.suit ?? "major-arcana").toLowerCase() }
	get affiliation() { return (this.data.affiliation ?? this.suit).toLowerCase() }
	get arcana() { return this.suit === "major-arcana" ? "major" : "minor" }
	get keyword() { return this.data.keyword }

	get slot() { return this._slot }
	set slot(slotNum) {
		this._slot = slotNum;
		this._x = C.slotPos[slotNum].x;
		this._y = C.slotPos[slotNum].y;
		this._z = 0;
	}
	get angle() {
		return this._startAngle ? U.getAngleDelta(this._startAngle, gsap.getProperty($(this.cardElem).parent()[0], "rotationZ")) : false;
	}
	get image() {
		if (this.isFaceUp) {
			return U.getImgCSS(this._data.imgfile);
		} else {
			return this.cardBack;
		}
	}
	get isFaceUp() { return SessionData.layout[this.slot]?.isFaceUp }
	set isFaceUp(v) {
		SessionData.layout[this.slot].isFaceUp = Boolean(v);
	}
	get numSlotsBehind() {
		if (this.isFaceUp || !SessionData.nextFaceDownSlot) {
			return 0;
		} else {
			return Math.max(0, this.slot - SessionData.nextFaceDownSlot);
		}
	}
	get validGhostTexts() {
		if (!this.isFaceUp) { return [] }
		return Object.entries(this._data.ghostText)
			.filter(([cat, texts]) => SessionData.ghostText.categories[cat])
			.map(([cat, texts]) => texts)
			.flat();
	}
	updatePos() {
		this._x = gsap.getProperty(this.cardElem, "x");
		this._y = gsap.getProperty(this.cardElem, "y");
		this._z = gsap.getProperty(this.cardElem, "z");
		[this._parentContainer] = $(this.cardElem).parent();
	}

	_onClick(event) {
		if (SessionData.inTransition) { return false }
		switch (SessionData.phase) {
			case "cardsInOrbit": {
				event.preventDefault();
				this.deal();
				return true;
			}
			case "cardsDealt": {
				event.preventDefault();
				if (this.slot === SessionData.nextFaceDownSlot) {
					this.flip();
				} else {
					const nextCardSel = SessionData.layout[SessionData.nextFaceDownSlot].card.selector;
					const faceDownSel = Object.values(SessionData.layout)
						.filter(({isFaceUp}) => !isFaceUp)
						.map(({card}) => card.selector)
						.join(", ");
					gsap.effects.blinkInvalid(faceDownSel);
					gsap.effects.blinkValid(nextCardSel);
				}
				break;
			}

		}
		return true;
	}

	_onHover(event) {
		if (SessionData.inTransition) { return false }
		event.preventDefault();
		switch (SessionData.phase) {
			case "cardsInOrbit": {
				if (/rotation-container/.test($(this.cardElem).parent()[0].id)) {
					gsap.killTweensOf([this.cardElem, $(this.cardElem).parent()]);
					this.updatePos();
					this._hoverAngle = parseInt(this.angle);
					this._hoverAnim = gsap.fromTo(this.cardElem, {
						filter: "none"
					}, {
						z: Math.abs(this._hoverAngle) > 115 ? 400 : 250,
						width: 1.5 * C.card.width,
						height: Math.abs(this._hoverAngle) > 115 ? C.card.height + U.getPixels(50, "vh") : 1.25 * C.card.height,
						backgroundColor: "transparent",
						rotationX: Math.abs(this._hoverAngle) > 115 ? -15 : 0,
						filter: "brightness(1.5) saturate(1.5) drop-shadow(30px 30px 10px rgba(0,0,0,0.7))",
						ease: "power2.out",
						duration: 0.5,
						callbackScope: this,
						onStart() {
							if (Math.abs(this._hoverAngle) > 115) {
								gsap.set(this.cardElem, {backgroundPosition: "center bottom"});
							} else {
								gsap.set(this.cardElem, {backgroundPosition: "center center"});
							}
						}
					});
				}
				break;
			}
			case "cardsDealt":
			case "cardsRevealed": {
				if (this.isFaceUp) {
					if (this.isShowingPopText) { return false }
					const {title: titleStyles, subTitle: subTitleStyles} = C.styleMap[this.affiliation];
					titleStyles.textShadow = U.repeatJoin(titleStyles.textShadow, 4, ", ");
					subTitleStyles.textShadow = U.repeatJoin(subTitleStyles.textShadow, 2, ", ");
					if (this.arcana === "major") {
						// Display the card NAME (title, top) and KEYWORD (title & subtitle, bottom)
						const [surKeyword, keyword] = this.keyword.split(/\s+of\s+/);
						ghostPopText(this.name, this, 0, 25, {css: titleStyles});
						if (keyword) {
							ghostPopText(`${surKeyword} of`, this, 95, 120, {
								css: subTitleStyles
							}, {delay: 0.5});
							ghostPopText(keyword, this, 105, 100, {
								css: titleStyles
							}, {delay: 0.75});
						} else {
							ghostPopText(surKeyword, this, 105, 100, {
								css: subTitleStyles
							}, {delay: 0.5});
						}
					} else {
						// Display card KEYWORD (title, top) and NAME (subtitle, bottom)
						ghostPopText(this.keyword, this, 0, 25, {css: titleStyles});
						ghostPopText(`the ${this.name}`, this, 95, 25, {css: subTitleStyles});
						return;
						const [numText, suitText] = this.name.split(/\s+of\s+/);
						ghostPopText(numText, this, 95, 100, {
							css: subTitleStyles
						}, {delay: 0.5});
						ghostPopText("of", this, 103, 100, {
							css: {
								...subTitleStyles,
								fontSize: subTitleStyles.fontSize / 2
							}
						}, {delay: 0.7});
						ghostPopText(suitText, this, 105, 100, {
							css: subTitleStyles
						}, {delay: 0.9});
					}

					// this._hoverTimeline = gsap.to(this.cardElem, {
					// 	...{
					// 		1: {},
					// 		2: {x: `+=${C.card.width / 3}`},
					// 		3: {y: `+=${C.card.height / 3}`},
					// 		4: {x: `-=${C.card.width / 3}`},
					// 		5: {y: `-=${C.card.height / 3}`}
					// 	}[this.slot],
					// 	scale: 3,
					// 	duration: 0.5,
					// 	ease: "power4.inOut"
					// });
				} else if (this.slot === SessionData.nextFaceDownSlot) {
					this._hoverTimeline = gsap.timeline()
						.to(this.cardElem, {
							z: "+=50",
							duration: 0.5,
							ease: "power4.inOut",
							// boxShadow: "rgb(0 255 0) 0px 0px 50px",
							scale: 1.2
						}, 0)
						.fromTo(`.tarot-card-main:not(#${this.id})`, {
							filter: "none"
						}, {
							filter: "brightness(0.7) saturate(0.3)",
							scale: 0.8,
							duration: 0.5,
							ease: "power4.inOut"
						}, 0);
				}
			}

		}
		return true;
	}

	_offHover(event) {
		event.preventDefault();
		switch (SessionData.phase) {
			case "cardsInOrbit": {
				if (/rotation-container/.test($(this.cardElem).parent()[0].id)) {
					return gsap.to(this.cardElem, {
						z() { return 150 + gsap.utils.random(0, 50) },
						width: C.card.width,
						height: C.card.height,
						backgroundColor: "transparent",
						rotationX: 0,
						filter: "brightness(0.4) saturate(0.5) drop-shadow(30px 30px 10px rgba(0,0,0,0.7))",
						outline: "none",
						boxShadow: "none",
						ease: "power2.out",
						duration: 0.5,
						delay: 0.25,
						callbackScope: this,
						onComplete() {
							// gsap.set(".tarot-card-main", {pointerEvents: "all"});
							gsap.set(this.cardElem, {backgroundPosition: "center center"});
							if (/rotation-container/.test($(this.cardElem).parent()[0].id)) {
								gsap.effects.cardWander(this.cardElem);
							}
							gsap.killTweensOf(".rotation-container");
							gsap.effects.slowRotate("#rotation-container-0", {
								rotationZ: "+=360",
								delay: 0
							});
							gsap.effects.slowRotate("#rotation-container-1", {
								rotationZ: "-=360",
								delay: 0
							});
						}
					});
				}
				return false;
			}
			case "cardsDealt":
			case "cardsRevealed": return this._hoverTimeline?.reverse();
			default: return false;
		}
	}

	render() {
		// const bgImage = (this.deck.isMain || this.cardNum === 67) ? this.image : "transparent";
		gsap.set(this.cardElem, {
			xPercent: -50,
			yPercent: -50,
			x: this.x,
			y: this.y,
			z: this.z,
			height: this.height,
			width: this.width,
			backgroundImage: this.image,
			backgroundSize: `${this.width}px ${this.height}px`,
			pointerEvents: "all",
			opacity: 0,
			immediateRender: true
		});
		$(this.cardElem).click(this._onClick.bind(this));
		$(this.cardElem).hover(this._onHover.bind(this), this._offHover.bind(this));
	}

	deal() {
		const slot = SessionData.nextEmptySlot;
		if (slot) {
			SessionData.layout[slot].card = this;
			this.slot = slot;
			gsap.to(this.cardElem, {
				rotationX: 0,
				z: 400,
				duration: 0.25,
				ease: "expo.in",
				callbackScope: this,
				onStart() {
					gsap.set(".tarot-card-main", {pointerEvents: slot === 5 ? "none" : "all"});
				},
				onComplete() {
					gsap.killTweensOf(this.cardElem);
					const cardState = Flip.getState(this.cardElem, "boxShadow, filter, rotationZ");
					$(this.cardElem).appendTo("#card-layer");
					gsap.set(this.cardElem, {
						rotationZ: 0,
						z: 0,
						height: C.card.height,
						width: C.card.width,
						scale: 1,
						boxShadow: "5px 5px 5px rgba(0,0,0,0.4)",
						filter: "none",
						...SessionData.layout[slot].pos
					});
					Flip.from(cardState, {
						duration: 2,
						ease: "expo.out",
						absolute: true,
						nested: true,
						prune: true,
						scale: true,
						callbackScope: this,
						onComplete() {
							gsap.set(this.cardElem, {backgroundPosition: "center center"});
							if (slot === 5) {
								gsap.killTweensOf(".canvas-layer, .canvas-layer *");
								gsap.set(".tarot-card-main", {pointerEvents: "all"});
								SetPhase(C.phases.cardsDealt);
							}
						}
					});
				}
			});

		}
	}
	flip(event) {
		// $(this.cardElem).off("click mouseenter");
		this.isFaceUp = true;
		SessionData.ghostText.slotBins[this.slot] = this.validGhostTexts;
		gsap.to(this.cardElem, {
			duration: 0,
			ease: "circ",
			backgroundImage: this.image,
			callbackScope: this,
			onComplete() {
				if (this.slot === 5) {
					this._hoverTimeline?.reverse();
					SetPhase(C.phases.cardsRevealed);
				}
			}
		});
	}
}