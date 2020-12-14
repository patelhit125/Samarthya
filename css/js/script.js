$(document).ready(function () {
  $('.button')
    .on('mouseenter', function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('.buttonHover').css({ top: relY, left: relX })
    })
    .on('mouseout', function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('.buttonHover').css({ top: relY, left: relX })
    });
  $('[href=#]').click(function () { return false });

  $('#navbarToggle').click(function () {
    if ($('#navbarContainer').hasClass('open')) {
      $('#navbarContainer').slideUp();
      $('#navbarContainer').removeClass('open');
      $('#navbarToggler').removeClass('open');
      $('body').css("overflow", 'auto');
    }
    else {
      $('#navbarContainer').slideDown();
      $('#navbarContainer').addClass('open');
      $('#navbarToggler').addClass('open');
      $('body').css("overflow", 'hidden');
    }
  });

  $('.scrollDown').click(function (e) {
    e.preventDefault();
    $id = $(this).attr('href');
    $('body,html').animate({
      scrollTop: $($id).offset().top
    }, 500);
  });

  $.getJSON("http://newsapi.org/v2/top-headlines?country=in&apiKey=8fc49f9f51894ea399ce1a2317312de6", function(json) {
    $.each(json.articles, function(index) {
      if(json.articles[index].urlToImage != null) {
        $('#news').append('<div class="coloumn-3 gutter"><img src="' + json.articles[index].urlToImage + '" alt="" class="imageFluid"><div></div>' + json.articles[index].title + '</div>');
      }
    });
  });
});