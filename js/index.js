
var url = "http://data.iana.org/TLD/tlds-alpha-by-domain.txt";
var storedDomains;

fetch(url)
    .then(function(response) {
        response.text().then(function(text) {
            storedDomains = text;
            done();
        });
    });

function done() {
    console.log(storedDomains);
}

// Checks if the given value is empty and returns true if it is not empty;
function checkEmpty(value) {
    if (value == null || typeof value == "undefined") return false;
    var str = value;
    //https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250
    if (!str.replace(/\s/g, "").length) return false;
    return true;
}

// checks if the given value is in the correct format and returns true if it is
function isPhoneNumber(num) {
    //https://www.w3resource.com/javascript/form/phone-no-validation.php
    var phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phone.test(num);
}

//Checks to see if all the input is valid and
//sends the contact form to my udel email
function getContactInfo(contactNumber) {
    var firstName = document.getElementById("user_fname").value;
    var lastName = document.getElementById("user_lname").value;
    var email = document.getElementById("user_email").value;
    var phone = document.getElementById("user_phone").value;
    var message = document.getElementById("user_message");
    var send = false;
    if (!checkEmpty(firstName)) {
        setVisible("fname_error");
        send = false;
    } else {
        setHidden("fname_error");
        send = true;
    }
    if (!checkEmpty(lastName)) {
        setVisible("lname_error");
        send = false;
    } else {
        setHidden("lname_error");
        send = true;
    }
    if (!validateEmail(email)) {
        setVisible("email_error");
        send = false;
    } else {
        setHidden("email_error");
        send = true;
    }
    if (!isPhoneNumber(phone)) {
        setVisible("phone_error");
        send = false;
    } else {
        setHidden("phone_error");
        send = true;
    }

    var fields = {contact_number: contactNumber, user_fname: firstName, user_lname: lastName, user_email: email, user_phone: phone, user_message: message};
    if (send) {
        return fields;
    } else {
        return null;
    }
    
}

function setVisible(id) {
    document.getElementById(id).style.visibility = "visible";
}

function setHidden(id) {
    document.getElementById(id).style.visibility = "hidden";
}

// check if the email is valid and returns true if it is
function checkEmail(email) {
    if (!checkEmpty(email)) {return false}
    if (!validateEmail(email)) {return false}
    var tmpArr = email.split("@")
    var suffix = tmpArr[1];
    var domain = (suffix.split("."))[1];
    
    
    if (storedDomains.includes(domain.toUpperCase())){return true;}
    return false;
}

//function to check if the given email is in the correct format
//and returns true if it is
//Got this function from my Dad
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}


