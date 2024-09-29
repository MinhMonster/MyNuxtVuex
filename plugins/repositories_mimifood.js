import createRepository from '~/repositories/Repository_mimifood'

export default (ctx, inject) => {
  inject('repositories_mimifood', createRepository(ctx.$api_food))
}
