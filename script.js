/**
 * Generates a random integer between `min` and `max` (inclusive)
 * @param {number} min Minimum
 * @param {number} max Maximum (inc)
 * @returns number
 */
function getRandInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let score = {
	player: 0,
	computer: 0,
	tie: 0,
};

// THIS IS AN EXAMPLE CARD
let cardDef = {
	// the index of the element (useful for retrieving the number)
	indx: 0,
	// the number for the card itself (eg 2, 3, ...queen, king etc)
	cardNum: 2,
	// the type of the card (hearts, spades, whatever)
	cardType: "Spades",
	// the path to the image
	img: "path/to/image.png",
};

// ya
let cards = [];

function createCards() {
	// the amount of cards to generate
	let cardsToGen = 52;
	// the amount of cards per type
	let amtOfCards = 13;
	// the card types
	let cardTypes = ["Spades", "Hearts", "Diamonds", "Clubs"];
	for (let index = 0; index < cardsToGen; index++) {
		let outCard = {};

		outCard.indx = index;
		outCard.cardNum = (index % amtOfCards) + 2;
		outCard.cardType = cardTypes[Math.floor(index / amtOfCards)];
		outCard.img = `Deck of Cards Images/${index}.jpg`;

		cards.push(outCard);
	}
	console.table(cards);
}

createCards();

function playRound() {
	let playerCard = cards[getRandInt(0, 51)];
	let computerCard = cards[getRandInt(0, 51)];
	while (playerCard == computerCard) {
		computerCard = cards[getRandInt(0, 51)];
	}
	console.table([playerCard, computerCard]);

	document.getElementById("pCard").src = playerCard.img;
	document.getElementById("cCard").src = computerCard.img;

	if (playerCard.cardNum > computerCard.cardNum) {
		score.player++;
		document.getElementById("outcome").innerText = "You won!";
		displayScore();
		console.log(score);
		return;
	}
	if (playerCard.cardNum < computerCard.cardNum) {
		score.computer++;
		document.getElementById("outcome").innerText = "You lost";
		displayScore();
		console.log(score);
		return;
	}
	score.tie++;
	displayScore();
	console.log(score);
}

function displayScore() {
	document.getElementById("playerStat").children[1].innerText = score.player;
	document.getElementById("computerStat").children[1].innerText =
		score.computer;
	document.getElementById("tieStat").children[1].innerText = score.tie;
}

function restart() {
	if (confirm("are you sure you wanna restart")) {
		score = {
			player: 0,
			computer: 0,
			tie: 0,
		};
		displayScore();
		document.getElementById("pCard").src = "Deck of Cards Images/back.jpg";
		document.getElementById("cCard").src = "Deck of Cards Images/back.jpg";
		document.getElementById("outcome").innerText = "restarted";
	}
}
