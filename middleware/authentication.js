import cookie from 'cookie'

export default function ({ redirect, req, route }) {
  if (route.path === '/admin/login') return

  let cookies = {}

  // SSR
  if (process.server && req?.headers?.cookie) {
    cookies = cookie.parse(req.headers.cookie)
  }

  // Client
  if (process.client) {
    cookies = cookie.parse(document.cookie || '')
  }

  if (!cookies.mbn) {
    return redirect('/admin/login')
  }

  let state
  try {
    state = JSON.parse(cookies.mbn)
  } catch (e) {
    return redirect('/admin/login')
  }

  const isLogin =
    state?.admin?.auth?.token &&
    state?.admin?.auth?.authenticated === true

  if (!isLogin) {
    return redirect('/admin/login')
  }
}
