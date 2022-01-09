const fs = require("fs");

const readTSVFile = () => {
	const [fileName] = fs.readdirSync("./").filter((fn) => /\.tsv$/.test(fn));
	if (fileName) {
		return fs.readFileSync(`./${fileName}`).toString().replace(/\r/g, "");
	}
	return false;
};

const TSVDATA = readTSVFile();

if (TSVDATA) {
	const [headerLine, ...tsvLines] = TSVDATA.split(/\n/);

	const headers = headerLine.split(/\t/);

	const tsvEntries = tsvLines.map((line) => Object.fromEntries(line
		.split(/\t/)
		.map((cell, i) => [headers[i], cell])));

	const tarotEntries = [];
	for (const cardData of tsvEntries) {
		const {imgfile} = cardData;
		delete cardData.imgfile;
		cardData.ghostText = {};
		cardData.value = parseInt(cardData.value);
		["individual", "location", "organization", "situation", "creature", "item"].forEach((cat) => {
			cardData.ghostText[cat] = cardData[`gt-${cat}`] ? cardData[`gt-${cat}`].split(/\|/) : [];
			delete cardData[`gt-${cat}`];
		});
		cardData.isDrawingShiftCard = cardData.affiliation === "Divine";
		cardData.imgfile = imgfile;
	}

	const TAROTDATA = {
		"major-arcana": tsvEntries.filter(({arcana}) => arcana === "Major"),
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
		"minor-arcana": {}
	};

	for (const suit of Object.keys(TAROTDATA.suits)) {
		TAROTDATA["minor-arcana"][suit] = tsvEntries.filter(({affiliation}) => affiliation.toLowerCase() === suit);
	}

	console.log(JSON.stringify(TAROTDATA, null, 2));
} else {
	console.error("Error reading .tsv file.");
}
