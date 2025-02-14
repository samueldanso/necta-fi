import { Footer } from "./_components/footer"
import { Navbar } from "./_components/navbar"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F4ED]">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
