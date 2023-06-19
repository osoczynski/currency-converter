import { useEffect, useState } from "react";
import "./App.css";
import CurrencyItem from "./components/CurrencyItem";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const access_key = "bdnxFnsnEkbL0WvLAB2bX7TWc2h7RwxuKxoKlEnd";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=";

function App() {
  const [currenciesOptions, setCurrenciesOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [fromAmountCurrency, setFromtAmontCurrency] = useState<boolean>(true);
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  let toAmount, fromAmount;
  if (fromAmountCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  useEffect(() => {
    fetch(`${BASE_URL}${access_key}`)
      .then((res) => res.json())
      .then((data) => setCurrenciesOptions(Object.keys(data.data)));
  }, []);

  useEffect(() => {
    if (fromCurrency !== "" && toCurrency !== "")
      fetch(
        `${BASE_URL}${access_key}&currencies=${toCurrency}&base_currency=${fromCurrency}`
      )
        .then((res) => res.json())
        .then((data) =>
          setExchangeRate(Number(Object.values(data.data).pop()))
        );
  }, [fromCurrency, toCurrency]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
    setFromtAmontCurrency(true);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
    setFromtAmontCurrency(false);
  };

  return (
    <div className="converter">
      <h1>Converter</h1>
      <CurrencyItem
        currencies={currenciesOptions}
        selectedCurrency={fromCurrency}
        amount={fromAmount}
        onChangeAmount={handleFromChange}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFromCurrency(e.target.value)
        }
      />
      <CurrencyItem
        currencies={currenciesOptions}
        selectedCurrency={toCurrency}
        amount={toAmount}
        onChangeAmount={handleToChange}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setToCurrency(e.target.value)
        }
      />
    </div>
  );
}

export default App;
