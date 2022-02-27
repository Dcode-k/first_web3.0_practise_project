import React,{useState,useEffect} from "react";
import {ethers} from 'ethers';

import {contractABI,contractAddress} from '../utils/constants';

export const TransactionContext=React.createContext();

const {ethereum}=window;

const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer =provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);
}

export const TransactionProvider=({children})=>{
    const [currentAccount, setcurrentAccount] = useState('');
    const [formData, setformData] = useState({addressTo:'',amount:'',keyword:'',message:''});

    const handleChange=(e,name)=>{
      setformData((prevState)=>({...prevState,[name]:e.target.value}));
    }

    const checkIfWalletIsConnected=async ()=>{
        try {
            if(!ethereum) return alert("please install metamask");

            const accounts=await ethereum.request({method:'eth_accounts'});
    
            if(accounts.length){
                setcurrentAccount(accounts[0]);
    
                // getAllTransactions
            }
            else{
                console.log("no accounts found");
            }
        } catch (error) {
             console.log(error);
             throw new Error("No object found");
        }

    }

    const connectWallet=async ()=>{
        try {
            if(!ethereum) return alert("please install metamask");

            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            setcurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("NO ethereum object");
        }
    }

    const sendTransaction=()=>{
        try {
            if(!ethereum) return alert("please install metamask");

            // get the data from the form....
            const { addressTo, amount, keyword, message } = formData;

            getEthereumContract();
        } catch (error) {
            throw new Error("NO ethereum object");
        }
    }

    useEffect(() => {
     checkIfWalletIsConnected();
    }, []);
    
return (
    <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setformData,handleChange,sendTransaction}}>
        {children}
    </TransactionContext.Provider>
)
}