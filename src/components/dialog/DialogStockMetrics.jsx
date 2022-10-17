import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
import './dialog.css';

const DialogStockMetrics = ({ title, description, close, open, stockMetrics }) => {
    let content = (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            {stockMetrics.length === 0 ?
                (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            No Stock present within selected time span
                        </DialogContentText>
                    </DialogContent>
                ) : (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Minimum Price: INR. <b>{stockMetrics.min}</b>
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Maximum Price: INR. <b>{stockMetrics.max}</b>
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Average Price: INR. <b>{stockMetrics.avg}</b>
                        </DialogContentText>
                    </DialogContent>
                )}

            <DialogActions>
                {/* <button
          className='dialogAlertYesButton'
          variant="contained"
          color="secondary"
          onClick={removeCompany}>
          Yes
        </button> */}
                <button
                    className='dialogAlertNoButton'
                    onClick={close}
                    autoFocus>
                    Close
                </button>
            </DialogActions>
        </Dialog>
    )


    return content;
}

export default DialogStockMetrics