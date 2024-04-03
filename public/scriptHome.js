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
let isModalOpen = false;
async function authAddress(address) {
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
async function btns(abis, address, chainId) {
    // начало inflation erc20
    if (mintTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const erc20Mint = new web3.eth.Contract(abis, address);
            await erc20Mint.methods.mint(InpAccountInf.value, InpMintInf.value).send({ from: userAddress });
            alert("Successfully minted!");
            location.reload();
        })
        console.log('Inflation erc-20 mint')
    } else if (burnTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const erc20burn = new web3.eth.Contract(abis, address);
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            // await  erc20burn.methods.mint(InpAccountInf.value, InpBurnInf.value).send({from: userAddress});
            await erc20burn.methods.burn(InpAccountInf.value, InpBurnInf.value).send({ from: userAddress });
            alert("Successfully burned!");
            console.log('Inflation erc-20 burn')
            location.reload();
        })
    } else if (pauseTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const erc20pause = new web3.eth.Contract(abis, address);
            if (confirm('Are you sure to pause the token?')) {
                await erc20pause.methods.pause().send({ from: userAddress });
                alert("Successfully paused!");
                console.log('Inflation erc-20 pause')
                location.reload();
            }
        })
    } else if (approveTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const erc20Approve = new web3.eth.Contract(abis, address);
            await erc20Approve.methods.approve(InpAccountInf.value, InApproveInf.value).send({ from: userAddress });
            console.log('You approved')
            location.reload();
        })
        console.log('Inflation erc-20 approve')
    } else if (transferTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const erc20Trensfer = new web3.eth.Contract(abis, address);
            await erc20Trensfer.methods.transfer(InpAccountInf.value, InpTransferInf.value).send({ from: userAddress });
            console.log('transfered with succses')
            location.reload();
        })
    } else if (transferFromTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const erc20TrensferFrom = new web3.eth.Contract(abis, address);
            await erc20TrensferFrom.methods.transferFrom(InpAccountInf.value, userAddress, InpTransferFromInf.value).send({ from: userAddress });
            console.log('You transferd from')
            location.reload();
        })
        console.log('Inflation erc-20 transfer from')
    } else if (unpauseTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const erc20Unpause = new web3.eth.Contract(abis, address);
            await erc20Unpause.methods.unpause().send({ from: userAddress })
            console.log('Inflation erc-20 unpause')
            location.reload();
        })
    } else if (balanceTextInf.style.display == "flex") {
        document.getElementById('modalBtnBurn20').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const erc20GetBalance = new web3.eth.Contract(abis, address);
            const balance = await erc20GetBalance.methods.balanceOf(InpBalanceInf.value).call();
            alert(`User balance: ${balance}`);
            console.log('Inflation erc-20 balance') // Конец erc 20 innflation И начало erc 20 deflation
            location.reload();
        })
    } else if (burnTextDef.style.display == "flex") {
        console.log(chainId);
        document.getElementById('modalBtnBurnDef').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const account = document.getElementById('InpaddressDef').value;
            const erc20Burndef = new web3.eth.Contract(abis, address);
            await erc20Burndef.methods.burn(account, InpBurnDef.value).send({
                from: userAddress
            });
            alert("Token burned");
            location.reload();
        })
    } else if (pauseTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurnDef').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const pauseDef = new web3.eth.Contract(abis, address);
            if (confirm('Are you sure pause tokens?')) {
                await pauseDef.methods.pause().send({ from: userAddress });
                console.log('Deflation erc-20 pause')
                location.reload();
            }
        })
    } else if (approveTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurnDef').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const aproveDef = new web3.eth.Contract(abis, address);
            await aproveDef.methods.approve(InApproveDef.value, InpTransferDef.value).send({ from: userAddress });
            console.log('Deflation aproved');
            location.reload();
        })
        console.log('Deflation erc-20 approve')
    } else if (transferTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurnDef').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const transferDef = new web3.eth.Contract(abis, address);
            await transferDef.methods.transfer(InApproveDef.value, InpTransferDef.value).send({ from: userAddress });
            console.log('Deflation erc-20 transfer')
            location.reload();
        })
    } else if (transferFromTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurnDef').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const transferFromDef = new web3.eth.Contract(abis, address);
            await transferFromDef.methods.transferFrom(InApproveDef.value, userAddress, InpTransferFromDef.value).send({ from: userAddress });
            console.log('transfer from');
            location.reload();
        })
        console.log('Deflation erc-20 transfer from')
    } else if (unpauseTextDef.style.display == "flex") {
        document.getElementById('modalBtnBurnDef').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const unpauseDef = new web3.eth.Contract(abis, address)
            await unpauseDef.methods.unpause().send({ from: userAddress })
            console.log('Deflation erc-20 unpause')
            location.reload();
        })
    } else if (balanceTextDef.style.display == "flex") {
        console.log(address);
        document.getElementById('modalBtnBurnDef').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const getBalanse = new web3.eth.Contract(abis, address);
            const answer = await getBalanse.methods.balanceOf(InpBalanceDef.value).call();
            alert(`Address balance: ${answer}`);
            console.log('Deflation erc-20 balance')
            location.reload();
        })// конец erc20 deflation и начало nft 1155
    } else if (burnText.style.display == "flex") {
        document.getElementById('modalBtnBurn1155').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const burn = new web3.eth.Contract(abis, address);
            await burn.methods.burn(balanceM.value, burnM.value).send({ from: userAddress });
            alert(`Succesfully burned`);
            console.log('erc1155 burn')
            location.reload();
        })

    } else if (mintText.style.display == "flex") {
        document.getElementById('modalBtnBurn1155').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const mint = new web3.eth.Contract(abis, address);
            await mint.methods.mint(approveM.value, balanceM.value, mintM.value, '0x0').send({ from: userAddress });
            alert(`Succesfully minted`);
            console.log('erc1155 mint')
            location.reload();
        })

    } else if (sftText.style.display == "flex") {
        document.getElementById('modalBtnBurn1155').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const sft = new web3.eth.Contract(abis, address);
            await sft.methods.safeTransferFrom(AccountFrom.value, userAddress, balanceM.value, stfM.value, '0x0').send({ from: userAddress });
            alert(`Succesfully transfered`);
            console.log('erc1155 transfer from')
            location.reload();
        })

    } else if (approveText.style.display == "flex") {
        document.getElementById('modalBtnBurn1155').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const approve = new web3.eth.Contract(abis, address);
            const eArray = Array.from(radioS);
            for (const e of eArray) {
                if (e.checked) {
                    await approve.methods.setApprovalForAll(approveM.value, e.value).send({ from: userAddress });
                    alert(`Succesfully approved for all`);
                    console.log('erc1155 approve for all')
                    location.reload();
                }
            }
        })

    } else if (balanceText.style.display == "flex") {
        console.log(abis, chainId);
        document.getElementById('modalBtnBurn1155').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const balance = new web3.eth.Contract(abis, address);
            const answer = await balance.methods.balanceOf(approveM.value, balanceM.value).call();
            alert(`Balance: ${answer}`);
            console.log('erc1155 balance')
            location.reload();
        })
        // конец 1155 и начало 721
    } else if (mintText721.style.display == "flex") {
        document.getElementById('modalBtnBurn721').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const mint = new web3.eth.Contract(abis, address);
            await mint.methods.mint(mint721.value, tokenUri.value).send({ from: userAddress });
            alert(`Succesfully minted`);
            console.log('erc721 mint');
            location.reload();
        })

    } else if (sftText721.style.display == "flex") {
        document.getElementById('modalBtnBurn721').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const sft = new web3.eth.Contract(abis, address);
            await sft.methods.safeTransferFrom(tf721.value, userAddress, tokenId.value).send({ from: userAddress });
            alert(`Succesfully transfered`);
            console.log('erc721 transfer from')
            location.reload();
        })

    } else if (approveText721.style.display == "flex") {
        document.getElementById('modalBtnBurn721').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const approve = new web3.eth.Contract(abis, address);
            await approve.methods.approve(approve721.value, tokenId.value).send({ from: userAddress });
            alert(`Succesfully approved`);
            console.log('erc721 approve')
            location.reload();
        })

    } else if (balanceText721.style.display == "flex") {
        console.log(abis);
        document.getElementById('modalBtnBurn721').addEventListener('click', async () => {
            const balance = new web3.eth.Contract(abis, address);
            const answer = await balance.methods.balanceOf(balance721.value).call();
            alert(`Balance: ${answer}`);
            console.log('erc721 balance')
            location.reload();
        }) // конец 721 и начало стейкинга
    } else if (ClaimRtext.style.display == "flex") {
        document.getElementById('modalBtnBurnStaking').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const claimR = new web3.eth.Contract(abis, address);
            await claimR.methods.claimRewards().send({ from: userAddress });
            alert(`Succesfully claimed reward`);
            console.log('Claim rewards')
            location.reload();
        })

    } else if (StakeText.style.display == "flex") {
        console.log(abis);
        document.getElementById('modalBtnBurnStaking').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const Stake = new web3.eth.Contract(abis, address);
            await Stake.methods.stake(StakeInp.value).send({ from: userAddress });
            alert(`Succesfully staked`);
            console.log('Stake')
            location.reload();
            // try {
            //     const message = `hello ${address}`
            //     await web3.eth.personal.sign(message, userAddress, '')
            // } catch (error) {
            //     console.error(error)
            // }
            
        })
    } else if (UnstakeText.style.display == "flex") {
        document.getElementById('modalBtnBurnStaking').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const Unstake = new web3.eth.Contract(abis, address);
            await Unstake.methods.unstake().send({ from: userAddress });
            alert(`Succesfully unstaked`);
            console.log('Unstake')
            location.reload();
        })
    } else if (CalculateRtext.style.display == "flex") {
        document.getElementById('modalBtnBurnStaking').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const CalculateR = new web3.eth.Contract(abis, address);
            const answer = await CalculateR.methods.calculateRewards(CalculateInp.value).call();
            alert(`Succesfully calculated: ${answer}`);
            console.log('Calculate rewards')
            location.reload();
        })

    } else if (StakersText.style.display == "flex") {
        document.getElementById('modalBtnBurnStaking').addEventListener('click', async () => {
            const currentChainId = await window.ethereum.request({ method: 'net_version' });
            if (currentChainId !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    })
                } catch (error) {
                    console.error(error);
                }
            }
            const StakersList = new web3.eth.Contract(abis, address);
            const answer = await StakersList.methods.stakersList(StakersInp.value).call();
            alert(`Stakers List: ${await answer}`);
            console.log('Stakers list')
            location.reload();
        })

    } else {
        console.log("something went wrong")
    }



}


async function card20(a, id, text, interfaces, chainId) {
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
    title5.innerText = "Token"

    let desc = document.createElement('p')
    desc.id = `erc20${a}`
    desc.innerHTML = text
    sessionStorage.setItem(`${a}`, `${desc.innerHTML}`);
    sessionStorage.setItem(`${desc.innerHTML}`, JSON.stringify(interfaces));

    let btn = document.createElement('button')
    btn.classList.add('btn')
    btn.id = id
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
    if (a == 1) {
        console.log('after')

        // openModalERC20inf()
        btn.addEventListener('click', openModalERC20inf)
        let c = document.getElementById(`erc${id}`)
        c.addEventListener('click', () => {
            openModalERC20inf(text, id, chainId);
            burnInf.style.display = "none"
            PauseInf.style.display = "none"
            UnpauseInf.style.display = "none"
            console.log('1 inf')
        })
    } else if (a == 2) {
        btn.addEventListener('click', openModalERC20inf)
        let a = document.getElementById(`erc${id}`)
        a.addEventListener('click', () => {
            openModalERC20inf(text, id, chainId)
            PauseInf.style.display = "none"
            UnpauseInf.style.display = "none"
            burnInf.style.display = "flex"
            console.log('2 inf')
        })
    } else if (a == 3) {
        btn.addEventListener('click', openModalERC20inf);
        let b = document.getElementById(`erc${id}`)
        b.addEventListener('click', () => {
            openModalERC20inf(text, id, chainId)
            PauseInf.style.display = "flex"
            UnpauseInf.style.display = "flex"
            burnInf.style.display = "none"
            console.log('3 inf')
        })
    } else if (a == 4) {
        btn.addEventListener('click', openModalERC20inf)
        let d = document.getElementById(`erc${id}`)
        d.addEventListener('click', () => {
            openModalERC20inf(text, id, chainId)
            burnInf.style.display = "flex"
            PauseInf.style.display = "flex"
            UnpauseInf.style.display = "flex"
            console.log("all inflation")
            console.log('4 inf')
        })
    } else if (a == 5) {
        btn.addEventListener('click', openModalERC20inf)
        let e = document.getElementById(`erc${id}`)
        e.addEventListener('click', () => {
            openModalERC20def(text, id, chainId)
            PauseDef.style.display = "none"
            UnpauseDef.style.display = "none"
            burnDef.style.display = "flex"
            console.log('5 deflation')
        })
    } else if (a == 6) {
        btn.addEventListener('click', openModalERC20inf)
        let h = document.getElementById(`erc${id}`)
        h.addEventListener('click', () => {
            openModalERC20def(text, id, chainId)
            burnDef.style.display = "none"
            PauseDef.style.display = "flex"
            UnpauseDef.style.display = "flex"
            console.log('6 deflation')
        })
    } else if (a == 7) {
        btn.addEventListener('click', openModalERC20inf)

        let h = document.getElementById(`erc${id}`)
        h.addEventListener('click', () => {
            openModalERC20def(text, id, chainId)
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

async function cardNft(a, id, text, interfaces, metadata, chainId) {
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
    btn.id = id
    btn.innerText = "click here"

    let desc = document.createElement('p')
    desc.id = `nft${a}`
    desc.innerHTML = text
    console.log(text)
    sessionStorage.setItem(`${a}`, `${desc.innerHTML}`);
    sessionStorage.setItem(`${desc.innerHTML}`, JSON.stringify(interfaces));

    parentDiv.appendChild(child1);
    child1.appendChild(img)
    child1.appendChild(child2)
    child2.appendChild(title5)
    child2.appendChild(desc)
    child2.appendChild(btn)

    let section = document.getElementById('cardsRow')
    section.appendChild(parentDiv)

    //Обьявление кнопок и присваивание им функционала (Кнопки первого модального окна)
    // let burn721btn = document.getElementById('burn721btn')
    let mint721btn = document.getElementById('mint721btn')
    let TransferFrom721btn = document.getElementById('TransferFrom721btn')
    let Approve721Btn = document.getElementById('Approve721Btn')
    let balanceOf721btn = document.getElementById('balanceOf721btn')

    // burn721btn.addEventListener('click', openBurnNFT721)
    mint721btn.addEventListener('click', openMintNFT721)
    TransferFrom721btn.addEventListener('click', openTfNFT721)
    Approve721Btn.addEventListener('click', approveNFT721)
    balanceOf721btn.addEventListener('click', balanceNFT721)

    if (a == 8) {
        btn.addEventListener('click', openModal)
        let ab = document.getElementById(`nft1155${id}`)
        ab.addEventListener('click', () => {
            openModal(text, id, chainId);
            console.log('1155')
        })
    } else if (a == 9) {
        btn.addEventListener('click', openModal721)
        let ab = document.getElementById(`nft721${id}`)
        ab.addEventListener('click', () => {
            openModal721(text, id, chainId);
            console.log('721')
        })
    } else {
        console.log("not an nft")
    }
}
async function cardStaking(a, id, text, interfaces, chainId) {
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
    btn.id = `stake${id}`
    btn.innerText = "click here"
    btn.addEventListener('click', openModalStaking)

    let desc = document.createElement('p')
    desc.id = `staking${a}`
    desc.innerHTML = text
    sessionStorage.setItem(`${a}`, `${desc.innerHTML}`);
    sessionStorage.setItem(`${desc.innerHTML}`, JSON.stringify(interfaces));

    parentDiv.appendChild(child1);
    child1.appendChild(img)
    child1.appendChild(child2)
    child2.appendChild(title5)
    child2.appendChild(desc)
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
    // stakersListBtn.addEventListener('click', stakersInput)
    claimRewardsBtn.addEventListener('click', claim)
    UnstakeBtn.addEventListener('click', unstake)

    if (a == 10) {
        btn.addEventListener('click', openModalStaking)

        let bc = document.getElementById(`stake${id}`)
        bc.addEventListener('click', () => {
            openModalStaking(text, id, chainId);
        })
    } else {
        console.log('not staking')
    }
}

// закрытие первого модального окна
let closeBtns = document.querySelectorAll('.closeBtnY')
closeBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
});

// закрытие второго модального окна
let closeBtnBurns = document.querySelectorAll('.closeBtnBurn')
closeBtnBurns.forEach(function (closeBtnBurn) {
    closeBtnBurn.addEventListener('click', closeModal2)
})
let web3 = new Web3(window.ethereum);

let userAddress;

async function connectWallet() {
    console.log("test");
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
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
    } else {
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


document.addEventListener('DOMContentLoaded', async () => {
    const data = await connectWallet()
    const userDataType = await data.resObj.userTypeId;
    const userDataKind = await data.resObj.userKindId;
    const userDataAbi = await data.resObj.userAbi;
    const userAddresses = await data.resObj.userContractAddress;
    const userMetadata = await data.resObj.userMetadata;
    const userChainId = await data.resObj.userChains;
    const userMainId = await data.resObj.userMainId;

    const temp2 = userDataType.map(id => id);
    const temp = userDataKind.map(id => id);
    const abiTemp = userDataAbi.map(c => JSON.parse(c));
    const contractAddresses = userAddresses.map(c => c);
    const metadata = userMetadata.map(m => m);
    const chainId = userChainId.map(c => c);
    const mainId = userMainId.map(m => m);
    console.log(temp2, temp, mainId, abiTemp, metadata, contractAddresses, chainId);

    if (temp2.length == temp.length) {
        for (let i = 0; i < temp2.length; i++) {
            if (temp2[i] == 1) {
                cardNft(temp[i], mainId[i], contractAddresses[i], abiTemp[i].map(e => e), metadata[i], chainId[i]);
                console.log((temp[i]))
            } else if (temp2[i] == 2) {
                card20(temp[i], mainId[i], `${contractAddresses[i]}`, abiTemp[i].map(e => e), chainId[i]);
            } else if (temp2[i] == 3) {
                cardStaking(temp[i], mainId[i], `${contractAddresses[i]}`, abiTemp[i].map(e => e), chainId[i]);
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


let modalForBurn = document.getElementById('modalForBurn')
let modalForBurn721 = document.getElementById('modalForBurn721')
let modalForStaking = document.getElementById('modalForStaking')
let modalForERC20inflation = document.getElementById('modalForERC20inflation')
let modalForERC20deflation = document.getElementById('modalForERC20deflation')

// кнопки
let burnModal = document.getElementById('burn')
let mintModal = document.getElementById('mint')
let stfModal = document.getElementById('safeTransferFrom')
let BBModal = document.getElementById('burnBatch')
let mbModal = document.getElementById('mintBatch')
let approveModal = document.getElementById('SetApproval')
let balanceModal = document.getElementById('balanceOf')


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
let approveM = document.getElementById('AccountM');
let balanceM = document.getElementById('balanceM');

let radioS = document.getElementsByClassName('form-check-input');


let burn721 = document.getElementById('burn721')
let mint721 = document.getElementById('mint721')
let tokenUri = document.getElementById('tokenUri721');
let tokenId = document.getElementById('tokenId')
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

burnModal.addEventListener('click', openBurnNFT)
mintModal.addEventListener('click', openMintNFT)
stfModal.addEventListener('click', openSTfNFT)
approveModal.addEventListener('click', approveNFT)
balanceModal.addEventListener('click', balanceNFT)

burnDef.addEventListener('click', burn20def)
PauseDef.addEventListener('click', pause20def)
approveDef.addEventListener('click', approve20def)
transferDef.addEventListener('click', transfer20def)
tfDef.addEventListener('click', tf20def)
balanceOfDef.addEventListener('click', balance20def)
UnpauseDef.addEventListener('click', unpause20def)
function erc20KindIdCheckDef(ercId) {

    for (let i = 0; i < ercId.length; i++) {

        if (ercId[i] == 5) {
            openModalERC20def()
            PauseDef.style.display = "none"
            UnpauseDef.style.display = "none"
            burnDef.style.display = "flex"

            console.log('5 deflation')
        } else if (ercId[i] == 6) {
            openModalERC20def()
            burnDef.style.display = "none"
            PauseDef.style.display = "flex"
            UnpauseDef.style.display = "flex"
            console.log('6 deflation')
        } else if (ercId[i] == 7) {
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


function openModalERC20inf(id, address, chainId) {
    contentModalsERC20inf.style.display = 'block'
    console.log('wokrk')   
    sessionStorage.setItem('resent', `${id}`);
    sessionStorage.setItem(`${id}`, `${address}`)
    sessionStorage.setItem(`chainId${id}`, `${chainId}`);
}

function burn20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    const account = document.getElementById('InpaddressDef')
    account.style.display = 'flex'
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    console.log(resent, chainId);
    btns(abi, address, chainId)
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
}
function approve20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    approveTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InApproveDef.style.display = "flex"
    InpTransferDef.style.display = "flex"
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
}
function transfer20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    transferTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InpTransferDef.style.display = "flex"
    InApproveDef.style.display = 'flex'
    InpTransferFromDef.style.display = "none"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
}
function tf20def() {
    modalForERC20deflation.style.display = "block"
    contentModalsERC20def.style.display = 'block'
    transferFromTextDef.style.display = "flex";
    InpBurnDef.style.display = "none"
    InpPauseDef.style.display = "none"
    InpTransferDef.style.display = "none"
    InpTransferFromDef.style.display = "flex"
    InpUnpauseDef.style.display = "none"
    InpBalanceDef.style.display = "none"
    InApproveDef.style.display = 'flex';
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    const account = document.getElementById('InpaddressDef')
    account.style.display = 'none';
    InpBalanceDef.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)

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
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = 'none'
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    console.log(resent, address, abi)
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    InpAccountInf.style.display = "flex"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    InpAccountInf.style.display = 'flex'
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    InpAccountInf.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    const chainId = sessionStorage.getItem(`chainId${resent}`);
    btns(abi, address, chainId)
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
    tokenId.style.display = "none"
    modal_container.forEach(function (mc) {
        mc.style.height = "40%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
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
    approveM.style.display = "flex"
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    AccountFrom.style.display = "none"
    const radioForAprove = document.getElementsByClassName('form-check');
    [...radioForAprove].forEach((e) => { e.style.display = 'none' });
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
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
    tokenId.style.display = "flex"
    tokenUri.style.display = 'none'
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
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
    approveM.style.display = "flex"
    const radioForAprove = document.getElementsByClassName('form-check');
    [...radioForAprove].forEach((e) => { e.style.display = 'flex' });

    modal_container.forEach(function (mc) {
        mc.style.height = "50%"
    })
    AccountFrom.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
}


function openSTfNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    stfM.style.display = "flex"
    approveM.style.display = "flex"
    sftText.style.display = "flex"
    burnText.style.display = "none"
    mintText.style.display = "none"
    balanceText.style.display = "none"
    approveText.style.display = "none"
    AccountM.style.display = "none"
    AccountFrom.style.display = "flex"
    balanceM.style.display = 'flex';
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    const radioForAprove = document.getElementsByClassName('form-check');
    [...radioForAprove].forEach((e) => { e.style.display = 'none' });

    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
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
    tokenId.style.display = "flex"
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
}

function openMintNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    mintM.style.display = "flex"
    mintText.style.display = "flex"
    approveM.style.display = "flex"
    burnText.style.display = "none"
    sftText.style.display = "none"
    balanceText.style.display = "none"
    approveText.style.display = "none"
    balanceM.style.display = 'flex'
    modal_container.forEach(function (mc) {
        mc.style.height = "45%"
    })
    const radioForAprove = document.getElementsByClassName('form-check');
    [...radioForAprove].forEach((e) => { e.style.display = 'none' });
    AccountFrom.style.display = "none"
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
}

function openMintNFT721() {
    modalForBurn721.style.display = "block"
    contentModals721.style.display = 'block'
    balanceText721.style.display = "none"
    mintText721.style.display = "flex"
    mint721.style.display = "flex"
    tokenUri.style.display = 'flex'
    tokenId.style.display = "none"
    burnText721.style.display = "none"
    approveText721.style.display = "none"
    sftText721.style.display = "none"
    modal_container.forEach(function (mc) {
        mc.style.height = "40%"
    })
    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);

}

function openBurnNFT() {
    modalForBurn.style.display = "block"
    modal.style.display = 'block'
    burnM.style.display = "flex"
    balanceM.style.display = "flex"
    burnText.style.display = "flex"
    mintText.style.display = "none"
    sftText.style.display = "none"
    balanceText.style.display = "none"
    approveText.style.display = "none"
    approveM.style.display = "none"
    AccountFrom.style.display = "none"
    modal_container.forEach(function (mc) {
        mc.style.height = "40%"
    })
    const radioForAprove = document.getElementsByClassName('form-check');
    [...radioForAprove].forEach((e) => { e.style.display = 'none' });

    const resent = sessionStorage.getItem('resent');
    const address = sessionStorage.getItem(`${resent}`);
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    btns(abi, address, chainId);
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
    modal_container.forEach(function (mc) {
        mc.style.height = "40%"
    })
    const resent = sessionStorage.getItem('resent');
    console.log(resent)
    const address = sessionStorage.getItem(`${resent}`);
    console.log(address)
    const abi = JSON.parse(sessionStorage.getItem(`${address}`));
    const chainId = sessionStorage.getItem(`chainId${resent}`)
    console.log(abi)
    btns(abi, address, chainId);
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
    isModalOpen = false;
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
    tokenId.style.display = "none"

    approve721.style.display = "none"
    balance721.style.display = "none"

    modal_container.forEach(function (mc) {
        mc.style.height = "40%"
    })
    isModalOpen = false;
}
function openModal(address, id, chainId) {
    modal.style.display = 'block';
    sessionStorage.setItem(`resent`, `${id}`)
    sessionStorage.setItem(`${id}`, `${address}`)
    sessionStorage.setItem(`chainId${id}`, `${chainId}`)
}
function openModal721(address, id, chainId) {
    contentModals721.style.display = 'block'
    sessionStorage.setItem(`resent`, `${id}`)
    sessionStorage.setItem(`${id}`, `${address}`)
    sessionStorage.setItem(`chainId${id}`, `${chainId}`);
}
function openModalStaking(address, id, chainId) {
    contentModalsStaking.style.display = 'block'
    sessionStorage.setItem(`resent`, `${id}`)
    sessionStorage.setItem(`${id}`, `${address}`)
    sessionStorage.setItem(`chainId${id}`, `${chainId}`);
}


function openModalERC20def(address, id, chainId) {
    contentModalsERC20def.style.display = 'block'
    sessionStorage.setItem('resent', `${id}`);
    sessionStorage.setItem(`${id}`, `${address}`)
    sessionStorage.setItem(`chainId${id}`, `${chainId}`);
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
    if (burn.value) {
        console.log("burn")
    } else if (mint.value) {
        console.log(mint)
    } else if (burnBatch.value) {
        console.log("burnBatch")
    } else if (safeTransferFrom.value) {
        console.log("safeTransferFrom")
    } else if (mintBatch.value) {
        console.log('mintBatch')
    } else if (SetApproval.value) {
        console.log("SetApproval")
    } else if (balanceOf.value) {
        console.log('balanceOf')
    } else {
        console.log("You cant choose less or more than 1")
    }
}
