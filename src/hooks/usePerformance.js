import { useState, useEffect } from 'react'

export function usePerformance() {
  const [isLowPerf, setIsLowPerf] = useState(false)
  useEffect(() => {
    const mem = navigator.deviceMemory
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const slowNet = conn && ['2g', 'slow-2g'].includes(conn.effectiveType)
    const lowMem = mem !== undefined && mem < 4
    setIsLowPerf(lowMem || !!slowNet)
  }, [])
  return isLowPerf
}
