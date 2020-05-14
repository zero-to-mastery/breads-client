import React, { Component } from 'react';
import * as d3 from 'd3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

class Heatmap extends Component {
    constructor(props) {
        super(props);
    }
    drawMap() {
        let width = 640;
        let height = 450;
        let padding = 50;

        let svg = d3.select('.heatmap')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

        // let tooltip = d3.select('.heatmap').append('div')
        //                 .attr('id', 'tooltip');
        let months =[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]
        let days =[
            'Sun',
            'Mon',
            'Tues',
            'Wed',
            'Thurs',
            'Fri',
            'Sat'
        ]
        let dayOfWeek = this.props.readings[0].data.map(reading => {
            return moment(reading.created_at).format('dddd');
        });

        let count = {};
        var maxCount = 0;

        for (let day of dayOfWeek) {
            count[day] = (count[day] || 0) + 1;
            maxCount = Math.max(maxCount, count[day]);
        }

        // x axis scaled for weeks of year
        let xScale = d3.scaleLinear()
                       .domain([0, 11])
                       .range([padding, width - padding]);

        // y axis scaled for day of week
        let yScale = d3.scaleLinear()
                       .domain([0, 6])
                       .range([height - padding, padding]);

        // color scale
        let fScale = d3.scaleSequential()
                       .domain([0, maxCount])
                       .interpolator(d3.interpolateReds)

        // x axis
        svg.append('g')
           .attr('transform', 'translate(0,' + (height - padding) + ')')
           .attr('id', 'x-axis')
           .call(d3.axisBottom(xScale).tickFormat(m => months[m]));
        
        // y axis
        svg.append('g')
           .attr('transform', 'translate(' + padding + ',0)')
           .attr('id', 'y-axis')
           .call(d3.axisLeft(yScale).tickFormat(d => days[d]));

        // use readings created at data
        svg.selectAll('rect')
           .data(this.props.readings[0].data)
           .enter()
           .append('rect')
             .attr('class', 'cell')
             .attr('data-created', d => moment(d.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a"))
             .attr('width', 15)
             .attr('height', 15)
             .attr('x', d => xScale(moment(d.created_at).format('M') - 1))
             .attr('y', d => yScale(moment(d.created_at).format('E') - 1) - padding)
             .attr('fill', (d, i) => fScale(count[dayOfWeek[i]]))
            //  .attr('fill', 'blue')
             // simplify tooltip to be a number
            //  .on('mouseover', (d, i) =>
            //      tooltip
            //             .style('opacity', .75)
            //             .style('left', (d3.event.x + 25) + 'px')
            //             .style('top', (d3.event.y - 25) + 'px')
            //             .attr('data-year', d.year)
            //             .html(`
            //                <p>${d.title}</p>
            //                <p>${data.baseTemperature + d.variance} C</p>
            //              `)
            //  )
            //  .on('mouseout', () => tooltip.style('opacity', 0));

        // legend scale
        let legendScale = d3.scaleSequential(d3.interpolateInferno)
                            .domain([0, 106]) 

        let legend = d3.select('#legend')
                       .append('svg')
                       .attr('width', 106)
                       .attr('height', 25)
                       .append('g');
        
        let bars = legend.selectAll('.bars')
                         .data(d3.range(106), d => d)
                         .enter().append('rect')
                         .attr('class', 'bars')
                         .attr('x', (d, i) => i)
                         .attr('y', 0)
                         .attr('height', 25)
                         .attr('width', 1)
                         .style('fill', (d, i) => legendScale(d));
    }
    
    render() {
        const { loading } = this.props;
        return (
            loading.isLoading ? (
                <FontAwesomeIcon icon='spinner' pulse/>
            ) : (
                <div
                    className='heatmap'
                    // width={this.props.width}
                    // height={this.props.height}
                >
                {this.drawMap()}
                </div>
            )
        )
    }
}

export default Heatmap;