import Nav from "./Nav"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-7xl mx-auto py-8">{children}</div>
    </div>
  )
}
