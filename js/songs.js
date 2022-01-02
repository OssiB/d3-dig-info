const topRockSongs = [
    { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
    { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
    { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
    { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
    { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
 ];

 const topSongsSection  =  d3.select('#top-songs');
 topSongsSection
     .append('h3')
     .text('Top Rock Songs');

const circleChartWidth = 550;
const circleChartHeight = 130;
const circleWidth = 100;
const marginLeftCircle = 10;

const circlesChart = topSongsSection
         .append('svg')
         .attr('viewbox', [0, 0, circleChartWidth, circleChartHeight])
         .attr('width', circleChartWidth)
         .attr('height', circleChartHeight);

circlesChart
    .append('line')
    .attr('x1', 0)
    .attr('y1', 130/2)
    .attr('x2', circleChartWidth)
    .attr('y2', 130/2)
    .attr('stroke', '#333')
    .attr('stroke-width', 2);

 const   circlesChartGroups =  circlesChart
    .selectAll('.circle-group')
    .data(topRockSongs)
    .join('g')
       .attr('class','circle-group');

const circlesScale = d3.scaleSqrt()
    .domain([0,d3.max(topRockSongs, d=> d.sales_and_streams)])
    .range([0,40]);

console.log(circlesScale(1882000))
var teamG = d3.selectAll(".circle-group");                                4
teamG
    .append("circle")
    .attr('r', (d ,i)=> {
          console.log(d.sales_and_streams);
          return circlesScale(d.sales_and_streams);
      })
    .attr('cy',130/2)
    .attr('cx',(d,i) => marginLeftCircle  + 40 + (marginLeftCircle +circleWidth)*i)
    .attr('fill', '#a6d854')
teamG.append('text')
         .attr('class','label')
         .attr('x',(d,i)  => marginLeftCircle + 40 + (marginLeftCircle +circleWidth)*i)
         .attr('y',120)
         .attr('text-anchor', 'middle')
         .text(d => d.title);
teamG.append('text')
         .attr('class','label')
         .attr('x',(d,i)  => marginLeftCircle + 40 + (marginLeftCircle +circleWidth)*i)
         .attr('y',10)
         .attr('text-anchor', 'middle')
         .text(d => d.sales_and_streams/1000000 + 'M');
     



       


