var margin = {top: 10, right: 40, bottom: 30, left: 60},
width = $(".noosc").width() - margin.left - margin.right,
height = $(".noosc").height() - margin.top - margin.bottom;

// append the svg object to the body of the page
var lsvg = d3.select(".noosc")
            .append("svg")
            .attr("class","GPIsvg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom+10)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
var tooltip2 = d3.select(".noosc").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

//Read the data
d3.csv("GPI.csv", function(data) {
console.log(data);
var entries = d3.nest()
                .key(function(d) { return d.Country; })
                .entries(data);
console.log(entries);

// Add X axis
var y = d3.scaleLinear()
            .domain([0.4, 1.3])
            .range([ 0,height ]);
lsvg.append("g")
        .call(d3.axisLeft(y));

// Add Y axis
var x = d3.scalePoint()
        .domain(["Pri","Lower","Upper"])
        .range([20, width]);
        lsvg.append("g")
        .attr("class","xAxis")
        .attr("transform","translate(15,"+(height+20)+")")
        .call(d3.axisTop(x).tickSize(0))
        

// Color scale: give me a specie name, I return a color
var color = d3.scaleOrdinal()
            .domain(["Low", "Mid", "High", "Avg" ])
            .range(["#eb5e57", "#b7d04e", "#9acac9", "#feb729"]);
var tipMouseover = function(d) {
        var colors = color(d.Species);
        var html = "<span style='color:" + colors + ";'>" + d.Region + "</span><br />" +
        "<b>" + d.Value + "</b>";
        console.log(html);
        tooltip2.html(html)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 28) + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", .9) // started as 0!

};
// tooltip mouseout event handler
var tipMouseout = function(d) {
                    tooltip2.transition()
                    .duration(300) // ms
                    .style("opacity", 0); // don't care about position!
                    };
console.log(data);

lsvg.append("g")
   .selectAll("line")
   .data(entries)
   .enter()
   .append("line")
   .attr("x1",(d)=>x(d.key)+15)
   .attr("x2",(d)=>x(d.key)+15)
   .attr("y1", 0)
   .attr("y2", height)
   .attr("class","grid");

lsvg.append("g")
   .append("line")
   .attr("x1", (d)=>x(1))
   .attr("y1",0)
   .attr("x2", (d)=>x(1))
   .attr("y1",height+10)
   .attr("class","grid")
   


// Add dots
lsvg.append('g').attr("class", "lineboard")
var lines=d3.select(".lineboard").selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("class",(d)=>d.Region)
    .classed("line", true)
    .attr("x1", function (d) { return x(d.Country)-20; } )
    .attr("y1", function (d) { return y(d.Value); } )
    .attr("y2", function (d) { return y(d.Value); } )
    .attr("x2", function (d) { return x(d.Country)+10; } )
    .style("stroke", function (d) { return color(d.Species) } )
    .style("stroke-width","2px")
    .attr("transform","translate(20,0)")
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);
})
