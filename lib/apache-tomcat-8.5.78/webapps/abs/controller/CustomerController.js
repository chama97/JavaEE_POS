$("#btnGetAllCustomers").click(function () {
    loadAllCustomers();
});

$("#btnSaveCustomer").click(function () {
    var data = $("#customerForm").serialize(); // return query string of form with name:type-value
    $.ajax({
        url: "customer",
        method: "POST",
        data: data,// if we send data with the request
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


$("#btnDeleteCustomer").click(function () {

    let customerID = $("#cusID").val();
    $.ajax({
        url: "customer?CusID=" + customerID,// viya query string
        method: "DELETE",
        //data:data,// application/x-www-form-urlencoded
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
        id: $("#cusID").val(),
        name: $("#cusName").val(),
        address: $("#cusAddress").val(),
        salary: $("#cusSalary").val()
    }
    $.ajax({
        url: "customer",
        method: "PUT",
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
    $("#tblCustomerJson").empty();
    $.ajax({
        url: "customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#tblCustomerJson").append(row);
            }
            bindClickEvents();
        }
    });
}

function bindClickEvents() {
    $("#tblCustomerJson>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#cusID").val(id);
        $("#cusName").val(name);
        $("#cusAddress").val(address);
        $("#cusSalary").val(salary);
    });
}



/////Validation/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


