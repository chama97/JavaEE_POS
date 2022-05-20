import DTO.OrderDetailDTO;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/detail")
public class OrderDetailServ extends HttpServlet {

    public boolean saveOrderDetail(String orderId, String customerId, ArrayList<OrderDetailDTO> orderDTO) throws ClassNotFoundException, SQLException {
        for (OrderDetailDTO temp : orderDTO) {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");

            PreparedStatement pstm = connection.prepareStatement("Insert into OrderDetail values(?,?,?,?,?,?)");
            pstm.setObject(1, orderId);
            pstm.setObject(2, customerId);
            pstm.setObject(3, temp.getItemCode());
            pstm.setObject(4, temp.getItemPrice());
            pstm.setObject(5, temp.getItemQty());
            pstm.setObject(6, temp.getTotal());
            if (pstm.executeUpdate() > 0) {
                ItemServ itemServlet = new ItemServ();
                if(itemServlet.updateItem(temp.getItemCode(),temp.getItemQty())){

                }else {
                    return false;
                }

            } else {
                return false;
            }
        }
        return true;
    }
}
