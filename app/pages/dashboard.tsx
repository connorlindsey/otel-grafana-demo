import Head from "next/head"
import Overview from "../components/Overview"
import TransactionList from "../components/Transactions"
import Categories from "../components/Categories"
import { TransactionsProvider } from "../lib/TransactionsProvider"

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard | OpenTelemetry Grafana Demo</title>
      </Head>
      <TransactionsProvider>
        <main className="grid grid-cols-1 auto-rows-1fr gap-3 px-3 md:grid-cols-3 lg:grid-cols-12">
          <div className="rounded-md shadow bg-white px-3 py-4 lg:col-span-3">
            <Overview />
          </div>
          <div className="rounded-md shadow bg-white px-3 py-4 md:col-span-2 lg:col-span-6">
            <TransactionList />
          </div>
          <div className="rounded-md shadow bg-white px-3 py-4 lg:col-span-3">
            <Categories />
          </div>
        </main>
      </TransactionsProvider>
    </div>
  )
}
