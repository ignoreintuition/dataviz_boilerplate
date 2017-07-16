// initiate, render, and handle input for our events
// source of data: http://data.okfn.org/data/core/global-temp/r/monthly.json

d3.queue()
  .defer(d3.json, "http://localhost:3000/data")
  .await(function(error, d) {

    // create our svg element on the page
    barGraph.container.svg = d3.select("#graph").append('svg')
      .attr("height", barGraph.container.height)
      .attr("width", barGraph.container.width);

    var group = function(genre) {
      var grp = d3.nest()
        .key(function(d) {
          return d.release_year;
        })
        .rollup(function(v) {
          return d3.mean(v, function(d) {
            return d.score;
          })
        })
        .entries(genre ? d.filter(function(d){ return d.genre == genre;}) : d);

      grp.sort(function(x, y) {
        return d3.ascending(x.key, y.key);
      });
      return grp;
    }

    barGraph.render(
      group().filter(function(g) {
        return g.key != 1970;
      }),
      "key",
      "value");

    document.getElementById("sports").addEventListener('click', function() {
      barGraph.render(group("Sports").filter(function(g) {
          return g.key != 1970;
        }),
        "key",
        "value");
    })
    document.getElementById("adventure").addEventListener('click', function() {
      barGraph.render(group("Adventure").filter(function(g) {
          return g.key != 1970;
        }),
        "key",
        "value");
    })
    document.getElementById("all").addEventListener('click', function() {
      barGraph.render(group().filter(function(g) {
          return g.key != 1970;
        }),
        "key",
        "value");
    })
  });
