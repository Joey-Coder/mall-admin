const { Random } = require('mockjs')
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      name: '@csentence(5,10)',
      ip: '@ip',
      phone: '@natural(13000000000, 14000000000)',
      email: '@email',
      address: '@county(true)',
      create_time: '@datetime',
      login_time: '@datetime',
      tip: '@csentence(5,20)'
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/members/list',
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
