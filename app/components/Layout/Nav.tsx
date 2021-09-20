import Link from "next/link"
import { useRouter } from "next/router"

const navigation = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Settings", href: "/settings" },
]

export default function Nav() {
  const router = useRouter()

  return (
    <div className="bg-white shadow-sm">
      <header className="flex flex-row justify-between px-3 py-4 max-w-7xl mx-auto">
        <div>
          <Link href="/">
            <a className="text-gray-600 font-medium hover:text-primary-500">Home</a>
          </Link>
        </div>
        <nav className="space-x-3">
          {navigation.map((navItem) => (
            <Link href={navItem.href} key={navItem.href}>
              <a
                className={`${
                  router.pathname === navItem.href ? "text-primary-600" : "text-gray-600"
                }  font-medium hover:text-primary-500`}>
                {navItem.title}
              </a>
            </Link>
          ))}
        </nav>
      </header>
    </div>
  )
}
