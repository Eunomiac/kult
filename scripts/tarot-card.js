import {gsap, Flip, MotionPathPlugin, RoughEase} from "./external/greensock/all.js";
import U from "./utilities.js";
import C from "./constants.js";
import {SessionData, SetPhase, Update} from "./kult-tarot.js";
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
	get slot() { return this._slot }
	set slot(slotNum) {
		this._slot = slotNum;
		this.x = C.slotPos[slotNum].x;
		this.y = C.slotPos[slotNum].y;
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

	_onClick(event) {
		if (SessionData.inTransition) { return false }
		switch (SessionData.phase) {
			case C.cardsInOrbit: {
				event.preventDefault();
				// deal to table;
				return true;
			}
			case C.cardsDealt: {
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
			// no default
		}
		return true;
	}

	_onHover(event) {
		if (SessionData.inTransition) { return false }
		event.preventDefault();
		switch (SessionData.phase) {
			case "cardsInOrbit": {
				gsap.killTweensOf(this.cardElem);
				this._origPos = {
					x: gsap.getProperty(this.cardElem, "x"),
					y: gsap.getProperty(this.cardElem, "y"),
					z: gsap.getProperty(this.cardElem, "z")
				};
				[this._origParent] = $(this.cardElem).parent();
				const [newParent] = $("#control-layer");
				const {x, y} = MotionPathPlugin.convertCoordinates(this._origParent, newParent, {x: gsap.getProperty(this.cardElem, "x"), y: gsap.getProperty(this.cardElem, "y")});
				// const z = gsap.getProperty(this.cardElem, "z") + gsap.getProperty(newParent, "z") - gsap.getProperty(this._origParent, "z");
				$(this.cardElem).appendTo(newParent);
				return gsap.fromTo(this.cardElem, {x, y, /*z,*/ rotationZ: 0}, {
					rotationX: -45,
					scale: 3,
					boxShadow: "rgb(255 166 33) 0px 0px 10px",
					duration: 0.5,
					ease: "power2.out"
				});
			}
			case "cardsDealt": {
				const posData = {};
				if (this.isFaceUp) {
					switch (this.slot) {
						case 2: {
							posData.x = `+=${C.card.width / 3}`;
							break;
						}
						case 3: {
							posData.y = `+=${C.card.height / 3}`;
							break;
						}
						case 4: {
							posData.x = `-=${C.card.width / 3}`;
							break;
						}
						case 5: {
							posData.y = `-=${C.card.height / 3}`;
							break;
						}
						// no default
					}
					this._hoverTimeline = gsap.to(this.cardElem, {
						...posData,
						scale: 3,
						duration: 0.5,
						ease: "power4.inOut",
						callbackScope: this,
						onComplete(i, elem) { gsap.effects.cardWander(this.cardElem) }
					});
				} else if (this.slot === SessionData.nextFaceDownSlot) {
					this._hoverTimeline = gsap.to(this.cardElem, {
						z: "+=50",
						duration: 0.5,
						ease: "power4.inOut",
						boxShadow: "rgb(0 255 0) 0px 0px 30px",
						scale: 1.2
					});
				}
			}
			// no default
		}
		return true;
	}

	_offHover(event) {
		event.preventDefault();
		switch (SessionData.phase) {
			case "cardsInOrbit": {
				$(this.cardElem).appendTo(this._origParent);
				const {x, y} = MotionPathPlugin.convertCoordinates($(this.cardElem).parent()[0], this._origParent, {x: gsap.getProperty(this.cardElem, "x"), y: gsap.getProperty(this.cardElem, "y")});
				// const z = gsap.getProperty(this.cardElem, "z") + gsap.getProperty(this._origParent, "z") - gsap.getProperty($(this.cardElem).parent()[0], "z");
				const rotationZ = -1 * gsap.getProperty(this._origParent, "rotationZ");
				$(this.cardElem).appendTo(this._origParent);
				return gsap.fromTo(this.cardElem, {x, y, /*z,*/ rotationZ}, {
					rotationX: 0,
					scale: 1,
					boxShadow: "none",
					duration: 0.5,
					ease: "power2.out"
				});
			}
			// 	const cardState = Flip.getState(this.cardElem, "boxShadow");
			// 	$(this.cardElem).appendTo(this._origParent);
			// 	gsap.set(this.cardElem, {
			// 		...this._origPos,
			// 		rotationZ: -1 * gsap.getProperty(this._origParent, "rotationZ"),
			// 		scale: 1,
			// 		boxShadow: "none"
			// 	});
			// 	Flip.from(cardState, {
			// 		duration: 0.5,
			// 		ease: "power2.out",
			// 		absolute: true,
			// 		nested: true,
			// 		prune: true,
			// 		scale: true
			// 	});
			// 	break;
			// }
			case "cardsDealt": return this._hoverTimeline?.reverse();
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
			background: this.image,
			pointerEvents: "all",
			opacity: 0,
			immediateRender: true
		});
		// $(this.cardElem).click(this._onClick.bind(this));
		// $(this.cardElem).hover(this._onHover.bind(this), this._offHover.bind(this));
	}

	flip(event) {
		$(this.cardElem).off("click mouseenter");
		this.isFaceUp = true;
		gsap.to(this.cardElem, {
			duration: 0,
			ease: "circ",
			background: this.image
		});
		if (this.slot === 5) {
			gsap.to("#card-layer", {
				x: `-=${SessionData.layout[2].pos.x - 0.5 * C.card.width - C.padding.x}px`,
				duration: 2,
				ease: "expo4"
			});
		}
	}

}
