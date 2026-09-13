<template><div class="account-entry"><button class="avatar" type="button" :aria-label="isLoggedIn ? '打开账户菜单' : '登录或注册'" @click="toggle">{{ isLoggedIn ? user.name.slice(0, 1) : '登录' }}</button><Transition name="account-menu"><div v-if="menuOpen && isLoggedIn" class="account-menu"><b>{{ user.name }}</b><small>{{ user.email }}</small><router-link to="/account" @click="menuOpen = false">账户中心　→</router-link><button type="button" @click="signOut">退出登录</button></div></Transition></div></template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const router = useRouter(); const menuOpen = ref(false); const auth = useAuthStore(); const { user, isLoggedIn } = storeToRefs(auth)
function toggle() { if (!isLoggedIn.value) router.push('/auth'); else menuOpen.value = !menuOpen.value }
function signOut() { auth.logout(); menuOpen.value = false; router.push('/') }
</script>
