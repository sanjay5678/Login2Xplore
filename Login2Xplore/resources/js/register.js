

function saveUser(){
    var jsonObj=validate();
    if(jsonObj===""){
        return;
    }
    var saveReq=createSETRequest(connToken,jsonObj,empDBName,userRelName,"PUT","email");
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(saveReq,"/api/iml/set");
    jQuery.ajaxSetup({async:true});
    if(resultObj.status==200){
        $(".bodypart").prop('class',"alert-success");
        $(".bodypart").html("Successfully Registered User!");
        setInterval(function(){
            window.location.replace("login.html");
        },2000);
    }
    else{
        $(".bodypart").html("Don't Know guys what the hell Happened here?")
        $(".bodypart").fadeOut(3000);
        resetLogin();
    }
}

function resetLogin(){
    $("#fname").val("");
    $("#email").val("");
    $("#pass").val("");
    $("#apass").val("");
}

function validate(){
    fullName=$("#fname").val();
    email=$("#email").val();
    password=$("#pass").val();
    passAgain=$("#apasss").val();

    if(fullName===""){
        $("#msg").html("Name is Missing <br>");
        $("#fname").focus();
        return "";
    }
    if(email===""){
        $("#msg").html("Email is Missing");
        $("#email").focus();
        return "";
    }
    if(password===""){
        $("#msg").html("Password is Missing");
        $("#pass").focus();
        return "";
    }
    if(passAgain===""){
        $("#msg").html("Confirm password is Missing");
        $("#apass").focus();
        return "";
    }

    jsonObj={
        name:fullName,
        email:email,
        password:password 
    }
    return JSON.stringify(jsonObj);
}

function checkEmail(){
    var jsonStr=validateAndReturn();
    if(jsonStr===""){
        return;
    }
    var emailReq=createGET_BY_KEYRequest(connToken, empDBName, userRelName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(emailReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj.status==200){
        $("#msg").html("This email id is already registered");
        $("#email").focus();
    }
    return;
}

function validateAndReturn(){
    var email=$("#email").val();
    if(email===""){
        $("#msg").html("Enter email id");
        return "";
    }
    var jsonStr={
        email:email
    }
    return JSON.stringify(jsonStr);
}