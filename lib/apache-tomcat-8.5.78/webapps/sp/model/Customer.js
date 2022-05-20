function Customer(id,name,address,contact) {
    var __custId=id;
    var __custName=name;
    var __custAddress=address;
    var __custContact=contact;
    
    this.getCustomerID=function () {
        return __custId;
    }
    this.getCustomerName=function () {
        return __custName;
    }
    this.getCustomerAddress=function () {
        return __custAddress;
    }
    this.getCustomerContact=function (){
        return __custContact;
    }
    this.setCustomerID=function (id) {
         __custId=id;
    }
    this.setCustomerName=function (name) {
         __custName=name;
    }
    this.setCustomerAddress=function (address) {
         __custAddress=address;
    }
    this.setCustomerContact=function (contact){
         __custContact=contact;
    }
}