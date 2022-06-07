function kalel(){
    var jsonStr=validateAndReturn();
    if(jsonStr===""){
        return;
    }
    var req=createGET_BY_KEYRequest(connToken,empDBName,userRelName,jsonStr);
    $.ajaxSetup({async:false});
    var resultObj=executeCommand(req,irlPartUrl);
    $.ajaxSetup({async:true});
    var result=JSON.parse(resultObj.data);
    console.log(result.record.name)
    $("#kacha").html("Sanjay kumar");
}

function validateAndReturn(){
    email=localStorage.getItem("userID");
    var jsonStr={
        email:email
    }
    return JSON.stringify(jsonStr); 
}