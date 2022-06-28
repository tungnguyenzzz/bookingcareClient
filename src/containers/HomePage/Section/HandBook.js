
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";


class HandBook extends Component {


    render() {



        return (
            <div className='section-share section-handbook'>

                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-sextion'>Cẩm nang</span>
                        <button className='btn-section'> Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <p>Cơ Xương Khớp 1</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <p>Cơ Xương Khớp 2</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <p>Cơ Xương Khớp 3</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <p>Cơ Xương Khớp 4</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <p>Cơ Xương Khớp 5</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <p>Cơ Xương Khớp 6</p>
                            </div>
                        </Slider>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
