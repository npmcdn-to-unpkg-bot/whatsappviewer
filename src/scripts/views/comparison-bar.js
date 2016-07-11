export default class ComparisonBar {
  constructor (el, props) {
    this.w = 400;
    this.h = 50;
    this.colorA = props.colorA;
    this.colorB = props.colorB;
    this.r = 20;
    this.mg = 30;
    this.hourStep = (this.w - this.mg) / 24;

    this.el = el
  }

  render (data) {
    // Make sure there is not one already
    // TODO: This is dirty, fix it
    d3.select('#' + this.el + ' svg').remove();

    // Append SVG to div
    this.svg = d3.select('#' + this.el)
                .append('svg')
                .attr('width', this.w)
                .attr('height', this.h);

    this.update(data);
  }

  update (data) {
    this.computeScaleFns(data);
    this.addBars(data);
    this.addLabels(data);
  }

  computeScaleFns (data) {
    let dataMax = d3.max([data.authorA, data.authorB]);

  	this.xScale =
      d3.scaleLinear()
				.domain([0, dataMax])
				.range([0, this.w - 100]);

    this.yScale = (i) => { return this.h / 4 + i * this.colW; }

    // Adjust column width based on type of buckets
    this.colW = 15;
  }

  // Apend the bars on the histogram
  addBars (data) {
    let barsHist = this.svg.selectAll('.compBar')
      .data([data.authorA, data.authorB])
      .enter().append('rect')
      .attr("class", "compBar");

    barsHist
      .attr("x", (d, i) => 0)
      .attr("y", (d, i) => this.yScale(i))
      .attr("width",  (d, i) => this.xScale(d))
      .attr("height", 2)

    barsHist
      .style("fill", (d, i) => {
        if (i === 0) return this.colorA;
        return this.colorB;
      });

    let bubbs = this.svg.selectAll('.compBubbs')
      .data([data.authorA, data.authorB])
      .enter().append('circle')
      .attr("class", "compBubbs");

    bubbs
      .attr("cx", (d, i) => this.xScale(d, i))
      .attr("cy", (d, i) => this.yScale(i))
      .attr("r", 4)

    bubbs
      .style("fill", (d, i) => {
        if (i === 0) return this.colorA;
        return this.colorB;
      });
  }

  addLabels (data) {
    let label = this.svg.selectAll(".label")
      .data([data.authorA, data.authorB])
      .enter().append('text')

    label
      .attr("x", (d, i) => this.w)
      .attr("y", (d, i) => this.yScale(i) + 5)
      .text((d) => d.toFixed(2))
      .style("text-anchor", "end")
      .style("font-size", "12px");
  }
}
