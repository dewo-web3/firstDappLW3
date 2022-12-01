// 传入abi
const a = $.ajax({
    // url: "abis/getSetAbi.json",
    url: "abis/whiteListAbi.json",
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
        // console.log("请求成功");
    },
    error: function() {
        console.log("请求失败");
    }
});

const abi = $.parseJSON(a.responseText);
// console.log(abi);
// const contractAddress = "0xd4498Cc2175739a992cE192264B63B096A82D886";
const contractAddress = "0xd63b6E4ECcD4bd83d5B391DE9621FedD2be385ec";
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

let myContract;
let signer;

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        myContract = new ethers.Contract(contractAddress, abi, signer);
    });
});

async function getNum() {
    const getNumPromise = myContract.retrieve();
    const num = await getNumPromise;
    document.getElementById("num").value = num;
}

async function setNum() {
    const num = document.getElementById("num").value;
    const setNumPromise = myContract.store(num);
    await setNumPromise;
}

async function getMem() {
    const address = document.getElementById("address").value;
    const getMemPromise = myContract.getMem(address);
    const num = await getMemPromise;
    document.getElementById("num").value = num;
}

async function setMem() {
    const address = document.getElementById("address").value;
    const num = document.getElementById("num").value;
    const setMemPromise = myContract.setMem(address, num);
    await setMemPromise;
}

async function getList() {
    const getNumPromise = myContract.getList();
    const list = await getNumPromise;
    document.getElementById("list").value = list;
}