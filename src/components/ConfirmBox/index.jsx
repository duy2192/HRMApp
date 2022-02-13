import { Close } from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Typography,
    Box
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  closeButton: {
    width: '48px',
    top: '16px',
    left: '90%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '25px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#eb2f06',
  },
  disagree: {
    background: '#eb2f06',
    color: '#f1f2f6',
    '&:hover': {
      color: '#2f3542',
    },
  },
  agree: {
    background: '#0be881',
    color: '#f1f2f6',
    '&:hover': {
      color: '#2f3542',
    },
  },
});
ConfirmBox.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  label: PropTypes.string,
  handleConfirm: PropTypes.func,
  handleClose: PropTypes.func,
};

function ConfirmBox(props) {
  const { open, title, label, handleConfirm, handleClose } = props;
  const classes = useStyles();

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown fullWidth>
        <IconButton size="small" className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <Container>
          <Typography variant="span" className={classes.title}>
            {title}
          </Typography>
        </Container>
        <DialogContent>
          <Typography variant="span" className={classes.label}>
            {label}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} className={classes.agree}>
            Đồng ý
          </Button>
          <Button autoFocus onClick={handleClose} className={classes.disagree}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ConfirmBox;
