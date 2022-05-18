
$("#btnItemAdd").click(function () {
    saveItem();
    loadAllItems();
});

$("#btnItemClear").click(function () {  
    clearAllItem();
});

$("#btnItemSearch").click(function () {
    var searchID = $("#txtItemSearch").val();
    var response = searchItem(searchID);
    if (response) {
        $("#txtItemId").val(response.getItemCode());
        $("#txtItemName").val(response.getItemType());
        $("#txtItemQty").val(response.getItemQty());
        $("#txtItemPrice").val(response.getItemPrice());
    }else{
        clearAllItem();
        alert("No Such a Item");
    }
});


$("#btnItemUpdate").click(function () {
    updateItem();
    loadAllItems();
    clearAllItem();
});

$("#btnUpdateItem").click(function () {  
    var searchID = $("#txtItemSearch").val();
    var response = searchItem(searchID);
    if (response) {
        $("#txtItemId2").val(response.getItemCode());
        $("#txtItemName2").val(response.getItemType());
        $("#txtItemQty2").val(response.getItemQty());
        $("#txtItemPrice2").val(response.getItemPrice());
    }else{
        clearAllItem();
        alert("No Such a Item");
    }
});


$("#btnItemDelete").click(function () {
    let itemCode=$("#txtItemSearch").val();
    let index=searchItem(itemCode);
    if(index!=-1){
        itemDB.splice(index,1);
        loadAllItems();
        alert("Item "+itemCode+" Deleted");
        return;
    }
    alert("No Item Found");
});


function loadAllItems() {
    $("#tblItem").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemType()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td></tr>`;
        $("#tblItem").append(row);
    }
}

function saveItem() {
  let itemID = $("#txtItemId").val();
  let itemName = $("#txtItemName").val();
  let itemQty = $("#txtItemQty").val();
  let itemPrice = $("#txtItemPrice").val();

  let index=isItemExists(itemID);
    if(index!=-1){
        alert("The Item ID Already Exists. Please Enter Another ID");
    }else{
        let i1=new Item(itemID,itemName,itemQty,itemPrice);
        itemDB.push(i1);
        clearAllItem();
    }
}

function updateItem(){
    let itemID = $("#txtItemId2").val();
    let itemName = $("#txtItemName2").val();
    let itemQty = $("#txtItemQty2").val();
    let itemPrice = $("#txtItemPrice2").val();
    let index=isItemExists(itemID);
    if(index!=-1){
        alert("Item Updated");
        itemDB[index].setItemType(itemName);
        itemDB[index].setItemQty(itemQty);
        itemDB[index].setItemPrice(itemPrice);
        loadAllItems()
        return;
    }
    let i1=new Item(itemID,itemName,itemQty,itemPrice);
    itemDB.push(i1);
}

function isItemExists(id){
    let x=-1;
    for(let i=0;i<itemDB.length;i++){
        if(itemDB[i].getItemCode()==id) {
            x = i;
        }
    }
    return x;
}

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() == id) {
            return itemDB[i];
        }
    }
}

//Validation//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const itemIDRegEx = /^(I-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{4,20}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); 
    }
});

$('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').on('blur', function () {
    ItemformValid();
});

$("#txtItemId").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtItemId").val();
        var srcItem = searchItemFromID(typedItemID);
        $("#txtItemId").val(srcItem.getItemID());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtItemQty").val(srcItem.getItemQty());
        $("#txtItemPrice").val(srcItem.getItemPrice());
    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
      checkIfValidItem()
    }
});

$("#txtItemQty").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
      checkIfValidItem()
    }
});

$("#txtItemPrice").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
      checkIfValidItem()
    }
});

$("#btnItemadd").attr('disabled', true);

function clearAllItem() {
    $('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').val("");
    $('#txtItemId,#txtItemName,#txtItemQty,#txtItemPrice').css('border', '2px solid #ced4da');
    $('#txtItemId').focus();
    $("#btnItemadd").attr('disabled', true);
    loadAllItems();
    $("#lblitemid,#lblitemname,#lblitemqty,#lblitemprice").text("");
}

function ItemformValid() {
    var itemID = $("#txtItemId").val();
    $("#txtItemId").css('border', '3px solid green');
    $("#lblitemid").text("");
    if (itemIDRegEx.test(itemID)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '3px solid green');
            $("#lblitemname").text("");
            var itemQty = $("#txtItemQty").val();
            if (itemQtyRegEx.test(itemQty)) {
                var itemPrice = $("#txtItemPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                $("#txtItemQty").css('border', '3px solid green');
                $("#lblitemqty").text("");
                if (resp) {
                    $("#txtItemPrice").css('border', '3px solid green');
                    $("#lblitemprice").text("");
                    return true;
                } else {
                    $("#txtItemPrice").css('border', '3px solid red');
                    $("#lblitemprice").text("item Price is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtItemQty").css('border', '3px solid red');
                $("#lblitemqty").text("Item Qty is a required field :1");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '3px solid red');
            $("#lblitemname").text("Item Name is a required field : Mimimum 4, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemId").css('border', '3px solid red');
        $("#lblitemid").text("Item ID is a required field : Pattern I-000");
        return false;
    }
}

function checkIfValidItem() {
    var itemID = $("#txtItemId").val();
    if (itemIDRegEx.test(itemID)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemQty").focus();
            var itemQty = $("#txtItemQty").val();
            if (itemQtyRegEx.test(itemQty)) {
                $("#txtItemPrice").focus();
                var itemPrice = $("#txtItemPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAllItem();
                    }
                } else {
                    $("#txtItemPrice").focus();
                }
            } else {
                $("#txtItemQty").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemId").focus();
    }
}

function setItemButton() {
    let b = ItemformValid();
    if (b) {
        $("#btnItemAdd").attr('disabled', false);
    } else {
        $("#btnItemAdd").attr('disabled', true);
    }
}

$('#btnItemAdd').click(function () {
    checkIfValidItem();
});


