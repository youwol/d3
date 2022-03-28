
import { pack } from './main';
import {
    Property, Flux, ModuleFlux, BuilderView, RenderView, Schema, 
    Context, freeContract
} from '@youwol/flux-core'
import *  as d3 from 'd3'
import { RenderingUpdate } from '@youwol/flux-view';


let svgIcon = `<g transform="translate(250,250)"><g><path d="M0.09999958333385996,-106.92303016086645A106.92307692307692,106.92307692307692,0,0,1,32.94592815441635,-101.72074614719585L2.99491017732055,-9.540991197448083A10,10,0,0,0,0.09999958333385522,-9.999499991666237Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M58.808326054637526,-180.66981149780239A190,190,0,0,1,111.59828110531727,-153.7719859218141L5.79665726305262,-8.148543708829163A10,10,0,0,0,3.1851206880334755,-9.479188056086933Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M58.85939720256977,-80.84288070665296A100,100,0,0,1,80.84288070665296,-58.85939720256977L8.030987148191098,-5.958459987747623A10,10,0,0,0,5.958459987747624,-8.030987148191098Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M125.76754675837697,-91.25186508014133A155.3846153846154,155.3846153846154,0,0,1,147.74861881982218,-48.11158213008321L9.479188056086933,-3.185120688033474A10,10,0,0,0,8.148543708829163,-5.796657263052619Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M160.97889930607965,-52.2000692781239A169.23076923076923,169.23076923076923,0,0,1,169.23073968555832,-0.09999958333385416L9.999499991666237,-0.09999958333385417A10,10,0,0,0,9.540991197448083,-2.99491017732055Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M183.07689576622428,0.09999958333385416A183.0769230769231,183.0769230769231,0,0,1,174.14737627223678,56.4787668138177L9.540991197448083,2.99491017732055A10,10,0,0,0,9.999499991666237,0.09999958333385417Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M127.99590183669251,41.69353532815014A134.6153846153846,134.6153846153846,0,0,1,108.96488208952864,79.0440146144099L8.148543708829163,5.796657263052619A10,10,0,0,0,9.479188056086933,3.185120688033474Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M136.8517660959405,99.55223438406523A169.23076923076923,169.23076923076923,0,0,1,99.55223438406524,136.85176609594046L5.958459987747624,8.030987148191098A10,10,0,0,0,8.030987148191098,5.958459987747623Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M99.39043165937025,136.96932265657856A169.23076923076923,169.23076923076923,0,0,1,52.39027978883684,160.9170961647185L3.1851206880334755,9.479188056086933A10,10,0,0,0,5.79665726305262,8.148543708829163Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M32.94592815441635,101.72074614719585A106.92307692307692,106.92307692307692,0,0,1,0.09999958333385996,106.92303016086645L0.09999958333385522,9.999499991666237A10,10,0,0,0,2.99491017732055,9.540991197448083Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-0.09999958333384687,106.92303016086645A106.92307692307692,106.92307692307692,0,0,1,-32.945928154416336,101.72074614719585L-2.994910177320549,9.540991197448083A10,10,0,0,0,-0.099999583333854,9.999499991666237Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-58.808326054637504,180.66981149780239A190,190,0,0,1,-111.59828110531724,153.7719859218141L-5.79665726305262,8.14854370882916A10,10,0,0,0,-3.185120688033474,9.479188056086933Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-58.85939720256975,80.84288070665298A100,100,0,0,1,-80.84288070665296,58.85939720256977L-8.030987148191098,5.958459987747623A10,10,0,0,0,-5.958459987747621,8.0309871481911Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-125.76754675837695,91.25186508014136A155.3846153846154,155.3846153846154,0,0,1,-147.74861881982216,48.111582130083214L-9.479188056086933,3.1851206880334737A10,10,0,0,0,-8.14854370882916,5.796657263052623Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-160.97889930607963,52.200069278123955A169.23076923076923,169.23076923076923,0,0,1,-169.23073968555832,0.09999958333383914L-9.999499991666237,0.09999958333385361A10,10,0,0,0,-9.540991197448081,2.994910177320553Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-183.07689576622428,-0.09999958333383485A183.0769230769231,183.0769230769231,0,0,1,-174.1473762722368,-56.47876681381768L-9.540991197448083,-2.99491017732055A10,10,0,0,0,-9.999499991666237,-0.09999958333385116Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-127.99590183669251,-41.69353532815015A134.6153846153846,134.6153846153846,0,0,1,-108.96488208952867,-79.04401461440987L-8.14854370882916,-5.79665726305262A10,10,0,0,0,-9.479188056086933,-3.1851206880334715Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-136.85176609594052,-99.55223438406519A169.23076923076923,169.23076923076923,0,0,1,-99.55223438406529,-136.85176609594046L-5.958459987747623,-8.030987148191098A10,10,0,0,0,-8.0309871481911,-5.958459987747621Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-99.39043165937022,-136.96932265657856A169.23076923076923,169.23076923076923,0,0,1,-52.39027978883689,-160.9170961647185L-3.185120688033474,-9.479188056086933A10,10,0,0,0,-5.796657263052623,-8.14854370882916Z" stroke="black" style="fill: rgb(0, 0, 0);"></path><path d="M-32.945928154416315,-101.72074614719587A106.92307692307692,106.92307692307692,0,0,1,-0.09999958333392053,-106.92303016086645L-0.09999958333385423,-9.999499991666237A10,10,0,0,0,-2.9949101773205533,-9.540991197448081Z" stroke="black" style="fill: rgb(0, 0, 0);"></path></g><circle cx="0" cy="0" r="190" stroke="black" style="fill: none;"></circle><circle cx="0" cy="0" r="10" stroke="black" style="fill: none;"></circle><g><g text-anchor="middle" transform="rotate(-90)translate(220,0)"><text transform="rotate(-90)translate(0,5)" style="font-size: 14px;">N</text></g><g text-anchor="middle" transform="rotate(0)translate(220,0)"><text transform="rotate(0)translate(0,5)" style="font-size: 14px;">E</text></g><g text-anchor="middle" transform="rotate(90)translate(220,0)"><text transform="rotate(-90)translate(0,0)" style="font-size: 14px;">S</text></g><g text-anchor="middle" transform="rotate(180)translate(220,0)"><text transform="rotate(180)translate(0,5)" style="font-size: 14px;">W</text></g></g><g class="axis" stroke-width="0.5" transform="rotate(0)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(29.999999999999996)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(59.99999999999999)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(90)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(119.99999999999999)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(150.00000000000003)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(180)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(210)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(239.99999999999997)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(270)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(300.00000000000006)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g class="axis" stroke-width="0.5" transform="rotate(329.99999999999994)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end" style="opacity: 0.2;"><path class="domain" stroke="currentColor" d="M0,-10V-190"></path></g><g text-anchor="middle"></g></g>`
/**
## Presentation

The scatter plot module is a *scene* for [[ModuleTrace2D|2d traces]]: 
it's purpose is to display 2d traces that reach the input of the module over time.

## Typical usage

Provide 2D traces constructed from the [[ModuleTrace2D|2d trace module]] to the input of the module.

> 👾 2D traces have a **traceId** property defined in the configuration.
> t is an important field to consider when multiple traces will be displayed
> in a viewer: only the latest object received for a particular **traceId** is displayed.

The property **layoutOptions** of the configuration allows to define layout, titles, margins, etc,
see [[ModulePlotterRose.PersistentData]].

## Example

The following example illustrates a simple use of the module:
<iframe 
    title="Simple example"
    width="100%"
    height="500px"
    src="/ui/flux-runner/?id=b6f7ae4b-c106-457c-9de1-2c94aeea5986"> 
</iframe>

The underlying workflow can be accessed [here](/ui/flux-builder/?id=b6f7ae4b-c106-457c-9de1-2c94aeea5986).

## Resources

 Various resources:
 -    [plotly](https://plotly.com/javascript/): underlying rendering library 
 -    [layout](https://plotly.com/javascript/reference/layout/): options available to style the graph's layout
 */
export namespace ModulePlotterRose {


    let layoutOptions = `
// some example here: https://d3js.org/
return {
        title: 'Scatter Plot'
    }
`

    @Schema({
        pack: pack,
        description: "Persistent Data of DataframePlot"
    })
    export class PersistentData {

        @Property({
            description: "Width plot"
        })
        width: number = 500

        @Property({
            description: "Height plot"
        })
        height: number = 500

        @Property({
            description: "Inner radius"
        })
        innerRadius: number = 10

        @Property({
            description: "Colour fill"
        })
        colourFill: string = '#00FF00'

        @Property({
            description: "Graduation tick spacing"
        })
        gradTickSpacing: number = 5

        @Property({
            description: "Bin arc"
        })
        binArc: number = 15

        @Property({
            description: "colour hovering"
        })
        colourHover: string = "purple"

        constructor({width, height, innerRadius, colourFill, gradTickSpacing, binArc, colourHover}:
            {width?: number, height?: number, innerRadius?: number, colourFill?: string, gradTickSpacing: number, binArc?: number, colourHover?: string }) {
                this.width           = width != undefined ? width : 500
                this.height          = height != undefined ? height : 500
                this.innerRadius    = innerRadius != undefined ? innerRadius : 10
                this.colourFill      = colourFill != undefined ? colourFill : '#00FF00' 
                this.binArc          = binArc != undefined ? binArc : 15
                this.gradTickSpacing = gradTickSpacing != undefined ? gradTickSpacing : 5
                this.colourHover       = colourHover != undefined ? colourHover : 'purple'

            }
    }

    @Flux({
        pack: pack,
        namespace: ModulePlotterRose,
        id: "ModulePlotterRose",
        displayName: "Rose-diagram plot",
        description: "Rose-diagram plot",
        resources: {
            'technical doc': `${pack.urlCDN}/dist/docs/modules/lib_plotter_2d_module.ModulePlotterRose.html`
        }
    })
    @BuilderView({
        namespace: ModulePlotterRose,
        icon: svgIcon
    })
    @RenderView({
        namespace: ModulePlotterRose,
        render: renderHtmlElement,
        wrapperDivAttributes: (_) => (
            {
                style: {
                    height: "100%",
                    width: "100%",
                    padding: '0.25em'
                }
            }
        )
    })
    export class Module extends ModuleFlux {
        renderingDiv: HTMLDivElement

        constructor(params) {
            super(params)

            this.addInput({
                contract: freeContract(),
                onTriggered: ({ data, configuration, context }) => this.plot(data, configuration, context)
            })
        }

        setRenderingDiv(renderingDiv: HTMLDivElement) {
            this.init(renderingDiv)
        }

        resize(renderingDiv) {
            this.init(renderingDiv)
        }

        init(renderingDiv: HTMLDivElement) {
            this.renderingDiv = renderingDiv
            if (this.cachedData){
                this.plot(this.cachedData.traces, this.cachedData.config, undefined)
                this.cachedData = undefined
            }
        }

        cachedData:{traces: any, config: PersistentData}
        svg: SVGSVGElement
        plot(traces: any, config: PersistentData, context: Context) {
            let div = this.renderingDiv

            if (div == undefined){
                this.cachedData = {
                    traces, config
                }
                return 
            }

            if (this.svg) {
                this.svg.remove()
            }
            this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svg.classList.add('h-100', 'w-100','img-fluid')
            div.appendChild(this.svg)
            
            const rose = d3.select(this.svg)
            const width = config.width
            const height = config.height
            const innerRadius = config.innerRadius
            const margin = { top: 40, right: 80, bottom: 40, left: 40 }
            const chartWidth = width - margin.left - margin.right
            const chartHeight = height - margin.top - margin.bottom
            const outerRadius = (Math.min(chartWidth, chartHeight) / 2)
            const colourFill = config.colourFill
            const gradTickSpacing = config.gradTickSpacing
            const binArc = config.binArc
            const colourHover = config.colourHover

            let g = rose.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

            let angle = d3.scaleLinear()
                .domain([0, 12])
                .range([0, 2 * Math.PI])

            let radius = d3.scaleLinear()
                .range([innerRadius, outerRadius])

            let y = d3.scaleLinear()
                .range([innerRadius, outerRadius])

            let labelHead = ["N", "E", "S", "W"]

            // load test data
            let dataRose = binSerie(traces, binArc)
            let dataRoseSym = dataRose.map((d, i) => {
                return {
                    startAngle: d.startAngle + Math.PI,
                    endAngle: d.endAngle + Math.PI,
                    freq: d.freq
                }
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
                .enter()
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
                .exit()
                .remove()

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

            // Add circular tick with frequency values |   
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
                arc.style("fill", colourHover)
                arc.transition()
                    .duration(200)
                    .attr('d', d3.arc()
                        .innerRadius(d => freq(d.freq))
                        .outerRadius(innerRadius)
                        .startAngle(d => d.startAngle)
                        .endAngle(d => d.endAngle)
                        .padAngle(.01)
                        .padRadius(20))
                    .attr('stroke', 'black')
                    .attr('stroke-width', '2.5')


                g.append("text")
                    .attr('class', 'val')
                    .attr('x', 159)
                    .attr('y', -150)
                    .text(function () { return ["Lower limit " + (event.startAngle * 180 / Math.PI).toFixed(0) + "°"] })
                g.append("text")
                    .attr('class', 'val')
                    .attr('x', 159)
                    .attr('y', -130)
                    .text(function () { return ["Upper limit " + (event.endAngle * 180 / Math.PI).toFixed(0) + "°"] })

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
                g.selectAll('.val')
                    .remove()

            }
        }

    }

    function binSerie(serie: any, nbBins: number){
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

    declare var ResizeObserver: any

    function renderHtmlElement(mdle) {

        let renderingDiv = <HTMLDivElement>(document.createElement('div'))
        renderingDiv.classList.add("h-100")

        //this timeout is needed to get proper size in setRenderingDiv, otherwise clientWidth=clientHeight==0px
        setTimeout(() => {
            mdle.setRenderingDiv(renderingDiv)
            let observer = new ResizeObserver(() => mdle.resize(renderingDiv))
            observer.observe(renderingDiv)
        }, 0)
        return renderingDiv
    }
}

