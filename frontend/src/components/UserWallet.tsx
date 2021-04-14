import React, { useContext, useState } from 'react'
import Web3 from 'web3'
import { Symfoni } from "./../hardhat/SymfoniContext";
import { CurrentAddressContext } from "./../hardhat/SymfoniContext";
import { Button, ButtonGroup, createStyles, Dialog, Grid, IconButton, makeStyles, Paper, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import PantherCoin from './../images/panthercoin.jpg'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      height: 300,
      maxWidth: 800,
      backgroundColor: '#FAEBD7'
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);


export default function UserWallet() {
  const [currentAddress, setCurrentAddress] = useContext(CurrentAddressContext)
  const classes = useStyles()
  const [openRedeem, setOpenRedeem] = useState(false)
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");


  const handleClickOpen = () => {
    setOpenRedeem(true);
  };
  const handleClose = () => {
    setOpenRedeem(false);
  };

  return (
    <>
    { (!openRedeem) ? (
      <div className="App">
        <Symfoni>
          <Grid item container
          className={classes.root}
          spacing={1}
          justify="center"
          >
            <Grid item container >
              <Grid item xs={2}>
                <img src={PantherCoin} />
              </Grid>

              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <Typography
                  variant="subtitle1"
                  color="secondary"
                  >
                    Welcome to your Panthera Wallet!
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={5}>
                <Paper className={classes.paper}>
                  <Typography noWrap>
                    Account: {currentAddress}
                  </Typography>
                  <p>
                    Balance:
                    </p>
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <ButtonGroup fullWidth>
                <Button
                  size="large"
                  onClick={handleClickOpen}
                  >
                  Redeem
                </Button>
                <Button>Send Tokens</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Symfoni>
      </div>
    ) : (
      <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openRedeem}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Redeem
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            This is where users will be able to redeem their tokens for benefits around campus.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )}
    </>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
