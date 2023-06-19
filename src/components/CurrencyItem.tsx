import React from "react";

const CurrencyItem: React.FC<{
  currencies: string[];
  selectedCurrency: string;
  amount: number;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = (props) => {
  return (
    <div>
      <input
        type="number"
        value={props.amount}
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
