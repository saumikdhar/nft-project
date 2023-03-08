import classes from './App.module.css';
import { useEffect, useState } from 'react';
import Button from './components/UI/Button/Button';
import { YOUR_API_KEY } from './shared/utility';

const App = () => {
  const [nftData, setNftData] = useState({
    orders: [
      {
        closing_date: 'NFT details',
        current_price: 'NFT 1',
        remaining_quantities: '1',
        maker_asset_bundle: { assets: [{ image_preview_url: '' }] }
      }
    ]
  });

  let arrayOfNfts = nftData.orders.map((order, index) => (
    <div key={index} className={classes.box}>
      <div className={classes.image}>
        <img
          src={order.maker_asset_bundle.assets.map(image => image.image_preview_url)}
          alt="NFT image"
        />
      </div>
      <div className={classes.contentWrapper}>
        <h3>{order.closing_date}</h3>
        <p>Price: {+order.current_price * 0.000000000000000001} ETH</p>
        <a href="/" target="">
          {' '}
          Quantity: {order.remaining_quantity}
        </a>
        <div className={classes.button}>
          <Button>More info</Button>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    fetch(
      // 'https://api.opensea.io/v2/listings/collection/slug/all'
      'https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=50',
      {
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        }
        // header: 'X-API-KEY:' + { YOUR_API_KEY }
      }
    )
      .then(async response => {
        const data = await response.json();

        console.log(data.orders.map(orders => orders));
        setNftData(data);

        if (!response.ok) {
          const error = data.errors || response.statusText;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log('There was an error! ', error);
      });
  }, []);

  return (
    <div className={classes.backgroundColour}>
      <div className={classes.blockText}>Pick your NFT</div>
      <div className={classes.boxes}>{arrayOfNfts}</div>
    </div>
  );
};

export default App;
