import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./index.scss";
import { Button } from "antd";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import API from "../../../axios";
import { showErrMsg } from "../../../utils/notification";
import { setOrdering } from "../../../slice/order.slice";
import { formatMoney } from "../../../utils/format";
import { useTranslation } from "react-i18next";

function OrderContent({ total }) {
	const { t } = useTranslation();
	const history = useHistory();
	const [text, setText] = useState("");
	const [promotion, setPromotion] = useState(null);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const handlePayment = () => {
		const products = cart.map((cc) => {
			const tamp = { ...cc };
			tamp.price = cc.productId.salePrice;
			return tamp;
		});
		dispatch(setOrdering({ promotion: promotion, products }));
		history.push("/shipping");
	};

	const _onChange = (e) => {
		setText(e.target.value);
	};

	const _onClick = () => {
		API("api/check/promotions/" + text, "GET")
			.then((res) => {
				setError(null);
				setPromotion(res.data);
			})
			.catch((e) => setError(e.response.data.msg));
	};

	return (
		<div className="info__pay .col-6 .col-sm-4">
			<div className="header">{t("carts.order")}</div>
			<div className="info__content">
				<div className="promotion">
					<div className="id_Promotion">{t("carts.enterCode")}</div>
					<div className="promotion__content">
						<Input type="text" value={text} onChange={_onChange} />
						<Button className="btn btnOK" onClick={_onClick}>
							{t("carts.apply")}
						</Button>
					</div>
					{error && showErrMsg(error)}
				</div>
				<div className="orderDetail">
					<div className="cost">
						<span>{t("carts.order")}</span>
						<span>{formatMoney(total)} VND</span>
					</div>
					<div className="reduction">
						<p>
							{t("carts.reduction")}{" "}
							{promotion ? promotion.percent : 0}%
						</p>
						<p>
							{formatMoney(
								(total * (promotion ? promotion?.percent : 0)) /
									100
							)}
							VND
						</p>
					</div>
				</div>
				<div className="tempCacul">
					<div className="child__tempCacul">
						<span>{t("carts.provisional")}</span>
						<span>
							{formatMoney(
								promotion
									? total * (1 - promotion.percent / 100)
									: total
							)}
							VND
						</span>
					</div>
					<Button type="primary" onClick={handlePayment}>
						{t("carts.continuePayment")}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default OrderContent;
