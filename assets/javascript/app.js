// Array - list of topics interested
var topics = ['dog', 'cat', 'fish'];


// Function - rendering buttons for each topic
function renderButtons() {

    $("#topic-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("topic-btn");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#topic-buttons").append(a);
    }
}

// Function - on-click event: add new topic to buttons
$("#add-topic").on("click", function(event) {
    event.preventDefault();

    var newTopic = $("#topic-input").val().trim();
    topics.push(newTopic);

    renderButtons();
});

renderButtons();

// $("button").on("click", function() {
//     var animal = $(this).attr('topics');
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ZfldcbzIBP17P6wE4Y7ZmZ1aenoKzWar&limit=10";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {

//         console.log(response);

//         var results = response.data;
//         for (var i = 0; i < results.length; i++) {
//             var animalDiv = $('<div>');
    
//             var animalImage = $('<img>');
//             animalImage.attr('src', results[i].images.fixed_height.url);
    
//             animalDiv.append(animalImage);
    
//             $('#gifs-appear-here').prepend(animalDiv);
//         }

//     });
//   });
  