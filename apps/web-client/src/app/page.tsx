'use client';

import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [marketData, setMarketData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Market Performance',
        data: [],
        borderColor: '#1976d2',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // Simulated market data
    const generateData = () => {
      const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      const data = Array.from({ length: 24 }, () => Math.random() * 100);
      setMarketData({
        labels,
        datasets: [{
          ...marketData.datasets[0],
          data,
        }],
      });
    };

    generateData();
    const interval = setInterval(generateData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Trading Dashboard
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Market Performance
            </Typography>
            <Box height={300}>
              <Line data={marketData} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Trading Statistics
            </Typography>
            <Box>
              <Typography variant="subtitle1">
                Active Strategies: 3
              </Typography>
              <Typography variant="subtitle1">
                Total Transactions: 124
              </Typography>
              <Typography variant="subtitle1">
                Profit/Loss: +$4,523.21
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
