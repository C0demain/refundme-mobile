// src/components/project/RequestPieChart.tsx
import React from "react";
import { PieChart } from "react-native-svg-charts";
import { Text as SvgText } from "react-native-svg";
import { View, Text } from "react-native";
import Request from "@/src/types/request"; // Se você tiver o tipo "Request" certinho.

interface RequestPieChartProps {
  requests: Request[];
}

const colors = {
  Pendente: "#FCD34D",
  Aprovado: "#86EFAC",
  Recusado: "#FCA5A5",
  Rascunho: "#c084fc",
};

const RequestPieChart: React.FC<RequestPieChartProps> = ({ requests }) => {
  const statusCounts = {
    Pendente: 0,
    Aprovado: 0,
    Recusado: 0,
    Rascunho: 0,
  };

  requests.forEach((request) => {
    if (statusCounts.hasOwnProperty(request.status)) {
      statusCounts[request.status as keyof typeof statusCounts]++;
    }
  });

  const total = requests.length;

  const chartData = Object.entries(statusCounts)
    .filter(([, count]) => count > 0)
    .map(([status, count], index) => ({
      key: `${status}-${index}`,
      amount: count,
      svg: { fill: colors[status as keyof typeof colors] },
      label: status,
    }));

  // Aqui sim, Labels é um COMPONENTE que recebe slices
  const Labels = ({ slices }: { slices: any[] }) => {
    return slices.map((slice, index) => {
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
  };

  return (
    <View style={{ marginTop: 20 }}>
      {total > 0 ? (
        <>
          <PieChart
            style={{ height: 200 }}
            valueAccessor={({ item }) => item.amount}
            data={chartData}
            outerRadius={"95%"}
          >
            {/* Aqui, certo: você chama o componente separadamente */}
            <Labels slices={[]} />
          </PieChart>

          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "gray" }}>Total: {total}</Text>
            {chartData.map((d) => (
              <Text key={d.key} style={{ color: d.svg.fill }}>
                {d.label}: {d.amount}
              </Text>
            ))}
          </View>
        </>
      ) : (
        <Text>Sem solicitações cadastradas</Text>
      )}
    </View>
  );
};

export default RequestPieChart;
