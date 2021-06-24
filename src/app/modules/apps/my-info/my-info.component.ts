import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexYAxis,
    ApexTooltip,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexOptions
} from 'ng-apexcharts';
import {MyInfoService} from './my-info.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

export interface SpendingCardResponse {
    taskCount: number;
    taskSpend: number;
}

export interface SpendingSummaryResponse {
    lineData: number[];
    columnData: number[];
    totalTasks: number;
    dollarSpent: number;
    buyNecessity: number;
    foodDelivery: number;
    sendDocument: number;
    other: number;
}

export interface SpendingTasksResponse {
    tasks: Task[];
}

export interface Task {
    no: number;
    completeDateTime: string;
    taskTitle: string;
    taskCategoryId: number;
    taskFrom: string;
    taskTo: string;
    taskDeliverRate: number;
}

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
export const BASE_URL = 'http://localhost:5000/api/v1';
export const DATE_ARRAY = ['/spending/yesterday', '/spending/two-days-ago', '/spending/three-days-ago', '/spending/last-week', '/spending/this-week'];
export const CATEGORY_ARRAY = ['/buy-necessity', '/food-delivery', '/send-document', '/other'];
export const DATE_ARRAY_SUMMARY = ['/spending/this-week', '/spending/last-week'];

@Component({
    selector: 'project',
    templateUrl: './my-info.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInfoComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public chartOptions: Partial<ChartOptions>;
    public buyNecessitySpend;
    public buyNecessityCount;
    public foodDeliverySpend;
    public foodDeliveryCount;
    public sendDocumentSpend;
    public sendDocumentCount;
    public otherSpend;
    public otherCount;
    public totalTasks;
    public dollarSpent;
    public buyNecessityWeeklyCount;
    public foodDeliveryWeeklyCount;
    public sendDocumentWeeklyCount;
    public otherWeeklyCount;
    public spendingTasks: Task[];
    displayedColumns: string[] = ['no', 'title', 'category', 'from','to','rate'];
    dataSource = new MatTableDataSource<Task>();


    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    storeData: any;
    chartConfig: ApexOptions = {};
    series: any;


    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private _projectService: MyInfoService,
        private _router: Router,
        private _httpClient: HttpClient,
        private cd: ChangeDetectorRef
    ) {
        this.chartOptions = {
            series: [
                {
                    name: 'Task Qty',
                    type: 'column',
                    data: [440, 505, 414, 671, 227, 413, 201]
                },
                {
                    name: 'Expense',
                    type: 'line',
                    data: [23, 42, 35, 27, 43, 22, 17]
                }
            ],
            chart: {
                height: 350,
                type: 'line'
            },
            stroke: {
                width: [0, 4]
            },
            title: {
                text: 'Task Spend vs. Task Qty'
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1]
            },
            labels: [
                'Mon',
                'Tue',
                'Wed',
                'Thur',
                'Fri',
                'Sat',
                'Sun'
            ],
            xaxis: {
                type: 'category'
            },
            yaxis: [
                {
                    title: {
                        text: 'Task Qty'
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: 'Expense'
                    }
                }
            ]
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {


        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[0]}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.buyNecessityCount = data.taskCount;
            this.buyNecessitySpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[1]}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.foodDeliveryCount = data.taskCount;
            this.foodDeliverySpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[2]}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.sendDocumentCount = data.taskCount;
            this.sendDocumentSpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[3]}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.otherCount = data.taskCount;
            this.otherSpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingSummaryResponse>(`${BASE_URL}${DATE_ARRAY_SUMMARY[0]}/summary/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe(
            (data) => {
                console.log(data);
                this.totalTasks = data.totalTasks;
                this.dollarSpent = data.dollarSpent;
                this.buyNecessityWeeklyCount = data.buyNecessity;
                this.foodDeliveryWeeklyCount = data.foodDelivery;
                this.sendDocumentWeeklyCount = data.sendDocument;
                this.otherWeeklyCount = data.other;
                this.chartOptions.series = [
                    {
                        name: 'Task Qty',
                        type: 'column',
                        data: data.columnData
                    },
                    {
                        name: 'Expense',
                        type: 'line',
                        data: data.lineData
                    }
                ];
                this.cd.markForCheck();
            }
        );
        this._httpClient.get<SpendingTasksResponse>(`${BASE_URL}/spending/tasks/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe(
            (data) => {
                this.spendingTasks = data.tasks;
                this.dataSource.data = data.tasks;
                this.cd.markForCheck();
            }
        );
        // Get the data
        this._projectService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.storeData = data;
                // Prepare the chart data
                this._prepareChartData();
            });
        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    public updateCard(dateIndex: number, categoryIndex: number): void {
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[dateIndex]}${CATEGORY_ARRAY[categoryIndex]}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            if (categoryIndex === 0) {
                this.buyNecessityCount = data.taskCount;
                this.buyNecessitySpend = data.taskSpend;
            } else if (categoryIndex === 1) {
                this.foodDeliveryCount = data.taskCount;
                this.foodDeliverySpend = data.taskSpend;
            } else if (categoryIndex === 2) {
                this.sendDocumentCount = data.taskCount;
                this.sendDocumentSpend = data.taskSpend;
            } else if (categoryIndex === 3) {
                this.otherCount = data.taskCount;
                this.otherSpend = data.taskSpend;
            }
            this.cd.markForCheck();
        });
    }

    public updateSummary(dateIndex: number): void {
        this._httpClient.get<SpendingSummaryResponse>(`${BASE_URL}${DATE_ARRAY_SUMMARY[dateIndex]}/summary/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            console.log(data);
            this.totalTasks = data.totalTasks;
            this.dollarSpent = data.dollarSpent;
            this.buyNecessityWeeklyCount = data.buyNecessity;
            this.foodDeliveryWeeklyCount = data.foodDelivery;
            this.sendDocumentWeeklyCount = data.sendDocument;
            this.otherWeeklyCount = data.other;
            this.chartOptions.series = [
                {
                    name: 'Task Qty',
                    type: 'column',
                    data: data.columnData
                },
                {
                    name: 'Expense',
                    type: 'line',
                    data: data.lineData
                }
            ];
            this.cd.markForCheck();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {

        // Budget distribution
        this.chartBudgetDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'radar',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#818CF8'],
            dataLabels: {
                enabled: true,
                formatter: (val: number): string | number => `${val}%`,
                textAnchor: 'start',
                style: {
                    fontSize: '13px',
                    fontWeight: 500
                },
                background: {
                    borderWidth: 0,
                    padding: 4
                },
                offsetY: -15
            },
            markers: {
                strokeColors: '#818CF8',
                strokeWidth: 4
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: 'var(--fuse-border)',
                        connectorColors: 'var(--fuse-border)'
                    }
                }
            },
            series: this.storeData.budgetDistribution.series,
            stroke: {
                width: 2
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: (val: number): string => `${val}%`
                }
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '12px',
                        fontWeight: '500'
                    }
                },
                categories: this.storeData.budgetDistribution.categories
            },
            yaxis: {
                max: (max: number): number => parseInt((max + 10).toFixed(0), 10),
                tickAmount: 7
            }
        };

        // Weekly expenses
        this.chartWeeklyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#22D3EE'],
            series: this.storeData.weeklyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.storeData.weeklyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };

        // Monthly expenses
        this.chartMonthlyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#4ADE80'],
            series: this.storeData.monthlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.storeData.monthlyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };

        // Yearly expenses
        this.chartYearlyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#FB7185'],
            series: this.storeData.yearlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.storeData.yearlyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };
    }


}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
