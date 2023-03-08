import classes from './App.module.css';
import { useEffect, useState } from 'react';
import { YOUR_API_KEY } from './shared/utility';

const App = () => {
  const [nftData, setNftData] = useState(null);

  const sampleData = [
    ['NFT details', 'NFT 1'],
    ['NFT details', 'NFT 2'],
    ['NFT details', 'NFT 3'],
    ['NFT details', 'NFT 4'],
    ['NFT details', 'NFT 5'],
    ['NFT details', 'NFT 6']
  ];

  const arrayOfNfts = sampleData.map((data, index) => (
    <div key={index} className={classes.box}>
      <div className={classes.image} />
      <div className={classes.contentWrapper}>
        <h3>{data[1]}</h3>
        <p>{data[0]}</p>
        <a href="/" target="">
          {' '}
          {data[1]}
        </a>
      </div>
    </div>
  ));

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('https://api.opensea.io/v2/listings/collection/slug/all', {
      method: 'POST',
      header: 'X-API-KEY:' + { YOUR_API_KEY }
    })
      .then(async response => {
        const data = await response.json();

        setNftData(data);

        if (!response.ok) {
          const error = data.errors || response.statusText;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log('There was an error! ', error);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className={classes.backgroundColour}>
      <div className={classes.blockText}>Pick your NFT</div>
      <div className={classes.boxes}>{arrayOfNfts}</div>
    </div>
  );
};

export default App;
