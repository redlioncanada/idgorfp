window.disableButtons = true;

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
	//initVideo();
});
