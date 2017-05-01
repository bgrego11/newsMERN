// Include React
var React = require("react");

// Create the Header component
// Notice how the header uses React.createClass
// Notice how it uses a render function which specifies what will be displayed by the component
var Search  = React.createClass({
  getInitialState: function() {
    return {
      term: '',
      beginDate: '',
      endDate: ''
    };
  },
  render: function() {
    return (
    
      <div id="login">
      <form action="" id="logDiv" method="POST" className="panel panel-default animated bounceInLeft" role="form">
    <legend>Search Articles</legend>

    <div className="panel-body form-group">
        <label for="">term or keyword</label>
        <input value={this.state.term} onChange={this.updateTerm} type="text" className="form-control" id="" placeholder="keyword" />
        <label for="">Password</label>
        <input value={this.state.beginDate} onChange={this.updateBeginDate} type="date" className="form-control" id="" />
        <input value={this.state.endDate} onChange={this.updateEndDate} type="date" className="form-control" id="" />
    </div>
    <button type="submit" id="logBtn" onClick={this.search} className="btn btn-success">Submit</button>
</form>
</div>



    );
  },
  updateTerm: function(evt) {
    this.setState({
      term: evt.target.value
    });
  },
  updateBeginDate: function(evt) {
    this.setState({
      beginDate: evt.target.value
    });
  },
  updateEndDate: function(evt) {
    this.setState({
      endDate: evt.target.value
    });
  },
  
  search: function(e) {
    e.preventDefault();
    console.log(this.state)
  }

});

module.exports = Search;