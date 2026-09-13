import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const USERS_KEY = 'huaxia-zhiyou-users'
const SESSION_KEY = 'huaxia-zhiyou-session'

function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
async function passwordHash(password) {
  if (globalThis.crypto?.subtle) { const bytes = new TextEncoder().encode(password); const digest = await crypto.subtle.digest('SHA-256', bytes); return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('') }
  return btoa(unescape(encodeURIComponent(password)))
}
export const useAuthStore = defineStore('auth', () => {
  const user = ref(read(SESSION_KEY, null))
  const isLoggedIn = computed(() => Boolean(user.value))
  function saveSession(account) { const session = { name: account.name, email: account.email }; localStorage.setItem(SESSION_KEY, JSON.stringify(session)); user.value = session }
  async function register({ name, email, password }) { const users = read(USERS_KEY, []); if (users.some((item) => item.email === email.toLowerCase())) throw new Error('该邮箱已经注册，请直接登录。'); const account = { name: name.trim(), email: email.toLowerCase(), passwordHash: await passwordHash(password) }; localStorage.setItem(USERS_KEY, JSON.stringify([...users, account])); saveSession(account) }
  async function login({ email, password }) { const account = read(USERS_KEY, []).find((item) => item.email === email.toLowerCase()); if (!account || account.passwordHash !== await passwordHash(password)) throw new Error('邮箱或密码不正确。'); saveSession(account) }
  function logout() { localStorage.removeItem(SESSION_KEY); user.value = null }
  return { user, isLoggedIn, register, login, logout }
})
