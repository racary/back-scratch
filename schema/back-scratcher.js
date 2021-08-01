const backScrachter = {
  type: 'object',
  properties: {
    description: { type: 'string', isNotEmpty: true },
    name: { type: 'string', isNotEmpty: true },
    size: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    price: { type: 'number' }
  },
  required: ['description', 'name', 'size', 'price']
}

module.exports = { backScrachter }
