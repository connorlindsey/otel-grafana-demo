import Nav from "./Nav"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      {children}
    </div>
  )
}
