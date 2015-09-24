import React from 'react';

import classNames from 'classnames';


export default class CopySnippetBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annotation: this.props.annotation
    };
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
          <summary className="copy-snippet-block-annotation">
            {this.state.annotation}
          </summary>
          <button
            className={classNames({
              'copy-snippet-block-copy-button': true,
              'is-click-positive': this.state.copyClickPositiveState
            })}
            onClick={this.copyButtonClicked.bind(this)}
          >
            <span
              className="copy-snippet-block-copy-button-main-text"
            >
              Copy to Clipboard
            </span>
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

  copyButtonClicked() {
    this.setState({
      annotation: 'Now go forth and paste',
      copyClickPositiveState: true
    });

    setTimeout(() => {
      this.setState({
        copyClickPositiveState: false
      });
    }, this.props.copyButtonClickTimeout);

    this.copySnippet();
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
  annotation: React.PropTypes.string,
  copyButtonClickTimeout: React.PropTypes.number
};
CopySnippetBlock.defaultProps = {
  copyButtonClickTimeout: 2000
};
