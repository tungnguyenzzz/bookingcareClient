import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
class MedicalFacility extends Component {

    render() {


        return (
            <div className='section-share section-specialty-facility'>

                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-sextion'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'> Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <p>Bệnh viện Hữu nghị Việt Đức 1</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <p>Bệnh viện Hữu nghị Việt Đức 2</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <p>Bệnh viện Hữu nghị Việt Đức</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <p>Bệnh viện Hữu nghị Việt Đức 4</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <p>Bệnh viện Hữu nghị Việt Đức 5</p>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <p>Bệnh viện Hữu nghị Việt Đức 6</p>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
