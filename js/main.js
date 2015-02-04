window.disableButtons = false;

var opts = {
	images: ["section1","section2","section3","section4","section5"],
	opacity: [0.3, 0.3, 0.3, 0.7, 1],
	sections: [0, 3, 5, 7, 9],
	div: "illustrations",
	path: "images/illustration/"
};
var reveal = new Reveal(opts);
reveal.Grayscale();

$('#prev').on('click', function() {
	console.log("prev clicked");
	if (!window.disableButtons) {
		window.disableButtons = true;
		//reveal.Previous();
		backwardClick();
	}
});

$('#next').on('click', function() {
	if (!window.disableButtons) {
		console.log("next clicked");
		window.disableButtons = true;
		reveal.Next();
		forwardClick();
	}
});


$(document).ready(function() {
	initVideo();
});
