import { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "@/supabase";
import React from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
  viewName : string,
  colors?: string[],
};

function PieChart({
  viewName = "",
  colors = ['#F44336','#E91E63','#9C27B0','#F44336']
}: Props) {
  const [insights, setInsights] = useState<any>(false);
  const [chartData, setChartData] = useState<any>(false);

  const fetchData = async () => {
    const { data } = await supabase.from(`${viewName}`).select('*');
    let temp = data && data.filter((obj) => obj.party !== "unknown")
    setInsights(temp);
  };


  useEffect(() => {
    if (!insights) return
    setChartData(
      {
        series: insights?.map((x: any) => x.count),
        options: {
          dataLabels : {
            enabled : false
          },
          tooltip : {
            fillSeriesColor : false
          },
          fill : {
            colors: colors
          },
          legend : {
            show : false
          },
          pie : {
            lables : {
              show : false
            }
          },
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: insights?.map((x: any) => x.party),
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 100
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
    )
  }, [insights]);


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {
        insights && chartData ? <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} /> : <></>
      }
    </div>
  );
}

export default PieChart;
