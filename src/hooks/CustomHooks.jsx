import { useState } from 'react'

const useFlag = (val) => {
  const [flag, setFlag] = useState(val)

  const falsy = () => setFlag(false)
  const truty = () => setFlag(true)

  return{ flag, falsy, truty }
}

export {useFlag}
