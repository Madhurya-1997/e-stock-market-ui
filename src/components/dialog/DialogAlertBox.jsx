import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import './dialog.css'


const DialogAlertBox = ({ title, description, close, removeCompany, open }) => {

  let content = (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className='dialogAlertYesButton'
          variant="contained"
          color="secondary"
          onClick={removeCompany}>
          Yes
        </button>
        <button
          className='dialogAlertNoButton'
          onClick={close}
          autoFocus>
          No
        </button>
      </DialogActions>
    </Dialog>
  )



  return content;
}

export default DialogAlertBox