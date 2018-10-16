import _ from 'lodash';
import React, { Component } from 'react';
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

    render () {
        return (
            <div>
                <div class='doc_meta'>
                    <p class='text_meta_date'>
                        {this.props.date}
                    </p>
                    <h1>{this.props.title}</h1>
                    <p class='text_meta'>
                        {this.props.url}
                    </p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
            </div>
        )
    }
}

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
