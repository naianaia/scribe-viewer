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

        
    }

    componentWillMount() {
        this.props.dataFetch("San Francisco");
    }

    showCard(spanId) {
        console.log("ShowCard");
        console.log(spanId);
    }

    render () {
        return (
            <div>
                <div class='doc_meta'>
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
                                console.log(domNode);
                                var spanClass = domNode.attribs.class;
                                var spanId = domNode.attribs.id;
                                var spanContent = domNode.children[0].data;
                                console.log(spanContent);

                                return <div>
                                        <span class={spanClass} id={spanId} onClick={this.showCard.bind(this, spanId) }>{spanContent}</span>
                                    </div>
                                
                            }
                        }
                    }
                })}
                </div>
                
            </div>
        )
    }
}

//<div dangerouslySetInnerHTML={{ __html: this.props.html }} />

const mapStateToProps = state => {
    var html = '';
    var title = '';
    var url = '';
    var date = '';
    const pageData = _.values(state.pageData);
    const data = pageData[0];
    if (data) {
        const page = _.values(data.items);
        html = page[0].content;
        title = page[0].title;
        url = (new URL(page[0].url)).hostname;

        //date.setUTCSeconds(page[0].created);
        var res = new Date();
        date = res.toString().substring(4, 15);
        console.log(url);

    }
    console.log(html);
    return { html, title, url, date }
};

export default connect(mapStateToProps, actions)(ArticleView);
