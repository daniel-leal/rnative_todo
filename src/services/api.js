import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:4000',
});

api.addAsyncRequestTransform(request => async () => {
  // const token = await AsyncStorage.getItem('Todo:token');

  // if (token)
    // request.headers['Authorization'] = `Bearer ${token}`;
  request.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJteUFwaSIsImV4cCI6MTUzMDU4NTAwMiwiaWF0IjoxNTI4MTY1ODAyLCJpc3MiOiJteUFwaSIsImp0aSI6ImFkNmY5NDAyLTM1YTItNDMxYi1hMGFmLTU5NjEwZGU5N2Q2NCIsIm5iZiI6MTUyODE2NTgwMSwic3ViIjoiMSIsInR5cCI6ImFjY2VzcyJ9.ITaJ_jdcIKNi3Mr5TU3ziaJuqw9QFLXNeAxDVPTeQoH3y-PlgPeGCjC7Ii-PolsmzmOz6othPAEdOjW6INcniQ';
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;