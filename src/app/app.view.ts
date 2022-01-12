import { HTMLElement$, VirtualDOM } from '@youwol/flux-view'
import *  as d3 from 'd3'
//import * as dataframe from '@youwol/dataframe'
import { dataRoseReturn } from './dataRoseTest'


export class AppView implements VirtualDOM {

    class = 'h-100 w-100 d-flex flex-column'
    children: VirtualDOM[]

    connectedCallback: (elem: HTMLElement$ & HTMLDivElement) => void

    constructor() {

        this.children = [
        ]
        this.connectedCallback = (elem: HTMLElement$ & HTMLDivElement) => {
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add('h-100', 'w-100')
            elem.appendChild(svg)
            plot(svg)
        }
    }
}

function binSerie(serie, nbBins) {
    const binned = new Array(nbBins).fill(undefined).map( (v,i) => {
        return {
            startAngle: i*Math.PI/(nbBins),
            endAngle  : (i+1)*Math.PI/(nbBins),
            freq      : 0
        }
    })
    const step = 180/(nbBins-1)
    serie.forEach( v => binned[ Math.round(v/step) ].freq++ )
    return binned
  }

function plot(svgDom: SVGSVGElement): any {
    const svg = d3.select(svgDom)
    const width = 500
    const height = 500
    const innerRadius = 10
    const margin = { top: 40, right: 80, bottom: 40, left: 40 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom
    const outerRadius = (Math.min(chartWidth, chartHeight) / 2)
    const colourFill = "#00FF00"
    const gradTickSpacing = 5
    const binArc = 12

    let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    let angle = d3.scaleLinear()
        .domain([0, 12])
        .range([0, 2 * Math.PI])

    let radius = d3.scaleLinear()
        .range([innerRadius, outerRadius])

    let y = d3.scaleLinear()
        .range([innerRadius, outerRadius])

    let labelHead = ["N", "E", "S", "W"]


    // load test data
    
    let dataRose = binSerie(dataRoseReturn(), binArc)
    let dataRoseSym = dataRose.map((d, i) => {
        return { 
            startAngle: d.startAngle + Math.PI,
            endAngle: d.endAngle + Math.PI,
            freq: d.freq }
    })
    
    let children = dataRose.concat(dataRoseSym)

    
    // scale of 4 cardinal points
    let x = d3.scaleBand()
        .domain(labelHead)
        .range([0, 2 * Math.PI])
        .align(0)

    // Range and domain of the frequence for rose diagrm
    let freq = d3.scaleLinear()
        .domain([0, d3.max(dataRose, d => d.freq)])
        .range([innerRadius, outerRadius])

    // Extend the domain slightly to match the range of [0, 2π]

    radius.domain([0, d3.max(dataRose, d => {
        return d.y0 + d.y;
    })])

    // Plot the arc for each datum 0-360 degrees
    g.append("g")
        .selectAll('path')
        .data(children)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(d => freq(d.freq))
            .outerRadius(innerRadius)
            .padAngle(.01)
            .padRadius(20))
        .attr('stroke', 'black')
        .style("fill", colourFill)
        .join('path')
        .on("mouseover", onMouseOver) //Add listener for the mouseover event
        .on("mouseout", onMouseOut)

    // Add outer black circle
    g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', outerRadius)
        .attr('stroke', 'black')
        .style('fill', 'none')

    // Add inner black circle 
    g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', innerRadius)
        .attr('stroke', 'black')
        .style('fill', 'none')

    // Add label cardinal heading NESW
    let label = g.append("g")
        .selectAll("g")
        .data(labelHead)
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", d => { return "rotate(" + (x(d) * 180 / Math.PI - 90) + ")translate(" + (outerRadius + 30) + ",0)"; });

    // put upright cardinal points
    label.append("text")
        .attr("transform", d => { return (x(d) * 180 / Math.PI - 90) == 90 ? "rotate(-90)translate(0,0)" : "rotate(" + (x(d) * 180 / Math.PI - 90) + ")translate(0,5)"; })
        .text(d => d)
        .style("font-size", 14);

    // Add radius line    
    g.selectAll(".axis")
        .data(d3.range(angle.domain()[1]))
        .enter().append("g")
        .attr("class", "axis")
        .attr("stroke-width", 0.5)
        .attr("transform", d => { return "rotate(" + angle(d) * 180 / Math.PI + ")"; })
        .style("opacity", .2)
        .call(d3.axisLeft()
            .tickSizeOuter(0)
            .scale(radius.copy().range([-innerRadius, -(outerRadius)])))

    // Add circular tick with frequency values    
    let yAxis = g.append("g")
        .attr("text-anchor", "middle")


    var yTick = yAxis
        .selectAll("g")
        .data(freq.ticks(gradTickSpacing).slice(1))
        .enter().append("g");

    yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .style("opacity", .2)
        .attr("r", freq);

    yTick.append("text")
        .attr("y", d => -freq(d))
        .attr("dy", "-0.25em")
        .attr("x", function () { return -15; })
        .text(freq.tickFormat(5, "s"))
        .style("font-size", 12);

    // Add animation to show values of each Arc when hovering it
    function onMouseOver(event, datum) {
        let arc = d3.select(this)
        arc.style("fill", "orange")
        arc.transition()
            .duration(400)
            .attr('d', d3.arc()
                .innerRadius(d => freq(d.freq))
                .outerRadius(innerRadius)
                .startAngle(d => d.startAngle)
                .endAngle(d => d.endAngle)
                .padAngle(.01)
                .padRadius(20))
            .attr('stroke', 'black')
            .attr('stroke-width', '2')


        g.append("text")
            .attr('class', 'val')
            .attr('x', 159)
            .attr('y', -150)
            .text(function () { return ["Lower limit " + (datum.startAngle * 180 / Math.PI).toFixed(0) + "°"] })
        g.append("text")
            .attr('class', 'val')
            .attr('x', 159)
            .attr('y', -130)
            .text(function () { return ["Upper limit " + (datum.endAngle * 180 / Math.PI).toFixed(0) + "°"] })

    }
 //let d = binArc(dataRoseReturn(), 40)
    function onMouseOut(d, i) {
        d3.select(this).style("fill", colourFill)
        d3.select(this)
            .transition()
            .duration(400)
            .attr('d', d3.arc()
                .innerRadius(d => freq(d.freq))
                .outerRadius(innerRadius)
                .startAngle(d => d.startAngle)
                .endAngle(d => d.endAngle)
                .padAngle(.01)
                .padRadius(20))
            .attr('stroke', 'black')
            .attr('stroke-width', '1')
        d3.selectAll('.val')
            .remove()
    }
}

