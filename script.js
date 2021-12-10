// Card class to keep it consistent
class Card {
	/**
	 * Creates a card
	 * @param {number} index The index of the card in the array
	 * @param {number} rank The rank of the card (numeric only!!)
	 * @param {string} type The type of the card (Spades, Diamonds etc.)
	 * @param {string} img The relative path to the image
	 */
	constructor(index, rank, type, img) {
		this.indx = index;
		this.cardRank = rank;
		this.cardType = type;
		this.img = img;
	}
}

/**
 * Generates a random integer between `min` and `max` (inclusive)
 * @param {number} min Minimum
 * @param {number} max Maximum (inc)
 * @returns number
 */
function getRandInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Keeps score in an object
// (no class for this and typeCounter due to the fact that there is only one!)
let score = {
	player: 0,
	computer: 0,
	tie: 0,
	total: 0,
};

let typeCounter = {
	Spades: 0,
	Hearts: 0,
	Diamonds: 0,
	Clubs: 0,
};

// cards
let cards = [];

/**
 * Fills the `cards` array with 52 cards with their
 * - images
 * - card types
 * - index
 * - card rank (2-ace)
 */
function createCards() {
	// the amount of cards to generate
	let cardsToGen = 52;
	// the amount of cards per type
	let amtOfCards = 13;
	// the card types
	let cardTypes = ["Spades", "Hearts", "Diamonds", "Clubs"];
	// Loops through and generates the cards using the example from cardDef
	for (let index = 0; index < cardsToGen; index++) {
		// Using a class constructor for ease of use
		let outCard = new Card(
			index,
			(index % amtOfCards) + 2,
			cardTypes[Math.floor(index / amtOfCards)],
			`Deck of Cards Images/${index}.jpg`,
		);
		cards.push(outCard);
	}
	// fancy formatting
	console.table(cards);
}

createCards();

/**
 * Goes through all the steps to play a round
 */
function playRound() {
	// generate the cards
	let playerCard = cards[getRandInt(0, 51)];
	let computerCard = cards[getRandInt(0, 51)];
	// make sure they aren't the same!
	while (playerCard == computerCard) {
		computerCard = cards[getRandInt(0, 51)];
	}
	// fancy output
	console.table([playerCard, computerCard]);

	// update images
	document.getElementById("pCard").src = playerCard.img;
	document.getElementById("cCard").src = computerCard.img;

	// increment the variable for whatever card type you use
	// (this is why i have the cardType property on the cards!)
	typeCounter[playerCard.cardType]++;
	typeCounter[computerCard.cardType]++;
	score.total++;

	// checks if you win or lose and does stuff accordingly
	if (playerCard.cardRank > computerCard.cardRank) {
		score.player++;
		document.getElementById("outcome").innerText = "You won!";
		displayScore();
		console.log(score);
		return;
	}
	if (playerCard.cardRank < computerCard.cardRank) {
		score.computer++;
		document.getElementById("outcome").innerText = "You lost";
		displayScore();
		console.log(score);
		return;
	}
	// ONLY runs if you dont win or lose
	// (thanks return; statement!)
	score.tie++;
	document.getElementById("outcome").innerText = "You tied!";
	alert("You tied!");
	displayScore();
	console.log(score);
}

/**
 * Does all the necessary updating for the score
 */
function displayScore() {
	// Selects the element with the score (the <h1>)
	document.getElementById("playerStat").children[1].innerText = score.player;
	document.getElementById("computerStat").children[1].innerText =
		score.computer;
	document.getElementById("tieStat").children[1].innerText = score.tie;
	document.getElementById("totalStat").children[1].innerText = score.total;
}

/**
 * Restarts the game with a confirm box
 */
function restart() {
	if (confirm("are you sure you wanna restart")) {
		// resets the scores back to 0
		score = {
			player: 0,
			computer: 0,
			tie: 0,
			total: 0,
		};
		// updates the stats
		displayScore();
		// shows the backs of the cards again
		document.getElementById("pCard").src = "Deck of Cards Images/back.jpg";
		document.getElementById("cCard").src = "Deck of Cards Images/back.jpg";
		// updates the output
		document.getElementById("outcome").innerText = "Restarted";
	}
}

/**
 * Draws two of the same card and declaes it a tie
 */
function pacifist() {
	let card = cards[getRandInt(0, 51)];
	score.total++;
	// no need for checking if it's a tie or not!
	score.tie++;
	typeCounter[card.cardType] += 2;
	document.getElementById("pCard").src = card.img;
	document.getElementById("cCard").src = card.img;
	alert("You tied!");
	document.getElementById("outcome").innerText = "You tied!";
	displayScore();
}

// Opens and closes the help box
function showHelp(open = true) {
	if (open) {
		document.querySelector(".helpPop").classList.remove("hidden");
		return;
	}
	document.querySelector(".helpPop").classList.add("hidden");
}

// Shows the stats of the amount of cards and the percent they take up
function coolStats() {
	let percentTypes = {
		Spades: (typeCounter.Spades / score.total / 2) * 100,
		Hearts: (typeCounter.Hearts / score.total / 2) * 100,
		Diamonds: (typeCounter.Diamonds / score.total / 2) * 100,
		Clubs: (typeCounter.Clubs / score.total / 2) * 100,
	};
	alert(`Type | Count | Percentage
Spades   | ${typeCounter.Spades} | ${percentTypes.Spades}
Hearts   | ${typeCounter.Hearts} | ${percentTypes.Hearts}
Diamonds | ${typeCounter.Diamonds} | ${percentTypes.Diamonds}
Clubs    | ${typeCounter.Clubs} | ${percentTypes.Clubs}`);
}

/*
Enhancements
- CSS
- Pacifist button
- Cool Statistics :tm:
- Classes
*/
