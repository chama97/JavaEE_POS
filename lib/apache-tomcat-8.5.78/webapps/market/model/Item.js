function Item(code,type,qty,price) {
    var __itemCode=code;
    var __itemType=type;
    var __itemQty=qty;
    var __itemPrice=price;
    
    this.getItemCode=function () {
        return __itemCode;
    }
    this.getItemType=function () {
        return __itemType;
    }
    this.getItemQty=function () {
        return __itemQty;
    }
    this.getItemPrice=function (){
        return  __itemPrice;
    }
    this.setItemCode=function (code) {
        __itemCode=code;
    }
    this.setItemType=function (type) {
        __itemType=type;
    }
    this.setItemQty=function (qty) {
        __itemQty=qty;
    }
    this.setItemPrice=function (price){
        __itemPrice=price;
    }
}