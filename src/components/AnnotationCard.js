import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import '../App.css';
import icons from '../assets/icons.json';

class AnnotationCard extends Component {
  constructor () {
    super();
    this.state = {
      profile: "",
      name: "",
      annotationText: "",
      spanId: "",
      authorId: "",
      created: ""
    }
  }

  componentWillMount() {
    //wire up state annotation to annotation text and set it to state
    var { [this.props.spanId]: annotationObject } = this.props.annotations;
    console.log(annotationObject);
    var annotationText = annotationObject.text;
    this.props.getAnnotator(annotationObject.authorId);
    this.setState({ annotationText: annotationText, spanId: this.props.spanId, authorId:annotationObject.authorId, created: annotationObject.created.toDate().toLocaleString() });
    //console.log(this.props);
  }

  bindClassToHighlight = () => {
    //console.log("ENTER");
    //console.log(this.state.spanId);
    this.props.setHover(this.state.spanId);
  }

  unbindClassToHighlight = () => {
    //console.log("LEAVE");
    //console.log(this.state.spanId);
    this.props.resetHover();
  }

  render() {
    return (
      <span
        className='annotationCard'
        id={'ac' + this.props.spanId}
        onMouseEnter={this.bindClassToHighlight}
        onMouseLeave={this.unbindClassToHighlight}
      >
        <span className='annotationProfileHolder'>
          <img className='annotationProfile' src={this.props.annotatorAvatar} />
        </span>
        <span className='annotationContent'>
          <span className='annotationBar'>
            <span className='annotationAuthor'>
              {this.props.annotatorName}
            </span>
            <span className='annotationClose' onClick={this.props.closeFunc}>
              <svg className="icon_close" viewBox="0 0 24 24" width="20px" height="20px">
                <path d={icons.close.svg}/>
              </svg>
            </span>
          </span>
          <span className='annotationText'>
            {this.state.annotationText}
          </span>
          <span className='annotationTime'>
            {this.state.created}
          </span>
        </span>
      </span>
    )
  }
}

const mapStateToProps = state => {

  const annotations = state.annotationListData;
  const annotator = state.annotator;
  const annotatorName = annotator.name;
  const annotatorAvatar = annotator.avatar;
  //console.log(annotations);
  return { annotations , annotatorName, annotatorAvatar };
};

export default connect(mapStateToProps, actions)(AnnotationCard);
