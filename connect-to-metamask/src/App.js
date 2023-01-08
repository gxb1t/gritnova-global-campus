import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import React from 'react';



function App() {

  // Properties
  const [walletAddress, setWalletAddress] = useState("");
  const [active, setActive] = useState(false);

  // Helper functions

  // Requests access to the user's Metamask Wallet
  async function requestAccount(){
    console.log('Requesting account...');

    // check if metamask extension exist
    if(window.ethereum){
      console.log('detected');
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);
        setActive(true);
      } catch (error){
        console.log('Error connecting...', error)
      }

    } else{
      console.log('Metamask not detected')
      //alert("Metamask not detected! \nTo install the extension you can visit the website:\n https://metamask.io")  
      var val = window.confirm("Metamask not detected! Do you want install Metamask?");
      if (val === true) {
        window.open('https://metamask.io', 'newWindow');
      } else {
        alert("You cannot connect your wallet without a Metamask Extension.");
      }

    }

  }

  // Create a provider to interact with a smart contract

  async function connectWallet(){
    if(typeof window.ethereum != 'undefined'){
      await requestAccount();
      // this is useful to interact with smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);

    } else{
      console.log('Metamask not detected')
      //alert("Metamask not detected! \nTo install the extension you can visit the website:\n https://metamask.io")  
      var val = window.confirm("Metamask not detected! Do you want install Metamask?");
      if (val === true) {
        window.open('https://metamask.io', 'newWindow');
      } else {
        alert("You cannot connect your wallet without a Metamask Extension.");
      }

    }
  }

  async function disconnect(){
    if (typeof window.ethereum != "undefined"){
      console.log("Disconnecting ", walletAddress);
      setWalletAddress("");
      setActive(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <button 
          onClick={ requestAccount }
        >Request Account</button> */}

        <button 
        style={{backgroundColor: 'green'}}
        onClick={ connectWallet }
        >Connect Wallet</button>

        { active ? <span>Connected with <b>{walletAddress}</b> </span> : <span>Not Connected</span>}

       
        { active && ( <button 
                      style={{backgroundColor: 'red'}}
                      onClick={ disconnect }
                      >Disconnect</button>
        )}


        
      </header>
    </div>
  );
}

export default App;
