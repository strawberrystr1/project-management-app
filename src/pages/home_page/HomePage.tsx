import { Button } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { testDecrease, testIncreaseBy, testResetCount } from '../../store/reducers/testSlice';

const Home = () => {
  const { count } = useTypedSelector((state) => state.test);
  const dispatch = useTypedDispatch();

  return (
    <div>
      <div>{count}</div>
      <Button size="small" variant="contained" onClick={() => dispatch(testIncreaseBy(5))}>
        Increase by 5
      </Button>
      <Button
        size="small"
        variant="contained"
        color="info"
        onClick={() => dispatch(testDecrease())}
      >
        decrease by 1
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={() => dispatch(testResetCount())}
      >
        Reset
      </Button>
    </div>
  );
};

export default Home;
