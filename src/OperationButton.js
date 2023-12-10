import { ACTIONS } from "./App"

export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      className="cursor-pointer text-2xl border-blue-500 border bg-blue-100 hover:bg-blue-200 focus:bg-blue-200 rounded w-20 h-20 flex items-center justify-center"
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation}
    </button>
  )
}