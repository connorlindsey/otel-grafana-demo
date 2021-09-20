import { FiTrash } from "react-icons/fi"
import formatMoney from "../../lib/formatMoney"
import { useTransactions } from "../../lib/TransactionsProvider"
import TransactionForm from "./TransactionForm"

export default function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions()

  const onDeleteTransaction = async (id: number) => {
    const res = await deleteTransaction(id)
    alert(res.message)
  }

  return (
    <div>
      <h2 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Transactions</h2>
      <div className="table-wrapper mt-3">
        <table className="table">
          <thead className="thead">
            <tr>
              <th scope="col" className="th">
                ID
              </th>
              <th scope="col" className="th w-[40%]">
                Description
              </th>
              <th scope="col" className="th w-[30%]">
                Category
              </th>
              <th scope="col" className="th text-right w-[20%]">
                Amount
              </th>
              <th>
                <span className="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          <tbody className="tbody">
            <tr>
              <TransactionForm />
            </tr>
            {transactions && transactions.length > 0 ? (
              <>
                {transactions.map((t) => (
                  <tr key={t.id} className="group">
                    <td className="td">{t.id}</td>
                    <td className="td text-gray-900 font-medium">{t.title}</td>
                    <td className="td pl-5">{t.category?.title || ""}</td>
                    <td className="td text-right">{formatMoney(t.amount)}</td>
                    <td className="td">
                      <FiTrash
                        className="text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:cursor-pointer"
                        onClick={() => onDeleteTransaction(t.id)}
                      />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={5} className="td">
                  No transactions recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
