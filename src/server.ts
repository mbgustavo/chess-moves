import http from 'http';
import app from './app'

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('App is running on http://localhost:%s in %s mode', app.get('port'), app.get('env'));
});