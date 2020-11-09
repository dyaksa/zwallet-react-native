import http from "../http-common";
const bcrypt = require("react-native-bcrypt");
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const REGEX_PHONE = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const validatePassword = (token, password) => {
    http.get("/uset/detail",{headers: {"x-access-token": token}})
        .then(res => {
            if(bcrypt.default.compareSync(password, res.data.password)){
                return true;
            }else{
                return false;
            }
        }).catch(err => {
            return false;
    })
}
export {
    EMAIL_REGEXP,
    PASS_REGEXP,
    REGEX_PHONE,
    validatePassword,
}