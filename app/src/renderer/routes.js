export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/View')
  },
  {
    path: '*',
    redirect: '/'
  }
]
