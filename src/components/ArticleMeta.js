import _ from 'lodash';
import React, { Component } from 'react';
import '../App.css';


class ArticleMeta extends Component {
    constructor () {
        super();
        this.state = {
        }
    }
    componentWillMount() {

    }

    //if no images, show cover
    showCover() {
        console.log(this.props.image);
        if (_.includes(this.props.html, "img")) {
            return <img src={this.props.image} class='imageCover'/>;
        }
        else {
            return <img src={this.props.image} class='imageCover'/>;
        }
    }

    render() {
        return (
            <div class='doc_meta'>
                {this.showCover()}
                <p class='text_meta text_meta_date'>
                    {this.props.date}
                </p>
                <h1 class='text_meta text_meta_title'>{this.props.title}</h1>
                <p class='text_meta text_meta_url'>
                    {this.props.url}
                </p>
            </div>
        )
    }
}

export default ArticleMeta;