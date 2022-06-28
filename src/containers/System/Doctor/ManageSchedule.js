import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, dateFormat, LANGUAGES } from '../../../utils';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import _ from 'lodash';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })

        }
        return result
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect

            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {

            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }


            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect

        //     })
        // }
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })

    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {

        let rangeTime = this.state.rangeTime
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = [];

        if (!currentDate) {
            toast.error('Invalid date!')
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selectedDoctor')
            return
        }
        let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);

            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.time = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error('Invalid selected time!')
                return;
            }
        }
        console.log('check result', result)
    }
    render() {

        const { selectedDoctor } = this.state;
        let rangeTime = this.state.rangeTime
        return (

            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title"></FormattedMessage>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Chon bac si</label>
                                <Select
                                    value={selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}

                                />
                            </div>
                            <div className='col-6'>
                                <label>Chon ngay</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                    className="form-control"
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>

                                {rangeTime && rangeTime.length > 0
                                    &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                onClick={() => this.handleClickBtnTime(item)}
                                                className={item.isSelected === false ? 'btn-save' : 'btn-save active'} key={index}>{item.valueVi}</button>
                                        )
                                    })
                                }
                            </div>
                            <button type='button' className='btn btn-info'
                                onClick={() => this.handleSaveSchedule()}
                            > Luu thong tin</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
