<<<<<<< Updated upstream
window.disableButtons = false;

var opts = {
	images: ["section1","section2","section3","section4","section5"],
	opacity: [0.3, 0.3, 0.3, 0.7, 1],
	sections: [0, 3, 5, 7, 9],
=======
//window.disableButtons = true;

var opts = {
	images: [
		[
		],
		[
		],
		[
		],
		[
			{name:"1",left:-80,top:-5},
			{name:"2",left:-80,top:-5},
			{name:"3",left:-80,top:-5}
		],
		[
			{name:"4",left:-80,top:-5},
			{name:"5",left:-80,top:-5},
			{name:"6",left:-80,top:-5}
		],
		[
			{name:"7",left:-80,top:-5},
			{name:"8",left:-80,top:-5},
			{name:"9",left:-80,top:-5}
		],
		[
			{name:"10",left:-80,top:800},
			{name:"11",left:-80,top:650},
			{name:"12",left:-80,top:500},
		]
	],
>>>>>>> Stashed changes
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
