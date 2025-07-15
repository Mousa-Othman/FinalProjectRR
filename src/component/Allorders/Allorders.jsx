import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllOrders() {
  const [order, setOrder] = useState(null); // Latest order only
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const baseUrl = "https://ecommerce.routemisr.com/api/v1";

  useEffect(() => {
    async function fetchUserOrders() {
      try {
        const res = await axios.get(`${baseUrl}/orders`, {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        });

        const allOrders = res.data.data;

        // Sort orders by date (latest first)
        const latestOrder = allOrders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        setOrder(latestOrder || null);
      } catch (error) {
        setErr("An error occurred while loading your order.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, []);

  if (loading) return <h3 className="text-center">Loading...</h3>;
  if (err) return <div className="alert alert-danger">{err}</div>;
  if (!order) return <div className="alert alert-warning">No orders found.</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-success">Latest Order</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Order ID: {order._id}</h5>
          <p>Order Date: {order.createdAt?.slice(0, 10) || "N/A"}</p>
          <p>Total Price: {order.totalOrderPrice} EGP</p>
          <p>Payment Method: {order.paymentMethodType}</p>
          <p>
            Payment Status:{" "}
            <span className={order.isPaid ? "text-success" : "text-danger"}>
              {order.isPaid ? "Paid" : "Unpaid"}
            </span>
          </p>
          <p>
            Delivery Status:{" "}
            <span className={order.isDelivered ? "text-success" : "text-danger"}>
              {order.isDelivered ? "Delivered" : "Not Delivered"}
            </span>
          </p>

          <h6 className="mt-3">Shipping Info:</h6>
          <ul>
            <li>Name: {order.user?.name || "N/A"}</li>
            <li>Phone: {order.shippingAddress?.phone || "N/A"}</li>
            <li>
              Address: {order.shippingAddress?.city || "N/A"} -{" "}
              {order.shippingAddress?.details || ""}
            </li>
          </ul>

          <h6 className="mt-3">Products:</h6>
          <div className="row">
            {order.cartItems.map((item) => (
              <div key={item._id} className="col-md-4 mb-3">
                <div className="border rounded p-2 h-100">
                  <img
                    src={item.product?.imageCover}
                    alt={item.product?.title}
                    className="img-fluid mb-2"
                  />
                  <h6>{item.product?.title || "Unnamed Product"}</h6>
                  <p>Quantity: {item.count}</p>
                  <p>Price: {item.price} EGP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
