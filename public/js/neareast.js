// Front-end JS

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page

      var articleLink = $("<a>");
      articleLink.attr("href", data[i].link);

      var articleContainer = $("<div>");
      articleContainer.addClass("article-container");
      articleContainer.attr("data-id", data[i]._id);

      var articleTitle = $("<h2>");
      articleTitle.text(data[i].title);

      var articleSource = $("<div>");
      articleSource.addClass("article-source");
      articleSource.append(data[i].source);

      var articleAuthor = $("<p>");
      articleAuthor.append("By: " + data[i].author);

      var articleDate = $("<p>");
      articleDate.append(data[i].date);

      articleContainer.append(articleSource);
      articleContainer.append(articleTitle);
      if (data[i].author) {
          articleContainer.append(articleAuthor);
      }
    //   articleContainer.append(articleDate);
      articleLink.append(articleContainer);

      $("#articles").append(articleLink);
    }
  });