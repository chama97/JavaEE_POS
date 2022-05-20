function Order(code,type,qty,price,total) {
    var __orderId=oid;
    var __customerId=cid;
    var __orderDate=date;
    var __orderPrice=price;
    
    this.getOrderId=function () {
        return __orderId;
    }
    this.getCustomerId=function () {
        return __customerId;
    }
    this.getOrderDate=function () {
        return __orderDate;
    }
    this.getOrderPrice=function (){
        return  __orderPrice;
    }
    this.setOrderId=function (oid) {
        __orderId=oid;
    }
    this.setCustomerId=function (cid) {
        __customerId=cid;
    }
    this.setOrderDate=function (date) {
        __orderDate=date;
    }
    this.setOrderPrice=function (price){
        __orderPrice=price;
    }
}