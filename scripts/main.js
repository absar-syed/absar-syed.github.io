/**
 * Absar Syed 100706764
 * Zaid Ali
 * 2/24/2024
 */

"use strict";

(function () {

    function CheckLogin(){

        if (sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                              <i class="fas fa-undo"></i> Logout</a>`)
        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "index.html";
        });
    }

    function FetchEventBriteData(eventid) {
        console.log("Called FetchEventBriteData")
        let eventID = eventid;
        let apiKey = '4IWRJALYHU5EO46QEYPP';
        let getEventDataURL =
            `https://www.eventbriteapi.com/v3/events/${eventID}/?token=${apiKey}&expand=ticket_classes`;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', getEventDataURL, true);
        // xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);


        xhr.onload = function () {

            if (xhr.status >= 200 && xhr.status < 300) {

                let response = JSON.parse(xhr.responseText);

                if (response.success !== false) {
                    DisplayEventBriteData(response);
                }
                else {
                    console.error("API request failed.")
                    $('#event-container').html(`<p>Failed to retrieve the event data from Eventbrite: ${response.error},
                                                   ${response.error_description}</p>`)
                }

            } else {
                console.error("HTTP request failed.")
                $('#event-container').html(`<p>Failed to retrieve the event data from Eventbrite. 
                                               Try refreshing the page!</p>`)
            }
        }
        xhr.send();
    }


    function DisplayEventBriteData(data) {
        console.log("Called DisplayEventBriteData")

        let event = $('main');

        event.html(

            `<div class="m-5">
                <h1 class="card-header mb-3">${data.name.text}</h1>
                <div class="card-body">
                    <p>${data.description.text}</p>
                    <p>Begins at ${data.ticket_classes[0].sales_start}</p>
                    <p>Ends at ${data.ticket_classes[0].sales_end}</p>
                    <p></p>
                    <a href="${data.url}" class="btn btn-primary">Go to event page</a>
                </div>
            </div>`
        );
    }

    function EncapsulateFetches() {
        console.log("Called EncapsulatedFetches.");

        // FetchEventBriteData('845385208917');
        FetchEventBriteData('849099117317');
    }


    //Callback function
    function LoadHeader(html_data) {
        $("header").html(html_data);
        $(`li > a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    function LoadFooter(html_data) {
        $("footer").html(html_data);
    }

    function AjaxRequest(method, url, callback) {

        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.addEventListener("readystatechange", () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                if(typeof callback == "function") {
                    callback(xhr.responseText);
                }else {
                    console.error("ERROR: callback not a function")
                }
            }
        })

        xhr.send();
    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()...")

        let messageArea = $("#messageArea");

        $("#loginButton").on("click", function () {

            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function(data) {

                for(const user of data.users) {
                    console.log(user);
                    if(username.value === user.Username && password.value === user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "submissions.html";
                }else{
                    $("#username")
                        .trigger("focus")
                        .trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Credentials")
                        .show();
                }

            });
        });

        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "index.html";
        });
    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage");

        ContactFormValidation();

        $("#registerButton").on("click", (event) => {
            let newUser = new core.User(fullname.value, emailaddress.value, username.value, password.value);

            let data = newUser.serialize();
            newUser.deserialize(data);
            newUser.toJSON();
            const fs = require('fs');
            console.log("New user added!");
            location.href = "login.html";
        });
    }

    function DisplayHomePage() {
        console.log("Called DisplayHomePage")
    }

    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage")
    }

    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage")
    }

    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage")
    }

    function DisplayBlogPage() {
        console.log("Called DisplayBlogPage")
    }

    function DisplayEventsPage() {
        console.log("Called DisplayEventsPage")
        EncapsulateFetches()
    }

    function DisplaySubmissionsPage() {
        console.log("Called DisplayContactListPage()...")

        if (localStorage.length > 0) {

            let contactList = document.getElementById("contactList");
            let data = "";

            let index = 1;
            let keys = Object.keys(localStorage);

            for (const key of keys) {

                let contact= new core.Contact();
                let contactData = localStorage.getItem(key);
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td>${contact.message}</td>
                        <td>
                            <button value="${key}" class="btn btn-primary btn-sm edit"> 
                                <i class="fas fa-edit fa-sm">Edit</i> 
                            </button>
                        </td>
                        <td>
                            <button value="${key}" class="btn btn-danger btn-sm delete"> 
                                <i class="fas fa-delete fa-sm">Delete</i>
                            </button>
                        </td>
                        </tr> `;
                index++;
            }

            contactList.innerHTML = data;
        }

        $("#addButton").on("click", () => {

            location.href = "edit.html#add";

        });


        $("button.edit").on("click", function () {
            location.href = "edit.html#" + $(this).val();
        });


        $("button.delete").on("click", function () {

            if(confirm("Confirm contact delete?")) {
                localStorage.removeItem($(this).val());
            }
            location.href = "submissions.html";
        });
    }

    function ContactFormValidation() {

        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter in a valid first and last name (ex. John Smith).")

        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter in a valid contact number (ex. 999 666 9999).")

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter in a valid email address (ex. absar.syed@dcmail.ca).")

    }

    function ValidateField(input_field_id, regular_expression, error_message) {

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                //fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                //pass validation
                messageArea.removeClass("class").hide();
            }
        });
    }

    function AddContact(fullName, contactNumber, emailAddress, message) {

        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);

        if (contact.serialize()) {
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }

    }

    function DisplayContactPage() {
        console.log("Called DisplayContactPage()...")

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function () {

            if (subscribeCheckbox.checked) {
                AddContact(fullName.value, contactNumber.value, emailAddress.value, message.value);
            }
        })
    }

    function DisplayEditPage() {
        console.log("Called DisplayEditPage()...")

        ContactFormValidation();

        let page = location.hash.substring(1);
        switch (page) {
            case "add":

                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fa fa-plus fa-sm"> Add</i>`)

                $("#editButton").on("click", (event) => {

                    //prevents form submission
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value, message.value);
                    location.href = "submissions.html";
                });

                $("#cancelButton").on("click", (event) => {
                    location.href = "submissions.html";
                });

                break;
            default:
                //edit operation
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                //display the contact information
                $("#fullName").val(contact.fullName)
                $("#contactNumber").val(contact.contactNumber)
                $("#emailAddress").val(contact.emailAddress)
                $("#message").val(contact.message)

                $("#editButton").on("click", (event) => {

                    //prevent form submission
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();
                    contact.message = $("#message").val();

                    localStorage.setItem(page, contact.serialize());
                    location.href = "submissions.html";

                });

                $("#cancelButton").on("click", (event) => {
                    location.href = "submissions.html";
                });

                break;
        }

    }

    function Start() {
        console.log("App Started...");

        AjaxRequest("GET", "header.html", LoadHeader)

        switch(document.title) {

            case "Home":
                DisplayHomePage();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Team":
                DisplayTeamPage();
                break;
            case "Blog":
                DisplayBlogPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Submissions":
                DisplaySubmissionsPage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
            case "Edit Submission":
                DisplayEditPage();
                break;
        }

        AjaxRequest("GET", "footer.html", LoadFooter)
    }

    window.addEventListener("load", Start);

})()