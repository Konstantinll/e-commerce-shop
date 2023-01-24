import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../style/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const docRef = doc(db, "products", id);

  const { data: products } = useGetData("products");

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("нет товаров");
      }
    };
    getProduct();
  }, []);

  const {
    imgUrl,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObj);
    toast.success("Ваш отзыв добавлен");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Товар добавлен в корзину");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section>
        <Row>
          <Col lg="6" className="d-flex justify-content-center">
            <div className="i__mg">
              <img src={imgUrl} alt="img" />
            </div>
          </Col>
          <Col lg="6">
            <div className="product_details">
              <h2>{productName}</h2>
              <div className="product__rating d-flex align-items-center gap-5 mb-3">
                <div>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-half-s-line"></i>
                  </span>
                </div>
                <p>{/* (<span>{avgRating}</span> рэйтинг) */}</p>
              </div>
              <span className="product_price">{price}₽</span>
              <p className="mt-3">{shortDesc}</p>
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn"
                onClick={addToCart}
              >
                Добавить в корзину
              </motion.button>
            </div>
          </Col>
        </Row>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Описание
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  {/* Отзывы ({reviews.length}) */}
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-4">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__reviews mt-4">
                  <div className="review__wrapper">
                    {/* <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>Jhon Doe</h6>
                          <span>{item.rating} (рейтинг)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul> */}
                    <div className="review__form">
                      <h4>Оставьте отзыв</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Введите имя"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group rating__group d-flex align-itens-center gap-5">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            ref={reviewMsg}
                            required
                            placeholder="Введите текст отзыва.."
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Оставить отзыв
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">Ещё вам может понравится</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
