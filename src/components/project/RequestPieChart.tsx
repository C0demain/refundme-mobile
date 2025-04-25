// src/components/project/RequestPieChart.tsx
import React from "react";
import { PieChart } from "react-native-svg-charts";
import { Text as SvgText } from "react-native-svg";
import { View, Text } from "react-native";

interface RequestPieChartProps {
  statusCounts: {
    Total: number;
    Pendente: number;
    Aprovada: number;
    Recusada: number;
    Rascunho: number;
  };
}

const colors = {
  Pendente: "#facc15",
  Aprovada: "#4ade80",
  Recusada: "#f87171",
  Rascunho: "#c084fc",
  Total: "#aeff85",
};

const RequestPieChart: React.FC<RequestPieChartProps> = ({ statusCounts }) => {
  const chartData = Object.entries(statusCounts)
    .filter(([, count]) => count > 0)
    .map(([status, count], index) => ({
      key: `${status}-${index}`,
      amount: count,
      svg: { fill: colors[status as keyof typeof colors] },
      label: status,
    }));

  // Tipar o "slices" corretamente
  const Labels = ({ slices }: { slices: Array<{ pieCentroid: [number, number]; data: { amount: number } }> }) =>
    slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <SvgText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={10}
        >
          {data.amount}
        </SvgText>
      );
    });

  return (
    <View style={{ marginTop: 20 }}>
        {statusCounts.Total>0 ? 
        <>
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={chartData}
                outerRadius={"95%"}
            >
                <Labels slices={[]} />
            </PieChart>
            <View style={{ marginTop: 10 }}>
                {chartData.map((d) => (
                    <Text key={d.key} style={{ color: d.svg.fill }}>
                        {d.label}: {d.amount}
                    </Text>
                ))}
            </View>
        </> : <><Text>Sem solicitações cadastradas</Text></>
      }
      
    </View>
  );
};

export default RequestPieChart;
