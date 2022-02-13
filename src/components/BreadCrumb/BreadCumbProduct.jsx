import { React, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import {  useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import queryString from 'query-string';
import productApi from 'api/productApi';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CategoryIcon from '@mui/icons-material/Category';
const useStyles = makeStyles({
  root: {
    paddingBottom: '24px',
  },

  link: {
    color: 'black',
  },
});

export default function BreadCumbProduct() {
  const location = useLocation();
  const searchParams = queryString.parse(location.search);
  const pathname = location.pathname;
  const productId = pathname.split('/')[3];
  const [product, setProduct] = useState({});
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      if(pathname.split('/')[3]){
      try {
        const response = await productApi.get(productId);
          setProduct({
            categoryName: response.categories.name ,
            name: response.name ,
            categoryId: response.categories.categoryid,
            manuid: response.manufacturer.manuid,
            manufacturername: response.manufacturer.name,
          });
      } catch (error) {
        console.log(error);
      }}
    })();
  } ,[productId,pathname]);

  return (
    <Box mt={4}>
      <Container role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            className={classes.link}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" color="#fff" />
            Trang chủ
          </Link>
          {location.pathname.split('/')[1] === 'products' && (
            <Link
              to="/products"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              <ShoppingBasketIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Sản phẩm
            </Link>
          )}

          {(!!searchParams['categoryname'] || (!!product.categoryName && !!pathname.split('/')[2])) && (
            <Link
              to={{
                pathname: '/products',
                search: queryString.stringify({
                  'categoryname': searchParams['categoryname'] || product.categoryName,
                  'categoryid': searchParams['categoryid'] || product.categoryId,
                }),
              }}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {searchParams['categoryname'] || product.categoryName}
            </Link>
          )}
          {(!!searchParams['manufacturername'] || (!!product.manufacturername && !!pathname.split('/')[2])) && (
            <Link
              to={{
                pathname: '/products',
                search: queryString.stringify({
                  'manufacturername': searchParams['manufacturername'] || product.manufacturername,
                  'manuid': searchParams['manuid'] || product.manuid,
                }),
              }}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {searchParams['manufacturername'] || product.manufacturername}
            </Link>
          )}

          {(!!product.name && !!pathname.split('/')[3]) && (
            <Link
              to={{
                pathname: `/products/${product.categoryName}/${productId}`,
              }}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {product.name}
            </Link>
          )}
        </Breadcrumbs>
      </Container>
    </Box>
  );
}
