const meta = 'https://ipfs.io/ipfs/QmT21PxS5a4qzSk87V8kfZ7vYJ55KXV4DDrzT9xWmB3ET8';

async function getApi(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  }
  const data = await fetch(`http://localhost:5000/api/chain?id=${id}`, requestOptions).catch((error) => console.error(error));
  const result = await data.json()
  const apiKey = result;
  return apiKey;
}

async function getSourseCode(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  }

  const data = await fetch(`http://localhost:5000/api/code?id=${id}`, requestOptions)
    .catch((error) => console.error(error))
  const result = data.json();
  const code = result;
  return code
}

async function checkStatus(chainURI, apiKey, guid) {
  try {
    const resp = await fetch(`//api${chainURI}/api?apikey=` + encodeURIComponent(apiKey) + '&guid=' + guid + '&module=contract&action=checkverifystatus');

    if (!resp.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await resp.json();
    return result.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function verify(chainURI, chainAPI, sourceCode, contractAddress, contractName, constructorHex) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  const urlencoded = new URLSearchParams();
  urlencoded.append("apikey", `${chainAPI}`);
  urlencoded.append("module", "contract");
  urlencoded.append("action", "verifysourcecode");
  urlencoded.append("sourceCode", `${sourceCode}`);
  urlencoded.append("contractaddress", `${contractAddress}`);
  urlencoded.append("codeformat", "solidity-single-file");
  urlencoded.append("contractname", `${contractName}`);
  urlencoded.append("compilerversion", "v0.8.20+commit.a1b79de6");
  urlencoded.append("optimizationUsed", "0");
  urlencoded.append("runs", "200");
  urlencoded.append("constructorArguements", `${constructorHex}`);
  urlencoded.append("evmversion", "paris");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };
  const res = await fetch(`http://api${chainURI}/api`, requestOptions)
    .catch((error) => console.error(error));
  const result = await res.json();
  return result.result;
}

async function encodeData(types, params) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "types": types,
    "params": params
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  const data = await fetch('http://localhost:5000/api/encode', requestOptions).catch((errors) => console.log(errors));
  return await data.json();
}

async function postContract(abiId, addresss, typeId, kindId, chainId) {
  const formdata = new FormData();
  formdata.append("abiId", `${abiId}`);
  formdata.append("address", `${addresss}`);
  formdata.append("typeId", `${typeId}`);
  formdata.append("kindId", `${kindId}`);
  formdata.append("chainId", `${chainId}`)

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:5000/api/contract", requestOptions)
    .catch((error) => console.error(error));
  const data = await response.json();
  return data;
}

async function postContractStaking(abiId, addresss, typeId, kindId, chainId) {
  const formdata = new FormData();
  formdata.append("abiId", `${abiId}`);
  formdata.append("address", `${addresss}`);
  formdata.append("typeId", `${typeId}`);
  formdata.append("kindId", `${kindId}`);
  formdata.append("chainId", `${chainId}`)

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:5000/api/contract", requestOptions)
    .catch((error) => console.error(error));
  const data = await response.json();
  return data;
}

async function postContractNFT(abiId, addresss, metadata, typeId, kindId, chainId) {
  const formdata = new FormData();
  formdata.append("abiId", `${abiId}`);
  formdata.append("address", `${addresss}`);
  formdata.append("meta", `${metadata}`);
  formdata.append("typeId", `${typeId}`);
  formdata.append("kindId", `${kindId}`);
  formdata.append("chainId", `${chainId}`)

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:5000/api/contract/nft", requestOptions)
    .catch((error) => console.error(error));
  const data = await response.json();
  return data;
}

async function registration(address) {
  const formdata = new FormData();
  formdata.append("address", `${address}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };
  let temp = await fetch("http://localhost:5000/api/user/registration", requestOptions)
    .catch((error) => console.error(error));
  const data = await temp.json();
  return data;
}

async function profile(userBascetId, contractId) {
  const formdata = new FormData();
  formdata.append('userBascetId', `${userBascetId}`)
  formdata.append('contractId', `${contractId}`)

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };
  let temp = await fetch("http://localhost:5000/api/profile", requestOptions)
    .catch((error) => console.error(error));

  return temp;
}


async function contract(address, abi, typeId, kindId) {
  const formdata = new FormData();
  formdata.append("address", `${address}`);
  formdata.append("abi", `${abi}`);
  formdata.append("typeId", `${typeId}`);
  formdata.append("kindId", `${kindId}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };
  let temp = await fetch("http://localhost:5000/api/user/contract", requestOptions)
    .catch((error) => console.error(error));
  console.log(temp)
  return temp
}

async function getAbiContract() {
  const formdata = new FormData();
  formdata.append("address", `saasa`);
  const requestOptions = {
    method: 'GET',
    redirect: "follow"
  };

  let temp = await fetch('http://localhost:5000/api/abi?id=1', requestOptions)
    .catch((error) => console.error(error));
  let au = await temp.json();
  console.log(JSON.parse(au.interface))
  return JSON.parse(au.interface);
}











const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNDA4ZjExNC05N2I5LTQ5MjgtOTQ0Yy0wMWFiMzJhZGRiNGMiLCJlbWFpbCI6InBhc3RhZm9ydEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjhkNjhiN2RjMjk4Nzg0ZjA0MzciLCJzY29wZWRLZXlTZWNyZXQiOiJjYmFhNDRmOTljZjI2MTUwYjlmMjYyMmU2MTEzMDc3NzQ2NTU1N2RmYzVjNjU2MGE1YTY4ZDViMTM4NWVkZGFhIiwiaWF0IjoxNzEwNDA0MjMyfQ.jT0kCIxKIaYwrt5Bb0WA2LDtNenFY01RhoUMkFw34PY"
const apiSecret = "cbaa44f99cf26150b9f2622e61130777465557dfc5c6560a5a68d5b1385eddaa"
const currentAddressText = document.getElementById("currentAddressText");
const connectButton = document.getElementById("connectButton");
const flexRadioDefault1 = document.getElementById("flexRadioDefault1")
const flexRadioDefault2 = document.getElementById("flexRadioDefault2")
const erc20MintAmountInput = document.getElementById("erc20MintAmountInput")
const forInflation = document.getElementById("forInflation")
const forDeflation = document.getElementById("forDeflation")
const erc20ConfirmButton = document.getElementById("erc20ConfirmButton")
const contractAddress721 = document.getElementById('contractAddress721');
const erc20ContractText = document.getElementById('erc20ContractText');
const myLink = document.getElementById("linkToHomePage");
const contractAddress1155 = document.getElementById("contractAddress1155");
const contractAddressStaking = document.getElementById("contractAddressStaking");
const tokenAddressInput = document.getElementById("tokenAddressInput");
const rrate = document.getElementById("rateInput");
const StakingConfirmButton = document.getElementById("StakingConfirmButton");
const erc20CancelButton = document.getElementById("erc20CancelButton");
const nftCancelButton1155 = document.getElementById("nftCancelButton1155");
const nftCancelButton721 = document.getElementById("nftCancelButton721");
const StakingCancelButton = document.getElementById("StakingCancelButton");



StakingCancelButton.addEventListener('click', cancelInputs)
nftCancelButton721.addEventListener('click', cancelInputs)
nftCancelButton1155.addEventListener('click', cancelInputs)
erc20CancelButton.addEventListener('click', cancelInputs)
StakingConfirmButton.addEventListener('click', stakingDeployment)
myLink.addEventListener("dblclick", goHome)



const nameInp721 = document.getElementById("nftNameInput721");
const symbolInp721 = document.getElementById("nftSymbolInput721");
const accountToMint721 = document.getElementById("nftAccountInput721");
const desc721 = document.getElementById("nftDescriptionInput721");
const photo721 = document.getElementById("nftPhotoInput721");
const nftConfirmButton721 = document.getElementById("nftConfirmButton721");
nftConfirmButton721.addEventListener('click', autoMeta721Premint)


const fileInput = document.getElementById("nftPhotoInput");
const nameInput = document.getElementById("nftNameInput");
const descriptionInput = document.getElementById("nftDescriptionInput");
const amountToMint = document.getElementById("nftAmountsInput");
const accountToMint = document.getElementById("nftAccountInput");
nftConfirmButton1155.addEventListener('click', autoMeta1155Premint)



erc20ConfirmButton.addEventListener('click', callContract)
flexRadioDefault1.addEventListener('click', getSelectedToken)
flexRadioDefault2.addEventListener('click', getSelectedToken)

connectButton.addEventListener('click', connectWallet)

let web3 = new Web3(window.ethereum);

let userAddress;

const erc20BurnInfAddress = "0xF550C1aca2bE1620209aAa2A625Bf58A828fA609"
const erc20BurnInfAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "BurnableInflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20BurnInfContract = new web3.eth.Contract(erc20BurnInfAbi, erc20BurnInfAddress)

const erc20InfAddress = "0xCe9C810262205AF0F8f384c0b76d05762AaB0991"
const erc20InfAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "InflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20InfContract = new web3.eth.Contract(erc20InfAbi, erc20InfAddress)

const erc20InfAddressMumbai = "0x0Ad6Df8ad9a0BCed2Cd2c9F707fB3FD08378f78F"
const erc20InfAbiMumbai = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "InflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20InfContractMumbai = new web3.eth.Contract(erc20InfAbiMumbai, erc20InfAddressMumbai)

const erc20InfPauseAddress = "0xed5C99A58bC4549EC185bc7b4F027FF529d67DFF"
const erc20InfPauseAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "PausableInflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20InfPauseContract = new web3.eth.Contract(erc20InfPauseAbi, erc20InfPauseAddress)

const erc20InfPauseBurnAddress = "0x0210265B21e138f4516720cdc1353Cb735Afa667"
const erc20InfPauseBurnAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "PausableMintBurnDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20InfPauseBurnContract = new web3.eth.Contract(erc20InfPauseBurnAbi, erc20InfPauseBurnAddress)

const erc20DefBurnAddress = "0xd8936a8EcB761dF90494DFDE4fb57263281F3552"
const erc20DefBurnAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployBurnableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefBurnContract = new web3.eth.Contract(erc20DefBurnAbi, erc20DefBurnAddress)

const erc20infBurnAddresBSC = "0x5113Aa09bb853759D6d877babF7166360AcA8F99"
const erc20infBurnAbiBSC = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "BurnableInflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20infBurnContractBSC = new web3.eth.Contract(erc20infBurnAbiBSC, erc20infBurnAddresBSC)

const erc20defBurnAddresMumbai = "0x35A70A4B15efACbF665Acd0C4f64f0cd93ED3F81"
const erc20defBurnAbiMumbai = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployBurnableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20defBurnContractMumbai = new web3.eth.Contract(erc20defBurnAbiMumbai, erc20defBurnAddresMumbai)

const erc20infPauseAddresBSC = "0x4b6931CE70ebeB1dE655d9C1BE1eB953D86B9136"
const erc20infPausenAbiBSC = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "PausableInflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20infPauseContractBSC = new web3.eth.Contract(erc20infPausenAbiBSC, erc20infPauseAddresBSC)

const erc20infPauseBurnAddresBSC = "0x4306dBDc99CE9c7791FbE2d55F78bB6a203Dd5d8"
const erc20infPauseBurnAbiBSC = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "PausableMintBurnDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20infPauseBurnContractBSC = new web3.eth.Contract(erc20infPauseBurnAbiBSC, erc20infPauseBurnAddresBSC)

const erc20DefPauseAddress = "0xc6aE13C2a14C7Ae83faE3a91e433C24eE1AD406f"
const erc20DefPauseAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployPauseableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefPauseContract = new web3.eth.Contract(erc20DefPauseAbi, erc20DefPauseAddress)

const erc20DefPauseAddressMumbai = "0xD9e3300a00A987e846Ac94C7dE88826E6887FaBd"
const erc20DefPauseAbiMumbai = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployPauseableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefPauseContractMumbai = new web3.eth.Contract(erc20DefPauseAbiMumbai, erc20DefPauseAddressMumbai)


const erc20DefPauseBurnAddress = "0xE7538ba145badf28703bb9e2AA84F2871787f068"
const erc20DefPauseBurnAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployPauseableBurnableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefPauseBurnContract = new web3.eth.Contract(erc20DefPauseBurnAbi, erc20DefPauseBurnAddress)









const erc20DefPauseBurnAddressETH = "0x30d35126D8aCB5a97fFc7f4AfF5b212eEEA72Ec3"
const erc20DefPauseBurnAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployPauseableBurnableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefPauseBurnContractETH = new web3.eth.Contract(erc20DefPauseBurnAbiETH, erc20DefPauseBurnAddressETH)

const erc20DefBurnAddressETH = "0xc66870cb49D9A435ae160199bc43734002Ca7b4c"
const erc20DefBurnAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployBurnableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefBurnContractETH = new web3.eth.Contract(erc20DefBurnAbiETH, erc20DefBurnAddressETH)

const erc20DefPauseAddressETH = "0x45C4473EebFd3A6B7d2510dB9A1Cc9E096b4BBB4"
const erc20DefPauseAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployPauseableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefPauseContractETH = new web3.eth.Contract(erc20DefPauseAbiETH, erc20DefPauseAddressETH)







const erc20infPauseBurnAddresETH = "0x6b1D582E2E5a592d167D0D707B99193D5341C87D"
const erc20infPauseBurnAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "PausableMintBurnDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20infPauseBurnContractETH = new web3.eth.Contract(erc20infPauseBurnAbiETH, erc20infPauseBurnAddresETH)

const erc20infPauseAddresETH = "0x78e00fae6f172b269073d05Ae09E28387f06F174"
const erc20infPauseAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "PausableInflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20infPauseContractETH = new web3.eth.Contract(erc20infPauseAbiETH, erc20infPauseAddresETH)

const erc20infBurnAddresETH = "0xE58c8BF6c032493fdBFDA846dED96C6CEf099209"
const erc20infBurnAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "BurnableInflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20infBurnContractETH = new web3.eth.Contract(erc20infBurnAbiETH, erc20infBurnAddresETH)

const erc20infAddresETH = "0x36DfB44405c04F66FBA39EcF44fC05dD4a7813cC"
const erc20infAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "InflationDeployed", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20infContractETH = new web3.eth.Contract(erc20infAbiETH, erc20infAddresETH)











const erc20DefPauseBurnAddressMumbai = "0x81ea01D01465d669A9968d036a9513A222ACe2f8"
const erc20DefPauseBurnAbiMumbai = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "instance", "type": "address" }], "name": "DeployPauseableBurnableDiflation", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deploy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const erc20DefPauseBurnContractMumbai = new web3.eth.Contract(erc20DefPauseBurnAbiMumbai, erc20DefPauseBurnAddressMumbai)

const eth1155Address = "0x98c8BFf20465A147c65701F0Ee5730A994B821CB";
const eth1155ABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "Deployed_Premint1155", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }, { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deployPremintERC1155", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const eth1155Contract = new web3.eth.Contract(eth1155ABI, eth1155Address);

const eth721Address = "0xd77eC3fDd78608F518Dc482331166da13B301D13";
const eth721ABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "Deployed_Pemint721", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "initialOwner", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "deployPremintERC721", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const eth721Contract = new web3.eth.Contract(eth721ABI, eth721Address);


const mumbai721Address = "0x63E8356236A27dc3256Bb743EE9426e29ccB71fA";
const mumbai721ABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "Deployed_Pemint721", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "initialOwner", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "deployPremintERC721", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const mumbai721Contract = new web3.eth.Contract(mumbai721ABI, mumbai721Address);

const mumbai1155Address = "0x76DeE207321307ad77F804D1d467c26D2d220dD7";
const mumbai1155ABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "Deployed_Premint1155", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }, { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deployPremintERC1155", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const mumbai1155Contract = new web3.eth.Contract(mumbai1155ABI, mumbai1155Address);

const Address721permit = "0x66FBCc33c1C72d06A8F4cc562aC0d5fbC5b03056";
const Abi721permit = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "Deployed_Pemint721", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "initialOwner", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "deployPremintERC721", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const Contract721permit = new web3.eth.Contract(Abi721permit, Address721permit);

const Address1155permit = "0x3858712766e4dDa891ae002ed765ADa9D2f978e6";
const Abi1155permit = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "Deployed_Premint1155", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }, { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "address", "name": "initialOwner", "type": "address" }], "name": "deployPremintERC1155", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const Contract1155permit = new web3.eth.Contract(Abi1155permit, Address1155permit);

const stakingAddress = "0xC34335403c22Aaf0712FB69eB595629089619dB2";
const stakingAbi = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "StakingDeploed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "StakingDeploedV2", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "deployStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "deployStakingV2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const stakingContract = new web3.eth.Contract(stakingAbi, stakingAddress);

const stakingAddressmumbai = "0x2eeFC701c9A83ECBE65985F32820A021034824AE";
const stakingAbimumbai = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "StakingDeploed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "StakingDeploedV2", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "deployStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "deployStakingV2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const stakingContractMumbai = new web3.eth.Contract(stakingAbimumbai, stakingAddressmumbai);

const stakingAddressETH = "0xd5a252610Ba7321A364c3396D97A623D80636795";
const stakingAbiETH = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "StakingDeploed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "StakingDeploedV2", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "deployStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "deployStakingV2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const stakingContractETH = new web3.eth.Contract(stakingAbiETH, stakingAddressETH);




function goHome() {
  myLink.setAttribute("href", "./homePage.html");
  myLink.setAttribute("target", "_blank");
}

async function connectWallet() {
  console.log("test");
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    userAddress = accounts[0];
    console.log(accounts[0]);
    web3 = new Web3(Web3.givenProvider);
    currentAddressText.style.display = "flex";
    var fullAddress = userAddress.toLowerCase();
    console.log(fullAddress);
    var trimmedAddress = trimAddress(fullAddress, 6, 4); // Измените значения для первых и последних символов по вашему усмотрению
    currentAddressText.innerText = trimmedAddress;
    localStorage.setItem('currentAddress', userAddress);
    const a = localStorage.getItem('currentAddress');
    console.log(a);
    connectButton.innerText = ""
    try {
      const response = await registration(fullAddress);
      const bascet = response.bascet.id;
      console.log(bascet);
      sessionStorage.setItem('bascet', `${bascet}`);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("Please install Metamask");
  }
}
function trimAddress(address, startChars, endChars) {
  if (address.length <= startChars + endChars + 3) return address;
  var start = address.substring(0, startChars);
  var end = address.substring(address.length - endChars);
  return start + '...' + end;
}
async function cancelInputs() {
  let namee = document.getElementById("erc20NameInput")
  let amount = document.getElementById("erc20MintAmountInput")
  let symboll = document.getElementById("erc20SymbolInput")

  rrate.value = ''
  tokenAddressInput.value = ''
  amountToMint.value = ''
  accountToMint.value = ''
  accountToMint721.value = ''
  fileInput.value = ''
  photo721.value = ''
  descriptionInput.value = ''
  desc721.value = ''
  nameInp721.value = ''
  nameInput.value = ''
  namee.value = '';
  amount.value = '';
  symboll.value = '';
  console.log('check')
  au = await getAbiContract();
  console.log(au);
}

async function callContract() {
  var selectedToken = document.querySelector('input[name="flexRadioDefault"]:checked');
  let namee = document.getElementById("erc20NameInput");
  let amount = document.getElementById("erc20MintAmountInput")
  let symboll = document.getElementById("erc20SymbolInput");
  var selectedNetwork = document.getElementById('chooseNetwork').value
  if (selectedNetwork == "bsc") {
    if (selectedToken.value == "inf") {
      var selectedVar = document.getElementById('forInflation').value;
      if (selectedVar == "Burn") {
        console.log("burnable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20infBurnContractBSC.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress, gasPrice: '5044200000'
        }).on('receipt', async function (receipt) {
          const deployedContractInfBurn = receipt.events.BurnableInflationDeployed.returnValues[0];
          console.log('ERC-20 burnable type contract was deployed to bsc network at address:', deployedContractInfBurn);
          erc20ContractText.innerText = deployedContractInfBurn
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(2, erc20ContractText.innerText, 2, 2, 1)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(9);
        const apiKey = await getApi(1);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-testnet.bscscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "BurnableInflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 30000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Mint") {
        console.log("mintable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20InfContract.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress, gasPrice: '5044200000'
        }).on('receipt', function (receipt) {
          const deployedContractInf = receipt.events.InflationDeployed.returnValues[0];
          console.log('ERC-20 inflation type contract was deployed to bsc network at address:', deployedContractInf);
          erc20ContractText.innerText = deployedContractInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(1, erc20ContractText.innerText, 2, 1, 1)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(6);
        const apiKey = await getApi(1);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-testnet.bscscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "Inflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Pause") {
        console.log("pausable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20infPauseContractBSC.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress, gasPrice: '5044200000'
        }).on('receipt', function (receipt) {
          const deployedContractPauseInf = receipt.events.PausableInflationDeployed.returnValues[0];
          console.log('ERC-20 Pausable type contract was deployed to bsc network at address:', deployedContractPauseInf);
          erc20ContractText.innerText = deployedContractPauseInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(3, erc20ContractText.innerText, 2, 3, 1)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(8);
        const apiKey = await getApi(1);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-testnet.bscscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableInflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Pause-Burn") {
        console.log("pausable & burnable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20infPauseBurnContractBSC.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress, gasPrice: '5044200000'
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnInf = receipt.events.PausableMintBurnDeployed.returnValues[0];
          console.log('ERC-20 Burnable-Pausable type contract was deployed to bsc network at address:', deployedContractPauseBurnInf);
          erc20ContractText.innerText = deployedContractPauseBurnInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(4, erc20ContractText.innerText, 2, 4, 1)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(7);
        const apiKey = await getApi(1);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-testnet.bscscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableMintBurn",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }



      }

    } else if (selectedToken.value == "def") {
      var selectedVar = document.getElementById('forDeflation').value;
      if (selectedVar == "BurnDef") {
        console.log("burn pause deflation run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefBurnContract.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress, gasPrice: '5044200000'
        }).on('receipt', function (receipt) {
          const deployedContractBurnDef = receipt.events.DeployBurnableDiflation.returnValues[0];
          console.log('ERC-20 Burnable-Pausable type contract was deployed to bsc network at address:', deployedContractBurnDef);
          erc20ContractText.innerText = deployedContractBurnDef
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(5, erc20ContractText.innerText, 2, 5, 1)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);


        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(5);
        const apiKey = await getApi(1);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-testnet.bscscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "BurnableDiflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }


      } else if (selectedVar == "PauseDef") {
        console.log("pause deflation run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefPauseContract.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress, gasPrice: '5044200000'
        }).on('receipt', function (receipt) {
          const deployedContractPauseDef = receipt.events.DeployPauseableDiflation.returnValues[0];
          console.log('ERC-20 Pausable type contract was deployed to bsc network at address:', deployedContractPauseDef);
          erc20ContractText.innerText = deployedContractPauseDef
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(6, erc20ContractText.innerText, 2, 6, 1)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(10);
        const apiKey = await getApi(1);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-testnet.bscscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PauseableDiflation",
              constrArgs
            );
            console.log(res);
            const result = await checkStatus(`-testnet.bscscan.com`, `${apiKey}`, `${res}`);
            alert(result);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Pause-BurnDef") {
        console.log("pause-burn deflation run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x61') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x61' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefPauseBurnContract.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress, gasPrice: '5044200000'
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnDef = receipt.events.DeployPauseableBurnableDiflation.returnValues[0];
          console.log('ERC-20 Burnable-Pausable type contract was deployed to bsc network at address:', deployedContractPauseBurnDef);
          erc20ContractText.innerText = deployedContractPauseBurnDef
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(7, erc20ContractText.innerText, 2, 7, 1)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(4);
        const apiKey = await getApi(1);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-testnet.bscscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableDiflationBurn",
              constrArgs
            );
            console.log(res);
            const result = await checkStatus(`-testnet.bscscan.com`, `${apiKey}`, `${res}`);
            alert(result);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }



      }
    } else {
      alert("выберите вид токенa");
    }
  } else if (selectedNetwork == "polygon") {

    if (selectedToken.value == "inf") {
      var selectedVar = document.getElementById('forInflation').value;

      if (selectedVar == "Burn") {
        console.log("burnable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x13881') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20BurnInfContract.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractInfBurn = receipt.events.BurnableInflationDeployed.returnValues[0];
          console.log('ERC-20 burnable type contract was deployed to mumbai network at address:', deployedContractInfBurn);
          erc20ContractText.innerText = deployedContractInfBurn
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(2, erc20ContractText.innerText, 2, 2, 2)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);


        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(9);
        const apiKey = await getApi(2);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `.polygonscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "BurnableInflation",
              constrArgs
            );
            console.log(res);
            const result = await checkStatus(`.polygonscan.com`, `${apiKey}`, `${res}`);
            alert(result);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }


      } else if (selectedVar == "Pause") {
        console.log("pausable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x13881') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20InfPauseContract.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseInf = receipt.events.PausableInflationDeployed.returnValues[0];
          console.log('ERC-20 Pausable type contract was deployed to mumbai network at address:', deployedContractPauseInf);
          erc20ContractText.innerText = deployedContractPauseInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(3, erc20ContractText.innerText, 2, 3, 2)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(8);
        const apiKey = await getApi(2);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `.polygonscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableInflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Pause-Burn") {
        console.log("pausable & burnable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x13881') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20InfPauseBurnContract.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnInf = receipt.events.PausableMintBurnDeployed.returnValues[0];
          console.log('ERC-20 Burnable-Pausable inflation type contract was deployed to mumbai network at address:', deployedContractPauseBurnInf);
          erc20ContractText.innerText = deployedContractPauseBurnInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(4, erc20ContractText.innerText, 2, 4, 2)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);


        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(7);
        const apiKey = await getApi(2);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `.polygonscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableMintBurn",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }


      } else if (selectedVar == "Mint") {
        console.log("mint run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x13881') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20InfContractMumbai.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnInf = receipt.events.InflationDeployed.returnValues[0];
          console.log('ERC-20 Burnable-Pausable inflation type contract was deployed to mumbai network at address:', deployedContractPauseBurnInf);
          erc20ContractText.innerText = deployedContractPauseBurnInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(1, erc20ContractText.innerText, 2, 1, 2)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(6);
        const apiKey = await getApi(2);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `.polygonscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "Inflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      }
    } else if (selectedToken.value == "def") {
      var selectedVar = document.getElementById('forDeflation').value;

      if (selectedVar == "BurnDef") {
        console.log("burn def run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x13881') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20defBurnContractMumbai.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnInf = receipt.events.DeployBurnableDiflation.returnValues[0];
          console.log('ERC-20 Burnable deflation type contract was deployed to mumbai network at address:', deployedContractPauseBurnInf);
          erc20ContractText.innerText = deployedContractPauseBurnInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(5, erc20ContractText.innerText, 2, 5, 2)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(5);
        const apiKey = await getApi(2);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `.polygonscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "BurnableDiflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "PauseDef") {
        console.log("pause deflation run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x13881') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefPauseContractMumbai.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseDef = receipt.events.DeployPauseableDiflation.returnValues[0];
          console.log('ERC-20 Pausable type contract was deployed to mumbai network at address:', deployedContractPauseDef);
          erc20ContractText.innerText = deployedContractPauseDef
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(6, erc20ContractText.innerText, 2, 6, 2)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(10);
        const apiKey = await getApi(2);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `.polygonscan.com`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PauseableDiflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Pause-BurnDef") {
        console.log("pause-burn deflation run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0x13881') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefPauseBurnContractMumbai.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnDef = receipt.events.DeployPauseableBurnableDiflation.returnValues[0];
          console.log('ERC-20 Burnable-Pausable type contract was deployed to mumbai network at address:', deployedContractPauseBurnDef);
          erc20ContractText.innerText = deployedContractPauseBurnDef
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(7, erc20ContractText.innerText, 2, 7, 2)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);
      }

      const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
      const sourceCode = await getSourseCode(4);
      const apiKey = await getApi(2);
      let canExecute = true
      if (canExecute) {
        canExecute = false;
        setTimeout(async function () {
          canExecute = true;
          const res = await verify(
            `.polygonscan.com`,
            `${apiKey}`,
            sourceCode,
            erc20ContractText.innerText,
            "PausableDiflationBurn",
            constrArgs
          );
          console.log(res);
          setTimeout(async function () {
            const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
            alert(result);
          }, 10000);
        }, 20000);
      } else {
        console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
      }

    }
  } else {
    console.log("выберите вид токенa");
  } if (selectedNetwork == "eth") {
    if (selectedToken.value == "inf") {

      const currentChainId = await window.ethereum.request({ method: 'net_version' });
      if (currentChainId !== '0xaa36a7') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          })
        } catch (error) {
          console.error(error);
        }
      }

      var selectedVar = document.getElementById('forInflation').value;
      if (selectedVar == "Burn") {
        console.log("burnable run")
        await erc20infBurnContractETH.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractInfBurn = receipt.events.BurnableInflationDeployed.returnValues[0];
          console.log('ERC-20 burnable type contract was deployed to eth network at address:', deployedContractInfBurn);
          erc20ContractText.innerText = deployedContractInfBurn
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(2, erc20ContractText.innerText, 2, 2, 3)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(9);
        const apiKey = await getApi(3);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-sepolia.etherscan.io`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "BurnableInflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }



      } else if (selectedVar == "Pause") {
        onsole.log("pausable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0xaa36a7') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20infPauseContractETH.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseInf = receipt.events.PausableInflationDeployed.returnValues[0];
          console.log('ERC-20 Pausable type contract was deployed to eth network at address:', deployedContractPauseInf);
          erc20ContractText.innerText = deployedContractPauseInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(3, erc20ContractText.innerText, 2, 3, 3)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(8);
        const apiKey = await getApi(3);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-sepolia.etherscan.io`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableInflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 30000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Pause-Burn") {
        console.log("pausable & burnable run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0xaa36a7') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20infPauseBurnContractETH.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnInf = receipt.events.PausableMintBurnDeployed.returnValues[0];
          console.log('ERC-20 Burnable-Pausable inflation type contract was deployed to eth network at address:', deployedContractPauseBurnInf);
          erc20ContractText.innerText = deployedContractPauseBurnInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(4, erc20ContractText.innerText, 2, 4, 3)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(7);
        const apiKey = await getApi(3);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-sepolia.etherscan.io`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableMintBurn",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 30000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Mint") {
        console.log("mint run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0xaa36a7') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20infContractETH.methods.deploy(namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnInf = receipt.events.InflationDeployed.returnValues[0];
          console.log('ERC-20 inflation type contract was deployed to eth network at address:', deployedContractPauseBurnInf);
          erc20ContractText.innerText = deployedContractPauseBurnInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(1, erc20ContractText.innerText, 2, 1, 3)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["string", "string", "address"], [`${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(6);
        const apiKey = await getApi(3);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-sepolia.etherscan.io`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "Inflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 20000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      }
    } else if (selectedToken.value == "def") {
      var selectedVar = document.getElementById('forDeflation').value;
      if (selectedVar == "BurnDef") {
        console.log("burn def run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0xaa36a7') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefBurnContractETH.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnInf = receipt.events.DeployBurnableDiflation.returnValues[0];
          console.log('ERC-20 Burnable deflation type contract was deployed to eth network at address:', deployedContractPauseBurnInf);
          erc20ContractText.innerText = deployedContractPauseBurnInf
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(5, erc20ContractText.innerText, 2, 5, 3)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(5);
        const apiKey = await getApi(3);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-sepolia.etherscan.io`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "BurnableDiflation",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 30000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "PauseDef") {
        console.log("pause deflation run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0xaa36a7') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefPauseContractETH.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseDef = receipt.events.DeployPauseableDiflation.returnValues[0];
          console.log('ERC-20 Pausable type contract was deployed to eth network at address:', deployedContractPauseDef);
          erc20ContractText.innerText = deployedContractPauseDef
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(6, erc20ContractText.innerText, 2, 6, 3)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);

        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(10);
        const apiKey = await getApi(3);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-sepolia.etherscan.io`,
              `${apiKey}`,
              sourceCode,
              contractAddressStaking.innerText,
              "PausableDiflationBurn",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 30000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }

      } else if (selectedVar == "Pause-BurnDef") {
        console.log("pause-burn deflation run")

        const currentChainId = await window.ethereum.request({ method: 'net_version' });
        if (currentChainId !== '0xaa36a7') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }],
            })
          } catch (error) {
            console.error(error);
          }
        }

        await erc20DefPauseBurnContractETH.methods.deploy(amount.value, namee.value, symboll.value, userAddress).send({
          from: userAddress
        }).on('receipt', function (receipt) {
          const deployedContractPauseBurnDef = receipt.events.DeployPauseableBurnableDiflation.returnValues[0];
          console.log('ERC-20 Burnable-Pausable type contract was deployed to eth network at address:', deployedContractPauseBurnDef);
          erc20ContractText.innerText = deployedContractPauseBurnDef
          erc20ContractText.style.display = "flex"
        })
        const resp = await postContract(7, erc20ContractText.innerText, 2, 7, 3)
        console.log(resp);
        const bascetId = sessionStorage.getItem('bascet')
        const succes = await profile(bascetId, resp);
        console.log(`Contract create whith succes: ${succes}`);
        const constrArgs = await encodeData(["uint", "string", "string", "address"], [`${amount.value}`, `${namee.value}`, `${symboll.value}`, `${userAddress}`]);
        const sourceCode = await getSourseCode(4);
        const apiKey = await getApi(3);
        let canExecute = true
        if (canExecute) {
          canExecute = false;
          setTimeout(async function () {
            canExecute = true;
            const res = await verify(
              `-sepolia.etherscan.io`,
              `${apiKey}`,
              sourceCode,
              erc20ContractText.innerText,
              "PausableDiflationBurn",
              constrArgs
            );
            console.log(res);
            setTimeout(async function () {
              const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
              alert(result);
            }, 10000);
          }, 30000);
        } else {
          console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
        }
      }
    }
  } else {
    console.log("Solana doesnt work well now")
  }
}





function getTokenVariableInf() {
  var selectedVar = document.getElementById('forInflation').value;
  if (selectedVar == "Please, choose one") {
    console.log("выберите токен!")
  } else {
    console.log("Выбранный вид токена: " + selectedVar);
  }
}
// setInterval(getTokenVariableDef, 5000)


function getTokenVariableDef() {
  var selectedVar = document.getElementById('forDeflation').value;
  if (selectedVar == "Please, choose one") {
    console.log("выберите токен!")
  } else {
    console.log("Выбранный вид токена: " + selectedVar);
  }
}
function getSelectedToken() {
  var selectedToken = document.querySelector('input[name="flexRadioDefault"]:checked');
  if (selectedToken) {
    console.log("Выбранный токен: " + selectedToken.value);

  } else {
    console.log("Выберите токен, пожалуйста.");
  }
  if (selectedToken.value == "inf") {
    forInflation.style.display = "flex"
    forDeflation.style.display = "none"
    erc20MintAmountInput.style.display = "none"

  }
  if (selectedToken.value == "def") {
    forInflation.style.display = "none"
    forDeflation.style.display = "flex"
    erc20MintAmountInput.style.display = "flex"
  }
}
async function autoMeta721Premint() {
  let name = nameInp721.value;
  let symbolNFT = symbolInp721.value;
  let acc721 = accountToMint721.value;
  let description = desc721.value;
  let file = photo721.files[0];
  var selectedNetwork = document.getElementById('chooseNetwork').value

  if (selectedNetwork == "bsc") {
    if (file && name && description && symbolNFT && acc721) {
      const fileData = new FormData();
      fileData.append('file', file);
      console.log("BSC")
      try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          body: fileData,
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
          const cid = data.IpfsHash;
          const meta = await uploadMetadata(cid, name, description);
          alert(`Готово, ваш ipfs https://ipfs.io/ipfs/${data.IpfsHash}`)
          await deploy721Mint(userAddress, name, symbolNFT, acc721, meta, `https://ipfs.io/ipfs/${data.IpfsHash}`)
        } else {
          console.error('Failed to upload file.');
          alert("Не получилось загрузить файл")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Please select file and enter name/description.');
      alert("Введите данные")
    }
  } else if (selectedNetwork == "polygon") {
    if (file && name && description && symbolNFT && acc721) {
      const fileData = new FormData();
      fileData.append('file', file);
      console.log("mumbai")

      try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          body: fileData,
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
          const cid = data.IpfsHash;
          const meta = await uploadMetadata(cid, name, description);
          alert(`Готово, ваш ipfs https://ipfs.io/ipfs/${data.IpfsHash}`)
          await deploy721Mumbai(userAddress, name, symbolNFT, acc721, meta, `https://ipfs.io/ipfs/${data.IpfsHash}`)
        } else {
          console.error('Failed to upload file.');
          alert("Не получилось загрузить файл")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Please select file and enter name/description.');
      alert("Введите данные")
    }
  } else if (selectedNetwork == "eth") {
    if (file && name && description && symbolNFT && acc721) {
      const fileData = new FormData();
      fileData.append('file', file);
      console.log("sepolia")

      try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          body: fileData,
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
          const cid = data.IpfsHash;
          const meta = await uploadMetadata(cid, name, description);
          alert(`Готово, ваш ipfs https://ipfs.io/ipfs/${data.IpfsHash}`)
          await deploy721MintETH(userAddress, name, symbolNFT, acc721, meta, `https://ipfs.io/ipfs/${data.IpfsHash}`)
        } else {
          console.error('Failed to upload file.');
          alert("Не получилось загрузить файл")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Please select file and enter name/description.');
      alert("Введите данные")
    }
  } else {
    console.log("Choose network that we provide")
  }


}

async function uploadMetadata(imageCID, name, description) {
  const metadata = JSON.stringify({
    name: name,
    description: description,
    image: `https://ipfs.io/ipfs/${imageCID}`
  });

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      body: metadata,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Metadata uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
      metaUri = `https://ipfs.io/ipfs/${data.IpfsHash}`;

      return metaUri
    } else {
      console.error('Failed to upload metadata.');
    }
  } catch (error) {
    console.error('Error uploading metadata:', error);
  }
}
async function stakingDeployment() {
  var selectedNetwork = document.getElementById('chooseNetwork').value

  if (selectedNetwork == "bsc") {
    await stakingDeploy();
  } else if (selectedNetwork == "polygon") {
    await stakingDeployMumbai();
  } else if (selectedNetwork == "eth") {
    await stakingDeployEth();
  }
}
async function autoMeta1155Premint() {
  let file = fileInput.files[0];
  let name = nameInput.value;
  let description = descriptionInput.value;
  let amountTo = amountToMint.value;
  let accountTo = accountToMint.value;
  var selectedNetwork = document.getElementById('chooseNetwork').value


  if (selectedNetwork == "bsc") {
    if (file && name && description && amountTo && accountTo) {
      const fileData = new FormData();
      fileData.append('file', file);
      console.log("BSC")

      try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          body: fileData,
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
          const cid = data.IpfsHash;
          const meta = await uploadMetadata(cid, name, description);

          alert(`Готово, ваш ipfs https://ipfs.io/ipfs/${data.IpfsHash}`)
          await deploy1155Mint(`https://ipfs.io/ipfs/${data.IpfsHash}`, meta, accountTo, amountTo, userAddress)


        } else {
          console.error('Failed to upload file.');
          alert("Не получилось загрузить файл")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Please select file and enter name/description.');
      alert("Введите данные")
    }
  } else if (selectedNetwork == "polygon") {
    if (file && name && description && amountTo && accountTo) {
      const fileData = new FormData();
      fileData.append('file', file);
      console.log("mumbai")

      try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          body: fileData,
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
          const cid = data.IpfsHash;
          const meta = await uploadMetadata(cid, name, description);

          alert(`Готово, ваш ipfs https://ipfs.io/ipfs/${data.IpfsHash}`)
          await deploy1155Mumbai(`https://ipfs.io/ipfs/${data.IpfsHash}`, meta, accountTo, amountTo, userAddress)


        } else {
          console.error('Failed to upload file.');
          alert("Не получилось загрузить файл")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Please select file and enter name/description.');
      alert("Введите данные")
    }
  } else if (selectedNetwork == "eth") {
    if (file && name && description && amountTo && accountTo) {
      const fileData = new FormData();
      fileData.append('file', file);
      console.log("sepolia")

      try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          body: fileData,
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
          const cid = data.IpfsHash;
          const meta = await uploadMetadata(cid, name, description);

          alert(`Готово, ваш ipfs https://ipfs.io/ipfs/${data.IpfsHash}`)
          await deploy1155eth(`https://ipfs.io/ipfs/${data.IpfsHash}`, meta, accountTo, amountTo, userAddress)


        } else {
          console.error('Failed to upload file.');
          alert("Не получилось загрузить файл")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Please select file and enter name/description.');
      alert("Введите данные")
    }
  } else {
    console.log("choose network that we provide")
  }

}




async function deploy721Mint(initOwner, _name, _symbol, accountToM, uri, meta) {

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0x61') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await Contract721permit.methods.deployPremintERC721(initOwner, _name, _symbol, accountToM, uri).send({
    from: userAddress, gasPrice: '5044200000'
  }).on('receipt', function (receipt) {
    const deployedContractAddress721mint = receipt.events.Deployed_Pemint721.returnValues[0];
    console.log('ERC721 contract deployed at address:', deployedContractAddress721mint);
    contractAddress721.innerText = deployedContractAddress721mint
    contractAddress721.style.display = "flex"
  })
  console.log(`your metaa: ${meta}`);
  const resp = await postContractNFT(9, contractAddress721.innerText, meta, 1, 9, 1)
  console.log(resp);
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["address", "string", "string", "address", "string"], [`${initOwner}`, `${_name}`, `${_symbol}`, `${accountToM}`, `${uri}`]);
  const sourceCode = await getSourseCode(3);
  const apiKey = await getApi(1);
  let canExecute = true
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `-testnet.bscscan.com`,
        `${apiKey}`,
        sourceCode,
        contractAddress721.innerText,
        "Premint721",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);
    }, 40000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }
}
async function deploy721MintETH(initOwner, _name, _symbol, accountToM, uri, meta) {

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0xaa36a7') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await eth721Contract.methods.deployPremintERC721(initOwner, _name, _symbol, accountToM, uri).send({
    from: userAddress
  }).on('receipt', function (receipt) {
    const deployedContractAddress721mint = receipt.events.Deployed_Pemint721.returnValues[0];
    console.log('ERC721 contract deployed at address:', deployedContractAddress721mint);
    contractAddress721.innerText = deployedContractAddress721mint
    contractAddress721.style.display = "flex"
  })
  const resp = await postContractNFT(9, contractAddress721.innerText, meta, 1, 9, 1)
  console.log(resp);
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["address", "string", "string", "address", "string"], [`${initOwner}`, `${_name}`, `${_symbol}`, `${accountToM}`, `${uri}`]);
  console.log(constrArgs)
  const sourceCode = await getSourseCode(3);
  const apiKey = await getApi(3);
  let canExecute = true
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `-sepolia.etherscan.io`,
        `${apiKey}`,
        sourceCode,
        contractAddress721.innerText,
        "Premint721",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);
    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }
}

async function deploy721Mumbai(initOwner, _name, _symbol, accountToM, uri, meta) {

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0x13881') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await mumbai721Contract.methods.deployPremintERC721(initOwner, _name, _symbol, accountToM, uri).send({
    from: userAddress
  }).on('receipt', function (receipt) {
    const deployedContractAddress721mint = receipt.events.Deployed_Pemint721.returnValues[0];
    console.log('ERC721 contract deployed at address:', deployedContractAddress721mint);
    contractAddress721.innerText = deployedContractAddress721mint
    contractAddress721.style.display = "flex"
  })
  const resp = await postContractNFT(9, contractAddress721.innerText, meta, 1, 9, 2)
  console.log(resp);
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["address", "string", "string", "address", "string"], [`${initOwner}`, `${_name}`, `${_symbol}`, `${accountToM}`, `${uri}`]);
  const sourceCode = await getSourseCode(3);
  const apiKey = await getApi(2);
  let canExecute = true
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `.polygonscan.com`,
        `${apiKey}`,
        sourceCode,
        contractAddress721.innerText,
        "Premint721",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);
    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }

}

const deployedContractAddress1155mint = "";
async function deploy1155Mint(meta, uri, accountToM, amountToM, ownerAddress) {

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0x61') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await Contract1155permit.methods.deployPremintERC1155(uri, accountToM, "0", amountToM, "0x0", ownerAddress).send({
    from: userAddress, gasPrice: '5044200000'
  }).on('receipt', function (receipt) {
    const deployedContractAddress1155mint = receipt.events.Deployed_Premint1155.returnValues[0];
    console.log('NFT contract deployed at address:', deployedContractAddress1155mint);
    contractAddress1155.innerText = deployedContractAddress1155mint
    contractAddress1155.style.display = "flex"

  })
  const resp = await postContractNFT(8, contractAddress1155.innerText, meta, 1, 8, 2)

  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["string", "address", "uint", "uint", "bytes", "address"], [`${uri}`, `${accountToM}`, `0`, `${amountToM}`, `0x`, `${ownerAddress}`]);
  const sourceCode = await getSourseCode(2);
  const apiKey = await getApi(1);
  let canExecute = true
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `-testnet.bscscan.com`,
        `${apiKey}`,
        sourceCode,
        contractAddress1155.innerText,
        "PremintMult",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);
    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }

}
async function deploy1155eth(meta, uri, accountToM, amountToM, ownerAddress) {

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0xaa36a7') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await eth1155Contract.methods.deployPremintERC1155(uri, accountToM, "0", amountToM, "0x", ownerAddress).send({
    from: userAddress
  }).on('receipt', function (receipt) {
    const deployedContractAddress1155mint = receipt.events.Deployed_Premint1155.returnValues[0];
    console.log('NFT contract deployed at address:', deployedContractAddress1155mint);
    contractAddress1155.innerText = deployedContractAddress1155mint
    contractAddress1155.style.display = "flex"

  })
  const resp = await postContractNFT(8, contractAddress1155.innerText, meta, 1, 8, 3)
  console.log(resp);
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["string", "address", "uint", "uint", "bytes", "address"], [`${uri}`, `${accountToM}`, `0`, `${amountToM}`, `0x`, `${ownerAddress}`]);
  console.log(constrArgs);
  const sourceCode = await getSourseCode(2);
  const apiKey = await getApi(3);
  let canExecute = true
  let res
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      res = await verify(
        `-sepolia.etherscan.io`,
        `${apiKey}`,
        sourceCode,
        contractAddress1155.innerText,
        "PremintMult",
        constrArgs
      );
      console.log(res);

      if (canExecute) {
        canExecute = false;
        setTimeout(async function () {
          canExecute = true
          const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
          alert(result);
        }, 10000);
      } else {
        console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
      }
    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }
}

async function deploy1155Mumbai(meta, uri, accountToM, amountToM, ownerAddress) {

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0x13881') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await mumbai1155Contract.methods.deployPremintERC1155(uri, accountToM, "0", amountToM, "0x", ownerAddress).send({
    from: userAddress
  }).on('receipt', function (receipt) {
    const deployedContractAddress1155mint = receipt.events.Deployed_Premint1155.returnValues[0];
    console.log('NFT contract deployed at address:', deployedContractAddress1155mint);
    contractAddress1155.innerText = deployedContractAddress1155mint
    contractAddress1155.style.display = "flex"

  })
  const resp = await postContractNFT(8, contractAddress1155.innerText, meta, 1, 8, 3)
  console.log(resp);
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["string", "address", "uint", "uint", "bytes", "address"], [`${uri}`, `${accountToM}`, `0`, `${amountToM}`, `0x`, `${ownerAddress}`]);
  const sourceCode = await getSourseCode(2);
  const apiKey = await getApi(2);
  let canExecute = true
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `.polygonscan.com`,
        `${apiKey}`,
        sourceCode,
        contractAddress1155.innerText,
        "PremintMult",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);
    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }
}


async function stakingDeploy() {
  console.log()
  let ratee = rrate.value
  let dot = ratee.replace(/,/g, '.')
  let last = dot * 139
  let rate = Math.floor(last)
  let tAddress = tokenAddressInput.value;
  let alertPercent = 100 * 720 * rate / 10000000
  alert(`Процентная ставка в месяц составит: ${alertPercent} % в месяц`)
  console.log("staking deployed at bsc network", "rate:", rate)

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0x61') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await stakingContract.methods.deployStaking(tAddress, rate).send({
    from: userAddress, gasPrice: '5044200000'
  }).on('receipt', function (receipt) {
    const deployedContractStakingAddress = receipt.events.StakingDeploed.returnValues[0];
    console.log('staking contract deployed at address:', deployedContractStakingAddress);
    contractAddressStaking.innerText = deployedContractStakingAddress
    contractAddressStaking.style.display = "flex"
  })
  const resp = await postContractStaking(10, contractAddressStaking.innerText, 3, 10, 1)
  console.log(resp);
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["address", "uint"], [`${tAddress}`, `${rate}`]);
  const sourceCode = await getSourseCode(1);
  const apiKey = await getApi(1);
  let canExecute = true
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `-testnet.bscscan.com`,
        `${apiKey}`,
        sourceCode,
        contractAddressStaking.innerText,
        "Staking",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);
    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }
}

async function stakingDeployMumbai() {
  let ratee = rrate.value
  let dot = ratee.replace(/,/g, '.')
  let last = dot * 139
  let rate = Math.floor(last)
  let tAddress = tokenAddressInput.value;
  let alertPercent = 100 * 720 * rate / 10000000
  alert(`Процентная ставка в месяц составит: ${alertPercent} % в месяц`)
  console.log("staking deployed at mumbai network", "rate:", rate)

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0x13881') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await stakingContractMumbai.methods.deployStaking(tAddress, rate).send({
    from: userAddress
  }).on('receipt', function (receipt) {
    const deployedContractStakingAddress = receipt.events.StakingDeploed.returnValues[0];
    console.log('staking contract deployed at address:', deployedContractStakingAddress);
    contractAddressStaking.innerText = deployedContractStakingAddress
    contractAddressStaking.style.display = "flex"
  })
  const resp = await postContractStaking(10, contractAddressStaking.innerText, 3, 10, 2)
  console.log(resp);
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["address", "uint"], [`${tAddress}`, `${rate}`]);
  const sourceCode = await getSourseCode(1);
  const apiKey = await getApi(2);
  let canExecute = true
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `.polygonscan.com`,
        `${apiKey}`,
        sourceCode,
        contractAddressStaking.innerText,
        "Staking",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);
    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }
}

async function stakingDeployEth() {
  let ratee = rrate.value
  let dot = ratee.replace(/,/g, '.')
  let last = dot * 139
  let rate = Math.floor(last)
  let tAddress = tokenAddressInput.value;
  let alertPercent = 100 * 720 * rate / 10000000
  alert(`Процентная ставка в месяц составит: ${alertPercent} % в месяц`)
  console.log("staking deployed at sepoliaETH network", "rate:", rate)

  const currentChainId = await window.ethereum.request({ method: 'net_version' });
  if (currentChainId !== '0xaa36a7') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      })
    } catch (error) {
      console.error(error);
    }
  }

  await stakingContractETH.methods.deployStaking(tAddress, rate).send({
    from: userAddress
  }).on('receipt', function (receipt) {
    const deployedContractStakingAddress = receipt.events.StakingDeploed.returnValues[0];
    console.log('staking contract deployed at address:', deployedContractStakingAddress);
    contractAddressStaking.innerText = deployedContractStakingAddress
    contractAddressStaking.style.display = "flex"
  })
  const resp = await postContractStaking(10, contractAddressStaking.innerText, 3, 10, 3)
  console.log(resp);
  let canExecute = true
  const bascetId = sessionStorage.getItem('bascet')
  const succes = await profile(bascetId, resp);
  console.log(`Contract create whith succes: ${succes}`);
  const constrArgs = await encodeData(["address", "uint"], [`${tAddress}`, `${rate}`]);
  const sourceCode = await getSourseCode(1);
  const apiKey = await getApi(3);
  if (canExecute) {
    canExecute = false;
    setTimeout(async function () {
      canExecute = true;
      const res = await verify(
        `-sepolia.etherscan.io`,
        `${apiKey}`,
        sourceCode,
        contractAddressStaking.innerText,
        "Staking",
        constrArgs
      );
      console.log(res);
      setTimeout(async function () {
        const result = await checkStatus(`-sepolia.etherscan.io`, `${apiKey}`, `${res}`);
        alert(result);
      }, 10000);

    }, 30000);
  } else {
    console.log("Функция verifyETH будет выполнена через 30 секунд после завершения предыдущей");
  }

}
