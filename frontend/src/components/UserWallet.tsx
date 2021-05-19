import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { AppBar, Box, Button, ButtonGroup, createStyles, Grid, InputAdornment, makeStyles, Paper, Tab, Tabs, TextField, Theme, Typography, } from '@material-ui/core';
import Panthera from './../images/panthera.png';
import GranolaCoin from './../images/GRN.png';
import GranolaScoop from './../images/GranolaScoop.png';
import NoWalletDetected from './NoWalletDetected';
import { GRANOLA_ABI, GRANOLA_ADDRESS } from '../config';
import QrReader from 'react-qr-scanner';
import { useSnackbar } from 'notistack';



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
    lowPaper: {
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      padding: theme.spacing(2),
      height: 100,
      maxWidth: 600,
      backgroundColor: '#ccd9ff'
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
    qr: {
      height: 240,
      width: 320,
    }
  }),
);


export default function UserWallet() {
  const classes = useStyles()
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const granolaContract = new web3.eth.Contract(GRANOLA_ABI as AbiItem[], GRANOLA_ADDRESS)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [openRedeem, setOpenRedeem] = useState(false)
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [hasProvider, setHasProvider] = useState(false);
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState('No result');
  const [qrData, setQrData] = useState('');



  async function loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    if(accounts.length !== 0) {
      setHasProvider(true);
      setAccount(accounts[0]);
      const granolaBalance = await granolaContract.methods.balanceOf(accounts[0]).call();
      setBalance(granolaBalance);
    }
  }

  useEffect(() => {
    const blockchainData = async() => {
      await loadBlockchainData();
    };

    blockchainData();
  }, [recipient])



  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setRecipient('');
    setValue(newValue);
  };

  const handleScan = (data) => {
    if(!data) {
      console.log(data);
      return
    }
    setRecipient((data.text).slice(9));
  }

  const convertToGranola = (dollars) => {
    let convert = +((+amount).toFixed(2));
    let convertString = ((convert * 100) / 400).toFixed().toString();
    console.log(convertString);
    return convertString;
  }

  async function handleTransfer() {
    if( (+balance) < (+amount) ) {
      enqueueSnackbar("Insufficient funds for this transaction", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }
    
    if(!recipient) {
      enqueueSnackbar("Please enter or scan an address to transfer to", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }

    if(!amount) {
      enqueueSnackbar("Please enter the amount spent", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }
    const tokenAmount = convertToGranola(amount);
    await granolaContract.methods.transfer(recipient, tokenAmount)
    .send({from: account})
    .then((result) => {
        console.log(result);
        enqueueSnackbar(
        <a
          href={`https://ropsten.etherscan.io/tx/${result.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ffffff'
          }}
        >
          Success! View your transaction by clicking here
        </a>, {
          variant:'success',
          autoHideDuration: 3000
        })
        setRecipient('');
     })
     .catch((err) => {
       enqueueSnackbar(err.message, {
          variant:'error',
          autoHideDuration: 3000
        })
        console.log(err)
    });
  }

  async function handleSend() {
    if( (+balance) < (+amount) ) {
      enqueueSnackbar("Insufficient funds for this transaction", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }
    if(!recipient) {
      enqueueSnackbar("Please enter or scan an address to transfer to", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }

    if(!amount) {
      enqueueSnackbar("Please enter the amount to send", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }

    await granolaContract.methods.transfer(recipient, amount)
    .send({from: account})
    .then((result) => {
        console.log(result);
        enqueueSnackbar(
        <a
          href={`https://ropsten.etherscan.io/tx/${result.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ffffff'
          }}
        >
          Success! View your transaction by clicking here
        </a>, {
          variant:'success',
          autoHideDuration: 3000
        })
        setRecipient('');
     })
     .catch((err) => {
       enqueueSnackbar(err.message, {
          variant:'error',
          autoHideDuration: 3000
        })
        console.log(err)
    });
  }

  async function handleRedeem() {
    if( (+balance) < (+amount) ) {
      enqueueSnackbar("Insufficient funds for this transaction", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }

    if(!amount) {
      enqueueSnackbar("Please enter the amount to send", {
         variant:'error',
         autoHideDuration: 3000
       })
       return
    }

    setRecipient(GRANOLA_ADDRESS);
    await granolaContract.methods.transfer(recipient, amount)
    .send({from: account})
    .then((result) => {
        console.log(result);
        enqueueSnackbar(`${amount} Tokens Sent!`, {
          variant:'success',
          autoHideDuration: 2000
        })
        setAccount('');
     })
     .catch((err) => {
       enqueueSnackbar(err.message, {
          variant:'error',
          autoHideDuration: 3000
        })
        console.log(err)
      });
  }

  if(!hasProvider) {
    return (
      <div>
        <NoWalletDetected />
      </div>
    )
  };


  return (
    <div style={{
      backgroundColor: '#80a1ff'
    }}>
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Process Transaction" {...a11yProps(1)} />
            <Tab label="Send Tokens" {...a11yProps(2)} />
            <Tab label="Redeem" {...a11yProps(3)} />
            <Tab label="Account" {...a11yProps(4)} />
          </Tabs>
        </AppBar>


        <TabPanel value={value} index={0}>
          <Grid item container >
            <Grid item xs={4}>
              <img src={Panthera} alt={"panthera"} />
            </Grid>

            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <Typography
                variant="subtitle1"
                style={{ color: "#ffffff" }}
                >
                  Welcome to your Panthera Wallet! Panthera is a decentralized rewards system where consumers are able to make purchases at Middlebury businesses and receive tokens that can be later redeemed. By having a rewards system with digital currency, members of the Middlebury College community will be encouraged to shop on-campus more consistently, helping to fuel the local economy while participating in the excitement of the cryptocurrency world.
                </Typography>
              </Paper>
            </Grid>


          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
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
              <QrReader
                delay={delay}
                style={{ height: 240, width: 320 }}
                onError={(err) => console.log(err)}
                onScan={(data) => handleScan(data)}
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                label="Amount"
                variant="standard"
                value={amount}
                InputProps={{
                  startAdornment:
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                }}
                onChange = {(event) => { setAmount(event.target.value);}}
                />
            </Grid>

            <Grid item xs={12} >
              <Button autoFocus onClick={handleTransfer} color="primary">
                Transact
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
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
              <QrReader
                delay={delay}
                style={{ height: 240, width: 320 }}
                onError={(err) => console.log(err)}
                onScan={(data) => handleScan(data)}
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                label="Amount"
                variant="standard"
                value={amount}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="start">
                      GRN
                    </InputAdornment>
                }}
                onChange = {(event) => { setAmount(event.target.value);}}
                />
            </Grid>

            <Grid item xs={12} >
              <Button autoFocus onClick={handleSend} color="primary">
                Send
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                label="Transfer To"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                value={GRANOLA_ADDRESS}
                disabled={true}
                onChange={(event) => { setRecipient(event.target.value) }}
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                label="Amount"
                variant="standard"
                value={amount}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="start">
                      GRN
                    </InputAdornment>
                }}
                onChange = {(event) => { setAmount(event.target.value);}}
                />
            </Grid>

            <Grid item xs={12} >
              <Button autoFocus onClick={handleRedeem} color="primary">
                Redeem
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Grid item container >
            <Grid item xs={8} >
              <Paper className={classes.paper}>
                <Typography
                  noWrap
                  variant="h6"
                >
                  Account: <a
                    href={`https://ropsten.etherscan.io/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    {account}
                  </a>
                </Typography>

                <Typography
                  noWrap
                  variant="h6"
                >
                  Balance: {balance} GRN
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <img src={GranolaCoin} alt={"panthera"} />
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.lowPaper}>
                <Typography
                  style={{ color: "#3368ff" }}
                >
                  This is your account page. You can access a list of your transactions by clicking on your Address, which will redirect to Etherscan. To see ERC20 Token Tx's, make sure to click the ERC20 tab.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </div>
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
