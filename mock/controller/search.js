const List = [
  {
    url: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=2&tn=98010089_dg&wd=vue-admin-beautiful%E3%80%82com&oq=vab%2520admin&rsv_pq=dc5afda30001307b&rsv_t=7499ah29eFM%2BRxBxQ52tu1bRk3Q26pgzYw4Lc%2FIXuZaB29dJycOGEjC0BsFjEJ8Zeyc&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=7542&rsv_sug3=38&rsv_sug1=17&rsv_sug7=100&rsv_sug2=0&rsv_sug4=8866&rsv_sug=2',
    value: 'vue-admin-beautiful官网',
  },
]

module.exports = [
  {
    url: '/search/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: { list: List },
      }
    },
  },
]
