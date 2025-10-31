import cookie from 'cookie'
export default function ({ redirect, req, route, store }) {
  if (!_.get(req, 'headers')) return

  if (_.get(req, 'headers.cookie')) {
    const parsedCookies = cookie.parse(req.headers.cookie)
    if (parsedCookies['MuaBanNickPro']) {
      const state = JSON.parse(parsedCookies['MuaBanNickPro'])
      const isLogin = state.home.users.token && state.home.users.authenticated
      if (!isLogin) {
        return redirect('/')
      }
    } else {
      return redirect('/')
    }
  } else {
    return redirect('/')
  }
}
