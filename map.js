var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

var scroller;

function animateLine() {
  var scrollpercent =
    (document.body.scrollTop + document.documentElement.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);

  function highlightCountry(countryId, color) {
    $("#map-svg")
      .contents()
      .find(countryId)
      .attr({
        fill: color,
        stroke: color,
      });
  }

  function deActivateCountry(countryId) {
    $("#map-svg")
      .contents()
      .find(countryId)
      .removeAttr("fill")
      .removeAttr("stroke");
  }

  function activateAll() {
    highlightCountry("#ST", "#547794");
    highlightCountry("#PA", "#547794");
    highlightCountry("#DM", "#547794");
    highlightCountry("#BF", "#547794");
    highlightCountry("#SV", "#547794");
    highlightCountry("#SB", "#547794");
    highlightCountry("#KI", "#547794");
    highlightCountry("#NI", "#547794");
    highlightCountry("#HN", "#547794");
    //remaining allies
    highlightCountry("#MH", "#547794");
    highlightCountry("#NR", "#547794");
    highlightCountry("#PW", "#547794");
    highlightCountry("#TV", "#547794");
    highlightCountry("#SZ", "#547794");
    highlightCountry("#VA", "#547794");
    highlightCountry("#BZ", "#547794");
    highlightCountry("#GT", "#547794");
    highlightCountry("#HT", "#547794");
    highlightCountry("#PY", "#547794");
    highlightCountry("#KN", "#547794");
    highlightCountry("#LC", "#547794");
    highlightCountry("#VC", "#547794");
  }

  function activateCutoff() {
    highlightCountry("#ST", "#CD314C");
    highlightCountry("#PA", "#CD314C");
    highlightCountry("#DM", "#CD314C");
    highlightCountry("#BF", "#CD314C");
    highlightCountry("#SV", "#CD314C");
    highlightCountry("#SB", "#CD314C");
    highlightCountry("#KI", "#CD314C");
    highlightCountry("#NI", "#CD314C");
    highlightCountry("#HN", "#CD314C");

    // Cut-off allies
    deActivateCountry("#MH");
    deActivateCountry("#NR");
    deActivateCountry("#PW");
    deActivateCountry("#TV");
    deActivateCountry("#SZ");
    deActivateCountry("#VA");
    deActivateCountry("#BZ");
    deActivateCountry("#GT");
    deActivateCountry("#HT");
    deActivateCountry("#PY");
    deActivateCountry("#KN");
    deActivateCountry("#LC");
    deActivateCountry("#VC");
  }

  function activateRemaining() {
    deActivateCountry("#ST");
    deActivateCountry("#PA");
    deActivateCountry("#DM");
    deActivateCountry("#BF");
    deActivateCountry("#SV");
    deActivateCountry("#SB");
    deActivateCountry("#KI");
    deActivateCountry("#NI");
    deActivateCountry("#HN");

    // Remaining allies
    highlightCountry("#MH", "#2F404F");
    highlightCountry("#NR", "#2F404F");
    highlightCountry("#PW", "#2F404F");
    highlightCountry("#TV", "#2F404F");
    highlightCountry("#SZ", "#2F404F");
    highlightCountry("#VA", "#2F404F");
    highlightCountry("#BZ", "#2F404F");
    highlightCountry("#GT", "#2F404F");
    highlightCountry("#HT", "#2F404F");
    highlightCountry("#PY", "#2F404F");
    highlightCountry("#KN", "#2F404F");
    highlightCountry("#LC", "#2F404F");
    highlightCountry("#VC", "#2F404F");
  }

  if (scrollpercent < 0.33) {
    // Step 1
    activateAll();
  } else if (scrollpercent < 0.66) {
    // Step 2
    activateCutoff();
  } else {
    // Step 3
    activateRemaining();
  }
}

$(window).scroll(function () {
  animateLine();
});

function initScrollama() {
  // Initialize the scrollama
  scroller = scrollama();

  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.1,
      progress: true,
      debug: false,
    })
    .onStepProgress(handleStepProgress);
}

// Call the initScrollama function when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initScrollama();
});

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight / 2;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure.style("height", figureHeight + "px").style("top", figureMarginTop + "px");
}

// scrollama event handler for progress
function handleStepProgress(response) {
  console.log(response);
  // response = { element, progress, index }

  // Check the direction of scrolling
  if (response.progress > 0 && response.direction === "down") {
    // Add color to current step only
    step.classed("is-active", function (d, i) {
      return i === response.index;
    });

    // Update graphic based on step
    figure.select("p").text(response.index + 1);

    // Apply color changes for each step based on progress
    if (response.index === 0) {
      activateAll();
    } else if (response.index === 1) {
      activateCutoff();
    } else if (response.index === 2) {
      activateRemaining();
    }
  }
}

// Call the initScrollama function when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initScrollama();
  handleResize();
});

// Window resize listener
window.addEventListener("resize", handleResize);
