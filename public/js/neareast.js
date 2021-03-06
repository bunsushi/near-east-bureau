// Front-end JS

// Grab the articles as a json
$.getJSON("/articles", function (data) {

    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page

        var articleLink = $("<a>");
        articleLink.attr("href", data[i].link);
        articleLink.attr("target", "_blank");

        var articleContainer = $("<div>");
        articleContainer.addClass("article-container");

        var articleTitle = $("<h2>");
        articleTitle.text(data[i].title);

        var articleSource = $("<div>");
        articleSource.addClass("article-source");
        articleSource.append(data[i].source);

        var articleAuthor = $("<p>");
        articleAuthor.append(data[i].author);

        var articleDate = $("<p>");
        articleDate.append(data[i].date);

        var articleComment = $("<div>");
        articleComment.addClass("interactive comment");
        articleComment.attr("data-id", data[i]._id);
        articleComment.append("<i class='fas fa-comment'></i>");

        var articleLike = $("<div>");
        articleLike.addClass("interactive save");
        articleLike.attr("data-id", data[i]._id);
        articleLike.append("<i class='fas fa-star'></i>");

        articleContainer.append(articleSource);
        articleLink.append(articleTitle);
        articleContainer.append(articleLink);
        if (data[i].author) {
            articleContainer.append(articleAuthor);
        }
        // articleContainer.append(articleDate);
        articleContainer.append(articleLike, articleComment);

        $("#articles").append(articleContainer);
    }
});

// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page

        var articleLink = $("<a>");
        articleLink.attr("href", data[i].link);
        articleLink.attr("target", "_blank");

        var articleContainer = $("<div>");
        articleContainer.addClass("article-container");

        var articleTitle = $("<h2>");
        articleTitle.text(data[i].title);

        var articleSource = $("<div>");
        articleSource.addClass("article-source");
        articleSource.append(data[i].source);

        var articleAuthor = $("<p>");
        articleAuthor.append(data[i].author);

        var articleDate = $("<p>");
        articleDate.append(data[i].date);

        var articleComment = $("<div>");
        articleComment.addClass("interactive comment");
        articleComment.attr("data-id", data[i]._id);
        articleComment.append("<i class='fas fa-comment'></i>");

        var articleLike = $("<div>");
        articleLike.addClass("interactive save");
        articleLike.attr("data-id", data[i]._id);
        articleLike.append("<i class='fas fa-star'></i>");

        articleContainer.append(articleSource);
        articleLink.append(articleTitle);
        articleContainer.append(articleLink);
        if (data[i].author) {
            articleContainer.append(articleAuthor);
        }
        // articleContainer.append(articleDate);
        articleContainer.append(articleLike, articleComment);

        if (data[i].saved) {
            $("#saved-articles").append(articleContainer);
        }
    }
});

$(document).on("click", "#scrape-articles", function () {
    console.log("Getting those articles for you!");
    
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        .then(function (data) {
            // TODO: Add a set time out; seems to be missing some articles
            location.reload();
        })
});

$(document).on("click", "#clear-articles", function () {
    console.log("Cleaning up...");

    $.ajax({
        method: "DELETE",
        url: "/articles"
    })
        .then(function (data) {
            location.reload();
        })
})

// Whenever someone clicks a comment tag
$(document).on("click", ".comment", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);

            //TODO: Make this into a modal

            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  // Save an article to your list
  $(document).on("click", ".save", function () {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "PUT",
        url: "/articles/" + thisId,
        data: {
            saved: true,
          }
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
        });
});