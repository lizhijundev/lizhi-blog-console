import request from '@/utils/request'

/**
 * 获取文章分类列表
 */
export async function getArticleCateList() {
  return request({
    url: '/admin/article_cate/index',
    method: 'get',
  })
}

/**
 * 保存文章分类
 * @param data
 */
export async function saveArticleCate(data: any) {
  return request({
    url: '/admin/article_cate/save',
    method: 'post',
    data,
  })
}

/**
 * 获取文章分类列表
 */
export async function getArticleTagList() {
  return request({
    url: '/admin/article_tag/index',
    method: 'get',
  })
}

/**
 * 保存文章分类
 * @param data
 */
export async function saveArticleTag(data: any) {
  return request({
    url: '/admin/article_tag/save',
    method: 'post',
    data,
  })
}


/**
 * 获取文章列表
 * @param params
 */
export async function getArticleList(params: any) {
  return request({
    url: '/admin/article/index',
    method: 'get',
    params: params,
  })
}

/**
 * 获取文章详情
 * @param article_id
 */
export async function getArticleDetail(article_id: number) {
  return request({
    url: '/admin/article/detail',
    method: 'get',
    params: {
      article_id,
    },
  })
}

/**
 * 保存文章
 * @param data
 */
export async function saveArticle(data: any) {
  return request({
    url: '/admin/article/save',
    method: 'post',
    data,
  })
}

/**
 * 删除文章
 * @param article_id
 */
export async function deleteArticle(article_id: number) {
  return request({
    url: '/admin/article/delete',
    method: 'get',
    params: {
      article_id,
    },
  })
}
