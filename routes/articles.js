var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/scrape", function (req, res) {

        // Scrape articles from Niqash
        axios.get("http://www.niqash.org/").then(function (response) {
            var $ = cheerio.load(response.data);

            $(".hp_feature").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Create an object with required source, title, and link, and optional author, summary, and date
                result.source = "Niqash";
                result.title = $(element).find("h2").children("a").text();
                result.link = $(element).find("h2").children("a").attr("href");
                result.author = $(element).find(".author").text().trim();
                result.summary = $(element).find(".hp_feature_text").text().trim();
                result.date = $(this).parent().find(".hp_box_date").text();

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });

            res.send("Scrape Complete");
        });

        // // Scrape articles from 1001 Iraqi Thoughts: Politics
        axios.get("http://1001iraqithoughts.com/174-2/").then(function (response) {
            var $ = cheerio.load(response.data);

            $(".post-content").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Create an object with required source, title, and link, and optional author, summary, and date
                result.source = "1001 Iraqi Thoughts";
                result.title = $(element).find("h2").children("a").text();
                result.link = $(element).find("h2").children("a").attr("href");
                result.summary = $(element).find(".excerpt p").text().trim();
                result.date = $(element).find(".post-meta").find(".updated").text().trim();

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });

            res.send("Scrape Complete");
        });

        // // Scrape articles from 1001 Iraqi Thoughts: Security
        axios.get("http://1001iraqithoughts.com/economy/").then(function (response) {
            var $ = cheerio.load(response.data);

            $(".post-content").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Create an object with required source, title, and link, and optional author, summary, and date
                result.source = "1001 Iraqi Thoughts";
                result.title = $(element).find("h2").children("a").text();
                result.link = $(element).find("h2").children("a").attr("href");
                result.summary = $(element).find(".excerpt p").text().trim();
                result.date = $(element).find(".post-meta").find(".updated").text().trim();

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });

            res.send("Scrape Complete");
        });

        // // Scrape articles from 1001 Iraqi Thoughts: Economy
        axios.get("http://1001iraqithoughts.com/economy-2/").then(function (response) {
            var $ = cheerio.load(response.data);

            $(".post-content").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Create an object with required source, title, and link, and optional author, summary, and date
                result.source = "1001 Iraqi Thoughts";
                result.title = $(element).find("h2").children("a").text();
                result.link = $(element).find("h2").children("a").attr("href");
                result.summary = $(element).find(".excerpt p").text().trim();
                result.date = $(element).find(".post-meta").find(".updated").text().trim();

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });

            res.send("Scrape Complete");
        });

        // // Scrape articles from 1001 Iraqi Thoughts: Society
        axios.get("http://1001iraqithoughts.com/society/").then(function (response) {
            var $ = cheerio.load(response.data);

            $(".post-content").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Create an object with required source, title, and link, and optional author, summary, and date
                result.source = "1001 Iraqi Thoughts";
                result.title = $(element).find("h2").children("a").text();
                result.link = $(element).find("h2").children("a").attr("href");
                result.summary = $(element).find(".excerpt p").text().trim();
                result.date = $(element).find(".post-meta").find(".updated").text().trim();

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });

            res.send("Scrape Complete");
        });

        // Scrape articles from Al-Monitor: Iraq
        axios.get("https://www.al-monitor.com/pulse/iraq-pulse").then(function (response) {
            var $ = cheerio.load(response.data);

            $(".border-container").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Create an object with required source, title, and link, and optional author, summary, and date
                result.source = "Al-Monitor";
                result.title = $(element).find("h2").children("a").text();
                result.link = "https://www.al-monitor.com" + $(element).find("h2").children("a").attr("href");
                result.author = $(element).attr("title");
                result.date = $(element).attr("title");

                if (result.author) {
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            return res.json(err);
                        });
                }
            });

            res.send("Scrape Complete");
        });

    });

    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // // Route for grabbing a specific Article by id, populate it with its note
    app.get("/articles/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {

        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for updating a saved article
    app.put("/articles/:id", function (req, res) {
        // Update the note that matches the object id
        db.Article.findOneAndUpdate(
            { _id: req.params.id },
            {$set: { saved: true }},
            function (error, edited) {
                // Log any errors from mongojs
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    // Otherwise, send the mongojs response to the browser
                    // This will fire off the success function of the ajax request
                    console.log(edited);
                    res.send(edited);
                }
            });
    });

    // Route for visiting page with news sources
    app.get("/sources", function (req, res) {
        res.render("sources");
    });

    // Route for visiting saved articles
    app.get("/saved", function (req, res) {
        res.render("saved");
    })
};