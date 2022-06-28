import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],


            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            actions: '',
            userEditId: ''
        }
    }


    async componentDidMount() {

        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux

            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrPositions = this.props.positionRedux
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state

        if (action === CRUD_ACTIONS.CREATE) {
            // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,

                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,

                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }



    }

    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address',]
        let isValid = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('missing ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)

            this.setState({
                avatar: base64
            })
        }
    }
    handleEditUserFromParent = (user) => {

        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'hashcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender
        let genders = this.state.genderArr
        let roles = this.state.roleArr
        let positions = this.state.positionArr

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;


        return (
            <div>
                <div className='user-redux-container'>
                    <div className='title'><FormattedMessage id="manage-user.add" /></div>
                    <div className="user-redux-body" >
                        <div className='container'>
                            <div>{isLoadingGender === true ? 'Loading gender' : ''}</div>
                            <div className='row'>
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Email</label>
                                            <input type="email" className="form-control"
                                                value={email}
                                                onChange={(event) => this.onChangeInput(event, 'email')}
                                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Password</label>
                                            <input type="password" className="form-control"
                                                value={password}
                                                onChange={(event) => this.onChangeInput(event, 'password')}
                                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">First name</label>
                                        <input type="text" className="form-control"
                                            value={firstName}
                                            onChange={(event) => this.onChangeInput(event, 'firstName')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress2">Last name</label>
                                        <input type="text" className="form-control"
                                            value={lastName}
                                            onChange={(event) => this.onChangeInput(event, 'lastName')}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">Phone numbers</label>
                                            <input type="text" className="form-control"
                                                value={phoneNumber}
                                                onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">Address</label>
                                            <input type="text" className="form-control"
                                                value={address}
                                                onChange={(event) => this.onChangeInput(event, 'address')}
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label >Gender</label>
                                            <select className="form-control"
                                                value={gender}
                                                onChange={(event) => this.onChangeInput(event, 'gender')}
                                            >
                                                {genders && genders.length > 0 &&
                                                    genders.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                        )
                                                    })

                                                }


                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Position</label>
                                            <select className="form-control"
                                                value={position}
                                                onChange={(event) => this.onChangeInput(event, 'position')}
                                            >
                                                {positions && positions.length > 0 &&
                                                    positions.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                        )
                                                    })

                                                }


                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Role</label>
                                            <select className="form-control"
                                                value={role}
                                                onChange={(event) => this.onChangeInput(event, 'role')}
                                            >
                                                {roles && roles.length > 0 &&
                                                    roles.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                        )
                                                    })

                                                }


                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputZip">Image</label>
                                            <div>
                                                <input id='previewImg' type='file' hidden
                                                    onChange={(event) => { this.handleOnchangeImage(event) }}
                                                />
                                                <label htmlFor='previewImg'>choose img</label>
                                                <div className='preview-image'></div>
                                            </div>

                                        </div>
                                    </div>

                                    <button type="button" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-success"}
                                        onClick={() => { this.handleSaveUser() }}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT ? "Edit" : "Save"}

                                    </button>

                                    <div className='col md-12'>
                                        <TableManageUser
                                            handleEditUserFromParent={this.handleEditUserFromParent}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>

                </div>

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
