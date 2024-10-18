import { Router } from 'express';
const router = Router();
import { getPeople, getPeopleById } from '../data/people.js';

router.route('/').get(async (req, res) => {
    try {
        let page = req.query.page
        if (!page || isNaN(page) ){
            page = 1
        }else{
            page = Number(page)
        }
        const peopleList = await getPeople(page);
        console.log(peopleList);
        res.render('people', { title: 'Star Wars Characters', peopleList: peopleList.people, nextPage: peopleList.nextPage, previousPage: peopleList.previousPage });
    } catch (error) {
        console.log(error);
        res.status(500).render('error', { title: 'Error', statusCode: 500, error: error.message });
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        if (!req.params.id) throw "Please provide an ID";
        const person = await getPeopleById(req.params.id);
        res.render('personDetails', { title: person.name, person });
    } catch (error) {
        console.log(error);
        res.status(404).render('error', { title: '404 Error', statusCode: 404, error: error.message });
    }
});

export default router;
