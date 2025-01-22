// src/pages/api/generateQRCodes.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

// Générer 305 nombres uniques de 15 chiffres
const generateUniqueNumbers = (count: number): string[] => {
  const uniqueNumbers = new Set<string>()
  while (uniqueNumbers.size < count) {
    const number = Math.floor(Math.random() * 10 ** 17).toString().padStart(15, '0')
    uniqueNumbers.add(number)
  }
  return Array.from(uniqueNumbers)
}

// Sauvegarder chaque QR code en tant qu'image PNG
const saveQrCode = async (number: string, sequence: number): Promise<{ path: string; code: string }> => {
  const filename = `qrcode-${sequence}-${number}.png`
  const outputPath = path.join(process.cwd(), 'public', 'qrcodes', filename)

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  }

  const qrDataUrl = await QRCode.toDataURL(number)
  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '')

  fs.writeFileSync(outputPath, base64Data, 'base64')
  return { path: `/qrcodes/${filename}`, code: number }
}

// Fonction pour sauvegarder tous les codes uniques dans un fichier texte
const saveCodesToTextFile = (codes: string[]) => {
  const filePath = path.join(process.cwd(), 'public', 'qrcodes', 'unique_codes.txt')
  const data = codes.join('\n')  // Ajouter chaque code sur une nouvelle ligne
  fs.writeFileSync(filePath, data, 'utf8')
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const numbers = generateUniqueNumbers(65)
    const qrPaths = await Promise.all(
      numbers.map((number, index) => saveQrCode(number, index + 1))
    )

    // Sauvegarde des codes dans un fichier texte après génération des QR codes
    saveCodesToTextFile(numbers)

    res.status(200).json({ qrPaths })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
