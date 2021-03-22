const { Random } = require('mockjs')
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      titleZh: '@sentence(10, 20)',
      titleEls: '@sentence(10, 20)',
      titleUs: '@sentence(10, 20)',
      titleTeq: '@sentence(10, 20)',
      titleAlb: '@sentence(10, 20)',
      'status|1': ['已下架', '已发布'],
      author: 'name',
      name: '@csentence(5,10)',
      desc: '@csentence(10,20)',
      pic: Random.image('80x70', '#4A7BF7', 'pic'),
      create_time: '@datetime',
      update_time: '@datetime',
      pageviews: '@integer(300, 5000)',
      price1: '@float(60,100,0,1)',
      'category|1': [
        ['一级 1', '一级 2'],
        ['一级 3', '一级 2']
      ],
      num1: '@integer(60, 500)',
      price2: '@float(60,100,0,1)',
      num2: '@integer(60, 500)',
      price3: '@float(60,100,0,1)',
      num3: '@integer(60, 500)',
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
