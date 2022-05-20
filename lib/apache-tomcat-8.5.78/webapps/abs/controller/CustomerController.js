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

$("#btnCustomerSearch").click(function () {
    var searchID = $("#txtCustomerSearch").val();
    $.ajax({
        url: "customer?option=SEARCH&searchCustomerID="+searchID,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#cusID").val(res.data.id);
                $("#cusName").val(res.data.name);
                $("#cusAddress").val(res.data.address);
                $("#cusSalary").val(res.data.salary);
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

    $('#cusID,#cusName,#cusAddress,#cusSalary').on('keydown', function (eventOb) {
        if (eventOb.key == "Tab") {
            eventOb.preventDefault(); 
        }
    });

    $('#cusID,#cusName,#cusAddress,#cusSalary').on('blur', function () {
        formValid();
    });

    $("#cusID").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }

        if (eventOb.key == "Control") {
            var typedCustomerID = $("#cusID").val();
            var srcCustomer = searchCustomerFromID(typedCustomerID);
            $("#cusID").val(srcCustomer.getCustomerID());
            $("#cusName").val(srcCustomer.getCustomerName());
            $("#cusAddress").val(srcCustomer.getCustomerAddress());
            $("#cusSalary").val(srcCustomer.getCustomerContact());
        }
    });

    $("#cusName").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#cusAddress").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });

    $("#cusSalary").on('keyup', function (eventOb) {
        setButton();
        if (eventOb.key == "Enter") {
            checkIfValid();
        }
    });
  
    $("#btnCustadd").attr('disabled', true);
  
    function clearAll() {  
        $('#cusID,#cusName,#cusAddress,#cusSalary').val("");
        $('#cusID,#cusName,#cusAddress,#cusSalary').css('border', '3px solid #ced4da');
        $('#cusID').focus();
        $("#btnCustadd").attr('disabled', true);
        loadAllCustomers();
        $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
    }
  
    function formValid() {
        var cusID = $("#cusID").val();
        $("#cusID").css('border', '3px solid green');
        $("#lblcusid").text("");
        if (cusIDRegEx.test(cusID)) {
            var cusName = $("#cusID").val();
            if (cusNameRegEx.test(cusName)) {
                $("#cusName").css('border', '3px solid green');
                $("#lblcusname").text("");
                var cusAddress = $("#cusAddress").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    var cusContact = $("#cusSalary").val();
                    var resp = cusContactRegEx.test(cusContact);
                    $("#cusAddress").css('border', '3px solid green');
                    $("#lblcusaddress").text("");
                    if (resp) {
                        $("#cusSalary").css('border', '3px solid green');
                        $("#lblcussalary").text("");
                        return true;
                    } else {
                        $("#cusSalary").css('border', '3px solid red');
                        $("#lblcussalary").text("Customer contact is a required field : Pattern 0110000000");
                        return false;
                    }
                } else {
                    $("#cusAddress").css('border', '3px solid red');
                    $("#lblcusaddress").text("Customer address is a required field : Mimum 6");
                    return false;
                }
            } else {
                $("#cusName").css('border', '3px solid red');
                $("#lblcusname").text("Customer name is a required field : Mimimum 3, Max 20");
                return false;
            }
        } else {
            $("#cusID").css('border', '3px solid red');
            $("#lblcusid").text("Cus ID is a required field : Pattern C-000");
            return false;
        }
    }
  
    function checkIfValid() {
        var cusID = $("#cusID").val();
        if (cusIDRegEx.test(cusID)) {
            $("#cusName").focus();
            var cusName = $("#cusName").val();
            if (cusNameRegEx.test(cusName)) {
                $("#cusAddress").focus();
                var cusAddress = $("#cusAddress").val();
                if (cusAddressRegEx.test(cusAddress)) {
                    $("#cusSalary").focus();
                    var cusContact = $("#cusSalary").val();
                    var resp = cusContactRegEx.test(cusContact);
                    if (resp) {
                        let res = confirm("Do you really need to add this Customer..?");
                        if (res) {
                            saveCustomer();
                            clearAll();
                        }
                    } else {
                        $("#cusSalary").focus();
                    }
                } else {
                    $("#cusAddress").focus();
                }
            } else {
                $("#cusName").focus();
            }
        } else {
            $("#cusID").focus();
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


