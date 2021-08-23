import React, { useState } from "react"

export type FormEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>
export default function useForm<T extends { [key: string]: any }>(initial: T = {} as T) {
  const [inputs, setInputs] = useState<T>(initial)

  const handleInput = (e: FormEvent) => {
    let { value, name, type }: { value: any; name: string; type: string } = e.target
    if (type === "number") {
      value = parseInt(value)
    } else if (type === "file") {
      value = (e.target as HTMLInputElement).files![0]
    }
    setInputs({ ...inputs, [name]: value })
  }

  const resetForm = () => {
    setInputs(initial)
  }

  const clearForm = () => {
    setInputs(Object.fromEntries(Object.entries(inputs).map(([key, _]) => [key, ""])) as T)
  }

  return { inputs, setInputs, resetForm, clearForm, handleInput }
}
