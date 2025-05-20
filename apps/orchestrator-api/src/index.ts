import express from 'express';
import { createClient, RedisClient } from 'redis';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Redis client setup
const redisClient = createClient();

redisClient.on('error', (error: Error) => {
  console.error('Redis error:', error);
});

redisClient.connect();

// Type definitions
interface HealthResponse {
  status: 'healthy' | 'error';
  redis: 'connected' | 'disconnected';
  timestamp: string;
}

interface ErrorResponse {
  status: 'error';
  error: string;
}

interface TradingStrategy {
  id: string;
  name: string;
  description: string;
}

// Basic API endpoints
app.get('/health', async (req: express.Request, res: express.Response) => {
  try {
    const isConnected = await redisClient.ping();
    const response: HealthResponse = {
      status: 'healthy',
      redis: isConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    };
    res.json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(errorResponse);
  }
});

app.get('/api/trading/strategies', async (req: express.Request, res: express.Response) => {
  try {
    // In a real implementation, this would fetch from Redis or database
    const strategies: TradingStrategy[] = [
      { id: '1', name: 'Momentum', description: 'Momentum-based trading strategy' },
      { id: '2', name: 'Mean Reversion', description: 'Mean reversion strategy' }
    ];
    
    res.json(strategies);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(errorResponse);
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  const errorResponse: ErrorResponse = {
    status: 'error',
    error: 'Internal server error'
  };
  res.status(500).json(errorResponse);
});

app.listen(port, () => {
  console.log(`Orchestrator API running on port ${port}`);
});
