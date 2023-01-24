import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../style/checkout.css";
import { useSelector } from "react-redux";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Оформление заказа">
      <CommonSection title="Оформление заказа" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Введите информацию по заказу</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="* Имя" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="phone" placeholder="* Номер телефона" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="E-mail" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Адрес" />
                </FormGroup>
                <FormGroup className="form__group">
                  <textarea type="text" placeholder="Коментарий к заказу" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Количество товаров:
                  <span>{totalQty}шт.</span>
                </h6>
                <h6>
                  Стоимость товаров:
                  <span>{totalAmount}₽</span>
                </h6>
                <h6>
                  Доставка: <br />
                  бесплатная доставка
                  <span>0₽</span>
                </h6>
                <h4>
                  Общая стоимость:
                  <span>{totalAmount}₽</span>
                </h4>
                <button className="buy__btn auth__btn w-100">Оформить</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
