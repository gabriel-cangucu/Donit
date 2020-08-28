
const routes = [
  { path: '/login', meta: { requiresAuth: false }, component: () => import('pages/Login.vue') },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', redirect: '/login' },
      { path: '/listas', name: 'Listas', component: () => import('pages/Listas.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
