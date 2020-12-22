import React from "react";
import { Slider, InputNumber, Row, Col } from "antd";

export default function PriceFilter(props) {
  const [value, setValue] = React.useState([100000, 1000000]);
  const onChange = ([min, max]) => {
    setValue([min, max]);
  };

  const onChangeMin = (min) => {
    setValue([min, value[1]]);
  };

  const onChangeMax = (max) => {
    setValue([value[0], max]);
  };

  const onAfterChange = (value) => {
    console.log("onAfterChange: ", value);
  };
  const formatter = (value) => {
    let str = value + "";
    let res = "";
    for (let i = 0; i < str.length; i++) {
      if (i % 3 === 0 && i) {
        res = str[str.length - 1 - i] + "." + res;
      } else {
        res = str[str.length - 1 - i] + res;
      }
    }
    return res;
  };
  return (
    <div>
      <Slider
        range
        min={100000}
        max={1000000}
        step={10000}
        value={[...value]}
        onChange={onChange}
        onAfterChange={onAfterChange}
        tipFormatter={null}
      />
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row justify="center">
            <InputNumber
              min={100000}
              max={value[1]}
              onChange={onChangeMin}
              value={value[0]}
              step={10000}
              formatter={formatter}
              parser={formatter}
              size="small"
            />
          </Row>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Row justify="center">
            <InputNumber
              min={value[0]}
              max={1000000}
              value={value[1]}
              step={10000}
              onChange={onChangeMax}
              formatter={formatter}
              size="small"
              parser={formatter}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
