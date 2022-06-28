import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }



    componentDidMount() {
        let user = this.props.currentUser;

        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'aaaaaa',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }

    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    //     // console.log(event.target.value, id)
    // }
    checkValidateinput = () => {
        let check = true
        let arrinput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrinput.length; i++) {
            if (!this.state[arrinput[i]]) {
                check = false
                alert('missing parameters' + arrinput[i])
                break;
            }
        }
        return check
    }


    handleSaveUser = () => {
        let checkInput = this.checkValidateinput();
        if (checkInput) {
            this.props.editUser(this.state);

        }

    }
    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className="modal-user-container"
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Edit user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                disabled
                                value={this.state.email}
                            />

                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            />

                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />

                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />

                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address}
                            />

                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}
                    >
                        save
                    </Button>
                    {' '}
                    <Button onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



