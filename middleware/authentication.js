import cookie from 'cookie'
export default function ({ redirect, req, route, store }) {
  if (!_.get(req, 'headers')) return

  if (_.get(req, 'headers.cookie')) {
    const parsedCookies = cookie.parse(req.headers.cookie)
    if (parsedCookies['mbn']) {
      const state = JSON.parse(parsedCookies['mbn'])
      const isLogin = state.admin.auth.token && state.admin.auth.authenticated
      if (!isLogin) {
        return redirect('/admin/login')
      }
    } else {
      return redirect('/admin/login')
    }
  } else {
    return redirect('/admin/login')
  }
}
