function load_new_tab(){
    chrome.storage.local.get("local_bank", function(local_bank_wrapper) {
        let num_words_learned = Object.keys(local_bank_wrapper.local_bank).length;
        document.getElementById("num-words-learned").innerHTML = num_words_learned;    
        console.log("NUMBER OF WORDS LEARNED");
        console.log(num_words_learned);
     });
}

function create_translation_tables(){
    chrome.storage.local.get({"local_bank": {}}, function(local_bank_wrapper){
        let num_rows = [0, 0, 0]; // contains # of rows to create for each bucket

        let translations_body = document.getElementById("translations_body");
        let table_array = [document.createElement("TABLE"), document.createElement("TABLE"), document.createElement("TABLE")];
        table_array[0].id = "inactive_words";
        table_array[1].id = "active_words";
        table_array[2].id = "learned_words";
        let tbody_array = [document.createElement('TBODY'), document.createElement('TBODY'), document.createElement('TBODY')];

        for (const [key, value] of Object.entries(local_bank_wrapper.local_bank)){
            let tr = document.createElement('TR');
            tr.id = "row_" + key;  //row_english
            td_array = [];
            if (value.bucket === 1 || value.bucket === 2){
                let td_left_arrow = document.createElement('TD');
                td_left_arrow.innerText="<";
                td_left_arrow.onclick = function(){
                    arrowHandler(tr, value.bucket-1);
                }
                td_array.push(td_left_arrow);
            }
            let td_key = document.createElement('TD');
            td_key.innerText=key;
            td_array.push(td_key);
            let td_value = document.createElement('TD');
            td_value.innerText=value.trans;
            td_array.push(td_value);
            if (value.bucket === 0 || value.bucket === 1){
                let td_right_arrow = document.createElement('TD');
                td_right_arrow.innerText=">";
                td_right_arrow.onclick = function(){
                    arrowHandler(tr, value.bucket+1);
                }
                td_array.push(td_right_arrow);
            }
            for (let td of td_array){
                tr.appendChild(td);
            } 
            tbody_array[value.bucket].appendChild(tr);
            num_rows[value.bucket]++;
        }
        for (let i=0; i<=2; i++){
            table_array[i].appendChild(tbody_array[i]);
            translations_body.appendChild(table_array[i]);
        }
        console.log("num_rows: " + num_rows);
    })
}

function arrowHandler(rowDiv, destination){
    console.log("AHAH")
    key = rowDiv.id.split("row_")[1];
    console.log(key);
    bucket_move(key, destination);
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//JS for drop down on click
document.addEventListener('DOMContentLoaded', function() {
    let link = document.getElementById('dropdownID');
    link.addEventListener('click', function() {
        dropdownFunction();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let languageSelection = document.getElementsByClassName('dropdown-language');

    for(let i = 0; i < languageSelection.length; i++) {
        languageSelection[i].addEventListener("click", function() {
            console.log("Clicked index: " + languageSelection[i].id);
            let selectedLanguage = languageSelection[i].innerHTML;
            document.getElementById("dropdownID").innerHTML = selectedLanguage;
        });
    };
});

load_new_tab();
create_translation_tables();
console.log("newtab.js loaded");