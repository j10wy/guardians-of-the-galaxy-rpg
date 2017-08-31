/* --- Setup variables --- */
var rpg = {}

/* --- Create settings object --- */

rpg.settings = {
	playing: false,
	cpu: null,
	player: null
}

rpg.characters = {
	drax: {
		hp: "",
		attack: "",
		css: ""
	},
	gamora: {
		hp: "",
		attack: "",
		css: ""
	},
	groot: {
		hp: "",
		attack: "",
		css: ""
	},
	rocket: {
		hp: "",
		attack: "",
		css: ""
	},
	starlord: {
		hp: "",
		attack: "",
		css: ""
	}
}

rpg.console = {
	player: "background-color:green; color:white",
	cpu: "background-color:red; color:white",
	playing: "background-color:blue; color:white"
}


$(document).ready(function () {

	$('.message').typeIt();

});

$(window).on("load", function () {
	$('div#character-area').css({
		"display": "flex"
	});
	$('.message').typeIt({
		strings: '<span style="color:red;">Choose</span> a character...',
		speed: 90
	});

	$('div.character').on("click", function () {
		$('div#character-area').css({
			"display": "none"
		});
		$('.message').typeIt({
			strings: 'FIGHT!',
		});
	});

	$('a.button').on("click", function () {
		$('div#character-area').css({
			"display": "flex"
		});
	});

});