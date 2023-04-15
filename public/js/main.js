const web3 = new Web3(window.ethereum);
tronWeb = window.tronWeb;
var accountAddress="";
var mintPrice="";
var tokenAddress="TXtKws8Ag4cMfTt5QALN8k9duMTufv6tUx";

var decimals=18

async function connectWallet(){
    try{
        if(!tronLink){
            alert("Install Tronlink")
            return
        }
        await tronLink.request({method: 'tron_requestAccounts'})
        var currentaddress = window.tronWeb.defaultAddress.base58
        accountAddress=currentaddress;
        
        w=document.getElementsByClassName("wallet")
        if(accountAddress!=""){
            w[0].innerText= accountAddress.slice(0,7)+"...";
            w[1].innerText= accountAddress.slice(0,7)+"...";
            w[0].onclick=disconnectWallet;
            w[1].onclick=disconnectWallet;
        }
        
        return currentaddress
    }
    catch(err){
        alert(err.message)
        w=document.getElementsByClassName("wallet")
        
        w[0].innerText= "Login";
        w[1].innerText= "Login";
        w[0].onclick=connectWallet;
        w[1].onclick=connectWallet;
        return null;
    }
}

async function disconnectWallet(wallet){
    try{
        if(!confirm("Disconnect Wallet"));
        await tronWeb.eth.currentProvider.disconnect()
        accountAddress=""
        
        w=document.getElementsByClassName("wallet")
        
        w[0].innerText= "Login";
        w[1].innerText= "Login";
        w[0].onclick=connectWallet;
        w[1].onclick=connectWallet;
    
        alert("Wallet disconnected successfully")
    }
    catch(err){alert(err.message)};

}

async function _mint(tokenURI){
    let contract = await tronWeb.contract().at(tokenAddress);
    let result = await contract.mint(tokenURI).send();
    if(result){
        alert("NFT Minted Successfully");
    }else{
        alert("Error");
    }
    window.location.href="/"
}

async function loadData(){
    let contract = await tronWeb.contract().at(tokenAddress);
    let result = await contract.totalSupply().call();
    for (j=result;j>0;j--){
			try{
			let uri= await contract.tokenURI(j).call();
			console.log(uri)
            let res= await fetch(uri,{method:'GET'});
            let metadata= await res.json()
            var data={}
            console.log(metadata)
            data["NFT-Token-Address"]=tokens[i].tokenId
            data["NFT-Token-ID"]=tokenId;
            data["NFT-name"]=metadata.name;
            data["NFT-desc"]=metadata.description;
            data["NFT-Img-Src"]=metadata.image;
            console.log(i)
            const template = document.querySelector('template')
            str=template.innerHTML
            for(k in data){
            var str=str.replace('{{'+k+'}}',data[k])
            }
            const grid=document.getElementById("collection-grid")
            grid.innerHTML =  grid.innerHTML +str
		}catch(err){
            
		continue
		}
    }
}