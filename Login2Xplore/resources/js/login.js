function checkUser(){
    var email=$("#email").val();
    var password=$("#pass").val();
    var jsonStr={
        email:email,
        password:password
    };
    var checkReq=createGET_BY_KEYRequest(connToken,empDBName,userRelName,JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj.status==400){
        $("#msg").html("Incorrect Email id or Password");
        $("#msg").fadeOut(4000);
        $("#email").val("");
        $("#pass").val("");
    }
    else if(resultObj.status==200){
        createSession(email);
        window.location.replace('homepage.html');
    }
}

function createSession(email){
    jQuery.ajaxSetup({async:false});
    var sessionToken=createJpdbSessionToken(connToken,1,empDBName,userRelName,email);
    jQuery.ajaxSetup({async:true});
    if(sessionToken==200){
        window.location.replace('home.html');
    }
    else{
        $("#email").val("");
        $("#pass").val("");
        alert("Cannot log you in");
        return;
    }
    return; 
}

