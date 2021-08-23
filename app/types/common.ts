export type STATUS = "DEFAULT" | "LOADING" | "ERRORED"

export interface Response {
  type: "SUCCESS" | "ERROR"
  message?: string
  value?: any
}

export interface CreateTransaction {
  title: string
  amount: number
  categoryId?: number
}

export interface Transaction extends CreateTransaction {
  id: number
}

export interface CreateCategory {
  title: string
}

export interface Category extends CreateCategory {
  id: number
}
