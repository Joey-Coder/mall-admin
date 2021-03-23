const { Random } = require('mockjs')
const Mock = require('mockjs')

const data = Mock.mock({
  'items|8': [
    {
      id: '@id',
      account: '@natural(13000000000, 14000000000)',
      name: '@csentence(5,10)',
      'gender|1': ['1', '2'],
      phone: '@natural(13000000000, 14000000000)',
      email: '@email',
      tip: '@csentence(5,20)'
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/admin/list',
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
