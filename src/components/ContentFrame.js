import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import ArticleView from './ArticleView';
import LoadingOverlay from './LoadingOverlay';
import BottomBar from './BottomBar';

class ContentFrame extends Component {
  componentWillMount() {
  }

  renderLoadingScreen() {
      if (this.props.loaded) {
        return null;
      }
      else {
          return (
              <LoadingOverlay />
          );
      }
  }

  render() {
    return (
        <div className="contentFrame">
            <div className="appFrame">
                <div className="AppHolder">
                    <div className="App">
                        <ArticleView />
                    </div>
                    <div className="Sidebar">
                    </div>
                </div>

                <BottomBar />
            </div>
            {this.renderLoadingScreen()}
        </div>
    );
  }
}
const mapStateToProps = state => {

    const loaded = state.loaded;
    //console.log(loaded);
    return { loaded };
};

export default connect(mapStateToProps, actions)(ContentFrame);
