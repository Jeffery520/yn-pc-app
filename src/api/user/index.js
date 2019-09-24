import api from '../index'

const header = {}

export default {
  articles(params) {
    // return出去了一个promise
    return api.get('/api/articles?type=more&category=home&shown_offset=1524276761019196&first_view=false', params, header)
  }
}