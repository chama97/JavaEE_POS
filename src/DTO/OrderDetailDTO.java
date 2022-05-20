package DTO;

public class OrderDetailDTO {
    private String itemCode;
    private String itemType;
    private String itemPrice;
    private int itemQty;
    private double total;

    public OrderDetailDTO() {
    }

    public OrderDetailDTO(String itemCode, String itemType, String itemPrice, int itemQty, double total) {
        this.setItemCode(itemCode);
        this.setItemType(itemType);
        this.setItemPrice(itemPrice);
        this.setItemQty(itemQty);
        this.setTotal(total);
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(String itemPrice) {
        this.itemPrice = itemPrice;
    }

    public int getItemQty() {
        return itemQty;
    }

    public void setItemQty(int itemQty) {
        this.itemQty = itemQty;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
