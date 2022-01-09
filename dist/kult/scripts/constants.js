/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

const C = {
	imgPath: "https://raw.githubusercontent.com/Eunomiac/kult/main/assets/images/",
	bgTable: "table-bg.webp",
	splashTexts: [
		[
			"TRUST YOUR INSTINCTS",
			"Tarot is not connected to logic. It is connected to the subconscious and your instincts. Each card is a key to unlock your mind. If you get a strong impression of a card’s meaning without consulting its description – trust your instincts. There is no right or wrong interpretation. Experiment with the Tarot cards and discover how they can be used to serve your story."
		],
		[
			"ADOPT THE MINDSET",
			"You should be in the right mindset when utilizing the Tarot cards. The ritual is important, not to attract supernatural attentions, but rather to encourage your subconscious to engage with the cards as creative inspiration, as a way to unlock the labyrinths of your imagination. So take a moment to clear your mind. Take a few deep breaths. Center your thoughts on the dark potential of the KULT universe."
		],
		[
			"FOCUS ON YOUR QUESTION",
			"About what in your campaign are you hoping to find guidance? Perhaps an important NPC feels underdeveloped; perhaps you'd like an evocative location to hide a cult; perhaps you wish to know what Higher Power pulls the strings of a newly-arrived stranger, and why. Your question should be as focused and as narrow as you can make it --- but no narrower. Write your question below, then choose one of the five reading templates that best suits the insight you seek."
		]
	],
	numCardBacksByType: {
		"kult-red": 4,
		"kult-official": 1,
		"moon": 4,
		"wendigo": 3,
		"eye": 6,
		"lunar": 1,
		"keys": 20,
		"desolate": 5
	},
	padding: {x: 20, y: 20},
	spacing: {x: 100, y: 30},
	layers: {
		baseZ: -300,
		vertShift: 100
	},
	card: {
		aspectRatio: 1.712,
		get height() { return (window.innerHeight - (2 * C.padding.y)) / 3 - C.spacing.y },
		get width() { return this.height / this.aspectRatio }
	},
	deckHeight: 50,
	deckRadiusPercent: 1.4,
	phases: {
		inTransition: "inTransition",
		introduction: "Introduction",
		templateSelection: "TemplateSelection",
		deckSelection: "DeckSelection",
		cardsInOrbit: "cardsInOrbit",
		cardsDealt: "cardsDealt",
		cardsRevealed: "cardsRevealed"
	},
	ghostTextCategories: ["individual", "location", "organization", "situation", "creature", "item"],
	ghostTextHorizSpan: 200,
	styleMap: {
		"divine": {
			title: {
				color: "#ffffff",
				fontFamily: "Caslon Antique",
				fontSize: 52,
				textShadow: "0 0 8px black",
				textTransform: "uppercase",
				fontWeight: "bold"
			},
			get subTitle() {
				return {
					...this.title,
					fontSize: 28
				};
			}
		},
		"archon": {
			title: {
				color: "#978100",
				fontFamily: "Caslon Antique",
				fontSize: 44,
				textShadow: "0 0 2px #ffd700",
				fontWeight: "bold"
			},
			get subTitle() {
				return {
					...this.title,
					fontSize: 18,
					color: "black"
				};
			}
		},
		"death angel": {
			get title() {
				return {
					...C.styleMap.archon.title,
					color: "#aa0000",
					textShadow: "0 0 2px #ff0000",
					fontWeight: "bold"
				};
			},
			get subTitle() {
				return {
					...C.styleMap.archon.subTitle,
					textShadow: "0 0 2px #ff0000"
				};
			}
		},
		"crescents": {
			title: {
				color: "black",
				fontFamily: "Infidel",
				fontSize: 36,
				textShadow: "0 0 2px #93ecff",
				textTransform: "uppercase",
				fontWeight: "bold"
			},
			get subTitle() {
				return {
					...this.title,
					color: "#93ecff",
					textShadow: "0 0 2px black",
					fontSize: 14,
					textTransform: "none",
					fontVariant: "small-caps"
				};
			}
		},
		"eyes": {
			get title() {
				return {
					...C.styleMap.crescents.title,
					textShadow: "0 0 2px #ffd05d"
				};
			},
			get subTitle() {
				return {
					...C.styleMap.crescents.subTitle,
					color: "#ffd05d"
				};
			}
		},
		"hourglasses": {
			get title() {
				return {
					...C.styleMap.crescents.title,
					textShadow: "0 0 2px #bc8446"
				};
			},
			get subTitle() {
				return {
					...C.styleMap.crescents.subTitle,
					color: "#bc8446"
				};
			}
		},
		"roses": {
			get title() {
				return {
					...C.styleMap.crescents.title,
					textShadow: "0 0 2px #ff6c1b"
				};
			},
			get subTitle() {
				return {
					...C.styleMap.crescents.subTitle,
					color: "#ff6c1b"
				};
			}
		},
		"skulls": {
			get title() {
				return {
					...C.styleMap.crescents.title,
					textShadow: "0 0 2px #daffad"
				};
			},
			get subTitle() {
				return {
					...C.styleMap.crescents.subTitle,
					color: "#daffad"
				};
			}
		}
	},
	TAROTDATA: {
		"major-arcana": [
			{
				name: "ANTHROPOS",
				arcana: "Major",
				affiliation: "Divine",
				value: 1,
				keyword: "Imprisoned by",
				summary: "One of the three most powerful cards in the Kult Tarot, Demiurgos represents the Demiurge: The original architect of Mankind's prison, the ruler who is now lost. Demiurgos is a powerful sign that this reading favours the Archons and their machinations.",
				note: "Because of the unique significance of Demiurgos, a second card has been drawn and paired with it to reveal how the power of Demiurgos manifests in the context of this reading.",
				ghostText: {
					individual: [
						"the mastermind of a vast conspiracy"
					],
					location: [
						"a reflection of the Demiurge's vanished Citadel"
					],
					organization: [
						"the descendants of a dead civilization"
					],
					situation: [
						"a connection to the lost Demiurge Itself"
					],
					creature: [
						"beasts of Metropolis"
					],
					item: [
						"Machinery of Death and Rebirth"
					]
				},
				isDrawingShiftCard: true,
				imgfile: "major-1.webp"
			},
			{
				name: "DEMIURGOS",
				arcana: "Major",
				affiliation: "Divine",
				value: 2,
				keyword: "Hellish",
				summary: "One of the three most powerful cards in the Kult Tarot, Astaroth is the Ruler of Inferno and Shadow of the Demiurge, who seeks to subvert Elysium away from the Powers of Metropolis. Astaroth is a powerful sign that this reading favours the Death Angels and their machinations.",
				note: "Because of the unique significance of Astaroth, a second card has been drawn and paired with it to reveal how the power of Astaroth manifests in the context of this reading.",
				ghostText: {
					individual: [
						"a mole who has the trust of a Lichtor"
					],
					location: [
						"Inferno"
					],
					organization: [
						"mysterious influence from behind the Veil"
					],
					situation: [
						"a direct connection to Astaroth"
					],
					creature: [
						"that which comes from death"
					],
					item: [
						"Machinery of Death and Rebirth"
					]
				},
				isDrawingShiftCard: true,
				imgfile: "major-2.webp"
			},
			{
				name: "ASTAROTH",
				arcana: "Major",
				affiliation: "Archon",
				value: 3,
				keyword: "the Archon of Hierarchy",
				summary: "Kether's influence manifests as hierarchical structures with masters and servants, widening class gaps, and an aristocracy with power and benefits.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a butler who knows more than he'll willingly share"
					],
					location: [
						"the temple of a strict faith"
					],
					organization: [],
					situation: [
						"entwined wills, master and slave"
					],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-3.webp"
			},
			{
				name: "Kether",
				arcana: "Major",
				affiliation: "Archon",
				value: 4,
				keyword: "the Archon of Submission",
				summary: "Chokmah's influence manifests as the submission to religious leaders, martyrdom, fanaticism, theocratic rule, and dogmatism. It exists virtually everywhere religion can be found.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a flaggelant with infected wounds"
					],
					location: [
						"the temple of a strict faith"
					],
					organization: [],
					situation: [
						"entwined wills, master and slave"
					],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-4.webp"
			},
			{
				name: "Chokmah",
				arcana: "Major",
				affiliation: "Archon",
				value: 5,
				keyword: "the Archon of Community",
				summary: "Binah's influence manifests as the family's power over the individual, mistrust of the state and other authorities outside of the family, strengthened traditions, and the distrust of strangers.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a battered housewife"
					],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-5.webp"
			},
			{
				name: "Binah",
				arcana: "Major",
				affiliation: "Archon",
				value: 6,
				keyword: "the Archon of Safety",
				summary: "Chesed's influence manifests as people's longing for safety, the desire to feel comfortable and safe from dangers threatening you, encouraging friendly behavior, and the sense that you are protected against the unknown and dangerous.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a surprisingly-intelligent security guard"
					],
					location: [
						"a dark vault"
					],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-6.webp"
			},
			{
				name: "Chesed",
				arcana: "Major",
				affiliation: "Archon",
				value: 7,
				keyword: "the Archon of Law",
				summary: "Geburah's influence generates bureaucratic institutions, stricter laws, increased policing, and societal control over its citizenry. Those so influenced yield to increased control, typically out of their fear of chaos.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a prison warden"
					],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-7.webp"
			},
			{
				name: "Geburah",
				arcana: "Major",
				affiliation: "Archon",
				value: 8,
				keyword: "the Archon of Allure",
				summary: "Tiphareth's influence incites a manic craving for beauty and affirmation, which must be fulfilled by any means necessary. Celebrities are worshipped as prophets, the mediocre waste their days imbibing the internet and television shows, and despise and ignore anyone who doesn't meet the social 'norms.'",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a socially-isolated Muslim who is being radicalized"
					],
					location: [],
					organization: [],
					situation: [
						"resplendent beauty hides an ugly truth"
					],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-8.webp"
			},
			{
				name: "Tiphareth",
				arcana: "Major",
				affiliation: "Archon",
				value: 9,
				keyword: "the Archon of Victory",
				summary: "Netzach's influence strengthens patriotism and nationalism, unites societies against a common enemy, and feeds the us-versus-them mentality. The righteous obliterate all that threaten them, strengthen their military, justify their violence in the name of the Greater Good, and incite people to arm themselves.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"the manager of a corporiate acquisitions branch"
					],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-9.webp"
			},
			{
				name: "Netzach",
				arcana: "Major",
				affiliation: "Archon",
				value: 10,
				keyword: "the Archon of Honor",
				summary: "Hod's influence conflates honor with prestige, elevates one's status among others above all else, and sets the law aside in favor of personal vendettas. Expecting admiration for their adherence to their inflexible values, the honor-bound ruthlessly ostracize any who have brought shame upon themselves by failing to uphold their honor and fulfil the many duties it demands.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-10.webp"
			},
			{
				name: "Hod",
				arcana: "Major",
				affiliation: "Archon",
				value: 11,
				keyword: "the Archon of Avarice",
				summary: "Yesod influences society through greed, capitalism, economics, consumer frenzy, and increased corporate power, as well as by promoting the admiration and respect of wealth as a sign of personal intelligence and ambition. It encourages contempt for the poverty-stricken, who are associated with laziness and stupidity, and supports the dismantling of social welfare institutions.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-11.webp"
			},
			{
				name: "Yesod",
				arcana: "Major",
				affiliation: "Archon",
				value: 12,
				keyword: "the Archon of Awakening",
				summary: "Malkuth's influence strives to free people from their prison by shattering the Illusion to reveal other dimensions, and inspiring people to question the nature of society and the fabric of reality. She inspires magicians and scientists to experiment with the unknown and search for their lost divinity. (Previously, Malkuth represented Conformity and the natural cycles we tend to see in our world and our prison.)",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a Sleeper opening their eyes for the first time"
					],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-12.webp"
			},
			{
				name: "Malkuth",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 13,
				keyword: "the Death Angel of Power",
				summary: "Thaumiel's influence manifests as a hunger for power, corruption, dictatorship, fascism, intrigue, insurrection, oppression, ruthlessness and totalitarian rule – a breakdown of solidarity and trust.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-13.webp"
			},
			{
				name: "Thaumiel",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 14,
				keyword: "the Death Angel of Abuse",
				summary: "Chagidiel's influence takes shape in the violation of children, the perversion of adult love and care, forgotten and lost children, homeless street kids, and the degradation and ruination of school systems.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a serial rapist who lives with his unknowing family"
					],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-14.webp"
			},
			{
				name: "Chagidiel",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 15,
				keyword: "the Death Angel of Exclusion",
				summary: "Satahariel's influence incites self-loathing, loneliness, hopelessness, contempt for 'normals,' self-destruction, anxiety, depression, suicide, school shootings and massacres, and communities of outsiders inspiring each other to commit destructive actions.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a mute child with crayons"
					],
					location: [
						"an isolation cell with black walls"
					],
					organization: [],
					situation: [
						"an early-onset Alzheimer's diagnosis"
					],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-15.webp"
			},
			{
				name: "Sathariel",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 16,
				keyword: "the Death Angel of Fear",
				summary: "Gamichicoth's influence awakens fear of 'the Other' by escalating distrust and blaming various ethnic groups, religions, or political dissidents for society's problems. False narratives are created and distributed through news media, rumors, and manipulated visual evidence, while heralds whisper how all our concerns would dissipate if only 'the Others' were punished or disappeared.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [],
					location: [],
					organization: [],
					situation: [
						"a sudden explosion in a public place"
					],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-16.webp"
			},
			{
				name: "Gamichicoth",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 17,
				keyword: "the Death Angel of Torment",
				summary: "Golab's influence increases societal sadism, giving people pleasure from inflicting pain on others or by being subjected to torment themselves. Criminals are tortured in public, people carry out their most sadistic ideas unto both willing and unwilling subjects in obscure safe houses, while murderers leave trails of mutilated bodies.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-17.webp"
			},
			{
				name: "Golab",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 18,
				keyword: "the Death Angel of Compulsion",
				summary: "Togarini's influence increases the manic creativity that distorts reality, tearing beauty asunder. Insane artwork opens portals to Inferno, magicians experiment at the border of life and death, and death itself acts erratically – souls binding themselves into rotting corpses, or haunting the living as distorted spectres.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"an anorexic ballet dancer"
					],
					location: [],
					organization: [],
					situation: [
						"being forced to eat human flesh"
					],
					creature: [
						"a wendigo cursed for committing cannibalism"
					],
					item: [
						"a pack of cigarettes"
					]
				},
				isDrawingShiftCard: false,
				imgfile: "major-18.webp"
			},
			{
				name: "Togarini",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 19,
				keyword: "the Death Angel of Conflict",
				summary: "Hareb-Serap's influence propagates uncontrollable rage, bloodlust, and senseless violence. Gangs have shootouts in public places, police beat suspects to death, hooligans storm arenas, lynch mobs tear their targets to pieces, harmless conflicts escalate into bloody fist-fights, and 'normal' people teeter on the brink of explosive outbursts at all times.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [],
					location: [],
					organization: [],
					situation: [
						"sudden, unexplained aggression"
					],
					creature: [],
					item: [
						"a bomber aircraft"
					]
				},
				isDrawingShiftCard: false,
				imgfile: "major-19.webp"
			},
			{
				name: "Hareb-Serap",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 20,
				keyword: "the Death Angel of Vengeance",
				summary: "Samael's influence strengthens paranoia, vindictiveness, and obsession with injustices, while perpetrators take brutal revenge for nonexistent affronts, jealous partners murder their loved ones for imagined betrayals, and terrorists exact gory retribution upon their foes.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-20.webp"
			},
			{
				name: "Samael",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 21,
				keyword: "the Death Angel of Lust",
				summary: "Gamaliel influences society towards hypersexualization and objectification, where crowds commit gang rape, victims are forced into prostitution, pornography becomes increasingly hardcore and perverted, and celebrants gather in clubs and secret societies for macabre orgies, and people embrace mindless desires with no consideration of the consequences of their actions.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a <i>femme fatale</i> with a harem of lovers"
					],
					location: [],
					organization: [
						"a gentleman's club where anything goes"
					],
					situation: [],
					creature: [],
					item: [
						"a Fleshlight"
					]
				},
				isDrawingShiftCard: false,
				imgfile: "major-21.webp"
			},
			{
				name: "Gamaliel",
				arcana: "Major",
				affiliation: "Death Angel",
				value: 22,
				keyword: "the Death Angel of Discord",
				summary: "Nahemoth's influence deforms the natural world, turning it dangerous and threatening, expressed as forest fires, oil spills, poisoned streams and groundwater, misshapen animal life, violent storms, cold snaps, heat waves, torrential rains, earthquakes, tsunamis, cannibal tribes, disfigured fetuses, and baleful eclipses. She turns the world upside down, instilling fear by destroying conformity and normalcy.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					individual: [
						"a mad scientist"
					],
					location: [],
					organization: [],
					situation: [
						"an earthquake"
					],
					creature: [],
					item: []
				},
				isDrawingShiftCard: false,
				imgfile: "major-22.webp"
			}
		],
		"suits": {
			crescents: {
				name: "Crescents",
				summary: "Also known as the Moon, the Crescent is a symbol of the dream, the search for the unattainable, and the source of creation. The dream inspires and strengthens, but is also a crutch for the unbearable in life and an escape from reality. It has a strong connection to Limbo.",
				imgfile: "minor-crescents-1.webp"
			},
			eyes: {
				name: "Eyes",
				summary: "The Suit of the Eyes represents Elysium, the enslavement of our minds and souls. It is also the faith that binds us, the crippling madness, and the rebellious, penetrating insight that lets us see through the Illusion.",
				imgfile: "minor-eyes-1.webp"
			},
			hourglasses: {
				name: "Hourglasses",
				summary: "The hourglass represents Time and Space, the prison binding us in the Illusion, but it also carries the hope of breaking the shackles and waking up. The hourglass also reproduces the Labyrinth that all cities are built from. It has a strong connection to Achlys and the Underworld.",
				imgfile: "minor-hourglasses-1.webp"
			},
			roses: {
				name: "Roses",
				summary: "The rose is a symbol of Passion, the blinding desire that binds or liberates us. It relates to our sexuality. It is strongly connected to the primal forces of Gaia.",
				imgfile: "minor-roses-1.webp"
			},
			skulls: {
				name: "Skulls",
				summary: "This suit represents Death as a breakthrough to the other side, as well as the mortal destruction that binds us to our flesh. It is strongly connected to both Metropolis and the Archons, as well as to Inferno and the Death Angels.",
				imgfile: "minor-skulls-1.webp"
			}
		},
		"minor-arcana": {
			crescents: [
				{
					name: "Nahemoth",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 1,
					keyword: "Vortex",
					summary: "The very source of creation, dreams, and the ever transforming chaos that has its source deep in Limbo.",
					note: "",
					ghostText: {
						individual: [
							"a world-changing visionary"
						],
						location: [
							"the Vortex"
						],
						organization: [
							"a secret order of magicians"
						],
						situation: [
							"a life turned upside down"
						],
						creature: [
							"a Dream Prince"
						],
						item: [
							"unexpected features"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-1.webp"
				},
				{
					name: "Ace of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 2,
					keyword: "Creation",
					summary: "Creation is the raw godly power to shape the world and to turn thought and dream into something inspiring.",
					note: "",
					ghostText: {
						individual: [
							"an inspired photographer"
						],
						location: [
							"the tallest skyscraper in the city"
						],
						organization: [
							"a classic art foundation"
						],
						situation: [
							"a melody only some can hear"
						],
						creature: [
							"an artificial creation given life"
						],
						item: [
							"a drawing board"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-2.webp"
				},
				{
					name: "Two of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 3,
					keyword: "Undoing",
					summary: "Undoing is part of the natural cycle of collapse and obliteration of ideas, structures, bodies, dreams, and whole worlds.",
					note: "",
					ghostText: {
						individual: [
							"a cold-hearted hitman"
						],
						location: [
							"a derelict building"
						],
						organization: [
							"a demolitions company"
						],
						situation: [
							"a life falls apart"
						],
						creature: [
							"Cairath"
						],
						item: [
							"a computer virus"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-3.webp"
				},
				{
					name: "Three of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 4,
					keyword: "Transformation",
					summary: "Transformation is a state of extreme change and metamorphosis.",
					note: "",
					ghostText: {
						individual: [
							"a reckless plastic surgeon"
						],
						location: [
							"a landscape architect firm"
						],
						organization: [
							"a grass-roots political movement"
						],
						situation: [
							"a change of heart"
						],
						creature: [
							"a shapeshifter"
						],
						item: [
							"a makeup kit"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-4.webp"
				},
				{
					name: "Four of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 5,
					keyword: "Connection",
					summary: "Connection of intertwined structures, wills, or something that might hinder you or help you on your way.",
					note: "",
					ghostText: {
						individual: [
							"a greedy fixer"
						],
						location: [
							"a group of islands"
						],
						organization: [
							"a hacker group"
						],
						situation: [
							"a conspiracy"
						],
						creature: [
							"a Tekron"
						],
						item: [
							"a server network"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-5.webp"
				},
				{
					name: "Five of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 6,
					keyword: "Merging",
					summary: "Merging of ideas, bodies, and minds. Two things become one.",
					note: "",
					ghostText: {
						individual: [
							"a good-hearted priest"
						],
						location: [
							"where two rivers meet"
						],
						organization: [
							"a global corporation"
						],
						situation: [
							"an act of love"
						],
						creature: [
							"a Cairath"
						],
						item: [
							"two plastic items melted together"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-6.webp"
				},
				{
					name: "Six of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 7,
					keyword: "Reflection",
					summary: "Reflections can reveal the truth, be deceptive or may mirror a person or a place.",
					note: "",
					ghostText: {
						individual: [
							"an identical twin"
						],
						location: [
							"a still pond"
						],
						organization: [
							"a Malkuth cult"
						],
						situation: [
							"a mirage"
						],
						creature: [
							"a Doppelgänger"
						],
						item: [
							"a shopping window"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-7.webp"
				},
				{
					name: "Seven of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 8,
					keyword: "Repetition",
					summary: "Repetition can be an endless loop, a recurring theme, Déjà vu, or something you can't escape.",
					note: "",
					ghostText: {
						individual: [
							"a postman who reads the mail"
						],
						location: [
							"a maze where everything looks the same"
						],
						organization: [
							"a conservative think tank"
						],
						situation: [
							"a cover band playing the same songs"
						],
						creature: [
							"an Acrotide"
						],
						item: [
							"a hamster wheel"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-8.webp"
				},
				{
					name: "Eight of Crescents",
					arcana: "Minor",
					affiliation: "Crescents",
					value: 9,
					keyword: "Stillness",
					summary: "Stillness represents apathy, tranquility and a situation that seems to be unchanging.",
					note: "",
					ghostText: {
						individual: [
							"a calm and soothing guru"
						],
						location: [
							"a small town frozen in time"
						],
						organization: [
							"a meditation centre"
						],
						situation: [
							"a calm and quiet day"
						],
						creature: [
							"a lost god with no memory"
						],
						item: [
							"sleeping pills"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-crescents-9.webp"
				}
			],
			eyes: [
				{
					name: "Nine of Crescents",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 1,
					keyword: "Elysium",
					summary: "Elysium is the very core of the Illusion and the intricate machinery that keeps you in chains.",
					note: "",
					ghostText: {
						individual: [
							"a powerful politician"
						],
						location: [
							"a nondescript government building"
						],
						organization: [
							"a cult within the Army"
						],
						situation: [
							"oppressive cultural values"
						],
						creature: [
							"a Lictor"
						],
						item: [
							"a book of laws"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-1.webp"
				},
				{
					name: "Ace of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 2,
					keyword: "Imprisonment",
					summary: "Imprisonment of your body, soul, and mind.",
					note: "",
					ghostText: {
						individual: [
							"a police officer"
						],
						location: [
							"a maximum-security prison"
						],
						organization: [
							"law enforcement"
						],
						situation: [
							"bills that need to be paid"
						],
						creature: [
							"an eldermensch"
						],
						item: [
							"a set of handcuffs"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-2.webp"
				},
				{
					name: "Two of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 3,
					keyword: "Faith",
					summary: "Faith that gives you purpose, but makes you blind.",
					note: "",
					ghostText: {
						individual: [
							"a televangelist preaching the Prosperity Gospel"
						],
						location: [
							"a secluded temple"
						],
						organization: [
							"a religious sect"
						],
						situation: [
							"an occult ceremony"
						],
						creature: [
							"an angel of Chokmah"
						],
						item: [
							"a rusty nail from the cross of Jesus"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-3.webp"
				},
				{
					name: "Three of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 4,
					keyword: "Distractions",
					summary: "Distractions in everyday life that make you blind to the Truth.",
					note: "",
					ghostText: {
						individual: [
							"an intrusive telephone salesman"
						],
						location: [
							"a movie theater"
						],
						organization: [
							"an advertising agency"
						],
						situation: [
							"a social media scandal"
						],
						creature: [
							"Mancipium"
						],
						item: [
							"a cluttered smartphone"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-4.webp"
				},
				{
					name: "Four of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 5,
					keyword: "Division",
					summary: "Division keeps us occupied with endless struggles.",
					note: "",
					ghostText: {
						individual: [
							"an online agitator"
						],
						location: [
							"a turbulent social media community"
						],
						organization: [
							"a minority ethnic group"
						],
						situation: [
							"a political rally"
						],
						creature: [
							"a servant of Hareb-Serap"
						],
						item: [
							"a pamphlet of hate propaganda"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-5.webp"
				},
				{
					name: "Five of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 6,
					keyword: "Rebellion",
					summary: "Rebellion and struggle against the ruling order.",
					note: "",
					ghostText: {
						individual: [
							"a stubborn loner"
						],
						location: [
							"a house occupied by squatters"
						],
						organization: [
							"a guerrilla force"
						],
						situation: [
							"a revolution"
						],
						creature: [
							"an angel of Malkuth"
						],
						item: [
							"a pamphlet decrying media propaganda"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-6.webp"
				},
				{
					name: "Six of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 7,
					keyword: "Madness",
					summary: "Madness that overwhelms and tears apart, but may also grant insight.",
					note: "",
					ghostText: {
						individual: [
							"a distraught medical patient"
						],
						location: [
							"an insane asylum"
						],
						organization: [
							"fools with power"
						],
						situation: [
							"multiple personalities in conflict"
						],
						creature: [
							"a creature of madness"
						],
						item: [
							"a half-burned doll"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-7.webp"
				},
				{
					name: "Seven of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 8,
					keyword: "Visions",
					summary: "Visions that may bring insight, but may also lead you astray.",
					note: "",
					ghostText: {
						individual: [
							"an oracle in the suburbs"
						],
						location: [
							"an old temple"
						],
						organization: [
							"dream interpreters"
						],
						situation: [
							"nightmarish visions"
						],
						creature: [
							"a being born of nightmares and visions"
						],
						item: [
							"a Super-8 camera"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-8.webp"
				},
				{
					name: "Eight of Eyes",
					arcana: "Minor",
					affiliation: "Eyes",
					value: 9,
					keyword: "Enlightenment",
					summary: "The road that may lead you towards Enlightenment and Awakening.",
					note: "",
					ghostText: {
						individual: [
							"an amature philosopher"
						],
						location: [
							"a road to the unknown"
						],
						organization: [
							"a Cult that serves Malkuth"
						],
						situation: [
							"an initiation ritual"
						],
						creature: [
							"a child of the night"
						],
						item: [
							"a map of unknown origins"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-eyes-9.webp"
				}
			],
			hourglasses: [
				{
					name: "Nine of Eyes",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 1,
					keyword: "Achlys",
					summary: "Achlys represents nothingness, infinity, the void, but also the obliteration of the very soul.",
					note: "",
					ghostText: {
						individual: [
							"a severely-depressed soul"
						],
						location: [
							"the vacuum of space"
						],
						organization: [
							"a cult that worships She Who Waits Below"
						],
						situation: [
							"the total destruction of what makes a person"
						],
						creature: [
							"children of the Underworld"
						],
						item: [
							"a sensory deprivation tank"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-1.webp"
				},
				{
					name: "Ace of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 2,
					keyword: "Future",
					summary: "Future revolves around things yet to come as well as potential that has yet not been unleashed.",
					note: "",
					ghostText: {
						individual: [
							"a suburban fortune teller"
						],
						location: [
							"an orphanage"
						],
						organization: [
							"futures analysts"
						],
						situation: [
							"a prediction"
						],
						creature: [
							"a being from the future"
						],
						item: [
							"an old pocket watch"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-2.webp"
				},
				{
					name: "Two of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 3,
					keyword: "Past",
					summary: "Past revolves around things that have already occurred and now come back, or could be discovered, if you look in the right place.",
					note: "",
					ghostText: {
						individual: [
							"a nostalgic old-timer"
						],
						location: [
							"a forgotten museum"
						],
						organization: [
							"a center for genealogy studies"
						],
						situation: [
							"an archaeological dig"
						],
						creature: [
							"a being from a time long passed"
						],
						item: [
							"a book of a family's history"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-3.webp"
				},
				{
					name: "Three of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 4,
					keyword: "Space",
					summary: "Space represents someone or something that travels forward through space towards a goal or is always in motion.",
					note: "",
					ghostText: {
						individual: [
							"a hard-working truck driver"
						],
						location: [
							"an endless highway"
						],
						organization: [
							"a moving company"
						],
						situation: [
							"a boat trip"
						],
						creature: [
							"the crazed dancers"
						],
						item: [
							"a phone with intact GPS info"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-4.webp"
				},
				{
					name: "Four of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 5,
					keyword: "Borderland",
					summary: "Borderland is the place between two worlds or two states of being, or where Time and Space meet the physical world.",
					note: "",
					ghostText: {
						individual: [
							"a corrupt customs agent"
						],
						location: [
							"a place where the Illusion is weak"
						],
						organization: [
							"a cult that guards the borderland"
						],
						situation: [
							"existing between two worlds"
						],
						creature: [
							"a Borderliner"
						],
						item: [
							"a letter of introduction"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-5.webp"
				},
				{
					name: "Five of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 6,
					keyword: "Hidden",
					summary: "Hidden represents something that is obscured and hidden from view. It is strongly tied to the city of Ktonor in the Underworld.",
					note: "",
					ghostText: {
						individual: [
							"an undercover agent"
						],
						location: [
							"the Underworld city of Ktonor"
						],
						organization: [
							"a spy agency"
						],
						situation: [
							"an undercover operation"
						],
						creature: [
							"a child of the Underworld"
						],
						item: [
							"the key to a safehouse"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-6.webp"
				},
				{
					name: "Six of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 7,
					keyword: "Labyrinth",
					summary: "Labyrinth is a maze filled with dangers and confusion, and is tied to the Underworld.",
					note: "",
					ghostText: {
						individual: [
							"a mathematician working on an unsolvable problem"
						],
						location: [
							"the sewers"
						],
						organization: [
							"a cult worshipping the creatures of the Underworld"
						],
						situation: [
							"losing one's direction"
						],
						creature: [
							"Cairath"
						],
						item: [
							"the compass from an old sailing vessel"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-7.webp"
				},
				{
					name: "Seven of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 8,
					keyword: "Crossroad",
					summary: "Crossroad is connected to two distinct paths, a choice that has to be made and two very different outcomes.",
					note: "",
					ghostText: {
						individual: [
							"a woman running from her past"
						],
						location: [
							"an unexpected fork in the road"
						],
						organization: [
							"a fertility clinic"
						],
						situation: [
							"a choice more important than it appears"
						],
						creature: [
							"a pact-weaver"
						],
						item: [
							"a letter with life-changing information"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-8.webp"
				},
				{
					name: "Eight of Hourglasses",
					arcana: "Minor",
					affiliation: "Hourglasses",
					value: 9,
					keyword: "Gate",
					summary: "Gate represents a threshold or obstacle that must be crossed or be protected.",
					note: "",
					ghostText: {
						individual: [
							"a surprisingly-intelligent security guard"
						],
						location: [
							"a bank vault"
						],
						organization: [
							"an unsympathetic insurance company"
						],
						situation: [
							"something that needs to be opened"
						],
						creature: [
							"a guardian"
						],
						item: [
							"an encrypted file"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-hourglasses-9.webp"
				}
			],
			roses: [
				{
					name: "Nine of Hourglasses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 1,
					keyword: "Gaia",
					summary: "Gaia is the Untamed Wilderness, that which cannot be controlled, the primal hunger and raw emotions.",
					note: "",
					ghostText: {
						individual: [
							"Madman more animal than man"
						],
						location: [
							"Borderland to Gaia"
						],
						organization: [
							"Cult worshiping the untamed wilderness"
						],
						situation: [
							"Savage cannibalism"
						],
						creature: [
							"Enwildened god"
						],
						item: [
							"Map that leads into the wild"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-1.webp"
				},
				{
					name: "Ace of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 2,
					keyword: "Birth",
					summary: "Birth represents what comes out of passion, the start of something new, a soul merged into flesh.",
					note: "",
					ghostText: {
						individual: [
							"Strict midwife"
						],
						location: [
							"Run-down maternity ward"
						],
						organization: [
							"Surrogate mother agency"
						],
						situation: [
							"Child is born"
						],
						creature: [
							"Strange offspring"
						],
						item: [
							"Bottle of mothers milk mixed with blood"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-2.webp"
				},
				{
					name: "Two of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 3,
					keyword: "Survival",
					summary: "Survival represents the will to go on against all odds, the survival of the fittest and conquering difficulties by pure iron will.",
					note: "",
					ghostText: {
						individual: [
							"Hillbilly survivalist with an iron will"
						],
						location: [
							"The depths of the wild"
						],
						organization: [
							"Survivalist network"
						],
						situation: [
							"Lost in the wilderness"
						],
						creature: [
							"Being from the depths of Gaia"
						],
						item: [
							"Door chain"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-3.webp"
				},
				{
					name: "Three of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 4,
					keyword: "Growth",
					summary: "Growth represents things that gain power and expand, be it will, body, or nature.",
					note: "",
					ghostText: {
						individual: [
							"Boy with physical deformations"
						],
						location: [
							"Place overtaken by nature"
						],
						organization: [
							"Fertility clinic"
						],
						situation: [
							"An idea grows into an obsession"
						],
						creature: [
							"Libith/Darthea"
						],
						item: [
							"Syringe with steroids"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-4.webp"
				},
				{
					name: "Four of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 5,
					keyword: "Predator",
					summary: "Predator represents the hunter, the one that is hungry and preys on the weak.",
					note: "",
					ghostText: {
						individual: [
							"an influential film mogul"
						],
						location: [
							"Seedy hotel close to the red light district"
						],
						organization: [
							"Cult celebrating murder"
						],
						situation: [
							"preying on the weak"
						],
						creature: [
							"Nosferatu that hunts from the shadows"
						],
						item: [
							"Red lipstick"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-5.webp"
				},
				{
					name: "Five of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 6,
					keyword: "Swarm",
					summary: "Swarm represents a gathering, a collective mind, a mob swallowed by passion and acting as one.",
					note: "",
					ghostText: {
						individual: [
							"a devoted follower of someone undeserving"
						],
						location: [
							"a city square at the intersection of six streets"
						],
						organization: [
							"rabid football supporters"
						],
						situation: [
							"going with the flow proves disastrous"
						],
						creature: [
							"Pack of wolves"
						],
						item: [
							"Jar of honey"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-6.webp"
				},
				{
					name: "Six of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 7,
					keyword: "Prey",
					summary: "Prey represents the victim of passion or be the target for some enemy or dangerous situation.",
					note: "",
					ghostText: {
						individual: [
							"Celebrity terrorized by a ruthless stalker"
						],
						location: [
							"Hidden cell in the basement of a house"
						],
						organization: [
							"Support group for survivors of rape and sexual abuse"
						],
						situation: [
							"Lured into a trap"
						],
						creature: [
							"Creature of Passion"
						],
						item: [
							"Crying and begging on a voice recording"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-7.webp"
				},
				{
					name: "Seven of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 8,
					keyword: "Obsession",
					summary: "Obsession represents the grip when passion has gotten hold of you and you cannot control it but are a victim to its influence.",
					note: "",
					ghostText: {
						individual: [
							"Voyeuristic photographer"
						],
						location: [
							"Classy strip club"
						],
						organization: [
							"Boy band fan club"
						],
						situation: [
							"Enslaved by passion"
						],
						creature: [
							"Mancipium"
						],
						item: [
							"Gossip Tabloid Magazine"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-8.webp"
				},
				{
					name: "Eight of Roses",
					arcana: "Minor",
					affiliation: "Roses",
					value: 9,
					keyword: "Love",
					summary: "Love is a bond that can be stronger than death. It can give you strength and purpose, but also drag you down and be your doom.",
					note: "",
					ghostText: {
						individual: [
							"Man with a broken heart"
						],
						location: [
							"Motel next to the highway"
						],
						organization: [
							"Dating agency"
						],
						situation: [
							"Madly in love"
						],
						creature: [
							"Creature of Passion"
						],
						item: [
							"Plain gold ring"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-roses-9.webp"
				}
			],
			skulls: [
				{
					name: "Nine of Roses",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 1,
					keyword: "Metropolis",
					summary: "Metropolis represents mankind's ancestral home, the Eternal City and the very core of the Demiurge's Machinery.",
					note: "",
					ghostText: {
						individual: [
							"Mourning widow"
						],
						location: [
							"The Citadels"
						],
						organization: [
							"Section 11"
						],
						situation: [
							"A feeling of greatness"
						],
						creature: [
							"Servant of now-destroyed Power"
						],
						item: [
							"Painting depicting a great Citadel"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-1.webp"
				},
				{
					name: "Ace of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 2,
					keyword: "Forgetfulness",
					summary: "Forgetfulness represents that which has faded from memory. It is strongly connected to the cycle of rebirth and the Oubliettes of Forgetfulness in Metropolis.",
					note: "",
					ghostText: {
						individual: [
							"Hypnotist"
						],
						location: [
							"Oubliette of Forgetfulness"
						],
						organization: [
							"Online forum that discusses reincarnation"
						],
						situation: [
							"Traumatic event"
						],
						creature: [
							"Lives on stolen memories"
						],
						item: [
							"Notebook"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-2.webp"
				},
				{
					name: "Two of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 3,
					keyword: "Remnants",
					summary: "Remnants represents that which has been left behind after death, destruction, or transition.",
					note: "",
					ghostText: {
						individual: [
							"Pragmatic archaeologist"
						],
						location: [
							"Ruins from ancient times"
						],
						organization: [
							"Legal firm handling inheritances"
						],
						situation: [
							"Family secrets"
						],
						creature: [
							"Fallen Angels"
						],
						item: [
							"Last page in a book"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-3.webp"
				},
				{
					name: "Three of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 4,
					keyword: "Spirit",
					summary: "Spirit represents the psyche, the immaterial essence and the machinery that chains the divine soul.",
					note: "",
					ghostText: {
						individual: [
							"a sophisticated medium with wealthy clientele"
						],
						location: [
							"the still, cold sea reflecting a crescent moon"
						],
						organization: [
							"Online show that investigates paranormal phenomena"
						],
						situation: [
							"Legend of a person that is whispered in the projects"
						],
						creature: [
							"Wraiths and Phantoms"
						],
						item: [
							"Deck of stained tarot cards"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-4.webp"
				},
				{
					name: "Four of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 5,
					keyword: "Transition",
					summary: "Transition represents the crossing from life to death or into another form of existence.",
					note: "",
					ghostText: {
						individual: [
							"Seductive death magician"
						],
						location: [
							"Abortion clinic"
						],
						organization: [
							"Death squad"
						],
						situation: [
							"Mother dying in childbirth"
						],
						creature: [
							"Borderliner"
						],
						item: [
							"Homemade biological weapon"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-5.webp"
				},
				{
					name: "Five of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 6,
					keyword: "Flesh",
					summary: "Flesh represents the body as a shell after death or as a prison of a soul that should have been released.",
					note: "",
					ghostText: {
						individual: [
							"a morbid dentist who takes trophies from his patients"
						],
						location: [
							"Morgue in stainless steel where the antiseptic smell barely can douse out the stench of rot"
						],
						organization: [
							"Society of death magicians"
						],
						situation: [
							"Severe case of leprosy"
						],
						creature: [
							"Damned legionnaires"
						],
						item: [
							"Deformed body that is stitched and melted together"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-6.webp"
				},
				{
					name: "Six of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 7,
					keyword: "Weapon",
					summary: "Weapon represents the tool that brings death. That which brings forth a transition through violence.",
					note: "",
					ghostText: {
						individual: [
							"Vigilante in the suburbs armed with silenced pistol"
						],
						location: [
							"Room with an electric chair"
						],
						organization: [
							"Arms dealers"
						],
						situation: [
							"Lynch mob armed with machetes and rifles"
						],
						creature: [
							"Creature that feeds on violence and suffering"
						],
						item: [
							"Sharp blade"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-7.webp"
				},
				{
					name: "Seven of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 8,
					keyword: "Suffering",
					summary: "Suffering represents the pain that comes with death and the cleansing of the soul. It is strongly connected to the cycle of rebirth and the Oubliettes of Suffering in Inferno.",
					note: "",
					ghostText: {
						individual: [
							"Self mutilating prophet"
						],
						location: [
							"Purgatory that creates a bridge between Elysium and Inferno"
						],
						organization: [
							"Secret anti-terrorist organization"
						],
						situation: [
							"Painful bone cancer"
						],
						creature: [
							"Purgatides"
						],
						item: [
							"Crown of thorns made of barbed wire"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-8.webp"
				},
				{
					name: "Eight of Skulls",
					arcana: "Minor",
					affiliation: "Skulls",
					value: 9,
					keyword: "Inferno",
					summary: "Inferno represents the shadow of Metropolis, the many hells and Citadels and the realm from which the will of Astaroth flows.",
					note: "",
					ghostText: {
						individual: [
							"Tattoo artist who binds the clients to Inferno"
						],
						location: [
							"Citadel of Astaroth"
						],
						organization: [
							"Suicide cult seeking escape from the world"
						],
						situation: [
							"Child drenched in oil and blood is placed on the steps of a monastery"
						],
						creature: [
							"Nepharite"
						],
						item: [
							"Old key that can open gates between world"
						]
					},
					isDrawingShiftCard: false,
					imgfile: "minor-skulls-9.webp"
				}
			]
		}
	},
	TEMPLATEDATA: {
		character: {
			1: "This defines the core, essential essence of this individual.",
			2: "Here is something from the past that shaped this individual.",
			3: "This is what the individual most desires: their motivation.",
			4: "The individual's greatest weakness can be found here.",
			5: "This card describes the individual's greatest strength."
		},
		location: {
			1: "This defines the general nature of this location.",
			2: "Here is something significant from the location's past.",
			3: "This card describes something unexpected about the location.",
			4: "A weakness of the location, one that could be exploited, can be found here.",
			5: "This is something that makes the location exceptional."
		},
		cult: {
			1: "This defines the power or ambition that drives the cult's activities.",
			2: "Here is something important about the cult's history.",
			3: "This card describes something important the cult wishes to accomplish.",
			4: "The cult's greatest weakness can be found here.",
			5: "This is an unexpected advantage or resource the cult has."
		},
		plot: {
			1: "This defines who (or what) is pulling the strings of this plot.",
			2: "This card describes the principle motivation behind the plot.",
			3: "The next move in this plot can be found here.",
			4: "This card tells us of someone or something that opposes the plot.",
			5: "This card reveals someone or something that supports the plot."
		},
		creature: {
			1: "This defines the legend, backstory or cultural influence from which this creature originates.",
			2: "This card tells us how one might learn more about this creature.",
			3: "This is what drives the creature.",
			4: "The creature's greatest weakness can be found here.",
			5: "This card describes the creature's greatest strength."
		},
		artifact: {
			1: "This defines how the artifact came to be.",
			2: "Here is someone or something else that seeks this artifact.",
			3: "Revealed here are the dangers of using this artifact.",
			4: "The artifact's most significant power is described here.",
			5: "This card tells us of another power the artifact has."
		}
	}
};
C.slotPos = {
	get 1() {
		return {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		};
	},
	get 2() {
		return {
			x: this[1].x - (C.spacing.x + C.card.width),
			y: this[1].y
		};
	},
	get 3() {
		return {
			x: this[1].x,
			y: this[1].y - (C.spacing.y + C.card.height)
		};
	},
	get 4() {
		return {
			x: this[1].x + (C.spacing.x + C.card.width),
			y: this[1].y
		};
	},
	get 5() {
		return {
			x: this[1].x,
			y: this[1].y + (C.spacing.y + C.card.height)
		};
	}
};

export default C;