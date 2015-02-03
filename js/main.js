var opts = {
	images: [
		[
			"1",
			"2"
		],
		[
			"3"
		],
		[
			"4"
		]
	],
	div: "illustrations",
	path: "images/illustrations/"
};
var reveal = new Reveal(opts);


$('#previous').on('click', function() {
	reveal.Next();
});

$('#next').on('click', function() {
	reveal.Previous();
});


