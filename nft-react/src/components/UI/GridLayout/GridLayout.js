import classes from './GridLayout.module.css';
const GridLayout = props => {
  return (
    <>
      <main className={classes.Grid}> {props.children} </main>
    </>
  );
};

export default GridLayout;
