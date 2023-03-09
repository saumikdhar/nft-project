import classes from './Card.module.css';
import Button from '../Button/Button';

const Card = props => {
  return (
    <div className={classes.Card} key={props.key} id={props.id}>
      <div className={classes.image}>
        <img src={props.imgSrc} alt={props.imgAlt} />
      </div>
      <div className={classes.contentWrapper}>
        <p>Closing Date: {props.closingDate}</p>
        <p>Price: {+props.orderCurrentPrice * 0.000000000000000001} ETH</p>
        <a href="/" target="">
          {' '}
          Quantity: {props.orderRemainingQuantity}
        </a>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
