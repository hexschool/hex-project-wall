import httpRequest from '../apis/httpRequest'

/**
 * 取得所有作品牆資料
 *
 * @returns {Promise} A promise that resolves to the response data containing the list of projects.
 */
export const apiGetProjects = (): Promise<any> =>
  httpRequest.http.get(
    'https://raw.githubusercontent.com/hexschool/hexschoolActionAPI/master/data.json'
  )

/**
 * 取得所有課程分類
 *
 * @returns {Promise} A promise that resolves to the response data containing the list of projects.
 */
export const apiGetCategories = (): Promise<any> =>
  httpRequest.http.get(
    'https://raw.githubusercontent.com/hexschool/hexschoolActionAPI/refs/heads/master/category.json'
  )
