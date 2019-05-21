var margin = {top: 20, right: 30, bottom: 30, left: 70};

function drawdots(arr,divname,exname,max,txt) {
    var width = $("."+divname).width() - margin.left - margin.right,
     height = $("."+divname).height() - margin.top - margin.bottom;
    console.log(height)
    var svg = d3.select("."+divname)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 10)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var tooltip = d3.select("." + divname).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //Read the data
    d3.csv(exname, function (data) {
        var entries = d3.nest()
            .key(function (d) { return d.Country; })
            .entries(data);
        console.log(entries);

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, max])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + (height + 15) + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scalePoint()
            .domain(arr)
            .range([0, height]);
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(0));
        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
            .domain(["Low", "Mid", "High", "Avg"])
            .range(["#eb5e57", "#b7d04e", "#9acac9", "#feb729"]);
        var tipMouseover = function (d) {
            var colors = color(d.Species);
            console.log(d);
            var html = d.Country + "<br />" +
                "<span style='color:" + colors + ";'>" + d.Region + "</span><br />" +
                "<b>" + d.Value + "%</b>";

            tooltip.html(html)
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!

        };
        // tooltip mouseout event handler
        var tipMouseout = function (d) {
            tooltip.transition()
                .duration(300) // ms
                .style("opacity", 0); // don't care about position!
        };

        svg.append("g")
           .attr("class","gridlines")
            .selectAll("line")
            .data(entries)
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", (d, i) => { console.log(d.key); return y(d.key) })
            .attr("y2", (d) => y(d.key))
            .attr("class",function (d) {
                return d.key
            })
            .classed("grid",true);

        // Add dots
        svg.append('g').attr("class", "dotboard")
        var circles = d3.select("."+divname).select(".dotboard").selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class",function (d) {
                return d.Country
            })
            .classed("circle",true)
            .attr("cx", function (d) { return x(d.Value); })
            .attr("cy", function (d) { return y(d.Country); })
            .attr("r", 8)
            .style("fill", function (d) { return color(d.Species) })
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);
        d3.select("."+divname).select("svg").append("text").text(txt)
            .attr("class", "title").attr("transform", "translate(" + (width+70) + ",10) rotate(90) ")

    })
}
var arr1 = ['Burkina', 'Cabo_Verde', 'Gambia', 'Ghana', 'Guinea', "Liberia", "Niger", "Sierra_Leone", "Togo"]
drawdots(arr1,"red1","ner.csv",120,"Net Enrolment Rate")
var arr2 = ["Benin", "Cote_d_Ivoire", "Mali", "Senegal"];
var arr3 = ["Nigeria", "Guinea_Bissau"];
var arr4 = ["Togo",
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
]
drawdots(arr2, "red2", "ger.csv", 160, "Gross Enrolment Rate")
drawdots(arr3, "red3", "nar.csv", 100, "NAR")




