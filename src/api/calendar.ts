import request from '@/utils/request'

/**
 * 获取日历列表
 */
export async function getCalendarList(params: any) {
  return request({
    url: '/admin/calendar/index',
    method: 'get',
    params,
  })
}

/**
 * 保存日历
 * @param data
 */
export async function saveCalendar(data: any) {
  return request({
    url: '/admin/calendar/save',
    method: 'post',
    data,
  })
}

export async function getCalendarEventList(params: any) {
  return request({
    url: '/admin/calendar_event/index',
    method: 'get',
    params,
  })
}

/**
 * 保存日历日程
 * @param data
 */
export async function saveCalendarEvent(data: any) {
  return request({
    url: '/admin/calendar_event/save',
    method: 'post',
    data,
  })
}
export async function deleteCalendarEvent(event_id: number) {
  return request({
    url: '/admin/calendar_event/delete',
    method: 'get',
    params: { event_id },
  })
}
