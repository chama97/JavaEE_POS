
$("#btnGetAllCustomers").click(function () {
    loadAllCustomers();
});


$("#btnCustadd").click(function () {
    var data = $("#customerForm").serialize();
    $.ajax({
        url: "customer",
        method: "POST",
        data: data,
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
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


$("#btnCusDelete").click(function () {

    let customerID = $("#txtSearchCusID").val();

    $.ajax({
        url: "customer?CusID=" + customerID,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, status, t) {
            console.log(ob);
            console.log(status);
            console.log(t);
        }
    });
});


$("#btnUpdateCustomer").click(function () {

    var cusOb = {
        id: $("#txtCustomerId2").val(),
        name: $("#txtCustomerName2").val(),
        address: $("#txtCustomerAddress2").val(),
        contact: $("#txtCustomerContact2").val()
    }
    $.ajax({
        url: "customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else if (res.status == 400) {
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, errorStus) {
            console.log(ob);
        }
    });
});


loadAllCustomers();

function loadAllCustomers() {
    $("#cstTable").empty();
    $.ajax({
        url: "customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("cstTable").append(row);
            }
            bindClickEvents();
        }
    });
}

function bindClickEvents() {
    $("#cstTable>tr").click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        $("#cusID").val(id);
        $("#cusName").val(name);
        $("#cusAddress").val(address);
        $("#cusSalary").val(contact);
    });
}




// $("#btnCustadd").click(function () {
//     saveCustomer();
//     loadAllCustomers();
// });
//
// $("#btnCustUpdate").click(function () {
//     updateCustomer();
//     loadAllCustomers();
//     clearAll();
// });
//
// $("#btnUpdateCustomer").click(function () {
//     var searchID = $("#txtSearchCusID").val();
//     var response = searchCustomer(searchID);
//     if (response) {
//         $("#txtCustomerId2").val(response.getCustomerID());
//         $("#txtCustomerName2").val(response.getCustomerName());
//         $("#txtCustomerAddress2").val(response.getCustomerAddress());
//         $("#txtCustomerContact2").val(response.getCustomerContact());
//     }else{
//         clearAll();
//         alert("No Such a Customer");
//     }
// });
//
// $("#btnCustClear").click(function () {
//     clearAll();
// });
//
// $("#btnCustomerSearch").click(function () {
//     var searchID = $("#txtSearchCusID").val();
//     var response = searchCustomer(searchID);
//     if (response) {
//         $("#txtCustomerId").val(response.getCustomerID());
//         $("#txtCustomerName").val(response.getCustomerName());
//         $("#txtCustomerAddress").val(response.getCustomerAddress());
//         $("#txtCustomerContact").val(response.getCustomerContact());
//     }else{
//         clearAll();
//         alert("No Such a Customer");
//     }
// });
//
//
// $("#btnCusDelete").click(function () {
//    let customerID=$("#txtSearchCusID").val();
//    let index=searchCustomer(customerID);
//    if(index!=-1){
//       customerDB.splice(index,1);
//       loadAllCustomers();
//       alert("Customer "+customerID+" Deleted");
//       return;
//    }
//    alert("No Customer Found");
// });
//
//
// function loadAllCustomers() {
//     $("#cstTable").empty();
//     for (var i of customerDB) {
//         let row = `<tr><td>${i.getCustomerID()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerContact()}</td></tr>`;
//         $("#cstTable").append(row);
//     }
// }
//
// function saveCustomer() {
//     let customerID = $("#txtCustomerId").val();
//     let customerName = $("#txtCustomerName").val();
//     let customerAddress = $("#txtCustomerAddress").val();
//     let customerContact = $("#txtCustomerContact").val();
//
//     let index=isExists(customerID);
//     if(index!=-1){
//         alert("The Customer ID Already Exists. Please Enter Another ID");
//     }else{
//         let c1=new Customer(customerID,customerName,customerAddress,customerContact);
//         customerDB.push(c1);
//         clearAll();
//     }
// }
//
// function updateCustomer(){
//     let customerID = $("#txtCustomerId2").val();
//     let customerName = $("#txtCustomerName2").val();
//     let customerAddress = $("#txtCustomerAddress2").val();
//     let customerContact = $("#txtCustomerContact2").val();
//
//     let index=isExists(customerID);
//     if(index!=-1){
//         alert("Customer Updated");
//         customerDB[index].setCustomerName(customerName);
//         customerDB[index].setCustomerAddress(customerAddress);
//         customerDB[index].setCustomerContact(customerContact);
//         loadAllCustomers()
//         return;
//     }
//     let c1=new Customer(customerID,customerName,customerAddress,customerContact);
//     customerDB.push(c1);
// }
//
// function isExists(id){
//     let x=-1;
//     for(let i=0;i<customerDB.length;i++){
//         if(customerDB[i].getCustomerID() == id) {
//             x = i;
//         }
//     }
//     return x;
// }
//
// function searchCustomer(id) {
//     for (let i = 0; i < customerDB.length; i++) {
//         if (customerDB[i].getCustomerID() == id) {
//             return customerDB[i];
//         }
//     }
// }

//Validation/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const cusIDRegEx = /^(C-)[0-9]{1,3}$/;
    const cusNameRegEx = /^[A-z ]{3,20}$/;
    const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
    const cusContactRegEx = /^[0-9]{3}[-]?[0-9]{7}$/;

    $('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('keydown', function (eventOb) {
        if (eventOb.key == "Tab") {
            eventOb.preventDefault(); 
        }
    });

    $('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('blur', function () {
        formValid();
    });

    $("#txtCustomerId").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }

        if (eventOb.key == "Control") {
            var typedCustomerID = $("#txtCustomerId").val();
            var srcCustomer = searchCustomerFromID(typedCustomerID);
            $("#txtCustomerId").val(srcCustomer.getCustomerID());
            $("#txtCustomerName").val(srcCustomer.getCustomerName());
            $("#txtCustomerAddress").val(srcCustomer.getCustomerAddress());
            $("#txtCustomerContact").val(srcCustomer.getCustomerContact());
        }
    });

    $("#txtCustomerName").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#txtCustomerAddress").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#txtCustomerContact").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });
  
    $("#btnCustadd").attr('disabled', true);
  
    function clearAll() {  
        $('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').val("");
        $('#txCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').css('border', '3px solid #ced4da');
        $('#txtCustomerId').focus();
        $("#btnCustadd").attr('disabled', true);
        loadAllCustomers();
        $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
    }
  
    function formValid() {
        var cusID = $("#txtCustomerId").val();
        $("#txtCustomerId").css('border', '3px solid green');
        $("#lblcusid").text("");
        if (cusIDRegEx.test(cusID)) {
            var cusName = $("#txtCustomerName").val();
            if (cusNameRegEx.test(cusName)) {
                $("#txtCustomerName").css('border', '3px solid green');
                $("#lblcusname").text("");
                var cusAddress = $("#txtCustomerAddress").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    var cusContact = $("#txtCustomerContact").val();
                    var resp = cusContactRegEx.test(cusContact);
                    $("#txtCustomerAddress").css('border', '3px solid green');
                    $("#lblcusaddress").text("");
                    if (resp) {
                        $("#txtCustomerContact").css('border', '3px solid green');
                        $("#lblcussalary").text("");
                        return true;
                    } else {
                        $("#txtCustomerContact").css('border', '3px solid red');
                        $("#lblcussalary").text("Customer contact is a required field : Pattern 0110000000");
                        return false;
                    }
                } else {
                    $("#txtCustomerAddress").css('border', '3px solid red');
                    $("#lblcusaddress").text("Customer address is a required field : Mimum 6");
                    return false;
                }
            } else {
                $("#txtCustomerName").css('border', '3px solid red');
                $("#lblcusname").text("Customer name is a required field : Mimimum 3, Max 20");
                return false;
            }
        } else {
            $("#txtCustomerId").css('border', '3px solid red');
            $("#lblcusid").text("Cus ID is a required field : Pattern C-000");
            return false;
        }
    }
  
    function checkIfValid() {
        var cusID = $("#txtCustomerId").val();
        if (cusIDRegEx.test(cusID)) {
            $("#txtCustomerName").focus();
            var cusName = $("#txtCustomerName").val();
            if (cusNameRegEx.test(cusName)) {
                $("#txtCustomerAddress").focus();
                var cusAddress = $("#txtCustomerAddress").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    $("#txtCustomerContact").focus();
                    var cusContact = $("#txtCustomerContact").val();
                    var resp = cusContactRegEx.test(cusContact);
                    if (resp) {
                        let res = confirm("Do you really need to add this Customer..?");
                        if (res) {
                            saveCustomer();
                            clearAll();
                        }
                    } else {
                        $("#txtCustomerContact").focus();
                    }
                } else {
                    $("#txtCustomerAddress").focus();
                }
            } else {
                $("#txtCustomerName").focus();
            }
        } else {
            $("#txtCustomerId").focus();
        }
    }

    function setButton() {
        let b = formValid();
        if (b) {
            $("#btnCustadd").attr('disabled', false);
        } else {
            $("#btnCustadd").attr('disabled', true);
        }
    }

    $('#btnCustadd').click(function () {
        checkIfValid();
    });


