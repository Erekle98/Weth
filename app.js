let provider = window.ethereum;
const web3 = new Web3(provider);

const wethAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
const wethAbi = [
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deposit",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "wad", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const wethContract = new web3.eth.Contract(wethAbi, wethAddress);

const getBalance = async () => {
  provider.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  let balance = await wethContract.methods.balanceOf(account).call();
  balance = web3.utils.fromWei(balance, "ether");
  return balance;
};

const showBalance = async () => {
  const balance = await getBalance();
  document.getElementById("balance").innerHTML = balance;
};

showBalance();

getBalance();

const deposit = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const depositInput = document.getElementById("deposit-input");

  console.log(depositInput.value);
  await wethContract.methods.deposit().send({ from: account, value: web3.utils.toWei(depositInput.value, "ether") });
  console.log("deposit done");
};

const depositBtn = document.getElementById("deposit-btn");

depositBtn.addEventListener("click", deposit);

const withdraw = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const withdrawInput = document.getElementById("withdraw-input");

  console.log(withdrawInput.value);
  await wethContract.methods.withdraw(web3.utils.toWei(withdrawInput.value, "ether")).send({ from: account });
  console.log("Done");
};

const withdrawBtn = document.getElementById("withdraw-btn");
withdrawBtn.addEventListener("click", withdraw);

const transfer = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const transferToInput = document.getElementById("transfer-to");
  const transferValueInput = document.getElementById("transfer-qty");

  console.log(transferToInput.value);
  console.log(transferValueInput.value);

  await wethContract.methods
    .transfer(transferToInput.value, web3.utils.toWei(transferValueInput.value, "ether"))
    .send({ from: account });
  console.log("Done");
};

const transferBtn = document.getElementById("transfer-btn");
transferBtn.addEventListener("click", transfer);
