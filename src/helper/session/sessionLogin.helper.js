exports.setSessionLogin = (session, isLogged) => {
    session.loggedin = isLogged;
}

exports.setSessionEmail = (session, email) => {
    session.email = email;
}

exports.isSessionExists = (session) => {
    return session.loggedin;
}

exports.isSessionEmailExists = (session) => {
    return session.email;
}

exports.destroySession = (session) => {
    session.destroy((err) => {
        if (err) {
            console.log(err);
        }
    })
}