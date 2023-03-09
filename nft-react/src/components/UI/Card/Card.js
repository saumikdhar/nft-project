import classes from './Card.module.css';

const Card = props => {
  return (
    <div key={props.key} id={props.id} className={classes.Card}>
      {props.children}
    </div>
  );
};

export default Card;
