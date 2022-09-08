import React from "react";
import styles from "../styles/OrderHistory.module.css";
import { useStore } from "../contexts/StoreContext";
import { roundNum } from "../utils";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";

type Order = {
    [key: string]: any;
    _id?: string;
  };

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const OrderHistoryScreen = () => {
  const { userInfo } = useStore();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [orders, setOrders] = React.useState<Order>({});

  const fetchRequest = () => {
    setLoading(true);
  };
  const fetchSuccess = (payload: any) => {
    setOrders(payload);
    setLoading(false);
  };
  const fetchFail = (payload: any) => {
    setError(payload);
    setLoading(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      fetchRequest();
      try {
        const { data } = await axios.get("/api/orders/mine", {
          headers: {
            authorization: `Bearer: ${userInfo.token}`,
          },
        });
        fetchSuccess(data);
      } catch (err) {
        fetchFail(getError(err));
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <div className={styles.loadingText}>Loading...</div>
      ) : error ? (
        <div className={styles.loadingText}>{error}</div>
      ) : (
        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">DATE</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">PAID</TableCell>
                <TableCell align="right">DELIVERED</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell align="right">
                    {order.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell align="right">
                    {roundNum(order.totalPrice)}
                  </TableCell>
                  <TableCell align="right">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                  </TableCell>
                  <TableCell align="right">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </TableCell>
                  <TableCell align="right">
                    <button type="button" onClick={() => navigate(`/orders/${order._id}`)}>Details</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderHistoryScreen;
