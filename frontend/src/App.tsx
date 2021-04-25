import React, { useContext } from 'react'
import Web3 from 'web3'
import './App.css'
import { Symfoni } from "./hardhat/SymfoniContext";
import UserWallet from "./components/UserWallet"
import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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

function App() {
  const classes = useStyles();


  return (
    <div className="App">
      <header className="App-header">
        <Symfoni>
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
        </Symfoni>  
      </header>
    </div>
  );
}

export default App;
