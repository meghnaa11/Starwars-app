// For modularization and centralization

import peopleRoutes from './people.js';
import homeRoutes from './home.js';

const constructorMethod = (app) => {
    app.use('/', homeRoutes);
    //app.use('/home', homeRoutes);
    app.use('/people', peopleRoutes);
    app.use('*', (req, res) => {
        res.status(404).render('error', { title: '404 Error', statusCode: 404, error: 'Page Not Found' });
    });
};

export default constructorMethod;
