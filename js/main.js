window.disableButtons = true;

var opts = {
	images: [
		["1","2","3","4","5"],
		["6","7","8","9","10"],
		["11","12","13","14","15"],
		["16","17","18","19","20"],
		["21","22","23","24","25"],
		["26","27","28","29","30"],
		["31","32","33","34","35"],
		["36","37","38","39","40"],
		["41","42","43","44","45"]
	],
	div: "illustrations",
	path: "images/illustrations/"
};
var reveal = new Reveal(opts);

$('#prev').on('click', function() {
	console.log("prev clicked");
	if (!window.disableButtons) {
		window.disableButtons = true;
		reveal.Previous();
		backwardClick();
	}
});

$('#next').on('click', function() {
	console.log("next clicked");
	if (!window.disableButtons) {
		window.disableButtons = true;
		reveal.Next();
		forwardClick();
	}
});

$(document).ready(function() {
	initVideo();
});
