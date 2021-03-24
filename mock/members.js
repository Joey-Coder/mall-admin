const { Random } = require('mockjs')
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      name: '@csentence(5,10)',
      'gender|1': ['1', '2'],
      ip: '@ip',
      phone: '@natural(13000000000, 14000000000)',
      email: '@email',
      'address|1': [
        ['130000', '130100', '130101'],
        ['110000', '110100', '110101'],
        ['150000', '150100', '150102']
      ],
      create_time: '@datetime',
      login_time: '@datetime',
      tip: '@csentence(5,20)',
      avatarUrl: '@url'
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
