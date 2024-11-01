import liff, { type Liff } from '@line/liff'

const useLiff = (
  liffId = import.meta.env.VITE_LIFF_ID,
): { liff: Liff | null; error: Error | null } => {
  let error: Error | null = null
  let liffInstance: Liff | null = null

  liff
    .init({ liffId: liffId })
    .then(async () => {
      liffInstance = liff
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href })
      }
    })
    .catch(err => {
      // Error happens during initialization
      error = err
      console.log(err.code, err.message)
    })

  return { liff: liffInstance, error }
}

export default useLiff
