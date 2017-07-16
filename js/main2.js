var d = [10, 15, 21, 4, 17];

var svg = d3.select("#graph2").append("svg")
  .attr("height", 200)
  .attr("width", 200)

//init
var rects = svg.selectAll("rect").data(d);

//enter
rects.enter().append("rect")
  .attr("x", 1)
  .attr("width", function(d) {
    return d * 10;
  })
  .attr("height", 20)
  .attr("y", function(d, i) {
    return i * 21;
  })

// update

// exit
rects.exit().remove();
