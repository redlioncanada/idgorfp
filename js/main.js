var opts = {
	images: [
		[
			"test",
			"test1"
		],
		[
			"test1"
		],
		[
			"test"
		]
	],
	div: "images",
	path: "images/"
};
var reveal = new Reveal(opts);


$('#previous').on('click', function() {
	reveal.Next();
});

$('#next').on('click', function() {
	reveal.Previous();
});


