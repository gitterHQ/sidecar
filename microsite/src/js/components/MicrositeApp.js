import React from 'react';
import { connect, bindActionCreators } from 'react-redux';

import stripIndent from '../utility/strip-indent-tag';

import CopySnippetBlock from './CopySnippetBlock';
import { setRoomName } from '../actions/MicrositeActions';


class MicrositeApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    // Injected by connect() call:
    const { dispatch, roomName, documentation } = this.props;

    let sidecarBootstrapOptionsCopySnippet = stripIndent`
      <script>
        ((window.gitter = {}).chat = {}).options = {
          room: '${roomName}'
        };
      </script>
    `;

    return (
      <div className="panel-wrapper">
        <section className="documentation-panel">

          <h1 className="documentation-panel-primary-header">
            Sidecar
          </h1>

          <p>
            Please type the name of the room you want to load into your sidecar. E.g. gitterHQ/sidecar
          </p>

          <input
            className="primary-input"
            type="text"
            placeholder="Enter Room Name"
            value={this.props.roomName}
            onChange={this._onRoomNameChange.bind(this)}
          />

          <p>
            Just copy and paste it into your site.
          </p>

          <CopySnippetBlock
            value={sidecarBootstrapOptionsCopySnippet}
            annotation="A little snippet in your website"
          />


          <h2 className="documentation-panel-secondary-header">
            Documentaion
          </h2>

          <section
            className="documentation-panel-body use-markdown"
            dangerouslySetInnerHTML={{__html: documentation}}
          ></section>
        </section>

        <section className="primary-panel">
          <div className="primary-panel-gitter-logo-title">
            <div className="gitter-logo-holder">
              <div className="logo-left-arm" />
              <div className="logo-body-left" />
              <div className="logo-body-right" />
              <div className="logo-right-arm" />
            </div>
            <h1 className="gitter-logo-name">Gitter</h1>
          </div>

          <h2 className="primary-panel-secondary-header">Add some Gitter to your site</h2>

          <p>
            Sidecar is a (mostly) code-free way of embedding Gitter into your website with a simple JavaScript snippet.
          </p>

          <p>
            It works out of the box with no customization, or you can control its behaviour with some basic configuration.
          </p>

          <div className="">
            See it in action
          </div>
        </section>
      </div>
    );
  }


  _onRoomNameChange(e) {
    // Injected by connect() call:
    const { dispatch } = this.props;

    var name = e.target.value;
    dispatch(setRoomName(name));
  }


}

MicrositeApp.propTypes = {
  // react-redux injected
  dispatch: React.PropTypes.func,

  roomName: React.PropTypes.string
};


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps(state) {
  return {
    roomName: state.roomName,
    documentation: state.documentation
  };
}



// Wrap the component to inject dispatch and state into it
export default connect(
  mapStateToProps
)(MicrositeApp);
