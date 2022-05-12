import { Card, CardActionArea, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddCard = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <Grid onClick={handleOpen} item xs={2} sm={4} md={4}>
      <Card
        sx={{
          height: '100%',
          minHeight: 50,
          maxWidth: 345,
          backgroundColor: 'secondary.main',
          opacity: 0.8,
        }}
      >
        <CardActionArea
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AddIcon fontSize="large" />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AddCard;
