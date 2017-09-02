/* --- Setup variables --- */
var rpg = {}

/* --- Create settings object --- */

rpg.settings = {
	playing: false,
	cpu: null,
	player: null,
	turn: null,
}

rpg.characters = {
	drax: {
		name: "Drax",
		hp: 225,
		attack: 45
	},
	gamora: {
		name: "Gamora",
		hp: 150,
		attack: 15
	},
	groot: {
		name: "Groot",
		hp: 120,
		attack: 10
	},
	rocket: {
		name: "Rocket",
		hp: 100,
		attack: 5
	},
	starlord: {
		name: "Starlord",
		hp: 190,
		attack: 25
	},
	names: []
}

rpg.console = {
	cpu: "background-color:red; color:white",
	player: "background-color:green; color:white",
	playing: "background-color:blue; color:white",
	warning: "background-color:yellow; color:black"
}


$(document).ready(function () {

	// Empty the message area
	$('.message').empty();

	// Display a loading message while the window continues to load
	rpg.message(['LOADING...']);

	// Call new game to load add the gifs to the document
	rpg.newGame();

	$('div#character-area').css({
		"display": "flex"
	});

	$('div.character').on("click", function () {
		
		var character = $(this).attr("id");
		rpg.chooseCharacter(character);
		console.log(character)
	});

	$('a.attack-button').on("click", function () {
		rpg.attack();
	});

	$('a.reset-button').on("click", function () {
		location.reload(true);
	});

});

// Preload
rpg.newGame = function () {

	// Empty div.preload and div#character 
	$(".preload").empty();
	$("#character-area").empty();

	rpg.characters.names = ["drax", "gamora", "groot", "rocket", "starlord"];

	// Apppend the gifs to preload and the chatacter area 
	rpg.characters.names.forEach(function (character) {

		$(".preload").append('<img src="assets/images/' + character + '.gif">');
		$("#character-area").append('<div id="' + character + '"class="character"></div>');

	});

	rpg.message(['<span style="color:red;">Select</span> a character...']);

	$("div#character-area").css({
		"display": "flex"
	});

	$('div.player.two span').css({
		"background-image": "none"
	});

	$('a.reset-button').css({
		"display": "none"
	})
}

rpg.chooseCharacter = function (characterId) {

	// GET DATA ATTRIBUTE CHARNAME 
	if (!rpg.settings.player) {

		// Set the player name
		rpg.settings.player = characterId;

		// Update the player area
		$('div.player.one span').css(rpg.buildCssObj(rpg.settings.player));
		$("#" + characterId).remove();
		rpg.message(['<span style="color:red;">Select</span> an enemy...']);
		rpg.arrayPop(rpg.settings.player);

	} else if (rpg.settings.player && !rpg.settings.cpu) {

		// Update the enemy area
		rpg.settings.cpu = characterId;
		$('div.player.two span').css(rpg.buildCssObj(rpg.settings.cpu));
		$("#" + characterId).remove();

	}

	if (!rpg.settings.playing) {
		rpg.startGame();
	}

}

rpg.message = function (messageArray) {
	$('.message').typeIt({
		strings: messageArray,
		speed: 60,
		breakLines: false,
		autoStart: false
	});
}

rpg.buildCssObj = function (name) {
	// When animating the background, you need to update everything at once. You can't have some code in the CSS and update just what you need in JS. So, here I am returning a CSS object that used used to pass as a paramter to the CSS methed in the rpg.chooseCharacter method. 
	return {
		"background": "url('assets/images/" + name + ".png') left center",
		// "background-color": "rgba(0, 199, 236, 0.5)",
		"background-size": "cover",
		"background-repeat": "no-repeat",
		"display": "block",
		// "animation": "var(--" + name + ")";
	}
}

rpg.arrayPop = function (characterToRemove) {
	var characterNames = rpg.characters.names;
	var i;
	for (i = 0; i < characterNames.length; i++) {
		if (characterToRemove === characterNames[i]) {
			characterNames.splice(i, 1);
		}
	}
}

rpg.startGame = function () {
	if (rpg.settings.player && rpg.settings.cpu) {

		// Display game status in console.
		console.log("%cReady to play!", rpg.console.playing);

		// Hide the character area
		$("div#character-area").css({
			"display": "none"
		});

		// Display attack button and make pulse until clicked;
		$(".button.attack-button").css({
			"display": "inline-block",
			"animation": "pulse 1s infinite"
		});

		// Update the message area
		rpg.message(['Click <span class="action">Attack</span> to begin']);

		// Update came settings.
		rpg.settings.playing = true;
		rpg.settings.turn = rpg.settings.player;

	} else {
		console.log("%cChoose an enemy!", rpg.console.warning);
	}
}

rpg.attack = function () {

	rpg.resetAnimation(rpg.settings.player, rpg.settings.cpu);

	rpg.characters[rpg.settings.player].hp -= rpg.characters[rpg.settings.cpu].attack;
	rpg.characters[rpg.settings.cpu].hp -= rpg.characters[rpg.settings.player].attack;

	console.log("%cPLAYER HP: " + rpg.characters[rpg.settings.player].hp, rpg.console.player);
	console.log("%cCPU HP: " + rpg.characters[rpg.settings.cpu].hp, rpg.console.cpu);

	if (rpg.characters[rpg.settings.player].hp <= 0) {

		rpg.message(['<span class="action">You lose!</span>']);

		$("a.attack-button").css({
			"display": "none"
		});

		$("a.reset-button").css({
			"display": "inline-block"
		});

		rpg.settings.player = null;
		rpg.settings.cpu = null;
		rpg.settings.playing = false;

	} else if (rpg.characters[rpg.settings.cpu].hp <= 0) {
		rpg.arrayPop(rpg.settings.cpu);

		if (rpg.characters.names.length === 0) {
			rpg.message(['You defeated everyone!', "Click reset!"]);
			$(".button.reset-button").css({
				"display": "inline-block",
				"animation": "pulse 1s infinite"
			});
			$(".attack-button").css({
				"display": "none"
			});

			rpg.settings.player = null;
			rpg.settings.cpu = null;
			rpg.settings.playing = false;

		} else {
			rpg.message(['<span class="action">You win!</span>', "Select another enemy"]);
			rpg.characters[rpg.settings.player].attack = rpg.characters[rpg.settings.player].attack * 2;
			rpg.settings.cpu = null;
			rpg.settings.playing = false;

			$('div.player.two span').css({
				"background-image": "none"
			});

			$("div#character-area").css({
				"display": "flex"
			});

			$(".attack-button").css({
				"display": "none"
			});
		}


	} else {

		rpg.message(['You attacked for <span class="action">' + rpg.characters[rpg.settings.player].attack + ' damage!</span>',
			rpg.settings.cpu + ' attacked for <span class="action">' + rpg.characters[rpg.settings.cpu].attack + ' damage!</span>',
			rpg.characters[rpg.settings.player].name + " HP: " + rpg.characters[rpg.settings.player].hp + " | " + rpg.characters[rpg.settings.cpu].name + " HP: " + rpg.characters[rpg.settings.cpu].hp
		]);
	}

}

rpg.resetAnimation = function (player, cpu) {
	var playerOneNode = document.querySelector("div.player.one span");
	var playerOneCopy = playerOneNode.cloneNode(true);
	playerOneNode.parentNode.replaceChild(playerOneCopy, playerOneNode);

	var playerTwoNode = document.querySelector("div.player.two span");
	var playerTwoCopy = playerTwoNode.cloneNode(true);
	playerTwoNode.parentNode.replaceChild(playerTwoCopy, playerTwoNode);
	$("div.player.one span").addClass(player + "-animation");
	$("div.player.two span").addClass(cpu + "-animation");
}