function SendRequestForm() {
    var check = 1;
    var input = document.querySelectorAll('.input-text');
    for (var j = 0; j < 4; j++) {
        if (!input[j].value) {
            check = 0;
            break;
        }
    }
    if (check == 0)
        alert("ERROR: Missing content.");
    else {
        document.getElementById('contactForm').style.display = 'none';
        document.querySelector(".writeMsg").style.display = 'none';
        document.querySelector(".contactBox").style.display = 'none';
        document.querySelector(".thanksBox").style.display = 'block';
    }
}

function Reload() {
    location.reload();
}

function fnView(type, num) {
    document.getElementById('Answer' + type + '_' + num).style.display = 'block';
    document.getElementById('hide' + type + '_' + num).style.display = 'block';
}

function fnHide(type, num) {
    document.getElementById('Answer' + type + '_' + num).style.display = 'none';
    document.getElementById('hide' + type + '_' + num).style.display = 'none';
}