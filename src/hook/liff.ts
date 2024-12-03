import { backEndApi } from '@/services/axios';
import liff, { type Liff } from '@line/liff'
import { decodeJwt } from 'jose'
import moment from 'moment'

const useLiff = async (
  liffId = import.meta.env.VITE_LIFF_ID,
): Promise<{ liff: Liff | null; error: Error | null }> => {
  let error: Error | null = null
  let liffInstance: Liff | null = null

  return liff
    .init({ liffId })
    .then(async () => {
      liffInstance = liff
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href })
      }
      const getTokenId = liff?.getIDToken() || ''
      const decode = decodeJwt(getTokenId)
      const dateToCheck = moment.unix(decode?.exp as number)
      if (decode && !dateToCheck.isAfter(moment())) {
        liff.logout();
        liff.login({ redirectUri: window.location.href });
      }
      await backEndApi.post(
        '/users/login-line',
        {},
        {
          headers: {
            Authorization: `Bearer ${getTokenId} `,
          },
        },
      )
      return { liff: liffInstance, error }

    })
    .catch(err => {
      // Handle error during initialization
      error = err
      return { liff: null, error }
    })
}

export default useLiff
