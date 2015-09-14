import React from 'react';


export default class CopySnippetBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="copy-snippet-block {this.props.className}">
        <pre
          ref="snippetArea"
          className="copy-snippet-block-body"
        >
          <code>{this.props.value}</code>
        </pre>
        <div className="copy-snippet-block-under-section">
          <summary className="copy-snippet-block-annotation">{this.props.annotation}</summary>
          <button
            className="copy-snippet-block-copy-button"
            onClick={this.copySnippet.bind(this)}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    );
  }

  copySnippet() {
    let snippetElement = React.findDOMNode(this.refs.snippetArea);

    // Add the element to the copy range
    var range = document.createRange();
    range.selectNode(snippetElement);
    var windowRange = window.getSelection();
    // To avoid the non-contiguous range error
    windowRange.removeAllRanges();
    windowRange.addRange(range);

    document.execCommand('copy');
  }

}

CopySnippetBlock.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.string,
  annotation: React.PropTypes.string
};
