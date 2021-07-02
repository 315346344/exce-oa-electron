// import { useState, useEffect } from 'react'
// import Axios from 'axios'

// export default config => {
//   const [output, setOutput] = useState<any>({
//     error: undefined,
//     data: undefined,
//     // loading: false,
//   })
//   const refresh = (overwriteConfig?) => {
//     // setOutput({ ...output, loading: true })
//     return Axios.request({ ...config, data: overwriteConfig })
//       .then(data => setOutput({ ...output, data }))
//       .catch(error => setOutput({ ...output, error }))
//     // .then(data => setOutput({ ...output, data, loading: false }))
//     // .catch(error => setOutput({ ...output, error, loading: false }))
//   }
//   // useEffect(() => {
//   //   if (isMounted) {
//   //     refresh()
//   //   }
//   // }, [])
//   return [output, refresh]
// }

// const [data, setData] = useAxios(
//   {
//     method: 'post',
//     url: '/user/12345',
// data: {
//   firstName: 'Fred',
//   lastName: 'Flintstone',
// },
//   },
//   false,
// )

// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   },
//   timeout: 1000,
//   ...//其他相关配置
// })

// useAxios hook
import { useState, useEffect } from 'react'
import axios from '../http/http'
// import axios from 'axios'

// axios.defaults.baseURL = 'http://10.10.10.137:8889'

const useAxios = () => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  const fetchData = ({ url, method, params }) => {
    axios[method](url, params)
      .then(res => {
        setResponse(res.data)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }

  return { response, loading, error, fetchData }
}

export default useAxios

// 18721808025
// 123456
