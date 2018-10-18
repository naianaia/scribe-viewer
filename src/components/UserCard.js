import _ from 'lodash';
import React, { Component } from 'react';
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
                    <img class='user_profile_pic' src={this.props.profile} />
                </div>
                <div class='user_card_text'>
                    <p class='user_card_text_top'><span class='text-annotation'>Annotated</span> by</p>
                    <p class='user_card_text_bottom'><b>anonymous</b></p>
                </div>

                <div class='doc_bar_download'>
                    <p class='text-download'>GET SCRIBE ></p>
                </div>
            </div>
        )
    }
}

export default UserCard;