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
            spanId: ""
        }
    }

    componentWillMount() {
        //wire up state annotation to annotation text and set it to state
        var { [this.props.spanId]: annotationObject } = this.props.annotations;
        var annotationText = annotationObject.text;
        this.setState({ annotationText: annotationText, spanId: this.props.spanId });
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
                class='annotationCard' 
                id={'ac' + this.props.spanId}
                onMouseEnter={this.bindClassToHighlight}
                onMouseLeave={this.unbindClassToHighlight}
            >
                <span class='annotationProfileHolder'>
                    <img class='annotationProfile' src={this.props.profile} />
                </span>
                <span class='annotationContent'>
                    <span class='annotationBar'>
                        <span class='annotationAuthor'>
                            {this.props.name}
                        </span>
                        <span class='annotationClose' onClick={this.props.closeFunc}>  
                            <svg class="icon_close" viewBox="0 0 24 24" width="20px" height="20px">
                                <path d={icons.close.svg}/>
                            </svg>
                        </span>
                    </span>
                    <span class='annotationText'>
                        {this.state.annotationText}
                    </span>
                    <span class='annotationTime'>
                        {this.props.time}
                    </span>
                </span>
            </span>
        )
    }
}

const mapStateToProps = state => {

    var annotations = '';
    
    
    const { [state.queryData.uid]: userData } = state.pageData;
    //console.log(userData);
    const { [state.queryData.aid]: articleData } = userData.items;
    //console.log(articleData);
    
    //const { [this.state.spanId]: annotationObject } = articleData.annotations
    //annotationText = annotationObject.text;
    
    const annotations = articleData.annotations;

    //console.log(annotations);
    return { annotations }
};

export default connect(mapStateToProps, actions)(AnnotationCard);