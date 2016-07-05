'use strict';

export default class Row extends React.Component {
  constructor (props) {
    super(props);
  }

  renderViews () {
    let Convo = this.props.conversation;
    let viewOptions = this.props.viewOpts;
    let View = this.props.view;

    let viewA = new View({
      Convo: Convo,
      options: viewOptions,
      chatMode: this.props.chatMode,
			author: "A"
    }, "#" + this.props.metricID + "-A");
    viewA.render();

    let viewB = new View({
      Convo: Convo,
      options: viewOptions,
      chatMode: this.props.chatMode,
			author: "B"
    }, "#" + this.props.metricID + "-B");
    viewB.render();
  }

  componentDidMount () {
    if (this.props.view) {
      this.renderViews();
    }
  }

  render () {
    return (
      <div className="row">
        <div id={this.props.metricID + "-A"} className="cell metric">
          {this.props.cellA}
        </div>
        <div className="cell metric-label">{this.props.metricLabel}</div>
        <div id={this.props.metricID + "-B"} className="cell metric">
          {this.props.cellB}
        </div>
      </div>
    );
  }
}