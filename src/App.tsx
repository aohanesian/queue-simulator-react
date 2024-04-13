import { useEffect, useState } from "react";
import "./App.css";
import cashier from "./assets/cashier.png";

function App() {
  const [error, setError] = useState<string>(``);
  const [itemsInPersonCart, setItemsInPersonCart] = useState<string>(`1`);
  const [lines, setLines] = useState<number[][]>([
    [10, 5, 2],
    [1, 8, 1, 1],
    [2, 1, 1],
    [3, 40],
    [4],
  ]);

  function addPersonToLine(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let lineWithLeast: number[];
    let leastItemAmount: number = 1e9;
    for (const line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0);
      if (totalInLine < leastItemAmount) {
        leastItemAmount = totalInLine;
        lineWithLeast = line;
      }
    }

    if (+itemsInPersonCart > 0) {
      setError(``);
      setLines((prevLines) =>
        prevLines.map((line) =>
          line === lineWithLeast ? [...line, +itemsInPersonCart] : line
        )
      );
    } else {
      setError(`value must be a number greater than 0`);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      return setLines((prevLines) => {
        return prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((item) => item > 0)
        );
      });
    }, 1200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setItemsInPersonCart(event.target.value);
  }

  return (
    <main>
      <p>
        There are 4 cashiers and lines, circles represent people, numbers inside
        represent amount of groceries
      </p>
      {!!error && <p className="error">{error}</p>}
      <form onSubmit={addPersonToLine}>
        <input
          required
          value={itemsInPersonCart}
          type="number"
          onChange={(event) => inputHandler(event)}
        />
        <button>checkout</button>
      </form>
      <div className="lines">
        {lines.map((line, index) => (
          <div key={index}>
            <img className="cashier" src={cashier} alt="cashier" />
            <div className="line" key={index}>
              {line.map((numberOfItems, index) => (
                <div className="person" key={index}>
                  {numberOfItems}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
