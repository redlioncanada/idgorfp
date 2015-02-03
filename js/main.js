var opts = {
	images: [
		["1","2","3","4","5"],
	],
	div: "illustrations",
	path: "images/illustrations/"
};
var reveal = new Reveal(opts);


$('#prev').on('click', function() {
	reveal.Previous();
});

$('#next').on('click', function() {
	reveal.Next();
});


