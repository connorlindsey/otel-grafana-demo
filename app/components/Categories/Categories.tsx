import { useTransactions } from "../../lib/TransactionsProvider"
import { FiPlus, FiTrash } from "react-icons/fi"
import useForm from "../../lib/useForm"

export default function Categories() {
  const { categories, createCategory, deleteCategory } = useTransactions()
  const { inputs, handleInput, resetForm } = useForm({ categoryTitle: "" })

  const onCreateCategory = async (e) => {
    e.preventDefault()
    const res = await createCategory(inputs.categoryTitle)
    alert(res.message)
    resetForm()
  }

  const onDeleteCategory = async (id: string) => {
    const res = await deleteCategory(id)
    alert(res.message)
  }

  return (
    <div>
      <h2 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Categories</h2>
      <div className="mt-3">
        <form onSubmit={onCreateCategory} className="flex items-center">
          <label htmlFor="categoryTitle" className="sr-only">
            Category Title
          </label>
          <input
            type="text"
            id="categoryTitle"
            name="categoryTitle"
            className="input mt-0 mr-2 bg-gray-50 shadow-inner"
            placeholder="New category"
            onChange={handleInput}
          />
          <button type="submit" className="btn-outline">
            <FiPlus className="h-5 w-5" />
          </button>
        </form>
        <div className="mt-2 space-y-2">
          {categories && categories.length
            ? categories.map((cat) => (
                <div
                  className="group flex justify-between items-center border border-gray-300 rounded-md bg-gray-50 py-2 px-3"
                  key={cat.id}>
                  <div>
                    <div>{cat.title}</div>
                  </div>
                  <FiTrash
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 hover:cursor-pointer"
                    onClick={() => onDeleteCategory(cat.id)}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}
