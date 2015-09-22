import React from 'react';

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    //console.log(this.props.startPoint, this.props.endPoint);
    
    let arrowAngle = Math.atan2(
      this.props.endPoint.y - this.props.startPoint.y,
      this.props.endPoint.x - this.props.startPoint.x
    );
    
    let arrowLength = Math.sqrt(
      Math.pow(this.props.endPoint.y - this.props.startPoint.y, 2) +
      Math.pow(this.props.endPoint.x - this.props.startPoint.x, 2)
    );
    
    // The length before we are completely transparent
    let minLength = 50;
    // When we start to fade
    let fadeThreshold = 100;
    let arrowOpacity = arrowLength > fadeThreshold ? 1 : ((arrowLength - minLength) / fadeThreshold);
    
    return (
      <div
        className="arrow-wrapper"
        style={{
          opacity: `${arrowOpacity}`,
          width: `${arrowLength}px`,
          top: `${this.props.startPoint.y}px`,
          left: `${this.props.startPoint.x}`,
          transform: `rotateZ(${arrowAngle}rad)`,
          transformOrigin: '0 0'
        }}
      >
        <svg
          className="arrow-stem"
          viewBox="0 0 200 73"
          style={{
            transform: 'translateY(-50%)',
            transformOrigin: '0 50%'
          }}
        >
          <path
            className="arrow-stem"
            d="M198.684,40.389c0,0-50.07-9.676-102.362-7.308c-19.767,0.896-1.368-1.341-39.84,2.495
  c-56.547,5.201-55.734,4.813-53.917,4.813"
          />
         
        </svg>
        <svg
          className="arrow-leafs"
          viewBox="0 0 200 73"
          style={{
            transform: 'translateY(-50%)',
            transformOrigin: '0 50%'
          }}
        >
          <g>
            <path d="M198.684,40.389c0,0-4.371-8.662-41.768-38.389"/>
            <path d="M198.684,40.389c0,0-6.58,7.112-52.439,31.37"/>
          </g>
        </svg>
      </div>
    );
  }

}

let pointType = React.PropTypes.shape({
  x: React.PropTypes.number,
  y: React.PropTypes.number
});
Arrow.propTypes = {
  startPoint: pointType,
  endPoint: pointType
};
