const express=require('express')
const router = express.Router()
const requireAuth=require('../middleware/requireAuth')
const blockClient = require('../middleware/blockClient')

const clientController=require('../controller/client/clientController')
router.post('/login',clientController.login)
router.post('/addClient',clientController.addClient)
router.post('/submit',clientController.submit)
router.get('/getUser',clientController.getUser)
router.get('/getBooking',clientController.getBooking)
router.get('/cancelBooking/:id',clientController.cancelBooking)
router.get('/getPrescription/:id',clientController.getPrescription)

router.use(requireAuth)
// router.use(blockClient)

router.get('/getdoctor/:id',clientController.getdoctor)
router.get('/getDepartment',clientController.getDepartment)

router.get('/getDoctors',clientController.getDoctors)



router.get('/getDoctorsByDepartment/:id',clientController.getDoctorsByDepartment)
router.post('/bookings/:id/:departmentid',clientController.bookDoctor)
router.post('/postbookings/:id/:departmentid',clientController.postbooking)



module.exports = router