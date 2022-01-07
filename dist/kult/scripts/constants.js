/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

const C = {
	imgPath: "https://raw.githubusercontent.com/Eunomiac/kult/main/assets/images/",
	bgTable: "table-bg.webp",
	bgEmptySlot: "linear-gradient(202deg, rgb(0, 0, 0), rgb(100, 100, 100))",
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
				affiliation: "Divine",
				value: 0,
				keyword: "Awakening to",
				summary: "One of the three most powerful cards in the Kult Tarot, Anthropos represents the glorious potential of humanity's lost divinity against the forces holding us captive. Anthropos is a powerful sign that this reading favours humanity in its struggle against both the Archons and the Death Angels.",
				note: "Because of the unique significance of Anthropos, a second card has been drawn and paired with it to reveal how the power of Anthropos manifests in the context of this reading.",
				ghostText: {
					individual: [
						"an Awakened Man",
						"a single mother feels divinity ignite in her heart",
						"a teenager's visions of past lives reveal Awakened truths",
						"an enemy is revealed to have been a friend all along",
						"a spiritual athiest who doesn't know how right he is",
						"a Sleeper opening their eyes for the first time",
						"the author of a self-help book that really works",
						"a mole who has the trust of a Lichtor"
					],
					location: [
						"a Tomb of the Unknown Soldier",
						"a cozy second-hand book store",
						"an Amish community",
						"a remote survivalist camp"
					],
					organization: [
						"a cult that worships humanity's lost divinity",
						"base jumpers who've never lost a member",
						"neoshamans offering ayahuasca vision quests",
						"a strict meditation retreat"
					],
					situation: [
						"a milestone on the Path to Awakening",
						"Sleepers confront their divine captors head on",
						"a divine plan fails catastrophically"
					],
					creature: [
						"a monster demonstrates unexpected humanity",
						"the ghost of a lost ally returns to offer aid",
						"an agent of the divine turns traitor"
					],
					item: [
						"a lie detector that works, but not on humans",
						"an empty mirror frame",
						"the smoking gun an Archon thought was well-hidden"
					]
				},
				isDrawingShiftCard: true,
				imgfile: "major-0.webp"
			},
			{
				name: "DEMIURGOS",
				affiliation: "Divine",
				value: 1,
				keyword: "Imprisoned by",
				summary: "One of the three most powerful cards in the Kult Tarot, Demiurgos represents the Demiurge: The original architect of Mankind's prison, the ruler who is now lost. Demiurgos is a powerful sign that this reading favours the Archons and their machinations.",
				note: "Because of the unique significance of Demiurgos, a second card has been drawn and paired with it to reveal how the power of Demiurgos manifests in the context of this reading.",
				ghostText: {
					individual: [
						"the mastermind of a vast conspiracy",
						"a villain who has been watching closely",
						"an Archon taking a personal interest"
					],
					location: [
						"the Demiurge's vanished Citadel",
						"Metropolis",
						"the Endless City",
						"the Citadel of an Archon",
						"a secret path",
						"a dark vault",
						"the temple of a strict faith",
						"a dark street"
					],
					organization: [
						"a dead civilization",
						"grateful survivors",
						"a cult whose indoctrinations always succeed",
						"a neurolink start-up with the tech to rewrite memory"
					],
					situation: [
						"a connection to the lost Demiurge Itself",
						"stillness and death",
						"hidden secrets",
						"someone is watching"
					],
					creature: [
						"beasts of Metropolis",
						"a great Power that is sleeping",
						"an enslaved god"
					],
					item: [
						"Machinery of Death and Rebirth",
						"a scrawled map to a lost city",
						"an artifact of Metropolis",
						"a padlock covered in blood"
					]
				},
				isDrawingShiftCard: true,
				imgfile: "major-1.webp"
			},
			{
				name: "ASTAROTH",
				affiliation: "Divine",
				value: 2,
				keyword: "Hellish",
				summary: "One of the three most powerful cards in the Kult Tarot, Astaroth is the Ruler of Inferno and Shadow of the Demiurge, who seeks to subvert Elysium away from the Powers of Metropolis. Astaroth is a powerful sign that this reading favours the Death Angels and their machinations.",
				note: "Because of the unique significance of Astaroth, a second card has been drawn and paired with it to reveal how the power of Astaroth manifests in the context of this reading.",
				ghostText: {
					individual: [
						"a kid with an Illusion-shattering viral video",
						"an epileptic who shouts Truths during his seizures",
						"a philanthropist whose gifts are corrupting"
					],
					location: [
						"Inferno",
						"the Citadel of a Death Angel",
						"a gateway to a shattered world"
					],
					organization: [
						"free wills behind the Veil",
						"a nomadic cult of ritual killers",
						"a sadistic, aggressive corporation",
						"horribly mistreated employees"
					],
					situation: [
						"a direct connection to Astaroth",
						"the will of Inferno made manifest",
						"a solar eclipse",
						"entwined wills, master and slave",
						"unimaginable suffering",
						"horrible beauty",
						"a growing power",
						"spreading cracks in the Illusion"
					],
					creature: [
						"that which comes from death",
						"a pulsating, growing thing",
						"an Infernal infestation"
					],
					item: [
						"Machinery of Death and Rebirth",
						"the Spiked Wheel",
						"one last message from a destroyed world"
					]
				},
				isDrawingShiftCard: true,
				imgfile: "major-2.webp"
			},
			{
				name: "Kether",
				affiliation: "Archon",
				value: 3,
				keyword: "the Archon of Hierarchy",
				summary: "Kether's influence manifests as hierarchical structures with masters and servants, widening class gaps, and an aristocracy with power and benefits.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["masters and servants, widening class gaps, and an aristocracy with power and benefits. Its influence is greatest in structures with a strong leader at their helm, including royal families, the leaders of the Catholic Church, corporate executives, and authoritarian countries such as China and North Korea."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-3.webp"
			},
			{
				name: "Chokmah",
				affiliation: "Archon",
				value: 4,
				keyword: "the Archon of Submission",
				summary: "Chokmah's influence manifests as the submission to religious leaders, martyrdom, fanaticism, theocratic rule, and dogmatism. It exists virtually everywhere religion can be found.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["submission to religious leaders, martyrdom, fanaticism, theocratic rule, and dogmatism Chokmah's servants have a strong influence in the Middle East and many imams and rabbis are lictors. The Archon also has significant influence over the Catholic Church."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-4.webp"
			},
			{
				name: "Binah",
				affiliation: "Archon",
				value: 5,
				keyword: "the Archon of Community",
				summary: "Binah's influence manifests as the family's power over the individual, mistrust of the state and other authorities outside of the family, strengthened traditions, and the distrust of strangers.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["family's power over the individual, mistrust of the state and other authorities outside of the family, strengthened traditions, and the distrust of strangers Her grip is strong anywhere family ties are at their peak, including the Middle East, Africa, Eastern Europe, Latin America, China, and the southern United States. Her influence is once again growing in Russia. Among the Roma, Binah is a goddess who is worshipped and revered."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-5.webp"
			},
			{
				name: "Chesed",
				affiliation: "Archon",
				value: 6,
				keyword: "the Archon of Safety",
				summary: "Chesed's influence manifests as people's longing for safety, the desire to feel comfortable and safe from dangers threatening you, encouraging friendly behavior, and the sense that you are protected against the unknown and dangerous.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["people's longing for safety, the desire to feel comfortable and safe from dangers threatening you, encouraging friendly behavior, and the sense that you are protected against the unknown and dangerous Once, Chesed's servants were to be found amid generous noblemen, monasteries, wise women of the forest, doctors who did anything to find cures for diseases, aid organizations, benevolent charities, and warm-hearted people. Now, his power has faded."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-6.webp"
			},
			{
				name: "Geburah",
				affiliation: "Archon",
				value: 7,
				keyword: "the Archon of Law",
				summary: "Geburah's influence generates bureaucratic institutions, stricter laws, increased policing, and societal control over its citizenry. Those so influenced yield to increased control, typically out of their fear of chaos.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["bureaucratic institutions, stricter laws, increased policing, and societal control over its citizenry. Those so influenced yield to increased control, typically out of their fear of chaos. The Archon has a strong influence over legal systems of every kind. Lictors are often judges, chiefs of police, or lawyers. They have a great presence anywhere bureaucracy is strong, and where laws and rules are used to control people."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-7.webp"
			},
			{
				name: "Tiphareth",
				affiliation: "Archon",
				value: 8,
				keyword: "the Archon of Allure",
				summary: "Tiphareth's influence incites a manic craving for beauty and affirmation, which must be fulfilled by any means necessary. Celebrities are worshipped as prophets, the mediocre waste their days imbibing the internet and television shows, and despise and ignore anyone who doesn't meet the social 'norms.'",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["a manic craving for beauty and affirmation, which must be fulfilled by any means necessary. Celebrities are worshipped as prophets, the mediocre waste their days imbibing the internet and television shows, and despise and ignore anyone who doesn't meet the social 'norms.' Her influence is great everywhere in society, but especially via the media, advertising, and the Internet."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-8.webp"
			},
			{
				name: "Netzach",
				affiliation: "Archon",
				value: 9,
				keyword: "the Archon of Victory",
				summary: "Netzach's influence strengthens patriotism and nationalism, unites societies against a common enemy, and feeds the us-versus-them mentality. The righteous obliterate all that threaten them, strengthen their military, justify their violence in the name of the Greater Good, and incite people to arm themselves.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["patriotism and nationalism, unites societies against a common enemy, and feeds the us-versus-them mentality. The righteous obliterate all that threaten them, strengthen their military, justify their violence in the name of the Greater Good, and incite people to arm themselves. His influence is strongest within the military, military academies, private armies, manufacturers of weapons, lobbyists, and mercenaries. Has his largest influence in North America."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-9.webp"
			},
			{
				name: "Hod",
				affiliation: "Archon",
				value: 10,
				keyword: "the Archon of Honor",
				summary: "Hod's influence conflates honor with prestige, elevates one's status among others above all else, and sets the law aside in favor of personal vendettas. Expecting admiration for their adherence to their inflexible values, the honor-bound ruthlessly ostracize any who have brought shame upon themselves by failing to uphold their honor and fulfil the many duties it demands.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["conflates honor with prestige, elevates one's status among others above all else, and sets the law aside in favor of personal vendettas. Expecting admiration for their adherence to their inflexible values, the honor-bound ruthlessly ostracize any who have brought shame upon themselves by failing to uphold their honor and fulfil the many duties it demands. The Principle is strongest in areas and communities where the honor culture still is very dominant, including the Middle East and countries in Asia, such as India, Pakistan, and Japan. In large parts of North Africa, Hod's servants and ideology are also still strong, even though these traditions have started to be questioned."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-10.webp"
			},
			{
				name: "Yesod",
				affiliation: "Archon",
				value: 11,
				keyword: "the Archon of Avarice",
				summary: "Yesod influences society through greed, capitalism, economics, consumer frenzy, and increased corporate power, as well as by promoting the admiration and respect of wealth as a sign of personal intelligence and ambition. It encourages contempt for the poverty-stricken, who are associated with laziness and stupidity, and supports the dismantling of social welfare institutions.",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["greed, capitalism, economics, consumer frenzy, and increased corporate power, as well as by promoting the admiration and respect of wealth as a sign of personal intelligence and ambition. It encourages contempt for the poverty-stricken, who are associated with laziness and stupidity, and supports the dismantling of social welfare institutions. The Archon has control over large parts of the Western world and nowadays also China."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-11.webp"
			},
			{
				name: "Malkuth",
				affiliation: "Archon",
				value: 12,
				keyword: "the Archon of Awakening",
				summary: "Malkuth's influence strives to free people from their prison by shattering the Illusion to reveal other dimensions, and inspiring people to question the nature of society and the fabric of reality. She inspires magicians and scientists to experiment with the unknown and search for their lost divinity. (Previously, Malkuth represented Conformity and the natural cycles we tend to see in our world and our prison.)",
				note: "The card shows a connection or opposition to the Archon and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["free people from their prison by shattering the Illusion to reveal other dimensions, and inspiring people to question the nature of society and the fabric of reality. She inspires magicians and scientists to experiment with the unknown and search for their lost divinity. (Previously, Malkuth represented Conformity and the natural cycles we tend to see in our world and our prison.) Malkuth has her strongest influence among magicians and scientists. Europe is her primary stronghold, as well as regions of North America and Asia. During the Islamic Enlightenment, she had followers throughout the Middle East and North Africa."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-12.webp"
			},
			{
				name: "Thaumiel",
				affiliation: "Death Angel",
				value: 13,
				keyword: "the Death Angel of Power",
				summary: "Thaumiel's influence manifests as a hunger for power, corruption, dictatorship, fascism, intrigue, insurrection, oppression, ruthlessness and totalitarian rule – a breakdown of solidarity and trust.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["hunger for power, corruption, dictatorship, fascism, intrigue, insurrection, oppression, ruthlessness and totalitarian rule – a breakdown of solidarity and trust. Thaumiel's Principle is strongest where there are hierarchies and power structures with clear rifts. Governments undergoing political upheaval, the entertainment business, the world of sports, organized crime, neo-nazi organizations, Wall Street and other stock exchanges, major corporations, and so on down to street gangs and school classes."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-13.webp"
			},
			{
				name: "Chagidiel",
				affiliation: "Death Angel",
				value: 14,
				keyword: "the Death Angel of Abuse",
				summary: "Chagidiel's influence takes shape in the violation of children, the perversion of adult love and care, forgotten and lost children, homeless street kids, and the degradation and ruination of school systems.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["the violation of children, the perversion of adult love and care, forgotten and lost children, homeless street kids, and the degradation and ruination of school systems. The Death Angel's strongest influence is over nuclear families, but he is also active within pedophile networks, orphanages, youth centers, trafficking rings, illegal porn sites, and various cults and religious organizations all over the world."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-14.webp"
			},
			{
				name: "Sathariel",
				affiliation: "Death Angel",
				value: 15,
				keyword: "the Death Angel of Exclusion",
				summary: "Satahariel's influence incites self-loathing, loneliness, hopelessness, contempt for 'normals,' self-destruction, anxiety, depression, suicide, school shootings and massacres, and communities of outsiders inspiring each other to commit destructive actions.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: [", contempt for 'normals,' self-destruction, anxiety, depression, suicide, school shootings and massacres, and communities of outsiders inspiring each other to commit destructive actions. Sathariel's corruptive will seeks out those who feel rejected and those who feel their lives are devoid of meaning. These can be found everywhere."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-15.webp"
			},
			{
				name: "Gamichicoth",
				affiliation: "Death Angel",
				value: 16,
				keyword: "the Death Angel of Fear",
				summary: "Gamichicoth's influence awakens fear of 'the Other' by escalating distrust and blaming various ethnic groups, religions, or political dissidents for society's problems. False narratives are created and distributed through news media, rumors, and manipulated visual evidence, while heralds whisper how all our concerns would dissipate if only 'the Others' were punished or disappeared.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["False narratives are created and distributed through news media, rumors, and manipulated visual evidence, while heralds whisper how all our concerns would dissipate if only 'the Others' were punished or disappeared. The Death Angels influence is strongest within the middle class and in regions with conservative values. The Ku Klux Klan, fanatic pro-lifers, concerned parents' groups, paramilitary forces committing genocide, neo-fascists of all types, and patriarchal structures who fear liberal values will corrupt young people are all at risk of falling under this Death Angel's influence."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-16.webp"
			},
			{
				name: "Golab",
				affiliation: "Death Angel",
				value: 17,
				keyword: "the Death Angel of Torment",
				summary: "Golab's influence increases societal sadism, giving people pleasure from inflicting pain on others or by being subjected to torment themselves. Criminals are tortured in public, people carry out their most sadistic ideas unto both willing and unwilling subjects in obscure safe houses, while murderers leave trails of mutilated bodies.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["Golab's presence is strongest wherever sadistic assaults are committed against humans. He is found in organized crime, the military, terrorist groups, prisons, and psychiatric hospitals.  Criminals are tortured in public, people carry out their most sadistic ideas unto both willing and unwilling subjects in obscure safe houses, while murderers leave trails of mutilated bodies."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-17.webp"
			},
			{
				name: "Togarini",
				affiliation: "Death Angel",
				value: 18,
				keyword: "the Death Angel of Compulsion",
				summary: "Togarini's influence increases the manic creativity that distorts reality, tearing beauty asunder. Insane artwork opens portals to Inferno, magicians experiment at the border of life and death, and death itself acts erratically – souls binding themselves into rotting corpses, or haunting the living as distorted spectres.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["Insane artwork opens portals to Inferno, magicians experiment at the border of life and death, and death itself acts erratically – souls binding themselves into rotting corpses, or haunting the living as distorted spectres. The Death Angel's influence is strongest among artists, magicians, body modifiers, and the senses and imagination enchanted by the dark and grotesque."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-18.webp"
			},
			{
				name: "Hareb-Serap",
				affiliation: "Death Angel",
				value: 19,
				keyword: "the Death Angel of Conflict",
				summary: "Hareb-Serap's influence propagates uncontrollable rage, bloodlust, and senseless violence. Gangs have shootouts in public places, police beat suspects to death, hooligans storm arenas, lynch mobs tear their targets to pieces, harmless conflicts escalate into bloody fist-fights, and 'normal' people teeter on the brink of explosive outbursts at all times.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: ["Gangs have shootouts in public places, police beat suspects to death, hooligans storm arenas, lynch mobs tear their targets to pieces, harmless conflicts escalate into bloody fist-fights, and 'normal' people teeter on the brink of explosive outbursts at all times. The Death Angel's greatest influence is over war zones, gang territories, the Middle East, Africa, and parts of Asia. Many of his servants are soldiers or gang members, but Hareb-Serap's Principle can be stirred in all of us."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-19.webp"
			},
			{
				name: "Samael",
				affiliation: "Death Angel",
				value: 20,
				keyword: "the Death Angel of Vengeance",
				summary: "Samael's influence strengthens paranoia, vindictiveness, and obsession with injustices, while perpetrators take brutal revenge for nonexistent affronts, jealous partners murder their loved ones for imagined betrayals, and terrorists exact gory retribution upon their foes.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: [", while perpetrators take brutal revenge for nonexistent affronts, jealous partners murder their loved ones for imagined betrayals, and terrorists exact gory retribution upon their foes. The Death Angel has a strong influence over individuals with a strong lust for vengeance, but also in organizations with strong codes of honor and a willingness to use violence to get what they want, such as the mafia, gangs, terrorist organizations, and certain cults. Magicians occasionally seek insight into Samael's dark brilliance."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-20.webp"
			},
			{
				name: "Gamaliel",
				affiliation: "Death Angel",
				value: 21,
				keyword: "the Death Angel of Lust",
				summary: "Gamaliel influences society towards hypersexualization and objectification, where crowds commit gang rape, victims are forced into prostitution, pornography becomes increasingly hardcore and perverted, and celebrants gather in clubs and secret societies for macabre orgies, and people embrace mindless desires with no consideration of the consequences of their actions.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: [", where crowds commit gang rape, victims are forced into prostitution, pornography becomes increasingly hardcore and perverted, and celebrants gather in clubs and secret societies for macabre orgies, and people embrace mindless desires with no consideration of the consequences of their actions. The Death Angel has a strong influence over the pornography business, webcam shows, brothels, rapists, and, deep down, virtually everyone to some degree."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
				imgfile: "major-21.webp"
			},
			{
				name: "Nahemoth",
				affiliation: "Death Angel",
				value: 22,
				keyword: "the Death Angel of Discord",
				summary: "Nahemoth's influence deforms the natural world, turning it dangerous and threatening, expressed as forest fires, oil spills, poisoned streams and groundwater, misshapen animal life, violent storms, cold snaps, heat waves, torrential rains, earthquakes, tsunamis, cannibal tribes, disfigured fetuses, and baleful eclipses. She turns the world upside down, instilling fear by destroying conformity and normalcy.",
				note: "The card shows a connection or opposition to the Death Angel and/or its Principle. The bond might be in the present, the past, or something that is about to happen.",
				ghostText: {
					process: [", expressed as forest fires, oil spills, poisoned streams and groundwater, misshapen animal life, violent storms, cold snaps, heat waves, torrential rains, earthquakes, tsunamis, cannibal tribes, disfigured fetuses, and baleful eclipses. Her influence is strongest in regions where people fear and venerate nature, as well as places with chemical spills, radioactive zones, open sewers, strip mines, industrial zones, and rubbish dumps."],
					individual: [],
					location: [],
					organization: [],
					situation: [],
					creature: [],
					item: []
				},
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
				null,
				{
					name: "Ace of Crescents",
					suit: "Crescents",
					value: 1,
					keyword: "Vortex",
					summary: "The very source of creation, dreams, and the ever transforming chaos that has its source deep in Limbo.",
					ghostText: {
						individual: [
							"a world-changing visionary",
							"a dangerous demagogue",
							"a Dream Magician"
						],
						location: [
							"the Vortex",
							"the Dream World",
							"am I dreaming?"
						],
						organization: [
							"a secret order of magicians",
							"a sleep study clinic",
							"psychedelic deep-mind explorers"
						],
						situation: [
							"world-changing",
							"chaotic",
							"a natural disaster",
							"a tornado",
							"the Maelstrom",
							"a life turned upside down"
						],
						creature: [
							"a Dream Prince",
							"a nightmare given flesh",
							"a demon from within",
							"a Dream Magician"
						],
						item: [
							"unexpected features",
							"it does the opposite",
							"an unlikely dream achieved"
						]
					},
					imgfile: "minor-crescents-1.webp"
				},
				{
					name: "Two of Crescents",
					suit: "Crescents",
					value: 2,
					keyword: "Creation",
					summary: "Creation is the raw godly power to shape the world and to turn thought and dream into something inspiring.",
					ghostText: {
						individual: [
							"an inspired photographer",
							"a renowned architect",
							"a victim of medical experiments",
							"a mad scientist",
							"a mute child with crayons",
							"a self-destructive black metal musician",
							"a rabid movie director",
							"an isolated graphic artist",
							"a poet with a straight razor",
							"an anorexic dancer"
						],
						location: [
							"a skyscraper",
							"strange acoustics",
							"an art museum",
							"an ever-changing dream",
							"an old theater"
						],
						organization: [
							"a classic art foundation",
							"a bohemian artist collective",
							"a gang with graffiti artists",
							"a struggling record company"
						],
						situation: [
							"a melody only some can hear",
							"he actually did it",
							"a controvertial art exhibit",
							"a disturbing shift in the Zeitgeist"
						],
						creature: [
							"an artificial creation given life",
							"denizens of Limbo who need beauty to live",
							"a dream that kills"
						],
						item: [
							"a drawing board",
							"a painting by one of the Great Masters",
							"a cursed music instrument",
							"a dripping paintbrush",
							"an old, blurry photograph",
							"a portable typewriter"
						]
					},
					imgfile: "minor-crescents-2.webp"
				},
				{
					name: "Three of Crescents",
					suit: "Crescents",
					value: 3,
					keyword: "Undoing",
					summary: "Undoing is part of the natural cycle of collapse and obliteration of ideas, structures, bodies, dreams, and whole worlds.",
					ghostText: {
						individual: [
							"a cold-hearted hitman",
							"a war criminal in hiding",
							"a lawyer who raids companies",
							"a terror bomber",
							"a censorship zealot"
						],
						location: [
							"a derelict building",
							"a waste plant",
							"a car crusher",
							"a concentration camp",
							"a hospice for the dying",
							"an abortion clinic"
						],
						organization: [
							"a demolitions company",
							"a doomsday sect",
							"a suicide cult",
							"a gang of thrill-killers"
						],
						situation: [
							"a murder-suicide pact",
							"a cover-up",
							"deleted information",
							"a faked death",
							"a Wall Street crash",
							"an earthquake",
							"a raging fire",
							"a life falls apart",
							"burned paper records",
							"a sudden explosion"
						],
						creature: [
							"Cairath",
							"insatiable lust for destruction",
							"subtle, insidious madness",
							"a thing that consumes"
						],
						item: [
							"bomber aircraft",
							"an incinerator",
							"a flamethrower",
							"a vat filled with acid",
							"a sledgehammer",
							"a computer virus",
							"a handgun used in war"
						]
					},
					imgfile: "minor-crescents-3.webp"
				},
				{
					name: "Four of Crescents",
					suit: "Crescents",
					value: 4,
					keyword: "Transformation",
					summary: "Transformation is a state of extreme change and metamorphosis.",
					ghostText: {
						individual: [
							"a reckless plastic surgeon",
							"a method actor",
							"a makeup artist",
							"a megalomaniacal city planner",
							"an extreme body modder"
						],
						location: [
							"a landscape architect firm",
							"a well-secured biolab",
							"a discreet clinic",
							"a Christian conversion center"
						],
						organization: [
							"a grass-roots political movement",
							"competitive body modders",
							"militant transhumanists"
						],
						situation: [
							"a change of heart",
							"breaking a bad habit",
							"a terminal illness",
							"a sex change operation",
							"a strange government program",
							"removing someone's face",
							"a total makeover",
							"assuming a false identity",
							"a lie that changes everything"
						],
						creature: [
							"a shapeshifter",
							"unexpected to the extreme",
							"unwillingly transformed"
						],
						item: [
							"a makeup kit",
							"an unnatural cocoon",
							"a toolbox with something missing",
							"highly-reactive chemicals",
							"a carnival mask"
						]
					},
					imgfile: "minor-crescents-4.webp"
				},
				{
					name: "Five of Crescents",
					suit: "Crescents",
					value: 5,
					keyword: "Connection",
					summary: "Connection of intertwined structures, wills, or something that might hinder you or help you on your way.",
					ghostText: {
						individual: [
							"a greedy fixer",
							"a silver-tongued lobbyist",
							"an irritated network technician",
							"a <i>femme fatale</i> with a harem of lovers",
							"a familiar street contact",
							"a nosey electrician",
							"a charismatic club owner",
							"a sect leader"
						],
						location: [
							"a group of islands",
							"a small village",
							"caves",
							"crossroads",
							"railway tracks",
							"a high razor-wire fence",
							"a river delta"
						],
						organization: [
							"a hacker group",
							"a network of terror cells",
							"a gentleman's club",
							"a drug cartel",
							"a fast food chain",
							"a law firm"
						],
						situation: [
							"a conspiracy",
							"trapped and caught",
							"bound",
							"expanding"
						],
						creature: [
							"a Tekron",
							"a puppet-master",
							"an ant infestation",
							"birds communicating in birdsong",
							"a bat whose echolocation is audible",
							"a telepathic hive mind"
						],
						item: [
							"a server network",
							"a fishing net",
							"a spiderweb",
							"handcuffs",
							"a GPS tracker",
							"sparking power lines",
							"a brain in a jar"
						]
					},
					imgfile: "minor-crescents-5.webp"
				},
				{
					name: "Six of Crescents",
					suit: "Crescents",
					value: 6,
					keyword: "Merging",
					summary: "Merging of ideas, bodies, and minds. Two things become one.",
					ghostText: {
						individual: [
							"a good-hearted priest",
							"conjoined twins",
							"the manager of a corporiate acquisitions branch",
							"a charismatic cult leader",
							"a married couple acting in unison"
						],
						location: [
							"where two rivers meet",
							"two cities that have merged into one",
							"sewer tunnels during a storm",
							"impossibly dense foliage"
						],
						organization: [
							"a global corporation",
							"a secret umbrella company",
							"diverse minds combining their genius",
							"polygamy activists",
							"a recently-gentrified neighborhood",
							"a money-laundering operation"
						],
						situation: [
							"an act of love",
							"sworn into a secret cult",
							"merging into the background",
							"the assimilation of minorities",
							"myth and reality become one",
							"two ideologies become one",
							"two people revealed to be a single person"
						],
						creature: [
							"a Cairath",
							"a being of passion",
							"a telepathic hive mind",
							"a massive insect colony"
						],
						item: [
							"two plastic items melted together",
							"a cross with a concealed blade",
							"a vial of blood from many people"
						]
					},
					imgfile: "minor-crescents-6.webp"
				},
				{
					name: "Seven of Crescents",
					suit: "Crescents",
					value: 7,
					keyword: "Reflection",
					summary: "Reflections can reveal the truth, be deceptive or may mirror a person or a place.",
					ghostText: {
						individual: [
							"an identical twin",
							"a deceptive medium",
							"an amature filmmaker",
							"a hard-working mime",
							"a burned-out performance artist",
							"an honest singer-songwriter",
							"a well-meaning cognitive-behavior therapist"
						],
						location: [
							"a still pond",
							"a raucus carnival",
							"a hall of mirrors",
							"rain-slicked streets",
							"a desolate graveyard"
						],
						organization: [
							"a Malkuth cult",
							"a philosophical society",
							"the Innocence Project",
							"a police forensics unit"
						],
						situation: [
							"a mirage",
							"a hallucination",
							"insight into the truth",
							"an echo from the past",
							"double identity"
						],
						creature: [
							"a Doppelgänger",
							"mesmerizing gaze"
						],
						item: [
							"a shopping window",
							"a priceless mirror",
							"a faded picture",
							"a crystal ball",
							"an old kaleidoscope",
							"a rorschach test"
						]
					},
					imgfile: "minor-crescents-7.webp"
				},
				{
					name: "Eight of Crescents",
					suit: "Crescents",
					value: 8,
					keyword: "Repetition",
					summary: "Repetition can be an endless loop, a recurring theme, Déjà vu, or something you can't escape.",
					ghostText: {
						individual: [
							"a postman who reads the mail",
							"a jaded phone sex operator",
							"a lecturer anxious to retire",
							"a TV-addicted shut-in",
							"a night-shift janitor",
							"a suicidal toll booth operator",
							"a comedian with only one great joke",
							"a habitual sleepwalker"
						],
						location: [
							"a marriage chapel",
							"a hair and nail salon",
							"a government office",
							"a cheap night club with the same act each night",
							"an amusement park whose rides never change",
							"a maze where everything looks the same"
						],
						organization: [
							"a conservative think tank",
							"a pharmaceutical company pushing antidepressants",
							"the cast of a theatre production",
							"a tech company releasing version eleven"
						],
						situation: [
							"a cover band playing the same songs",
							"living on old glories",
							"always telling the same story",
							"déjà vu",
							"repeating a failed medical procedure"
						],
						creature: [
							"an Acrotide",
							"a Tekron",
							"a nearly-mindless spectre"
						],
						item: [
							"a hamster wheel",
							"a rejected screenplay",
							"a broken record player",
							"a favorite novel"
						]
					},
					imgfile: "minor-crescents-8.webp"
				},
				{
					name: "Nine of Crescents",
					suit: "Crescents",
					value: 9,
					keyword: "Stillness",
					summary: "Stillness represents apathy, tranquility and a situation that seems to be unchanging.",
					ghostText: {
						individual: [
							"a calm and soothing guru",
							"a chain-smoking housewife who has given up",
							"an old hippie who speaks in riddles",
							"a homeless man at the same spot every day"
						],
						location: [
							"a small town frozen in time",
							"suburban houses along a cul-de-sac",
							"a Japanese rock garden",
							"a slow river in the countryside",
							"a ghost town",
							"an abandoned drive-in theater"
						],
						organization: [
							"a meditation centre",
							"a research centre mapping human emotions",
							"a foundation for preserving historical landmarks",
							"protesters against a new construction"
						],
						situation: [
							"a calm and quiet day",
							"a school reunion where no one changed",
							"a strict family dinner"
						],
						creature: [
							"a lost god with no memory",
							"a beast long turned to stone",
							"an imprisoned immortal"
						],
						item: [
							"sleeping pills",
							"a CD of calm, harmonic music",
							"a painting of a desert landscape",
							"a self-help book about controlling aggression",
							"a panpipe"
						]
					},
					imgfile: "minor-crescents-9.webp"
				}
			],
			eyes: [
				null,
				{
					name: "Ace of Eyes",
					suit: "Eyes",
					value: 1,
					keyword: "Elysium",
					summary: "Elysium is the very core of the Illusion and the intricate machinery that keeps you in chains.",
					ghostText: {
						individual: [
							"a powerful politician",
							"a leader of the clergy",
							"a top-ranking military officer",
							"the owner of multi-billion dollar company",
							"a highly-credible media personality"
						],
						location: [
							"a nondescript government building",
							"an ornate cathedral",
							"a treasured historical monument",
							"occupied land",
							"holy ground"
						],
						organization: [
							"a cult within the Army",
							"the sleeping masses",
							"a secret society among top politicians"
						],
						situation: [
							"oppressive cultural values",
							"a family gathering",
							"a national holiday",
							"stifling social traditions"
						],
						creature: [
							"a Lictor",
							"the invisible Principles",
							"a guardians of the Illusion"
						],
						item: [
							"a book of laws",
							"political propaganda",
							"the flag of the nation",
							"a blindfold",
							"an illegal sedative",
							"a PDF of the US Constitution"
						]
					},
					imgfile: "minor-eyes-1.webp"
				},
				{
					name: "Two of Eyes",
					suit: "Eyes",
					value: 2,
					keyword: "Imprisonment",
					summary: "Imprisonment of your body, soul, and mind.",
					ghostText: {
						individual: [
							"a police officer",
							"a prison warden",
							"a school headmaster",
							"an informant",
							"a secret agent",
							"a prison guard",
							"a dedicated attorney",
							"a strict judge"
						],
						location: [
							"a maximum-security prison",
							"a detention cell",
							"a high school",
							"a bank manager's office",
							"a lending office"
						],
						organization: [
							"law enforcement",
							"the local school system",
							"the banking system",
							"the judicial system"
						],
						situation: [
							"bills that need to be paid",
							"mounting debt",
							"an arrest warrant is issued",
							"indoctrination through education",
							"an enemy of the state declared"
						],
						creature: [
							"an eldermensch",
							"a Lictor"
						],
						item: [
							"a set of handcuffs",
							"an old wheelchair",
							"a list of strict rules",
							"a security camera",
							"a surveillance drone",
							"a crumpled school report card"
						]
					},
					imgfile: "minor-eyes-2.webp"
				},
				{
					name: "Three of Eyes",
					suit: "Eyes",
					value: 3,
					keyword: "Faith",
					summary: "Faith that gives you purpose, but makes you blind.",
					ghostText: {
						individual: [
							"a television preacher",
							"a public relations consultant",
							"an enthralled housewife",
							"a diehard atheist",
							"a football supporter",
							"a street preacher"
						],
						location: [
							"a secluded temple",
							"an old church",
							"a sports arena",
							"a grandiose monument"
						],
						organization: [
							"a religious sect",
							"a Marxist group",
							"a terror cell"
						],
						situation: [
							"an occult ceremony",
							"a sporting event",
							"a group prayer",
							"a purging ritual",
							"a charitable donation"
						],
						creature: [
							"an angel of Chokmah"
						],
						item: [
							"a rusty nail from the cross of Jesus",
							"religious garments",
							"a brass pin",
							"a propaganda poster of Vladimir Putin",
							"a first-edition copy of 'On the Origin of Species'"
						]
					},
					imgfile: "minor-eyes-3.webp"
				},
				{
					name: "Four of Eyes",
					suit: "Eyes",
					value: 4,
					keyword: "Distractions",
					summary: "Distractions in everyday life that make you blind to the Truth.",
					ghostText: {
						individual: [
							"an intrusive telephone salesman",
							"the hot teenager next door",
							"a street peddler",
							"a charismatic internet celebrity",
							"a famous actor",
							"the neighborhood gossip"
						],
						location: [
							"a movie theater",
							"a shopping mall",
							"a vacation resort",
							"a strip club"
						],
						organization: [
							"an advertising agency",
							"a fashion boutique",
							"employees of a fast-food restaurant"
						],
						situation: [
							"a social media scandal",
							"endless new television shows",
							"the twenty-four hour news cycle",
							"podcasts",
							"Twitch streaming",
							"commercials",
							"unimportant phone calls",
							"a sudden sound that proves to be nothing",
							"the latest moral panic",
							"a family dinner",
							"a heated political discussion"
						],
						creature: [
							"Mancipium",
							"a creature of passion",
							"it certainly looks human...",
							"a creature of madness",
							"a servant of Tiphareth"
						],
						item: [
							"a cluttered smartphone",
							"a video game",
							"an Internet forum",
							"pornography",
							"a roadside billboard",
							"cheap alcohol",
							"a stay-fit magazine"
						]
					},
					imgfile: "minor-eyes-4.webp"
				},
				{
					name: "Five of Eyes",
					suit: "Eyes",
					value: 5,
					keyword: "Division",
					summary: "Division keeps us occupied with endless struggles.",
					ghostText: {
						individual: [
							"an online agitator",
							"a member of the alt-right",
							"a man-hating feminist",
							"an imam in the Salafi movement",
							"a self-righteous university student",
							"an extreme nationalist",
							"a conservative psychologist",
							"a shunned writer",
							"a Holocaust denier"
						],
						location: [
							"a turbulent social media community",
							"a hostile online forum",
							"Youtube",
							"a basement hideout",
							"a discreet meeting place",
							"a quiet conference room"
						],
						organization: [
							"a minority ethnic group",
							"a right-wing political party",
							"an online hate group",
							"conspiracy theorists"
						],
						situation: [
							"a political rally",
							"ongoing harassment",
							"repeated death threats",
							"an arson",
							"the spread of hate speech",
							"a debate turns violent"
						],
						creature: [
							"a servant of Hareb-Serap",
							"a servant of Gamichicoth"
						],
						item: [
							"a pamphlet of hate propaganda",
							"a racist screed",
							"the SCUM Manifesto",
							"a provocative song on Spotify",
							"an essay about Foucault",
							"a cartoon parody of a religious icon"
						]
					},
					imgfile: "minor-eyes-5.webp"
				},
				{
					name: "Six of Eyes",
					suit: "Eyes",
					value: 6,
					keyword: "Rebellion",
					summary: "Rebellion and struggle against the ruling order.",
					ghostText: {
						individual: [
							"a stubborn loner",
							"a teenager with an attitude",
							"an unrepentant criminal",
							"a charismatic political maverick",
							"a mafia boss",
							"a violent neo-nazi",
							"a gang member",
							"a prolific YouTube critic",
							"a black-hat hacker",
							"an anarchist"
						],
						location: [
							"a house occupied by squatters",
							"an underground club",
							"the trapped home of a survivalist",
							"a secret hideout",
							"a bar well outside of town"
						],
						organization: [
							"a guerrilla force",
							"a punk rock band",
							"an extremist group",
							"an animal rights group"
						],
						situation: [
							"a revolution",
							"a riot",
							"a riotous rock concert",
							"a political rally",
							"a public demonstration"
						],
						creature: [
							"an angel of Malkuth",
							"an Azghoul"
						],
						item: [
							"a pamphlet decrying media propaganda",
							"a spray can",
							"the Communist Manifesto",
							"a threatening letter",
							"steel-tipped boots",
							"an offensive placard"
						]
					},
					imgfile: "minor-eyes-6.webp"
				},
				{
					name: "Seven of Eyes",
					suit: "Eyes",
					value: 7,
					keyword: "Madness",
					summary: "Madness that overwhelms and tears apart, but may also grant insight.",
					ghostText: {
						individual: [
							"a distraught medical patient",
							"a sadistic orderly",
							"a deluded jazz musician",
							"a girl who is kept hidden",
							"a boy without a mouth",
							"a wild-eyed mathematician",
							"a veterinarian who performs cruel experiments"
						],
						location: [
							"an insane asylum",
							"an isolation cell",
							"a decrepit house",
							"an apartment with torn-down wallpaper"
						],
						organization: [
							"fools",
							"a psychological institute",
							"a sect in a trailer park"
						],
						situation: [
							"sudden psychosis",
							"severe depression",
							"the onset of schizophrenia",
							"a panic attack",
							"an encounter with a phobia",
							"reasons for paranoia",
							"unexplained aggression",
							"multiple personalities in conflict",
							"mob mentality assumes control",
							"a mass delusion descends"
						],
						creature: [
							"a creature of madness"
						],
						item: [
							"a half-burned doll",
							"a mental patient's journal",
							"psychoactive pharmaceuticals",
							"a straitjacket",
							"disturbing scribbles on a city map",
							"symbols burned into human skin",
							"notes hidden inside a book about 'female hysteria'",
							"an envelope holding ten bottle caps"
						]
					},
					imgfile: "minor-eyes-7.webp"
				},
				{
					name: "Eight of Eyes",
					suit: "Eyes",
					value: 8,
					keyword: "Visions",
					summary: "Visions that may bring insight, but may also lead you astray.",
					ghostText: {
						individual: [
							"an oracle in the suburbs",
							"a self-proclaimed prophet",
							"an inspired architect",
							"an eccentric video artist",
							"the CEO of a fast-growing IT company",
							"a prescient mental patient"
						],
						location: [
							"an old temple",
							"the carnival",
							"a smoky opium den",
							"an asylum",
							"a techno club",
							"graffiti in a parking garage"
						],
						organization: [
							"dream interpreters"
						],
						situation: [
							"nightmarish visions",
							"a clear insight",
							"a prophecy is revealed",
							"eyes gouged out",
							"rumors that speak of the Truth"
						],
						creature: [
							"a being born of nightmares and visions",
							"an Augur"
						],
						item: [
							"a Super-8 camera",
							"a sheet of LSD tabs",
							"a decorated clay pot",
							"an honest webpage"
						]
					},
					imgfile: "minor-eyes-8.webp"
				},
				{
					name: "Nine of Eyes",
					suit: "Eyes",
					value: 9,
					keyword: "Enlightenment",
					summary: "The road that may lead you towards Enlightenment and Awakening.",
					ghostText: {
						individual: [
							"an amature philosopher",
							"a magician with real power",
							"a savvy technician",
							"a dedicated body modder",
							"a scientist on the verge of a major discovery",
							"a homeless man beneath a bridge",
							"a university student",
							"a broadminded bartender"
						],
						location: [
							"a road to the unknown",
							"a twisted staircase",
							"a high-tech laboratory",
							"a university"
						],
						organization: [
							"a Cult that serves Malkuth",
							"a research institute",
							"an architecture firm"
						],
						situation: [
							"an initiation ritual",
							"a science fair",
							"a sect meeting"
						],
						creature: [
							"a child of the night",
							"an Awakened human",
							"Amentoraz"
						],
						item: [
							"a map of unknown origins",
							"an old floppy disc",
							"a diary of mad scribbles",
							"a long-forgotten blog",
							"a ladder",
							"a flashlight"
						]
					},
					imgfile: "minor-eyes-9.webp"
				}
			],
			hourglasses: [
				null,
				{
					name: "Ace of Hourglasses",
					suit: "Hourglasses",
					value: 1,
					keyword: "Achlys",
					summary: "Achlys represents nothingness, infinity, the void, but also the obliteration of the very soul.",
					ghostText: {
						individual: [
							"a severely-depressed soul",
							"an extremely apathetic individual",
							"a coma patient",
							"a self-destructive misanthrope",
							"a priest who has lost his faith",
							"a prisoner kept in total isolation",
							"a careless deep-sea diver"
						],
						location: [
							"the vacuum of space",
							"a deep well",
							"black, still waters",
							"a sensory deprivation tank",
							"a bottomless mire",
							"the depths of the ocean",
							"an isolation cell with black walls"
						],
						organization: [
							"a cult that worships She Who Waits Below"
						],
						situation: [
							"the total destruction of what makes a person",
							"dissolved into atoms",
							"a maelstrom that drags you down into the deep"
						],
						creature: [
							"children of the Underworld",
							"a phantom"
						],
						item: [
							"a sensory deprivation tank",
							"an inkwell filled with black ink",
							"a syringe for a lethal injection",
							"the number π burned into leather",
							"a suicide note"
						]
					},
					imgfile: "minor-hourglasses-1.webp"
				},
				{
					name: "Two of Hourglasses",
					suit: "Hourglasses",
					value: 2,
					keyword: "Future",
					summary: "Future revolves around things yet to come as well as potential that has yet not been unleashed.",
					ghostText: {
						individual: [
							"a suburban fortune teller",
							"a professor in predictive analytics",
							"a reckless gambler",
							"an infant whose parents are unknown",
							"a stock broker",
							"a young up-and-comer",
							"a tireless gardener",
							"a sportsman aiming for the elite league",
							"an aspiring politician",
							"a tech genius"
						],
						location: [
							"an orphanage",
							"a highway under construction",
							"a construction site"
						],
						organization: [
							"futures analysts",
							"an investment company",
							"a technical university"
						],
						situation: [
							"a prediction",
							"complicated plots",
							"a Tarot reading",
							"a fundraising event",
							"an online crowdfunder"
						],
						creature: [
							"a being from the future",
							"the Eyeless One"
						],
						item: [
							"an old pocket watch",
							"a diary filled with predictions",
							"a seed that has yet to be planted",
							"a blueprint of a skyscraper",
							"a biological weapon"
						]
					},
					imgfile: "minor-hourglasses-2.webp"
				},
				{
					name: "Three of Hourglasses",
					suit: "Hourglasses",
					value: 3,
					keyword: "Past",
					summary: "Past revolves around things that have already occurred and now come back, or could be discovered, if you look in the right place.",
					ghostText: {
						individual: [
							"a nostalgic old-timer",
							"a bitter antiques dealer",
							"an archaeologist who can't stop talking",
							"a hobby historian",
							"a dedicated chronicler",
							"a member of a retro subculture"
						],
						location: [
							"a forgotten museum",
							"ruins deep in the wilderness",
							"an overgrown graveyard",
							"dusty archives",
							"an old battlefield",
							"a university library",
							"a family homestead"
						],
						organization: [
							"a center for genealogy studies",
							"an archaeological society",
							"an online vintage subculture group"
						],
						situation: [
							"an archaeological dig",
							"an interrogation"
						],
						creature: [
							"a being from a time long passed",
							"an ancient creature from the Underworld",
							"a forgotten god"
						],
						item: [
							"a book of a family's history",
							"a chalice from the Middle Ages",
							"a photo of people long dead",
							"a folded birth certificate"
						]
					},
					imgfile: "minor-hourglasses-3.webp"
				},
				{
					name: "Four of Hourglasses",
					suit: "Hourglasses",
					value: 4,
					keyword: "Space",
					summary: "Space represents someone or something that travels forward through space towards a goal or is always in motion.",
					ghostText: {
						individual: [
							"a hard-working truck driver",
							"a philosophical backpacker",
							"a cheating airline pilot",
							"a restless lover",
							"a tattered drifter",
							"a psychopathic hitchhiker",
							"a trustworthy taxi driver",
							"a marathon runner with many secrets",
							"an escaped convict",
							"a child that has run away from home"
						],
						location: [
							"an endless highway",
							"railroad tracks",
							"a slowly-flowing river",
							"a freight elevator"
						],
						organization: [
							"a moving company",
							"a shipping company",
							"a human trafficking syndicate"
						],
						situation: [
							"a boat trip",
							"a train ride",
							"a hunt",
							"a speeding car",
							"the transfer of information",
							"humming power lines"
						],
						creature: [
							"the crazed dancers",
							"the God of the Highways",
							"a being that can teleport"
						],
						item: [
							"a phone with intact GPS info",
							"a water bottle",
							"a pair of shoes",
							"a passport"
						]
					},
					imgfile: "minor-hourglasses-4.webp"
				},
				{
					name: "Five of Hourglasses",
					suit: "Hourglasses",
					value: 5,
					keyword: "Borderland",
					summary: "Borderland is the place between two worlds or two states of being, or where Time and Space meet the physical world.",
					ghostText: {
						individual: [
							"a corrupt customs agent",
							"an immigrant with a split personality",
							"a foreign diplomat",
							"a child entering puberty",
							"an AIDS patient close to death",
							"an urban shaman"
						],
						location: [
							"a place where the Illusion is weak",
							"an overgrown riverbank",
							"a border control post",
							"a high wall",
							"an embassy building"
						],
						organization: [
							"a cult that guards the borderland"
						],
						situation: [
							"existing between two worlds",
							"uncertain loyalties",
							"a deal between two powers",
							"only half awake",
							"between life and death",
							"the status quo",
							"a standoff"
						],
						creature: [
							"a Borderliner"
						],
						item: [
							"a letter of introduction",
							"identity papers",
							"a compass",
							"a carpet knife",
							"a folded map",
							"a diplomatic passport"
						]
					},
					imgfile: "minor-hourglasses-5.webp"
				},
				{
					name: "Six of Hourglasses",
					suit: "Hourglasses",
					value: 6,
					keyword: "Hidden",
					summary: "Hidden represents something that is obscured and hidden from view. It is strongly tied to the city of Ktonor in the Underworld.",
					ghostText: {
						individual: [
							"an undercover agent",
							"an illegal immigrant",
							"an escaped prisoner",
							"an inside man",
							"a camouflaged soldier"
						],
						location: [
							"Ktonor",
							"a hidden sanctuary",
							"a dusty vault",
							"a panic room",
							"a secret passage",
							"an unknown trail in the wilderness",
							"a smuggling route",
							"a safehouse"
						],
						organization: [
							"a spy agency",
							"a secret hobo community"
						],
						situation: [
							"an undercover operation",
							"staying away from trouble",
							"hidden meanings in conversations"
						],
						creature: [
							"a child of the Underworld",
							"an invisible monster"
						],
						item: [
							"the key to a safehouse",
							"a map of a secret route",
							"an ancient artifact",
							"buried secrets"
						]
					},
					imgfile: "minor-hourglasses-6.webp"
				},
				{
					name: "Seven of Hourglasses",
					suit: "Hourglasses",
					value: 7,
					keyword: "Labyrinth",
					summary: "Labyrinth is a maze filled with dangers and confusion, and is tied to the Underworld.",
					ghostText: {
						individual: [
							"a mathematician working on an unsolvable problem",
							"a mental patient that understands aspects of the Truth",
							"a cave explorer",
							"a psychologist mapping the minds of serial killers",
							"an old woman obsessed with puzzles and riddles"
						],
						location: [
							"the sewers",
							"twisting alleyways",
							"a hedge maze",
							"a dark cellar",
							"a network of caves",
							"subway tunnels",
							"a Brazillian Favela"
						],
						organization: [
							"a cult worshipping the creatures of the Underworld"
						],
						situation: [
							"losing one's direction",
							"abject confusion",
							"an ambush out of nowhere",
							"ending up in an unexpected place",
							"walking in circles",
							"strange echoes"
						],
						creature: [
							"Cairath",
							"Zeloths",
							"Gransangthir"
						],
						item: [
							"the compass from an old sailing vessel",
							"a thousand-piece jigsaw puzzle",
							"a cypher written by a madman"
						]
					},
					imgfile: "minor-hourglasses-7.webp"
				},
				{
					name: "Eight of Hourglasses",
					suit: "Hourglasses",
					value: 8,
					keyword: "Crossroad",
					summary: "Crossroad is connected to two distinct paths, a choice that has to be made and two very different outcomes.",
					ghostText: {
						individual: [
							"a woman running from her past",
							"a pressured politician",
							"a girl considering an abortion",
							"a bitter marriage counselor"
						],
						location: [
							"at a crossroad",
							"a road leading off the highway",
							"a railway station",
							"stairs leading down into the subway"
						],
						organization: [
							"a fertility clinic",
							"a betting company"
						],
						situation: [
							"a choice more important than it appears",
							"an impossible decision",
							"a bad break-up",
							"a scream that goes unheard",
							"a child playing with a gun"
						],
						creature: [
							"a pact-weaver",
							"the Swap Dealer"
						],
						item: [
							"a letter with life-changing information",
							"a backpack",
							"a slot machine"
						]
					},
					imgfile: "minor-hourglasses-8.webp"
				},
				{
					name: "Nine of Hourglasses",
					suit: "Hourglasses",
					value: 9,
					keyword: "Gate",
					summary: "Gate represents a threshold or obstacle that must be crossed or be protected.",
					ghostText: {
						individual: [
							"a security guard",
							"a self-taught locksmith",
							"a driven hacker",
							"a hard-to-please middle-manager"
						],
						location: [
							"a bank vault",
							"a door to an abandoned building",
							"a passageway beneath a bridge",
							"a manhole",
							"a portal to another world"
						],
						organization: [
							"the bank",
							"border guards",
							"a cult that has sworn to protect a secret"
						],
						situation: [
							"something that needs to be opened",
							"unexpected security measures",
							"someone who keeps many secrets",
							"forgotten memories surface"
						],
						creature: [
							"a guardian",
							"an opener of ways"
						],
						item: [
							"an encrypted file",
							"a book written in an unknown language",
							"a padlock",
							"a red pill"
						]
					},
					imgfile: "minor-hourglasses-9.webp"
				}
			],
			roses: [
				null,
				{
					name: "Ace of Roses",
					suit: "Roses",
					value: 1,
					keyword: "Gaia",
					summary: "Gaia is the Untamed Wilderness, that which cannot be controlled, the primal hunger and raw emotions.",
					ghostText: {
						individual: [
							"Madman more animal than man",
							"Neo-pagan nature worshiper",
							"Native shaman who demands a sacrifice"
						],
						location: [
							"Borderland to Gaia",
							"An overgrown house",
							"Depth of the wilds",
							"An animal nest"
						],
						organization: [
							"Cult worshiping the untamed wilderness"
						],
						situation: [
							"Savage cannibalism",
							"Overtaken by emotions",
							"The stronger kills the weaker",
							"Nature overtakes civilization",
							"Losing control in a wild rapture",
							"A body that changes and twists into something bestial"
						],
						creature: [
							"Enwildened god",
							"Sentinel"
						],
						item: [
							"Map that leads into the wild",
							"Tribal figurine carved from bone",
							"A human skull on a pole",
							"Rotting carcass crawling with worms"
						]
					},
					imgfile: "minor-roses-1.webp"
				},
				{
					name: "Two of Roses",
					suit: "Roses",
					value: 2,
					keyword: "Birth",
					summary: "Birth represents what comes out of passion, the start of something new, a soul merged into flesh.",
					ghostText: {
						individual: [
							"Strict midwife",
							"Depressed mother",
							"Newborn in an incubator",
							"Newborn baby",
							"Proud godfather",
							"Teenage parents",
							"Desperate baby kidnapper"
						],
						location: [
							"Run-down maternity ward",
							"Orphanage on the countryside",
							"Narrow tunnel"
						],
						organization: [
							"Surrogate mother agency",
							"Adoption center"
						],
						situation: [
							"Child is born",
							"Dawn of a new day",
							"New age of responsibility",
							"Family bond",
							"Adoption",
							"Stillborn baby",
							"Paternity test"
						],
						creature: [
							"Strange offspring",
							"Gynachid"
						],
						item: [
							"Bottle of mothers milk mixed with blood",
							"Empty baby crib",
							"Sharp objects at the bottom of a box of baby clothes"
						]
					},
					imgfile: "minor-roses-2.webp"
				},
				{
					name: "Three of Roses",
					suit: "Roses",
					value: 3,
					keyword: "Survival",
					summary: "Survival represents the will to go on against all odds, the survival of the fittest and conquering difficulties by pure iron will.",
					ghostText: {
						individual: [
							"Hillbilly survivalist with an iron will",
							"Special forces soldier",
							"Battered housewife",
							"Child soldier",
							"Hardened veteran"
						],
						location: [
							"The depths of the wild",
							"War zone",
							"Rough neighborhood",
							"Abusive foster home",
							"Secret bunker filled with food and equipment"
						],
						organization: [
							"Survivalist network",
							"Mercenary group",
							"Urban explorers"
						],
						situation: [
							"Lost in the wilderness",
							"A prize on your head",
							"Surrender to someone that is stronger",
							"Showing dominance",
							"Desperate act of cannibalism"
						],
						creature: [
							"Being from the depths of Gaia"
						],
						item: [
							"Door chain",
							"Field rations",
							"Map where secret trails are marked out",
							"Blood stained compass"
						]
					},
					imgfile: "minor-roses-3.webp"
				},
				{
					name: "Four of Roses",
					suit: "Roses",
					value: 4,
					keyword: "Growth",
					summary: "Growth represents things that gain power and expand, be it will, body, or nature.",
					ghostText: {
						individual: [
							"Boy with physical deformations",
							"Dedicated bodybuilder",
							"Grotesquely obese woman"
						],
						location: [
							"Place overtaken by nature",
							"Barely funded laboratory",
							"Room with mold ceiling and walls",
							"Gym in the suburbs",
							"Plowed fields"
						],
						organization: [
							"Fertility clinic",
							"Expansionist government or company",
							"Association organizing bodybuilding contests"
						],
						situation: [
							"An idea grows into an obsession",
							"Genetic mutation",
							"Friendship grows to untamed desire",
							"Child that reaches puberty",
							"Cancer that spreads through the body"
						],
						creature: [
							"Libith/Darthea",
							"Animal mutated by Gaia"
						],
						item: [
							"Syringe with steroids",
							"Seed embedded in black earth",
							"Fertilized egg",
							"Self help book"
						]
					},
					imgfile: "minor-roses-4.webp"
				},
				{
					name: "Five of Roses",
					suit: "Roses",
					value: 5,
					keyword: "Predator",
					summary: "Predator represents the hunter, the one that is hungry and preys on the weak.",
					ghostText: {
						individual: [
							"Influential film mogul",
							"Manipulative femme fatale",
							"Impulsive serial killer",
							"Serial rapist who lives in an unknowing family",
							"Ruthless paparazzi",
							"Aggressive CEO",
							"Online profile with the nickname \"Alpha_Male",
							"\" Conjurer of Passion"
						],
						location: [
							"Seedy hotel close to the red light district",
							"Cabin deep in the wild",
							"Barn where you skin animals"
						],
						organization: [
							"Cult celebrating murder",
							"Big game hunting society"
						],
						situation: [
							"Preys on the weak",
							"Stalking someone in the night",
							"Seduction",
							"Attack from an ambush",
							"Hidden motif"
						],
						creature: [
							"Nosferatu that hunts from the shadows",
							"A creature born out of Passion"
						],
						item: [
							"Red lipstick",
							"Stiletto knife",
							"Condoms and lube",
							"Night-vision goggles",
							"Knock out drug",
							"Makeup mirror",
							"Limousine with loyal driver"
						]
					},
					imgfile: "minor-roses-5.webp"
				},
				{
					name: "Six of Roses",
					suit: "Roses",
					value: 6,
					keyword: "Swarm",
					summary: "Swarm represents a gathering, a collective mind, a mob swallowed by passion and acting as one.",
					ghostText: {
						individual: [
							"Devoted follower",
							"Animal trainer",
							"Fisherman with a dark secret",
							"Agitated football supporter"
						],
						location: [
							"Square and streets",
							"Mosquito infested marshlands",
							"Youth camp",
							"Projects in the suburbs",
							"Cattle ranch"
						],
						organization: [
							"Football supporters",
							"Religious sect",
							"Union Activists"
						],
						situation: [
							"Goes with the Flow",
							"Sacrifice for the best of the Collective",
							"Collective punishment",
							"Gathering of people",
							"Congested traffic during rush hour",
							"A group sharing the same mindset",
							"Angry mob on social media",
							"People traveling in collective traffic"
						],
						creature: [
							"Pack of wolves",
							"Cockroaches",
							"Zeloths"
						],
						item: [
							"Jar of honey",
							"Dried ants in a matchstick box",
							"Locust broach in bronze"
						]
					},
					imgfile: "minor-roses-6.webp"
				},
				{
					name: "Seven of Roses",
					suit: "Roses",
					value: 7,
					keyword: "Prey",
					summary: "Prey represents the victim of passion or be the target for some enemy or dangerous situation.",
					ghostText: {
						individual: [
							"Celebrity terrorized by a ruthless stalker",
							"Blackmailed family man",
							"Wanted fugitive",
							"Online scapegoat",
							"Gullible teenager",
							"Doll-like altar boy",
							"Trafficking victim"
						],
						location: [
							"Hidden cell in the basement of a house",
							"Empty streets at night",
							"Safe house for women",
							"Old forest road"
						],
						organization: [
							"Support group for survivors of rape and sexual abuse"
						],
						situation: [
							"Lured into a trap",
							"Blackmailed into obedience",
							"Stalked by someone or something"
						],
						creature: [
							"Creature of Passion",
							"Children of the Night"
						],
						item: [
							"Crying and begging on a voice recording",
							"Stolen passport",
							"Pistol in a handbag",
							"Incriminating video tape"
						]
					},
					imgfile: "minor-roses-7.webp"
				},
				{
					name: "Eight of Roses",
					suit: "Roses",
					value: 8,
					keyword: "Obsession",
					summary: "Obsession represents the grip when passion has gotten hold of you and you cannot control it but are a victim to its influence.",
					ghostText: {
						individual: [
							"Voyeuristic photographer",
							"Eccentric art collector",
							"Depressed ex husband",
							"Unbearable narcissist"
						],
						location: [
							"Classy strip club",
							"Music venue",
							"Obscure porn site"
						],
						organization: [
							"Boy band fan club",
							"Model agency"
						],
						situation: [
							"Enslaved by passion",
							"An untamed and unhealthy desire",
							"Addiction to drugs",
							"Uncontrollable lust",
							"Desperate attempt to hide lack of self worth"
						],
						creature: [
							"Mancipium",
							"Libith",
							"Servant of Togarini"
						],
						item: [
							"Gossip Tabloid Magazine",
							"Nude selfies",
							"Posters and photos of megastar plastered on the wall",
							"Statue of the virgin Mary"
						]
					},
					imgfile: "minor-roses-8.webp"
				},
				{
					name: "Nine of Roses",
					suit: "Roses",
					value: 9,
					keyword: "Love",
					summary: "Love is a bond that can be stronger than death. It can give you strength and purpose, but also drag you down and be your doom.",
					ghostText: {
						individual: [
							"Man with a broken heart",
							"Hopeless romantic",
							"Marriage counselor",
							"Wicked stepfather",
							"Devoted spouse"
						],
						location: [
							"Motel next to the highway",
							"Cabin in the woods",
							"Church in the countryside",
							"Beautiful park in the city",
							"Shop where you can buy wedding dresses",
							"Dating site",
							"Corpse buried in the woods"
						],
						organization: [
							"Dating agency"
						],
						situation: [
							"Madly in love",
							"Unexpected feelings",
							"Hidden relationship",
							"Forbidden love",
							"Unanswered love",
							"Marriage ceremony",
							"Honeymoon trip",
							"Family incest",
							"Social media update"
						],
						creature: [
							"Creature of Passion"
						],
						item: [
							"Plain gold ring",
							"Marriage contract",
							"Smartphone filled with romantic messages and pictures",
							"Wedding cake",
							"Bridal gown",
							"Harlequin novel with underlined words",
							"Love letter soaked in blood"
						]
					},
					imgfile: "minor-roses-9.webp"
				}
			],
			skulls: [
				null,
				{
					name: "Ace of Skulls",
					suit: "Skulls",
					value: 1,
					keyword: "Metropolis",
					summary: "Metropolis represents mankind's ancestral home, the Eternal City and the very core of the Demiurge's Machinery.",
					ghostText: {
						individual: [
							"Mourning widow",
							"Janitor who works in an empty factory",
							"Desperate architect",
							"Strict and unimaginative manager"
						],
						location: [
							"Funeral chapel",
							"Ruined city",
							"Labyrinth of alleyways",
							"The Abyss",
							"The Machine City",
							"The Citadels"
						],
						organization: [
							"Section 11",
							"Prophets of the Third Temple",
							"Flakchatters"
						],
						situation: [
							"A feeling of greatness",
							"A slow but lethal disease",
							"Perceiving the shadow of the Creator",
							"An inheritance is waiting"
						],
						creature: [
							"Servant of now-destroyed Power",
							"Angels of the Heavenly Choirs",
							"Beasts of Metropolis"
						],
						item: [
							"Painting depicting a great Citadel",
							"A coffin in black oak",
							"An urn filled with ashes",
							"A ring of keys",
							"Obituary for long dead patriarch"
						]
					},
					imgfile: "minor-skulls-1.webp"
				},
				{
					name: "Two of Skulls",
					suit: "Skulls",
					value: 2,
					keyword: "Forgetfulness",
					summary: "Forgetfulness represents that which has faded from memory. It is strongly connected to the cycle of rebirth and the Oubliettes of Forgetfulness in Metropolis.",
					ghostText: {
						individual: [
							"Hypnotist",
							"Senior citizen",
							"Careless bookkeeper",
							"Trauma victim",
							"Inattentive babysitter",
							"Distracted priest",
							"Sloppy surgeon"
						],
						location: [
							"Oubliette of Forgetfulness",
							"Locked vault",
							"Old peoples home",
							"Ghost town",
							"Gas station at the edge of nowhere"
						],
						organization: [
							"Online forum that discusses reincarnation",
							"Servants to an old noble family"
						],
						situation: [
							"Traumatic event",
							"Alzheimer's",
							"Dementia",
							"Memory loss",
							"Manipulated minds",
							"Past lives",
							"Electric shocks"
						],
						creature: [
							"Lives on stolen memories",
							"Something from a past life",
							"Angel that seeks a soul that is lost"
						],
						item: [
							"Notebook",
							"Old letters",
							"Drugs",
							"Buried",
							"An equation that lacks the last numbers",
							"Lobotomization equipment",
							"Boxes in the attic"
						]
					},
					imgfile: "minor-skulls-2.webp"
				},
				{
					name: "Three of Skulls",
					suit: "Skulls",
					value: 3,
					keyword: "Remnants",
					summary: "Remnants represents that which has been left behind after death, destruction, or transition.",
					ghostText: {
						individual: [
							"Pragmatic archaeologist",
							"Eccentric descendant",
							"Soldier from a dissolved military unit",
							"Hobo living in the junkyard"
						],
						location: [
							"Ruins from ancient times",
							"Abandoned family home",
							"Shipwreck on the bottom of the sea"
						],
						organization: [
							"Legal firm handling inheritances",
							"Ancestor cult"
						],
						situation: [
							"Family secrets",
							"Last in a bloodline",
							"Surviving child that no one wanted",
							"Becoming alone in the world",
							"Discovering secrets of one's past"
						],
						creature: [
							"Fallen Angels",
							"Broken creatures",
							"Azghouls"
						],
						item: [
							"Last page in a book",
							"A distorted message on a cassette tape",
							"Automated distress signal",
							"Strange machinery with parts missing"
						]
					},
					imgfile: "minor-skulls-3.webp"
				},
				{
					name: "Four of Skulls",
					suit: "Skulls",
					value: 4,
					keyword: "Spirit",
					summary: "Spirit represents the psyche, the immaterial essence and the machinery that chains the divine soul.",
					ghostText: {
						individual: [
							"Sophisticated medium with a rich clientele",
							"Girl in the suburb who sees \"ghosts",
							"\" Scientist who tries to photograph the spirit world",
							"Conjurer of spirits living in an abandoned train",
							"Possessed child kept tied to the bed"
						],
						location: [
							"The still and cold sea",
							"Home of a serial killer where the bodies are hidden in the walls",
							"Mire cloaked in white mist",
							"Old lighthouse on a small island"
						],
						organization: [
							"Online show that investigates paranormal phenomena"
						],
						situation: [
							"Legend of a person that is whispered in the projects",
							"Song calling from Achlys in the Underworld"
						],
						creature: [
							"Wraiths and Phantoms",
							"A Human Soul",
							"Psyphago"
						],
						item: [
							"Deck of stained tarot cards",
							"Doll possessed by a spirit",
							"Ouija board stained with beer and blood",
							"Pack of old letters in French"
						]
					},
					imgfile: "minor-skulls-4.webp"
				},
				{
					name: "Five of Skulls",
					suit: "Skulls",
					value: 5,
					keyword: "Transition",
					summary: "Transition represents the crossing from life to death or into another form of existence.",
					ghostText: {
						individual: [
							"Methodical and well prepared hitman",
							"Executioner who barely can keep it together",
							"Trauma victim hovering between life and death",
							"Nurse with a god complex",
							"Pornstar with an asphyxiation fetish",
							"Seductive death magician"
						],
						location: [
							"Abortion clinic",
							"A hidden door in a tomb",
							"Secret gate that leads to the city of the dead",
							"Desolated slaughterhouse",
							"Retirement home"
						],
						organization: [
							"Death squad",
							"Scientific organization trying to monitor the moment of death"
						],
						situation: [
							"Mother dying in childbirth"
						],
						creature: [
							"Borderliner",
							"Creature that exists between life and death"
						],
						item: [
							"Homemade biological weapon",
							"Syringe with embalming fluid",
							"Automated external defibrillator with one charge left",
							"Fetus preserved in alcohol that now and again twitches",
							"Vial with seed spilled during the moment of death"
						]
					},
					imgfile: "minor-skulls-5.webp"
				},
				{
					name: "Six of Skulls",
					suit: "Skulls",
					value: 6,
					keyword: "Flesh",
					summary: "Flesh represents the body as a shell after death or as a prison of a soul that should have been released.",
					ghostText: {
						individual: [
							"Morbid surgeon that takes trophies",
							"Insane young man that keeps the body of his dead father tied to a bed in the attic",
							"Restrained undertaker with deviant sexual urges",
							"Lobotomized girl kept at the basement of a brothel"
						],
						location: [
							"Morgue in stainless steel where the antiseptic smell barely can douse out the stench of rot",
							"Mass graves outside of a small town",
							"Medical museum"
						],
						organization: [
							"Society of death magicians",
							"Cannibal cult in the countryside"
						],
						situation: [
							"Severe case of leprosy",
							"The dead come to life",
							"Forced to eat human flesh",
							"Cannibalism"
						],
						creature: [
							"Damned legionnaires"
						],
						item: [
							"Deformed body that is stitched and melted together",
							"Tome bound with human skin",
							"Stolen organs in a box filled with ice",
							"Box of scalpels and surgical knives"
						]
					},
					imgfile: "minor-skulls-6.webp"
				},
				{
					name: "Seven of Skulls",
					suit: "Skulls",
					value: 7,
					keyword: "Weapon",
					summary: "Weapon represents the tool that brings death. That which brings forth a transition through violence.",
					ghostText: {
						individual: [
							"Vigilante in the suburbs armed with silenced pistol",
							"Russian mafia enforcer",
							"Elite sniper that takes pride in his work",
							"Murderer who wants to get close and personal with the knife"
						],
						location: [
							"Room with an electric chair",
							"War memorial",
							"Weapon storage",
							"Military headquarters"
						],
						organization: [
							"Arms dealers",
							"Military special forces",
							"Mercenary group",
							"Violent gang"
						],
						situation: [
							"Lynch mob armed with machetes and rifles",
							"Drive-by shooting",
							"Armed robbery",
							"Attempted assassination",
							"Ambush"
						],
						creature: [
							"Creature that feeds on violence and suffering"
						],
						item: [
							"Sharp blade",
							"Ingram Mac-11 machine pistol",
							"Video clips of executions and lethal accidents",
							"Old video cassette with snuff porn",
							"Pack of cigarettes",
							"Hand grenade from WWII",
							"Nuclear codes printed out from a dot matrix printer",
							"Crime scene photos with hidden messages"
						]
					},
					imgfile: "minor-skulls-7.webp"
				},
				{
					name: "Eight of Skulls",
					suit: "Skulls",
					value: 8,
					keyword: "Suffering",
					summary: "Suffering represents the pain that comes with death and the cleansing of the soul. It is strongly connected to the cycle of rebirth and the Oubliettes of Suffering in Inferno.",
					ghostText: {
						individual: [
							"Self mutilating prophet",
							"Professional dominatrix",
							"Military interrogation expert",
							"Religious flagellant"
						],
						location: [
							"Purgatory that creates a bridge between Elysium and Inferno",
							"Oubliettes of Suffering",
							"Soundproof interrogation room",
							"Members-only BDSM club",
							"Hidden cellar entrance",
							"Medieval torture chamber"
						],
						organization: [
							"Secret anti-terrorist organization",
							"Cult that worships Golab"
						],
						situation: [
							"Painful bone cancer",
							"Secrets within the Family",
							"Video tape of a young child getting skinned alive",
							"Horrible flashbacks"
						],
						creature: [
							"Purgatides",
							"Nepharites",
							"Razides"
						],
						item: [
							"Crown of thorns made of barbed wire",
							"Waterboarding equipment",
							"Rusty spikes",
							"Shackles with runes carved into them"
						]
					},
					imgfile: "minor-skulls-8.webp"
				},
				{
					name: "Nine of Skulls",
					suit: "Skulls",
					value: 9,
					keyword: "Inferno",
					summary: "Inferno represents the shadow of Metropolis, the many hells and Citadels and the realm from which the will of Astaroth flows.",
					ghostText: {
						individual: [
							"Tattoo artist who binds the clients to Inferno",
							"Charismatic cult leader who hands out razor blades",
							"Heroin addict who has learned to walk between worlds",
							"Violent fanatic who catches glimpses of Inferno"
						],
						location: [
							"Citadel of Astaroth",
							"The ten Citadels of the Death Angels",
							"Labyrinth with torture chambers",
							"A gate between Elysium and Inferno"
						],
						organization: [
							"Suicide cult seeking escape from the world"
						],
						situation: [
							"Child drenched in oil and blood is placed on the steps of a monastery",
							"Secret whispered on the death bed",
							"Lyrics of a black metal band invoke the powers of hell"
						],
						creature: [
							"Nepharite",
							"Incarnate of Astaroth"
						],
						item: [
							"Old key that can open gates between world",
							"LP-record that plays a haunting tune",
							"Matchstick box filled with human teeth",
							"\"Forgive me\" written in blood on a piece of paper"
						]
					},
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