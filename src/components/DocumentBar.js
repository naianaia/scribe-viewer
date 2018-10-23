import _ from 'lodash';
import React from 'react';
import '../App.css';

import icons from '../assets/icons.json';


const DocumentView = (props) => {
    return (
        <div class='doc_bar'>
            <div class='doc_bar_icons'>
                <div class='doc_bar_left'>
                    <svg class="icon_logo" viewBox="0 0 32 32">
                        <path class="st0" d={icons.scribe.svg}/>
                    </svg>
                </div>
                <svg class="icon_share" viewBox="0 0 24 24" width="20px" height="20px">
                    <path d={icons}/>
                </svg>
            </div>
        </div>
    );
}

export default DocumentView;