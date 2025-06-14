function getValue(number){
    var input = document.getElementById("input");
    input.value += number;
}

function equalTo(){
    var input = document.getElementById("input");
    var result = eval(input.value);
    input.value = result;
}

function equalTo() {
    var input = document.getElementById("input");
    try {
        var jawab = eval(input.value);
    }
    catch (error) {
        var jawab = "Syntax Error"
    }
    input.value = jawab;
}

function clearValue(){
    var input = document.getElementById("input");
    var editValue = input.value.slice(0 , -1);
    input.value = editValue;
}

function allClear() {
    var input = document.getElementById("input");
    input.value = "";
}

document.addEventListener('keydown', (e) => {
    var key = e.key;
    if ('1234567890+-*%/'.includes(key)) {
        getValue(key);
    }
    else if ('Backspace'.includes(key)) {
        clearValue();
    }
    else if ('Enter ='.includes(key)) {
        equalTo();
    }
    else if ('Delete c'.includes(key)) {
        allClear();
    }
    else if ('Space'.includes(key)) {

    }
}
)
