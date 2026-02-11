import express from 'express'
import multer from 'multer'

import {
  createService,
  deleteService,
  getService,
  getServiceById,
  updateService
} from '../controllers/serviceController.js'

const upload = multer({ dest: "/tmp" })
const serviceRouter = express.Router();

// GET
serviceRouter.get('/', getService)
serviceRouter.get('/:id', getServiceById)

// POST
serviceRouter.post('/', upload.single("image"), createService)

// PUT
serviceRouter.put('/:id', upload.single("image"), updateService)

// DELETE
serviceRouter.delete('/:id', deleteService)

export default serviceRouter;
