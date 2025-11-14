import { generateApi } from 'swagger-typescript-api';

generateApi({
  url: 'http://localhost:3001/docs/json',
  output: __dirname,
  httpClientType: 'fetch', // Use fetch for API calls
  defaultResponseType: 'void',
})
  .then(() => {
    console.log('API client generated successfully!');
  })
  .catch((error) => {
    console.error('Error generating API client:', error);
  });
