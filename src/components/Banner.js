import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({data}){
    console.log(data);
    const { title, content, destination, label } = data;

    return (
      <Row>
        <Col className="py-2 text-center">
          <h1 style={{ fontFamily: "Lobster, cursive" }}>{title}</h1>
          <p>{content}</p>
          <Link className="btn btn-primary" to={destination}>
            {label}
          </Link>
        </Col>
      </Row>
    );
}