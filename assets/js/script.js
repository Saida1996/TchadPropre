var selectedRow = null;

function onFormSubmit(){
    console.log(formData);
    if(validate()){
        var formData = readFormData();
        console.log(formData);
        if(selectedRow == null){
            insertNewRecord(formData);
        }else{
            updateRecord(formData);
        }
        
        resetForm();
    }
}
function readFormData(){

    var formData = {};
    formData["nom"] = document.getElementById("nom").value;
    formData["rue"] = document.getElementById("rue").value;
    formData["porte"] = document.getElementById("porte").value;
    formData["carte"] = document.getElementById("carte").value;
    return formData;
}
function insertNewRecord(data){
    var table = document.getElementById("emplist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell2 = newRow.insertCell(0);
    cell2.innerHTML = data.nom;

    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.rue;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.porte;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.carte;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a  onClick="onDelete(this)">Delete</a>`;
}

function resetForm(){
    document.getElementById('nom').value = '';
    document.getElementById('rue').value = '';
    document.getElementById('porte').value = '';
    document.getElementById('carte').value = '';
    selectedRow = null;
}
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('nom').value = selectedRow.cells[0].innerHTML;
    document.getElementById('rue').value = selectedRow.cells[1].innerHTML;
    document.getElementById('porte').value = selectedRow.cells[2].innerHTML;
    document.getElementById('carte').value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData){

    selectedRow.cells[0].innerHTML = formData.nom;
    selectedRow.cells[1].innerHTML = formData.rue;
    selectedRow.cells[2].innerHTML = formData.porte;
    selectedRow.cells[3].innerHTML = formData.carte;
}
function onDelete(td){
    if(confirm('vous êtes sûr de vouloir supprimer les données ?')){
        row = td.parentElement.parentElement;
        document.getElementById("emplist").deleteRow(row.rowIndex);
        resetForm();
    }
    
}
function validate(){
    isValid = true;
    if(document.getElementById('nom').value == ""){
        isValid = false;
        document.getElementById('nomValidationError').classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById('nomValidationError').classList.remove("hide")){
            document.getElementById('nomValidationError').classList.add("hide");
        } }

    if(document.getElementById('rue').value == ""){
            isValid = false;
            document.getElementById('rueValidationError').classList.remove("hide");
    }else{
            isValid = true;
            if(!document.getElementById('rueValidationError').classList.remove("hide")){
                document.getElementById('rueValidationError').classList.add("hide");
            }
    }

    if(document.getElementById('porte').value == ""){
            isValid = false;
            document.getElementById('porteValidationError').classList.remove("hide");
    }else{
            isValid = true;
            if(!document.getElementById('porteValidationError').classList.remove("hide")){
            document.getElementById('porteValidationError').classList.add("hide");
        }
    }

    if(document.getElementById('carte').value == ""){
            isValid = false;
            document.getElementById('carteValidationError').classList.remove("hide");
    }else{
            isValid = true;
            if(!document.getElementById('carteValidationError').classList.remove("hide")){
            document.getElementById('carteValidationError').classList.add("hide");
        }
    return isValid;}
    }
