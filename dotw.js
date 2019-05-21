var wmargin = {top: 30, right: 30, bottom: 30, left: 70},
wwidth = $(".dotw").width() - wmargin.left - wmargin.right,
wheight = $(".dotw").height() - wmargin.top - wmargin.bottom;

// append the svg object to the body of the page
var wsvg = d3.select(".dotw")
            .append("svg")
            .attr("class","dotwsvg")
            .attr("width", wwidth + wmargin.left + wmargin.right)
            .attr("height", wheight + wmargin.top + wmargin.bottom+10)
            .append("g")
            .attr("transform","translate(" + wmargin.left + "," + wmargin.top + ")");
var tooltip4 = d3.select(".dotw").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

//Read the data
d3.csv("asterdot1.csv", function(data) {
console.log(data);
// Add X axis
var x = d3.scaleLinear()
            .domain([20, 100])
            .range([ 0, wwidth ]);
             wsvg.append("g")
            .attr("transform", "translate(0," + (wheight+15) + ")")
            .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scalePoint()
        .domain(["Togo",
        "Ghana",
       "Gambia",
        "Guinea_Bissau",
        "Sierra_Leone",
        "Cote_d_Ivoire",
        "Liberia",
        "Senegal",
        "Benin",
        "Niger",
        "Guinea",
        "Burkina_Faso",
        "Mali",
        "Nigeria"
])
        .range([0, wheight]);
    wsvg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("fill","#000")
        

// Color scale: give me a specie name, I return a color
var color = d3.scaleOrdinal()
            .domain(["poor", "rich" ])
            .range(["#eb5e57", "#b7d04e"]);
var tipMouseover = function(d) {
        var colors = color(d.type);
        console.log(d);
        var html = d.label + "<br />"+ d.time+d.type+"<br />" +
        "<b>" + d.score + "%</b>";

        tooltip4.html(html)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 830)+ "px")
        .transition()
        .duration(200) // ms
        .style("opacity", .9) // started as 0!

};
var tipMouseover2 = function(d) {
var colors = color(d.type);
console.log(d);
var html = d.key +" " +d.values[0].time +"<br />Gap:<b>" +
d.values[0].gap + "%</b>";

tooltip4.html(html)
.style("left", (d3.event.pageX + 15) + "px")
.style("top", (d3.event.pageY - 830) + "px")
.transition()
.duration(200) // ms
.style("opacity", .9) // started as 0!

};
// tooltip mouseout event handler
var tipMouseout = function(d) {
                    tooltip4.transition()
                    .duration(300) // ms
                    .style("opacity", 0); // don't care about position!
                    };
var entries = d3.nest()
.key(function(d) { return d.label; })
.entries(data);
console.log(entries);
 wsvg.append("g")
   .selectAll("line")
   .data(entries)
   .enter()
   .append("line")
   .attr("x1",0)
   .attr("x2",wwidth)
   .attr("y1",(d,i)=>{console.log(d.key); return y(d.key)})
   .attr("y2",(d)=>y(d.key))
   .attr("class","grid");

// Add dots
 wsvg.append('g').attr("class", "dotboard")
var circles=d3.select(".dotwsvg .dotboard").selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class",(d)=>d.label)
    .classed("circle",true)
    .attr("cx", function (d) { return x(d.score); } )
    .attr("cy", function (d) { return y(d.label); } )
    .attr("r", 8)
    .style("fill", function (d) { return color(d.type) } )
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);

 wsvg.append("g").attr("class", "lineboard")
var gaplines=d3.select(".dotwsvg .lineboard").selectAll("line")
            .data(entries)
            .enter()
            .append("line")
            .attr("class", (d)=>d.key)
            .classed("gridlines",true)
            .classed("connection", true)
            .attr("x1",(d)=>x(d.values[0].score))
            .attr("x2",(d)=>x(d.values[1].score))
            .attr("y1",(d)=>y(d.key))
            .attr("y2",(d)=>y(d.key))
            .on("mouseover", tipMouseover2)
            .on("mouseout", tipMouseout);
})