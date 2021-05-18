import './App.css'
import UserWallet from "./components/UserWallet"
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Toolbar variant="dense">
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
