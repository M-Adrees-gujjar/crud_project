let arr = [];

var old_input1;
var old_input2;
var text;

window.onload = function () {
    let get_item = localStorage.getItem('Form');
    let get_parse = JSON.parse(get_item);
    if (get_parse != null) {
        arr = get_parse;
        run();
    }
}

function remove_all() {
    localStorage.clear();
    tbdy.innerHTML = "";
    arr = [];
}

function run() {
    let get_item = localStorage.getItem('Form');

    let get_parse = JSON.parse(get_item);

    tbdy.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {

        let value = get_parse[i];

        let first_value = value['first_val']
        let second_value = value['second_val']

        tbdy.innerHTML += `
            <tr id = "second_row" >
                <td id="data_one" class="data">${first_value}</td>
                <td id="data_two" class="data">${second_value}</td>
                <td class="button_row">
                    <div class="button_box">
                        <button type="button" onclick="edit(this)" data-toggle="modal" data-target="#exampleModalCenter">
                        <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button type="button" onclick="remove_itm(this)">
                        <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </ > `
    }
}

let tbdy = document.getElementById('second_body');

function clone() {

    let one_input = document.getElementById('first').value;
    let two_input = document.getElementById('second').value;

    if (one_input == '' || two_input == '') {
        alert('Enter all values');
    } else {
        let get_item = localStorage.getItem('Form');
        let get_parse = JSON.parse(get_item);

        for (let i = 0; i < arr.length; i++) {
            console.log(get_parse[i]['first_val']);
            console.log(get_parse[i]['second_val']);
            if (old_input1 == get_parse[i]['first_val'] || old_input2 == get_parse[i]['second_val']) {
                let one_input = document.getElementById('first');
                let two_input = document.getElementById('second');
                text.children[0].innerHTML = one_input.value;
                text.children[1].innerHTML = two_input.value;
                get_parse[i]['first_val'] = one_input.value;
                get_parse[i]['second_val'] = two_input.value;
                localStorage.setItem('Form', JSON.stringify(get_parse));
                document.getElementById('first').value = '';
                document.getElementById('second').value = '';
                return;
            }
        }

        let val = {
            first_val: one_input,
            second_val: two_input
        };

        let add_obj = arr.push(val);

        localStorage.setItem('Form', JSON.stringify(arr));

        document.getElementById('first').value = '';
        document.getElementById('second').value = '';

        run();
    }
}

function edit(element) {

    let one_input = document.getElementById('first');
    let two_input = document.getElementById('second');

    text = element.parentElement.parentElement.parentElement;

    one_input.value = text.children[0].innerHTML;
    two_input.value = text.children[1].innerHTML;

    old_input1 = one_input.value;
    old_input2 = two_input.value;

}

function remove_itm(element) {
    let text = element.parentElement.parentElement.parentElement;
    let val = text.children[0].innerText;

    console.log(val);

    let get_item = localStorage.getItem('Form');

    let get_parse = JSON.parse(get_item);

    for (let i = 0; i < get_parse.length; i++) {
        if (get_parse[i]['first_val'] == val) {
            let gt = get_parse.splice(i, 1);
            localStorage.setItem('Form', JSON.stringify(get_parse));
        }
    }

    if (get_parse.length == 0) {
        localStorage.removeItem('Form');
        arr = [];
        run();
    } else {
        run();
    }
}

function finish() {
    document.getElementById('first').value = '';
    document.getElementById('second').value = '';
}
