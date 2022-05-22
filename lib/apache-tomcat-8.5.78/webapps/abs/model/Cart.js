function CartTM(code,type,qty,price,total) {
    var __itemCode=code;
    var __itemType=type;
    var __itemQty=qty;
    var __itemPrice=price;
    var __totalPrice=total;

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
        return __itemPrice;
    }
    this.getTotalPrice=function (){
        return __totalPrice;
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
    this.setTotalPrice=function (total){
        __totalPrice=total;
    }
}



/*
function CartDTO(id,name,price,qty,total) {
    this.id=id;
    this.name=name;
    this.price=price;
    this.qty=qty;
    this.total=total;
}*/
