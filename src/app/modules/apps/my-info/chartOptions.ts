import {
    ApexAxisChartSeries,
    ApexChart, ApexDataLabels,
    ApexFill, ApexMarkers, ApexPlotOptions, ApexStroke,
    ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    title: ApexTitleSubtitle;
    labels: string[];
    stroke: any; // ApexStroke;
    dataLabels: any; // ApexDataLabels;
    fill: ApexFill;
    tooltip: ApexTooltip;
};
export type RadarChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: any;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    colors: string[];
    yaxis: ApexYAxis;
    markers: ApexMarkers;
    xaxis: ApexXAxis;
};
export type PastTwoDaysEarning = {
    chart: ApexChart;
    colors: string[];
    series: ApexAxisChartSeries;
    stroke: ApexStroke;
    tooltip: any;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};
export type PastFiveDaysEarning = {
    chart: ApexChart;
    colors: string[];
    series: ApexAxisChartSeries;
    stroke: ApexStroke;
    tooltip: any;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};
export type PastTenDaysEarning = {
    chart: ApexChart;
    colors: string[];
    series: ApexAxisChartSeries;
    stroke: ApexStroke;
    tooltip: any;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};
