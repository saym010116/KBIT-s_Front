import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'

const membersIdGuard = (to, from) => {
    if (from.name !== "members" && from.name !== "members/id") {
        return false;
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', name:'home', component: Home },
        { path: '/about', name:'about', component: About },
        { path: '/members', name:'members', component: Members },
        { path: '/members/:id', name:'members/id', component: MemberInfo, beforeEnter:membersIdGuard },
        { path: '/videos', name:'videos', component: Videos, children : [{ path: ':id', name:'videos/id', component: VideoPlayer }]},
    ]
})