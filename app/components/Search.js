// Include React
var React = require("react");
var axios = require("axios");
var moment = require('moment');




// Create the Header component
// Notice how the header uses React.createClass
// Notice how it uses a render function which specifies what will be displayed by the component
var Search  = React.createClass({
  getInitialState: function() {
    return {
      articles: [],
        term:'',
        beginDate: '',
        endDate: '',
        results: []
    
    };
    
  },
  componentDidMount: function() {
      self = this;
      var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=467cd747d3f145e7acd33208f28821c3";
      axios.get(url)
        .then(function (res) {
            var arts = res.data.results
            self.setState({
                  articles: arts
                });
              console.log(self.state)
            })
          }
      ,
  render: function() {
    return (
    
      <div id="login">
      <form action="" id="logDiv" method="POST" className="panel panel-default animated bounceInLeft" role="form">
    <legend>Search Articles</legend>

    <div className="panel-body form-group">
        <label for="">term or keyword</label>
        <input value={this.state.term} onChange={this.updateTerm} type="text" className="form-control" id="" placeholder="keyword" />
        <label for="">Dates</label>
        <input value={this.state.beginDate} onChange={this.updateBeginDate} type="date" className="form-control" id="" />
        <input value={this.state.endDate} onChange={this.updateEndDate} type="date" className="form-control" id="" />
    </div>
    <button type="submit" id="logBtn" onClick={this.search} className="btn btn-success">Submit</button>
</form>
<div>
  <div className="well">
  <ul>
   { this.state.results.map(function(article) {
   return <li><a href={article.url}>{article.title}</a></li>
  })
   }
   </ul>
  </div>

</div>
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
    var self = this;
    var arts = self.state.articles;
    var term = self.state.term;
    var beginDate = self.state.beginDate;
    var endDate = self.state.endDate;
    e.preventDefault();
    var i;
    for (i in arts) {
        if (arts[i].title.includes(term) && moment(arts[i].published_date).diff(moment(beginDate)) >=0 && moment(arts[i].published_date).diff(moment(endDate)) <= 0 ) {
          self.state.results.push(arts[i])
        } 
    }
    console.log(self.state)
    self.setState({
      results: self.state.results
    })
  }
});

module.exports = Search;


