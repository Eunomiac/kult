/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌████████████░░░░░░░░░░░░░░░░░░░ Kult Tarot ░░░░░░░░░░░░░░░░░░░░░███████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█████████████████████ MIT License █ v0.0.1-prealpha █  ████████████████████▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░███████████████████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */

console.clear();
/*
WHEN DONE:  @Weremir wants to test it 
*/

import {gsap, Draggable, Flip, InertiaPlugin, SlowMo} from "./external/greensock/all.js";

gsap.registerPlugin(Draggable, Flip, InertiaPlugin, SlowMo);

const DEBUG = {
	isTestingMajorArcana: true,
	// isLimitingDeckSize: 10
};

// ▮▮▮▮▮▮▮[UTILITY] Utility Functions ▮▮▮▮▮▮▮
const shuffle = (arr) => {
	let currentIndex = arr.length,
					randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
	}
	return arr;
};
const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const round = (num, sigDigits = 0) => Math.round(num * (10 ** sigDigits)) / (10 ** sigDigits);
const sinOf = (deg) => Math.sin(deg * (Math.PI / 180));
const cosOf = (deg) => Math.cos(deg * (Math.PI / 180));
const getImgCSS = (imgRef) => {
	if (/^(linear|url)/.test(imgRef)) { return imgRef }
	if (/^http/.test(imgRef)) { return `url(${imgRef})` }
	return `url("${CONSTANTS.imgPath}${imgRef}")`;
};

// ▮▮▮▮▮▮▮[INITIALIZATION] Initialization, Configuration & Constants ▮▮▮▮▮▮▮
const CONSTANTS = {
	imgPath: "https://raw.githubusercontent.com/Eunomiac/kult/main/assets/images/",
	bgTable: "table-bg.webp",
	bgEmptySlot: "linear-gradient(202deg, rgb(0, 0, 0), rgb(100, 100, 100))",
	bgCardBack: "card-back-.webp",
	slotStyles: {
		0: {opacity: 1},
		1: {opacity: 0.6},
		2: {opacity: 0.5},
		3: {opacity: 0.4},
		4: {opacity: 0.3}
	},
	padding: {x: 20, y: 20},
	spacing: {x: 100, y: 30},
	card: {
		aspectRatio: 1.712,
		get height() { return ((window.innerHeight - (2 * CONSTANTS.padding.y)) / 3 - CONSTANTS.spacing.y) },
		get width() { return this.height / this.aspectRatio }
	},
	deckOffset: -15,
	deckEdgeAlpha: {min: 0, max: 250},
	deckRadiusPercent: 1.4,
	ghostTextCategories: ["individual", "location", "organization", "situation", "creature", "item"],
};
CONSTANTS.slotPos = {
	get 1() {
		return {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		};
	},
	get 2() {
		return {
			x: this[1].x - (CONSTANTS.spacing.x + CONSTANTS.card.width),
			y: this[1].y
		};
	},
	get 3() {
		return {
			x: this[1].x,
			y: this[1].y - (CONSTANTS.spacing.y + CONSTANTS.card.height)
		};
	},
	get 4() {
		return {
			x: this[1].x + (CONSTANTS.spacing.x + CONSTANTS.card.width),
			y: this[1].y
		};
	},
	get 5() {
		return {
			x: this[1].x,
			y: this[1].y + (CONSTANTS.spacing.y + CONSTANTS.card.height)
		};
	}
};
const TAROTDATA = {
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
					"a monster unexpectedly demonstrates humanity",
					"the ghost of a lost ally returns to offer aid",
					"an agent of the divine turn traitors"					
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
					"a dark street",
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
					"someone is watching",
				],
				creature: [
					"beasts of Metropolis",
					"a great Power that is sleeping",
					"an enslaved god",
				],
				item: [
					"Machinery of Death and Rebirth",
					"scrawled map to a lost city",
					"an artifact of Metropolis"
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
					"a philanthropist whose gifts corrupt the recipient"
				],
				location: [
					"Inferno",
					"the Citadel of a Death Angel",
					"a gateway to a shattered world"
				],
				organization: [
					"free wills behind the Veil",
					"a nomadic cult of ritual killers",
				],
				situation: [
					"a direct connection to Astaroth",
					"the will of the Inferno manifests",
					"the Black Sun",
					"entwined wills, master and slave",
					"unimaginable suffering",
					"senseless beauty",
					"a growing power",
					"spreading cracks in the Illusion"
				],
				creature: [
					"that which grows from death",
					"a pulsating, growing thing",
					"an Infernal infestation"
				],
				item: [
					"Machinery of Death and Rebirth",
					"the Spiked Wheel",
					"the last missive from a destroyed world"
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
					individual: [
						"Powerful politician",
						"Leader of the clergy",
						"Top ranking military",
						"Owner of multi-billion dollar company",
						"Media profile with high credibility"
					],
					location: [
						"Government building",
						"Cathedral",
						"Historical monument",
						"Occupied land",
						"Religious capital"
					],
					organization: [
						"Cult within the Army",
						"The Sleeping Masses",
						"Secret society among the top politicians"
					],
					situation: [
						"Cultural values",
						"Family gatherings",
						"Traditions and national holidays"
					],
					creature: [
						"Lictors",
						"The Invisible Principles",
						"Guardians of the Illusion"
					],
					item: [
						"Book of laws",
						"Political propaganda",
						"Flag of the Nation",
						"Blindfold",
						"Sedative",
						"A PDF with the US Constitution"
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
				details: {
					individual: [
						"Police officer",
						"Warden",
						"Headmaster",
						"Informer",
						"Secret agent",
						"Prison guard",
						"Committed attorney",
						"Strict judge"
					],
					location: [
						"High security prison",
						"Detention cell",
						"High school",
						"Bank office",
						"Lending office"
					],
					organization: [
						"Law enforcers",
						"The School system",
						"The bank system",
						"The Judicial system"
					],
					situation: [
						"Bills that need to be payed",
						"Debts",
						"Wanted",
						"Educated",
						"Declared an enemy of the state"
					],
					creature: [
						"Eldermensch",
						"Lictors"
					],
					item: [
						"Handcuffs",
						"Wheelchair",
						"List of strict rules",
						"Security camera",
						"Surveillance drone",
						"Folded Education grades"
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
				details: {
					individual: [
						"TV-Preacher",
						"PR-Person",
						"Enthralled housewife",
						"Diehard atheist",
						"Football supporter",
						"Street preacher"
					],
					location: [
						"Secluded temple",
						"Old church",
						"Sport arena",
						"Grandiose monument"
					],
					organization: [
						"Religious sect",
						"Marxist Group",
						"Terror cell"
					],
					situation: [
						"Ceremony",
						"Sport event",
						"Prayer",
						"Purging ritual",
						"Money donation"
					],
					creature: [
						"Angels of Chokmah"
					],
					item: [
						"Rusty nail from the cross of Jesus",
						"Religious garments",
						"Brass pin",
						"Propaganda poster of Vladimir Putin",
						"First edition of On the Origin of Species by Charles Darwin"
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
				details: {
					individual: [
						"Intrusive telephone salesman",
						"The hot teenager next door",
						"Street peddler",
						"Charismatic internet celebrity",
						"Famous actor",
						"Gossiping neighbor"
					],
					location: [
						"Movie theater",
						"Shopping mall",
						"Vacation resort",
						"Strip club"
					],
					organization: [
						"Advertising Agency",
						"Fashion house",
						"Fast food chain"
					],
					situation: [
						"Social Media Scandals",
						"TV shows",
						"The News",
						"Podcasts",
						"Twitch streaming",
						"Commercials",
						"Phone calls",
						"Sudden sounds",
						"The latest moral panic",
						"Family dinners",
						"Political discussions"
					],
					creature: [
						"Mancipium, Creature of Passion",
						"Something that is disguised as an ordinary person",
						"Creature of Madness",
						"Tiphareth's servants"
					],
					item: [
						"Smartphone",
						"Video games",
						"Internet Forums",
						"Porn",
						"Billboards",
						"Cheap alcohol",
						"Stay fit magazine"
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
				details: {
					individual: [
						"Online agitator",
						"Alt-right member",
						"Man hating feminist",
						"Imam in the Salafi movement",
						"Self righteous university student",
						"Extreme nationalist",
						"Conservative psychologist",
						"Shunned writer",
						"Holocaust denier"
					],
					location: [
						"Social media",
						"Online forums",
						"Youtube",
						"Basement hideout",
						"Discreet meeting place",
						"Conference rooms"
					],
					organization: [
						"Minority ethnic group",
						"Right wing party",
						"Online hate group",
						"Conspiracy theorists"
					],
					situation: [
						"Political rally",
						"Harassment",
						"Death threats",
						"Arson",
						"Hate speech",
						"Heated debates"
					],
					creature: [
						"Servants of Hareb Serap and Gamichicoth"
					],
					item: [
						"Hate propaganda",
						"Racist pamphlets",
						"The SCUM manifesto",
						"Provocative song on Spotify",
						"Essay about Foucault",
						"Cartoon making fun of a religious prophet"
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
				details: {
					individual: [
						"Stubborn loner",
						"Teenager with an attitude",
						"Criminal",
						"Charismatic political leader",
						"Mafia boss",
						"Violent neo-nazi",
						"Gang member",
						"YouTube Critic",
						"Hacker",
						"Anarchist"
					],
					location: [
						"Occupied house",
						"Underground Club",
						"Home of a survivalist",
						"Secret hideout",
						"Bar outside town"
					],
					organization: [
						"Guerrilla",
						"Punk band",
						"Extremist group",
						"Animal Rights movement"
					],
					situation: [
						"Revolution",
						"Riot",
						"Concert",
						"Political rally",
						"Demonstration"
					],
					creature: [
						"Angels of Malkuth",
						"Azghoul"
					],
					item: [
						"Pamphlet with Propaganda",
						"Spray can",
						"Communist manifesto",
						"Threatening letter",
						"Steel tipped boots",
						"Placard"
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
				details: {
					individual: [
						"Distraught patient",
						"Sadistic orderly",
						"Deluded jazz musician",
						"Girl who is kept hidden",
						"Boy without a mouth",
						"Wild eyed mathematician",
						"Veterinarian who performs cruel experiments"
					],
					location: [
						"Insane asylum",
						"Isolation cell",
						"Decrepit house",
						"Apartment with torn down wallpapers"
					],
					organization: [
						"The Fools",
						"Psychological Institute",
						"Sect in the trailer park"
					],
					situation: [
						"Psychosis",
						"Severe depression",
						"Schizophrenia",
						"PTSD",
						"Anxiety",
						"Panic Attacks",
						"Neurosis",
						"Paranoia",
						"Aggressive behavior",
						"Multiple personalities",
						"Mob mentality",
						"Mass delusion"
					],
					creature: [
						"Creature of Madness"
					],
					item: [
						"A half burned doll",
						"Patient journal",
						"Pharmaceutical drugs",
						"Straitjacket",
						"Scribbles on a city map",
						"Symbols burned into human skin",
						"Notes hidden inside a book about female hysteria",
						"Envelope with 10 bottle caps"
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
				details: {
					individual: [
						"Oracle in the suburbs",
						"Self proclaimed prophet",
						"Inspired Architect",
						"Eccentric video artist",
						"CEO of fast growing IT company",
						"Mental patient"
					],
					location: [
						"Old temple",
						"Carnival",
						"Smoky opium den",
						"Asylum",
						"Techno Club",
						"Graffiti in parking garage"
					],
					organization: [
						"Dream Interpreters",
						"Pilgrims"
					],
					situation: [
						"Nightmarish visions",
						"Clear insights",
						"Prophecy",
						"Eyes gouged out",
						"Rumors that speak of the Truth"
					],
					creature: [
						"Being born of nightmares and visions",
						"Augur"
					],
					item: [
						"Super 8 Camera",
						"LSD",
						"Decorated clay pot",
						"Webpage"
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
				details: {
					individual: [
						"Amature philosopher",
						"Magician",
						"Savvy technician",
						"Dedicated body modder",
						"Scientist on the verge of discovery",
						"Homeless beneath a bridge",
						"University student",
						"Broadminded bartender"
					],
					location: [
						"Road into the unknown",
						"Twisted staircase",
						"High tech lab",
						"University"
					],
					organization: [
						"A Cult that serves Malkuth",
						"Research institute",
						"Architect firm"
					],
					situation: [
						"Initiation ritual",
						"Science fair",
						"Sect Meeting"
					],
					creature: [
						"Child of the Night",
						"Awakened human",
						"Amentoraz"
					],
					item: [
						"Map of unknown origin",
						"Old floppy disc",
						"Diary with mad scribbles",
						"Forgotten blog",
						"Ladder",
						"Flashlight"
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
				details: {
					individual: [
						"Severely depressed soul",
						"Person in extreme apathy",
						"Coma patient",
						"Self destructive misanthrope",
						"Priest who has lost his faith",
						"Prisoner kept in total isolation",
						"Careless deep sea diver"
					],
					location: [
						"The vacuum of space",
						"A deep well",
						"Black still waters",
						"Sensory deprivation tank",
						"Bottomless mire",
						"Depth of the ocean",
						"Isolation cell with black walls"
					],
					organization: [
						"Cult that worships She Who Waits Below"
					],
					situation: [
						"Total destruction of what makes a person",
						"Dissolved into atoms",
						"Maelstrom that drags you down into the deep"
					],
					creature: [
						"Children of the Underworld",
						"Phantom"
					],
					item: [
						"Sensory deprivation tank",
						"Inkwell filled with black ink",
						"Syringe with a lethal injection",
						"The number π burned into leather",
						"Suicide note"
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
				details: {
					individual: [
						"Suburban fortune teller",
						"Professor in predictive analytics",
						"Reckless gambler",
						"Infant from unknown parents",
						"Stock broker",
						"Young prospect",
						"Tireless gardener",
						"Sportsman aiming for the elite league",
						"Aspiring politician",
						"Tech genius"
					],
					location: [
						"Orphanage",
						"Highway being built",
						"Construction site"
					],
					organization: [
						"Future analysts",
						"Investment company",
						"Technical university"
					],
					situation: [
						"Prediction",
						"Complicated plots",
						"Tarot reading",
						"Fundraising event",
						"Online crowdfunder"
					],
					creature: [
						"Being from the future",
						"The Eyeless One"
					],
					item: [
						"Old pocket watch",
						"A diary filled with predictions",
						"A seed that has not yet been planted",
						"A blueprint of a skyscraper",
						"A biological weapon"
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
				details: {
					individual: [
						"Nostalgic old-timer",
						"Bitter antique dealer",
						"Archaeologist who can't stop talking",
						"Hobby historian",
						"Dedicated chronicler",
						"Member of a retro subculture"
					],
					location: [
						"Forgotten museum",
						"Ruins deep in the wilderness",
						"Overgrown graveyard",
						"Dusty archives",
						"Old battlefield",
						"University library",
						"Family homestead"
					],
					organization: [
						"Center for genealogy studies",
						"Archaeological society",
						"Online vintage subculture group"
					],
					situation: [
						"Archaeological dig",
						"Interrogation"
					],
					creature: [
						"Being from a time long passed",
						"Ancient creature from the Underworld",
						"Forgotten god"
					],
					item: [
						"Book with family history",
						"A chalice from the Middle Ages",
						"A photo of people long since dead",
						"A folded birth certificate"
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
				details: {
					individual: [
						"Hard working truck driver",
						"Philosophical backpacker",
						"Cheating airline pilot",
						"Restless lover",
						"Tattered drifter",
						"Psychopathic hitchhiker",
						"Trustworthy taxi driver",
						"Marathon runner with many secrets",
						"Escaped convict",
						"Child that has run away from home"
					],
					location: [
						"Endless highway",
						"Railway",
						"Slow flowing river",
						"Freight elevator"
					],
					organization: [
						"Moving company",
						"Shipping company",
						"Human trafficking syndicate"
					],
					situation: [
						"Boat trip",
						"Train ride",
						"Hunt",
						"Speeding car",
						"Information being transferred",
						"Electrical lines"
					],
					creature: [
						"The Crazed Dancers",
						"The God of the Highways",
						"Being that can teleport"
					],
					item: [
						"Phone with GPS info",
						"Water bottle",
						"Pair of shoes",
						"Passport"
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
				details: {
					individual: [
						"Bought customs agent",
						"Immigrant with split personality",
						"Foreign diplomat",
						"Child entering puberty",
						"AIDS patient close to death",
						"Urban shaman"
					],
					location: [
						"Place where the illusion is weak",
						"Overgrown riverbank",
						"Border control",
						"High wall",
						"Embassy building"
					],
					organization: [
						"Cult that guards the borderland"
					],
					situation: [
						"Existing between two worlds",
						"An uncertain loyalty",
						"Deal between two powers",
						"Half awake",
						"Between life and death",
						"Status quo",
						"Standoff"
					],
					creature: [
						"Borderliner"
					],
					item: [
						"Letter of introduction",
						"Identity papers",
						"Compass",
						"Carpet knife",
						"Folded map",
						"Diplomatic passport"
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
				details: {
					individual: [
						"Undercover agent",
						"Illegal immigrant",
						"Escaped prisoner",
						"Inside man",
						"Camouflaged soldier"
					],
					location: [
						"Ktonor",
						"Hidden sanctuary",
						"Dusty vault",
						"Panic room",
						"Secret passage",
						"Unknown trail in the wilderness",
						"Smuggling route",
						"Safehouse"
					],
					organization: [
						"Spy agency",
						"Secret hobo community"
					],
					situation: [
						"Undercover operation",
						"Staying away from trouble",
						"Hidden meanings in conversations"
					],
					creature: [
						"Child of the Underworld",
						"Invisible Monster"
					],
					item: [
						"Key to safehouse",
						"Map to secret route",
						"Ancient artifact",
						"Buried secrets"
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
				details: {
					individual: [
						"Mathematician working on an unsolvable problem",
						"Mental patient that understands aspects of the Truth",
						"Cave explorer",
						"Psychologist mapping the minds of serial killers",
						"Old woman obsessed with puzzles and riddles"
					],
					location: [
						"Sewer system",
						"Twisting alleyways",
						"Hedge maze",
						"Dark cellar",
						"Network of caves",
						"Subway tunnels",
						"Favela"
					],
					organization: [
						"Cult worshipping the creatures of the Underworld"
					],
					situation: [
						"Losing direction",
						"Confusion",
						"Ambush",
						"Ending up on a place one did not expect",
						"Walking in circles",
						"Strange echos"
					],
					creature: [
						"Cairath",
						"Zeloths",
						"Gransangthir"
					],
					item: [
						"Old compass from sailing vessel",
						"1000 piece puzzle",
						"Code written by a madman"
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
				details: {
					individual: [
						"Woman running from her past",
						"Pressured politician",
						"Girl considering an abortion",
						"Bitter marriage counselor"
					],
					location: [
						"Crossroad",
						"Road leading off the highway",
						"Railway station",
						"Stairs leading down to the subway"
					],
					organization: [
						"Fertility clinic",
						"Betting company"
					],
					situation: [
						"Important choice",
						"A tough dilemma",
						"A break up",
						"A shout that may not be heard",
						"Child playing with a gun"
					],
					creature: [
						"Pact-weaver",
						"The Swap Dealer"
					],
					item: [
						"A letter with life changing information",
						"A Backpack",
						"Slot machine"
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
				details: {
					individual: [
						"Security guard",
						"Self taught locksmith",
						"Driven hacker",
						"Middle manager with a rejecting nature"
					],
					location: [
						"Bank vault",
						"Door to an abandoned building",
						"Passageway beneath a bridge",
						"Manhole",
						"Portal to another world"
					],
					organization: [
						"Bank",
						"Border guards",
						"Cults that has sworn to protect a secret"
					],
					situation: [
						"Something that needs to be opened",
						"Something protected",
						"Someone who keeps many secrets",
						"Forgotten memories"
					],
					creature: [
						"Guardian",
						"Opener of Ways"
					],
					item: [
						"Encrypted file",
						"Book written in unknown language",
						"Padlock",
						"A red pill"
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
				details: {
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
};
const TEMPLATEDATA = {
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
};

Object.entries({
	cardWander: (targets) => gsap.to(targets, {
			x: function(i, cardElem) { return gsap.getProperty(cardElem, "x") + gsap.utils.random(-150, 150) },
			y: function(i, cardElem) { return gsap.getProperty(cardElem, "y") + gsap.utils.random(-50, 50) },
			scale: "random(0.8, 1.2)",
			ease: "sine.inOut",
			duration: 3,
			stagger: {
				repeat: -1,
				yoyo: true,
				amount: 3,
				ease: "elastic.inOut"
			}
		}),
	cardWanderHoverOn: (targets) => gsap.fromTo(targets, {zIndex: 100}, {
			x: function(i, cardElem) { return gsap.getProperty(cardElem, "x") },
			y: function(i, cardElem) { return gsap.getProperty(cardElem, "y") },
			scale: 1.5,
			zIndex: 100,
			boxShadow: "rgb(255 166 33) 0px 0px 30px",
			duration: 0.5,
			ease: "power2.out"
		}),
	cardWanderHoverOff: (targets) => gsap.to(targets, {
			x: function(i, cardElem) { return gsap.getProperty(cardElem, "x") + gsap.utils.random(-150, 150) },
			y: function(i, cardElem) { return gsap.getProperty(cardElem, "y") + gsap.utils.random(-50, 50) },
			scale: 1,
			boxShadow: "rgb(255 166 33) 0px 0px 0px",
			zIndex: 90,
			duration: 0.5,
			ease: "power2.out",
			onComplete() { gsap.effects.cardWander(targets) }
		}),
	explodeOutOverLayer: () => {
		$("#over-layer *").off("click mouseenter");
		const fadeTimeline = gsap.timeline({
			onComplete() {
				Table.Phase = "CardsDealt";
				Table.ReadyReading();
			}
		});
		fadeTimeline.to("#over-layer", {
			scale: 2,
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
	fadeInTo65: (targets) => gsap.to(targets, {
			opacity: 1,
			scale: 0.65,
			duration: 2,
			ease: "power2.out"
		}),
	cardOrbitRotation: () => gsap.to("#over-layer", {
			rotation: "+=360",
			duration: 150,
			repeat: -1,
			ease: "none",
			onUpdate() {
				gsap.set("#over-layer > .tarot-card-main", {
					rotation: -1 * gsap.getProperty("#over-layer", "rotation")
				})
			}
		}),
	dealCircleFan: () => {
		const {x: xCenter, y: yCenter} = Table.Get().layout[1].pos;
		const radius = CONSTANTS.deckRadiusPercent * (yCenter - CONSTANTS.padding.y);
		const stepAngle = 360 / TarotDeck.Get().cards.length;
		const stepOffset = CONSTANTS.deckOffset / TarotDeck.Get().cards.length;
		
		return gsap.to("#over-layer > .tarot-card-main", {
			x: function(cardNum) {
				return xCenter + (radius * sinOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150);
			},
			y: function(cardNum) {
				return yCenter + (radius * cosOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150);
			},			
			scale: "random(0.8, 1.2)",
			duration: 1,
			outlineColor: "random([#FFFFFF, #777777, #000000])",
			stagger: -0.05,
			ease: "power2.out",
			onComplete() {
				$("#over-layer > .tarot-card-main").on("click", function(event) {
					event.preventDefault();
					$(event.target).off("click mouseenter mouseleave");
					gsap.killTweensOf(event.target);
					TarotDeck.Get().deal(event.target);
				});
				$("#over-layer > .tarot-card-main").hover(
					function handlerIn(event) {
						event.preventDefault();
						gsap.killTweensOf(event.target); //, "x,y,scale");
						gsap.effects.cardWanderHoverOn(event.target);
					}, function handlerOut(event) {
						event.preventDefault();
						gsap.effects.cardWanderHoverOff(event.target);
					}
				);
				gsap.set("#over-layer > .tarot-card-main", {pointerEvents: "all"});
				gsap.effects.cardWander("#over-layer > .tarot-card-main");
			}
		});
	}
}).forEach(([name, effect]) => gsap.registerEffect({name, effect}));

/* gsap.registerEffect({
	name: "cardWander",
	effect: (targets) => {
		return gsap.to(targets, {
			x: function(i, cardElem) { return gsap.getProperty(cardElem, "x") + gsap.utils.random(-150, 150) },
			y: function(i, cardElem) { return gsap.getProperty(cardElem, "y") + gsap.utils.random(-50, 50) },
			scale: "random(0.8, 1.2)",
			ease: "sine.inOut",
			duration: 3,
			stagger: {
				repeat: -1,
				yoyo: true,
				amount: 3,
				ease: "elastic.inOut"
			}
		})
	}
});
gsap.registerEffect({ name: "cardWanderHoverOn",
	effect: (targets, config) => {
		return gsap.fromTo(targets, {zIndex: 100}, {
			x: function(i, cardElem) { return gsap.getProperty(cardElem, "x") },
			y: function(i, cardElem) { return gsap.getProperty(cardElem, "y") },
			scale: 1.5,
			zIndex: 100,
			boxShadow: "rgb(255 166 33) 0px 0px 30px",
			duration: 0.5,
			ease: "power2.out"
		});
	}
});
gsap.registerEffect({ 
	name: "cardWanderHoverOff",
	effect: (targets, config) => {		
		return gsap.to(targets, {
			x: function(i, cardElem) { return gsap.getProperty(cardElem, "x") + gsap.utils.random(-150, 150) },
			y: function(i, cardElem) { return gsap.getProperty(cardElem, "y") + gsap.utils.random(-50, 50) },
			scale: 1,
			boxShadow: "rgb(255 166 33) 0px 0px 0px",
			zIndex: 90,
			duration: 0.5,
			ease: "power2.out",
			onComplete() { gsap.effects.cardWander(targets) }
		});
	}
});
gsap.registerEffect({
	name: "explodeFade",
	effect: (targets) => {
		return gsap.to(targets, {
			opacity: 0,
			scale: 15,
			duration: 1,
			ease: "power2.out",
			onComplete() { $(".canvas-layer *").remove() }
		});
	}
});
gsap.registerEffect({
	name: "fadeInTo65",
	effect: (targets) => {
		return gsap.to(targets, {
			opacity: 1,
			scale: 0.65,
			duration: 2,
			ease: "power2.out"
		});
	}
});
gsap.registerEffect({
	name: "cardOrbitRotation",
	effect: () => {
		return gsap.to("#over-layer", {
			rotation: "+=360",
			duration: 150,
			repeat: -1,
			// ease:"myWiggle",
			ease: "none",
			onUpdate() {
				gsap.set("#over-layer > .tarot-card-main", {
					rotation: -1 * gsap.getProperty("#over-layer", "rotation")
				})
			}
		});
	}
});
gsap.registerEffect({
	name: "dealCircleFan",
	effect: () => {
		const {x: xCenter, y: yCenter} = Table.Get().layout[1].pos;
		const radius = CONSTANTS.deckRadiusPercent * (yCenter - CONSTANTS.padding.y);
		const stepAngle = 360 / TarotDeck.Get().cards.length;
		const stepOffset = CONSTANTS.deckOffset / TarotDeck.Get().cards.length;
		
		return gsap.to("#over-layer > .tarot-card-main", {
			x: function(cardNum) {
				return xCenter + (radius * sinOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150);
			},
			y: function(cardNum) {
				return yCenter + (radius * cosOf(stepAngle * cardNum)) + gsap.utils.random(-150, 150);
			},			
			scale: "random(0.8, 1.2)",
			duration: 1,
			outlineColor: "random([#FFFFFF, #777777, #000000])",
			stagger: -0.05,
			ease: "power2.out",
			onComplete() {
				$("#over-layer > .tarot-card-main").on("click", function(event) {
					event.preventDefault();
					$(event.target).off("click mouseenter mouseleave");
					gsap.killTweensOf(event.target);
					TarotDeck.Get().deal(event.target);
				});
				$("#over-layer > .tarot-card-main").hover(
					function handlerIn(event) {
						event.preventDefault();
						gsap.killTweensOf(event.target); //, "x,y,scale");
						gsap.effects.cardWanderHoverOn(event.target);
					}, function handlerOut(event) {
						event.preventDefault();
						gsap.effects.cardWanderHoverOff(event.target);
					}
				);
				gsap.set("#over-layer > .tarot-card-main", {pointerEvents: "all"});
				gsap.effects.cardWander("#over-layer > .tarot-card-main");
			}
		});
	}	
}); */

const PING = (x, y, {color = "rgba(0, 255, 0, 1)", size = 20} = {}, containerID = "#debug-layer") => {
	
}

class Table {
	static Initialize() { Table._Session = new Table() }
	static Get() { return Table._Session ?? false }	
	static get Phase() { return (Table._Phase = Table._Phase ?? "Initial") }
	static set Phase(phase) {
		if (["Initial", "CardOrbit", "CardsDealt", "CardsRevealed"].includes(phase)) {
			Table._Phase = phase;
		}
	}
	static get MainCards() {
		return Object.fromEntries(
			Object.entries(Table.Get().layout)
				.map(([slot, {card}]) => [slot, card])
			);
	}

	static ReadyReading() {
		if (Table.Phase === "CardsDealt") {
			Object.values(Table.MainCards).forEach((card) => card.updateSlotStyle())
		}
	}
	static UpdateGhostText() {
		
	}

	static get DEFAULTS() {
		const {grid} = CONSTANTS;
		return {
			layout: {
				1: {card: false, shiftCard: false, pos: CONSTANTS.slotPos[1], isFaceUp: false, ghostText: false, promptText: false},
				2: {card: false, shiftCard: false, pos: CONSTANTS.slotPos[2], isFaceUp: false, ghostText: false, promptText: false},
				3: {card: false, shiftCard: false, pos: CONSTANTS.slotPos[3], isFaceUp: false, ghostText: false, promptText: false},
				4: {card: false, shiftCard: false, pos: CONSTANTS.slotPos[4], isFaceUp: false, ghostText: false, promptText: false},
				5: {card: false, shiftCard: false, pos: CONSTANTS.slotPos[5], isFaceUp: false, ghostText: false, promptText: false}
			}
		};
	};
	
	get layout() { return this._layout }
	get nextEmptySlot() {
		return [1, 2, 3, 4, 5].find((slot) => this.layout[slot].card === false);
	}
	get nextFaceDownSlot() {
		return [1, 2, 3, 4, 5].find((slot) => this.layout[slot].card && this.layout[slot].isFaceUp === false);
	}
	get deck() { return this._deck }
	get template() { return this._template ?? false }
	set template(template) {
		if (template.toLowerCase() in TEMPLATEDATA) {
			this._template = template.toLowerCase();
			for (const [slot, prompt] of Object.entries(TEMPLATEDATA[template])) {
				this.layout[slot].card.updatePromptText(prompt);
			}
		}
	}
	
	_isGhostCatValid(category) { return $(`#ghost-text-controls #${category.toLowerCase()}`)?.is(':checked') }
	get ghostCategories() { return CONSTANTS.ghostTextCategories.filter((cat) => this._isGhostCatValid(cat)) }
	
	constructor() {		
		this._initTable();
	}

	// <div id="card-1" class="tarot-card tarot-card-main">
	// <div id="card-1-shifted" class="tarot-card tarot-card-shifted">
	// <span class="ghost-text ghost-text-card-1"> (multiples)
	// <span id="card-1-title" class="tarot-card-title tarot-card-main-title">
	// <span id="card-1-shifted-title" class="tarot-card-title tarot-card-shifted-title">
	// <span id="card-1-keyword" class="tarot-card-keyword tarot-card-main-keyword">
	// <span id="card-1-shifted-keyword" class="tarot-card-keyword tarot-card-main-keyword">
	
	_resetLayout() { this._layout = Table.DEFAULTS.layout }
	_resetDeck() { this._deck = new TarotDeck() }
	_clearTable() {	$(".canvas-layer *").remove() }
	async _initTable() {
		gsap.set(".canvas-layer", {
			xPercent: -50,
			yPercent: -50,
			...CONSTANTS.slotPos[1]
		});
		this._clearTable();
		this._resetLayout();
		this._resetDeck();
		
		// Create empty spaces for cards to be dealt to
		[1, 2, 3, 4, 5].forEach((slot) => {
			const slotElem = $("<div class=\"empty-slot-bg\"></div>").appendTo("#under-layer")[0];
			gsap.set(slotElem, {
				xPercent: -50,
				yPercent: -50,
				...this.layout[slot].pos,
				scale: 1.05,
				height: CONSTANTS.card.height,
				width: CONSTANTS.card.width
			});
		});
		
		// Fade in canvas layers, but maintain lower scale for card dealing
		gsap.effects.fadeInTo65(".canvas-layer").then(() => this.deck.circleFan());
	}
}
class TarotDeck {
	static Get() { return (TarotDeck._Deck = TarotDeck._Deck ?? new TarotDeck()) }
	static GetCard(cardElem) { return TarotDeck.Get()._cards[parseInt(cardElem.dataset.cardNum)] }
	
	constructor() {
		this._deck = [
			// Gather Major Arcana
			...TAROTDATA["major-arcana"],
			// Gather Minor Arcana
			...["crescents", "eyes", "hourglasses", "roses", "skulls"]
				.map((suit) => TAROTDATA["minor-arcana"][suit].slice(1))
				.flat()			
		];
		if (DEBUG.isLimitingDeckSize > 0) {
			deck = deck.slice(0, DEBUG.isLimitingDeckSize);
		}
		TarotDeck._Deck = this;
	}
	
	get table() { return Table.Get() }
	get layout() { return this.table.layout }
	get cards() { return (this._cards = this._cards ?? this._shuffleDeck()) }
	
	_shuffleDeck() {
		return shuffle(this._deck)
			.map((cardData, cardNum, deck) => new TarotCard(cardData, cardNum, {
				x: this.layout[1].pos.x + (cardNum * CONSTANTS.deckOffset / deck.length),
				y: this.layout[1].pos.y + (cardNum * CONSTANTS.deckOffset / deck.length)
			}));
	}
	
	circleFan() {
		gsap.effects.cardOrbitRotation();
		gsap.effects.dealCircleFan();
		Table.Phase = "CardOrbit";
	}

	deal(cardElem) {
		const card = TarotDeck.GetCard(cardElem);
		const slot = this.table.nextEmptySlot;
		if (slot) {
			this.layout[slot].card = card;
			card.slot = slot;
			const cardState = Flip.getState(cardElem, "outlineColor,outlineWidth");
			gsap.set("#control-layer", {zIndex: 100});
			$(cardElem).appendTo("#control-layer");
			gsap.set(cardElem, {
				rotation: 0,
				scale: 1,
				boxShadow: "rgb(255 166 33) 0px 0px 0px",
				...Table.Get().layout[slot].pos
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
						gsap.set("#control-layer", {zIndex: null});
						gsap.killTweensOf(".canvas-layer");
						gsap.effects.explodeOutOverLayer() }
				}
			});
		}
	}
}
class TarotCard {
	constructor(cardData, cardNum, {x, y, slot, ...params} = {}) {
		this._data = cardData;
		this.cardNum = cardNum;
		this.height = CONSTANTS.card.height;
		this.width = CONSTANTS.card.width;
		this._cardBack = getImgCSS(`card-back-${gsap.utils.random([1, 2, 3, 4])}.webp`);
		if (slot) {
			this.slot = slot;
		} else if (x && y) {
			this.x = x;
			this.y = y;
		}
		this._cardElem = $(`<div class="tarot-card tarot-card-main" data-card-num="${this.cardNum}"></div>`).appendTo("#over-layer")[0];
		gsap.set(this.cardElem, {
			xPercent: -50,
			yPercent: -50,
			x: this.x,
			y: this.y,
			height: this.height,
			width: this.width,
			background: this.image,
			...params
		});
	}
	
	get cardElem() { return this._cardElem ?? false }
	get slot() { return this._slot }
	set slot(slotNum) { 
		this._slot = slotNum;
		this.x = Table.Get().layout[slotNum].pos.x;
		this.y = Table.Get().layout[slotNum].pos.y;
	}
	get image() { 
		if (this.isFaceUp) {
			return getImgCSS(this._data.imgfile);
		} else {
			return this._cardBack;
		}
	}
	get isFaceUp() { return Table.Get().layout[this.slot]?.isFaceUp }
	set isFaceUp(v) {
		Table.Get().layout[this.slot].isFaceUp = Boolean(v);
	}
	get numSlotsBehind() { 
		if (this.isFaceUp || !Table.Get().nextFaceDownSlot) {
			return 0;
		} else {
			return Math.max(0, this.slot - Table.Get().nextFaceDownSlot)
		}
	}
	get slotOpacity() { return CONSTANTS.slotStyles[this.numSlotsBehind].opacity }
		
	updateSlotStyle() {
		gsap.to(this.cardElem, {
			duration: 1,
			ease: "expo",
			...CONSTANTS.slotStyles[this.numSlotsBehind]
		});
		if (this.slot === Table.Get().nextFaceDownSlot) {
			$(this.cardElem).click(this.flip.bind(this));
			$(this.cardElem).hover(this.glowOn.bind(this), this.glowOff.bind(this));
		}
	}
	
	flip(event) {
		if (Table.Phase === "CardsDealt" && this.slot === Table.Get().nextFaceDownSlot) {
			event.preventDefault();
			// $(this.cardElem).off("click mouseenter");
			this.isFaceUp = true;
			gsap.to(this.cardElem, {
				duration: 0,
				ease: "circ",
				background: this.image
			});
			Object.values(Table.MainCards).forEach((card) => card.updateSlotStyle());
			Table.UpdateGhostText();
			if (this.slot === 5) {
				gsap.to("#card-layer", {
					x: `-=${Table.Get().layout[2].pos.x - 0.5 * CONSTANTS.card.width - CONSTANTS.padding.x}px`,
					duration: 2,
					ease: "expo4"
				});
			}
		}
	}
	
	glowOn(event) {
		if (["CardsDealt", "CardsRevealed"].includes(Table.Phase)) {
			if (this.isFaceUp) {
				event.preventDefault();
				gsap.set("#card-layer", {overflow: "hidden"});
				gsap.set(this.cardElem, {zIndex: 1000});
				gsap.to(this.cardElem, {
					duration: 0.5,
					ease: "power4.inOut",
					scale: 3,
					// ...CONSTANTS.slotPos[1]
				});
			} else if (this.slot === Table.Get().nextFaceDownSlot) {
				event.preventDefault();
				gsap.to(
					[1, 2, 3, 4, 5].slice(Table.Get().nextFaceDownSlot)
						.map((slot) => Table.MainCards[slot].cardElem),
					{
						duration: 0.5,
						ease: "expo",
						opacity: 0.1 // function(i) { return 0.5 * CONSTANTS.slotStyles[i + 1].opacity }			
					}
				);
				gsap.to(this.cardElem, {
					duration: 0.5,
					ease: "power4.inOut",
					boxShadow: "rgb(0 255 0) 0px 0px 30px",
					scale: 1.2
				});
			}
		}
	}
	
	glowOff(event) {
		if (["CardsDealt", "CardsRevealed"].includes(Table.Phase)) {
			event.preventDefault();
			gsap.set("#card-layer", {overflow: "visible"});
			gsap.set("#card-layer > .tarot-card", {zIndex: null});
			gsap.to(Object.values(Table.MainCards).map((card) => card.cardElem), {
				duration: 0.5,
				ease: "power4.inOut",
				boxShadow: "rgb(0 255 0) 0px 0px 0px",
				scale: 1,
				opacity: function(i) { return Table.MainCards[i + 1].slotOpacity },
				// x: function(i) { return CONSTANTS.slotPos[i + 1].x },
				// y: function(i) { return CONSTANTS.slotPos[i + 1].y }
			});
		}
	}

}

$(document).ready(() => {
	Table.Initialize();
	console.log({
		gsap,
		Draggable,
		Flip,
		Table,
		TarotDeck,
		TarotCard
	});
});