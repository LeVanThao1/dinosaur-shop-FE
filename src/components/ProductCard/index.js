import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import "./style.scss";
// const { Meta } = Card;
const { Title } = Typography;

const styleLike = {
  position: "absolute",
  right: "8px",
  bottom: "8px",
  color: "#f15e2c",
  fontSize: "30px",
};

export default function ProductCard(props) {
  // const { images } = props;
  const [image, setImage] = React.useState(
    "https://ananas.vn/wp-content/uploads/pro_A61102_1-500x500.jpg"
  );

  const [like, setLike] = React.useState(false);

  const handleOnMouseEnter = () => {
    setImage("https://ananas.vn/wp-content/uploads/pro_A61102_2-500x500.jpg");
  };

  const handleOnMouseLeave = () => {
    setImage("https://ananas.vn/wp-content/uploads/pro_A61102_1-500x500.jpg");
  };

  const handleChangeLikeStatus = () => {
    setLike((like) => !like);
  };

  const fillLike = (likeStatus) => {
    return likeStatus ? (
      <HeartFilled onClick={handleChangeLikeStatus} style={styleLike} />
    ) : (
      <HeartOutlined onClick={handleChangeLikeStatus} style={styleLike} />
    );
  };
  return (
    <div style={{ marginBottom: "16px" }} className="wrap-card">
      <Card
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{ width: 240 }}
        cover={
          <div style={{ width: "240px", position: "relative" }}>
            <img alt="picture" src={image} style={{ width: "100%" }} />

            {fillLike(like)}
          </div>
        }
      >
        <Title level={5} className="text-center">
          <Link to={props.id ? "/product/" + props.id : ""}>
            URBAS UNSETTLING - LOW TOP - STARLIGHT/LAVENDER
          </Link>
        </Title>
        <Title className="text-center" level={5}>
          500.000 VND
        </Title>
      </Card>
    </div>
  );
}
