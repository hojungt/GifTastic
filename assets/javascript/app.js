// 1. DEFINING VAR AND FUNCTIONS
// Array - list of topics interested
var topics = ['dog', 'cat', 'rabbit', 'hamster', 'bird', 'owl', 'parrot', 'goldfish', 'horse', 'deer', 'llama', 'penguin', 'skunk', 'turtle'];

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

    // ajax method to connect to GIPHY API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var topicDiv = $('<div>');
            var topicImage = $('<img>');

            // add attributes of source, animate url, still url, and data-state to each image
            // to control animate vs. still image-state
            // (courtesy of classmate)
            topicImage.addClass('gif-image');
            topicImage.attr('src', results[i].images.fixed_height_still.url);
            topicImage.attr('data-animated', results[i].images.fixed_height.url);
            topicImage.attr('data-still', results[i].images.fixed_height_still.url);
            topicImage.attr('data-state', false);
            topicDiv.addClass('gif-box')
            topicDiv.append(topicImage);       

            var rating = response.data[i].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
            topicDiv.append(ratingText);

            $('#gifs-view').append(topicDiv);
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

// Image-state checker
$(document).on('click', '.gif-image', function () {
    var source;
    var currentState = $(this).data('state');
    if (currentState === false)
    {
        source = $(this).data('animated');
        $(this).data('state', true);
    }
    if (currentState === true)
    {
        source = $(this).data('still');
        $(this).data('state', false);
    }
    $(this).attr('src', source);
});

// Create all buttons on page
renderButtons();  