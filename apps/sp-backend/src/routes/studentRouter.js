const express = require('express');

const StudentCtrl = require('../controllers/managerController');

const router = express.Router();

router.post('/manager', StudentCtrl.createStudent);
router.post('/change-password', StudentCtrl.changePassword);
router.get('/student/:id', StudentCtrl.getStudentById);
router.put('/student/:id', StudentCtrl.updateStudent);
router.get('/students', StudentCtrl.getStudents);
/* router.post('/okta-student/', StudentCtrl.getOktaUser); */

module.exports = router;
