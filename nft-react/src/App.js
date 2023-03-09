import classes from './App.module.css';
import { useEffect, useState, Suspense } from 'react';
import Button from './components/UI/Button/Button';
import { YOUR_API_KEY } from './shared/utility';
import GridLayout from './components/UI/GridLayout/GridLayout';
import Card from './components/UI/Card/Card';
import Spinner from './components/UI/Spinner/Spinner';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [nftData, setNftData] = useState({});

  let arrayOfNfts;
  if (!isLoading && !errorMessage) {
    arrayOfNfts = nftData.orders.map((order, index) => (
      <Card
        key={index}
        imgSrc={order.maker_asset_bundle.assets.map(image => image.image_preview_url)}
        imgAlt="NFT Logo"
        closingDate={order.closing_date}
        orderCurrentPrice={order.current_price}
        orderRemainingQuantity={order.remaining_quantity}
      >
        <div className={classes.button}>
          <Button>More Info</Button>
        </div>
      </Card>
    ));
  }

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    fetch(
      // 'https://api.opensea.io/v2/listings/collection/slug/all' //use this when you have an api
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
        setLoading(false);

        if (!response.ok) {
          const error = data.errors || response.statusText;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        setErrorMessage('Unable to load data!');
        console.log('There was an error! ', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.backgroundColour}>
      <div className={classes.blockText}>Pick your NFT</div>
      {!isLoading ? (
        <GridLayout>{arrayOfNfts}</GridLayout>
      ) : (
        <div className={classes.Center}>
          <Spinner />
        </div>
      )}

      <div className={classes.ErrorMessage}>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default App;
