import DTO.OrderDetailDTO;

import javax.annotation.Resource;
import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/order")
public class OrderServ extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    DataSource ds;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();

        String orderId = jsonObject.getString("orderId");
        String customerId = jsonObject.getString("customerId");
        String date = jsonObject.getString("oderDate");
        System.out.println(date);
        String cost = jsonObject.getString("orderCost");

        JsonArray cartDb = jsonObject.getJsonArray("cartDb");
        PrintWriter writer = resp.getWriter();
        ArrayList<OrderDetailDTO> OrderDTO = new ArrayList<OrderDetailDTO>();

        for (JsonValue cart : cartDb) {
            OrderDTO.add(new OrderDetailDTO(cart.asJsonObject().getString("itemCode"), cart.asJsonObject().getString("itemType"),
                    cart.asJsonObject().getString("itemPrice"), cart.asJsonObject().getInt("itemQty"),
                    cart.asJsonObject().getInt("total")));
        }

        resp.setContentType("application/json");
        Connection connection=null;
        try {
            connection=ds.getConnection();
            connection.setAutoCommit(false);

            PreparedStatement pstm = connection.prepareStatement("Insert into Orders values(?,?,?,?)");
            pstm.setObject(1, orderId);
            pstm.setObject(2, customerId);
            pstm.setObject(3, date);
            pstm.setObject(4, cost);

            if (pstm.executeUpdate() > 0) {

                if (saveOrderDetail(connection,OrderDTO)) {
                    connection.commit();
                    connection.setAutoCommit(true);

                    JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                    objectBuilder.add("status", 200);
                    objectBuilder.add("data", "");
                    objectBuilder.add("message", "Successfully Order Add");
                    writer.print(objectBuilder.build());

                } else {
                    connection.rollback();
                }
            } else {
                connection.rollback();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private boolean saveOrderDetail(Connection connection, ArrayList<OrderDetailDTO> orderDTO) throws SQLException, ClassNotFoundException {
        for (OrderDetailDTO temp : orderDTO) {

            PreparedStatement stm = connection.prepareStatement("Insert into OrderDetail values(?,?,?,?,?)");
            stm.setObject(1, temp.getItemCode());
            stm.setObject(2, temp.getItemType());
            stm.setObject(3, temp.getItemPrice());
            stm.setObject(4, temp.getItemQty());
            stm.setObject(5, temp.getTotal());
            if (stm.executeUpdate() > 0) {

                if (updateQty(connection,temp.getItemCode(), temp.getItemQty())){

                }else{
                    return false;
                }

            } else {
                return false;
            }
        }
        return true;
    }

    public boolean updateQty(Connection connection,String itemCode, int itemQty) throws ClassNotFoundException, SQLException {
        PreparedStatement stm = connection.prepareStatement
                ("UPDATE Item SET qty=(qty-" + itemQty + ") WHERE code='" + itemCode + "'");
        return stm.executeUpdate()>0;
    }



    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection connection=null;
        try {
            String option = req.getParameter("option");
            resp.setContentType("application/json");
            connection=ds.getConnection();
            PrintWriter writer = resp.getWriter();

            switch (option) {
                case "SEARCH":
                    PreparedStatement pstm = connection.prepareStatement("select * from Customer where id=?");
                    String customerID = req.getParameter("searchCustomerID3");
                    pstm.setObject(1, customerID);
                    ResultSet rst1 = pstm.executeQuery();
                    JsonObjectBuilder objectBuilder1 = Json.createObjectBuilder();

                    if(rst1.next()){
                        String id = rst1.getString(1);
                        String name = rst1.getString(2);
                        String address = rst1.getString(3);
                        double salary = rst1.getDouble(4);

                        objectBuilder1.add("id", id);
                        objectBuilder1.add("name", name);
                        objectBuilder1.add("address", address);
                        objectBuilder1.add("salary", salary);
                    }
                    JsonObjectBuilder response1 = Json.createObjectBuilder();
                    response1.add("status", 200);
                    response1.add("message", "Done");
                    response1.add("data", objectBuilder1.build());
                    writer.print(response1.build());
                    break;

                case "SEARCHITEM":
                    PreparedStatement pstm1 = connection.prepareStatement("select * from Item where code=?");
                    String itemID = req.getParameter("searchItemID2");
                    pstm1.setObject(1, itemID);
                    ResultSet rst3 = pstm1.executeQuery();
                    JsonObjectBuilder objectBuilder2 = Json.createObjectBuilder();

                    if(rst3.next()){
                        String code = rst3.getString(1);
                        String type = rst3.getString(2);
                        int qty = rst3.getInt(3);
                        double price = rst3.getDouble(4);

                        objectBuilder2.add("code", code);
                        objectBuilder2.add("type", type);
                        objectBuilder2.add("qty", qty);
                        objectBuilder2.add("price", price);
                    }
                    JsonObjectBuilder response2 = Json.createObjectBuilder();
                    response2.add("status", 200);
                    response2.add("message", "Done");
                    response2.add("data", objectBuilder2.build());
                    writer.print(response2.build());
                    break;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
