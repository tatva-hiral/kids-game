import xhr from 'xhr';

const api = ({
    method,
    host,
    uri,
    json,
    useCsrf
    // Base64-encoded JPEG thumbnail of the object being saved
}) => new Promise((resolve, reject) => {
    console.log('promise>>>');
    xhr({
        method,
        uri,
        json
    }, (error, response) => {
        console.log('response', response);
        if (error || response.statusCode !== 200) {
            return reject();
        }
        return resolve(includeFullUrls(response.body, host));
    });
});
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_LOGIN_OPEN = 'SET_LOGIN_OPEN';

const initialState = {
    loginErrorMessage: '',
    loginData: ''
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_LOGIN_OPEN:
        return Object.assign({}, state, {
            loginData: action.isOpen
        });
    case SET_LOGIN_ERROR:
        return Object.assign({}, state, {
        loginErrorMessage: action.loginError
        });
    default:
        return state;
    }
};

const setLoginError = loginError => ({
    type: SET_LOGIN_ERROR,
    loginError: loginError
});

const setLoginOpen = isOpen => ({
    type: SET_LOGIN_OPEN,
    isOpen: isOpen
});


// export const handleLogIn = (formData) =>  {
export function handleLogIn(formData) {
    console.log('handlelogin>>');
    return dispatch => {
        console.log('dispatch');
    // dispatch(setLoginError(null));
    formData.useMessages = true; // NOTE: this may or may not be being used anywhere else
    api({
        method: 'post',
        host: '',
        uri: 'https://scratch.mit.edu/accounts/login/',
        json: formData,
        useCsrf: true
    }, (err, body) => {
        console.log('handlelogin', err, body);
        if (err) dispatch(setLoginError(err.message));
        if (body) {
            body = body[0];
            if (body.success) {
                console.log('sucess');
                dispatch(setLoginOpen(false));
                body.messages.forEach(message => {
                    if (message.message === 'canceled-deletion') {
                        // dispatch(module.exports.setCanceledDeletionOpen(true));
                    }
                });
                // dispatch(sessionActions.refreshSession());
                // callback({success: true});
            } else {
                console.log('else');
                if (body.redirect) {
                    window.location = body.redirect;
                }
                // Update login error message to a friendlier one if it exists
                // dispatch(module.exports.setLoginError(body.msg));
                // JS error already logged by api mixin
                // callback({success: false});
            }
        } else {
            console.log('elseeeee');
            // JS error already logged by api mixin
            // callback({success: false});
        }
    });
    };
};

export {
    reducer as default,
    initialState as loginInitialState,
    // handleLogIn,
    setLoginOpen,
    setLoginError,
};