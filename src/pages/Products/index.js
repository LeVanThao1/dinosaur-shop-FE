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
	setProductsFilter,
	setIsFilter,
	setData,
} from "../../slice/products.slice";
import axios from "axios";
import { Loading } from "../../components";
import { notifiError } from "../../utils/notification";
import { setLoading } from "../../slice/loading.slice";
import { useLocation } from "react-router-dom";
function ProductList(props) {
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const location = useLocation();
	console.log(location);
	const productList = useSelector((state) => state.products);
	const loading = useSelector((state) => state.loading);
	const {
		products,
		pages,
		currentPage,
		filter,
		isFilter,
		data,
	} = productList;
	const {
		category,
		material,
		style,
		typeProduct,
		price,
		textSearch,
		sortPrice,
		productsFilter,
		min,
		max,
	} = filter;
	const ref = useRef(null);

	const checkFilter = () =>
		min !== 0 ||
		max !== 1000000 ||
		style ||
		category ||
		material ||
		typeProduct ||
		textSearch ||
		sortPrice
			? true
			: false;

	useEffect(() => {
		if (!products) {
			dispatch(setLoading(true));
			axios
				.get(`http://localhost:3001/api/products`)
				.then((res) => {
					dispatch(setProducts(res.data));
					dispatch(setPages(Math.ceil(res.data.length / 9)));
					dispatch(setLoading(false));
				})
				.catch((error) => {
					console.log(error);
					notifiError("Error", error.response.data.msg);
					dispatch(setLoading(false));
				});
		}
	}, []);

	useEffect(() => {
		if (checkFilter() && products) {
			// dispatch(setLoading(true));
			if (ref.current) clearTimeout(ref.current);
			ref.current = setTimeout(() => {
				const tamp = [...products];
				let filterProducts = tamp.filter(
					(product) =>
						product.salePrice >= min &&
						product.salePrice <= max &&
						(style ? product.style._id === style : true) &&
						(category ? product.category._id === category : true) &&
						(material ? product.material._id === material : true) &&
						(typeProduct
							? product.type._id === typeProduct
							: true) &&
						product.name
							.toLowerCase()
							.includes(textSearch.toLowerCase())
				);
				if (sortPrice) {
					filterProducts.sort((a, b) =>
						sortPrice == "des"
							? b.salePrice - a.salePrice
							: a.salePrice - b.salePrice
					);
				}

				dispatch(setProductsFilter(filterProducts));
				dispatch(setPages(Math.ceil(filterProducts.length / 9)));
				// dispatch(setLoading(false));
			}, 300);
		} else {
			if (products) dispatch(setData());
			dispatch(setIsFilter(false));
		}
	}, [filter]);
	const handleChangePage = (page, pageSize) => {
		dispatch(setCurrentPage(page));
		// dispatch(setData(filterProducts));
		window.scrollTo(0, 0);
	};

	return (
		<Container>
			<Row>
				<Col xs={24} sm={24} md={6} lg={6} xl={6}>
					<Filters />
				</Col>
				{!loading && (
					<Col xs={24} sm={24} md={18} lg={18} xl={18}>
						<div
							style={{
								marginTop: "16px",
								paddingTop: "8px",
								marginBottom: "16px",
							}}
						>
							<ListProduct data={data} />
							{data && (
								<Row justify="center">
									<Pagination
										defaultCurrent={currentPage}
										defaultPageSize={1}
										current={currentPage}
										total={pages}
										onChange={handleChangePage}
									/>
								</Row>
							)}
						</div>
					</Col>
				)}
			</Row>
		</Container>
	);
}
export default memo(ProductList);
const ListProduct = ({ data }) => {
	return (
		<>
			{data && data.length > 0 ? (
				<Row justify="space-around">
					{data.map((product, i) => {
						return <ProductCard product={product} key={i} />;
					})}
				</Row>
			) : (
				<h4>Hiện tại chưa có sản phẩm</h4>
			)}
		</>
	);
};
