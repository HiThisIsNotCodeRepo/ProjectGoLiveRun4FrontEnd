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
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import moment from 'moment';
import {
    ChartOptions,
    PastFiveDaysEarning,
    PastTenDaysEarning,
    PastTwoDaysEarning,
    RadarChartOptions
} from './chartOptions';

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

export interface DataSourceResponse {
    tasks: Task[];
}

export interface Task {
    no: number;
    completeDateTime: string;
    taskTitle: string;
    taskCategoryId: number;
    taskOwnerId: string;
    taskDeliveredId: string;
    taskFrom: string;
    taskTo: string;
    taskDeliverRate: number;
}

export interface EarningCardResponse {
    pastTwoDaysTotal: number;
    pastFiveDaysTotal: number;
    pastTenDaysTotal: number;
    pastTwoDays: number[];
    pastFiveDays: number[];
    pastTenDays: number[];
}

export interface EarningRadarResponse {
    buyNecessity: number;
    foodDelivery: number;
    sendDocument: number;
    other: number;
}

export const BASE_URL = 'http://localhost:5000/api/v1';
export const DATE_ARRAY = ['/spending/yesterday', '/spending/two-days-ago', '/spending/three-days-ago', '/spending/last-week', '/spending/this-week'];
export const CATEGORY_ARRAY = ['/buy-necessity', '/food-delivery', '/send-document', '/other'];
export const DATE_ARRAY_SUMMARY = ['/spending/this-week', '/spending/last-week'];
export const RADAR_DATE_ARRAY = ['/earning/radar/this-week', '/earning/radar/last-week'];

@Component({
    selector: 'project',
    templateUrl: './my-info.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInfoComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public spendingTaskSummaryChartOptions: Partial<ChartOptions>;
    public earningRadarChartOptions: Partial<RadarChartOptions>;
    public earningPastTowDaysChartOptions: Partial<PastTwoDaysEarning>;
    public earningPastFiveDaysChartOptions: Partial<PastFiveDaysEarning>;
    public earningPastTenDaysChartOptions: Partial<PastTenDaysEarning>;
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
    public earningPastTwoDaysTotal;
    public earningPastFiveDaysTotal;
    public earningPastTenDaysTotal;
    displayedColumns: string[] = ['no', 'title', 'complete', 'category', 'owner', 'deliver', 'from', 'to', 'rate'];
    spendingDataSource = new MatTableDataSource<Task>();
    earningDataSource = new MatTableDataSource<Task>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private cd: ChangeDetectorRef
    ) {
        this.spendingTaskSummaryChartOptions = {
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

        this.earningRadarChartOptions = {
            series: [
                {
                    name: 'Earning',
                    data: [20, 100, 40, 30]
                }
            ],
            chart: {
                height: 350,
                type: 'radar'
            },
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                radar: {
                    size: 140,
                    polygons: {
                        fill: {
                            colors: ['#f8f8f8', '#fff']
                        }
                    }
                }
            },
            colors: ['#FF4560'],
            markers: {
                size: 6,
                colors: ['#fff'],
                strokeColors: ['#FF4560'],
                strokeWidth: 5
            },
            tooltip: {
                y: {
                    formatter: (val): string => `$${val}`
                }
            },
            xaxis: {
                categories: [
                    'Buy Necessity',
                    'Food Delivery',
                    'Send Document',
                    'Other'
                ]
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (val, i): string => {
                        if (i % 2 === 0) {
                            return val + '';
                        } else {
                            return '';
                        }
                    }
                }
            }
        };
        this.earningPastTowDaysChartOptions = {
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
            series: [
                {
                    name: 'Expenses',
                    data: [4412, 4466]
                }
            ],
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: [
                    moment().subtract(2, 'days').format('DD MMM'),
                    moment().subtract(1, 'days').format('DD MMM')
                ]
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };
        this.earningPastFiveDaysChartOptions = {
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
            series: [
                {
                    name: 'Expenses',
                    data: [15521, 15519, 15522, 15521, 18000]
                }
            ],
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: [
                    moment().subtract(5, 'days').format('DD MMM'),
                    moment().subtract(4, 'days').format('DD MMM'),
                    moment().subtract(3, 'days').format('DD MMM'),
                    moment().subtract(2, 'days').format('DD MMM'),
                    moment().subtract(1, 'days').format('DD MMM')
                ]
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };
        this.earningPastTenDaysChartOptions = {
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
            series: [
                {
                    name: 'Expenses',
                    data: [45891, 45801, 45834, 45843, 45800, 45900, 45814, 45856, 45910, 45849]
                }
            ],
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: [
                    moment().subtract(10, 'days').format('DD MMM'),
                    moment().subtract(9, 'days').format('DD MMM'),
                    moment().subtract(8, 'days').format('DD MMM'),
                    moment().subtract(7, 'days').format('DD MMM'),
                    moment().subtract(6, 'days').format('DD MMM'),
                    moment().subtract(5, 'days').format('DD MMM'),
                    moment().subtract(4, 'days').format('DD MMM'),
                    moment().subtract(3, 'days').format('DD MMM'),
                    moment().subtract(2, 'days').format('DD MMM'),
                    moment().subtract(1, 'days').format('DD MMM')
                ]
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {


        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[0]}/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe((data) => {
            this.buyNecessityCount = data.taskCount;
            this.buyNecessitySpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[1]}/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe((data) => {
            this.foodDeliveryCount = data.taskCount;
            this.foodDeliverySpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[2]}/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe((data) => {
            this.sendDocumentCount = data.taskCount;
            this.sendDocumentSpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[0]}${CATEGORY_ARRAY[3]}/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe((data) => {
            this.otherCount = data.taskCount;
            this.otherSpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingSummaryResponse>(`${BASE_URL}${DATE_ARRAY_SUMMARY[0]}/summary/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe(
            (data) => {
                console.log(data);
                this.totalTasks = data.totalTasks;
                this.dollarSpent = data.dollarSpent;
                this.buyNecessityWeeklyCount = data.buyNecessity;
                this.foodDeliveryWeeklyCount = data.foodDelivery;
                this.sendDocumentWeeklyCount = data.sendDocument;
                this.otherWeeklyCount = data.other;
                this.spendingTaskSummaryChartOptions.series = [
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
        this._httpClient.get<DataSourceResponse>(`${BASE_URL}/spending/tasks/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe(
            (data) => {
                this.spendingDataSource.data = data.tasks;
                this.cd.markForCheck();
            }
        );

        // Get the data

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

    public tabChange(evt: any): void {
        console.log(evt);
        if (evt === 0) {
            this._httpClient.get<DataSourceResponse>(`${BASE_URL}/spending/tasks/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe(
                (data) => {
                    this.spendingDataSource.data = data.tasks;
                    this.spendingDataSource.paginator = this.paginator;
                }
            );
        } else if (evt === 1) {
            this._httpClient.get<DataSourceResponse>(`${BASE_URL}/earning/tasks/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe(
                (data) => {
                    this.earningDataSource.data = data.tasks;
                    this.earningDataSource.paginator = this.paginator;
                }
            );
            this._httpClient.get<EarningCardResponse>(`${BASE_URL}/earning/past-days/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe(
                (data) => {
                    this.earningPastTwoDaysTotal = data.pastTwoDaysTotal;
                    this.earningPastFiveDaysTotal = data.pastFiveDaysTotal;
                    this.earningPastTenDaysTotal = data.pastTenDaysTotal;
                    this.earningPastTowDaysChartOptions.series = [
                        {
                            name: 'Expenses',
                            data: data.pastTwoDays
                        }
                    ];
                    this.earningPastFiveDaysChartOptions.series = [
                        {
                            name: 'Expenses',
                            data: data.pastFiveDays
                        }
                    ];
                    this.earningPastTenDaysChartOptions.series = [
                        {
                            name: 'Expenses',
                            data: data.pastTenDays
                        }
                    ];
                    this.cd.markForCheck();
                    console.log(data);
                }
            );
            this._httpClient.get<EarningRadarResponse>(`${BASE_URL}/earning/radar/this-week/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe(
                (data) => {
                    this.earningRadarChartOptions.series = [
                        {
                            name: 'Earning',
                            data: [data.buyNecessity, data.foodDelivery, data.sendDocument, data.other]
                        }
                    ];
                    this.cd.markForCheck();
                    console.log(data);
                }
            );
        }

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
        this.spendingDataSource.paginator = this.paginator;
    }

    public updateCard(dateIndex: number, categoryIndex: number): void {
        this._httpClient.get<SpendingCardResponse>(`${BASE_URL}${DATE_ARRAY[dateIndex]}${CATEGORY_ARRAY[categoryIndex]}/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe((data) => {
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
        this._httpClient.get<SpendingSummaryResponse>(`${BASE_URL}${DATE_ARRAY_SUMMARY[dateIndex]}/summary/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe((data) => {
            console.log(data);
            this.totalTasks = data.totalTasks;
            this.dollarSpent = data.dollarSpent;
            this.buyNecessityWeeklyCount = data.buyNecessity;
            this.foodDeliveryWeeklyCount = data.foodDelivery;
            this.sendDocumentWeeklyCount = data.sendDocument;
            this.otherWeeklyCount = data.other;
            this.spendingTaskSummaryChartOptions.series = [
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

    public updateRadar(dateIndex: number): void {
        this._httpClient.get<EarningRadarResponse>(`${BASE_URL}${RADAR_DATE_ARRAY[dateIndex]}/13885722-107c-43e4-81a7-1c9be0577bf7`).subscribe(
            (data) => {
                this.earningRadarChartOptions.series = [
                    {
                        name: 'Earning',
                        data: [data.buyNecessity, data.foodDelivery, data.sendDocument, data.other]
                    }
                ];
                this.cd.markForCheck();
            }
        );
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
                el.setAttribute('fill', `

    url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}

`);
            });
    }


}
