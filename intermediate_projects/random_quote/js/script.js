const QUOTE = $(".quote");
const AUTHOR = $(".cite");

function changeColor() {
  const COLORS = ["#384047", "#b61241", "#34d174", "#d19a3c", "#53dfba"];
  var color = Math.floor(Math.random() * COLORS.length);
  $("body").css('background', COLORS[color]);
  $("button").css('background', COLORS[color]);
  $("a").css('background', COLORS[color]);
  $(QUOTE).css('color', COLORS[color]);
}

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function (data) {
      changeColor();
      var quote = data.quote;
      var author = data.author;
      QUOTE.text(quote);
      AUTHOR.text("-" + author);
      
      $(".quote-tweet").attr("href", 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + '"' + quote + '" ' + author);


      $(".quote-tumblr").attr("href", 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + author + '&content=' + quote + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    },
    error: function () {
      changeColor();
      QUOTE.css('color','#df4d4d');
      QUOTE.text("There is an error!Please try later!!");
    }
  });
}

$(document).ready(function () {
  getQuote();

  $('.getQuote').click(function () {
    getQuote();
  });

})
