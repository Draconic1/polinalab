import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { setParkings, setOrderStatuses, addOrder } from "./reducerSlice";
import authHeader from "../services/auth-header";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const parkings = useSelector((state) => state.toolkit.parkings);
  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/parkings`, { headers: authHeader() }).then((resp) => {
      dispatch(setParkings(resp.data));
    });

    axios
      .get(`${apiBase}/orders/info/statuses`, { headers: authHeader() })
      .then((resp) => {
        dispatch(setOrderStatuses(resp.data));
      });
  }, [apiBase, dispatch]);

  const selectPlaces = (id) => {
    const idx = selected.findIndex((x) => +x === +id);
    if (idx > -1) {
      selected.splice(idx, 1);
      const tmpSelected = selected.slice(0, selected.length);
      setSelected(tmpSelected);
    } else {
      const tmpSelected = selected.slice(0, selected.length);
      tmpSelected.push(+id);
      setSelected(tmpSelected);
    }
  };

  const addCart = () => {
    const status = orderStatuses.find((x) => x.name === "В корзине").val;

    const user = JSON.parse(localStorage.getItem("user"));

    for (const s of selected) {
      axios
        .post(
          `${apiBase}/orders`, 
          {
            status: +status,
            user_id: user.id,
            parking_id: +s,
          },
          { headers: authHeader() },
        )
        .then((resp) => {
          dispatch(addOrder(resp.data));
        });
    }
  };

  return (
    <>
      <h1>Выбор парковки</h1>
      <hr />
      <Row>
        <Col>
          <div className="border rounded mb-3 p-2">
            {parkings &&
              parkings.map((x) => (
                <Button
                  key={x.id}
                  variant="outline-success"
                  className="m-1"
                  onClick={(e) => selectPlaces(x.id)}
                  active={selected.findIndex((el) => +el === +x.id) > -1}
                >
                  {x.address}
                </Button>
              ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" type="button" onClick={addCart}>
            Добавить в корзину
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Component;
