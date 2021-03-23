import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/test/list',
    method: 'get',
    params
  })
}
