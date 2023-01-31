const axios = require('axios')
const chalk = require('chalk')
!(() => {
  if (process.env.NODE_ENV !== 'development') {
    axios({
      url: 'https://vab-unicloud-3a9da9.service.tcloudbase.com/getRely',
      method: 'post',
      data: {
        customUserId: process.env.VUE_GITHUB_USER_NAME,
        secretKey: process.env.VUE_APP_SECRET_KEY,
        timestamp: new Date().getTime(),
      },
    })
      .then(({ data }) => {
        if (data.code != 200) {
          console.log(chalk.bgRed(data.msg))
        }
      })
      .catch(() => {})
  }
})()
