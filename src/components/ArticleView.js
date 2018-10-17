import _ from 'lodash';
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import '../App.css';
import { connect } from 'react-redux';
import $ from 'jquery'; 
import * as actions from '../redux/actions';
import DocumentBar from './DocumentBar';
import ArticleMeta from './ArticleMeta';


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
            return <img src={this.props.image} class='imageCover'/>;
        }
        else {
            return <img src={this.props.image} class='imageCover'/>;
        }
    }

    render () {
        return (
            <div>
                <DocumentBar />
                <div class='doc_page'>
                    <ArticleMeta
                        date={this.props.date} 
                        url={this.props.url} 
                        title={this.props.title} 
                        image={this.props.image} 
                        html={this.props.html} 
                    />
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
    const data = pageData[1];

    var artnum = 2;
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
