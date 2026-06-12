import { Header } from "@/components/landing/header"
import HeroSection from "@/components/landing/hero-section"

export default function Page() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl overflow-hidden border-x px-4 lg:overflow-visible">
      <Header />
      <HeroSection />
    </div>
  )
}
