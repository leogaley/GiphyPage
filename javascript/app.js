$(document).ready(function(){

	//initial button array
	var buttons = ["truck","car","suv","Mustang","Silverado","Tesla","Dodge","Chevy","Ford","Jeep","Mazda","Bentley","GMC","the car from back to the future"];
	var endpoint = "https://api.giphy.com/v1/gifs/search?";
	//object for use with jquery param method.
	var parameters = {
		api_key : "THhfPOIDx9Hbt3aD8dqFKMlusaxiHgpk",
		q 	   : "TBD",
		limit  : 10
		//rating : "g"; for use later if we'd like to control the rating of the GIFs
	}
	//show buttons on page
	var showButtons = function(){
		$(".buttons").empty();
		for(i=0;i<buttons.length;i++){
			var newButton = $("<button>");
			newButton.addClass("btn btn-info").html(buttons[i]).attr("data-text",buttons[i]);

			$(".buttons").append(newButton);
		}
	}
	//show default buttons on initial page load
	showButtons();

	//ajax call, returns JSON object. Go down one level and send result array to showresults function 
	var getData = function(buttonText){
		parameters.q = buttonText;
		var url = endpoint + $.param(parameters);
		console.log(url);
		$.get(url).done(function(response){
			showResults(response.data);
		})
	}
	//show result image blocks on screen, 10 results per click (append to existing)
	var showResults = function(results){
		for (i=0;i<results.length;i++){
			var imageBlock = $("<div>");
			var ratingElement = $("<h3>");
			//data status attribute is toggle for play/stop on GIFs
			var image = $("<img>").attr("data-status","stop");
			//get still or normal url from result array
			var stopURL = results[i].images.fixed_height_small_still.url;
			var playURL = results[i].images.fixed_height_small.url;
			image.attr("data-stopURL",stopURL).attr("data-playURL",playURL);
			ratingElement.text("Rating: " + results[i].rating);
			image.attr("src",stopURL);
			imageBlock.append(ratingElement).append(image).addClass("image-block");
			$(".gifs").append(imageBlock);
		}
	}
	//because .buttons (class) exists initially, this listener works for dynamically added buttons (event delegation)
	$(".buttons").on("click",".btn",function(){
		var buttonText = $(this).attr("data-text");
		//send query text to getData function, query will be used in ajax call
		getData(buttonText);

	})

	//when clicked, any image within gifs class will toggle play/stop
	$(".gifs").on("click","img",function(){
		var $gif = $(this);
		var status = $gif.attr("data-status");
		if(status == "stop"){
			$gif.attr("src",$gif.attr("data-playURL")).attr("data-status","play");
		}

		else {
			$gif.attr("src",$gif.attr("data-stopURL")).attr("data-status","stop");
		}
	})

	//when new button submitted, get value and add to buttons array, then show all buttons again
	$("#addModel").on("click",function(event){
		event.preventDefault();
		var userButton = $("#textInput").val().trim();
		buttons.push(userButton);
		showButtons();
	})

})  //end of document onready function
