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
function LikeProduct(props) {
	const likeList = useSelector((state) => state.likeList);
	const [currentPage, setCurrentPage] = useState(1);
	const loading = useSelector((state) => state.loading);
	const handleChangePage = (page, pageSize) => {
		setCurrentPage(page);
		// dispatch(setData(filterProducts));
		window.scrollTo(0, 0);
	};
	return (
		<Container>
			<Row>
				{!loading && (
					<Col xs={24} sm={24} md={24} lg={24} xl={24}>
						<div
							style={{
								marginTop: "16px",
								paddingTop: "8px",
								marginBottom: "16px",
							}}
						>
							<ListProduct
								data={likeList.slice(
									(currentPage - 1) * 12,
									currentPage * 12
								)}
							/>
							<Row justify="center">
								<Pagination
									defaultCurrent={1}
									defaultPageSize={1}
									current={currentPage}
									total={Math.ceil(likeList.length / 12)}
									onChange={handleChangePage}
								/>
							</Row>
						</div>
					</Col>
				)}
			</Row>
		</Container>
	);
}
export default memo(LikeProduct);

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
				<h4>Hiện tại chưa có sản phẩm yêu thích</h4>
			)}
		</>
	);
};
