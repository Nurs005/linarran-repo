async function getAllContracts() { 
    const formData = new FormData(); 
    const requestOptions = { 
        method: "GET", 
        redirect: "follow" 
    }; 
    try { 
        const response = await fetch(`http://localhost:5000/api/user/auth?address=${userAddress}`, requestOptions); 
        if (!response.ok) { 
            throw new Error('responce is not ok') 
        } 
        const result = await response.json(); 
        return result; 
    } catch (error) { 
        console.error(error) 
    } 
 
}

async function authAddress(address) { 
    const formData = new FormData(); 
    const requestOptions = { 
        method: "GET", 
        redirect: "follow" 
    }; 
    try { 
        const response = await fetch(`http://localhost:5000/api/user/auth?address=${address}`, requestOptions); 
        if (!response.ok) { 
            throw new Error('responce is not ok') 
        } 
        const result = await response.json(); 
        return result; 
    } catch (error) { 
        console.error(error) 
    }
}




async function typeId(typeId) { 
    const formData = new FormData(); 
    const requestOptions = { 
        method: "GET", 
        redirect: "follow" 
    }; 
    try { 
        const response = await fetch(`http://localhost:5000/api/user/type?id=${typeId}`, requestOptions); 
        if (!response.ok) { 
            throw new Error('responce is not ok') 
        } 
        const result = await response.json(); 
        return result; 
    } catch (error) { 
        console.error(error) 
    } 
 
}

async function kindId(kindId) { 
    const formData = new FormData(); 
    const requestOptions = { 
        method: "GET", 
        redirect: "follow" 
    }; 
    try { 
        const response = await fetch(`http://localhost:5000/api/user/kind?id=${kindId}`, requestOptions); 
        if (!response.ok) { 
            throw new Error('responce is not ok') 
        } 
        const result = await response.json(); 
        return result; 
    } catch (error) { 
        console.error(error) 
    } 
 
}

async function contractId(contractId) { 
    const formData = new FormData(); 
    const requestOptions = { 
        method: "GET", 
        redirect: "follow" 
    }; 
    try { 
        const response = await fetch(`http://localhost:5000/api/user/contract?id=${contractId}`, requestOptions); 
        if (!response.ok) { 
            throw new Error('responce is not ok') 
        } 
        const result = await response.json(); 
        return result; 
    } catch (error) { 
        console.error(error) 
    } 
 
}

async function contractNFTId(contractNFTId) { 
    const formData = new FormData(); 
    const requestOptions = { 
        method: "GET", 
        redirect: "follow" 
    }; 
    try { 
        const response = await fetch(`http://localhost:5000/api/user/contract?nftId=${contractNFTId}`, requestOptions); 
        if (!response.ok) { 
            throw new Error('responce is not ok') 
        } 
        const result = await response.json(); 
        return result; 
    } catch (error) { 
        console.error(error) 
    } 
 
}
async function btns(abis, address) {
    // начало inflation erc20
    if(mintTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async()=>{
            const erc20Mint = new web3.eth.Contract(abis, address);
            await  erc20Mint.methods.mint(InpAccountInf.value, InpMintInf.value).send({from: userAddress});
            alert("Successfully minted!");

        })
        console.log('Inflation erc-20 mint')
    } else if(burnTextInf.style.display == "flex"){
        document.getElementById('modalBtnBurn20').addEventListener('click', async()=>{
            const erc20burn = new web3.eth.Contract(abis, address);
            // await  erc20burn.methods.mint(InpAccountInf.value, InpBurnInf.value).send({from: userAddress});
            await  erc20burn.methods.burn(InpAccountInf.value, InpBurnInf.value).send({from: userAddress});
            alert("Successfully burned!");
            console.log('Inflation erc-20 burn')
        })
    } else if(pauseTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener( 'click' , async () => {
        const erc20pause = new web3.eth.Contract(abis, address);
        if(confirm('Are you sure to pause the token?')){
        await  erc20pause.methods.pause().send({from: userAddress});
        alert("Successfully paused!");
        console.log('Inflation erc-20 pause')
        }   
    })
    } else if(approveTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async ()=>{
            const  erc20Approve = new web3.eth.Contract(abis, address);
            await erc20Approve.methods.approve(InpAccountInf.value, InApproveInf.value).send({from: userAddress});
            console.log('You approved')
        })
        console.log('Inflation erc-20 approve')
    }else if(transferTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async()=>{
            const  erc20Trensfer = new web3.eth.Contract(abis, address);
            await erc20Trensfer.methods.transfer(InpAccountInf.value, InpTransferInf.value).send({from: userAddress});
            console.log('transfered with succses')
        })
    }else if(transferFromTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async()=> {
        const erc20TrensferFrom = new web3.eth.Contract(abis,address);
        await erc20TrensferFrom.methods.transfer(InpAccountInf.value, InpTransferFromInf.value).send({from: userAddress});
        console.log('You transferd from')
    })
        console.log('Inflation erc-20 transfer from')
    }else if(unpauseTextInf.style.display == "flex") {
        document.getElementById( 'modalBtnBurn20' ).addEventListener('click', async()=>{
        const erc20Unpause = new web3.eth.Contract(abis, address);
        await erc20Unpause.methods.unpause().send({from: userAddress})
        console.log('Inflation erc-20 unpause')
        })
    }else if(balanceTextInf.style.display == "flex") {
        document.getElementById( 'modalBtnBurn20' ).addEventListener('click', async()=>{
        const erc20GetBalance = new web3.eth.Contract(abis, address);
        const balance  = await erc20GetBalance.methods.balanceOf(InpBalanceInf.value).call();
        alert(`User balance: ${balance}`);
        console.log('Inflation erc-20 balance') // Конец erc 20 innflation И начало erc 20 deflation
        })
    }else if(burnTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurn').addEventListener('click', async()=>{
            const erc20Burndef = new web3.eth.Contract(abis,address);
            await erc20Burndef.methods.burn(InpBurnDef.value ,InpBurnDef.value).send({
                from :userAddress
            });
            alert("Token burned");
        })
    } else if(pauseTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurn').addEventListener('click', async() => {
            const pauseDef = new web3.eth.Contract(abis, address);
            await pauseDef.methods.pause().send({from: userAddress});
        console.log('Deflation erc-20 pause')
        })
    } else if(approveTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurn').addEventListener('click', async()=>{
            const aproveDef = new web3.eth.Contract(abis, address);
            await aproveDef.methods.pause().send({from: userAddress});
            console.log('Deflation aproved');
        })
        console.log('Deflation erc-20 approve')
    } else if(transferTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurn').addEventListener('click', async()=>{
            const transferDef = new web3.eth.Contract(abis, address);
            const account = document.getElementById('InpaddressDef').value;
            await transferDef.methods.transfer(account, InpTransferDef.value);
            console.log('Deflation erc-20 transfer')
        })
    } else if(transferFromTextDef.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async()=>{
            const transferFromDef = new web3.eth.Contract(abis, address);
            await  transferFromDef.methods.transferFrom(document.getElementById('InpaddressDef').value, InpTransferFromDef).send({from: userAddress});
            console.log('transfer from');
        })
        console.log('Deflation erc-20 transfer from')
    } else if(unpauseTextDef.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click' ,async ()=>{
            const unpauseDef = new web3.eth.Contract(abis, address)
            await unpauseDef.methods.unpause( ).send ({from: userAddress})
        console.log('Deflation erc-20 unpause')
        })
    } else if(balanceTextDef.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const getBalanse = new web3.eth.Contract(abis, address);
            const answer = await getBalanse.methods.balanceOf(InpBalanceDef).call();
            alert(`Address balance: ${answer}`);
        console.log('Deflation erc-20 balance') 
        })// конец erc20 deflation и начало nft 1155
    } else if(burnText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const burn = new web3.eth.Contract(abis, address);
            await burn.methods.burn(burnM.value).send({from:userAddress});
            alert(`Succesfully burnt`);
            console.log('erc1155 burn') 
        })
        
    } else if(mintText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const mint = new web3.eth.Contract(abis, address);
            await mint.methods.mint(AccountM.value, mintM.value).send({from:userAddress});
            alert(`Succesfully minted`);
            console.log('erc1155 mint')
        })
        
    } else if(sftText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const sft = new web3.eth.Contract(abis, address);
            await sft.methods.safeTransferFrom(AccountFrom.value, stfM.value).send({from:userAddress});
            alert(`Succesfully transfered`);
            console.log('erc1155 transfer from')
        })
        
    } else if(approveText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const approve = new web3.eth.Contract(abis, address);
            await approve.methods.setApproveForAll(AccountM.value, approveM.value).send({from:userAddress});
            alert(`Succesfully approved for all`);
            console.log('erc1155 approve for all')
        })
        
    } else if(balanceText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const balance = new web3.eth.Contract(abis, address);
            const answer = await balance.methods.balanceOf(AccountM.value, balanceM.value).call();
            alert(`Balance: ${answer}`);
            console.log('erc1155 balance')
        })
         // конец 1155 и начало 721
    } else if(burnText721.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const burn = new web3.eth.Contract(abis, address);
            await burn.methods.burn(burn721.value).send({from:userAddress});
            alert(`Succesfully burnt`);
            console.log('erc721 burn') 
        })
        
    } else if(mint721.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const mint = new web3.eth.Contract(abis, address);
            await mint.methods.mint(addressTo.value, mint721.value).send({from:userAddress});
            alert(`Succesfully minted`);
            console.log('erc721 mint')
        })
        
    } else if(sftText721.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const sft = new web3.eth.Contract(abis, address);
            await sft.methods.safeTransferFrom(tf721.value).send({from:userAddress});
            alert(`Succesfully transfered`);
            console.log('erc721 transfer from')
        })
        
    } else if(approveText721.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const approve = new web3.eth.Contract(abis, address);
            await approve.methods.approve(addressTo.value, approve721.value).send({from:userAddress});
            alert(`Succesfully approved`);
            console.log('erc721 approve')
        })
        
    } else if(balanceText721.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const balance = new web3.eth.Contract(abis, address);
            const answer = await balance.methods.balanceOf(balance721.value).call();
            alert(`Balance: ${answer}`);
            console.log('erc721 balance')
        }) // конец 721 и начало стейкинга
    } else if(ClaimRtext.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const claimR = new web3.eth.Contract(abis, address);
            await claimR.methods.claimRewards().send({from:userAddress});
            alert(`Succesfully claimed reward`);
            console.log('Claim rewards')
        })
        
    } else if(StakeText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const Stake = new web3.eth.Contract(abis, address);
            await Stake.methods.stake(StakeInp.value).send({from:userAddress});
            alert(`Succesfully staked`);
            console.log('Stake')
        })
    } else if(UnstakeText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const Unstake = new web3.eth.Contract(abis, address);
            await Unstake.methods.unstake().send({from:userAddress});
            alert(`Succesfully unstaked`);
            console.log('Unstake')
        })
    } else if(CalculateRtext.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const CalculateR = new web3.eth.Contract(abis, address);
            const answer = await CalculateR.methods.calculateRewards(CalculateInp.value).call();
            alert(`Succesfully calculated: ${answer}`);
            console.log('Calculate rewards')
        })
        
    } else if(StakersText.style.display == "flex") {
        document.getElementById('modalbtnBurn').addEventListener('click', async ()=>{
            const StakersList = new web3.eth.Contract(abis, address);
            const answer = await StakersList.methods.stakersList(StakersInp.value).call();
            alert(`Stakers List: ${answer}`);
            console.log('Stakers list')
        })
        
    } else {
        console.log("something went wrong")
    }



}


async function card20(a, text, interfaces) {
    // let s = localStorage.getItem('currentAddress')

    // let info = await authAddress(s)
    // info.kindId.length
    // info.typeId.length
    // info.contractId.length
    // info.contractNFTId.length;
    // const abis = []
    // abis.push(interfaces);
    let parentDiv = document.createElement('div')
    parentDiv.classList.add('cards')

    let child1 = document.createElement('div')
    child1.classList.add('card')
    child1.setAttribute('style', 'width: 18rem;')

    let img = document.createElement('img')
    img.setAttribute('src', 'https://ipfs.io/ipfs/QmT21PxS5a4qzSk87V8kfZ7vYJ55KXV4DDrzT9xWmB3ET8')
    img.classList.add('card-img-top')
    img.setAttribute('alt', 'Sorry, picture not found')

    let child2 = document.createElement('div')
    child2.classList.add('card-body')

    let title5 = document.createElement('h5')
    title5.classList.add('card-title')
    title5.innerText = "ERC20"

    let desc = document.createElement('p')
    desc.id = `erc${a}`
    desc.innerHTML = text
    sessionStorage.setItem(`${a}`, `${desc.innerHTML}`);
    sessionStorage.setItem(`${desc.innerHTML}`, JSON.stringify(interfaces[0]));

    let btn = document.createElement('button')
    btn.classList.add('btn')
    btn.id = a
    btn.innerText = "click here"
    
    

    parentDiv.appendChild(child1);
    child1.appendChild(img)
    child1.appendChild(child2)
    child2.appendChild(title5)
    child2.appendChild(desc)
    child2.appendChild(btn)

    let section = document.getElementById('cardsRow')
    section.appendChild(parentDiv)

    //Обьявление кнопок и присваивание им функционала (Кнопки первого модального окна)
    let burnInf = document.getElementById('burnInf')
    let mintInf = document.getElementById('mintInf')
    let PauseInf = document.getElementById('PauseInf')
    let approveInf = document.getElementById('approveInf')
    let transferInf = document.getElementById('transferInf')
    let tfInf = document.getElementById('tfInf')
    let UnpauseInf = document.getElementById('UnpauseInf')
    let balanceOfInf = document.getElementById('balanceOfInf')
    
    burnInf.addEventListener('click', burn20)
    mintInf.addEventListener('click', mint20)
    PauseInf.addEventListener('click', pause20)
    approveInf.addEventListener('click', approve20)
    transferInf.addEventListener('click', transfer20)
    tfInf.addEventListener('click', tf20)
    balanceOfInf.addEventListener('click', balance20)
    UnpauseInf.addEventListener('click', unpause20)
console.log('before')
    if(a == 1) {
console.log('after')

        // openModalERC20inf()
        btn.addEventListener('click',openModalERC20inf)
        let c = document.getElementById(1)
        c.addEventListener('click', ()=> {
            openModalERC20inf;
            sessionStorage.setItem('resent', `${c.id}`);
            burnInf.style.display = "none"
            PauseInf.style.display = "none"
            UnpauseInf.style.display = "none"
            console.log('1 inf')
        })
    } else if(a == 2) {
        btn.addEventListener('click',openModalERC20inf)
        // openModalERC20inf()
        // card20(i)
        let a = document.getElementById(2)
        a.addEventListener('click', ()=> {
            sessionStorage.setItem('resent', `${a.id}`);
            openModalERC20inf
            PauseInf.style.display = "none"
            UnpauseInf.style.display = "none"
            burnInf.style.display = "flex"
            console.log('2 inf')
        })
    } else if(a == 3) {
        btn.addEventListener('click',openModalERC20inf);
        // openModalERC20inf()
        // card20(i)
        
        let b = document.getElementById(3)
        b.addEventListener('click', () => {
            openModalERC20inf
            sessionStorage.setItem('resent', `${b.id}`);
            PauseInf.style.display = "flex"
            UnpauseInf.style.display = "flex"
            burnInf.style.display = "none"
            console.log('3 inf')
        })
    } else if(a == 4) {
        btn.addEventListener('click',openModalERC20inf)
        // openModalERC20inf()
        // card20(i)
        let d = document.getElementById(4)
        d.addEventListener('click', () => {
            openModalERC20inf
            sessionStorage.setItem('resent', `${d.id}`);
            burnInf.style.display = "flex"
            PauseInf.style.display = "flex"
            UnpauseInf.style.display = "flex"
            console.log("all inflation")
            console.log('4 inf')
        })
    } else if(a == 5) {
        btn.addEventListener('click',openModalERC20inf)
        let e = document.getElementById(5)
        e.addEventListener('click', () => {
            openModalERC20def()
            sessionStorage.setItem('resent', `${e.id}`);
            PauseDef.style.display = "none"
            UnpauseDef.style.display = "none"
            burnDef.style.display = "flex"
            console.log('5 deflation')
        })
    } else if(a == 6) {
        btn.addEventListener('click',openModalERC20inf)
        let h = document.getElementById(6)
        h.addEventListener('click', () => {
            openModalERC20def()
            sessionStorage.setItem('resent', `${h.id}`);
            burnDef.style.display = "none"
            PauseDef.style.display = "flex"
            UnpauseDef.style.display = "flex"
            console.log('6 deflation')
        })
    } else if(a == 7) {
        btn.addEventListener('click',openModalERC20inf)
        
        let h = document.getElementById(7)
        h.addEventListener('click', () => {
            sessionStorage.setItem('resent', `${h.id}`);
            openModalERC20def()
            PauseDef.style.display = "flex"
            UnpauseDef.style.display = "flex"
            burnDef.style.display = "flex"
            console.log('7 deflation')
            console.log('all deflation')

        })
    } else {
        console.log('Kind id for ERC20 is not found')
    }


}

async function cardNft(a, text, interfaces, metadata) {
    // let s = localStorage.getItem('currentAddress')

    // let info = await authAddress(s)
    // info.kindId.length
    // info.typeId.length
    // info.contractId.length
    // info.contractNFTId.length;

    let parentDiv = document.createElement('div')
    parentDiv.classList.add('cards')

    let child1 = document.createElement('div')
    child1.classList.add('card')
    child1.setAttribute('style', 'width: 18rem;')

    let img = document.createElement('img')
    img.setAttribute('src', `${metadata}`)
    img.classList.add('card-img-top')
    img.setAttribute('alt', 'Sorry, picture not found')

    let child2 = document.createElement('div')
    child2.classList.add('card-body')

    let title5 = document.createElement('h5')
    title5.classList.add('card-title')
    title5.innerText = "NFT's"

    let btn = document.createElement('button')
    btn.classList.add('btn')
    btn.id = a
    btn.innerText = "click here"
    
    let desc = document.createElement('p')
    desc.id = `nft${a}`
    desc.innerHTML = text
    sessionStorage.setItem(`${a}`, `${desc.innerHTML}`);
    sessionStorage.setItem(`${desc.innerHTML}`, JSON.stringify(interfaces[0]));

    parentDiv.appendChild(child1);
    child1.appendChild(img)
    child1.appendChild(child2)
    child2.appendChild(title5)
    child2.appendChild(btn)

    let section = document.getElementById('cardsRow')
    section.appendChild(parentDiv)

    //Обьявление кнопок и присваивание им функционала (Кнопки первого модального окна)
    let burn721btn = document.getElementById('burn721btn')
    let mint721btn = document.getElementById('mint721btn')
    let TransferFrom721btn = document.getElementById('TransferFrom721btn')
    let Approve721Btn = document.getElementById('Approve721Btn')
    let balanceOf721btn = document.getElementById('balanceOf721btn')
    
    burn721btn.addEventListener('click', openBurnNFT721)
    mint721btn.addEventListener('click', openMintNFT721)
    TransferFrom721btn.addEventListener('click', openTfNFT721) 
    Approve721Btn.addEventListener('click', approveNFT721)
    balanceOf721btn.addEventListener('click', balanceNFT721) 

    if(a == 8) {
                // openModalERC20inf()
                btn.addEventListener('click',openModal)
                let ab = document.getElementById(8)
                ab.addEventListener('click', ()=> {
                    openModal();
                    console.log('1155')
                    sessionStorage.setItem(`resent`,`${ab.id}`)
                })
    } else if(a == 9) {
        btn.addEventListener('click',openModal721)
        let ab = document.getElementById(9)
        ab.addEventListener('click', ()=> {
            openModal721;
            console.log('721')
            sessionStorage.setItem(`resent`,`${ab.id}`)
        })
    } else {
        console.log("not an nft")
    }
}
async function cardStaking(a, text, interfaces) {

    // let s = localStorage.getItem('currentAddress')

    // let info = await authAddress(s)
    // info.kindId.length
    // info.typeId.length
    // info.contractId.length
    // info.contractNFTId.length;

    let parentDiv = document.createElement('div')
    parentDiv.classList.add('cards')

    let child1 = document.createElement('div')
    child1.classList.add('card')
    child1.setAttribute('style', 'width: 18rem;')

    let img = document.createElement('img')
    img.setAttribute('src', 'https://ipfs.io/ipfs/QmT21PxS5a4qzSk87V8kfZ7vYJ55KXV4DDrzT9xWmB3ET8')
    img.classList.add('card-img-top')
    img.setAttribute('alt', 'Sorry, picture not found')

    let child2 = document.createElement('div')
    child2.classList.add('card-body')

    let title5 = document.createElement('h5')
    title5.classList.add('card-title')
    title5.innerText = "Staking"

    let btn = document.createElement('button')
    btn.classList.add('btn')
    btn.id = `staking${a}`
    btn.innerText = "click here"
    btn.addEventListener('click', openModalStaking)
    
    let desc = document.createElement('p')
    desc.id = `staking${a}`
    desc.innerHTML = text
    sessionStorage.setItem(`${a}`, `${desc.innerHTML}`);
    sessionStorage.setItem(`${desc.innerHTML}`, JSON.stringify(interfaces[0]));

    parentDiv.appendChild(child1);
    child1.appendChild(img)
    child1.appendChild(child2)
    child2.appendChild(title5)
    child2.appendChild(btn)

    let section = document.getElementById('cardsRow')
    section.appendChild(parentDiv)

    //Обьявление кнопок и присваивание им функционала (Кнопки первого модального окна)
    let claimRewardsBtn = document.getElementById('claimRewardsBtn')
    let StakeBtn = document.getElementById('StakeBtn')
    let UnstakeBtn = document.getElementById('UnstakeBtn')
    let CalculateBtn = document.getElementById('CalculateBtn')
    let stakersListBtn = document.getElementById('stakersListBtn')
    
    StakeBtn.addEventListener('click', StakeInput)
    CalculateBtn.addEventListener('click', calculateInput)
    stakersListBtn.addEventListener('click', stakersInput)
    claimRewardsBtn.addEventListener('click', claim)
    UnstakeBtn.addEventListener('click', unstake)

    if(a == 10) {
        btn.addEventListener('click',openModalStaking)
        
        let bc = document.getElementById(10)
        bc.addEventListener('click', () => {
            openModalStaking()
            console.log('staking')
            sessionStorage.setItem(`resent`, `${bc.id}`)
        })
    } else {
        console.log('not staking')
    }
}

    // закрытие первого модального окна
    let closeBtns = document.querySelectorAll('.closeBtnY')
    closeBtns.forEach(function(closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    });

    // закрытие второго модального окна
    let closeBtnBurns = document.querySelectorAll('.closeBtnBurn')
    closeBtnBurns.forEach(function(closeBtnBurn) {
        closeBtnBurn.addEventListener('click', closeModal2)        
    })
    let web3 = new Web3(window.ethereum);

    let userAddress;

    async function connectWallet() {
        console.log("test");    
        if(window.ethereum){
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            userAddress = accounts[0];
            console.log(accounts[0]);
            web3 = new Web3(Web3.givenProvider);
            currentAddressText.style.display = "flex";
            var fullAddress = userAddress.toString();

            var trimmedAddress = trimAddress(fullAddress, 6, 4); // Измените значения для первых и последних символов по вашему усмотрению
            currentAddressText.innerText = trimmedAddress;
            const data = await authAddress(fullAddress);
            connectButton.innerText = ""
            return data
        }else{
            console.log("Please install Metamask");
        }
    }
    function trimAddress(address, startChars, endChars) {
        if (address.length <= startChars + endChars + 3) return address;
        console.log(address)

        var start = address.substring(0, startChars);
        var end = address.substring(address.length - endChars);
        return start + '...' + end;
    }
let temp;
let temp2;


document.addEventListener('DOMContentLoaded', async ()=>{
const connectButton = document.getElementById("connectButton");
const currentAddressText = document.getElementById("currentAddressText");

    // let s = localStorage.getItem('currentAddress')
    const data = await connectWallet()
    
    // temp2 = {typeIdCheck: [
    //     2,
    //     2,
    //     2,
    //     2,
    //     2,
    //     2,
    //     2,
    //     1,
    //     1,
    //     3
        
    // ]}
    // temp = {userKindId: [ 
    //     1, 
    //     3, 
    //     2,
    //     4,
    //     5,
    //     6,
    //     7,
    //     8,
    //     9,
    //     10
    // ]}
    // console.log(temp2.typeIdCheck)
    // console.log(temp2.typeIdCheck[0])

    // card20()
    // erc20KindIdCheck(temp.userKindId)

    const userDataType = await data.resObj.userTypeId;
    const userDataKind = await data.resObj.userKindId;
    const userDataAbi = await data.resObj.userAbi;
    const userAddresses = await data.resObj.userContractAddress;
    const userMetadata = await data.resObj.userMetadata;

    const temp2 = userDataType.map(id => id);
    const temp = userDataKind.map(id => id);
    const abiTemp = userDataAbi.map(c => JSON.parse(c));
    const contractAddresses = userAddresses.map(c=> c);
    const metadata = userMetadata.map(m => m);
    console.log(temp2, temp, abiTemp, metadata, contractAddresses);

    if(temp2.length == temp.length) {
        for(let i = 0; i < temp2.length; i++) {
            if(temp2[i] == 1) {
                cardNft(temp[i], `${contractAddresses[i]}`, abiTemp[i], metadata[i]);
                console.log((temp[i]))
            } else if(temp2[i] == 2) {
                card20(temp[i], `${contractAddresses[i]}`, abiTemp[i])
            } else if(temp2[i] == 3) {
                cardStaking(temp[i], `${contractAddresses[i]}`, abiTemp[i]);
            }
        }
    }

})

let modal = document.getElementById('contentModals')
let contentModals721 = document.getElementById('contentModals721')
let contentModalsStaking = document.getElementById('contentModalsStaking')
let contentModalsERC20inf = document.getElementById('contentModalsERC20inf')
let contentModalsERC20def = document.getElementById('contentModalsERC20def')




let modalBtn = document.getElementById('modalBtnY')
let modalBtn721 = document.getElementById('modalBtn721')
let modalBtnStake = document.getElementById('modalBtnStake')
let modalBtnErc20Inf = document.getElementById('modalBtnErc20Inf')
let modalBtnErc20Def = document.getElementById('modalBtnErc20Def')
let AccountFrom = document.getElementById('AccountFrom')

let modal_container = document.querySelectorAll('.modal_container')





// let closeBtnBurn = document.getElementsByClassName('closeBtnBurn')[0]
// let closeBtnBurn2 = document.getElementsByClassName('closeBtnBurn')[1]
// let closeBtnBurn3 = document.getElementsByClassName('closeBtnBurn')[2]
// let closeBtnBurn4 = document.getElementsByClassName('closeBtnBurn')[3]
// let closeBtnBurn5 = document.getElementsByClassName('closeBtnBurn')[4]




let modalForBurn = document.getElementById('modalForBurn')
let modalForBurn721 = document.getElementById('modalForBurn721')
let modalForStaking = document.getElementById('modalForStaking')
let modalForERC20inflation = document.getElementById('modalForERC20inflation')
let modalForERC20deflation = document.getElementById('modalForERC20deflation')


// let closeBtn2 = document.getElementsByClassName('closeBtnY')[1]
// let closeBtn3 = document.getElementsByClassName('closeBtnY')[2]
// let closeBtn4 = document.getElementsByClassName('closeBtnY')[3]
// let closeBtn5 = document.getElementsByClassName('closeBtnY')[4]






// кнопки
let burnModal = document.getElementById('burn')
let mintModal = document.getElementById('mint')
let stfModal = document.getElementById('safeTransferFrom')
let BBModal = document.getElementById('burnBatch')
let mbModal = document.getElementById('mintBatch')
let approveModal = document.getElementById('SetApproval')
let balanceModal = document.getElementById('balanceOf')

// let burn721btn = document.getElementById('burn721btn')
// let mint721btn = document.getElementById('mint721btn')
// let TransferFrom721btn = document.getElementById('TransferFrom721btn')
// let Approve721Btn = document.getElementById('Approve721Btn')
// let balanceOf721btn = document.getElementById('balanceOf721btn')

// let claimRewardsBtn = document.getElementById('claimRewardsBtn')
// let StakeBtn = document.getElementById('StakeBtn')
// let UnstakeBtn = document.getElementById('UnstakeBtn')
// let CalculateBtn = document.getElementById('CalculateBtn')
// let stakersListBtn = document.getElementById('stakersListBtn')

// let burnInf = document.getElementById('burnInf')
// let mintInf = document.getElementById('mintInf')
// let PauseInf = document.getElementById('PauseInf')
// let approveInf = document.getElementById('approveInf')
// let transferInf = document.getElementById('transferInf')
// let tfInf = document.getElementById('tfInf')
// let UnpauseInf = document.getElementById('UnpauseInf')
// let balanceOfInf = document.getElementById('balanceOfInf')


let burnDef = document.getElementById('burnDef')
let mintDef = document.getElementById('mintDef')
let PauseDef = document.getElementById('PauseDef')
let approveDef = document.getElementById('approveDef')
let transferDef = document.getElementById('transferDef')
let tfDef = document.getElementById('tfDef')
let UnpauseDef = document.getElementById('UnpauseDef')
let balanceOfDef = document.getElementById('balanceOfDef')



// инпуты
let burnM = document.getElementById('burnM');
let mintM = document.getElementById('mintM');
let stfM = document.getElementById('stfM');
let approveM = document.getElementById('approveM');
let balanceM = document.getElementById('balanceM');

let burn721 = document.getElementById('burn721')
let mint721 = document.getElementById('mint721')
let addressTo = document.getElementById('addressTo')
let tf721 = document.getElementById('tf721')
let id721 = document.getElementById('id721')
let approve721 = document.getElementById('approve721')
let balance721 = document.getElementById("balance721")

let StakeInp = document.getElementById('StakeInp')
let CalculateInp = document.getElementById('CalculateInp')
let StakersInp = document.getElementById('StakersInp')

let InpBurnInf = document.getElementById('InpBurnInf')
let InpMintInf = document.getElementById('InpMintInf')
let InpPauseInf = document.getElementById('InpPauseInf')
let InApproveInf = document.getElementById('InApproveInf')
let InpTransferInf = document.getElementById('InpTransferInf')
let InpTransferFromInf = document.getElementById('InpTransferFromInf')
let InpUnpauseInf = document.getElementById('InpUnpauseInf')
let InpBalanceInf = document.getElementById('InpBalanceInf')
let InpAccountInf = document.getElementById('InpAccountInf')

let InpBurnDef = document.getElementById('InpBurnDef')
let InpMintDef = document.getElementById('InpMintDef')
let InpPauseDef = document.getElementById('InpPauseDef')
let InApproveDef = document.getElementById('InApproveDef')
let InpTransferDef = document.getElementById('InpTransferDef')
let InpTransferFromDef = document.getElementById('InpTransferFromDef')
let InpUnpauseDef = document.getElementById('InpUnpauseDef')
let InpBalanceDef = document.getElementById('InpBalanceDef')


// header text
let burnText = document.getElementById('burnText')
let mintText = document.getElementById('mintText')
let sftText = document.getElementById('sftText')
let approveText = document.getElementById('approveText')
let balanceText = document.getElementById('balanceText')

let burnText721 = document.getElementById('burnText721')
let mintText721 = document.getElementById('mintText721')
let sftText721 = document.getElementById('sftText721')
let approveText721 = document.getElementById('approveText721')
let balanceText721 = document.getElementById('balanceText721')

let ClaimRtext = document.getElementById('ClaimRtext')
let StakeText = document.getElementById('StakeText')
let UnstakeText = document.getElementById('UnstakeText')
let CalculateRtext = document.getElementById('CalculateRtext')
let StakersText = document.getElementById('StakersText')

let burnTextInf = document.getElementById('burnTextInf')
let mintTextInf = document.getElementById('mintTextInf')
let pauseTextInf = document.getElementById('pauseTextInf')
let approveTextInf = document.getElementById('approveTextInf')
let transferTextInf = document.getElementById('transferTextInf')
let transferFromTextInf = document.getElementById('transferFromTextInf')
let unpauseTextInf = document.getElementById('unpauseTextInf')
let balanceTextInf = document.getElementById('balanceTextInf')


let burnTextDef = document.getElementById('burnTextDef')
let mintTextDef = document.getElementById('mintTextDef')
let pauseTextDef = document.getElementById('pauseTextDef')
let approveTextDef = document.getElementById('approveTextDef')
let transferTextDef = document.getElementById('transferTextDef')
let transferFromTextDef = document.getElementById('transferFromTextDef')
let unpauseTextDef = document.getElementById('unpauseTextDef')
let balanceTextDef = document.getElementById('balanceTextDef')


//------------------------------------------------------------------------------------------------------

// modalBtn.addEventListener('click', openModal);
// modalBtn721.addEventListener('click', openModal721);
// modalBtnStake.addEventListener('click', openModalStaking);

// modalBtnErc20Inf.addEventListener('click', openModalERC20inf)

// modalBtnErc20Def.addEventListener('click', openModalERC20def)


// closeBtn2.addEventListener('click', closeModalfor721)
// closeBtn3.addEventListener('click', closeModalforStaking)
// closeBtn4.addEventListener('click', closeModalforERC20inf)
// closeBtn5.addEventListener("click", closeModalforERC20def)




// closeBtnBurn.addEventListener('click', closeModal2)
// closeBtnBurn2.addEventListener('click', closeModal721)
// closeBtnBurn3.addEventListener('click', closeModalStaking)
// closeBtnBurn4.addEventListener('click', closeModalERC20inf)
// closeBtnBurn5.addEventListener('click', closeModalERC20def)


burnModal.addEventListener('click', openBurnNFT)
mintModal.addEventListener('click', openMintNFT)
stfModal.addEventListener('click', openSTfNFT) 
approveModal.addEventListener('click', approveNFT)
balanceModal.addEventListener('click', balanceNFT) 

// burn721btn.addEventListener('click', openBurnNFT721)
// mint721btn.addEventListener('click', openMintNFT721)
// TransferFrom721btn.addEventListener('click', openTfNFT721) 
// Approve721Btn.addEventListener('click', approveNFT721)
// balanceOf721btn.addEventListener('click', balanceNFT721) 

// StakeBtn.addEventListener('click', StakeInput)
// CalculateBtn.addEventListener('click', calculateInput)
// stakersListBtn.addEventListener('click', stakersInput)
// claimRewardsBtn.addEventListener('click', claim)
// UnstakeBtn.addEventListener('click', unstake)

// burnInf.addEventListener('click', burn20)
// mintInf.addEventListener('click', mint20)
// PauseInf.addEventListener('click', pause20)
// approveInf.addEventListener('click', approve20)
// transferInf.addEventListener('click', transfer20)
// tfInf.addEventListener('click', tf20)
// balanceOfInf.addEventListener('click', balance20)
// UnpauseInf.addEventListener('click', unpause20)

burnDef.addEventListener('click', burn20def)
PauseDef.addEventListener('click', pause20def)
approveDef.addEventListener('click', approve20def)
transferDef.addEventListener('click', transfer20def)
tfDef.addEventListener('click', tf20def)
balanceOfDef.addEventListener('click', balance20def)
UnpauseDef.addEventListener('click', unpause20def)


//----------------------------------------------------------------------------------------------------------------------------------

// function erc20KindIdCheck(ercId) {
//     console.log("ddddd")
//     // for(let i = 0; i < ercId.length; i++) {
//     //     console.log(`id ${i}`, `value${ercId[i]}`)
//         if(ercId == 1) {
//             // openModalERC20inf()
//             card20()
//             burnInf.style.display = "none"
//             PauseInf.style.display = "none"
//             UnpauseInf.style.display = "none"
//             console.log('1 inf')
//         } else if(ercId == 2) {
//             // openModalERC20inf()
//             card20()
//             PauseInf.style.display = "none"
//             UnpauseInf.style.display = "none"
//             burnInf.style.display = "flex"
//             console.log('2 inf')

//         } else if(ercId == 3) {
//             // openModalERC20inf()
//             card20()
//             PauseInf.style.display = "flex"
//             UnpauseInf.style.display = "flex"
//             burnInf.style.display = "none"
//             console.log('3 inf')

//         } else if(ercId == 4) {
//             // openModalERC20inf()
//             card20()
//             burnInf.style.display = "flex"
//             PauseInf.style.display = "flex"
//             UnpauseInf.style.display = "flex"
//             console.log("all inflation")
//             console.log('4 inf')

//         } else {
//             console.log('Kind id for inflation is not found')
//         }
//     // }

    
// }
//-----------------------------------------------------------------------------------------------------------------------------------------------
function erc20KindIdCheckDef(ercId) {
    
    for(let i = 0; i < ercId.length; i++) {

        if(ercId[i] == 5) {
            openModalERC20def()
            PauseDef.style.display = "none"
            UnpauseDef.style.display = "none"
            burnDef.style.display = "flex"

            console.log('5 deflation')
        } else if(ercId[i] == 6) {
            openModalERC20def()
            burnDef.style.display = "none"
            PauseDef.style.display = "flex"
            UnpauseDef.style.display = "flex"
            console.log('6 deflation')
        } else if(ercId[i] == 7) {
            openModalERC20def()
            PauseDef.style.display = "flex"
            UnpauseDef.style.display = "flex"
            burnDef.style.display = "flex"
            console.log('all deflation')
        } else {
            console.log('Kind id for deflation is not found')
        }
    }
}


function openModalERC20inf() {
    contentModalsERC20inf.style.display = 'block'
    console.log('wokrk')
}

function burn20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    burnTextDef.style.display = "flex";
    InpBurnDef.style.display = "flex"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "none"
    InpTransferDef.style.display = "none"
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address)
}
function pause20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    pauseTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "none"
    InpTransferDef.style.display = "none"
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    console.log(resent, address, abi)
    btns(abi, address)  
}
function approve20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    approveTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "flex"
    InpTransferDef.style.display = "none"
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    InpAccountInf.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function transfer20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    transferTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "none"
    InpTransferDef.style.display = "flex"
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function tf20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    transferFromTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "none"
    InpTransferDef.style.display = "none"
    InpTransferFromDef.style.display = "flex"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function unpause20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    unpauseTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "none"
    InpTransferDef.style.display = "none"
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function balance20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    balanceTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "none"
    InpTransferDef.style.display = "none"
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}


function burn20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    burnTextInf.style.display = "flex";
    InpBurnInf.style.display = "flex"
    InpMintInf.style.display = "none"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "none"
    InpTransferInf.style.display = "none"
    InpTransferFromInf.style.display = "none"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address)

}
function mint20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    mintTextInf.style.display = "flex";
    InpBurnInf.style.display = "none"
    InpAccountInf.style.display = "flex"
    InpMintInf.style.display = "flex"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "none"
    InpTransferInf.style.display = "none"
    InpTransferFromInf.style.display = "none"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address)
}

function pause20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    pauseTextInf.style.display = "flex";
    InpBurnInf.style.display = "none"
    InpMintInf.style.display = "none"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "none"
    InpTransferInf.style.display = "none"
    InpTransferFromInf.style.display = "none"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = 'none'
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    console.log(resent, address, abi)
    btns(abi, address);
}
function approve20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    approveTextInf.style.display = "flex";
    InpBurnInf.style.display = "none"
    InpMintInf.style.display = "none"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "flex"
    InpTransferInf.style.display = "none"
    InpTransferFromInf.style.display = "none"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "none"
    InpAccountInf.style.display = "flex"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function transfer20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    transferTextInf.style.display = "flex";
    InpBurnInf.style.display = "none"
    InpMintInf.style.display = "none"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "none"
    InpTransferInf.style.display = "flex"
    InpTransferFromInf.style.display = "none"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    InpAccountInf.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}

function tf20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    transferFromTextInf.style.display = "flex";
    InpBurnInf.style.display = "none"
    InpMintInf.style.display = "none"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "none"
    InpTransferInf.style.display = "none"
    InpTransferFromInf.style.display = "flex"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function unpause20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    unpauseTextInf.style.display = "flex";
    InpBurnInf.style.display = "none"
    InpMintInf.style.display = "none"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "none"
    InpTransferInf.style.display = "none"
    InpTransferFromInf.style.display = "none"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function balance20() {
    modalForERC20inflation.style.display = "block"
    contentModalsERC20inf.style.display = 'block'
    balanceTextInf.style.display = "flex";
    InpBurnInf.style.display = "none"
    InpMintInf.style.display = "none"
    InpPauseInf.style.display = "none"
    InApproveInf.style.display = "none"
    InpTransferInf.style.display = "none"
    InpTransferFromInf.style.display = "none"
    InpUnpauseInf.style.display = "none"
    InpBalanceInf.style.display = "flex"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}


function unstake() {
    modalForStaking.style.display = "block"
    contentModalsStaking.style.display = 'block'
    StakeText.style.display = "none";
    StakeInp.style.display = "none"
    CalculateInp.style.display = "none"
    StakersInp.style.display = "none"
    ClaimRtext.style.display = "none"
    CalculateRtext.style.display = "none"
    UnstakeText.style.display = "flex"
    StakersText.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}

function claim() {
    modalForStaking.style.display = "block"
    contentModalsStaking.style.display = 'block'
    StakeText.style.display = "none";
    StakeInp.style.display = "none"
    CalculateInp.style.display = "none"
    StakersInp.style.display = "none"
    ClaimRtext.style.display = "flex"
    CalculateRtext.style.display = "none"
    UnstakeText.style.display = "none"
    StakersText.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}


function StakeInput() {
    modalForStaking.style.display = "block"
    contentModalsStaking.style.display = 'block'
    StakeText.style.display = "flex";
    StakeInp.style.display = "flex"
    CalculateInp.style.display = "none"
    StakersInp.style.display = "none"
    ClaimRtext.style.display = "none"
    CalculateRtext.style.display = "none"
    UnstakeText.style.display = "none"
    StakersText.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function calculateInput() {
    modalForStaking.style.display = "block"
    contentModalsStaking.style.display = 'block'
    CalculateRtext.style.display = "flex";
    StakeInp.style.display = "none"
    StakeText.style.display = "none"
    CalculateInp.style.display = "flex"
    StakersInp.style.display = "none"
    ClaimRtext.style.display = "none"
    UnstakeText.style.display = "none"
    StakersText.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function stakersInput() {
    StakeText.style.display = "none"
    modalForStaking.style.display = "block"
    contentModalsStaking.style.display = 'block'
    CalculateRtext.style.display = "none";
    StakeInp.style.display = "none"
    CalculateInp.style.display = "none"
    StakersInp.style.display = "flex"
    ClaimRtext.style.display = "none"
    UnstakeText.style.display = "none"
    StakersText.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}

function closeModal721() {
    // modalForBurn721.style.display = "none"
    // burn721.style.display = "none"
    // tf721.style.display = "none"
    // mint721.style.display = "none"
    // addressTo.style.display = "none"

    // approve721.style.display = "none"
    // balance721.style.display = "none"

    // modal_container1.style.height = "40%"
}


function balanceNFT721() {
    modalForBurn721.style.display = "block"
    contentModals721.style.display = 'block'
    balance721.style.display = "flex"
    balanceText721.style.display = "flex"
    mintText721.style.display = "none"
    burnText721.style.display = "none"
    approveText721.style.display = "none"
    sftText721.style.display = "none"
    addressTo.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "40%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}

function balanceNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    balanceM.style.display = "flex"
    balanceText.style.display = "flex"
    mintText.style.display = "none"
    burnText.style.display = "none"
    sftText.style.display = "none"
    approveText.style.display = "none"
    AccountM.style.display = "flex"
    
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    AccountFrom.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}

function approveNFT721() {
    modalForBurn721.style.display = "block"
    contentModals721.style.display = 'block'
    balanceText721.style.display = "none"
    approveText721.style.display = "flex"
    mintText721.style.display = "none"
    burnText721.style.display = "none"
    approve721.style.display = "flex"
    sftText721.style.display = "none"
    addressTo.style.display = "flex"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function approveNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    approveM.style.display = "flex"
    approveText.style.display = "flex"
    mintText.style.display = "none"
    burnText.style.display = "none"
    sftText.style.display = "none"
    balanceText.style.display = "none"
    AccountM.style.display = "flex"
    
    modal_container.forEach(function(mc) {
        mc.style.height = "50%"
    })
    AccountFrom.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}


function openSTfNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    stfM.style.display = "flex"
    AccountM.style.display = "flex"
    sftText.style.display = "flex"
    burnText.style.display = "none"
    mintText.style.display = "none"
    balanceText.style.display = "none"
    approveText.style.display = "none"
    AccountM.style.display = "none"
    AccountFrom.style.display = "flex"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function openTfNFT721() {
    modalForBurn721.style.display = "block"
    contentModals721.style.display = 'block'
    balanceText721.style.display = "none"
    sftText721.style.display = "flex"
    mintText721.style.display = "none"
    burnText721.style.display = "none"
    approveText721.style.display = "none"
    tf721.style.display = "flex"
    addressTo.style.display = "flex"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}







function openMintNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    mintM.style.display = "flex"
    mintText.style.display = "flex"
    AccountM.style.display = "flex"
    burnText.style.display = "none"
    sftText.style.display = "none"
    balanceText.style.display = "none"
    approveText.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "45%"
    })  
    AccountFrom.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}

function openMintNFT721() {
    modalForBurn721.style.display = "block"
    contentModals721.style.display = 'block'
    balanceText721.style.display = "none"
    mintText721.style.display = "flex"
    mint721.style.display = "flex"
    addressTo.style.display = "none"
    burnText721.style.display = "none"
    approveText721.style.display = "none"
    sftText721.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "40%"
    })    
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
    
}

function openBurnNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    burnM.style.display = "flex"
    burnText.style.display = "flex"
    mintText.style.display = "none"
    sftText.style.display = "none"
    balanceText.style.display = "none"
    approveText.style.display = "none"
    AccountM.style.display = "none"
    AccountFrom.style.display = "none"   
    modal_container.forEach(function(mc) {
        mc.style.height = "40%"
    })  

    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}
function openBurnNFT721() {
    modalForBurn721.style.display = "block"
    contentModals721.style.display = 'block'
    balanceText721.style.display = "none"
    burnText721.style.display = "flex"
    mintText721.style.display = "none"
    approveText721.style.display = "none"
    sftText721.style.display = "none"
    burn721.style.display = "flex"
    addressTo.style.display = "none"
    modal_container.forEach(function(mc) {
        mc.style.height = "40%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    btns(abi, address);
}

function openBurn() {
    modalForBurn.style.display = "block"
}
function closeModal() {
    modal.style.display = "none"
    contentModals721.style.display = "none"
    contentModalsStaking.style.display = "none"
    contentModalsERC20inf.style.display = "none"
    contentModalsERC20def.style.display = "none"
}

function closeModal2() {
    modalForBurn.style.display = "none"
    burnM.style.display = "none"
    stfM.style.display = "none"
    mintM.style.display = "none"
    approveM.style.display = "none"
    balanceM.style.display = "none"
    
    modalForStaking.style.display = "none"
    StakeInp.style.display = "none"
    CalculateInp.style.display = "none"
    StakeInp.style.display = "none"

    modalForERC20inflation.style.display = "none"
    burnTextInf.style.display = "none"
    mintTextInf.style.display = "none"
    pauseTextInf.style.display = "none"
    approveTextInf.style.display = "none"
    transferTextInf.style.display = "none"
    unpauseTextInf.style.display = "none"
    transferFromTextInf.style.display = "none"
    balanceTextInf.style.display = "none"

    modalForERC20deflation.style.display = "none"
    burnTextDef.style.display = "none"
    pauseTextDef.style.display = "none"
    approveTextDef.style.display = "none"
    transferTextDef.style.display = "none"
    unpauseTextDef.style.display = "none"
    transferFromTextDef.style.display = "none"
    balanceTextDef.style.display = "none"

    modalForBurn721.style.display = "none"
    burn721.style.display = "none"
    tf721.style.display = "none"
    mint721.style.display = "none"
    addressTo.style.display = "none"

    approve721.style.display = "none"
    balance721.style.display = "none"

    modal_container.forEach(function(mc) {
        mc.style.height = "40%"
    })
}


// function closeModalStaking() {
//     modalForStaking.style.display = "none"
//     StakeInp.style.display = "none"
//     CalculateInp.style.display = "none"
//     StakeInp.style.display = "none"
// }
// function closeModalERC20inf() {
//     modalForERC20inflation.style.display = "none"
//     burnTextInf.style.display = "none"
//     mintTextInf.style.display = "none"
//     pauseTextInf.style.display = "none"
//     approveTextInf.style.display = "none"
//     transferTextInf.style.display = "none"
//     unpauseTextInf.style.display = "none"
//     transferFromTextInf.style.display = "none"
//     balanceTextInf.style.display = "none"
// }

// function closeModalERC20def() {
//     modalForERC20deflation.style.display = "none"
//     burnTextDef.style.display = "none"
//     pauseTextDef.style.display = "none"
//     approveTextDef.style.display = "none"
//     transferTextDef.style.display = "none"
//     unpauseTextDef.style.display = "none"
//     transferFromTextDef.style.display = "none"
//     balanceTextDef.style.display = "none"
// }


function openModal() {
    modal.style.display = 'block'
}
function openModal721() {
    contentModals721.style.display = 'block'
}
function openModalStaking() {
    contentModalsStaking.style.display = 'block'
}


function openModalERC20def() {
    contentModalsERC20def.style.display = 'block'
}



const burn = document.getElementById("burn");
const mint = document.getElementById("mint");
const burnBatch = document.getElementById("burnBatch");
const safeTransferFrom = document.getElementById("safeTransferFrom");
const mintBatch = document.getElementById("mintBatch");
const SetApproval = document.getElementById("SetApproval");
const balanceOf = document.getElementById("balanceOf");

const confirmBtn = document.getElementById("confirmBtn");

// confirmBtn.addEventListener('click', checkInputs)



function checkInputs() {
    if(burn.value) {
        console.log("burn")
    } else if(mint.value) {
        console.log(mint)
    } else if(burnBatch.value) {
        console.log("burnBatch")
    } else if(safeTransferFrom.value) {
        console.log("safeTransferFrom")
    } else if(mintBatch.value) {
        console.log('mintBatch')
    }  else if(SetApproval.value) {
        console.log("SetApproval")
    } else if(balanceOf.value) {
        console.log('balanceOf')
    } else {
        console.log("You cant choose less or more than 1")
    }
}





// window.addEventListener('click', clickOut);
// function clickOut(e) {
//     if(e.target == modal) {
//         modal.style.display = "block"
//     }
    
// }






// input1.addEventListener('input', function() {
//     console.log("Данные были введены в первый инпуттт");
//     if (input1.value.trim() !== "") {
//         input2.disabled = true; // Отключаем второй инпут, если в первом есть данные
//     } else {
//         input2.disabled = false; // Включаем второй инпут, если в первом нет данных
//     }
// });
