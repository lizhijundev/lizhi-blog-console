const List = [
  {
    url: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=2&tn=98010089_dg&wd=Vue%20Admin%20Plus&oq=vue%2520admin%2520plus%25E6%25BA%2590%25E7%25A0%2581&rsv_pq=d19d45100000c6c9&rsv_t=300bhWZmSGqR20csdesctCQDCJp3Qvj1u1683Q6UkaI9bdDBxfcvCM5nQ3vrplO%2BVME&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_btype=t&inputT=2611&si=vue-admin-beautiful.com&ct=2097152',
    value: '官网',
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
