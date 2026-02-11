import express from 'express'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import { cancelServiceAppointment, confirmServicePayment, createServiceAppointment, getServiceAppointmentById, getServiceAppointments, getServiceAppointmentStats, updateServiceAppointment } from '../controllers/serviceAppointmentController.js'
import { getAppointmentsByPatient } from '../controllers/appointmentController.js';

const serviceAppointmentRouter = express.Router();

serviceAppointmentRouter.get('/', getServiceAppointments);
serviceAppointmentRouter.get('/confirm', confirmServicePayment)
serviceAppointmentRouter.get('/stats/summary', getServiceAppointmentStats)

serviceAppointmentRouter.post('/', clerkMiddleware(), requireAuth(), createServiceAppointment)
serviceAppointmentRouter.get('/me', clerkMiddleware(), requireAuth(), getAppointmentsByPatient)

serviceAppointmentRouter.get('/:id', getServiceAppointmentById)
serviceAppointmentRouter.get('/:id', updateServiceAppointment)
serviceAppointmentRouter.get('/:id/cancel', cancelServiceAppointment);

export default serviceAppointmentRouter;