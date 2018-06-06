const form = document.getElementById('search'),
      input = document.getElementById('input-search'),
      main = document.querySelector('main');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  title = input.value;

  //Handle Ajax with jQuery
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=30&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + title + "&callback=JSON_CALLBACK",
    dataType: 'jsonp',
    type: 'POST',
    headers: {
      'Api-User-Agent': 'Example/1.0'
    },
    success: function (data) {
      let pages = data.query.pages,
          message = '<ul class="articles">';

      $.each(pages, function (index, article) {
        let title = article.title,
            content = article.extract;
        //if the content of article is undefined, don't append the article
        if (content !== undefined) {
          message += '<li>';
          message += '<h2 class="title">' + title + '</h2>';
          message += '<p class="content">' + content + '</p>';
          message += '</li>';
        }

      }); //end each
      message += '</ul>';
      main.innerHTML = message;
    },//end success
    fail: function () {
      document.querySelector('.error').style.display = 'block';
    }
  });//end ajax

}); //End form submit event