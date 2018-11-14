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
            <div className='user_card_holder'>
                <div className='user_profile'>
                    <img className='user_profile_pic' src={this.props.userAvatar} />
                </div>
                <div className='user_card_text'>
                    <p className='user_card_text_top'><span className='text-annotation'>Annotated</span> by</p>
                    <p className='user_card_text_bottom'><b>{this.props.userName}</b></p>
                </div>

                <div className='doc_bar_download' onClick={() => {
                        window.open('https://play.google.com/store/apps/details?id=io.getscribe.android&referrer=viewer', '_blank')
                }}>
                    <p className='text-download'>GET SCRIBE &gt;</p>
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
