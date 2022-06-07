function changePass(){
    var email=localStorage.getItem('userID');
    var currPass=$("#currPass").val();
    var newPass=$("#newPass").val();
    var jsonStr=validateAndGet(email);
    var checkReq=createGET_BY_KEYRequest(connToken, empDBName, userRelName, jsonStr, true, true);
    
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    
    var result=JSON.parse(resultObj.data);
    if(result.record["password"]===currPass){
        var jsonObj={
            email:email,
            password:newPass
        }
        var recNo=result.rec_no;
        var req=createUPDATERecordRequest(connToken, JSON.stringify(jsonObj), empDBName, userRelName, recNo);
        jQuery.ajaxSetup({async:false});
        var resultObj=executeCommand(req,imlPartUrl);
        jQuery.ajaxSetup({async:true});
        
    }
    else{
        alert("The Current password you entered is Wrong");
        return;
    }
}

function validateAndGet(email){
    if(email===""){
        return;
    }
    var jsonStr={
        email:email
    }
    return JSON.stringify(jsonStr);
}