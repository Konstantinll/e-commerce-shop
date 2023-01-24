import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../style/dashboard.css";
import useGetData from "../custom-hooks/useGetData";

const Dashboard = () => {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("users");
  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-3">
            <div className="revenue__box">
              <h5>Общая стоимость</h5>
              <span>23123</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="order__box">
              <h5>Заказы</h5>
              <span>31231</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="products__box">
              <h5>Проданные товары</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="users__box">
              <h5>Всего пользователей</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
