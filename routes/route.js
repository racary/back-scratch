const express = require('express')
const router = express.Router()

const Controller = require('../lib/controller')
const Validator = require('../validation/validator')

const validateRequest = (req, res, next) => {
  const { body, method } = req
  let result

  if (method === 'POST') {
    result = Validator.validateNewBackScratcher(body)
  } else if (method === 'PUT') {
    result = Validator.validateUpdateBackScratcher(body)
  } else {
    next()
  }

  if (result) {
    const { isValid, errors } = result

    if (isValid) {
      next()
    } else {
      res.status(400).send(errors)
    }
  }
}

router.use(validateRequest)

router.get('/status', (req, res, next) => res.send({ status: 'UP' }))

router.get('/back-scratchers', async (req, res, next) => {
  try {
    const backScratchers = await Controller.getBackScratchers()
    res.send(backScratchers)
  } catch (err) {
    next(err)
  }
})

router.get('/back-scratchers/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const backScratcher = await Controller.getBackScratcherById(id)
    if (backScratcher) {
      res.send(backScratcher)
    }
    res.status(404).send({message: `backscratcher with id ${id} does not exist.`})
  } catch (err) {
    next(err)
  }
})

router.put('/back-scratchers/:id', async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  try {
    const backScratcher = await Controller.updateBackScratcher(id, body)
    res.send(backScratcher)
  } catch (err) {
    next(err)
  }
})

router.post('/back-scratchers', async (req, res, next) => {
  const { body } = req
  try {
    const backScratcher = await Controller.addBackScratcher(body)
    res.send(backScratcher)
  } catch (err) {
    next(err)
  }
})

router.delete('/back-scratchers/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await Controller.deleteBackScratcher(id)
    res.send({ status: 'success' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
