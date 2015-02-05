window.buttonsDisabled = true;

var opts = {
	images: ["section1","section2","section3","section4","section5","section5"],
	opacity: [0.3, 0.3, 0.3, 0.7, 1, 1],
	sections: [3, 5, 7, 11, 19, 27],
	div: "illustrations",
	path: "images/illustration/"
};
var reveal = new Reveal(opts);
reveal.Grayscale();

$('#prev').on('click', function() {
	if (!window.buttonsDisabled) {
		disableButtons(true,false);
		//reveal.Previous();
		backwardClick();
	}
});

$('#next').on('click', function() {
	if (!window.buttonsDisabled) {
		console.log("next clicked");
		disableButtons(true,false);
		//reveal.Next();
		forwardClick();
	}
});


$(document).ready(function() {
	initVideo();
});