import React, { useContext, useEffect } from 'react'
import Web3 from 'web3'
import './App.css'
import UserWallet from "./components/UserWallet"
import NoWalletDetected from "./components/NoWalletDetected"
import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import detectEthereumProvider from '@metamask/detect-provider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

async function getProvider() {
  const wallet =  await detectEthereumProvider();
  return wallet;
}

const provider = getProvider();


function App() {
  const classes = useStyles();



  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" align="justify">
              Panthera: DeCentralized Rewards System
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <UserWallet />
        </div>
      </header>
    </div>
  );
}

export default App;
