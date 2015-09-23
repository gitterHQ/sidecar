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
          onClick={this.trySelectSnippet.bind(this)}
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

  // A respectful select text method
  // Only select if they don't have another selection
  trySelectSnippet() {
    let selection = window.getSelection();
    let hasSelection = (selection.toString() !== '');
    if(!hasSelection) {
      this.selectSnippet();
    }
  }

  copySnippet() {
    this.selectSnippet();
    document.execCommand('copy');
  }
  
  selectSnippet() {
    let snippetElement = React.findDOMNode(this.refs.snippetArea);

    // via: http://stackoverflow.com/a/2044793/796832
    if(document.createRange && window.getSelection) {
      let range = document.createRange();
      let sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(snippetElement);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(snippetElement);
        sel.addRange(range);
      }
    } else if(document.body.createTextRange) {
      let range = document.body.createTextRange();
      range.moveToElementText(snippetElement);
      range.select();
    }
  }


}

CopySnippetBlock.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.string,
  annotation: React.PropTypes.string
};
