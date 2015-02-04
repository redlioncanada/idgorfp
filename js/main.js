window.disableButtons = false;

var opts = {
	images: ["section1","section2","section3","section4","section5"],
	opacity: [0.3, 0.3, 0.3, 0.7, 1],
	sections: [2, 4, 6, 15, 17],
	div: "illustrations",
	path: "images/illustration/"
};
var reveal = new Reveal(opts);
reveal.Grayscale();

$('#prev').on('click', function() {
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
