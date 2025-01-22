// src/app/code_qr/page.tsx

'use client'
import React, { useEffect, useState } from 'react'
import '@/app/styles/qr_code.css'
const styles = {
  page: 'page',
  qrcodepage: 'qrcodepage',
  qrcodecontainer: 'qrcodecontainer',
  qrcode: 'qrcode',
  sequencenumber: 'sequencenumber',
  uniquecode: 'uniquecode',
}

interface QRCodeData {
  path: string
  sequence: number
  code: string
}

const Page: React.FC = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([])

  useEffect(() => {
    const fetchQRCodes = async () => {
      const response = await fetch('/api/generateQRCodes')
      const data = await response.json()
      setQrCodes(data.qrPaths.map((qr: { path: string, code: string }, index: number) => ({
        path: qr.path,
        code: qr.code,
        sequence: index + 1,
      })))
    }
    fetchQRCodes()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.qrcodepage}>
        {qrCodes.map(({ path, sequence, code }) => (
          <div key={sequence} className={styles.qrcodecontainer}>
            <div className={styles.sequencenumber}>n° {sequence}</div>
            <div className={styles.uniquecode}>{code}</div> {/* Affiche le code unique */}
            <div className={styles.qrcode}>
              <img src={path} alt={`QR Code ${sequence}`} width={200} height={200} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
