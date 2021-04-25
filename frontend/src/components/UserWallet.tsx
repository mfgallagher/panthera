import React, { useContext, useState } from 'react'
import Web3 from 'web3'
import { Symfoni } from "./../hardhat/SymfoniContext";
import { CurrentAddressContext } from "./../hardhat/SymfoniContext";
import { AppBar, Box, Button, ButtonGroup, createStyles, Dialog, Grid, IconButton, makeStyles, Paper, Tab, Tabs, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import PantherCoin from './../images/panthercoinn.jpg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      margin: 'auto',
      padding: theme.spacing(2),
      height: 300,
      maxWidth: 800,
      backgroundColor: '#3368ff'
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '300',
      maxHeight: '300',
    },
  }),
);


export default function UserWallet() {
  const [currentAddress, setCurrentAddress] = useContext(CurrentAddressContext)
  const classes = useStyles()
  const [openRedeem, setOpenRedeem] = useState(false)
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const [value, setValue] = React.useState(0);

  function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


  const handleClickOpen = () => {
    setOpenRedeem(true);
  };
  const handleClose = () => {
    setOpenRedeem(false);
  };

  return (
    <div style={{
      backgroundColor: '#80a1ff'
    }}>
    { (!openRedeem) ? (
      <div>
        <Symfoni>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Wallet" {...a11yProps(0)} />
              <Tab label="Account" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>

          <Grid item container >
            <Grid item xs={6}>
              <img src={PantherCoin} />
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography
                variant="subtitle1"
                color="secondary"
                >
                  Welcome to your Panthera Wallet!
                </Typography>
              </Paper>
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

          </TabPanel>

          <TabPanel value={value} index={1}>

              <Paper className={classes.paper}>
                <Typography noWrap>
                  Account: {currentAddress}
                </Typography>
                <p>
                  Balance: 2.22 ETH
                  </p>
              </Paper>

          </TabPanel>
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
    </div>
  );
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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