import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenEmitter();
    }

    listenEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
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


        // console.log(event.target.value, id)
    }
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


    handleAddNewuser = () => {
        let checkInput = this.checkValidateinput();
        if (checkInput) {
            this.props.createNewUser(this.state);

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
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                            />

                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password}
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
                        onClick={() => { this.handleAddNewuser() }}
                    >
                        Add
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



