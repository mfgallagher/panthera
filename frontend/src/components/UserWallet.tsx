import React, { useContext, useState } from 'react'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { AppBar, Box, Button, ButtonGroup, createStyles, Dialog, Grid, IconButton, makeStyles, Paper, Tab, Tabs, TextField, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import PantherCoin from './../images/panthercoinn.jpg'


import { GRANOLA_ABI, GRANOLA_ADDRESS } from '../config'



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
  const classes = useStyles()
  const [openRedeem, setOpenRedeem] = useState(false)
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [value, setValue] = React.useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const granolaContract = new web3.eth.Contract(GRANOLA_ABI as AbiItem[], GRANOLA_ADDRESS)

  async function loadBlockchainData() {
    const accounts = await web3.eth.getAccounts(console.log);
    const accountBalance = await web3.eth.getBalance(accounts[0]);
    setAccount(accounts[0]);
    setBalance(web3.utils.fromWei(accountBalance));
  }

  function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  async function handleTransfer() {
    await granolaContract.methods.transfer(recipient, amount).send({from: account});
  }


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
                Send Tokens
              </Button>
              <Button
                onClick={loadBlockchainData}
              >
                Fetch Data
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        </TabPanel>

        <TabPanel value={value} index={1}>

            <Paper className={classes.paper}>
              <Typography noWrap>
                Account: {account}
              </Typography>
              <p>
                Balance: {balance}
                </p>
            </Paper>

        </TabPanel>
      </div>
    ) : (
      <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openRedeem}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Redeem
        </DialogTitle>
        <DialogContent dividers>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                label="Transfer To"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                value={recipient}
                onChange={(event) => { setRecipient(event.target.value) }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                id="standard-basic"
                label="Amount"
                value = {amount}
                onChange = {(event) => { setAmount(event.target.value);}}
              />

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleTransfer} color="primary">
            Transfer
          </Button>
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
      width: 500,
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
    width: 500,
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
