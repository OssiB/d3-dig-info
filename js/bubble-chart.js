const metrics = ['total_album_consumption_millions', 'album_sales_millions', 'song_sales', 'on_demand_audio_streams_millions', 'on_demand_video_streams_millions'];
const artists = [];
const width = 1160;
const height = 380;
const margin = { top: 40, right: 30, bottom: 60, left: 40 };

d3.csv('../data/top_albums.csv').then(data => {
    createBubbleChart(data);
});

const createBubbleChart = (data) => {
    data.forEach(datum => {
        metrics.forEach(metric => {
            datum[metric] = parseFloat(datum[metric]); // Convert strings to numbers
        });

        artists.push(datum.artist); // Populate the artists array      
    });
    var bubbleChart = d3.select('#bubble-chart');

    bubbleChart
        .append('svg')
        .attr('viewbox', [0, 0, width, height])
        .attr('width', width)
        .attr('height', height);

    const audioStreamsScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.on_demand_audio_streams_millions)])
        .range([margin.left, width - margin.right]);


    const videoStreamsScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.on_demand_video_streams_millions)])
        .range([height - margin.bottom, margin.top]);

    const bubblesAreaScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.album_sales_millions)])
        .range([0, 40]);

    const colorScale = d3.scaleOrdinal()
        .domain(artists)
        .range(d3.schemeTableau10);

    bubbleChart.select('svg')
        .append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(audioStreamsScale));

    bubbleChart.select('svg')
        .append('g')
        .attr('transform', `translate( ${margin.left}, 0)`)
        .call(d3.axisLeft(videoStreamsScale));

    bubbleChart.select('svg')
        .append('g')
        .append('text')
        .attr('class', 'label')
        .attr('x', 10)
        .attr('y', 10)
        .attr('text-anchor', 'begin')
        .text("On-demand Video Streams (millions)");

    bubbleChart.select('svg')
        .append('g')
        .append('text')
        .attr('class', 'label')
        .attr('x', 1140)
        .attr('y', 360)
        .attr('text-anchor', 'end')
        .text("On-demand Audio Streams (millions)");

    bubbleChart.select("svg")
        .selectAll('.bubble-group')
        .data(data)
        .join('g')
        .attr('class', 'bubble-group')
        .append("circle")
        .attr('r', (d, i) => {
            return bubblesAreaScale(d.album_sales_millions);
        })
        .attr('cx', d => audioStreamsScale(d.on_demand_audio_streams_millions))
        .attr('cy', d => videoStreamsScale(d.on_demand_video_streams_millions))
        .attr('fill', (d, i) => colorScale(i));

    const albumLegends = d3.select('.legend-color').append('ul');


    albumLegends.selectAll('li')
        .data(data)
        .join('li')
        .append('span')
        .attr('class', 'legend-circle')
        .style('background-color', (d, i) => colorScale(i));
    albumLegends.selectAll('li')
        .data(data)
        .join('li')
        .append('span')
        .attr('class', 'legend-label')
        .html((d, i) => d.title +',' +artists[i]);

    const legendWidth = 2500;
    const legendHeight = 250;

    let legendArea = d3.select('.legend-area').append('svg')
        .attr('viewbox', [0, 0, legendWidth, legendHeight])
        .attr('width', legendWidth)
        .attr('height', legendHeight);


    var valuesToShow = [0.5, 1, 1.5];
    var legendsGroups = legendArea
        .selectAll('.legend')
        .data(valuesToShow)
        .join('g')
            .attr('class', 'legend');

    var legendG = d3.selectAll('.legend');

    legendG
        .append('circle')
        .attr("cx", 100)
        .attr("cy", d => legendHeight - 100 - bubblesAreaScale(d))
        .attr("r", d => bubblesAreaScale(d))
        .style("background-color","#727a87")
        .style("opacity","0.4")
        .attr("stroke", "black");

    legendG
        .append('line')
        .attr('x1', 100)
        .attr('x2', 160)
        .attr('y1', d => legendHeight - 100 - 2 * bubblesAreaScale(d))
        .attr('y2', d => legendHeight - 100 - 2 * bubblesAreaScale(d))
        .attr('stroke', 'black')
        .style('stroke-dasharray', '3 3');

    legendG
        .append('text')
        .attr('x', 180)
        .attr('y', d => legendHeight - 100 - 2 * bubblesAreaScale(d))
        .text(d => d + 'M')
        .style("font-size", 10)
        .style("background-color","#727a87")
        .attr('alignment-baseline', 'middle');



}








