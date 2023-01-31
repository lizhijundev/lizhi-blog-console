import request from '@/utils/request'

export function getList() {
  return request({
    url: 'https://fc-mp-851edf02-46eb-43e6-828d-64c7e483ea41.next.bspapp.com/http/getDescription',
    method: 'get',
  })
}
