const express = require('express')
const router = express.Router();
const adminAuth=require('../middleware/requireAuth')


const adminController = require('../controller/admin/adminController')
const upload = require('../util/multer')
router.post('/login',adminController.login)

router.get('/addDoctor',adminController.getDepartment)
router.post('/addDoctor',upload.single('image'), adminController.doctorData)



router.get('/getBookings',adminController.getBookings)
router.get('/blockdoctor/:id',adminController.blockdoctor)
router.get('/blockdepartments/:id',adminController.blockDepartments)
router.get('/blockclient/:id',adminController.blockClient)
router.get('/getDoctors',adminController.getDoctors)
router.get('/cancelbooking/:id',adminController.cancelbooking)
router.get('/getDepartments',adminController.getDepartments)
router.get('/getPrescription/:id',adminController.getPrescription)
router.use(adminAuth)
router.get('/getClients',adminController.getClients)

router.post('/addDepartment',upload.single('image'), adminController.addDepartment)

module.exports = router
