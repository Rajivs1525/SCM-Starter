import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]); // Use the first account if available
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts[0]); // Use the first account if available

    // Once wallet is set, get a reference to the deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const tribo = async () => {
    if (atm) {
      try {
        const tx = await atm.cubeSeries(depositAmount);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error while calling cubeSeries:", error);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Connect your MetaMask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Enter N</p>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(parseInt(e.target.value))}
        />
        <br />
        <br />
        <button onClick={tribo}>Click here to find Sum of n cube</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
  <header>
    <h1>Rajiv-S Project</h1>
    <h2>Sum of cubes of first n numbers</h2>
  </header>
  {initUser()}
  <style jsx>{`
    .container {
      text-align: center;
      background-color: #2c3e50; /* Dark blue-gray background */
      color: #ecf0f1; /* Light gray text */
      padding: 20px; /* Add padding for better spacing */
    }

    h1 {
      color: #f39c12; /* Orange header text */
      margin-bottom: 20px; /* Add margin below the header */
    }
    h2{
      color: #f39c12; /* Orange header text */
      margin-bottom: 20px; /* Add margin below the header */
    }

    p {
      margin-bottom: 10px; /* Add margin below paragraphs */
    }

    input {
      margin-bottom: 10px; /* Add margin below the input field */
    }

    button {
      background-color: #3498db; /* Blue button background */
      color: #ffffff; /* White button text */
      border: none;
      padding: 10px 20px;
      cursor: pointer;
    }
  `}</style>
</main>

  
  );
}

