// let init_id = 940
buildCharts(940);
console.log("anything");
// log data, grab IDs, build chart using for each and appending an 'option' for each ID
function buildCharts(selected_id) {
    d3.json("samples.json").then(data => {
        console.log(data);
        let ids = data.names;
        console.log("ids:", ids)
        let dropdown = d3.select("#selDataset");
        ids.forEach(id => {
            dropdown.append("option").text(id)
        })
    
        // let selected_id = 940;
        // SELECT DATA using function 
        let subjectData = selectData(selected_id, data);
        let metadata = subjectData.metadata;
        let samples = subjectData.samples;
    
        // DEMOGRAPHIC INFO
        meta_init(metadata);
    
        // HORIZONTAL BAR CHART
        bar_init(samples);
        bubble_init(samples);
    })
};
// 
function optionChanged(id) {
    console.log(id);
    buildCharts(id)
    // let selected_id = d3.select("#selDataset").text();
};
// kadfkjsdkf
// Sample and meta data function to return 'id' values 
function selectData(id, data) {
    let metadata = data.metadata.filter(subject => subject.id == id)[0];
    let samples = data.samples.filter(subject => subject.id == id)[0];
    return {
        metadata: metadata, 
        samples: samples
    }
}
function meta_init(metadata) {
    meta_div = d3.select("#sample-metadata");
    meta_div.html("")
    // meta_div.append("p").text("Does this work?")
    // For each key-value append 'p' tag
    Object.entries(metadata).forEach(([key, value]) => {
        meta_div.append("p").html(`<strong>${key.toUpperCase()}:</strong> ${value}`)
    })
}
// function to build bar chart
function bar_init(samples) {
    let trace = {
        x: samples.sample_values.slice(0,10).reverse(),
        y: samples.otu_ids.map(id => `OTU ${id}`).slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    };
    let traceData = [trace]
    Plotly.newPlot("bar", traceData)
}
// function to build bubble chart
function bubble_init(samples) {
    let trace = {
        x: samples.otu_ids,
        y: samples.sample_values,
        text: samples.otu_labels,
        mode: "markers",
        marker: {
            size: samples.sample_values.map(value => Math.log(value)*10),
            color: samples.otu_ids,
            colorscale: "YlGnBu"
        }
    };
    let traceData = [trace];
    Plotly.newPlot("bubble", traceData);
}