import formatMoney from "../../lib/formatMoney"
import { useTransactions } from "../../lib/TransactionsProvider"

export default function Overview() {
  const { overview } = useTransactions()

  return (
    <div>
      <h2 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Overview</h2>
      <div className="mt-3">
        <h3 className="text-gray-600 text-sm">Net</h3>
        <div className="text-3xl text-green-600">{formatMoney(overview.net)}</div>
      </div>
      <div className="flex flex-row justify-between mt-4">
        <div>
          <h3 className="text-gray-600 text-sm">Income</h3>
          <div className="text-xl">{formatMoney(overview.income)}</div>
        </div>
        <div>
          <h3 className="text-gray-600 text-sm">Expenses</h3>
          <div className="text-xl">{formatMoney(overview.expenses)}</div>
        </div>
      </div>
    </div>
  )
}
