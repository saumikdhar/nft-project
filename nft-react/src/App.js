import classes from './App.module.css';
import { useEffect, useState } from 'react';
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
  const [modalData, setModalData] = useState({});
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

  const showModalHandler = (order, event) => {
    event.preventDefault();
    setModalData(order);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const hideModalHandler = () => {
    setModalData({});
    setShowModal(false);
    document.body.style.overflow = 'unset';
  };

  if (!isLoading && !errorMessage) {
    arrayOfNfts = nftData.orders.map((order, index) => (
      <Card
        onClick={event => showModalHandler(order, event)}
        id={index}
        key={index}
        imgSrc={order.maker_asset_bundle.assets.map(image => image.image_preview_url)}
        imgAlt="NFT Logo"
        closingDate={new Date(order.closing_date).toLocaleDateString()}
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
          <div className={classes.content}>
            <div className={classes['card']}>
              <div className={classes['card-description']}>
                <h2 className={classes['card-description-title']}>
                  Closing Date: {new Date(modalData.closing_date).toLocaleDateString()}
                </h2>

                <span className={classes['card-description-profession']}>
                  Maker's Address: {modalData.maker.address}
                </span>

                {/* <span className={classes['card-description-profession']}>
                  Description: {modalData}
                </span> */}

                <div className={classes.Purchase}>
                  <div className={classes.button}>
                    <Button onClick={hideModalHandler}>Purchase</Button>
                  </div>
                </div>
              </div>
              <img
                src={modalData.maker_asset_bundle.assets.map(image => image.image_preview_url)}
                alt={'NFT Logo'}
              />
              {/* <p>Maker's Address: {modalData.maker.address}</p> */}
            </div>
            <div />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
