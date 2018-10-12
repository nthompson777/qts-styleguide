// Initialize Foundation 
$(document).foundation();

// Active Link Tracking - apply 'active' class to Current Link in Nav
$(function () {
  setNavigation();
});
function setNavigation() {
  var path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);

  $('nav li a, #offCanvasMenu li a').each(function () {
      var href = $(this).attr('href');
      if (path.substring(0, href.length) === href) {
          $(this).closest('a').addClass('active');
      }
  });
}

// Fix for Foundation 6 Reveal (Modal) Scrolling to Top when closed on mobile devices
var scrollPosition = 0;
var modalOpen = false;
var $reveal = $('.reveal');
$reveal.on('closeme.zf.reveal', function() {
  if(!modalOpen) scrollPosition = $(document).scrollTop();
});
$reveal.on('open.zf.reveal', function() {
  modalOpen = true;
});
$reveal.on('closed.zf.reveal', function() {
  $(document).scrollTop(scrollPosition);
  modalOpen = false;
});;