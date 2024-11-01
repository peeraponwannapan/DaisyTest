import liff, { type Liff } from '@line/liff'

const useLiff = async (
  liffId = import.meta.env.VITE_LIFF_ID,
): Promise<{ liff: Liff | null; error: Error | null }> => {
  let error: Error | null = null
  let liffInstance: Liff | null = null

  return liff
    .init({ liffId: liffId })
    .then(() => {
      liffInstance = liff
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href })
      }
      return { liff: liffInstance, error }
    })
    .catch(err => {
      // Handle error during initialization
      error = err
      console.log(err.code, err.message)
      return { liff: null, error }
    })
}

export default useLiff
