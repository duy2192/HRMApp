import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from '@mui/material';
import {Breadcrumbs} from '@mui/material';
import { Box } from '@mui/system';
import { React } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    paddingBottom: '24px',
  },

  link: {
    color: 'black',
  },
});

export default function BreadCumbAdmin() {
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const breadcrumb = useSelector((state) => state.admin.breadcrumb);
  const mainBreadcrumb = {
    user: 'Tài khoản',
    order: 'Đơn hàng',
    products: 'Sản phẩm',
    categories: 'Danh mục',
    manufacturer: 'Hãng sản xuất',
  };
  const classes = useStyles();
  return (
    <Box mt={4}>
      <Container role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
        {!!pathname[3] && (

          <Link
            to="/admin"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/getting-started/installation/"
            className={classes.link}
          >
            <HomeIcon />
            Admin
          </Link>)}
          {!!pathname[3] && (
            <Link
              to={`/admin/${pathname[2]}/`}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              {mainBreadcrumb[pathname[2]]}
            </Link>
          )}
          {breadcrumb.map((item, index) => (
            <Link
              key={index}
              to={`/admin/${item.link}/`}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/getting-started/installation/"
              className={classes.link}
            >
              {item.label}
            </Link>
          ))}
        </Breadcrumbs>
      </Container>
    </Box>
  );
}
