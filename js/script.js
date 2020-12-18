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

  $.ajax("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=india&api-key=K7jlMnbGHMdEotmeDIgA84zDij4yyjwB").done(function (json) {
    var html = '<div class="row gutterRow" id="gutterRow">';
    $.each(json.response.docs, function (index) {
      if (json.response.docs[index].multimedia.length > 0) {
        var imageUrl = "";
        for(key in json.response.docs[index].multimedia) {
          if(json.response.docs[index].multimedia[key].subtype == "threeByTwoMediumAt2X") {
            imageUrl = json.response.docs[index].multimedia[key].url;
          }
        }
        html += '<div class="coloumn-3 gutter"><a class="newsLink" href="' + json.response.docs[index].web_url + '" target="_blank" rel="noopener noreferrer"><img src="https://static01.nyt.com/' + imageUrl + '" alt="News image: ' + (index + 1) + '" class="imageFluid newsImage"><div class="newsText">' + json.response.docs[index].abstract + '</a></div></div>';
      }
    });
    html += '</div>';
    $('#news').append(html);

    function scrollHorizontally(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      document.getElementById('gutterRow').scrollLeft -= (delta * 50);
      e.preventDefault();
    }
    if (document.getElementById('gutterRow').addEventListener) {
      document.getElementById('gutterRow').addEventListener("mousewheel", scrollHorizontally, false);
      document.getElementById('gutterRow').addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
      document.getElementById('gutterRow').attachEvent("onmousewheel", scrollHorizontally);
    }
  });

  $.ajax("https://api.covid19india.org/data.json").done(function (data) {
    var dailyactive_ = data.statewise[0].deltaconfirmed - data.statewise[0].deltarecovered - data.statewise[0].deltadeaths;
    if (dailyactive_ > 0) {
      dailyactive = dailyactive_;
    } else {
      dailyactive = 0;
    }
    $("#totalConfirmed").html(Number(data.statewise[0].confirmed).toLocaleString('en-IN'));
    $("#totalActive").html(Number(data.statewise[0].active).toLocaleString('en-IN'));
    $("#totalRecovered").html(Number(data.statewise[0].recovered).toLocaleString('en-IN'));
    $("#totalDeceased").html(Number(data.statewise[0].deaths).toLocaleString('en-IN'));
    $("#dailyRecovered").html(Number(data.statewise[0].deltarecovered).toLocaleString('en-IN'));
    $("#dailyConfirmed").html(Number(data.statewise[0].deltaconfirmed).toLocaleString('en-IN'));
    $("#dailyDeceased").html(Number(data.statewise[0].deltadeaths).toLocaleString('en-IN'));
    $("#dailyActive").html(dailyactive);
    $("#lastUpdated").html("<div class='bold'>COVID-19 CASES</div><div>Last update: " + data.statewise[0].lastupdatedtime);

    $('.counter').counterUp({
      delay: 10,
      time: 500
    });
  });

  feather.replace()
});