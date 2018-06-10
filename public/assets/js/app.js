$(function () {
    $("#btnScrape").on("click", function (event) {
        // $(document).on("click", "#btnScrape", function() { //})
        console.log("initiating click event");
        // event.preventDefault();
        // console.log("just prevented default");

        $.ajax("/scrape", {
            type: "GET",
            url: "/scrape"
        }).then(function () {
            console.log("successfully sent ajax request");
        }).catch(function () {
            console.log("not a successful ajax request");
        });
    });
});