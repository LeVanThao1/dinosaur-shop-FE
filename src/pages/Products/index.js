import React, { memo, useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";
// import "antd/dist/antd.css";

import { Row, Col, Pagination } from "antd";
import "./style.scss";
import Filters from "../../components/Filters";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
	setPages,
	setProducts,
	setCurrentPage,
} from "../../slice/products.slice";
import axios from "axios";
import { Loading } from "../../components";
import { notifiError } from "../../utils/notification";
function ProductList(props) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const productList = useSelector((state) => state.products);
	const { products, pages, currentPage, filter } = productList;
	const {
		category,
		material,
		style,
		typeProduct,
		price,
		textSearch,
		sortPrice,
	} = filter;
	const countRef = useRef(0);
	const ref = useRef(null);
	useEffect(() => {
		setLoading(true);
		countRef.current++;
		if (ref.current) clearTimeout(ref.current);
		ref.current = setTimeout(
			() => {
				console.log("Ad");
				setLoading(true);
				axios
					.get(
						`http://localhost:3001/api/products?page=${currentPage}&${category}&${material}&${typeProduct}&${style}&${price}&${textSearch}&${sortPrice}`
					)
					.then((res) => {
						dispatch(setProducts(res.data.products));
						dispatch(setPages(res.data.query));
						setLoading(false);
					})
					.catch((error) => {
						notifiError("Error", error.response.data.msg);

						setLoading(false);
					});
			},
			countRef.current > 0 ? 500 : 0
		);
		setLoading(false);
		// if()
		// axios
		// 	.get(
		// 		`http://localhost:3001/api/products?page=${currentPage}&${category}&${material}&${typeProduct}&${style}&${price}`
		// 	)
		// 	.then((res) => {
		// 		dispatch(setProducts(res.data.products));
		// 		dispatch(setPages(res.data.query));
		// 		setLoading(false);
		// 	})
		// 	.catch((error) => {
		// 		notifiError("Error", error.response.data.msg);

		// 		setLoading(false);
		// 	});
	}, [filter, currentPage]);

	const handleChangePage = (page, pageSize) => {
		dispatch(setCurrentPage(page));
	};
	return (
		<Container>
			<Row>
				<Col xs={24} sm={24} md={6} lg={6} xl={6}>
					<Filters />
				</Col>
				{!loading && products ? (
					<Col xs={24} sm={24} md={18} lg={18} xl={18}>
						<div
							style={{
								marginTop: "16px",
								paddingTop: "8px",
								marginBottom: "16px",
							}}
						>
							<Row justify="space-around">
								{products.length > 0 ? (
									products.map((product, i) => (
										<ProductCard
											product={product}
											key={i}
										/>
									))
								) : (
									<h4>Hiện tại chưa có sản phẩm sản phẩm</h4>
								)}
							</Row>
							{pages > 0 && (
								<Row justify="center">
									<Pagination
										defaultCurrent={currentPage}
										defaultPageSize={1}
										total={pages}
										onChange={handleChangePage}
									/>
								</Row>
							)}
						</div>
					</Col>
				) : (
					<Loading />
				)}
			</Row>
		</Container>
	);
}
export default memo(ProductList);
