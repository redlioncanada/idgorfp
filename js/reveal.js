/* Handles image creation and animation */

function Reveal(opts) {
	//vars
	this.data = opts.images;
	this.myDivId = opts.div;
	this.path = opts.path;
	this.lastGroup = -1;
	
	//private methods
	this.createImage = function(filename,group,index) {
		var url = this.path+filename+".png";
		$("#"+this.myDivId).append("<img src='"+url+"' class='hidden group"+group+" index"+index+"'/>");
	};
	this.hideImage = function(group,index) {
		$('img.group'+group+'.index'+index).fadeOut();	
	};
	this.showImage = function(group,index) {
		$('img.group'+group+'.index'+index).fadeIn();	
	};
	this.log = function(str) {
		console.log('[reveal.js] '+str);
	};
	this.resize = function() {
	/*height: 986.4
	width: 1749.79
	w1: 404.46
	w1%: 23.767995016545
	w2: 415.89
	w2%: 0.23767995016545
	h1: 110.93
	h1%: 11.245944849959
	h2: 82.2
	h2%: 0.08333333333333
	book-width: 894.73
	book-width%: 51.13356459918
	book-height: 795.66
	book-height%: 80.66301703163*/
	
		var videoWidth = $('#video').width();
		var bookWidth = videoWidth * .5113356459918;
		var deadZoneLeft = videoWidth * .23767995016545;
		var deadZoneRight = deadZoneLeft;
		var videoHeight = $('#video').height();
		var deadZoneTop = videoHeight * .11245944849959;
		var deadZoneBottom = videoHeight * .08333333333333;
		var videoLeft = $('#video').offset().left;
		var videoTop = $('#video').offset().top;
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		
		
		$('#test').css({
			width: (videoWidth-deadZoneLeft-deadZoneRight)+"px",
			height: ((videoWidth-deadZoneLeft-deadZoneRight)/(1.1117))+"px",
			left: videoLeft+deadZoneLeft+"px",
			top: videoTop+deadZoneTop+"px"
		});
		
		$('#video').css({
			top: ((windowHeight-videoHeight)/2)+"px"
		});
		
		$('#blackbar.bottom').css({
			top: videoTop+videoHeight-1+"px",
			height: windowHeight-videoHeight+"px",
		});
		
		$('#blackbar.top').css({
			height: ((windowHeight-videoHeight)/2)+"px"
		});
		
		$('#blackbar.left').css({
			width: windowWidth-videoWidth+"px"
		});
		
		$('#blackbar.right').css({
			width: windowWidth-videoWidth+"px"
		});
	};
	
	//init
	for (var group in this.data) {
		for (var index in this.data[group]) {
			this.createImage(this.data[group][index],group,index);	
		}
	}
	
	$('body').append('<div id="test" style="position:absolute;z-index:500;border:1px dotted purple;"></div>');
	this.resize();
	
	var self = this;
	$(window).on('resize', function(){
		self.resize();
	});
}

Reveal.prototype.Next = function(recur) {
	if (typeof recur === 'undefined') recur = false;
	this.lastGroup++;
	if (this.lastGroup > this.data.length) {
		if (recur) {
			this.lastGroup = -1;
		} else {
			this.lastGroup = this.data.length-1;
		}	
	}
	
	$('img.group'+this.lastGroup).fadeIn();
}

Reveal.prototype.Previous = function(recur) {
	if (typeof recur === 'undefined') recur = false;

	$('img.group'+this.lastGroup).fadeOut();
	
	this.lastGroup--;
	if (this.lastGroup < 0) {
		if (recur) {
			this.lastGroup = this.data.length;
		} else {
			this.lastGroup = -1;
		}	
	}
}

Reveal.prototype.At = function(index) {
	if (this.data[index]) {
		$('img.group'+index).fadeIn();
		lastGroup = index;
	} else {
		this.log('Method At() caught error: index does not exist');
	}
}

Reveal.prototype.Color = function() {
	for (var group in this.data) {
		for (var index in this.data[group]) {
			$('img.group'+group+'.index'+index).removeClass('grayscale');
		}
	}
}

Reveal.prototype.Grayscale = function() {
	for (var group in this.data) {
		for (var index in this.data[group]) {
			$('img.group'+group+'.index'+index).addClass('grayscale');
		}
	}
}
