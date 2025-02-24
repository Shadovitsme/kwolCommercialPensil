import router from '@/router'

export default function backButton(href) {
  router.replace({ path: href }).then(() => {
    window.location.href = href
  })
}
