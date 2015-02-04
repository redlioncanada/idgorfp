/* Handles image creation and animation */

function Reveal(opts) {
	//vars
	this.data = opts.images;
	this.opacity = opts.opacity;
	this.sections = opts.sections;
	this.myDivId = opts.div;
	this.path = opts.path;
	this.lastGroup = -1;
	this.lastImage = -1;
	this.grayscale = false;
	
	//private methods
	this.createImage = function(filename,group,clas) {
		if (typeof clas == 'undefined') clas = '';
		var url = this.path+filename+".png";
		$("#"+this.myDivId).append("<img src='"+url+"' class='hidden group"+group+" "+clas+"'/>");
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
	this.resize = function(init) {
		var videoLeft = $('#video').offset().left;
		var videoTop = $('#video').offset().top;
		var videoHeight = $('#video').height();
		var videoWidth = $('#video').width();
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		
		$('#video').css({
			top: ((windowHeight-videoHeight)/2)+"px"
		});
		
		$('#blackbar.bottom').css({
			top: init ? windowHeight-(((windowHeight-videoHeight)/2)) + "px" : videoTop+videoHeight-1+"px",
			height: init ? ((windowHeight-videoHeight)/2)+"px" : windowHeight-videoHeight+"px",
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
	this.init = function() {
		for (var group in this.data) {
			this.createImage(this.data[group],group,'color');
			this.createImage(this.data[group] + "_white",group,'white');
		}
	};
	
	var self = this;
	$(document).ready(function(){
		self.init();
		self.resize(true);
	});
	setTimeout(function(){
		self.resize();
	},200);
	$(window).on('resize', function(){
		self.resize();
	});
}

Reveal.prototype.Next = function() {
	if (this.lastGroup >= this.sections[this.sections.length-1]-1) return;
	if (this.sections.indexOf(++this.lastGroup) == -1) return;
	
	var self = this;
	var temp = this.lastImage;
	setTimeout(function(){
		$('img.white.group'+temp).fadeOut();
		$('img.color.group'+temp).fadeOut();
	},200);
	this.lastImage++;
	
	if (this.grayscale) {
		$('img.white.group'+this.lastImage).animate({'opacity':this.opacity[this.lastImage]});
	} else {
		$('img.color.group'+this.lastImage).animate({'opacity':this.opacity[this.lastImage]});
	}
}

Reveal.prototype.Previous = function() {
	if (this.lastGroup == -1) return;
	if (this.lastGroup == 0) {
		$('img.group').fadeOut();
		this.lastGtoup--;
	}
	if (this.sections.indexOf(--this.lastGroup)+1 > -1) {
		var self = this;
		var temp = this.lastImage;
		setTimeout(function(){
			$('img.white.group'+temp).fadeOut();
			$('img.color.group'+temp).fadeOut();
		},200);
		this.lastImage--;
	
		if (this.grayscale) {
			$('img.white.group'+this.lastImage).animate({'opacity':this.opacity[this.lastImage]});
		} else {
			$('img.color.group'+this.lastImage).animate({'opacity':this.opacity[this.lastImage]});
		}
	}
}

Reveal.prototype.Color = function() {
	$('img.white.group'+this.lastImage).fadeOut();
	$('img.color.group'+this.lastImage).fadeIn();
	this.grayscale = false;
}

Reveal.prototype.Grayscale = function() {
	$('img.white.group'+this.lastImage).fadeIn();
	$('img.color.group'+this.lastImage).fadeOut();
	this.grayscale = true;
}
