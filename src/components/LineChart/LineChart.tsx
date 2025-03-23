import Chart from "react-google-charts";
import { useEffect, useState } from "react";

type PriceType = string[];

interface HistoricalDataType {
  name: string;
  prices: PriceType[];
}
interface LineChartProps {
  historicalData: HistoricalDataType;
}

const LineChart: React.FC<LineChartProps> = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <div>
      <Chart chartType="LineChart" data={data} height={"100%"} legendToggle />
    </div>
  );
};

export default LineChart;
