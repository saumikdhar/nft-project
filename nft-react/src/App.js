import classes from './App.module.css';

const App = () => {
  const data = [
    ['NFT details', 'NFT 1'],
    ['NFT details', 'NFT 2'],
    ['NFT details', 'NFT 3'],
    ['NFT details', 'NFT 4'],
    ['NFT details', 'NFT 5'],
    ['NFT details', 'NFT 6']
  ];

  const arrayOfHelp = data.map((data, index) => (
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

  return (
    <div className={classes.backgroundColour}>
      <div className={classes.boxes}>{arrayOfHelp}</div>
    </div>
  );
};

export default App;
