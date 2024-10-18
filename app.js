import express from 'express';
import configRouteFunction from './routes/index.js';

const app = express();

import exphbs from 'express-handlebars';

app.use('/public', express.static('public'));
app.use(express.json());

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRouteFunction(app);

app.listen(3000, () => {
    console.log('Server is running');
    console.log('Routes are running on http://localhost:3000');
});