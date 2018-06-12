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

app.get("/", function (req, res) {
    res.redirect("/home");
    // console.log("app.get('/'): res.get('url'): ", res.get(url));
    // res.render("index");
});

app.get("/home", function (req, res) {
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
    /*$.*/ /*ajax.get /*request*/request("http://www.washingtonpost.com/", function (error, response, html) {//.then(function(response) { //, function (error, response, html) {
        console.log("top level of the scrape request, at this point '$' is: ", $);
        var $ = cheerio.load(html);
        console.log("after assingning '$' to cheerio.load(html), the value of '$' is: ", $);

        console.log("the value of results before initialization: ", results);
        var results = {
            // title: "",
            // link: "",
            // summary: ""
        };
        var resultArray = [results];
        console.log("the value of results after initialization: ", results);

        console.log("about to begin the .each loop looking for matching elements: ");
        if (error) {
            console.log("it threw an error: ", error);
        }

        // else {
        //     // console.log("the response was: ", response.toJSON);
        //     // console.log("the value of 'html' is: ", html);
        // }
        $(/*'div'*/ '.headline').each(function (x, element) {
            // console.log("the current value of 'x' is: ", x);
            // console.log("the length of element: ", $(this).attr()); //element.attribs);
            // if ($(this).hasClass('headline')) {//$(this).attr("class") == "headline") {
            // try { (element.attribs[x].toString() == 'headline') 
            // console.log("the element's child is: ", $(this).children().val.toString());
            console.log("\nthe current value of 'x' is: ", x);
            try {
                if (!(($(this).children("a").attr("href")) == ("" || undefined || "undefined" || null || "null" || " "))) {
                    console.log("\nthe length of element: \n", $(this).children("a").attr("href"));
                }
            }
            catch (error1) {
                console.log("\nerror1 thrown: \n", error1);
            }
            try {
                if (!(($(this).children("a").attr("href")) == ("" || undefined || "undefined" || null || "null" || " "))) {
                    console.log("\nthe parents of .headline are: \n", $(this).parent().html().toString());
                }
            }
            catch(error2) {
                console.log("\nerror2 thrown: \n", error2);
            }
            try {
                if (!(($(this).children("a").attr("href")) == ("" || undefined || "undefined" || null || "null" || " "))) {
                    console.log("\children link: \n", $(this).children("a").text());
                    results.title = $(this).children("a").text();

                    console.log("\nthe current value of results.title is: \n", results.title);
                }
                else {
                    results.title = "no title available";

                    console.log("\the current value of results.title is: \n", results.title);
                }
            }
            catch(error3) {
                console.log("\nerror3 thrown: \n", error3);
            }
            try {
                if (!(($(this).children("a").attr("href")) == ("" || undefined || "undefined" || null || "null" || " "))) {
                    console.log("\nthe text of the headline is: ", $(this).children("a").attr("href"));
                    results.link = $(this).children("a").attr("href");

                    console.log("\nthe current value of results.link is: \n", results.link);
                }
                else {
                    results.link = "no link available";

                    console.log("\nthe current value of results.link is: \n", results.link);
                }
            }
            catch(error4) {
                console.log("\nerror4 thrown: \n", error4);
            }
            try {
                if (!(($(this).children("a").attr("href")) == ("" || undefined || "undefined" || null || "null" || " "))) {
                    console.log("\nthe article summary: ", $(this).parent("div").children(".blurb").text());
                    results.summary = $(this).parent("div").children(".blurb").text();

                    console.log("\nthe current value of results.summary is: \n", results.summary);
                }
                else {
                    results.summary = "no summary available";

                    console.log("\nthe current value of results.summary is: \n", results.summary);
                }
            }
            catch(error5) {
                console.log("\nerror5 thrown: \n", error5);
            }
            
            // will be re-enabled once I get it working correctly
            /* $('span').each(function (x, elem) {
                if ($(this).hasClass("author") && $(this).hasClass("vcard")) {
                    console.log("\nthe value of each author is: ", $(this).children("a").text());
                    console.log("\nthe link to each author is: ", $(this).children("a").attr("href"));
                }
            }); */

            // console.log("\nthe article's author(s): ", $(this).parent("div").children(".author").children("a").text());
            // }
            // try {
            // console.log("the current value of 'element' is: ", element.children); //.name.toString());
            // }
            // catch (error20) {
            // console.log(error20);
            // }
            // console.log("the current value of 'this' is: \n", $(this));
            // /*console.log("the current value of 'this' 's first child is: \n", */$(this).children().each(function(y, elem) {
            //     console.log("about to start for loop");
            //     console.log("the value of y is: ", y);
            //     // console.log("the value of elem is: ", elem);
            //     // for (z = 0; z < elem.length; z++) {
            //         try {
            //             if (elem.attribs[y].toString() != undefined) {
            //                 console.log("\nattribs[y] of elem: ", elem.attribs[y].toString());
            //             }
            //             else {
            //                 console.log("\nattribs[y] of elem: undefined");
            //             }
            //         }
            //         catch (error1) {
            //             // console.log("error: ", error1)
            //         }
            //         try {
            //             if (elem.childNodes[y].toString() != undefined) {
            //                 console.log("\nchildNodes[y] of elem: ", elem.childNodes[y].toString());
            //             }
            //             else {
            //                 console.log("\nchildNodes[y] of elem: undefined");
            //             }
            //         }
            //         catch (error2) {
            //             // console.log(error2);
            //         }
            //         try {
            //             if (elem.children.values.toString() != undefined) {
            //                 console.log("\nchildren.values of elem: ", elem.children.values.toString());
            //             }
            //             else {
            //                 console.log("\nchildren.values of elem: undefined");
            //             }
            //         }
            //         catch (error3) {
            //             // console.log(error3);
            //         }
            //         try {
            //             if (elem.data[y].toString() != undefined) {
            //                 console.log("\ndata[y] of elem: ", elem.data[y].toString());
            //             }
            //             else {
            //                 console.log("\ndata[y] of elem: undefined");
            //             }
            //         }
            //         catch (error4) {
            //             // console.log(error4);
            //         }
            //         try {
            //             if (elem.firstChild != undefined) {
            //                 console.log("\nfirstChild of elem: ", elem.firstChild);
            //             }
            //             else {
            //                 console.log("\nfirstChild of elem: undefined");
            //             }
            //         }
            //         catch (error5) {
            //             // console.log(error5);
            //         }
            //         try {
            //             if (elem.lastChild != undefined) {
            //                 console.log("\nlastChild of elem: ", elem.lastChild);
            //             }
            //             else {
            //                 console.log("\nlastChild of elem: undefined");
            //             }
            //         }
            //         catch (error6) {
            //             // console.log(error6);
            //         }
            //         try {
            //             if (elem.name[y].toString() != undefined) {
            //                 console.log("\nname[y] of elem: ", elem.name[y].toString());
            //             }
            //             else {
            //                 console.log("\nname[y] of elem: undefined");
            //             }
            //         }
            //         catch (error7) {
            //             // console.log(error7);
            //         }
            //         try {
            //             if (elem.next != undefined) {
            //                 console.log("\nnext of elem: ", elem.next);
            //             }
            //             else {
            //                 console.log("\nnext of elem: undefined");
            //             }
            //         }
            //         catch (error8) {
            //             // console.log(error8);
            //         }
            //         try {
            //             if (elem.nextSibling != undefined) {
            //                 console.log("\nnextSibling of elem: ", elem.nextSibling);
            //             }
            //             else {
            //                 console.log("\nnextSibling of elem: undefined");
            //             }
            //         }
            //         catch (error9) {
            //             // console.log(error9);
            //         }
            //         try {
            //             if (elem.nodeValue[y].toString() != undefined) {
            //                 console.log("\nnodeValue[y] of elem: ", elem.nodeValue[y].toString());
            //             }
            //             else {
            //                 console.log("\nnodeValue[y] of elem: undefined");
            //             }
            //         }
            //         catch (error10) {
            //             // console.log(error10);
            //         }
            //         try {
            //             if (elem.parent != undefined) {
            //                 console.log("\nparent of elem: ", elem.parent);
            //             }
            //             else {
            //                 console.log("\nparent of elem: undefined");
            //             }
            //         }
            //         catch (error11) {
            //             // console.log(error11);
            //         }
            //         try {
            //             if (elem.parentNode != undefined) {
            //                 console.log("\nparentNode of elem: ", elem.parentNode);
            //             }
            //             else {
            //                 console.log("\nparentNode of elem: undefined");
            //             }
            //         }
            //         catch (error12) {
            //             // console.log(error12);
            //         }
            //         try {
            //             if (elem.prev != undefined) {
            //                 console.log("\nprev of elem: ", elem.prev);
            //             }
            //             else {
            //                 console.log("\nprev of elem: undefined");
            //             }
            //         }
            //         catch (error13) {
            //             // console.log(error13);
            //         }
            //         try {
            //             if (elem.previousSibling != undefined) {
            //                 console.log("\npreviousSibling of elem: ", elem.previousSibling);
            //             }
            //             else {
            //                 console.log("\npreviousSibling of elem: undefined");
            //             }
            //         }
            //         catch (error14) {
            //             // console.log(error14);
            //         }
            //         try {
            //             if (elem.tagName[y].toString() != undefined) {
            //                 console.log("\ntagName[y] of elem: ", elem.tagName[y].toString());
            //             }
            //             else {
            //                 console.log("\ntagName[y] of elem: undefined");
            //             }
            //         }
            //         catch (error15) {
            //             // console.log(error15);
            //         }
            //         try {
            //             if (elem.type[y].toString() != undefined) {
            //                 console.log("\ntype[y] of elem: ", elem.type[y].toString());
            //             }
            //             else {
            //                 console.log("\ntype[y] of elem: undefined");
            //             }
            //         }
            //         catch (error16) {
            //             // console.log(error16);
            //         }
            //     // };
            // })/*)*/;
            // console.log("the current children of 'element' are: \n", element.children.entries.toString()); //..values().toString());
            // console.log("the current first child of 'element' is: \n", element.firstChild);
            // console.log("the current childnodes of 'element' are: \n", element.childNodes.values); //.toString());
            // console.log("the current value of 'element' is: \n", element.attribs);
            // console.log("\nthe current value of 'this' is: ", $(this[x]).attr.toString());
            // console.log("\nthe current value of 'moat-id' is: ", $(this).attr('moat-id').toString());
            // if ((($(this).attr('moat-id').toString() === "homepage/story") && ($(this).attr('data-feature-id').toString() === "homepage/story")) || (($(this).attr("moat-id").toString() === "homepage/card") && ($(this).attr("data-feature-id").toString() === "homepage/card"))) {
            // var results = {};

            // if ((results.at))

            // var title = $(element).children("a").text();
            // var link = $(element).children("a").attr("href");
            // var summary = $(element).children("div[class=blurb]").text();
            // var authorName = $(element).children("a").parent("span[class=author]").text();
            // var authLink = $(element).children("a").parent("span[class=author]").attr("href");

            // console.log("the current value of results is: ", results);
            // console.log("\nthe value of '$(this).children('a').text()' is: ", $(this).children("a").text());
            // results.title = $(this).children("a").text();
            // // console.log("the current value of results.title: ", results.title);
            // // console.log("\nthe value of '$(this).children('a').attr('href')' is: ", $(this).children("a").attr("href"));
            // results.link = $(this).children("a").attr("href");
            // // console.log("the current value of results.link: ", results.link);
            // // console.log("\nthe value of '$(this).children('div[class=blurb').text()' is: ", $(this).children("div[class=blurb]").text());
            // results.summary = $(this).children("div[class=blurb]").text();
            // // console.log("the current value of results.summary: ", results.summary);
            // // console.log("\nthe value of '$(this).children('a').parent('span[class=author]').text()' is: ", $(this).children("a").parent("span[class=author]").text());
            // results.authorName = $(this).children("a").parent("span[class=author]").text();
            // // console.log("the current value of results.authorName: ", results.authorName);
            // // console.log("\nthe value of '$(this).children('a').parent('span[class=author]').attr('href')' is: ", $(this).children("a").parent("span[xlass=author]").attr("href"));
            // results.authorLink = $(this).children("a").parent("span[class=author]").attr("href");
            // console.log("the current value of results.authorLink: ", results.authorLink);
            // }
            resultArray.push(results);

            console.log("\nthe current value of resultsArray is: \n", resultArray[x]);

            console.log("\nthe total values of resultsArray are: \n", resultArray.toString());
        });

        console.log("\here are the results: \n", results);

        db.Article.create(results).then(function (dbArticle) {
            console.log(dbArticle);
        }).catch(function (err) {
            // /*return*/ res.json(err);
        });
        res.send("Scrape Completed Successfully");
    });
});

app.get("/saved-articles", function (res, req) {
    db.Article.find({}).then((articles) => {
        res.json(articles);
    }).catch(err => {
        res.json(err);
    });
});

app.get("/saved-articles/:id", function (req, req) {
    db.Article.fin
});

app.listen(PORT, function () {
    console.log("Currently listening at MONGODB_URI: " + MONGODB_URI);
});