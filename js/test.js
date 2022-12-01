// 白名单js测试

const http = require("http");
const fs = require("fs");
const Web3 = require("web3");

// 设置ip和端口号
const ip = "127.0.0.1";
const port = 8090;

// 导入abi
const abiFile = 'abis/whiteListAbi.json';
let abi = JSON.parse(fs.readFileSync(abiFile, 'utf-8'));

// 设置web3 Provider (用的infura)
const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/9e1274630fa44c6899e12778aafa5a10"));
// 设置合约地址
const whiteListAddr = "0xd63b6E4ECcD4bd83d5B391DE9621FedD2be385ec";
// 合约实例化
// const contract = new web3.eth.Contract(abi, storage);
const contract = new web3.eth.Contract(abi, whiteListAddr);

// 本地服务器
const server = http.createServer((request, response) => {
    // console.log(request.url, request.method);
    response.end("Welcome to Web3!");
});
// 服务器监听
server.listen(port, ip, ()=>{
    console.log(`Server is running at http://${ip}:${port}`);
    // contract.methods.getList().call({from:"0xA738f13354ADaf4969aE7e8C8E5a975eee20a4A9"}).then(console.log);
    console.log(contract.methods.getList().call());
});

// 测试本地账户
web3.eth.getAccounts().then(console.log);
