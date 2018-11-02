import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import '../App.css';
import { connect } from 'react-redux';
import FloatAnchor from 'react-float-anchor';
import * as actions from '../redux/actions';
import UserCard from './UserCard';
import AnnotationCard from './AnnotationCard';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

const urlPropsQueryConfig = {
  userId: { type: UrlQueryParamTypes.string, queryParam: 'au' },
  articleId: { type: UrlQueryParamTypes.string, queryParam: 'ar' },
};

class ArticleView extends Component {

  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    userId: PropTypes.string,
    articleId: PropTypes.string,

    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeUserId: PropTypes.func,
    onChangeAuthorId: PropTypes.func,
  }

  static defaultProps = {
    userId: '',
    articleId: '',
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
    //this.props.dataFetch();
    const { userId, articleId, onChangeUserId, onChangeAuthorId } = this.props;
    this.props.setQuery(userId, articleId);
    this.props.dataFetchStore(userId, articleId);
    this.props.dataFetchAnnotations(userId, articleId);
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
    //console.log(this.state.annotations[spanId]);
  }

  //if no images, show cover
  showCover() {
    //console.log(this.props.image);
    if (_.includes(this.props.html, "img")) {
      return <img src={this.props.image} className='imageCover'/>;
    }
    else {
      return <img src={this.props.image} className='imageCover'/>;
    }
  }

  render () {
    if (!this.props.userId || !this.props.articleId) {
      return (
        <h1>Please specify an author and article in the URL</h1>
      )
    }
    var takeaway = this.props.takeaway ? (<div>Takeaway: {this.props.takeaway}</div>) : null;
    return (
      <div>
        <div className='doc_page'>
          <UserCard profile={this.state.annotater_profile} name={this.state.annotater} />
          {takeaway}
          <div>
            {Parser(this.props.html, {
               replace: (domNode) => {
                 if (domNode.name === 'span') {
                   if(domNode.attribs.class === 'text-annotation') {
                     //extract span content and metadata from highlight
                     //console.log(domNode);
                     var spanClass = domNode.attribs.class;
                     var spanId = domNode.attribs['data-id'];
                     var spanCount = domNode.attribs['data-spancount'];
                     var spanTotal = domNode.attribs['data-spantotal'];
                     //console.log(spanCount);
                     //console.log(spanTotal);
                     var spanContent = domNode.children[0].data;
                     //shows the highlight and annotation card, depending on state boolean
                     if (this.state.annotations[spanId] && spanCount === spanTotal) {
                       return (
                         <span>
                           <FloatAnchor
                             options={{
                               position:'right',
                               vAlign:'top',
                               hAlign: 'left',
                               forcePosition: true,
                               forceHAlign: true,
                               forceVAlign: true,
                               leftBuffer:48}}s
                             anchor={
                               <span className="testBox"></span>
                             }
                             float={
                               <span className="annotationDesktop">
                                 <AnnotationCard spanId={spanId}
                                                        closeFunc={this.toggleCard.bind(this, spanId)}
                                 />
                               </span>
                             }

                           />
                           <span className={spanClass + ((this.props.hoverId === spanId) ? ' text-annotation-hover' : '')} id={spanId} onClick={this.toggleCard.bind(this, spanId) }>{spanContent}</span>
                           <span className="annotationMobile">
                             <AnnotationCard
                               spanId={spanId}
                               closeFunc={this.toggleCard.bind(this, spanId)}
                             />
                           </span>
                         </span>
                       )
                     }
                     else {
                       return <span className={spanClass} id={spanId} onClick={this.toggleCard.bind(this, spanId) }>{spanContent}</span>
                     }
                   }
                 }
                 else if (domNode.name === 'style') {
                   if (domNode.attribs.class === 'scribe-inject') {
                     return <span />;
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
  var takeaway = '';


  //const userData = state.pageData[state.queryData.uid];
  //console.log(state.pageData);
  if (state.pageData.page) {
    //const { [state.queryData.uid]: userData } = state.pageData;
    //console.log(userData);
    //const { [state.queryData.aid]: articleData } = userData.items;
    //console.log(articleData);

    const articleData = state.pageData.page;

    html = articleData.article.content;
    title = articleData.article.title;
    image = articleData.article.image;
    url = (new URL(articleData.url)).hostname;
    author = articleData.article.byline;
    takeaway = articleData.takeaway;


    var res = new Date();
    date = res.toString().substring(4, 15);

  }

  const hoverId = state.hoverId;

  //console.log(html);
  return { html, title, url, date, image, author, hoverId, takeaway}
};

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, actions)(ArticleView));
