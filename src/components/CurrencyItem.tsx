import React from "react";
import "../css/CurrencyItem.css";

const CurrencyItem: React.FC<{
  placeHolder: string;
  currencies: string[];
  selectedCurrency: string;
  amount: number | string;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = (props) => {
  return (
    <div className="item">
      <input
        placeholder={props.placeHolder}
        type="number"
        value={props.amount}
        min={1}
        onChange={props.onChangeAmount}
      />
      <select value={props.selectedCurrency} onChange={props.onChange}>
        {props.currencies.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyItem;
