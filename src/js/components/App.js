var React = require('react');

var App = React.createClass({

  getDefaultProps: function(){
    return {
      lineThickness: 10
    };
  },

  getInitialState: function(){
    return {
      height: window.innerHeight/2,
      mouseY: window.innerHeight/2,
      grabbed: false,
    };
  },

  componentWillMount: function(){
  },

  componentDidMount: function(){
  },

  animation: '',

  step(timestamp){
    this.setState({
      height:this.state.mouseY
    });
    this.animation = requestAnimationFrame(this.step);
  },

  stopGrab(offset){
    cancelAnimationFrame(this.animation);
    this.setState({
      height:this.state.mouseY-offset,
      grabbed:false
    });
    // callback????
  },

  mousedownHandler(e){
    this.setState({
      grabbed:true
    });
    var mouseY = window.innerHeight - e.pageY;
    requestAnimationFrame(this.step);
  },

  mouseupHandler(e){
    this.stopGrab(0);
  },

  mousemoveHandler(e){
    console.log(e.clientY)
    this.setState({
      mouseY:window.innerHeight-e.clientY
    });
  },

  render: function(){

    var divStyle = {
      height:this.state.height - this.props.lineThickness/2 + 'px'
    };

    window.onmouseout = function(e) {
      if ((e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY <= 0 || e.clientY >= window.innerheight) && this.state.grabbed){
          this.stopGrab(0);
      }
    }.bind(this);      //  this.stopGrab; // the cursor has left the building

    return(
      <article  onMouseMove={this.mousemoveHandler} >
        <div className='top-part'>
          <div className='percentage' >{Math.round(this.state.height/window.innerHeight * 100)}%</div>
        </div>
        <div className='bottom-part' style={divStyle} >
          <div className='handle' onMouseDown={this.mousedownHandler} onMouseUp={this.mouseupHandler} ></div>
        </div>
      </article>
    );
  }
});

module.exports = App;
