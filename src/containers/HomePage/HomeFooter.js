
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";


class HomeFooter extends Component {


    render() {



        return (
            <div className='home-footer'>
                <p>&copy; 2015 hoidanit.com <a href='m.facebook.com'>Xem them</a></p>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
