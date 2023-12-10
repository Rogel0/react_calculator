import { ACTIONS } from "./App"

export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      className="cursor-pointer text-5xl border-green-500 border bg-green-100 hover:bg-green-200 focus:bg-green-200 rounded w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  )
}