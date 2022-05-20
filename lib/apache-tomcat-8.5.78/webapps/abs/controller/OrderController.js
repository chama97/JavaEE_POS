$("#btnCustomerSearch2").click(function () {
    var searchCID = $("#InputCusId").val();
    $.ajax({
        url: "customer?option=SEARCH&searchCustomerID="+searchCID,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#InputCusId").val(res.data.id);
                $("#InputCusName").val(res.data.name);
                $("#InputCusAddress").val(res.data.address);
                $("#InputCusContact").val(res.data.salary);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
});


$("#btnItemSearch2").click(function () {
    var searchIID = $("#InputItemCode").val();
    $.ajax({
        url: "item?option=SEARCH&searchItemsID="+searchIID,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#InputItemCode").val(res.data.code);
                $("#InputItemType").val(res.data.type);
                $("#InputItemQtyHand").val(res.data.qty);
                $("#InputItemPrice").val(res.data.price);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });
});




/*let tempId = 001;
$("#btnCustomerSearch2").click(function () {
    var searchID = $("#InputCusId").val();
    var response = searchCustomer(searchID);
    if (response) {
        $("#InputCusId").val(response.getCustomerID());
        $("#InputCusName").val(response.getCustomerName());
        $("#InputCusAddress").val(response.getCustomerAddress());
        $("#InputCusContact").val(response.getCustomerContact());
    }else{
        clearAll();
        alert("No Such a Customer");
    }
    $("#btnAddTocart").attr('disabled', true);
    $("#orderId").val('O-00'+tempId);
   
});

$("#btnItemSearch2").click(function () {
    var searchID = $("#InputItemCode").val();
    var response = searchItem(searchID);
    if (response) {
        $("#InputItemCode").val(response.getItemCode());
        $("#InputItemType").val(response.getItemType());
        $("#InputItemQtyHand").val(response.getItemQty());
        $("#InputItemPrice").val(response.getItemPrice());
    }else{
        clearAllItem();
        alert("No Such a Item");
    }
    $("#btnAddTocart").attr('disabled', false);
});


$("#btnAddTocart").click(function () {
    saveOrder();
});


$("#btnClearOrder").click(function () {
  clearOrderDetails();
});


let tempTotal = 0;
function saveOrder() {
    let itemTotal = $("#InputItemPrice").val()*$("#InputItemQtySale").val();
    tempTotal+=itemTotal;
    let cartRow = `<tr><td>${$("#InputItemCode").val()}</td><td>${$("#InputItemType").val()}</td><td>${$("#InputItemQtySale").val()}</td><td>${$("#InputItemPrice").val()}</td><td>${itemTotal}</td></tr>`;
    $("#tblOrder").append(cartRow);
    $("#orderPrice").val(tempTotal+'/=');
    
    let qtyOnHand=$("#InputItemQtyHand").val()-$("#InputItemQtySale").val();
    $("#InputItemQtyHand").val(qtyOnHand);
    let qtyIndex=isItemExists($("#InputItemCode").val());
    if(qtyIndex!=-1){
        itemDB[qtyIndex].setItemQty(qtyOnHand);
        loadAllItems();
        return;
    }
}

let balance = 0;
function calculateBalance() {
    let discount = $("#orderDiscount").val();
    let profit = tempTotal*discount/100;
    balance = tempTotal-profit;
    $("#orderBalance").val(balance+'/=');
}

$("#orderDiscount").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
      calculateBalance();
    }
});


function generateOid (){
    tempId+=1;
    $("#orderId").val('O-00'+tempId);
}

$("#btnPlaceOrder").click(function () {
    if($("#orderId").val()!=''&&$("#InputCusId").val()!=''&&$("#orderDate").val()!=''&&$("#orderBalance").val()!=''){
        
        let orderId = $("#orderId").val();
        let custId = $("#InputCusId").val();
        let orderDate = $("#orderDate").val();
        let orderPrice = $("#orderBalance").val();
        if(isOrderExists(orderId)){
            alert("Order placed success");
            generateOid ();
            clearOrderDetail();
            return;
        }
        
        let o1=new Order(orderId,custId,orderDate,orderPrice);
        orderDB.push(o1);
        
        
    }
    else{
        alert("Please Insert Correct Data..");
        return;
    }
});


function clearOrderDetails() {
  $('#InputItemCode,#InputItemType,#InputItemQtySale,#InputItemPrice,#InputItemQtyHand').val("");
  $('#InputItemCode').focus();
  $("#btnAddTocart").attr('disabled', true);
}

function clearOrderDetail() {
    $('#InputItemCode,#InputItemType,#InputItemQtySale,#InputItemPrice,#InputItemQtyHand').val("");
    $('#orderId,#orderDiscount,#orderDate,#orderBalance,#orderPrice,#tblOrder').val("");
    $('#InputItemCode').focus();
    $("#btnAddTocart").attr('disabled', true);
  }

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == id) {
            return customerDB[i];
        }
    }
}

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() == id) {
            return itemDB[i];
        }
    }
}

function isOrderExists(id){
    let x=-1;
    for(let i=0;i<orderDB.length;i++){
        if(orderDB[i].getOrderId == id) {
            x = i;
        }
    }
    return x;
}

function isItemExists(id){
    let x=-1;
    for(let i=0;i<itemDB.length;i++){
        if(itemDB[i].getItemCode()==id) {
            x = i;
        }
    }
    return x;
}*/
