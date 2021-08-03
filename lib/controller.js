const ControllerDS = require('./controller-ds')

class Controller {
  async init () {
    await ControllerDS.init()
  }

  async getBackScratchers () {
    const backscratchers = await ControllerDS.getAllBackScratchers()
    return backscratchers
  }

  async getBackScratcherById(id) {
    return await ControllerDS.getBackScratcherById(id)
  }

  async updateBackScratcher (id, update) {
    const { name, description, price, size } = update
    const updates = []
    if (name) {
      updates.push(`name = '${name}'`)
    }

    if (description) {
      updates.push(`description = '${description}'`)
    }

    if (price) {
      updates.push(`price = '${price}'`)
    }

    if (size) {
      const arrFormat = `'{${size.join(',')}}'`
      updates.push(`size = ${arrFormat}`)
    }

    const set = updates.join(', ')

    const backscratcher = await ControllerDS.udpateBackScratcher(id, set)
    return backscratcher
  }

  async addBackScratcher (backScratcher) {
    const result = await ControllerDS.createBackScratcher(backScratcher)
    return result
  }

  async deleteBackScratcher (id) {
    await ControllerDS.deleteBackScratcher(id)
  }
}

module.exports = new Controller()
