var bodyParser = require("body-parser");
var express = require("express");
var exprHbrs = require("express-handlebars");

var mongoose = require("mongoose");

var request = require("request");
var cheerio = require("cheerio");

var PORT = 3000;

var app = express();

var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.engine("handlebars", exprHbrs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
    res.redirect("/home");
    // console.log("app.get('/'): res.get('url'): ", res.get(url));
    // res.render("index");
});

app.get("/home", function(req, res) {
    console.log(req.originalUrl);
    // res.render("../views/layouts/main.handlebars");
    res.render("index");
});


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get(/*".btn-scrape", function(req, res) {  )( */ "/scrape", function (req, res) {
    console.log("app.get('/scrape' has been started");

    console.log("about to start the request for scraping the WashingtonPost");
    /*$.*/ /*ajax.get /*request*/request("http://www.washingtonpost.com/", function(error, response, html) {//.then(function(response) { //, function (error, response, html) {
        console.log("top level of the scrape request, at this point '$' is: " + $);
        var $ = cheerio.load(html); // response.data);
        console.log("after assingning '$' to cheerio.load(html), the value of '$' is: " + $);

        $(("class", "moat-trackable") && ("moat-id", "homepage\*" /*/card"*/)).each(function(x, element) { //})
        // $(this.attr("moat-id", ("homepage\/card") || ("homepager\/story"))).each(function (i, element) {
            var results = {};

            // if ((results.at))

            // var title = $(element).children("a").text();
            // var link = $(element).children("a").attr("href");
            // var summary = $(element).children("div[class=blurb]").text();
            // var authorName = $(element).children("a").parent("span[class=author]").text();
            // var authLink = $(element).children("a").parent("span[class=author]").attr("href");

            results.title = $(this).children("a").text();
            results.link = $(this).children("a").attr("href");
            results.summary = $(this).children("div[class=blurb]").text();
            results.authorName = $(this).children("a").parent("span[class=author]").text();
            results.authLink = $(this).children("a").parent("span[class=author]").attr("href");

            db.Article.create(results).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                return res.json(err);
            });
        });

        res.send("Scrape Completed Successfully");
    });
});

app.get("/saved-articles", function(res, req) {
    db.Article.find({}).then((articles) => {
        res.json(articles);
    }).catch(err => {
        res.json(err);
    });
});

app.get("/saved-articles/:id", function(req, req) {
    db.Article.fin
});

app.listen(PORT, function() {
    console.log("Currently listening at MONGODB_URI: " + MONGODB_URI);
});