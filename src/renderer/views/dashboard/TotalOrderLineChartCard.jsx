import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SkeletonTotalOrderCard from '../../ui-component/cards/Skeleton/EarningCard';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
  const theme = useTheme();

  
  const [orders, setOrders] = useState([
    { id: 1, amount: 100 },
    { id: 2, amount: 200 },
  ]);
  const [newOrders, setNewOrders] = useState('');

  const [timeValue, setTimeValue] = React.useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  // Calcular el total de ganancias
  const totalOrders = orders.reduce((sum, item) => sum + item.amount, 0);

  // Agregar una nueva ganancia
  const addOrder = () => {
    if (newOrders) {
      setOrders([...orders, { id: orders.length + 1, amount: parseFloat(newOrders) }]);
      setNewOrders('');
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            // bgcolor: 'primary.card',
            bgcolor: 'card.bgColor2',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&>div': {
              position: 'relative',
              zIndex: 5
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              // background: theme.palette.primary[800],
              background: theme.palette.card.afterBgColor2,
              borderRadius: '50%',
              top: { xs: -105, sm: -85 },
              right: { xs: -140, sm: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              // background: theme.palette.primary[800],
              background: theme.palette.card.beforeBgColor2,
              borderRadius: '50%',
              top: { xs: -155, sm: -125 },
              right: { xs: -70, sm: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        // bgcolor: 'secondary.800',
                        bgcolor: 'card.iconBgColor2',
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation
                      variant={timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      Month
                    </Button>
                    <Button
                      disableElevation
                      variant={!timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      Year
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        {timeValue ? (
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$108</Typography>
                        ) : (
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$961</Typography>
                        )}
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                          ${totalOrders.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            bgcolor: 'primary.200',
                            color: 'primary.dark'
                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'primary.200'
                          }}
                        >
                          Total Order
                        </Typography>
                      </Grid>

                      {/* Sección para agregar nuevos gastos */}
                      <Grid item sx={{ mt: 2 }}>
                        <TextField
                          label="Nuevo gasto" 
                          type="number"
                          value={newOrders}
                          onChange={(e) => setNewOrders(e.target.value)}
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <Button onClick={addOrder} variant="contained" color="primary">
                          Agregar Gasto
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
