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

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://bing-news-search1.p.rapidapi.com/news/search?q=covid19,india&freshness=Day&textFormat=Raw&safeSearch=Off",
    "method": "GET",
    "headers": {
      "x-bingapis-sdk": "true",
      "x-rapidapi-key": "5081e8c365msh8de4c5704f94427p1bb7d5jsn088bd89ba27b",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
    }
  };
  
  $.ajax(settings).done(function (json) {
    var html = '<div class="row gutterRow">';
    $.each(json.value, function(index) {
        html += '<div class="coloumn-3 gutter"><img src="' + json.value[index].image.thumbnail.contentUrl + '&w=412&h=264&c=14&rs=2&qlt=100&dpr=1.5"  alt="' + json.value[index].name + '" class="imageFluid"><div>' + json.value[index].name + '</div></div>';
    });
    html += '</div>';
    $('#news').append(html);
  });
});