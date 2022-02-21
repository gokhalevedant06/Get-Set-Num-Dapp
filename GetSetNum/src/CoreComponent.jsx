import React, {useState,useEffect} from 'react'
import './App.css'
import { ethers } from "ethers";
import contract_abi from './abi.json'
const CoreComponent = () => {
    const [account,setAccount] = useState(null);
    const [contractVal,setContractval] = useState(null);
    const [currentContractValue,setCurrentContractValue] = useState(null);
    const [provider,setProvider] = useState(null);
    const [signer,setSigner]  = useState(null);
    const [contract,setContract]  = useState(null);
    const [error,setError] = useState(null);
    const [currentAccountBalance,setCurrentAccountBalance] = useState(null);
    const connectAccount = async ()=>{
        if(window.ethereum){
           const accounts = await window.ethereum.request({method:"eth_requestAccounts"})
           setAccount(accounts[0])
           startContract()
        }else{
            setError("You need to install Metamask")
        }
    }

    const contractAddress = '0xe75F6898d35f1AFd2EaC243b0Fe37bd2Cf18Eaec'
    const startContract = async()=>{
        const _provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(_provider)

        const _signer = _provider.getSigner()
        setSigner(_signer)

        const _contract= new ethers.Contract(contractAddress,contract_abi,_signer)
        setContract(_contract)

        const balance = await _signer.getBalance(account)
        const balanceValue = parseInt(balance._hex, 16);
        const finalBalance = ethers.utils.formatEther(`${balanceValue}`);
        setCurrentAccountBalance(finalBalance)
    }

    const getCurrentVal = async ()=>{
        let val = await contract.getNum()
        setCurrentContractValue(parseInt(val._hex,16))
    }
    const setCurrentVal = async() =>{
        contract.setNum(contractVal)

    }


    
    
  return (
      <div className='fcontainer'>
    <h1>A Simple Dapp </h1>
    <button onClick={connectAccount}>Connect Your Account</button>
    <h3>Address: {account}</h3>
    <h3>Balance: {currentAccountBalance} ETH</h3>
    <h3>Current Contract Value: {currentContractValue}</h3>
    <button onClick={getCurrentVal}>Get Value</button>
    <br />
    <input type="number" name="" id="" placeholder='Enter Value' onChange={(e)=>{
        setContractval(e.target.value)
    }}/>
    <br />
    <button onClick={setCurrentVal}>Set Value</button>
      </div>
  )
}

export default CoreComponent