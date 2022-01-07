/* eslint-disable object-property-newline, array-element-newline, sort-keys */

// ████████ IMPORTS ████████
import {gsap, Draggable, Flip, MotionPathPlugin} from "./external/greensock/all.js";
import C from "./constants.js";

// ████████ CONFIGURATION ████████
const CONFIG = {
	globalContainerSelector: "body"
};

// ▮▮▮▮▮▮▮[HELPERS] Internal Functions, Data & References Used by Utility Functions ▮▮▮▮▮▮▮
const _noCapWords = [ // Regexp tests that should not be capitalized when converting to title case.
	"above", "after", "at", "below", "by", "down", "for", "from", "in", "onto", "of", "off", "on", "out",
	"to", "under", "up", "with", "for", "and", "nor", "but", "or", "yet", "so", "the", "an", "a"
].map((word) => new RegExp(`\\b${word}\\b`, "gui"));
const _capWords = [ // Words that should always be capitalized when converting to sentence case.
	"I", /[^a-z]{3,}|[\.0-9]/gu
].map((word) => (/RegExp/.test(Object.prototype.toString.call(word)) ? word : new RegExp(`\\b${word}\\b`, "gui")));
const _loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies 
nibh sed massa euismod lacinia. Aliquam nec est ac nunc ultricies scelerisque porta vulputate odio. 
Integer gravida mattis odio, semper volutpat tellus. Ut elit leo, auctor eget fermentum hendrerit, 
aliquet ac nunc. Suspendisse porta turpis vitae mi posuere molestie. Cras lectus lacus, vulputate a 
vestibulum in, mattis vel mi. Mauris quis semper mauris. Praesent blandit nec diam eget tincidunt. Nunc 
aliquet consequat massa ac lacinia. Ut posuere velit sagittis, vehicula nisl eget, fringilla nibh. Duis 
volutpat mattis libero, a porttitor sapien viverra ut. Phasellus vulputate imperdiet ligula, eget 
eleifend metus tempor nec. Nam eget sapien risus. Praesent id suscipit elit. Sed pellentesque ligula 
diam, non aliquet magna feugiat vitae. Pellentesque ut tortor id erat placerat dignissim. Pellentesque 
ut dui vel leo laoreet sodales nec ac tellus. In hac habitasse platea dictumst. Proin sed ex sed augue 
sollicitudin interdum. Sed id lacus porttitor nisi vestibulum tincidunt. Nulla facilisi. Vestibulum 
feugiat finibus magna in pretium. Proin consectetur lectus nisi, non commodo lectus tempor et. Cras 
viverra, mi in consequat aliquet, justo mauris fringilla tellus, at accumsan magna metus in eros. Sed 
vehicula, diam ut sagittis semper, purus massa mattis dolor, in posuere.`;
const _randomWords = [ // A collection of random words for various debugging purposes.
	"aboveboard", "account", "achiever", "acoustics", "act", "action", "activity", "actor", "addition", "adjustment",
	"advertisement", "advice", "afterglow", "afterimage", "afterlife", "aftermath", "afternoon", "afterthought",
	"agreement", "air", "aircraft", "airfield", "airlift", "airline", "airmen", "airplane", "airport", "airtime", "alarm",
	"allover", "allspice", "alongside", "also", "amount", "amusement", "anger", "angle", "animal", "another", "ants",
	"anyhow", "anymore", "anyone", "anyplace", "anytime", "anywhere", "apparatus", "apparel", "appliance", "approval",
	"arch", "argument", "arithmetic", "arm", "army", "around", "art", "ashtray", "attack", "attraction", "aunt",
	"authority", "babies", "baby", "babysitter", "back", "backache", "backbone", "backbreaker", "backdrop", "backfire",
	"background", "backhand", "backlash", "backlog", "backpack", "backside", "backslap", "backslide", "backspace",
	"backspin", "backstroke", "backtrack", "backward", "badge", "bag", "bait", "balance", "ball", "ballroom", "bankbook",
	"bankroll", "base", "baseball", "basin", "basket", "basketball", "bat", "bath", "battle", "beachcomb", "bead", "bear",
	"because", "become", "bed", "bedrock", "bedroll", "bedroom", "beds", "bee", "beef", "beginner", "behavior", "belief",
	"believe", "bell", "bellboy", "bellhop", "bells", "below", "berry", "bike", "bikes", "bird", "birds", "birth",
	"birthday", "bit", "bite", "blackball", "blackberries", "blackbird", "blackboard", "blackjack", "blacklist",
	"blackmail", "blackout", "blacksmith", "blacktop", "blade", "blood", "blow", "blowgun", "bluebell", "blueberry",
	"bluebird", "bluefish", "bluegrass", "blueprint", "board", "boardwalk", "boat", "bodyguard", "bomb", "bone", "book",
	"bookcase", "bookend", "bookkeeper", "bookmark", "bookmobile", "books", "bookseller", "bookshelf", "bookworm", "boot",
	"border", "bottle", "boundary", "bowlegs", "bowtie", "box", "boy", "brainchild", "brake", "branch", "brass", "breath",
	"brick", "bridge", "brother", "bubble", "bucket", "bugspray", "building", "bulb", "burst", "bushes", "business",
	"butter", "butterball", "buttercup", "butterfingers", "buttermilk", "butternut", "butterscotch", "button", "bypass",
	"cabbage", "cabdriver", "cable", "cactus", "cake", "cakes", "calculator", "calendar", "camera", "camp", "can",
	"cancan", "candlelight", "candlestick", "cannon", "cannot", "canvas", "cap", "caption", "car", "card", "cardsharp",
	"care", "carefree", "careworn", "carfare", "carload", "carpenter", "carpool", "carport", "carriage", "cars",
	"carsick", "cart", "cartwheel", "cast", "cat", "cats", "cattle", "catwalk", "cause", "cave", "caveman", "celery",
	"cellar", "cemetery", "cent", "centercut", "chalk", "chance", "change", "channel", "cheese", "cheeseburger",
	"cherries", "cherry", "chess", "chicken", "chickens", "children", "chin", "church", "circle", "clam", "class",
	"clockwise", "cloth", "clover", "club", "coach", "coal", "coast", "coat", "cobweb", "coffeemaker", "coil", "collar",
	"color", "comeback", "committee", "commonplace", "commonwealth", "company", "comparison", "competition", "condition",
	"connection", "control", "cook", "copper", "corn", "cornmeal", "cough", "country", "courthouse", "cover", "cow",
	"cows", "crack", "cracker", "crate", "crayon", "cream", "creator", "creature", "credit", "crewcut", "crib", "crime",
	"crook", "crossbow", "crossbreed", "crosscut", "crossover", "crosswalk", "crow", "crowd", "crown", "cub", "cup",
	"current", "curtain", "curve", "cushion", "dad", "dairymaid", "daisywheel", "daughter", "day", "daybed", "daybook",
	"daybreak", "daydream", "daylight", "daytime", "deadend", "deadline", "death", "debt", "decision", "deer", "degree",
	"design", "desire", "desk", "destruction", "detail", "development", "digestion", "dime", "dinner", "dinosaurs",
	"direction", "dirt", "discovery", "discussion", "dishcloth", "dishpan", "dishwasher", "dishwater", "diskdrive",
	"distance", "distribution", "division", "dock", "doctor", "dog", "dogs", "doll", "dolls", "donkey", "door",
	"doorstop", "downtown", "downunder", "drain", "drawbridge", "drawer", "dress", "drink", "driveway", "driving", "drop",
	"duck", "duckbill", "duckpin", "ducks", "dust", "ear", "earache", "earring", "earth", "earthquake", "earthward",
	"earthworm", "edge", "education", "effect", "egg", "egghead", "eggnog", "eggs", "eggshell", "elbow", "end", "engine",
	"error", "event", "everything", "example", "exchange", "existence", "expansion", "experience", "expert", "eye",
	"eyeballs", "eyecatching", "eyeglasses", "eyelash", "eyelid", "eyes", "eyesight", "eyewitness", "face", "fact",
	"fairies", "fall", "fang", "farm", "fatherland", "fear", "feeling", "field", "finger", "fire", "fireball", "fireboat",
	"firebomb", "firebreak", "firecracker", "firefighter", "firehouse", "fireman", "fireproof", "fireworks", "fish",
	"fishbowl", "fisherman", "fisheye", "fishhook", "fishmonger", "fishnet", "fishpond", "fishtail", "flag", "flame",
	"flavor", "flesh", "flight", "flock", "floor", "flower", "flowers", "fly", "fog", "fold", "food", "foot", "football",
	"foothill", "footlights", "footlocker", "footprints", "forbearer", "force", "forearm", "forebear", "forebrain",
	"forecast", "foreclose", "foreclosure", "foredoom", "forefather", "forefeet", "forefinger", "forefoot", "forego",
	"foregone", "forehand", "forehead", "foreknowledge", "foreleg", "foreman", "forepaws", "foresee", "foreshadow",
	"forestall", "forethought", "foretold", "forever", "forewarn", "foreword", "forget", "fork", "forklift", "form",
	"fowl", "frame", "friction", "friend", "friends", "frog", "frogs", "front", "fruit", "fruitcup", "fuel", "furniture",
	"gate", "gearshift", "geese", "ghost", "giants", "giraffe", "girl", "girls", "glass", "glassmaking", "glove", "gold",
	"goodbye", "goodnight", "government", "governor", "grade", "grain", "grandaunt", "granddaughter", "grandfather",
	"grandmaster", "grandmother", "grandnephew", "grandparent", "grandson", "grandstand", "granduncle", "grape", "grass",
	"grassland", "graveyard", "grip", "ground", "group", "growth", "guide", "guitar", "gumball", "gun", "hair", "haircut",
	"hall", "hamburger", "hammer", "hand", "handbook", "handgun", "handmade", "handout", "hands", "harbor", "harmony",
	"hat", "hate", "head", "headache", "headlight", "headline", "headquarters", "health", "heat", "hereafter", "hereby",
	"herein", "hereupon", "highchair", "highland", "highway", "hill", "himself", "history", "hobbies", "hole", "holiday",
	"home", "homemade", "hometown", "honey", "honeybee", "honeydew", "honeysuckle", "hook", "hookup", "hope", "horn",
	"horse", "horseback", "horsefly", "horsehair", "horseman", "horseplay", "horsepower", "horseradish", "horses", "hose",
	"hospital", "hot", "hour", "house", "houseboat", "household", "housekeeper", "houses", "housetop", "however", "humor",
	"hydrant", "ice", "icicle", "idea", "impulse", "income", "increase", "industry", "ink", "insect", "inside",
	"instrument", "insurance", "intake", "interest", "invention", "iron", "island", "itself", "jail", "jailbait", "jam",
	"jar", "jeans", "jelly", "jellybean", "jellyfish", "jetliner", "jetport", "jewel", "join", "judge", "juice", "jump",
	"jumpshot", "kettle", "key", "keyboard", "keyhole", "keynote", "keypad", "keypunch", "keystone", "keystroke",
	"keyword", "kick", "kiss", "kittens", "kitty", "knee", "knife", "knot", "knowledge", "laborer", "lace", "ladybug",
	"lake", "lamp", "land", "language", "laugh", "leather", "leg", "legs", "letter", "letters", "lettuce", "level",
	"library", "lifeblood", "lifeguard", "lifelike", "lifeline", "lifelong", "lifetime", "lifework", "limelight",
	"limestone", "limit", "line", "linen", "lip", "liquid", "loaf", "lock", "locket", "longhand", "look", "loss", "love",
	"low", "lukewarm", "lumber", "lunch", "lunchroom", "machine", "magic", "maid", "mailbox", "mainline", "man", "marble",
	"mark", "market", "mask", "mass", "match", "matchbox", "meal", "meantime", "meanwhile", "measure", "meat", "meeting",
	"memory", "men", "metal", "mice", "middle", "milk", "mind", "mine", "minister", "mint", "minute", "mist", "mitten",
	"mom", "money", "monkey", "month", "moon", "moonbeam", "moonlight", "moonlit", "moonscape", "moonshine", "moonstruck",
	"moonwalk", "moreover", "morning", "mother", "motion", "motorcycle", "mountain", "mouth", "move", "muscle", "name",
	"nation", "nearby", "neck", "need", "needle", "nerve", "nest", "nevermore", "newsboy", "newsbreak", "newscaster",
	"newsdealer", "newsletter", "newsman", "newspaper", "newsprint", "newsreel", "newsroom", "night", "nightfall",
	"nobody", "noise", "noisemaker", "north", "northeast", "nose", "note", "notebook", "nowhere", "number", "nursemaid",
	"nut", "nutcracker", "oatmeal", "observation", "ocean", "offer", "office", "oil", "oneself", "onetime", "orange",
	"oranges", "order", "oven", "overboard", "overcoat", "overflow", "overland", "pacemaker", "page", "pail", "pan",
	"pancake", "paper", "parcel", "part", "partner", "party", "passbook", "passenger", "passkey", "Passover", "passport",
	"payment", "peace", "pear", "pen", "pencil", "peppermint", "person", "pest", "pet", "pets", "pickle", "pickup",
	"picture", "pie", "pies", "pig", "pigs", "pin", "pinhole", "pinstripe", "pinup", "pinwheel", "pipe", "pizzas",
	"place", "plane", "planes", "plant", "plantation", "plants", "plastic", "plate", "play", "playback", "playground",
	"playhouse", "playthings", "pleasure", "plot", "plough", "pocket", "point", "poison", "pollution", "ponytail",
	"popcorn", "porter", "position", "postcard", "pot", "potato", "powder", "power", "price", "produce", "profit",
	"property", "prose", "protest", "pull", "pump", "punishment", "purpose", "push", "quarter", "quartz", "queen",
	"question", "quicksand", "quiet", "quill", "quilt", "quince", "quiver", "rabbit", "rabbits", "racquetball", "rail",
	"railroad", "railway", "rain", "raincheck", "raincoat", "rainstorm", "rainwater", "rake", "range", "rat", "rate",
	"rattlesnake", "rattletrap", "ray", "reaction", "reading", "reason", "receipt", "recess", "record", "regret",
	"relation", "religion", "repairman", "representative", "request", "respect", "rest", "reward", "rhythm", "rice",
	"riddle", "rifle", "ring", "rings", "river", "riverbanks", "road", "robin", "rock", "rod", "roll", "roof", "room",
	"root", "rose", "route", "rub", "rubberband", "rule", "run", "sack", "sail", "sailboat", "salesclerk", "salt", "sand",
	"sandlot", "sandstone", "saucepan", "scale", "scapegoat", "scarecrow", "scarf", "scene", "scent", "school",
	"schoolbook", "schoolboy", "schoolbus", "schoolhouse", "science", "scissors", "screw", "sea", "seashore", "seat",
	"secretary", "seed", "selection", "self", "sense", "servant", "shade", "shadyside", "shake", "shame", "shape",
	"sharecropper", "sharpshooter", "sheep", "sheepskin", "sheet", "shelf", "ship", "shirt", "shock", "shoe", "shoelace",
	"shoemaker", "shoes", "shop", "shortbread", "show", "showoff", "showplace", "side", "sidekick", "sidewalk", "sign",
	"silk", "silver", "silversmith", "sink", "sister", "sisterhood", "sisters", "sixfold", "size", "skate", "skateboard",
	"skin", "skintight", "skirt", "sky", "skylark", "skylight", "slave", "sleep", "sleet", "slip", "slope", "slowdown",
	"slumlord", "smash", "smell", "smile", "smoke", "snail", "snails", "snake", "snakes", "snakeskin", "sneeze", "snow",
	"snowball", "snowbank", "snowbird", "snowdrift", "snowshovel", "soap", "society", "sock", "soda", "sofa", "softball",
	"somebody", "someday", "somehow", "someone", "someplace", "something", "sometimes", "somewhat", "somewhere", "son",
	"song", "songs", "sort", "sound", "soundproof", "soup", "southeast", "southwest", "soybean", "space", "spacewalk",
	"spade", "spark", "spearmint", "spiders", "spillway", "spokesperson", "sponge", "spoon", "spot", "spring", "spy",
	"square", "squirrel", "stage", "stagehand", "stamp", "standby", "standoff", "standout", "standpoint", "star",
	"starfish", "start", "statement", "station", "steam", "steamship", "steel", "stem", "step", "stepson", "stew",
	"stick", "sticks", "stitch", "stocking", "stockroom", "stomach", "stone", "stop", "stoplight", "stopwatch", "store",
	"story", "stove", "stranger", "straw", "stream", "street", "stretch", "string", "stronghold", "structure",
	"substance", "subway", "sugar", "suggestion", "suit", "summer", "sun", "sunbaked", "sunbathe", "sundial", "sundown",
	"sunfish", "sunflower", "sunglasses", "sunlit", "sunray", "sunroof", "sunup", "supercargo", "supercharge",
	"supercool", "superego", "superfine", "supergiant", "superhero", "superhighways", "superhuman", "superimpose",
	"supermarket", "supermen", "supernatural", "superpower", "superscript", "supersensitive", "supersonic", "superstar",
	"superstrong", "superstructure", "supertanker", "superweapon", "superwoman", "support", "surprise", "sweater",
	"sweetheart", "sweetmeat", "swim", "swing", "system", "table", "tablecloth", "tablespoon", "tabletop", "tableware",
	"tail", "tailcoat", "tailgate", "taillight", "taillike", "tailpiece", "tailspin", "takeoff", "takeout", "takeover",
	"talebearer", "taleteller", "talk", "tank", "tapeworm", "taproom", "taproot", "target", "taskmaster", "taste", "tax",
	"taxicab", "taxpayer", "teaching", "teacup", "team", "teammate", "teamwork", "teapot", "teaspoon", "teenager",
	"teeth", "telltale", "temper", "tendency", "tenderfoot", "tenfold", "tent", "territory", "test", "textbook",
	"texture", "theory", "therefore", "thing", "things", "thought", "thread", "thrill", "throat", "throne", "throwaway",
	"throwback", "thumb", "thunder", "thunderbird", "thunderstorm", "ticket", "tiger", "time", "timekeeper", "timesaving",
	"timeshare", "timetable", "tin", "title", "toad", "toe", "toes", "together", "tomatoes", "tongue", "toolbox", "tooth",
	"toothbrush", "toothpaste", "toothpick", "top", "touch", "touchdown", "town", "township", "toy", "toys", "trade",
	"trail", "train", "trains", "tramp", "transport", "tray", "treatment", "tree", "trees", "trick", "trip", "trouble",
	"trousers", "truck", "trucks", "tub", "turkey", "turn", "turnabout", "turnaround", "turnbuckle", "turndown",
	"turnkey", "turnoff", "turntable", "twig", "twist", "typewriter", "umbrella", "uncle", "underachieve", "underage",
	"underarm", "underbelly", "underbid", "undercharge", "underclothes", "undercover", "undercut", "underdevelop",
	"underestimate", "underexpose", "underfoot", "underground", "underwear", "unit", "upbeat", "upbringing", "upcoming",
	"update", "upend", "upgrade", "upheaval", "uphill", "uphold", "upkeep", "upland", "uplift", "upload", "upmarket",
	"upon", "uppercase", "upperclassman", "uppercut", "uproar", "uproot", "upset", "upshot", "upside", "upstage",
	"upstairs", "upstanding", "upstart", "upstate", "upstream", "uptake", "upthrust", "uptight", "uptime", "uptown",
	"upward", "upwind", "use", "vacation", "value", "van", "vase", "vegetable", "veil", "vein", "verse", "vessel", "vest",
	"view", "visitor", "voice", "volcano", "volleyball", "voyage", "waistline", "walk", "walkways", "wall", "walleyed",
	"wallpaper", "war", "wardroom", "warfare", "warmblooded", "warpath", "wash", "washbowl", "washcloth", "washhouse",
	"washout", "washrag", "washroom", "washstand", "washtub", "waste", "wastebasket", "wasteland", "wastepaper",
	"wastewater", "watch", "watchband", "watchdog", "watchmaker", "watchman", "watchtower", "watchword", "water",
	"watercolor", "watercooler", "watercraft", "waterfall", "waterfront", "waterline", "waterlog", "watermelon",
	"waterpower", "waterproof", "waterscape", "watershed", "waterside", "waterspout", "watertight", "wave", "wavelike",
	"waves", "wax", "waxwork", "way", "waybill", "wayfarer", "waylaid", "wayside", "wayward", "wealth", "weather",
	"weathercock", "weatherman", "weatherproof", "week", "weekday", "weekend", "weeknight", "weight", "whatever",
	"whatsoever", "wheel", "wheelchair", "wheelhouse", "whip", "whistle", "whitecap", "whitefish", "whitewall",
	"whitewash", "widespread", "wilderness", "wind", "window", "wine", "wing", "winter", "wipeout", "wire", "wish",
	"without", "woman", "women", "wood", "woodshop", "wool", "word", "work", "worm", "wound", "wren", "wrench", "wrist",
	"writer", "writing", "yak", "yam", "yard", "yarn", "year", "yoke", "zebra", "zephyr", "zinc", "zipper", "zoo"
];
const _numberWords = {
	ones: [
		"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
		"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
		"twenty"
	],
	tens: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
	tiers: ["", "thousand", "m-", "b-", "tr-", "quadr-", "quint-", "sext-", "sept-", "oct-", "non-"]
		.map((prefix) => prefix.replace(/-$/, "illion")),
	bigPrefixes: ["", "un", "duo", "tre", "quattuor", "quin", "sex", "octo", "novem"],
	bigSuffixes: ["", "dec", "vigint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octogint", "nonagint", "cent"]
		.map((prefix) => (prefix ? `${prefix}illion` : ""))
};
const _ordinals = {
	zero: "zeroeth", one: "first", two: "second", three: "third", four: "fourth", five: "fifth", eight: "eighth", nine: "ninth", twelve: "twelfth",
	twenty: "twentieth", thirty: "thirtieth", forty: "fortieth", fifty: "fiftieth", sixty: "sixtieth", seventy: "seventieth", eighty: "eightieth", ninety: "ninetieth"
};
const _romanNumerals = {
	grouped: [
		["", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ"],
		["", "Ⅹ", "ⅩⅩ", "ⅩⅩⅩ", "ⅩⅬ", "Ⅼ", "ⅬⅩ", "ⅬⅩⅩ", "ⅬⅩⅩⅩ", "ⅩⅭ"],
		["", "Ⅽ", "ⅭⅭ", "ⅭⅭⅭ", "ⅭⅮ", "Ⅾ", "ⅮⅭ", "ⅮⅭⅭ", "ⅮⅭⅭⅭ", "ⅭⅯ"],
		["", "Ⅿ", "ⅯⅯ", "ⅯⅯⅯ", "Ⅿↁ", "ↁ", "ↁⅯ", "ↁⅯⅯ", "ↁⅯⅯⅯ", "ↁↂ"],
		["", "ↂ", "ↂↂ", "ↂↂↂ", "ↂↇ", "ↇ", "ↇↂ", "ↇↂↂ", "ↇↂↂↂ", "ↇↈ"],
		["", "ↈ", "ↈↈ", "ↈↈↈ"]
	],
	ungrouped: [
		["", "Ⅰ", "ⅠⅠ", "ⅠⅠⅠ", "ⅠⅤ", "Ⅴ", "ⅤⅠ", "ⅤⅠⅠ", "ⅤⅠⅠⅠ", "ⅠⅩ"],
		["", "Ⅹ", "ⅩⅩ", "ⅩⅩⅩ", "ⅩⅬ", "Ⅼ", "ⅬⅩ", "ⅬⅩⅩ", "ⅬⅩⅩⅩ", "ⅩⅭ"],
		["", "Ⅽ", "ⅭⅭ", "ⅭⅭⅭ", "ⅭⅮ", "Ⅾ", "ⅮⅭ", "ⅮⅭⅭ", "ⅮⅭⅭⅭ", "ⅭⅯ"],
		["", "Ⅿ", "ⅯⅯ", "ⅯⅯⅯ", "Ⅿↁ", "ↁ", "ↁⅯ", "ↁⅯⅯ", "ↁⅯⅯⅯ", "ↁↂ"],
		["", "ↂ", "ↂↂ", "ↂↂↂ", "ↂↇ", "ↇ", "ↇↂ", "ↇↂↂ", "ↇↂↂↂ", "ↇↈ"],
		["", "ↈ", "ↈↈ", "ↈↈↈ"]
	]
};
const _parseSearchFunc = (obj, searchFunc) => {
	// Transforms a variety of values into a search/test function for use with utility object and array functions.
	// Can include regexp patterns, element indices, key names, functions, or the strings "first", "last" and "random".
	const [objType, funcType] = [obj, searchFunc].map(getType);
	if (["list", "array"].includes(objType)) {
		if (funcType === "function") { return searchFunc }
		if (objType === "list" && searchFunc in obj) { return ([key]) => key === searchFunc }
		if (funcType === "regexp") {
			if (objType === "list") { return ([, val]) => searchFunc.test(val) }
			return (val) => searchFunc.test(val);
		}
		if (funcType === "int") {
			if (objType === "list") { return ([, val]) => val === Object.values(obj)[pInt(searchFunc)] }
			return (elem, i) => (i = pInt(searchFunc));
		}
		if (["first", "last", "random"].includes(searchFunc)) {
			return _parseSearchFunc(obj, {
				first: 0,
				last: Object.values(obj).length - 1,
				random: Math.floor(Math.random() * Object.values(obj).length)
			}[searchFunc]);
		}
		searchFunc = JSON.stringify(searchFunc);
		if (objType === "list") { return ([, val]) => JSON.stringify(val) === searchFunc }
		return (val) => JSON.stringify(val) === searchFunc;
	}
	return searchFunc;
};

// ████████ TYPES: Type Checking, Validation, Conversion, Casting ████████
const getType = (ref) => {
	const baseType = Object.prototype.toString.call(ref).slice(8, -1).toLowerCase();
	if (baseType === "number") {
		if (isNaN(ref)) { return "nan" }
		return /\./.test(`${ref}`) ? "float" : "int";
	} else if (/function$/.test(baseType)) {
		return /^class/.test(String(ref)) ? "class" : "function";
	}
	return baseType;
};
const isNumber = (ref, isStringOk = false) => ["int", "float"].includes(getType(isStringOk ? parseFloat(ref) : ref));
const isPosInt = (ref) => getType(ref) === "int" && ref >= 0;
const isIterable = (ref) => !["null", "undefined"].includes(getType(ref)) && typeof ref[Symbol.iterator] === "function";
const isUndefined = (ref) => getType(ref) === "undefined";
const isHTMLCode = (ref) => getType(ref) === "string" && /^<.*>$/u.test(ref);
const hasItems = (ref) => {
	ref = getType(ref) === "list" ? Object.keys(ref) : ref;
	return isIterable(ref) && Array.from(ref).length > 0;
};
const areEqual = (...refs) => {
	function checkEquality(ref1, ref2) {
		const [type1, type2] = [getType(ref1), getType(ref2)];
		if (type1 === type2) {
			switch (type1) {
				case "null": case "string": case "number": case "boolean": {
					return ref1 === ref2;
				}
				// case "array": case "set": case "list": {
				//   return _.isEqual(ref1, ref2);
				// }
				default: {
					try {
						return JSON.stringify(ref1) === JSON.stringify(ref2);
					} catch {
						return false;
					}
				}
			}
		}
		return false;
	}
	let ref = refs.pop();
	while (refs.length) {
		if (checkEquality(ref, refs[0])) {
			ref = refs.pop();
		} else {
			return false;
		}
	}
	return true;
};
const pFloat = (ref, sigDigits, isStrict = false) => {
	ref = parseFloat(ref);
	sigDigits = parseInt(sigDigits);
	if (isNaN(ref)) { return isStrict ? NaN : 0.0 }
	if (isPosInt(sigDigits)) {
		ref = Math.round(ref * (10 ** sigDigits)) / 10 ** sigDigits;
	}
	return ref;
};
const pInt = (ref, isStrict = false) => {
	ref = pFloat(ref, 0, isStrict);
	return isNaN(ref) ? NaN : Math.round(ref);
};
const radToDeg = (rad, isConstrained = true) => {
	rad = isConstrained ? rad % (2 * Math.PI) : rad;
	rad *= 180 / Math.PI;
	return rad;
};
const degToRad = (deg, isConstrained = true) => {
	deg = isConstrained ? deg % 360 : deg;
	deg *= Math.PI / 180;
	return deg;
};

// ████████ STRINGS: String Parsing, Manipulation, Conversion, Regular Expressions ████████

// ░░░░░░░[Case Conversion]░░░░ Upper, Lower, Sentence & Title Case ░░░░░░░
const uCase = (str) => `${str ?? ""}`.toUpperCase();
const lCase = (str) => `${str ?? ""}`.toLowerCase();
const sCase = (str) => {
	let [first, ...rest] = `${str ?? ""}`.split(/\s+/);
	first = testRegExp(first, _capWords) ? first : `${uCase(first.charAt(0))}${lCase(first.slice(1))}`;
	if (hasItems(rest)) {
		rest = rest.map((word) => (testRegExp(word, _capWords) ? word : lCase(word)));
	}
	return [first, ...rest].join(" ").trim();
};
const tCase = (str) => `${str ?? ""}`.split(/\s/)
	.map((word, i) => (i && testRegExp(word, _noCapWords) ? lCase(word) : sCase(word)))
	.join(" ").trim();

// ░░░░░░░[RegExp]░░░░ Regular Expressions ░░░░░░░ ~
const testRegExp = (str, patterns = [], flags = "gui", isTestingAll = false) => patterns.map(
	(pattern) => (getType(pattern) === "regexp"
		? pattern
		: new RegExp(pattern, flags))
)[isTestingAll ? "every" : "some"]((pattern) => pattern.test(str));
const regExtract = (ref, pattern, flags = "u") => {
	pattern = new RegExp(pattern, flags.replace(/g/g, ""));
	const isGrouping = /[)(]/.test(pattern.toString());
	const matches = ref.match(pattern) || [];
	return isGrouping ? matches.slice(1) : matches.pop();
};

// ░░░░░░░[Formatting]░░░░ Hyphenation, Pluralization, "a"/"an" Fixing ░░░░░░░
const parseArticles = (str) => `${str}`.replace(/\b(a|A)\s([aeiouAEIOU])/gu, "$1n $2");
const pluralize = (singular, num, plural) => {
	if (pFloat(num) === 1) { return singular }
	return plural ?? `${singular.replace(/y$/, "ie").replace(/s$/, "se")}s`;
};
const oxfordize = (items, useOxfordComma = true) => {
	const lastItem = items.pop();
	return [
		items.join(", "),
		useOxfordComma ? "," : "",
		" and ",
		lastItem
	].join("");
};
const ellipsize = (text, maxLength) => (`${text}`.length > maxLength ? `${text.slice(0, maxLength - 3)}…` : text);

// ========== Numbers: Formatting Numbers Into Strings ===========
const signNum = (num, delim = "") => `${pFloat(num) < 0 ? "-" : "+"}${delim}${Math.abs(pFloat(num))}`;
const padNum = (num, numDecDigits) => {
	const [leftDigits, rightDigits] = `${pFloat(num)}`.split(/\./);
	if (getType(rightDigits) === "int") {
		if (rightDigits.length > numDecDigits) {
			return `${pFloat(num, numDecDigits)}`;
		} else if (rightDigits.length < numDecDigits) {
			return `${leftDigits}.${rightDigits}${"0".repeat(numDecDigits - rightDigits.length)}`;
		} else {
			return `${pFloat(num)}`;
		}
	}
	return `${leftDigits}.${"0".repeat(numDecDigits)}`;
};
const stringifyNum = (num) => {
	// Can take string representations of numbers, either in standard or scientific/engineering notation.
	// Returns a string representation of the number in standard notation.
	if (pFloat(num) === 0) { return "0" }
	num = lCase(num).replace(/[^\d.e+-]/g, "");
	const base = regExtract(num, /^-?[\d.]+/);
	const exp = pInt(regExtract(num, /e([+-]?\d+)$/).pop());
	const baseInts = regExtract(base, /^-?(\d+)/).pop().replace(/^0+/, "");
	const baseDecs = lCase(regExtract(base, /\.(\d+)/).pop()).replace(/0+$/, "");
	const numFinalInts = Math.max(0, baseInts.length + exp);
	const numFinalDecs = Math.max(0, baseDecs.length - exp);

	const finalInts = [
		baseInts.slice(0, numFinalInts),
		baseDecs.slice(0, Math.max(0, exp))
	].join("") || "0";
	const finalDecs = [
		baseInts.length - numFinalInts > 0
			? baseInts.slice(baseInts.length - numFinalInts - 1)
			: "",
		baseDecs.slice(baseDecs.length - numFinalDecs)
	].join("");

	return [
		num.charAt(0) === "-" ? "-" : "",
		finalInts,
		"0".repeat(Math.max(0, numFinalInts - finalInts.length)),
		finalDecs.length ? "." : "",
		"0".repeat(Math.max(0, numFinalDecs - finalDecs.length)),
		finalDecs
	].join("");
};
const verbalizeNum = (num) => {
	num = stringifyNum(num);
	const getTier = (trioNum) => {
		if (trioNum < _numberWords.tiers.length) {
			return _numberWords.tiers[trioNum];
		}
		return [
			_numberWords.bigPrefixes[(trioNum % 10) - 1],
			_numberWords.bigSuffixes[Math.floor(trioNum / 10)]
		].join("");
	};
	const parseThreeDigits = (trio, tierNum) => {
		if (pInt(trio) === 0) { return "" }
		const digits = `${trio}`.split("").map((digit) => pInt(digit));
		let result = "";
		if (digits.length === 3) {
			const hundreds = digits.shift();
			result += hundreds > 0 ? `${_numberWords.ones[hundreds]} hundred` : "";
			if (hundreds && (digits[0] || digits[1])) {
				result += " and ";
			}
		}
		if (pInt(digits.join("")) <= _numberWords.ones.length) {
			result += _numberWords.ones[pInt(digits.join(""))];
		} else {
			result += `${_numberWords.tens[pInt(digits.shift())]}${pInt(digits[0]) > 0 ? `-${_numberWords.ones[pInt(digits[0])]}` : ""}`;
		}
		return result;
	};
	const numWords = [];
	if (num.charAt(0) === "-") {
		numWords.push("negative");
	}
	const [integers, decimals] = num.replace(/[,|\s|-]/g, "").split(".");
	const intArray = integers.split("").reverse().join("")
		.match(/.{1,3}/g)
		.map((v) => v.split("").reverse().join(""));
	const intStrings = [];
	while (intArray.length) {
		const theseWords = parseThreeDigits(intArray.pop());
		if (theseWords) {
			intStrings.push(`${theseWords} ${getTier(intArray.length)}`);
		}
	}
	numWords.push(intStrings.join(", ").trim());
	if (getType(decimals) === "int") {
		if (integers === "0") {
			numWords.push("zero");
		}
		numWords.push("point");
		for (const digit of decimals.split("")) {
			numWords.push(_numberWords.ones[pInt(digit)]);
		}
	}
	return numWords.join(" ");
};
const ordinalizeNum = (num, isReturningWords = false) => {
	if (isReturningWords) {
		const [numText, suffix] = lCase(verbalizeNum(num)).match(/.*?[-|\s]?(\w*?)$/);
		return numText.replace(
			new RegExp(`${suffix}$`),
			_ordinals[suffix] || `${suffix}th`
		);
	}
	const tNum = pInt(num) - 100 * Math.floor(pInt(num) / 100);
	if (/\.|1[1-3]$/.test(`${num}`)) {
		return `${num}th`;
	}
	return `${num}${
		["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][
			pInt(`${num}`.charAt(`${num}`.length - 1))
		]
	}`;
};
const romanizeNum = (num, isUsingGroupedChars = true) => {
	if (getType(num) === "float") { throw new Error(`Error: Can't Romanize Floats (${num})`) }
	if (num >= 400000) { throw new Error(`Error: Can't Romanize >= 400,000 (${num})`) }
	if (num <= 0) { throw new Error(`Error: Can't Romanize <= 0 (${num})`) }
	const romanRef = _romanNumerals[isUsingGroupedChars ? "grouped" : "ungrouped"];
	const romanNum = stringifyNum(num)
		.split("")
		.reverse()
		.map((digit, i) => romanRef[i][pInt(digit)])
		.reverse()
		.join("");
	return isUsingGroupedChars
		? romanNum.replace(/ⅩⅠ/gu, "Ⅺ").replace(/ⅩⅡ/gu, "Ⅻ")
		: romanNum;
};

// ░░░░░░░[Content]░░░░ Lorem Ipsum, Random Content Generation ░░░░░░░
const loremIpsum = (numWords = 200) => {
	const lrWordList = _loremIpsumText.split(/\n?\s+/g);
	const words = [...lrWordList[randNum(0, lrWordList.length - 1)]];
	while (words.length < numWords) {
		words.push(...lrWordList);
	}
	words.length = numWords;
	return `${sCase(words.join(" ")).trim().replace(/[^a-z\s]*$/ui, "")}.`;
};
const randWord = (numWords = 1, wordList = _randomWords) => [...Array(numWords)].map(() => randElem(wordList)).join(" ");

// ████████ SEARCHING: Searching Various Data Types w/ Fuzzy Matching ████████
const isIn = (needle, haystack = [], fuzziness = 0) => {
	// Looks for needle in haystack using fuzzy matching, then returns value as it appears in haystack.

	// STEP ONE: POPULATE SEARCH TESTS ACCORDING TO FUZZINESS SETTING
	const SearchTests = [
		(ndl, item) => new RegExp(`^${ndl}$`, "gu").test(item),
		(ndl, item) => new RegExp(`^${ndl}$`, "gui").test(item)
	];
	if (fuzziness >= 1) {
		const fuzzyTests = [
			(ndl, item) => new RegExp(`^${ndl}`, "gui").test(item),
			(ndl, item) => new RegExp(`${ndl}$`, "gui").test(item),
			(ndl, item) => new RegExp(`${ndl}`, "gui").test(item),
			(ndl, item) => new RegExp(`${item}`, "gui").test(ndl)
		];
		SearchTests.push(...fuzzyTests);
		if (fuzziness >= 2) {
			SearchTests.push(...fuzzyTests
				.map((func) => (ndl, item) => func(ndl.replace(/\W/gu), item.replace(/\W/gu))));
			if (fuzziness >= 3) {
				SearchTests.push((ndl) => false); // Have to implement Fuse matching
			}
		}
	}

	// STEP TWO: PARSE NEEDLE & CONSTRUCT SEARCHABLE HAYSTACK.
	const stackType = getType(haystack);
	const searchNeedle = `${needle}`;
	const searchStack = (() => {
		switch (stackType) {
			case "array": return [...haystack];
			case "list": return Object.keys(haystack);
			default: {
				try {
					return Array.from(haystack);
				} catch {
					throw new Error(`Haystack type must be [list, array], not ${getType(haystack)}: ${JSON.stringify(haystack)}`);
				}
			}
		}
	})();

	// STEP THREE: SEARCH HAY FOR NEEDLE USING PROGRESSIVELY MORE FUZZY SEARCH TESTS
	let matchIndex;
	while (!isPosInt(matchIndex)) {
		if (SearchTests.length === 0) { return false }
		const testFunc = SearchTests.shift();
		matchIndex = searchStack.findIndex((item) => testFunc(searchNeedle, item));
	}
	return stackType === "list" ? haystack[searchStack[matchIndex]] : haystack[matchIndex];
};
const isInExact = (needle, haystack) => isIn(needle, haystack, 0);

// ████████ NUMBERS: Number Casting, Mathematics, Conversion ████████
const randNum = (min, max, snap = 0) => gsap.utils.random(min, max, snap);
const randInt = (min, max) => randNum(min, max, 1);
const sinOf = (deg) => Math.sin(deg * (Math.PI / 180));
const cosOf = (deg) => Math.cos(deg * (Math.PI / 180));
const coinFlip = () => randNum(0, 1, 1) === 1;
const cycleNum = (num, [min = 0, max = Infinity] = []) => gsap.utils.wrap(min, max, num);
const cycleAngle = (angle) => cycleNum(angle, [-180, 180]);
const roundNum = (num, sigDigits = 0) => (sigDigits === 0 ? pInt(num) : pFloat(num, sigDigits));

// ░░░░░░░[Positioning]░░░░ Relationships On 2D Cartesian Plane ░░░░░░░
const getDistance = ({x: x1, y: y1}, {x: x2, y: y2}) => ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
const getAngle = ({x: x1, y: y1}, {x: x2, y: y2}, {x: xO = 0, y: yO = 0} = {}) => {
	x1 -= xO; y1 -= yO; x2 -= xO; y2 -= yO;
	return cycleAngle(radToDeg(Math.atan2(y2 - y1, x2 - x1)));
};
const getAngleDelta = (angleStart, angleEnd) => cycleAngle(angleEnd - angleStart);

// ████████ ARRAYS: Array Manipulation ████████
const randElem = (array) => gsap.utils.random(array);
const randIndex = (array) => randInt(0, array.length - 1);
const makeCycler = (array, index = 0) => {
	// Given an array and a starting index, returns a generator function that can be used
	// to iterate over the array indefinitely, or wrap out-of-bounds index values
	const wrapper = gsap.utils.wrap(array);
	index--;
	return (function* cycler() {
		while (true) {
			index++;
			yield wrapper(index);
		}
	}());
};
const getLast = (array) => (array.length ? array[array.length - 1] : undefined);
const pluckElem = (array, checkFunc = () => false) => {
	const index = array.findIndex(checkFunc);
	if (isPosInt(index)) {
		const elem = array[index];
		delete array[index];
		for (let i = index; i < array.length - 1; i++) {
			array[i] = array[i + 1];
		}
		array.length -= 1;
		return elem;
	}
	return false;
};
const unique = (array) => {
	const returnArray = [];
	array.forEach((item) => { if (!returnArray.includes(item)) { returnArray.push(item) } });
	return returnArray;
};
const without = (array, checkFunc = () => false) => {
	const index = array.findIndex(checkFunc);
	if (isPosInt(index)) {
		return array.splice(index, 1).pop();
	}
	return false;
};

// ████████ OBJECTS: Manipulation of Simple Key/Val Objects ████████
const cloneObj = (obj) => {
	let clone;
	try {
		clone = JSON.parse(JSON.stringify(obj));
	} catch (err) {
		clone = {...obj};
	}
	return clone;
};
// Given an object and a predicate function, returns array of two objects:
//   one with entries that pass, one with entries that fail.
const partition = (obj, predicate = (v, k) => true) => [
	objFilter(obj, predicate),
	objFilter(obj, (v, k) => !predicate(v, k))
];
const objMap = (obj, keyFunc, valFunc) => {
	// An object-equivalent Array.map() function, which accepts mapping functions to transform both keys and values.
	// If only one function is provided, it's assumed to be mapping the values and will receive (v, k) args.
	// To only change the keys, pass 'false' as the valFunc parameter.
	[valFunc, keyFunc] = [valFunc, keyFunc].filter((x) => ["function", "boolean"].includes(typeof x));
	keyFunc = keyFunc || ((k) => k);
	valFunc = valFunc || ((v) => v);
	return Object.fromEntries(Object.entries(obj).map(([key, val]) => [keyFunc(key, val), valFunc(val, key)]));
};
const objFilter = (obj, keyFunc, valFunc) => {
	// An object-equivalent Array.filter() function, which accepts filter functions for both keys and/or values.
	// If only one function is provided, it's assumed to be mapping the values and will receive (v, k) args.
	[valFunc, keyFunc] = [valFunc, keyFunc].filter((x) => ["function", "boolean"].includes(typeof x));
	if (getType(obj) === "array") { return obj.filter(valFunc) }
	keyFunc = keyFunc || (() => true);
	valFunc = valFunc || (() => true);
	return Object.fromEntries(Object.entries(obj).filter(([key, val]) => keyFunc(key) && valFunc(val)));
};
const objForEach = (obj, func) => {
	// An object-equivalent Array.forEach() function, which accepts one function(val, key) to perform for each member.
	if (getType(obj) === "array") {
		obj.forEach(func);
	} else {
		Object.entries(obj).forEach(([key, val]) => func(val, key));
	}
};
const remove = (obj, searchFunc) => {
	// Given an array or list and a search function, will remove the first matching element and return it.
	if (getType(obj) === "list") {
		const remKey = Object.entries(obj).find(_parseSearchFunc(obj, searchFunc));
		if (remKey) {
			const {[remKey]: remVal} = obj;
			delete obj[remKey];
			return remVal;
		}
	} else if (getType(obj) === "array") {
		const index = obj.findIndex(_parseSearchFunc(obj, searchFunc));
		if (index >= 0) {
			let remVal;
			for (let i = 0; i <= obj.length; i++) {
				if (i === index) {
					remVal = obj.shift();
				} else {
					obj.push(obj.shift());
				}
			}
			return remVal;
		}
	}
	return false;
};
const replace = (obj, searchFunc, repVal) => {
	// As remove, except instead replaces the element with the provided value.
	// Returns true/false to indicate whether the replace action succeeded.
	const objType = getType(obj);
	let repKey;
	if (objType === "list") {
		[repKey] = Object.entries(obj).find(_parseSearchFunc(obj, searchFunc)) || [false];
		if (repKey === false) { return false }
	} else if (objType === "array") {
		repKey = obj.findIndex(_parseSearchFunc(obj, searchFunc));
		if (repKey === -1) { return false }
	}
	if (getType(repVal) === "function") {
		obj[repKey] = repVal(obj[repKey], repKey);
	} else {
		obj[repKey] = repVal;
	}
	return true;
};
const merge = (target, source, {isMergingArrays = true, isOverwritingArrays = true} = {}) => {
	target = cloneObj(target);
	const isObject = (obj) => obj && typeof obj === "object";

	if (!isObject(target) || !isObject(source)) {
		return source;
	}

	Object.keys(source).forEach((key) => {
		const targetValue = target[key];
		const sourceValue = source[key];

		if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
			if (isOverwritingArrays) {
				target[key] = sourceValue;
			} else if (isMergingArrays) {
				target[key] = targetValue.map((x, i) => (sourceValue.length <= i ? x : merge(x, sourceValue[i], {isMergingArrays, isOverwritingArrays})));
				if (sourceValue.length > targetValue.length) {
					target[key] = target[key].concat(sourceValue.slice(targetValue.length));
				}
			} else {
				target[key] = targetValue.concat(sourceValue);
			}
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = merge({...targetValue}, sourceValue, {isMergingArrays, isOverwritingArrays});
		} else {
			target[key] = sourceValue;
		}
	});

	return target;
};

// ████████ FUNCTIONS: Function Wrapping, Queuing, Manipulation ████████
const getDynamicFunc = (funcName, func, context) => {
	const dFunc = {[funcName](...args) { return func(...args) }}[funcName];
	return context ? dFunc.bind(context) : dFunc;
};
const awaitSerial = async (params, func) => {
	await [params].flat().reduce(async (promise, param) => {
		await promise;
		return func(...[param].flat());
	}, Promise.resolve());
};
const awaitParallel = async (params, func) => await Promise.all([params].flat().map(async (param) => func(...[param].flat())));

// ████████ HTML: Parsing HTML Code, Manipulating DOM Objects ████████
const getImgCSS = (imgRef) => {
	if (/^(linear|url)/.test(imgRef)) { return imgRef }
	if (/^http/.test(imgRef)) { return `url(${imgRef})` }
	return `url("${C.imgPath}${imgRef}")`;
};
const getRawCirclePath = (r, {x: xO, y: yO} = {}) => {
	[r, xO, yO] = [r, xO, yO].map((val) => parseInt(val)); // roundNum(val, 2));
	const [b1, b2] = [0.4475 * r, (1 - 0.4475) * r];
	const [xT, yT] = [xO, yO - r];
	return [[
		...[xT, yT],
		...[b2, 0, r, b1, r, r],
		...[0, b2, -b1, r, -r, r],
		...[-b2, 0, -r, -b1, -r, -r],
		...[0, -b2, b1, -r, r, -r]
	]];
};
const drawCirclePath = (radius, origin) => {
	const [[xT, yT, ...segments]] = getRawCirclePath(radius, origin);
	const path = [`m ${xT} ${yT}`];
	segments.forEach((coord, i) => {
		if (i % 6 === 0) { path.push("c") }
		path.push(coord);
	});
	path.push("z");
	return path.join(" ");
};
const formatAsClass = (str) => `${str}`.replace(/([A-Z])|\s/g, "-$1").replace(/^-/, "").trim().toLowerCase();
const getGSAngleDelta = (startAngle, endAngle) => signNum(roundNum(getAngleDelta(startAngle, endAngle), 2)).replace(/^(.)/, "$1=");
const convertCoords = ({x, y}, contextA, contextB) => {
	const convCoords = MotionPathPlugin.convertCoordinates(contextA, contextB, {x, y});
	return {
		x: convCoords.x,
		y: convCoords.y
	};
};
const getNewPos = (elem, newContext, point) => {
	point = point ?? {
		x: gsap.getProperty(elem, "x"),
		y: gsap.getProperty(elem, "y")
	};
	const [fromSpace] = $(elem).parent();
	return convertCoords(point, fromSpace, newContext);
};
const getGlobalPos = (elem, point) => getNewPos(elem, $(CONFIG.globalContainerSelector)[0], point);
const reparent = (elem, newParent) => {
	newParent = newParent ?? $(CONFIG.globalContainerSelector)[0];
	const oldPos = {x: gsap.getProperty(elem, "x"), y: gsap.getProperty(elem, "y")};
	const newPos = getNewPos(elem, newParent);
	const dbData = {
		elem,
		newParent
	};
	const dragElem = Draggable.get(elem);
	if (dragElem) {
		dbData.dragElem = dragElem;
	}
	dbData.oldPos = oldPos;
	dbData.newPos = newPos;
	dbData.newPosCheck = null;
	if (dragElem) {
		dbData.oldDragPos = {x: dragElem.x, y: dragElem.y};
	}
	$(elem).appendTo(newParent);
	gsap.set(elem, {x: newPos.x, y: newPos.y});
	dbData.newPosCheck = {x: gsap.getProperty(elem, "x"), y: gsap.getProperty(elem, "y")};
	if (dragElem) {
		dbData.newDragPos = {x: dragElem.x, y: dragElem.y};
		// dragElem.update();
		dbData.dragPosUpdate = {x: dragElem.x, y: dragElem.y};
		dragElem.update(false, true);
		// dbData.dragPosStickyUpdate = {x: dragElem.x, y: dragElem.y};
	}
	console.log(dbData);
};
const getPixels = (amount, unit) => {
	switch (unit) {
		case "vh": {
			const vh = window.innerHeight / 100;
			return amount * vh;
		}
		case "vw": {
			const vw = window.innerWidth / 100;
			return amount * vw;
		}
		// no default
	}
	return null;
};
const make3dBox = ({id, classes, dimensions, faces, parentElem}) => {
	id = id ?? "box";
	classes = [classes ?? ""].flat().filter((cls) => Boolean(cls)).join(" ");
	parentElem = parentElem ?? $("body")[0];

	// Default styles applied to all elements
	const baseStyles = {
		position: "absolute",
		transformOrigin: "50% 50%",
		transformStyle: "preserve-3d",
		xPercent: -50,
		yPercent: -50,
		backgroundSize: "100% 100%",
		backgroundColor: "black"
	};

	// Create Wrapper
	const $wrapper = $(`<div id=${id} class="${classes}"></div>`).appendTo($(parentElem));
	gsap.set($wrapper, {
		...baseStyles,
		height: dimensions.y,
		width: dimensions.x,
		x: 0.5 * dimensions.x,
		y: 0.5 * dimensions.y,
		z: 0.5 * dimensions.z,
		backgroundColor: "transparent"
	});

	// Determine face style data
	const styleData = {
		top: {
			...baseStyles,
			height: dimensions.z,
			width: dimensions.x,
			rotationX: 90,
			x: 0.5 * dimensions.x,
			background: faces.top
		},
		bottom: {
			...baseStyles,
			height: dimensions.z,
			width: dimensions.x,
			rotationX: 90,
			rotationY: 180,
			x: 0.5 * dimensions.x,
			y: dimensions.y,
			background: faces.bottom
		},
		left: {
			...baseStyles,
			height: dimensions.y,
			width: dimensions.z,
			rotationY: -90,
			y: 0.5 * dimensions.y,
			background: faces.left
		},
		right: {
			...baseStyles,
			height: dimensions.y,
			width: dimensions.z,
			rotationY: 90,
			x: dimensions.x,
			y: 0.5 * dimensions.y,
			background: faces.right
		},
		front: {
			...baseStyles,
			height: dimensions.y,
			width: dimensions.x,
			x: 0.5 * dimensions.x,
			y: 0.5 * dimensions.y,
			z: 0.5 * dimensions.z,
			background: faces.front
		},
		back: {
			...baseStyles,
			height: dimensions.y,
			width: dimensions.x,
			x: 0.5 * dimensions.x,
			y: 0.5 * dimensions.y,
			z: -0.5 * dimensions.z,
			// rotationY: 180,
			background: faces.back
			// boxShadow: "0 0 25px black, 0 0 25px black"
		}
	};

	Object.keys(faces).forEach((face) => {
		const $elem = $(`<div class="face face-${face}"></div>`).appendTo($wrapper);
		gsap.set($elem, styleData[face]);
	});

	return $wrapper;
};
// ░░░░░░░[GreenSock]░░░░ Wrappers for GreenSock Functions ░░░░░░░
const get = (...args) => gsap.getProperty(...args);
const set = (...args) => gsap.set(...args);

// ████████ EXPORTS ████████
export default {
	// ████████ TYPES: Type Checking, Validation, Conversion, Casting ████████
	getType,
	isNumber, isPosInt, isIterable, isHTMLCode,
	hasItems,
	areEqual,
	pFloat, pInt, radToDeg, degToRad,

	// ████████ REGEXP: Regular Expressions, Replacing, Matching ████████
	testRegExp,
	regExtract,

	// ████████ STRINGS: String Parsing, Manipulation, Conversion ████████
	// ░░░░░░░ Case Conversion ░░░░░░░
	uCase, lCase, sCase, tCase,
	// ░░░░░░░ Formatting ░░░░░░░
	pluralize, oxfordize, ellipsize,
	parseArticles,
	signNum, padNum, stringifyNum, verbalizeNum, ordinalizeNum, romanizeNum,
	// ░░░░░░░ Content ░░░░░░░
	loremIpsum, randWord,

	// ████████ SEARCHING: Searching Various Data Types w/ Fuzzy Matching ████████
	isIn, isInExact,

	// ████████ NUMBERS: Number Casting, Mathematics, Conversion ████████
	randNum, randInt,
	sinOf, cosOf,
	coinFlip,
	cycleNum, cycleAngle, roundNum,
	// ░░░░░░░ Positioning ░░░░░░░
	getDistance,
	getAngle, getAngleDelta,

	// ████████ ARRAYS: Array Manipulation ████████
	randElem, randIndex,
	makeCycler,
	getLast, pluckElem,
	unique, without,

	// ████████ OBJECTS: Manipulation of Simple Key/Val Objects ████████
	cloneObj, partition,
	objMap, objFilter, objForEach,
	remove, replace, merge,

	// ████████ FUNCTIONS: Function Wrapping, Queuing, Manipulation ████████
	getDynamicFunc,
	awaitSerial, awaitParallel,

	// ████████ HTML: Parsing HTML Code, Manipulating DOM Objects ████████
	getImgCSS,
	getRawCirclePath, drawCirclePath,
	formatAsClass,
	getGSAngleDelta,
	convertCoords, getNewPos, getGlobalPos, reparent,
	getPixels,
	make3dBox,

	// ░░░░░░░ GreenSock ░░░░░░░
	gsap, get, set
};
// #endregion ▄▄▄▄▄ EXPORTS ▄▄▄▄▄