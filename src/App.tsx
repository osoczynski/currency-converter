import "./css/App.css";
import { useEffect, useState } from "react";
import CurrencyItem from "./components/CurrencyItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

const access_key = "bdnxFnsnEkbL0WvLAB2bX7TWc2h7RwxuKxoKlEnd";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=";

function App() {
  const [currenciesOptions, setCurrenciesOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number | string>();
  const [fromAmountCurrency, setFromtAmontCurrency] = useState<boolean>(true);
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  let toAmount, fromAmount;
  if (amount !== "") {
    if (fromAmountCurrency) {
      fromAmount = amount;
      toAmount = +(+amount! * exchangeRate).toFixed(2);
    } else {
      toAmount = amount;
      fromAmount = +(+amount! / exchangeRate).toFixed(2);
    }
  } else {
    toAmount = "";
    fromAmount = "";
  }
  useEffect(() => {
    fetch(`${BASE_URL}${access_key}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrenciesOptions(Object.keys(data.data));
        setFromCurrency(Object.keys(data.data)[8]);
        setToCurrency(Object.keys(data.data)[31]);
      });
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
    if (e.target.value !== "") {
      setAmount(+e.target.value);
      setFromtAmontCurrency(true);
    } else setAmount("");
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setAmount(+e.target.value);
      setFromtAmontCurrency(false);
    } else setAmount("");
  };

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter">
      <h1>Currency Converter</h1>
      <CurrencyItem
        placeHolder="From"
        currencies={currenciesOptions}
        selectedCurrency={fromCurrency}
        amount={fromAmount!}
        onChangeAmount={handleFromChange}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFromCurrency(e.target.value)
        }
      />
      <FontAwesomeIcon icon={faRightLeft} onClick={handleSwitch} />
      <CurrencyItem
        placeHolder="To"
        currencies={currenciesOptions}
        selectedCurrency={toCurrency}
        amount={toAmount!}
        onChangeAmount={handleToChange}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setToCurrency(e.target.value)
        }
      />
    </div>
  );
}

export default App;
