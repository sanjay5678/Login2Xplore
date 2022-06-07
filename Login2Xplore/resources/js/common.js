var connToken="90939119|-31949289854365396|90940837";
var dbName="SanjayInternship";
var relName="JsonPowerDB";
var empDBName="Employee"
var userRelName="WebSiteUsers";

function checkSession(){
    console.log("inside :checkSession()");
    var sessionStatus=isJpdbSessionTokenExists(connToken,empDBName,userRelName);
    console.log(sessionStatus);
    if(sessionStatus===400){
        if(Status==="in"){
            window.location.replace("login.html");
        }
        else{
            return;
        }
    }
    else if(sessionStatus===200){
        if(Status==="out"){
            window.location.replace("homepage.html");
        }
        else{
            return;
        }
    }
}

function loadName(){
    $("#eml").html(localStorage.getItem("userID"));
}

function logoutUser(){
    removeSessionUser();
    jQuery.ajaxSetup({async:false});
    var removeReq=removeSessionTokenFromJPDB(connToken, empDBName, userRelName);
    console.log(removeReq);
    
    jQuery.ajaxSetup({async:true});
    if(removeReq===200){
        console.log("Session Removed");
        window.location.replace("login.html");
    }
    else{
        window.location.replace("login.html");
        return;         
    }
}

function removeSessionUser(){
    var jsonStr=validateAndGet();
    if(jsonStr===""){
        return;
    }
    var rel="WebSiteUsers_session"
    while(true){
    var checkReq=createGET_BY_KEYRequest(connToken, empDBName, rel, jsonStr, true, true);
    console.log(checkReq);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    console.log(resultObj);
    if(resultObj.status===400){
        break;
    }
    var result01=JSON.parse(resultObj.data);
    var recordNumber=result01["rec_no"];
    var nextReq=createREMOVERecordRequest1(connToken, empDBName, rel, recordNumber);
    console.log(nextReq)
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(nextReq,imlPartUrl);
    jQuery.ajaxSetup({async:true});
}
    console.log("2"+JSON.stringify(resultObj01));
    
}

function validateAndGet(){
    var email=localStorage.getItem('userID')
    var jsonStr={
        email:email
    }

    return JSON.stringify(jsonStr);
}

function loadHeader0(){
    $("#header").load("resources/header0.html");
}

function loadHeader1(){
    $("#header").load("resources/header1.html");
}

function loadFooter(){
    $("#footer").load("resources/footer.html");
}

function createREMOVERecordRequest1(token, dbName, relName, recNo) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"REMOVE\",\n"
            + "\"rel\" : \""
            + relName
            + "\",\n" + "\"record\":"
            + recNo
            +",\n"+"\"jsonStr\":{},"
            + "\n"
            + "}";
    return req;
}
