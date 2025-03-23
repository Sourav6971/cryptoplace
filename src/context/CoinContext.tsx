import { createContext, useEffect, useState } from "react";

interface CoinContextValue {
  allCoin: any[]; // Array to store all coin data
  currency: {
    name: string;
    symbol: string;
  };
  setCurrency: React.Dispatch<
    React.SetStateAction<{
      name: string;
      symbol: string;
    }>
  >;
}

export const CoinContext = createContext<CoinContextValue>({
  allCoin: [],
  currency: {
    name: "usd",
    symbol: "$",
  },
  setCurrency: () => {},
});

interface CoinContextProviderProps {
  children: React.ReactNode;
}

const CoinContextProvider = (props: CoinContextProviderProps) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const fetchAllCoin = async () => {
    const options: RequestInit = {
      // Explicitly typed as RequestInit
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY || "",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoin(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin(); // Correctly call the fetchAllCoin function
  }, [currency]);

  const contextValue: CoinContextValue = {
    allCoin,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
