const { Random } = require('mockjs')
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      country: '@region()',
      area: '@province()',
      company: '@csentence(5,8)',
      method: '@csentence(3,5)',
      price: '@float(60,100,0,1)'
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/shipping/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
