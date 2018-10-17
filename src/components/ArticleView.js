import _ from 'lodash';
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import '../App.css';
import { connect } from 'react-redux';
import $ from 'jquery'; 
import * as actions from '../redux/actions';


class ArticleView extends Component {
    constructor () {
        super();
        this.state = {
            annotations: {}
        }
    }

    //fetch some data from Firebase
    componentWillMount() {
        this.props.dataFetch();
    }

    //toggles state boolean controlling whether to show an annotation card
    toggleCard(spanId) {
        if (this.state.annotations[spanId]) {
            var stateCopy = Object.assign({}, this.state);
            stateCopy.annotations[spanId] = false;
            this.setState(stateCopy);
        }
        else {
            var stateCopy = Object.assign({}, this.state);
            stateCopy.annotations[spanId] = true;
            this.setState(stateCopy);
        }
        console.log(this.state.annotations[spanId]);
    }

    //creates a dummy card and returns it
    createCard(spanId) {
        var profile = "https://avatars2.githubusercontent.com/u/1021104?s=400&v=4";
        var name = "Ben Mann";
        var content = "However, as already mentioned, you really should avoid mutating the DOM outside React. The whole point is to describe the UI once based on the state and the props of the component. Then change the state or props to rerender the component.";
        var time = "1 hour ago";

        return (
            <div class='annotationCard' onClick={this.toggleCard.bind(this, spanId)}>
                <div class='annotationProfile'>
                    <img class='annotationProfile' src={profile} />
                </div>
                <div class='annotationContent'>
                    <div class='annotationAuthor'>
                        {name}
                    </div>
                    <div class='annotationText'>
                        {content}
                    </div>
                    <div class='annotationTime'>
                        {time}
                    </div>
                </div>
            </div>
        )
    }

    //if no images, show cover
    showCover() {
        console.log(this.props.image);
        if (_.includes(this.props.html, "img")) {
            return null;
        }
        else {
            return <img src={this.props.image} class='imageCover'/>;
        }
    }

    render () {
        return (
            <div>
                <div class='doc_bar'>
                    <svg viewBox="0 0 32 32" width="32px" height="32px">
                        <path class="st0" d="M23.9,28.5c1.7,0,3.2-0.6,4.3-1.9c1.5-1.7,2.1-4.3,1.7-7.3c-0.2-1.5-0.6-2.4-1.3-3c-0.7-0.6-1.5-0.9-2.5-0.9H26
                            h-6.2c-0.5,0-0.9-0.1-1.2-0.4c-0.1-0.1-0.3-0.3-0.4-0.6H28l0,0c0-0.3,0.3-5.8-2.2-8.4c-0.9-0.9-2-1.4-3.3-1.5v0H8
                            c-1.7,0-3.2,0.6-4.3,1.9C2.3,8,1.6,10.7,2,13.6c0.2,1.5,0.6,2.4,1.3,3c0.7,0.6,1.5,0.9,2.5,0.9h0.1h6.2c0.5,0,0.9,0.1,1.2,0.4
                            c0.1,0.1,0.3,0.3,0.4,0.6H3.9l0,0c0,0.3-0.3,5.8,2.2,8.4c0.9,0.9,2,1.4,3.3,1.5 M26,12.5h-8.1c-0.1-2,0.4-3.8,1.3-4.8
                            c0.7-0.8,1.6-1.2,2.8-1.2c1,0,1.7,0.3,2.3,1C25.5,8.7,25.9,11,26,12.5z M14,12.5c0-1.5-0.4-4.1-1.8-6h5.4c-1.2,1.5-1.8,3.6-1.7,6H14
                            z M5.9,15.5H5.8c-0.5,0-0.9-0.1-1.2-0.4c-0.2-0.2-0.5-0.5-0.6-1.7C3.7,11,4.2,8.9,5.2,7.7C5.9,6.9,6.9,6.5,8,6.5c1,0,1.8,0.3,2.4,1
                            c1.8,1.9,1.6,5.9,1.6,6l-0.1,1.1h4.2c0.1,0.4,0.2,0.7,0.3,1H16h-0.1h-3.8H5.9z M5.9,20.5H14c0.1,2-0.4,3.8-1.3,4.8
                            c-0.7,0.8-1.6,1.2-2.8,1.2c-1,0-1.7-0.3-2.3-1C6.4,24.3,6,22,5.9,20.5z M17.9,20.5c0,1.5,0.4,4.1,1.8,6h-5.4c1.2-1.5,1.8-3.6,1.7-6
                            H17.9z M26.7,25.3c-0.7,0.8-1.6,1.2-2.8,1.2c-1,0-1.8-0.3-2.4-1c-1.8-1.9-1.6-5.9-1.6-6l0.1-1.1h-4.2c-0.1-0.4-0.2-0.7-0.3-1h0.5H16
                            h3.8H26h0.1c0.5,0,0.9,0.1,1.2,0.4c0.2,0.2,0.5,0.5,0.6,1.7C28.2,22,27.7,24.1,26.7,25.3z" />
                    </svg>
                </div>
                <div class='doc_page'>
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
                    <div>
                        {Parser(this.props.html, {
                            replace: (domNode) => {
                                if (domNode.name === 'span') {
                                    if(domNode.attribs.class === 'text-annotation') {

                                        //extract span content and metadata from highlight
                                        var spanClass = domNode.attribs.class;
                                        var spanId = domNode.attribs.id;
                                        var spanContent = domNode.children[0].data;

                                        //shows the highlight and annotation card, depending on state boolean 
                                        if (this.state.annotations[spanId]) {
                                            return (
                                                <>
                                                    <span class={spanClass} id={spanId} onClick={this.toggleCard.bind(this, spanId) }>{spanContent}</span>
                                                    <div class="text-highlight-open">
                                                        {this.createCard(spanId)}
                                                    </div>
                                                </>
                                            )
                                        }
                                        else {
                                            return <span class={spanClass} id={spanId} onClick={this.toggleCard.bind(this, spanId) }>{spanContent}</span>
                                        }
                                        
                                    }
                                }
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    var author = '';
    var image = '';
    var html = '';
    var title = '';
    var url = '';
    var date = '';

    const pageData = _.values(state.pageData);
    console.log(pageData);
    const data = pageData[0];

    var artnum = 0;
    if (data) {
        const page = _.values(data.items);
        html = page[artnum].article.content;
        title = page[artnum].article.title;
        url = (new URL(page[artnum].url)).hostname;
        image = page[artnum].article.image;
        author = page[artnum].article.author;

        var res = new Date();
        date = res.toString().substring(4, 15);

    }

    console.log(html);
    return { html, title, url, date, image, author }
};

export default connect(mapStateToProps, actions)(ArticleView);
