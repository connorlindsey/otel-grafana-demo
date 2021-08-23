/**
 * TransactionsProvider contains the state and mutations for
 * transactions and categories.
 *
 * React Context: https://reactjs.org/docs/context.html
 */

import React, { createContext, useState, useContext } from "react"
import { useEffect } from "react"
import { Response, CreateCategory, CreateTransaction, STATUS } from "../types/common"

type TransactionsContext = {
  // Methods
  createTransaction: Function
  generateTransactions: Function
  deleteTransaction: Function
  createCategory: Function
  deleteCategory: Function
  // State
  transactions: any[]
  categories: any[]
  overview: any
}

const transactionsContext = createContext<TransactionsContext>({} as TransactionsContext)
const { Provider } = transactionsContext

export const useTransactions = () => {
  return useContext(transactionsContext)
}

const TransactionsProvider = ({ children }) => {
  const [status, setStatus] = useState<STATUS>("DEFAULT")
  const [transactions, setTransactions] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [overview, setOverview] = useState<any[]>([])

  useEffect(() => {
    const fn = async () => {
      await getTransactions()
      await getCategories()
      await getOverview()
    }
    fn()
  }, [])

  const getTransactions = async (): Promise<Response> => {
    try {
      const res = await fetch("http://localhost:8080/transaction")
      const json = await res.json()
      setTransactions(json)

      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  const createTransaction = async (input: CreateTransaction): Promise<Response> => {
    try {
      const res = await fetch("http://localhost:8080/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
      const json = await res.json()
      if (res.status !== 200) {
        throw new Error(json.message)
      }

      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  const generateTransactions = async (): Promise<Response> => {
    try {
      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  const deleteTransaction = async (id: number): Promise<Response> => {
    try {
      const res = await fetch("http://localhost:8080/transaction", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      const json = await res.json()
      if (res.status !== 200) {
        throw new Error(json.message)
      }

      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  const getCategories = async (): Promise<Response> => {
    try {
      const res = await fetch("http://localhost:8080/category")
      const json = await res.json()
      setCategories(json)

      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  const createCategory = async (title: CreateCategory): Promise<Response> => {
    try {
      const res = await fetch("http://localhost:8080/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
      const json = await res.json()
      if (res.status !== 200) {
        throw new Error(json.message)
      }

      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  const deleteCategory = async (id: number): Promise<Response> => {
    try {
      const res = await fetch("http://localhost:8080/category", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      const json = await res.json()
      if (res.status !== 200) {
        throw new Error(json.message)
      }

      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  const getOverview = async (): Promise<Response> => {
    try {
      const res = await fetch("http://localhost:8080/overview")
      const json = await res.json()
      setOverview(json)

      return { type: "SUCCESS", message: "Success" }
    } catch (err) {
      return { type: "ERROR", message: err.message }
    }
  }

  return (
    <Provider
      value={{
        // Methods
        createTransaction,
        generateTransactions,
        deleteTransaction,
        createCategory,
        deleteCategory,
        // State
        transactions,
        categories,
        overview,
      }}>
      {children}
    </Provider>
  )
}

export { transactionsContext, TransactionsProvider }
