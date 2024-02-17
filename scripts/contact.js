"use strict";

(function (core) {
    class Contact {

        constructor(fullName = "", contactNumber = "", emailAddress = "") {

            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
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

        toString() {
            return `Full Name ${this._fullName} 
                \nContact Number: ${this._contactNumber} 
                \nEmailAddress: ${this.emailAddress}`
        }

        /**
         * Serialize for writing to localstorage
         * @returns {null|string}
         */
        serialize() {
            if (this.fullName !== "" && this._contactNumber !== "" && this.emailAddress !== "") {
                return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
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
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2]
        }
    }
    core.Contact = Contact;
}) ( core || (core = {} ));
