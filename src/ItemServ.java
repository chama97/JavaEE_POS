import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(urlPatterns = "/item")
public class ItemServ extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String option = req.getParameter("option");
            //The Media Type of the Content of the response
            resp.setContentType("application/json");
            //Initialize the connection
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");
            PrintWriter writer = resp.getWriter();

            switch (option) {
                case "SEARCH":

                    PreparedStatement pstm = connection.prepareStatement("select * from Item where code=?");
                    String customerID = req.getParameter("searchItemID");
                    pstm.setObject(1, customerID);
                    ResultSet rst1 = pstm.executeQuery();
                    JsonObjectBuilder objectBuilder1 = Json.createObjectBuilder();

                    if(rst1.next()){
                        String code = rst1.getString(1);
                        String type = rst1.getString(2);
                        int qty = rst1.getInt(3);
                        double price = rst1.getDouble(4);

                        objectBuilder1.add("code", code);
                        objectBuilder1.add("type", type);
                        objectBuilder1.add("qty", qty);
                        objectBuilder1.add("price", price);
                    }
                    JsonObjectBuilder response1 = Json.createObjectBuilder();
                    response1.add("status", 200);
                    response1.add("message", "Done");
                    response1.add("data", objectBuilder1.build());
                    writer.print(response1.build());
                    break;

                case "GETALL":
                    ResultSet rst = connection.prepareStatement("select * from Item").executeQuery();

                    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(); // json array

                    // Access the records and generate a json object
                    while (rst.next()) {
                        String code = rst.getString(1);
                        String type = rst.getString(2);
                        int qty = rst.getInt(3);
                        double price = rst.getDouble(4);

                        //Create a json object and store values
                        JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                        objectBuilder.add("code", code);
                        objectBuilder.add("type", type);
                        objectBuilder.add("qty", qty);
                        objectBuilder.add("price", price);

                        arrayBuilder.add(objectBuilder.build());
                    }
                    JsonObjectBuilder response = Json.createObjectBuilder();
                    response.add("status", 200);
                    response.add("message", "Done");
                    response.add("data", arrayBuilder.build());
                    writer.print(response.build());
                    break;
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String itemCode = req.getParameter("itemsCode"); // name value from the input field
        String itemType = req.getParameter("itemsType");
        String itemQty = req.getParameter("itemsQty");
        String itemPrice = req.getParameter("itemsPrice");

        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");

            PreparedStatement pstm = connection.prepareStatement("Insert into Item values(?,?,?,?)");
            pstm.setObject(1, itemCode);
            pstm.setObject(2, itemType);
            pstm.setObject(3, itemQty);
            pstm.setObject(4, itemPrice);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder response = Json.createObjectBuilder();
                resp.setStatus(HttpServletResponse.SC_CREATED);//201
                response.add("status", 200);
                response.add("message", "Successfully Added");
                response.add("data", "");
                writer.print(response.build());
            }

        } catch (ClassNotFoundException e) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            e.printStackTrace();
        } catch (SQLException throwables) {
            JsonObjectBuilder response = Json.createObjectBuilder();
            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", throwables.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            throwables.printStackTrace();
        }
    }


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Request Received for delete");
        String itemCode = req.getParameter("ItemCode");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");
            PreparedStatement pstm = connection.prepareStatement("Delete from Item where code=?");
            pstm.setObject(1, itemCode);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("data", "");
                objectBuilder.add("message", "Successfully Deleted");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("data", "Wrong Id Inserted");
                objectBuilder.add("message", "");
                writer.print(objectBuilder.build());
            }
        } catch (ClassNotFoundException e) {
            resp.setStatus(200);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Error");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());

        } catch (SQLException throwables) {
            resp.setStatus(200);
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Error");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }
    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //we have to get updated data from JSON format
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject jsonObject = reader.readObject();
        String itemCode = jsonObject.getString("code");
        String itemType = jsonObject.getString("type");
        String itemQty = jsonObject.getString("qty");
        String itemPrice = jsonObject.getString("price");
        PrintWriter writer = resp.getWriter();

        resp.setContentType("application/json");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");

            PreparedStatement pstm = connection.prepareStatement("Update Item set type=?,qty=?,price=? where code=?");
            pstm.setObject(1, itemCode);
            pstm.setObject(2, itemType);
            pstm.setObject(3, itemQty);
            pstm.setObject(4, itemPrice);

            if (pstm.executeUpdate() > 0) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 200);
                objectBuilder.add("message", "Successfully Updated");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            } else {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("status", 400);
                objectBuilder.add("message", "Update Failed");
                objectBuilder.add("data", "");
                writer.print(objectBuilder.build());
            }

        } catch (ClassNotFoundException e) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Update Failed");
            objectBuilder.add("data", e.getLocalizedMessage());
            writer.print(objectBuilder.build());
        } catch (SQLException throwables) {
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            objectBuilder.add("status", 500);
            objectBuilder.add("message", "Update Failed");
            objectBuilder.add("data", throwables.getLocalizedMessage());
            writer.print(objectBuilder.build());
        }
    }

    public boolean updateItem(String itemCode, int itemQty) throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        PreparedStatement stm = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234").prepareStatement
                ("UPDATE Item SET qty=(qty-" + itemQty + ") WHERE code='" + itemCode + "'");
        return stm.executeUpdate()>0;
    }
}
