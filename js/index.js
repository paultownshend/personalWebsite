
var url = "http://data.iana.org/TLD/tlds-alpha-by-domain.txt";
var storedDomains;

fetch(url)
    .then(function(response) {
        response.text().then(function(text) {
            storedDomains = text;
        });
    });

console.log(storedDomains);

// Checks if the given value is empty and returns true if it is not empty;
function checkEmpty(value) {
    if (value == null || typeof value == "undefined") return false;
    var str = value;
    //https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250
    if (!str.replace(/\s/g, "").length) return false;
    return true;
}

// checks if the given value is in the correct format and returns true if it is
function isPhoneNumber(value) {
    if (!checkEmpty(value)) return false;
    for (i = 1; i<=12; i++) {
        if (i == 4 || i == 8) {
            if (value[i] == "-") continue;
            else return false;
        }
        else {
            if (Number.isInteger(value[i])) continue;
            else return false;
        }
    }
    return true;
}

function sendContact(contact_number) {
    var firstName = document.getElementById("user_fname").value;
    var lastName = document.getElementById("user_lname").value;
    var email = document.getElementById("user_email").value;
    var phone = document.getElementById("user_phone").value;
    var message = document.getElementById("user_message");

    if (!checkEmpty(firstName)) {
        setVisible("fname_error");
    } else {setHidden("fname_error");}
    if (!checkEmpty(lastName)) {
        setVisible("lname_error");
    } else {setHidden("lname_error");}
    if (!checkEmail(email)) {
        setVisible("email_error");
    } else {setHidden("email_error");}
    if (!isPhoneNumber(phone)) {
        setVisible("phone_error");
    } else {setHidden("phone_error");}
    if (!checkEmpty(message)) {
        setVisible("message_error");
    } else {setHidden("message_error");}
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
    var tmpArr = email.split("@")
    var suffix = tmpArr[tmpArr.length - 1];
    var domain = (suffix.split("."))[0];
    
    
    if (storedDomains.includes(domain.toUpperCase())){ return true;}
    return false;
}


