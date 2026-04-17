import { Component } from '@angular/core';
import * as d3 from 'd3'
import { FixturesService } from '../fixtures.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-scoring-chart',
  standalone: true,
  imports: [],
  templateUrl: './scoring-chart.component.html',
  styleUrl: './scoring-chart.component.css'
})
export class ScoringChartComponent {
  results: any[] = []
  teamStats: any[] = []

  fixturesService = inject(FixturesService)

  constructor() {
    this.fixturesService.getResultsAndTeamRGB().subscribe(response => {
      this.results = response
      console.log('Results:', this.results)
      this.buildStats()
    })
  }

  getAbbr(name: string): string {
    return (name[0] + name[name.length - 1]).toUpperCase()
  }

  buildStats() {
    const statsMap: any = {}

    this.results.forEach(r => {
      if (!statsMap[r.hteam]) statsMap[r.hteam] = { name: r.hteam, for: 0, against: 0, rgb: r.homeRgb }
      if (!statsMap[r.ateam]) statsMap[r.ateam] = { name: r.ateam, for: 0, against: 0, rgb: r.awayRgb }

      statsMap[r.hteam].for += r.hteamtotal
      statsMap[r.hteam].against += r.ateamtotal
      statsMap[r.ateam].for += r.ateamtotal
      statsMap[r.ateam].against += r.hteamtotal
    })

    this.teamStats = Object.values(statsMap).sort((a: any, b: any) => a.name.localeCompare(b.name))
    setTimeout(() => this.drawChart(), 0)
  }

  drawChart() {
    const margin = { top: 40, right: 20, bottom: 40, left: 20 }
    const width = 1100 - margin.left - margin.right
    const barHeight = 250
    const totalHeight = barHeight * 2 + 30

    d3.select('#chart').selectAll('*').remove()

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', totalHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand()
      .domain(this.teamStats.map((t: any) => t.name))
      .range([0, width])
      .padding(0.2)

    const maxVal = d3.max(this.teamStats, (t: any) => Math.max(t.for, t.against)) as number

    const yUp = d3.scaleLinear()
      .domain([0, maxVal])
      .range([barHeight, 0])

    const yDown = d3.scaleLinear()
      .domain([0, maxVal])
      .range([0, barHeight])

    const midY = barHeight + 15

    // Blue bars (For) - going up
    svg.selectAll('.bar-for')
      .data(this.teamStats)
      .enter()
      .append('rect')
      .attr('x', (t: any) => x(t.name) as number)
      .attr('y', (t: any) => yUp(t.for))
      .attr('width', x.bandwidth())
      .attr('height', (t: any) => barHeight - yUp(t.for))
      .attr('fill', 'steelblue')

    // Red bars (Against) - going down
    svg.selectAll('.bar-against')
      .data(this.teamStats)
      .enter()
      .append('rect')
      .attr('x', (t: any) => x(t.name) as number)
      .attr('y', midY)
      .attr('width', x.bandwidth())
      .attr('height', (t: any) => yDown(t.against))
      .attr('fill', 'crimson')

    // Abbreviation labels at centre
    svg.selectAll('.label-abbr')
      .data(this.teamStats)
      .enter()
      .append('text')
      .attr('x', (t: any) => (x(t.name) as number) + x.bandwidth() / 2)
      .attr('y', midY - 3)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .text((t: any) => this.getAbbr(t.name))

    // Score For labels above blue bars
    svg.selectAll('.label-for')
      .data(this.teamStats)
      .enter()
      .append('text')
      .attr('x', (t: any) => (x(t.name) as number) + x.bandwidth() / 2)
      .attr('y', (t: any) => yUp(t.for) - 4)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .text((t: any) => t.for)

    // Score Against labels below red bars
    svg.selectAll('.label-against')
      .data(this.teamStats)
      .enter()
      .append('text')
      .attr('x', (t: any) => (x(t.name) as number) + x.bandwidth() / 2)
      .attr('y', (t: any) => midY + yDown(t.against) + 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .text((t: any) => t.against)
  }
}
