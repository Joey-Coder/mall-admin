const { Random } = require('mockjs')
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['已下架', '已发布'],
      author: 'name',
      name: '@csentence(5,10)',
      desc: '@csentence(10,20)',
      pic: Random.image('80x70', '#4A7BF7', 'pic'),
      create_time: '@datetime',
      update_time: '@datetime',
      pageviews: '@integer(300, 5000)',
      price: '@float(60,100,0,2)',
      'category|1': ['手机', '家居', '生活用品'],
      num: '@integer(60, 500)',
      content: '@csentence(100,200)'
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
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
