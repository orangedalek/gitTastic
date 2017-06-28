$(document).ready(function() {
    console.log( "ready!" );

//adding array of strings for bands in my itunes that I have seen live

var bands = ["AFI", "Arcade Fire", "Bauhaus", "The Big Pink", "Blonde Redhead", "Bear in Heaven", "Cat Power", "Dead Milkmen", "Electric Six", "The Faint", "Front 242", "Gary Numan", "Grinderman", "The Jesus and Mary Chain", "Jenny Lewis and the Watson Twins", "Ladytron", "Leftover Crack", "Le Tigre", "The Mountain Goats", "My Bloody Valentine", "My Life With the Thrill Kill Kult", "Neutral Milk Hotel", "Nick Cave and the Bad Seeds", "Pixies", "Rilo Kiley", "Sisters of Mercy", "Spoon", "Tame Impala", "Tenacious D", "Wolf Parade"];



// function to add the buttons

function renderButtons(){
	$('#bandButtons').empty();
	for (var i = 0; i < bands.length; i++) {
		var button = $("<button>");
		button.addClass("band");
		button.attr("data-name", bands[i]);
		button.text(bands[i]);
		$('#bandButtons').append(button);
	}
}

//Get the GIFs from Giphy & display them

function displayBandGif(){
	var band = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=479dcfc1a5af4da3b18dc91c86802588&q=" + band + "&limit=10";
		console.log("help!=============" + band);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
		

		var bandsDiv = $('<div class = "band">');
		var rating = results[i].rating;
		var ratDisplay = $("<p>").text("Rating: " + rating);

		
		var bandImage = $('<img id="bandGif" class="gif">');
		bandImage.attr("src", results[i].images.fixed_height_still.url);
		bandImage.attr("data-state", "still");
		bandImage.attr("data-animate", results[i].images.fixed_height.url);
		bandImage.attr("data-still", results[i].images.fixed_height_still.url);



		bandsDiv.append(ratDisplay);
		bandsDiv.append(bandImage);

		$('#bands').append(bandsDiv);
		}
		
		$('#bands').on("click", function(){
			bandImage = $(this);
			// console.dir(bandImage)
			// bandsDiv.append(bandImage);
		});
	})
};

$('#bandButtons').on("click", ".band", displayBandGif);


//function to handle button clicks & adding more bands

$('#addBand').on("click", function(event){
	event.preventDefault();
	var band = $('#band-input').val().trim();
	bands.push(band);
	renderButtons();
})

//make gif animate/go back to still on click

// $(this).attr("data-state"

renderButtons();
	
//function animateGif(){


    $(document).on("click", ".gif", function() {
      console.log("this!")
      //console.log(this.attributes[1]);
      // var state = this.attr('data-state');

      // var animate = $(this).attr("data-animate")
      // var still = $(this).attr("src");
      // var frozen = this.attributes;

      // console.dir("still", still);
      // // frozen = Object.keys(frozen)
      // console.log("frozen", frozen[1]);

      var state = $(this).attr("data-state");
      console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
	$('#bands').empty();
//}

});

