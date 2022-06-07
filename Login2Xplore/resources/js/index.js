var dbName="SanjayInternship";
var relName="JsonPowerDB";
var primaryKey="empid";

function resetForm(){
    $("#empid").val("")
    $("#empname").val("")
    $("#empsal").val("")
    $("#emphra").val("")
    $("#empda").val("")
    $("#empded").val("")
}

function saveForm(){
    var jsonStr=validateAndGetForm01();
    if(jsonStr===""){
        return;
    }
    var req=createPUTRequest("90939119|-31949289854365396|90940837", jsonStr, dbName, relName);
    console.log(req);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(req,imlPartUrl);
    jQuery.ajaxSetup({async:true});
    var resultStr=JSON.stringify(resultObj);
    console.log(resultStr);
    disableFields();
}

function validateAndGetForm01(){
    var empid=$("#empid").val();
    if(empid===""){
        alert("Enter Employee ID");
    }
    var empname=$("#empname").val();
    var empsal=$("#empsal").val();
    var emphra=$("#emphra").val();
    var empda=$("#empda").val();
    var empded=$("#empded").val();
    var jsonStr={
        "empid":empid,
        "empname":empname,
        "empsal":empsal,
        "emphra":emphra,
        "empda":empda,
        "empded":empded,
    }
    return JSON.stringify(jsonStr);
}

function checkID(){
    var jsonStr=validateAndGetForm02();
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest("90939119|-31949289854365396|90940837", dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj["status"]==200){
        disenable01();
        result=JSON.parse(resultObj.data);
        $("#empname").val(result.record["empname"]);
        $("#empsal").val(result.record["empsal"]);
        $("#emphra").val(result.record["emphra"]);
        $("#empda").val(result.record["empda"]);
        $("#empded").val(result.record["empded"]);
        disableFields();
    }
    else
    disenable02();
}

function validateAndGetForm02(){
    var str=$("#empid").val();
    if(str===""){
        return;
    }
    var jsonStr={
        "empid":str
    }
    return JSON.stringify(jsonStr);
}

function disenable01(){
    $("#save").attr('disabled',true);
    $("#reset").attr('disabled',true);
}

function disenable02(){
    $("#change").attr('disabled',true);
}

function updateRecord(){
    var jsonStr=validateAndGetForm01();
    if(jsonStr===""){
        return;
    }
    var updateReq=createSETRequest("90939119|-31949289854365396|90940837", jsonStr, dbName, relName,"UPDATE",primaryKey)
    console.log(updateReq);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(updateReq,"/api/iml/set");
    jQuery.ajaxSetup({async:true});
    console.log(JSON.stringify(resultObj));
    disableFields();
}

function disableFields(){
    $('#empid').attr('readonly', true);
    $('#empname').attr('readonly', true);
    $('#empsal').attr('readonly', true);
    $('#emphra').attr('readonly', true);
    $('#empda').attr('readonly', true);
    $('#empded').attr('readonly', true);
    $("#save").attr("disabled",true);
}    

function enableFields(){
    $('#empid').attr('readonly', false);
    $('#empname').attr('readonly', false);
    $('#empsal').attr('readonly', false);
    $('#emphra').attr('readonly', false);
    $('#empda').attr('readonly', false);
    $('#empded').attr('readonly', false);
}       

function goToFirst(){
    var firstReq=createFIRST_RECORDRequest("90939119|-31949289854365396|90940837", dbName, relName, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(firstReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj01.data);
    $("#empid").val(result01.record["empid"]);
    $("#empname").val(result01.record["empname"]);
    $("#empsal").val(result01.record["empsal"]);
    $("#emphra").val(result01.record["emphra"]);
    $("#empda").val(result01.record["empda"]);
    $("#empded").val(result01.record["empded"]);
    $("#first").attr("disabled",true);
    $("#previous").attr("disabled",true);
    $("#next").attr("disabled",false);
    $("#last").attr("disabled",false);
}

function goToLast(){
    var lastReq=createLAST_RECORDRequest("90939119|-31949289854365396|90940837", dbName, relName, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(lastReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj01.data);
    $("#empid").val(result01.record["empid"]);
    $("#empname").val(result01.record["empname"]);
    $("#empsal").val(result01.record["empsal"]);
    $("#emphra").val(result01.record["emphra"]);
    $("#empda").val(result01.record["empda"]);
    $("#empded").val(result01.record["empded"]);
    $("#last").attr("disabled",true);    
    $("#next").attr("disabled",true);
    $("#prev").attr("disabled",false);
}

function goToNext(){
    var jsonStr=validateAndGetForm02();
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest("90939119|-31949289854365396|90940837", dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj.data);
    var recordNumber=result01["rec_no"];
    var nextReq=createNEXT_RECORDRequest("90939119|-31949289854365396|90940837", dbName, relName, recordNumber, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(nextReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj01["status"]==400){
        $("#next").attr("disabled",true);
        $("#last").attr("disabled",true);
        return;
    }
    var result=JSON.parse(resultObj01.data);
    $("#empid").val(result.record["empid"]);
    $("#empname").val(result.record["empname"]);
    $("#empsal").val(result.record["empsal"]);
    $("#emphra").val(result.record["emphra"]);
    $("#empda").val(result.record["empda"]);
    $("#empded").val(result.record["empded"]); 
    
    $("#first").attr("disabled",false);
    $("#previous").attr("disabled",false);
}

function goToPrevious(){
    var jsonStr=validateAndGetForm02();
    if(jsonStr===""){
        return;
    }
    var checkReq=createGET_BY_KEYRequest("90939119|-31949289854365396|90940837", dbName, relName, jsonStr, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj=executeCommand(checkReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    var result01=JSON.parse(resultObj.data);
    var recordNumber=result01["rec_no"];
    var nextReq=createPREV_RECORDRequest("90939119|-31949289854365396|90940837", dbName, relName, recordNumber, true, true);
    jQuery.ajaxSetup({async:false});
    var resultObj01=executeCommand(nextReq,irlPartUrl);
    jQuery.ajaxSetup({async:true});
    if(resultObj01["status"]==400){
        $("#previous").attr("disabled",true);
        $("#first").attr("disabled",true);
        return;
    }
    var result=JSON.parse(resultObj01.data);
    $("#empid").val(result.record["empid"]);
    $("#empname").val(result.record["empname"]);
    $("#empsal").val(result.record["empsal"]);
    $("#emphra").val(result.record["emphra"]);
    $("#empda").val(result.record["empda"]);
    $("#empded").val(result.record["empded"]); 
    
    $("#last").attr("disabled",false);
    $("#next").attr("disabled",false);
}