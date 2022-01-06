import { HTMLElement$, VirtualDOM } from '@youwol/flux-view'
import *  as d3 from 'd3'
import * as dataframe from '@youwol/dataframe'
import { dataReturn } from './data'


export class AppView implements VirtualDOM {

    class = 'h-100 w-100 d-flex flex-column'
    children: VirtualDOM[]

    connectedCallback: (elem: HTMLElement$ & HTMLDivElement) => void

    constructor() {

        this.children = [
            /* ideally it would have been:
            {
                tag:'svg',
                class: 'h-100 w-100',
                connectedCallback: (svg: SVGSVGElement) => {
                    plot(svg)
                }
            }
            ... but svg namespace not supported yet by flux-view, thus the snippet below */
        ]
        this.connectedCallback = (elem: HTMLElement$ & HTMLDivElement) => {
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add('h-100', 'w-100')
            elem.appendChild(svg)
            plot(svg)
        }
    }
}


function plot(svgDom: SVGSVGElement): any {
    const svg = d3.select(svgDom)
    const width = 500
    const height = 500
    const innerRadius = 5
    const margin = { top: 40, right: 80, bottom: 40, left: 40 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom
    const outerRadius = (Math.min(chartWidth, chartHeight) / 2)
    const colourFill  = "red"

    let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    let angle = d3.scaleLinear()
        .domain([0, 12])
        .range([0, 2 * Math.PI])

    let radius = d3.scaleLinear()
        .range([innerRadius, outerRadius])

    let y = d3.scaleLinear()
        .range([innerRadius, outerRadius])

    let labelHead = ["N", "E", "S", "W"]

    // data object test
    const data = dataReturn()
    let arcData = [
        { startAngle: 0, endAngle: 0.2, freq: 4 },
        { startAngle: 0.2, endAngle: 0.6, freq: 15 },
        { startAngle: 0.6, endAngle: 1.4, freq: 20 },
        { startAngle: 3, endAngle: 3.5, freq: 7 },
    ]

    // scale of 4 cardinal points
    let x = d3.scaleBand()
        .domain(labelHead)
        .range([0, 2 * Math.PI])
        .align(0)

    // Range and domain of the frequence of rose diagram
    let freq = d3.scaleLinear()
        .domain([0, d3.max(arcData, d => d.freq)])
        .range([innerRadius, outerRadius])

    // Extend the domain slightly to match the range of [0, 2π]

    radius.domain([0, d3.max(data, d => {
        return d.y0 + d.y;
    })])

    // Plot the arc for each datum
    g.append("g")
        .selectAll('path')
        .data(arcData)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(d => freq(d.freq))
            .outerRadius(innerRadius)
            .padAngle(.01)
            .padRadius(50))
        .style("fill", colourFill)

    // Add outer black circle
    g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', outerRadius )
        .attr('stroke', 'black')
        .style('fill', 'none')

    // Add inner black circle 
    g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', innerRadius )
        .attr('stroke', 'black')
        .style('fill', 'none')

    // Add label NESW
    let label = g.append("g")
        .selectAll("g")
        .data(labelHead)
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", d => { return "rotate(" + (x(d)* 180 / Math.PI - 90) + ")translate(" + (outerRadius + 30) + ",0)"; });

    label.append("text")
        .attr("transform", d => { console.log(); return (x(d) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-5)"; })
        .text(d => { return d; })
        .style("font-size", 14);

    // Add radius line    
    g.selectAll(".axis")
        .data(d3.range(angle.domain()[1]))
        .enter().append("g")
        .attr("class", "axis")
        .attr("stroke-width",0.5)
        .attr("transform", d => { return "rotate(" + angle(d) * 180 / Math.PI + ")"; })
        .style("opacity", .2)
        .call(d3.axisLeft()
            .tickSizeOuter(0)
            .scale(radius.copy().range([-innerRadius, -(outerRadius )])))

    // Add circular tick with frequency values    
    let yAxis = g.append("g")
        .attr("text-anchor", "middle")


    var yTick = yAxis
        .selectAll("g")
        .data(freq.ticks(3).slice(1))
        .enter().append("g");

    yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .style("opacity", .2)
        .attr("r", freq);

    yTick.append("text")
        .attr("y", d => -freq(d) )
        .attr("dy", "-0.25em")
        .attr("x", function () { return -15; })
        .text(freq.tickFormat(5, "s"))
        .style("font-size", 12);
    
}
