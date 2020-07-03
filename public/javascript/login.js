$(document).ready(function(){
    $("#frmLogin").submit(function(){
        var username = $("#txtUsernameLog").val();
        var password = $("#txtPasswordLog").val();
        var flag = true;
        if(username != "black" || password != "white")
        {
            $("#errLogin").text("Incorrect username or password!");
            $("#xtUsernameLog").focus();
            flag = false;
        }
        else{
            $("#errLogin").text("");
        }
        return flag;
    });
});

