import _ from 'lodash'

export const defaultPagy = _.cloneDeep({
  count: 1,
  page: 1,
  per_page: 15,
  pages: 0,
  from: 0,
  to: 0
})

