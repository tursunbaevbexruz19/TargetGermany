export const metadata = {
  title: 'Target Germany Admin CMS',
  description: 'Manage content for Target Germany',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
