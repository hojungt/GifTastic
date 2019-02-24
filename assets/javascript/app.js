// 1. DEFINING VAR AND FUNCTIONS
// Array - list of topics interested
var topics = ['dog', 'cat', 'rabbit', 'hamster', 'parrot', 'goldfish', 'horse', 'deer', 'llama', 'penguin', 'skunk', 'turtle'];

// Function - rendering buttons for each topic
function renderButtons() {

    $("#topic-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var $button = $("<button>");
      $button.addClass("topic-btn");
      $button.attr("data-name", topics[i]);
      $button.text(topics[i]);
      $("#topic-buttons").append($button);
    }
}

// Function - showing gifs from GIPHY API
function showGif() {
    var topic = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=ZfldcbzIBP17P6wE4Y7ZmZ1aenoKzWar&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $('<div>');
            var animalImage = $('<img>');

            animalImage.attr('src', results[i].images.fixed_height.url);
            animalDiv.append(animalImage);       

            var rating = response.data[i].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
            animalDiv.append(ratingText);

            $('#gifs-view').append(animalDiv);
        }
    });
}

// Function - on-click event: add new topic to buttons
$('#add-topic').on('click', function(event) {
    event.preventDefault();

    var newTopic = $('#topic-input').val().trim();
    topics.push(newTopic);
    $('form').get(0).reset();

    renderButtons();
});


// ==================================================
// 2. GIF GENERATOR

// Clear all gifs before generating from new topic
$(document).on('click', '.topic-btn', function(){
    $('#gifs-view').empty();
});

// Display gifs when pick a new topic
$(document).on('click', '.topic-btn', showGif);

// Create all buttons on pagel
renderButtons();  