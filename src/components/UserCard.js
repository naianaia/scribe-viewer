import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import '../App.css';


class UserCard extends Component {
    constructor () {
        super();
        this.state = {
            profile: "",
            name: ""
        }
    }
    componentWillMount() {
        this.state.profile = this.props.profile;
        this.state.name = this.props.name;
    }

    render() {
        return (
            <div class='user_card_holder'>
                <div class='user_profile'>
                    <img class='user_profile_pic' src={this.props.userAvatar} />
                </div>
                <div class='user_card_text'>
                    <p class='user_card_text_top'><span class='text-annotation'>Annotated</span> by</p>
                    <p class='user_card_text_bottom'><b>{this.props.userName}</b></p>
                </div>

                <div class='doc_bar_download'>
                    <p class='text-download'>GET SCRIBE ></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const pageData = state.pageData;
    const userName = pageData.userName;
    const userAvatar = pageData.userAvatar;
    return { userName, userAvatar };
};

export default connect(mapStateToProps, actions)(UserCard);