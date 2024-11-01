import liff, { type Liff } from '@line/liff'
import { ref } from 'vue'
import type { Ref } from 'vue' // Type-only import

const useLiff = (
  liffId = import.meta.env.VITE_LIFF_ID,
): { liff: Ref<Liff | null>; error: Ref<Error | null> } => {
  const error = ref<null>(null)
  const liffInstance = ref<Liff | null>(null)

  liff
    .init({ liffId: liffId })
    .then(() => {
      liffInstance.value = liff
      error.value = null
      console.log(liff.getProfile())
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href })
      }
    })
    .catch(err => {
      // Error happens during initialization
      console.log(err.code, err.message)
    })

  return { liff: liffInstance, error }
}

export default useLiff
