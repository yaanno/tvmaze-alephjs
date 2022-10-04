import Header from "../components/Header.tsx"
import Footer from "../components/Footer.tsx"
import React from "react"

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <React.StrictMode>
        <Header />
        {children}
        <Footer />
      </React.StrictMode>
    </>
  )
}
