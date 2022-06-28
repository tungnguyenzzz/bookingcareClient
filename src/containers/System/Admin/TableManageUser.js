import React, { Component } from 'react';

import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'
// import react, react-markdown-editor-lite, and a markdown parser you like

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []

        }
    }

    componentDidMount() {
        this.props.fetchUsersRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteNewUserRedux(user.id);
    }


    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }
    render() {

        let arrUsers = this.state.usersRedux
        return (
            <>

                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>

                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button type="button" className='btn btn-warning px-1'
                                                    onClick={() => this.handleEditUser(item)}

                                                >sua</button>
                                                <button type="button" className='btn btn-warning px-1'
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >xoa</button>

                                            </td>



                                        </tr>

                                    </>
                                )
                            })
                        }




                    </tbody>
                </table>
                <div>

                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

                </div>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteNewUserRedux: (id) => dispatch(actions.deleteNewUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
