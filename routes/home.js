import { Router } from 'express';
const router = Router();

router.route('/').get((req, res) => {
    res.render('home', { title: 'Star Wars Home' });
});

export default router;
