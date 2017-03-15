$(function () { // Same as document.addEventListener("DOMContentLoaded"..)
	
    // Same as document.querySelector("#navbarToggle").addEventListener("blur")
	$("#navbarToggle").blur(function (event) {
		var screenWidth = window.innerWidth;
		if(screenWidth < 768) {
			$("#collapsable-nav").collapse('hide');
		}
	});
});

(function (global) {

	var dc = {};
	var homeHtml = "snippets/home-snippet.html";

	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};

	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html+= "<img src='ajax-loader.gif'></div>";
		insertHtml(selector, html);
	};

// On first load, show home view
document.addEventListener("DOMContentLoaded", function (event) {

showLoading("#main-content");
$ajaxUtils.sendGetRequest(
	homeHtml,
	function (request) {
		document.querySelector("#main-content")
			.innerHTML = request.responseText;
	},
	false);
	console.log(responseText);
});

global.$dc = dc;
})(window);