var t = d3.transition()
    .duration(2000)
    .ease(d3.easeBack);
$("#counmap").children().click(function() {
    let count=$(this).attr("id");  
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    $(".fan").children().removeClass("fanselected")
    $(".fan").children("." + count).addClass("fanselected");
    d3.selectAll(".fan").selectAll("path").attr("stroke", "none")
    d3.selectAll(".fanselected").transition(t).attr("stroke", "red").attr("stroke-width", "3px")
    d3.selectAll(".grid").transition(t).style("stroke", "rgba(190, 187, 182, 0.527)").style("stroke-width", "0.5px")
    $(".gridlines").children().removeClass("lineselected")
    $(".gridlines").children("." + count).addClass("lineselected");
    $(".dotboard").children().attr("r", "8px");
    d3.selectAll(".dotboard").selectAll("." + count).transition(t).attr("r", "12px");
    $(".barboard").children().removeClass("selected");
    $(".barboard").children("." + count).addClass("selected");
    $(".lineboard").children().removeClass("lineselected");
    $(".connection").removeClass("lineselected");
    d3.selectAll(".connection").transition(t).style("stroke", "#b09f88")
    .style("stroke-width","1px")
    var color = d3.scaleOrdinal()
        .domain(["Low", "Mid", "High", "Avg"])
        .range(["#eb5e57", "#b7d04e", "#9acac9", "#feb729"]);
     d3.selectAll(".line").style("stroke", function (d) {
             return color(d.Species)
         })
         .style("stroke-width", "2px")
    $(".lineboard").children("." + count).addClass("lineselected");
    d3.selectAll(".lineselected").transition(t).style("stroke", "#9c81b4").style("stroke-width", "3px")
}
) 
$("#rate").click(function () {
    $(".number").css("opacity",0);
    $(".rate").css("opacity",1);
    // $("#number").prop("checked","false");

})
$("#number").click(function () {
    $(".number").css("opacity", 1);
    $(".rate").css("opacity", 0);
    // $("#rate").prop("checked","false");
})