import cookie from 'cookie'

export default function ({ store, redirect, req }) {

  // =====================
  // CLIENT SIDE
  // =====================
  if (process.client) {
    if (!store.state.home.users.authenticated) {
      return redirect('/')
    }
    return
  }

  // =====================
  // SERVER SIDE
  // =====================
  if (!req?.headers?.cookie) {
    return redirect('/')
  }

  try {
    const parsedCookies = cookie.parse(req.headers.cookie)
    const rawState = parsedCookies['MuaBanNickPro']

    if (!rawState) {
      return redirect('/')
    }

    const state = JSON.parse(rawState)
    const userState = state?.home?.users

    if (!userState?.authenticated || !userState?.token) {
      return redirect('/')
    }

  } catch (e) {
    return redirect('/')
  }
}
