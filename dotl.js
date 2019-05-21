var lmargin = {top: 30, right: 10, bottom: 30, left: 70},
lwidth = $(".dotl").width() - lmargin.left - lmargin.right,
lheight =$(".dotl").height() - lmargin.top - lmargin.bottom;

// append the svg object to the body of the page
var dotlsvg = d3.select(".dotl")
            .append("svg")
            .attr("width", lwidth + lmargin.left + lmargin.right)
            .attr("height", lheight + lmargin.top + lmargin.bottom+10)
            .append("g")
            .attr("transform","translate(" + lmargin.left + "," + lmargin.top + ")");
var tooltip = d3.select(".dotl").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

//Read the data
d3.csv("asterline2.csv", function(data) {
console.log(data);


// Add X axis
var x = d3.scaleLinear()
            .domain([20, 100])
            .range([ 0, lwidth ]);
            dotlsvg.append("g")
            .attr("transform", "translate(0," + (lheight+15) + ")")
            .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scalePoint()
        .domain(["Ghana", "Togo", "Cote_d_Ivoire",
        "Sierra_Leone",
        "Benin",
        "Gambia",
        "Guinea_Bissau", "Liberia",
        "Nigeria",
        "Senegal",
        "Guinea",
        "Burkina_Faso",
        "Mali",
        "Niger"
])
        .range([0, lheight]);
        dotlsvg.append("g")
        .call(d3.axisLeft(y).tickSize(0));
        

// Color scale: give me a specie name, I return a color
var color = d3.scaleOrdinal()
            .domain(["poor", "rich" ])
            .range(["#feb729", "#9acac9"]);
var tipMouseover = function(d) {
        var colors = color(d.type);
        console.log(d);
        var html = d.label + "<br />"  + d.Time +d.type+"<br />" +
        "<b>" + d.score + "%</b>";

        tooltip.html(html)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 830) + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", .9) // started as 0!

};
var tipMouseover2 = function(d) {
var colors = color(d.type);
console.log(d);
var html = d.key +"<br />Gap:<b>" +
d.values[0].gap + "%</b>";

tooltip.html(html)
.style("left", (d3.event.pageX + 15) + "px")
.style("top", (d3.event.pageY - 830) + "px")
.transition()
.duration(200) // ms
.style("opacity", .9) // started as 0!

};
// tooltip mouseout event handler
var tipMouseout = function(d) {
                    tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0); // don't care about position!
                    };
var entries = d3.nest()
.key(function(d) { return d.label; })
.entries(data);
console.log(entries);
dotlsvg.append("g")
   .selectAll("line")
   .data(entries)
   .enter()
   .append("line")
   .attr("x1",0)
   .attr("x2",lwidth)
   .attr("y1",(d,i)=>{console.log(d.key); return y(d.key)})
   .attr("y2",(d)=>y(d.key))
   .attr("class","grid");

// Add dots
dotlsvg.append('g').attr("class","dotboard")
var circles=dotlsvg.select(".dotboard").selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
   .attr("class", (d) => d.label)
    .classed("circle", true)
    .attr("cx", function (d) { return x(d.score); } )
    .attr("cy", function (d) { return y(d.label); } )
    .attr("r", 8)
    .style("fill", function (d) { return color(d.type) } )
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);

dotlsvg.append("g").attr("class","lineboard")
var gaplines=dotlsvg.select(".lineboard").selectAll("line")
            .data(entries)
            .enter()
            .append("line")
            .attr("class", (d) => d.key)
            .classed("gridlines", true)
            .attr("x1",(d)=>x(d.values[0].score))
            .attr("x2",(d)=>x(d.values[1].score))
            .attr("y1",(d)=>y(d.key))
            .attr("y2",(d)=>y(d.key))
            .classed("connection",true)
            .on("mouseover", tipMouseover2)
            .on("mouseout", tipMouseout);
})
