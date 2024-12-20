import express from 'express';
import {
  getAppointments,
  createAppointment,
  getAppointmentById,
  getAppointmentsByPatient,
  getAppointmentsByClinic,
  getAppointmentsByDoctor,
  updateAppointment,
  deleteAppointment,
  cancelAppointment,
  completeAppointment,
  noShowAppointment,
  getAvailableAppointments,
  getAppointmentWeather,
} from '../controllers/appointmentController.js';
import { verifyAuth } from '../middleware/verifyAuth.js';

const router = express.Router();

router.use(verifyAuth);

router.get('/', getAppointments);
router.post('/', createAppointment);


router.get('/available', getAvailableAppointments);

router.put('/:id/cancel', cancelAppointment);
router.put('/:id/complete', completeAppointment);
router.put('/:id/noshow', noShowAppointment);

router.get('/:id', getAppointmentById);
router.get('/:id/weather', getAppointmentWeather);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

router.get(
  '/patient/:patientId',
  getAppointmentsByPatient
);
router.get(
  '/doctor/:doctorId',
  getAppointmentsByDoctor
);
router.get(
  '/clinic/:clinicId',
  getAppointmentsByClinic
);

export default router;
