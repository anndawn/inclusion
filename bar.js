var data = 
 [{
         "Value": 127,
         "Country": "Togo"
     },
     {
         "Value": 113,
         "Country": "Gambia"
     },
     {
         "Value": 111,
         "Country": "Benin"
     },
     {
         "Value": 106,
         "Country": "Ghana"
     },
     {
         "Value": 106,
         "Country": "Sierra_Leone"
     },
     {
         "Value": 104,
         "Country": "Cabo_Verde"
     },
     {
         "Value": 101,
         "Country": "Cote_d_Ivoire"
     },
     {
         "Value": 94,
         "Country": "Liberia"
     },
     {
         "Value": 91,
         "Country": "Guinea"
     },
     {
         "Value": 91,
         "Country": "Burkina_Faso"
     },
     {
         "Value": 86,
         "Country": "Senegal"
     },
     {
         "Value": 84,
         "Country": "Nigeria"
     },
     {
         "Value": 77,
         "Country": "Mali"
     },
     {
         "Value": 64,
         "Country": "Niger"
     }
 ]
// set the dimensions and margins of the graph
var dataoosc = [{
        "Country": "Liberia",
        "Value": 63.2
    },
    {
        "Country": "Niger",
        "Value": 44.2
    },
    {
        "Country": "Mali",
        "Value": 32.7
    },
    {
        "Country": "Senegal",
        "Value": 24.8
    },
    {
        "Country": "Burkina_Faso",
        "Value": 23
    },
    {
        "Country": "Gambia",
        "Value": 21.4
    },
    {
        "Country": "Guinea",
        "Value": 21.1
    },
    {
        "Country": "Ghana",
        "Value": 14.9
    },
    {
        "Country": "Cabo_Verde",
        "Value": 13.7
    },
    {
        "Country": "Cote_d_Ivoire",
        "Value": 11
    },
    {
        "Country": "Togo",
        "Value": 8.4
    },
    {
        "Country": "Benin",
        "Value": 3
    },
    {
        "Country": "Sierra_Leone",
        "Value": 0.8
    }
]
var noosc = [{
        "Country": "Nigeria",
        "Time": 2016,
        "Value": 10700
    },
    {
        "Country": "Niger",
        "Time": 2017,
        "Value": 1223
    },
    {
        "Country": "Mali",
        "Time": 2017,
        "Value": 1038
    },
    {
        "Country": "Burkina_Faso",
        "Time": 2017,
        "Value": 747
    },
    {
        "Country": "Ghana",
        "Time": 2018,
        "Value": 683
    },
    {
        "Country": "Senegal",
        "Time": 2017,
        "Value": 628
    },
    {
        "Country": "Liberia",
        "Time": 2016,
        "Value": 468
    },
    {
        "Country": "Cote_d_Ivoire",
        "Time": 2017,
        "Value": 420
    },
    {
        "Country": "Guinea",
        "Time": 2016,
        "Value": 406
    },
    {
        "Country": "Togo",
        "Time": 2017,
        "Value": 103
    },
    {
        "Country": "Gambia",
        "Time": 2018,
        "Value": 72
    },
    {
        "Country": "Benin",
        "Time": 2017,
        "Value": 53
    },
    {
        "Country": "Sierra_Leone",
        "Time": 2016,
        "Value": 10
    },
    {
        "Country": "Cabo_Verde",
        "Time": 2017,
        "Value": 9
    }
]
var margin = {top: 20, right: 10, bottom: 30, left:90};
function drawbar(divname,objdata,pd) {
    var width = $("."+divname).width()*7/8 - margin.left - margin.right,
        height = $("."+divname).height() - margin.top - margin.bottom;

    // set the ranges
    var y = d3.scaleBand()
        .range([height, 0])
        .padding(pd);

    var x = d3.scaleLinear()
        .range([0, width]);

    var svg = d3.select("."+divname).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // format the data
    objdata.forEach(function (d) {
        d.Value = +d.Value;
    });

    // Scale the range of the data in the domains
    x.domain([0, d3.max(objdata, function (d) {
        return d.Value;
    })])
    y.domain(objdata.map(function (d) {
        return d.Country;
    }));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.append("g")
        .attr("class", "barboard")
        .selectAll(".bar")
        .data(objdata)
        .enter().append("rect")
        .attr("class", function (d) {
            return d.Country
        })
        .classed("bar", true)
        .attr("width", function (d) {
            return x(d.Value);
        })
        .attr("y", function (d) {
            return y(d.Country);
        })
        .attr("height", y.bandwidth());
    svg.selectAll(".txt")
        .data(objdata)
        .enter().append("text")
        .attr("class", "txt")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("x", 5)
        .attr("y", function (d) {
            return y(d.Country) + 3.3 / 5 * y.bandwidth()+2;
        })
        .text(function (d) {
            return d.Value
        })
        .attr("stroke", "#ffffff")
        .attr("fill", "#ffffff")
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0));
    d3.select(".domain").style("stroke", "#ffffff")
    d3.selectAll(".tick").select("text").style("font-size", "14px")
}
drawbar("number",noosc,0.3);
drawbar("rate",dataoosc,0.3)
var margin = {
    top: 10,
    right: 0,
    bottom: 0,
    left: 80
};
drawbar("gergraph", data, 0.3);
