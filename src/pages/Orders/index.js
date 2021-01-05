import { React, memo, useState, useRef, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import API from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import { Link } from "react-router-dom";

import { Loading } from "../../components";
import {
	notifiError,
	notifiSuccess,
	showErrMsg,
	showSuccessMsg,
} from "../../utils/notification";
import "./index.css";
import { setLoading } from "../../slice/loading.slice";
const columns = [
	{
		title: "Đơn hàng",
		dataIndex: "img",
		key: "img",
		render: (url) => <img className="order_img" alt="" src={url} />,
	},
	{
		title: "Mã đơn hàng",
		dataIndex: "id",
		key: "id",
		//   ,
		//   render: text => <a>{text}</a>,
	},
	{
		title: "Người nhận",
		dataIndex: "receiver",
		key: "receiver",
	},
	{
		title: "Số điện thoại nhận",
		dataIndex: "phone",
		key: "phone",
	},
	{
		title: "Địa chỉ nhận",
		key: "address",
		dataIndex: "address",
	},
	{
		title: "Ngày đặt hàng",
		key: "date",
		dataIndex: "date",
	},
	{
		title: "Trạng thái",
		key: "status",
		dataIndex: "status",
	},
	{
		title: "Thanh toán",
		key: "pay",
		dataIndex: "pay",
	},
	{
		title: "Thành tiền",
		key: "total",
		dataIndex: "total",
	},
];

function Orders() {
	const token = useSelector((state) => state.token);
	// const [loading, setLoading] = useState(true);
	const loading = useSelector((state) => state.loading);
	const [orders, setOrders] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setLoading(true));
		API("api/orders", "GET", token)
			.then((res) => {
				let temp = res.data;
				let result = [];
				console.log("orders: ", temp);
				console.log("alo", result);

				for (let i = 0; i < temp.length; i++) {
					console.log("loop");
					let obj = {};
					// obj["img"] = temp[i].products
					obj["id"] = temp[i]._id;
					obj["receiver"] = temp[i].recipientName;
					obj["phone"] = temp[i].recipientPhone;
					obj["address"] = temp[i].address;
					obj["date"] = moment(temp[i].dateOrder).format(
						"DD/MM/YYYY"
					);
					obj["status"] =
						temp[i].status === 0
							? "đang chờ lấy hàng"
							: temp[i].state === 1
							? "đang giao"
							: temp[i].status === 2
							? "đã giao"
							: "chờ xác nhận";
					obj["pay"] =
						temp[i].status === 2 || temp[i].typePayment === 1
							? "đã thanh toán"
							: "chưa thanh toán";
					obj["total"] = temp[i].total;
					obj["img"] = temp[i].products[0].productId.images[0];
					result.push(obj);
				}
				console.log("alo", result);
				setOrders(result);
				dispatch(setLoading(false));
			})
			.catch((err) => {
				notifiError(err.response.data.msg);
				dispatch(setLoading(false));
			});
	}, []);
	return (
		<div className="Orders_page">
			<h2 className="Orders_page-heading">DANH SÁCH ĐƠN HÀNG</h2>
			{!loading && (
				<div className="Orders_page_content">
					<Table columns={columns} dataSource={orders} />
					{/* <Table columns={columns}  /> */}
				</div>
			)}
		</div>
	);
}
export default memo(Orders);
