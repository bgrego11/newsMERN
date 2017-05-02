// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the Header Component
var Header = require("./Header");
var Search = require("./Search");




class Main extends React.Component {
  constructor(props) {
    super(props);
  // Here we render the function
  }
  render() {

    return (
// Here we deploy the header component as though it were any other HTML element
<div>
  <Header />
  <div className="container col-sm-10 col-md-8 col-lg-8">

          {/* This code will dump the correct Child Component */}
          {this.props.children}

        </div>
        </div>
)}
}

export default Main;
