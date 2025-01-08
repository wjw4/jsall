const routes = [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/chart', component: () => import('./views/Chart.vue') },
    { path: '/user-profile', component: () => import('./views/UserProfile.vue') },
    { path: '/explanation', component: () => import('./views/Explanation.vue') },
    { path: '/history', component: () => import('./views/History.vue') },
]

export default routes
