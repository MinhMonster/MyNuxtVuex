import createRepository from '~/repositories/Repository_mms'

export default (ctx, inject) => {
  inject('repositories_mms', createRepository(ctx.$api_mms))
}
