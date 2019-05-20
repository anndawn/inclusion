var width = $(".wheelw").width(),
  height = $(".wheelw").height(),
  radius = Math.min(width, height) / 2,
  innerRadius = 0;

var pie = d3v3.layout.pie()
  .sort(null)
  .value(function (d) {
    return d.width;
  });

var arc = d3v3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) {
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
  });
var innerRadius2;


var svg2 = d3v3.select(".wheelw").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g").attr("class","fan")
  .attr("transform", "translate(" + width / 2 + "," + (height / 2+10) + ")");

var color = [

  "#ffffb3",
  "#ffed6f",
  "#fdb462",
  "#f88d07",
  "#d7ab6f",
  "#fccde5",
  "#bc80bd",
  "#bebada",
  "#d8e1a8",
  "#ccebc5",
  "#8dd3c7",
  "#71a596",
  "#80b1d3",
  "#d9d9d9",
  "#ffffb3",
  "#ffed6f",
  "#fdb462",
  "#f88d07",
  "#d7ab6f",
  "#fccde5",
  "#bc80bd",
  "#bebada",
  "#d8e1a8",
  "#ccebc5",
  "#8dd3c7",
  "#71a596",
  "#80b1d3",
  "#d9d9d9"
]


d3v3.csv('aster.csv', function (error, data) {

  data.forEach(function (d, i) {
    d.id = d.id;
    d.weight = +d.weight;
    d.score = +d.score;
    d.width = +d.weight;
    d.label = d.label;
    d.color = color[i];
    d.type = d.type;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  console.log(data);
  let data1 = [];
  for (let index = 0; index < 14; index++) {
    const element = data[index];
    data1.push(element)
  };
  console.log(data1);
  let data2 = [];
  for (let index = 14; index < 28; index++) {
    const element = data[index];
    data2.push(element)
  };
  console.log(data2);
  var tip2 = d3v3.tip()
    .attr('class', 'd3-tip wheell')
    .offset([0, 0])
    .html(function (d, i) {
      return d.data.label + ": <span style='color:orangered'>" + data2[i].score + " → " + data1[i].score + "</span>" +
        "<br /><b>" + (data2[i].score / data1[i].score).toFixed(2) + " Times</b>";
    });

  svg2.call(tip2);
  var path = svg2.selectAll(".solidArc")
    .data(pie(data1))
    .enter().append("path")
    .attr("fill", function (d) {
      return d.data.color;
    })
    .attr("class",(d)=>d.data.label)
    .classed("solidArc", true)
    .attr("stroke", "none")
    .attr("d", arc)
    .on('mouseover', tip2.show)
    .on('mouseout', tip2.hide);


  var outerPath = svg2.append("g").attr("class","out").classed("fan",true).selectAll(".outlineArc")
    .data(pie(data2))
    .enter().append("path")
    .attr("class", (d) => d.data.label)
    .attr("fill", function (d) {
      return d.data.color;
    })
    .attr("stroke", "none")
    .classed("outlineArc",true )
    .attr("d", function (d, i) {
      innerRadius2 = data1[i].score * radius / 100;
      var arc2 = d3v3.svg.arc()
        .innerRadius(innerRadius2)
        .outerRadius(function (d) {
          return (radius - innerRadius2) * (d.data.score / 100.0) + innerRadius2;
        });
      return arc2(d)
    })
    .on('mouseover', tip2.show)
    .on('mouseout', tip2.hide)
 svg2.select('.out')
   .selectAll('.txtarc')
   .data(pie(data2))
   .enter()
   .append('text')
   .attr("class","txtarc")
   .each(function (d) {
     var centroid = arc.centroid(d);
     d3v3.select(this)
       .attr('x', centroid[0]*2.2)
       .attr('y', centroid[1]*2.2)
       .attr("transform","translate(-15,0)")
       .text(d.data.id)
       .attr("font-size","12px")
   });
  // var textarc= svg2.selectAll(".txtarc")
  //                  .data(pie(data2))
  //                  .enter()
  //                  .append("text")
  //                  .text((d)=>{console.log(d); return d.data.id})
  //                  .attr("x", centroid[0])
  //                  .attr("y", centroid[1])

  svg2.selectAll("circle")
    .data([90, 100])
    .enter()
    .append("circle")
    .attr("class", "cirs")
    .attr("r", (d) => d / 100 * radius)
    .attr("cx", 0)
    .attr("cy", 0)
    .style("fill", "none")
    .style("stroke", "#ef8a82")
  // calculate the weighted mean score
  var score =
    data.reduce(function (a, b) {
      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
      return a + (b.score * b.weight);
    }, 0) /
    data.reduce(function (a, b) {
      return a + b.weight;
    }, 0);

  //   svg.append("svg:text")
  //     .attr("class", "aster-score")
  //     .attr("dy", ".35em")
  //     .attr("text-anchor", "middle") // text-align: right
  //     .text(Math.round(score));

});
