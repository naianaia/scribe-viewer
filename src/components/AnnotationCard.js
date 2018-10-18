import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';


class AnnotationCard extends Component {
    constructor () {
        super();
        this.state = {
            profile: "",
            name: "",
            annotationText: ""
        }
    }

    componentWillMount() {
        //wire up state annotation to annotation text and set it to state
        var { [this.props.spanId]: annotationObject } = this.props.annotations;
        var annotationText = annotationObject.text;
        this.setState({ annotationText: annotationText });
        console.log(this.props);
    }

    render() {
        return (
            <div class='annotationCard'>
                <div class='annotationProfile'>
                    <img class='annotationProfile' src={this.props.profile} />
                </div>
                <div class='annotationContent'>
                    <div class='annotationAuthor'>
                        {this.props.name}
                    </div>
                    <div class='annotationText'>
                        {this.state.annotationText}
                    </div>
                    <div class='annotationTime'>
                        {this.props.time}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    var annotations = '';
    
    
    const { [state.queryData.uid]: userData } = state.pageData;
    console.log(userData);
    const { [state.queryData.aid]: articleData } = userData.items;
    console.log(articleData);
    
    //const { [this.state.spanId]: annotationObject } = articleData.annotations
    //annotationText = annotationObject.text;
    
    const annotations = articleData.annotations;

    console.log(annotations);
    return { annotations }
};

export default connect(mapStateToProps, null)(AnnotationCard);