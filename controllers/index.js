const router = require('express').Router();
const apiRoutes = require('./api');
const routeHome = require('./home-routes.js');
const routeToDashboard = require('./dashboard-routes.js');


router.use('/api', apiRoutes);
router.use('/dashboard', routeToDashboard); //to use for routing to dashboard
router.use('/', routeHome); //route to home page


router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;