const { Random } = require('mockjs')
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['待支付', '已支付', '交易成功'],
      author: '@csentence(5,10)',
      tip: '@csentence(10,30)',
      create_time: '@datetime',
      pay_time: '@datetime',
      close_time: '@datetime',
      finish_time: '@datetime',
      price: '@float(60,100,0,1)',
      shipping: '@id'
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/order/list',
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
