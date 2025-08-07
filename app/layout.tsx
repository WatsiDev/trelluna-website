import '@/styles/globals.css'

export const metadata = {
  title: 'Trelluna',
  description: 'Trelluna es un dashboard tipo Kanban para gestionar tareas de forma intuitiva y rápida.',
  keywords: ['Trelluna', 'kanban', 'gestor de tareas', 'productividad'],
  authors: [{ name: 'WatsiDev - EmirZP - Angelsaas' }],
  openGraph: {
    title: 'Trelluna',
    description: 'Organiza tus tareas con Trelluna, un gestor tipo Kanban moderno y eficiente.',
    url: 'https://trelluna.netlify.app',
    siteName: 'Trelluna',
    images: [
      {
        url: '/og-image.svg', // imagen que irá en la vista previa de redes
        width: 1200,
        height: 630,
        alt: 'Vista previa del dashboard de Trelluna',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trelluna',
    description: 'Organiza tus tareas con Trelluna.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Meta de verificación de Google */}
        <meta name="google-site-verification" content="Dw6ZEE8PeEe1HjbzyOw2e2925WxzlWlGvbLpqnopqHM" />   
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
