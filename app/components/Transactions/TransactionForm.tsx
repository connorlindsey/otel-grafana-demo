import { FiPlus } from "react-icons/fi"
import { useTransactions } from "../../lib/TransactionsProvider"
import useForm from "../../lib/useForm"

export default function TransactionForm() {
  const { categories, createTransaction } = useTransactions()
  const { inputs, handleInput, resetForm } = useForm({
    description: "",
    categoryId: "",
    amount: "",
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await createTransaction(inputs)
    alert(res.message)
    resetForm()
  }

  return (
    <>
      <td className="px-3 py-2 td"></td>
      <td className="px-3 py-2">
        <label htmlFor="title" className="sr-only">
          Transaction description
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="input mt-0 text-sm px-2 py-1"
          placeholder="Description"
          onChange={handleInput}
        />
      </td>
      <td className="px-3 py-2">
        <label htmlFor="categoryId" className="sr-only">
          Transaction category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className={`input mt-0 text-sm px-2 py-1 ${true ? "text-gray-500" : ""}`}
          placeholder="Category"
          value={inputs.categoryId}
          onChange={handleInput}>
          <option value="" disabled={true}>
            Category
          </option>
          {categories &&
            categories.length &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
        </select>
      </td>
      <td className="px-3 py-2">
        <label htmlFor="amount" className="sr-only">
          Transaction amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="amount"
            name="amount"
            type="text"
            className="input mt-0 text-sm px-2 py-1 pl-5"
            placeholder=""
            onChange={handleInput}
          />
        </div>
      </td>
      <td className="td text-center">
        <button onClick={onSubmit}>
          <FiPlus className="cursor-pointer hover:text-gray-600" />
        </button>
      </td>
    </>
  )
}
