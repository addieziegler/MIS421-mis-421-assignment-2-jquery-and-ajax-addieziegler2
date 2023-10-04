$(document).ready(function () {
    $("#searchButton").on("click", apiSearch);
    $("#currentTimeButton").on("click", displayTimeDialog);
    $("#luckyButton").on("click", onLuckyButtonClick);
    $("#sithModeButton").on("click", setSithMode);
    $("#jediModeButton").on("click", setJediMode);

    setRandomBackground();

    $("#myHeader").on("click", function () {
        setRandomBackground();
        setTimeout(function () {
            setRandomBackground();
        }, 500);
    })
});

var params = {
    "q": "",
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
};

function apiSearch() {
    params.q = $("#query").val();

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6c30168cfa6c4d899defe24603142ab1");
        },
        type: "GET",
    })
        .done(function (data) {
            var results = '';
            var len = data.webPages.value.length;
            for (var i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
            }

            $('#searchResults').html(results);
            $('#searchResults').show();
        })
        .fail(function () {
            alert("Error");
        });
}
var backgroundImages = [
    'url("https://th.bing.com/th/id/R.66bc87357d552cac51f7de18d5bedfe9?rik=FapdXnugBG9a2Q&pid=ImgRaw&r=0")',
    'url("https://th.bing.com/th/id/R.9df7c989863232978e854c2ccd189c74?rik=kPH7dddifc%2fCXA&pid=ImgRaw&r=0")',
    'url("https://t3.ftcdn.net/jpg/01/02/88/40/360_F_102884000_9nDhPvgQwwaNgDWbAwUJVR0puNDOMYhL.jpg")',
    'url("https://lumiere-a.akamaihd.net/v1/images/image_1921b77b.jpeg")',
    'url("https://lumiere-a.akamaihd.net/v1/images/sa_starwars_virtualbg_16x9_016_dbf0ad57.jpeg")',
    'url("https://lumiere-a.akamaihd.net/v1/images/star-wars-backgrounds-26_9578e6d4.jpeg")',
    'url("https://images4.alphacoders.com/131/1313954.jpeg")'

];
var currentBackgroundIndex = 0;

function setRandomBackground() {
    $("body").css("background-image", backgroundImages[currentBackgroundIndex]);
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
}


function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
}

function displayTimeDialog() {
    var currentTime = getCurrentTime();
    var message = currentTime + " is the current time.";
    $('#time').text(message);
    $('#time').show();
}
function setSithMode() {
    $("body").css("background-color", "#900");
    $("body").css("color", "#000");
    $("#myHeader").css("background-color", "#900");
    $("#myHeader").css("color", "#000");
    $("#searchResults").css("background-color", "#900");
    $("#searchResults").css("color", "#000");
    $("#redLightsaber").show();
    $("#blueLightsaber").hide();
}

function setJediMode() {
    $("body").css("background-color", "#0000A0");
    $("body").css("color", "#fff");
    $("#myHeader").css("background-color", "#0000A0");
    $("#myHeader").css("color", "#fff");
    $("#searchResults").css("background-color", "#0000A0");
    $("#searchResults").css("color", "#fff");
    $("#redLightsaber").hide();
    $("#blueLightsaber").show();
}

function onLuckyButtonClick() {
    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6c30168cfa6c4d899defe24603142ab1");
        },
        type: "GET",
    })
        .done(function (data) {
            if (data.webPages.value.length > 0) {
                window.open(data.webPages.value[0].url, "_blank");
            } else {
                alert("No search results available.");
            }
        })
        .fail(function () {
            alert("Error");
        });
}

