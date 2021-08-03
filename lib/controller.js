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
    const setValuesToUpdate = Object.entries(update).map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key} = '{${value.join(',')}}'`
      }
      return `${key} = ${value}`
    }).join(', ')

    const backscratcher = await ControllerDS.udpateBackScratcher(id, setValuesToUpdate)
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
