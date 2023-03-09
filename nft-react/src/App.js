import classes from './App.module.css';
import { useEffect, useState, Suspense } from 'react';
import Button from './components/UI/Button/Button';
import { YOUR_API_KEY } from './shared/utility';
import GridLayout from './components/UI/GridLayout/GridLayout';
import Card from './components/UI/Card/Card';
import Spinner from './components/UI/Spinner/Spinner';
import Modal from './components/UI/Modal/Modal';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [nftData, setNftData] = useState({});
  const [showModal, setShowModal] = useState(false);
  let arrayOfNfts;

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

  const showModalHandler = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const hideModalHandler = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
  };

  if (!isLoading && !errorMessage) {
    arrayOfNfts = nftData.orders.map((order, index) => (
      <Card
        onClick={showModalHandler}
        id={index}
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

      {showModal && (
        <Modal onClose={hideModalHandler}>
          <div className={classes.actions}>
            <h1>NFT title</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <div className={classes.Purchase}>
              <div className={classes.button}>
                <Button onClick={hideModalHandler}>Purchase</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
