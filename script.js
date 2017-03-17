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
	var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml = "snippets/categories-title-snippet.html";
	var categoryHtml = "snippets/Category-snippet.html"
	
	//convenience function for inserting innerHTML for 'select'
	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};

	// Show loading icon inside wlwment identified by selector
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html+= "<img src='ajax-loader.gif'></div>";
		insertHtml(selector, html);
	};


// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
	var propToReplace = "{{" + propName + "}}";
	string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
}

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
	//console.log(request.responseText);
});

dc.loadMenuCategories = function () {
	showLoading("#main-content");
	$ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML);
};

//Builds HTML for the categories page based on the data
//from the server
function buildAndShowCategoriesHTML(categories) {
	//Builds HTML for the categories page based on the data
	$ajaxUtils.sendGetRequest(categoriesTitleHtml,
		function (categoriesTitleHtml) {
		// Retrieve single category snippet
		$ajaxUtils.sendGetRequest(
			categoryHtml, function (categoryHtml) {
				var categoriesViewHtml = 
					buildCategoriesViewHtml(categories,
						categoriesTitleHtml, categoryHtml);
				insertHtml("#main-content", categoriesViewHtml);
			}, false);
	},false);

}

//
//
function buildCategoriesViewHTML (categories, categoriesTitleHtml, categoryHtml) {
	var finalHtml = categoriesTitleHtml;
	finalHtml += "<section class='row'>";
 
	// Loop over categories
	for (var i = 0; i<categories.length; i++) {
		// Insert category values
		var html = categoryHtml;
		var name = "" + categories[i].name;
		var short_name = categories[i].short_name;
		html=insertProperty(html, "name", name);
		html=insertProperty(html, "short_name", short_name);
		finalHtml += html;
	}

	finalHtml +="</section>";
	return finalHtml;
}

global.$dc = dc;

})(window);