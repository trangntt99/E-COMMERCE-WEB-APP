
function isEmail(sEmail){
    var input = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(input.test(sEmail))
    {
        return true;
    }
    else{
        return false;
    }
}

$(document).ready(function(){
    $("#txtEmail").change(function(){
        var email = $("#txtEmail").val();
        flag = true;

        if(isEmail(email) == false){
            $("#errEmail").text("Invalid email");
            flag = false;
        }
        else{
            $("#errEmail").text("");
            flag = true;
        }
        return flag;
    })

    $("#txtUsername").change(function(){
        var username_length = $("#txtUsername").val().length;
        flag = true;

        if(username_length < 5){
            $("#errUs").text("Username must be 5 character length");
            flag = false;
        }
        else{
            $("#errUs").text("");
            flag = true;
        }
        return flag;
    })

    $("#txtPassword").change(function(){
        var password = $("#txtPassword").val().length;
        flag = true;

        if(password < 8){
            $("#errPs").text("Password must be 8 character length");
            flag = false;
        }
        else{
            $("#errPs").text("");
        }
        return flag;
    })
})
$(document).ready(function(){
    $("#signUp-form").submit(function(){
        flag = true;
        if($("#txtEmail").change() == false){
            flag = false;
        }
        
        if($("#txtUsername").change() == false){
            flag = false;
        }

        if($("#txtPassword").change() == false){
            flag = false;
        }
        
        return flag;
    })
    
})




