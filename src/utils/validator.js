function validatePassword(password, retypedPassword) {
    let result = false;
    if (password === retypedPassword) {
        result = true;
    }
    return result;
}

module.exports = {
    validatePassword
}