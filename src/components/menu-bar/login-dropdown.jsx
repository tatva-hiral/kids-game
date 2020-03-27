/*
NOTE: this file only temporarily resides in scratch-gui.
Nearly identical code appears in scratch-www, and the two should
eventually be consolidated.
*/

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';

import MenuBarMenu from './menu-bar-menu.jsx';
// import {handleLogIn} from '../../reducers/login';

import styles from './login-dropdown.css';

// these are here as a hack to get them translated, so that equivalent messages will be translated
// when passed in from www via gui's renderLogin() function
const LoginDropdownMessages = defineMessages({ // eslint-disable-line no-unused-vars
    username: {
        defaultMessage: 'Username',
        description: 'Label for login username input',
        id: 'general.username'
    },
    password: {
        defaultMessage: 'Password',
        description: 'Label for login password input',
        id: 'general.password'
    },
    signin: {
        defaultMessage: 'Sign in',
        description: 'Button text for user to sign in',
        id: 'general.signIn'
    },
    needhelp: {
        defaultMessage: 'Need Help?',
        description: 'Button text for user to indicate that they need help',
        id: 'login.needHelp'
    },
    validationRequired: {
        defaultMessage: 'This field is required',
        description: 'Message to tell user they must enter text in a form field',
        id: 'form.validationRequired'
    }
});

let newValues = {};
const LoginDropdown = (props) => {
    const [fields, setFields] = useState({ username: '', password: '' });
    const handleChange = (e) => {
        e.preventDefault();
        newValues = { ...fields, [e.target.name]: e.target.value };
        setFields(newValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            username: fields.username,
            password: fields.password,
            useMessages: true
        }
        props.onLogInSubmit(formData);
        console.log('fields', fields);
    }

    return (
        <MenuBarMenu
            className={props.className}
            open={props.isOpen}
            // note: the Rtl styles are switched here, because this menu is justified
            // opposite all the others
            place={props.isRtl ? 'right' : 'left'}
            onRequestClose={props.onClose}
        >
            <div
                className={classNames(
                    styles.login
                )}
            >
                <div>Form</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:       </label>
                        <input type="text" name="username" value={fields.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Password:        </label>
                        <input type="text" name="password" value={fields.password} onChange={handleChange} />
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </MenuBarMenu>
    );
}
LoginDropdown.propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    isRtl: PropTypes.bool,
    onClose: PropTypes.func,
    renderLogin: PropTypes.func
};

// const mapStateToProps = (state, ownProps) => {
//     return {
        
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     // onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
//     onLogIn: () => dispatch(handleLogIn()),
// });

export default (LoginDropdown);
