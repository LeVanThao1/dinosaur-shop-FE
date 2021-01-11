import { React, memo, useState, useRef, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import API from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { formatMoney } from "../../utils/format";
import { Loading } from "../../components";
import {
	notifiError,
	notifiSuccess,
	showErrMsg,
	showSuccessMsg,
} from "../../utils/notification";
import "./index.css";
import { setLoading } from "../../slice/loading.slice";
import { setCurrentOrder, setListOrder } from "../../slice/order.slice";
const columns = [
	{
		title: "Đơn hàng",
		dataIndex: "img",
		key: "img",
		render: (url) => (
			<img
				className="order_img"
				alt=""
				src={url}
				width="100px"
				height="100px"
			/>
		),
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
	const { listOrder } = useSelector((state) => state.orders);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		dispatch(setLoading(true));
		API("api/orders", "GET", token)
			.then((res) => {
				let temp = res.data;
				let result = [];
				dispatch(setListOrder(res.data));
				for (let i = 0; i < temp.length; i++) {
					console.log("loop");
					// onclick cho nao DynamicsCompressorNode. nãy t hỏi m đó. bữa dùng table của ant không có <tr> the doi xi
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
					obj["total"] = formatMoney(temp[i].total);
					obj["img"] = temp[i].products[0].productId.images[0];
					result.push(obj);
				}
				setOrders(result);
				dispatch(setLoading(false));
			})
			.catch((err) => {
				notifiError(err.response.data.msg);
				dispatch(setLoading(false));
			});
	}, []);

	const _onRow = (record, index) => {
		dispatch(setCurrentOrder(listOrder[index]));
		history.push("order-detail/" + record.id);
	};
	return (
		<div className="Orders_page">
			<h2 className="Orders_page-heading">DANH SÁCH ĐƠN HÀNG</h2>
			{!loading && (
				<div className="Orders_page_content">
					<Table
						columns={columns}
						dataSource={orders}
						onRow={(r, i) => ({
							onClick: () => _onRow(r, i),
						})}
					/>
					{/* <Table columns={columns}  /> */}
				</div>
			)}
		</div>
	);
}
export default memo(Orders);
