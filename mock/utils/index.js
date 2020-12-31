const { Random } = require('mockjs')
const { join } = require('path')
const fs = require('fs')

/**
 * @description 随机生成图片url。
 * @param width
 * @param height
 * @returns {string}
 */
// eslint-disable-next-line no-unused-vars
function handleRandomImage(width = 50, height = 50) {
  //return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
  return `https://gitee.com/chu1204505056/image/raw/master/table/vab-image-${Random.integer(
    1,
    38
  )}.jpg`
}

/**
 * @description 处理所有 controller 模块，npm run serve时在node环境中自动输出controller文件夹下Mock接口，请勿修改。
 * @returns {[]}
 */
function handleMockArray() {
  const mockArray = []
  const getFiles = (jsonPath) => {
    const jsonFiles = []
    const findJsonFile = (path) => {
      const files = fs.readdirSync(path)
      files.forEach((item) => {
        const fPath = join(path, item)
        const stat = fs.statSync(fPath)
        if (stat.isDirectory() === true) findJsonFile(item)
        if (stat.isFile() === true) jsonFiles.push(item)
      })
    }
    findJsonFile(jsonPath)
    jsonFiles.forEach((item) => mockArray.push(`./controller/${item}`))
  }
  getFiles('mock/controller')
  return mockArray
}

module.exports = {
  handleRandomImage,
  handleMockArray,
}
