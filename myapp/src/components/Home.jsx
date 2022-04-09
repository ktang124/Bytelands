import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import { ethers } from 'ethers';
import FiredGuys from '../artifacts/contracts/cfaNFT.sol/ChickFillets.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, signer);


function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1><center><font size = "60">Kevin's NFT Collection</font></center></h1>
      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmfJTizGpYueM7e7M5txQdZNof7yvSqj3QLmD7WR1gjNAK';
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId + 1}.png`;
//   const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"><font size = "5">ID #{tokenId}</font></h5>
      </div>
      <img className="card-img-top" src={isMinted ? imageURI : 'data:image/png;base64,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'}
      width="500" height="500"></img>
      <div className="card-body2">
        {!isMinted ? (
          <div className="btn btn-primary" onClick={mintToken}>
            <Button variant="contained" color="primary">
              Mint
            </Button>
          </div>
        ) : (
          <div className="btn btn-secondary" onClick={getURI}>
            <Button style={{
              backgroundColor: "#BABABA",
        
        }}variant="contained">
              Taken! Show URI
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;