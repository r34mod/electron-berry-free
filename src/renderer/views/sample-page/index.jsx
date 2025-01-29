// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title="Cocinas Sukalde">
    <Typography variant="body2" component="div">
      <iframe
        src="https://www.cocinassukalde.com"
        width="100%"
        height="800px"
        style={{ border: "none" }}
        title="Cocinas Sukalde"
      />
    </Typography>
  </MainCard>
);

export default SamplePage;
