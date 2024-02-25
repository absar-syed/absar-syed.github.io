"use strict";

(function (core) {
    class User {

        constructor(fullName = "", emailAddress = "", username = "", password = "") {

            this._emailAddress = emailAddress;
            this._fullName = fullName;
            this._username = username;
            this._password = password;

        }

        get fullName() {
            return this._fullName;
        }

        set fullName(value) {
            this._fullName = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get username() {
            return this._username;
        }

        set username(value) {
            this._username = value;
        }

        get password() {
            return this._password;
        }

        set password(value) {
            this._password = value;
        }

        toString() {
            return `FullName ${this._fullName}  
                \nEmailAddress: ${this._emailAddress}\n Username ${this._username}`
        }

        /**
         * Serialize for writing to localstorage
         * @returns {null|string}
         */
        serialize() {
            if (this._fullName !== "" && this._emailAddress !== "" && this._username !== "") {
                return `${this._fullName}, ${this._emailAddress}, ${this._username}`;
            }
            console.error("One or more properties of the Contact are empty or invalid")
            return null;
        }


        /**
         * Deserialize is sued to read data from localstorage
         * @param data
         */
        deserialize(data) {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2]
        }

        toJSON(){

            // const user = {
            //     FullName : this._fullName,
            //     EmailAddress : this._emailAddress,
            //     Username : this._username,
            //     Password : this._password
            // }


            return {
                FullName : this._fullName,
                EmailAddress : this._emailAddress,
                Username : this._username,
                Password : this._password
            }
        }

        fromJSON(data){

            this._fullName = data.FullName;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;

        }
    }
    core.User = User;
}) ( core || (core = {} ));

