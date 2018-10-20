import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import '../App.css';
import { connect } from 'react-redux';
import FloatAnchor from 'react-float-anchor';
import * as actions from '../redux/actions';
import DocumentBar from './DocumentBar';
import BottomBar from './BottomBar';
import ArticleMeta from './ArticleMeta';
import UserCard from './UserCard';
import AnnotationCard from './AnnotationCard';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

const urlPropsQueryConfig = {
    userId: { type: UrlQueryParamTypes.string, queryParam: 'au' },
    authorId: { type: UrlQueryParamTypes.string, queryParam: 'ar' },
};

class ArticleView extends Component {

    static propTypes = {
        // URL props are automatically decoded and passed in based on the config
        userId: PropTypes.string,
        authorId: PropTypes.string,
    
        // change handlers are automatically generated when given a config.
        // By default they update that single query parameter and maintain existing
        // values in the other parameters.
        onChangeUserId: PropTypes.func,
        onChangeAuthorId: PropTypes.func,
    }

    static defaultProps = {
        userId: '',
        authorId: '',
    }

    constructor () {
        super();
        this.state = {
            annotations: {},
            annotater: "",
            annotater_profile: ""
        }
    }

    //fetch some data from Firebase
    componentWillMount() {
        this.props.dataFetch();
        const { userId, authorId, onChangeUserId, onChangeAuthorId } = this.props;
        this.props.setQuery(userId, authorId);
        console.log(userId);
        console.log(authorId);
        this.setState({ ...this.state, annotater: "Ben Mann", annotater_profile: "https://avatars2.githubusercontent.com/u/1021104?s=400&v=4"});
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

    //no longer needed
    //creates a dummy card and returns it
    createCard(spanId) {
        console.log(spanId);
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
                    <UserCard profile={this.state.annotater_profile} name={this.state.annotater} />
                    <ArticleMeta
                        date={this.props.date} 
                        url={this.props.url} 
                        title={this.props.title} 
                        image={this.props.image} 
                        html={this.props.html} 
                        author={this.props.author}
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
                                                    <FloatAnchor
                                                        options={{
                                                            position:'right', 
                                                            vAlign:'top', 
                                                            hAlign: 'left', 
                                                            forcePosition: true, 
                                                            forceHAlign: true,
                                                            forceVAlign: true,
                                                            leftBuffer:48}}
                                                        anchor={
                                                            <div className="testBox"></div>
                                                        }
                                                        float={
                                                            <div className="annotationDesktop">
                                                                <AnnotationCard 
                                                                    profile="https://avatars2.githubusercontent.com/u/1021104?s=400&v=4"
                                                                    name="anonymous"
                                                                    time="1 hour ago"
                                                                    spanId={spanId}
                                                                />
                                                            </div>
                                                        }
                                                        
                                                    />
                                                    <span class={spanClass} id={spanId} onClick={this.toggleCard.bind(this, spanId) }>{spanContent}</span>
                                                    <div className="annotationMobile">
                                                        <AnnotationCard 
                                                            profile="https://avatars2.githubusercontent.com/u/1021104?s=400&v=4"
                                                            name="anonymous"
                                                            time="1 hour ago"
                                                            spanId={spanId}
                                                        />
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


    //const userData = state.pageData[state.queryData.uid];
    console.log(state.pageData);
    if (state.pageData) {
        const { [state.queryData.uid]: userData } = state.pageData;
        console.log(userData);
        const { [state.queryData.aid]: articleData } = userData.items;
        console.log(articleData);
        
        html = articleData.article.content;
        title = articleData.article.title;
        image = articleData.article.image;
        url = (new URL(articleData.url)).hostname;
        author = articleData.article.byline;


        var res = new Date();
        date = res.toString().substring(4, 15);

    }

    //console.log(html);
    return { html, title, url, date, image, author }
};

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, actions)(ArticleView));
