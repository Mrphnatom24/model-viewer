// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Model Viewer Demo',
  description: 'Demo de model-viewer en Next.js App Router',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script 
          type="module" 
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js">
        </script>
      </head>
      <body>{children}</body>
    </html>
  )
}