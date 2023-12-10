import { useReducer } from "react";
import DigitButton from "./Digitbutton";
import OperationButton from "./OperationButton";


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid grid justify-center mt-8 gap-4 grid-cols-4 grid-rows-6 rounded-lg shadow-lg p-6 bg-black max-w-md w-98 mx-96 ">
  <div className="output col-start-1 col-end-5 bg-gray-200 flex flex-col items-end justify-around p-5 break-all rounded-lg h-20">
    <div className="previous-operand text-gray-500 text-1xl">
      {formatOperand(previousOperand)} {operation}
    </div>
    <div className="current-operand text-gray-800 text-3xl">
      {formatOperand(currentOperand)}
    </div>
  </div>
  <button
    className="span-two col-span-2 cursor-pointer text-5xl border-gray-300 border bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 rounded"
    onClick={() => dispatch({ type: ACTIONS.CLEAR })}
  >
    AC
  </button>
  <button
    className="cursor-pointer text-5xl border-gray-300 border bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 rounded"
    onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
  >
    DEL
  </button>
  <OperationButton operation="÷" dispatch={dispatch} />
  <DigitButton digit="1" dispatch={dispatch} />
  <DigitButton digit="2" dispatch={dispatch} />
  <DigitButton digit="3" dispatch={dispatch} />
  <OperationButton operation="*" dispatch={dispatch} />
  <DigitButton digit="4" dispatch={dispatch} />
  <DigitButton digit="5" dispatch={dispatch} />
  <DigitButton digit="6" dispatch={dispatch} />
  <OperationButton operation="+" dispatch={dispatch} />
  <DigitButton digit="7" dispatch={dispatch} />
  <DigitButton digit="8" dispatch={dispatch} />
  <DigitButton digit="9" dispatch={dispatch} />
  <OperationButton operation="-" dispatch={dispatch} />
  <DigitButton digit="." dispatch={dispatch} />
  <DigitButton digit="0" dispatch={dispatch} />
  <button
    className="span-two col-span-2 cursor-pointer text-5xl border-gray-300 border bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 rounded"
    onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
  >
    =
  </button>
</div>
  );
}

export default App;
