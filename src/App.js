
import './App.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

import Web3 from 'web3';

import { AbiCoder } from 'ethers/lib/utils';
import axios from 'axios';
import React, { Component } from 'react';
import ABI from './ABI.json';

var account = null;
var contract = null;
var vaultcontract = null;
var web3 = null;

/*
const ADDRESS = "0xaf13d807b39e456783cc66a03856b0fcf5d67625"; this is the lastworking version
*/

const ADDRESS = "0xe21C60dAa5946213eA58a98b059cD54E7f859923";
const apikey = "BM3RX2JPQIAY4USBSSS2K4QHJ2WZ44BQBX";
const endpoint = "https://api-goerli.etherscan.io/api";
const nftpng = "https://ipfs.io/ipfs/QmXXCuvVxeFePG8RqXR5KXzPVzaD1QZgiPYYkPpp3NE2kf/";

const providerOptions = {
	binancechainwallet: {
		package: true
	  },
	walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "765d4237ce7e4d999f706854d5b66fdc"
		}
	  },
	  walletlink: {
		package: WalletLink, 
		options: {
		  appName: "Net2Dev NFT Minter", 
		  infuraId: "765d4237ce7e4d999f706854d5b66fdc", 
		  rpc: "", 
		  chainId: 1, 
		  appLogoUrl: null, 
		  darkMode: true 
		}
	  },
};

const web3Modal = new Web3Modal({
  network: "goerli",
  theme: "dark",
  cacheProvider: true,
  providerOptions 
});

async function connectwallet() { 
  if (window.ethereum) {
	  var provider = await web3Modal.connect();
      var web3 = new Web3(provider); 
      await window.ethereum.send('eth_requestAccounts'); 
      var accounts = await web3.eth.getAccounts(); 
      account = accounts[0]; 
      document.getElementById('wallet-address').textContent = account; 
      contract = new web3.eth.Contract(ABI, ADDRESS);
}}

async function mint1() {
  if (window.ethereum) {
        // var _mintAmount = Number(document.querySelector("[name=amount]").value);
		var _mintAmount = 1;
        var mintRate = Number(await contract.methods.cost().call()); 
        var totalAmount = mintRate * _mintAmount; 
      contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
}}

async function mint2() {
	if (window.ethereum) {
		 /* var _mintAmount = Number(document.querySelector("[name=amount]").value); */
		  var _mintAmount = 2;
		  var mintRate = Number(await contract.methods.cost().call()); 
		  var totalAmount = mintRate * _mintAmount; 
		contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
  }}

  async function mint3() {
	if (window.ethereum) {
		 /* var _mintAmount = Number(document.querySelector("[name=amount]").value); */
		  var _mintAmount = 3;
		  var mintRate = Number(await contract.methods.cost().call()); 
		  var totalAmount = mintRate * _mintAmount; 
		contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
  }}

  async function mint4() {
	if (window.ethereum) {
		 /* var _mintAmount = Number(document.querySelector("[name=amount]").value); */
		  var _mintAmount = 4;
		  var mintRate = Number(await contract.methods.cost().call()); 
		  var totalAmount = mintRate * _mintAmount; 
		contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
  }}

  async function mint5() {
	if (window.ethereum) {
		 /* var _mintAmount = Number(document.querySelector("[name=amount]").value); */
		  var _mintAmount = 5;
		  var mintRate = Number(await contract.methods.cost().call()); 
		  var totalAmount = mintRate * _mintAmount; 
		contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
  }}
  
class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			nftdata: [],
		};
	}

	async componentDidMount() {
		
		await axios.get((endpoint + `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`))
		.then(outputa => {
            this.setState({
                balance:outputa.data
            })
            console.log(outputa.data)
        })

		await axios.get((endpoint + `?module=account&action=tokennfttx&contractaddress=${ADDRESS}&page=1&offset=100&tag=latest&apikey=${apikey}`))
		.then(outputb => {
			const { result } = outputb.data
            this.setState({
                nftdata:result
            })
            console.log(outputb.data)
        })
	}
  
  render() {
	const {balance} = this.state;
	const {nftdata} = this.state;

	return (
		<div className="App nftapp">

 <nav class="navbar navbarfont navbarglow navbar-expand-md navbar-dark bg-dark mb-4">
          <div class="container-fluid" style={{ fontFamily: "SF Pro Display" }}>
 {/*            <a class="navbar-brand px-5" style={{ fontWeight: "800", fontSize: '25px' }} href="#"></a><img src="n2d-logo.png" width="7%" /> */}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 px-3 mb-md-0" style={{ fontSize: "25px" }}>
			  <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="http://vilesverse.io">VileSkulls</a>
                </li>
				<li class="nav-item">
                  <a class="nav-link inactive" aria-current="page" href="https://testnets.opensea.io/collection/vileskullsnft-collection-v3">OpenSea</a>
                </li>


				



                
      {/*           <li class="nav-item">
                  <a class="nav-link">Bridge NFTs</a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className='px-5'>
            <input id="connectbtn" type="button" className="connectbutton" onClick={connectwallet} style={{ fontFamily: "SF Pro Display" }} value="Connect Your Wallet" />
          </div>
        </nav>





	 <div className='container'>
	<div className='row'>
	{/*   <form class="gradient col-lg-5 mt-5" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000"}}>
		<h4 style={{color:"#FFFFFF"}}>Mint Portal</h4>
		<h5 style={{color:"#FFFFFF"}}>Please connect your wallet</h5>
		<Button onClick={connectwallet} style={{marginBottom:"5px",color:"#FFFFFF"}}>Connect Wallet</Button>
		<div class="card" id='wallet-address' style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
		  <label for="floatingInput">Wallet Address</label>
		  </div>
		  <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
		  <input type="number" name="amount" defaultValue="1" min="1" max="5"/>
		  <label >Please select the amount of NFTs to mint.</label>
		  <Button onClick={mint}>Buy/Mint!</Button>
		  </div>
		<label style={{color:"#FFFFFF"}}>Price 0.05 ETH each mint.</label>
		<h5 style={{color:"white", textShadow:"1px 1px 3px #000000"}}> Tokens Minted so far= {balance.result}/1000</h5>
  </form> */}
  
  <form>
            <div className="row ">
              <div>
                <h1 className="pt-2" style={{color:"white",  fontWeight: "30" }}>VileSkulls NFT Minter</h1>	
              </div>
              <h5 style={{color:"white", textShadow:"1px 1px 3px #000000"}}> VileSkulls NFTs Minted so far= {balance.result}/1000</h5>
              
			  <h6 className="pt-2" style={{color:"white",  fontWeight: "20" }}>Your Wallet Address</h6>
              <div className="pb-3" id='wallet-address' style={{
                color: "#39FF14",
                fontWeight: "400",
                textShadow: "1px 1px 1px black",
              }}>
                <label for="floatingInput">Please Connect Your MetaMask Wallet</label>
              </div>
            </div>
            <div>

			<h1 className="pt-2" style={{ padding: "05px, 2px, 4px, 4px", color:"white", fontWeight: "300", fontSize: "18px" }}>Select NFT Quantity</h1>


              
            </div>
           <ButtonGroup size="lg"
              aria-label="First group"
              name="amount"
              style={{ boxShadow: "1px 1px 5px #000000" }}
            >
              <Button onClick={mint1}  defaultValue="1" value="1">1</Button>
              <Button onClick={mint2}  defaultValue="2" value="1">2</Button>
              <Button onClick={mint3}  defaultValue="3" value="3">3</Button>
              <Button onClick={mint4}  defaultValue="4" value="4">4</Button>
              <Button onClick={mint5}  defaultValue="5" value="5">5</Button>
            </ButtonGroup>

			{/* <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
		  <input type="number" name="amount" defaultValue="1" min="1" max="5"/>
		  <label >Please select the amount of NFTs to mint.</label>
		  <Button onClick={mint}>Buy/Mint!</Button>
		  </div> */}

<h5 className="pt-2" style={{ padding: "2px, 2px, 1px, 1px", color:"white",  fontWeight: "300", fontSize: "18px" }}>0.05 Ethereum each mint</h5>
<h5 className="pt-2" style={{ padding: "2px, 2px, 1px, 1px", color:"white",  fontWeight: "300", fontSize: "18px" }}>mobile users use browser inside MetaMask </h5>
          </form>


  <div className="row items mt-3">
  <div className="ml-3 mr-3" style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "15px", rowGap: "15px"}}>
  {nftdata.map(result => {
	  return (
			<div className="card">
            		<div className="image-over">
					<img className="card-img-top" src={nftpng + result.tokenID +'.png'} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="nft-card">
							<h5 className="mb-0">VileSkulls {result.tokenID}</h5>
							<h5 className="mb-0 mt-2">Owner Wallet:<p style={{color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000"}}>{result.to}</p></h5>
                    		<div className="card-bottom d-flex justify-content-between">
							{/* <Button className="btn btn-bordered-white btn-smaller mt-3">
								<i className="mr-2" />Buy Now </Button> */}
							</div>
					</div>
                </div>
            </div>
        );
    })}
	</div>
</div>
  </div>
	</div>
 	</div>
  			);
	};
}
	
	export default App;
