/**
 * Absar Syed 100706764
 * Zaid Ali
 * 2/24/2024
 */

"use strict";

(function (core) {
    class Contact {

        constructor(fullName = "", contactNumber = "", emailAddress = "", message = "") {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
            this._message = message;

        }

        get fullName() {
            return this._fullName;
        }

        set fullName(value) {
            this._fullName = value;
        }

        get contactNumber() {
            return this._contactNumber;
        }

        set contactNumber(value) {
            this._contactNumber = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get message() {
            return this._message;
        }

        set message(value) {
            this._message = value;
        }


        toString() {
            return `FullName ${this._fullName}\n 
        ContactNumber: ${this._contactNumber} \n
        EmailAddress: ${this._emailAddress}\n
        Message: ${this._message}\n`;
        }

        /**
         * Serialize for writing to localStorage
         * @returns {null|string}
         */
        serialize() {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "" && this._message !== "") {
                return `${this.fullName} , ${this.contactNumber} , ${this.emailAddress}, ${this.message}`;
            }

            console.error("One or more properties of the Contact are empty or invalid");
            return null;
        }

        /**
         * Deserialize is used to read data from localStorage
         * @param data
         */
        deserialize(data) {
            //"Bruce wayne , 5555-55555 , hghg@dcmail.ca "
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
            this._message = propertyArray[3];
        }
    }
    core.Contact = Contact;
}) (core || (core = {}));


function myFun() {
    alert('Thank you for filling the form!');

}