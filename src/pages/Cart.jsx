import React from "react";
import "../style/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Корзина">
      <CommonSection title="Корзина" />
      <section>
        <Container>
          {cartItems.length === 0 ? (
            <h2 className="fs-4 text-center">Корзина пуста</h2>
          ) : (
            <Row>
              <Col lg="9">
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Картинка</th>
                      <th>Название</th>
                      <th>Цена</th>
                      <th>Количество</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              </Col>
              <Col lg="3">
                <div>
                  <h6 className="d-flex align-items-center justify-content-between">
                    Общая стоимость:
                    <span className="fs-4 fw-bold">{totalAmount}₽</span>
                  </h6>
                </div>
                <div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="buy__btn w-100"
                  >
                    <Link to="/checkout">Оформить заказ</Link>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="buy__btn w-100"
                  >
                    <Link to="/shop">Продолжить покупки</Link>
                  </motion.button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="img" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price}₽</td>
      <td>{item.quantity}шт.</td>
      <td>
        <motion.span whileTap={{ scale: 1.2 }} onClick={deleteProduct}>
          <i className="ri-delete-bin-line"></i>
        </motion.span>
      </td>
    </tr>
  );
};

export default Cart;
