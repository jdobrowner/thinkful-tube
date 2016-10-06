$(function() { watchSubmit(); });

function watchSubmit() {
  $('.js-search').submit( function(e) {
    e.preventDefault();
    searchYouTube();
  });
}

function searchYouTube(video) {
  var userText = $('#query').val();
  getDataFromApi(userText);
}

function getDataFromApi(searchTerm) {
  var Utube_URL = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
    part: 'snippet',
    key: 'AIzaSyCxqWyT5e6GziDLh2E69mHbjSy4bMNIr1I',
    q: searchTerm,
    maxResults: 40,
    type: 'video'
  }
    $.getJSON(Utube_URL, params, function(results) {
      displayResults(results.items);
    });
  }

function displayResults(results) {
  $('ul').children().remove();
  var videoURL = '', thumbURL = '', title = '';
  $.each(results, function(index,value){
      videoURL = 'https://www.youtube.com/watch?v=' + value.id.videoId;
      thumbURL = value.snippet.thumbnails.medium.url;
      title = value.snippet.title;
      //if (title.length === 50) { title+= '..'};
      var linkTo = '<a href="' + videoURL + '" target="_blank">';
      var setUpVideo = '<li>' + linkTo + '<img class="thumbnail" src="' + thumbURL + '">';
      setUpVideo += '</a>' + linkTo + '<h3>' + title + '</h3></li></a>';

      $('ul').append(setUpVideo);
    });
}
