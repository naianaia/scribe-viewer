import React, { Component } from 'react';

class LoadingOverlay extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
  }

  render() {
    return (
        <div className="loadingFrame">
        </div>
    );
  }
}

export default LoadingOverlay;