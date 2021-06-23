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
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ApexOptions} from 'ng-apexcharts';
import {MyInfoService} from './my-info.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

export interface SpendingCardResponse {
    taskCount: number;
    taskSpend: number;
}

@Component({
    selector: 'project',
    templateUrl: './my-info.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInfoComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public buyNecessitySpend = 0;
    public buyNecessityCount = 0;
    public foodDeliverySpend = 0;
    public foodDeliveryCount = 0;
    public sendDocumentSpend = 0;
    public sendDocumentCount = 0;
    public otherSpend = 0;
    public otherCount = 0;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    selectedProject: string = 'ACME Corp. Backend App';
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data
        this._projectService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });
        this._httpClient.get<SpendingCardResponse>('http://localhost:5000/api/v1/spending/buy-necessity/yesterday/61fe8602-af10-435c-b5e1-224f88a9aa61').subscribe((data) => {
            this.buyNecessityCount = data.taskCount;
            this.buyNecessitySpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>('http://localhost:5000/api/v1/spending/food-delivery/yesterday/61fe8602-af10-435c-b5e1-224f88a9aa61').subscribe((data) => {
            this.foodDeliveryCount = data.taskCount;
            this.foodDeliverySpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>('http://localhost:5000/api/v1/spending/send-document/yesterday/61fe8602-af10-435c-b5e1-224f88a9aa61').subscribe((data) => {
            this.sendDocumentCount = data.taskCount;
            this.sendDocumentSpend = data.taskSpend;
            this.cd.markForCheck();
        });
        this._httpClient.get<SpendingCardResponse>('http://localhost:5000/api/v1/spending/other/yesterday/61fe8602-af10-435c-b5e1-224f88a9aa61').subscribe((data) => {
            this.otherCount = data.taskCount;
            this.otherSpend = data.taskSpend;
            this.cd.markForCheck();
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

    public updateBuyNecessityCard(url: string): void {
        this._httpClient.get<SpendingCardResponse>(`http://localhost:5000/api/v1/spending/buy-necessity/${url}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.buyNecessityCount = data.taskCount;
            this.buyNecessitySpend = data.taskSpend;
            this.cd.markForCheck();
        });
    }

    public updateFoodDeliveryCard(url: string): void {
        this._httpClient.get<SpendingCardResponse>(`http://localhost:5000/api/v1/spending/food-delivery/${url}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.foodDeliveryCount = data.taskCount;
            this.foodDeliverySpend = data.taskSpend;
            this.cd.markForCheck();
        });
    }

    public updateSendDocumentCard(url: string): void {
        this._httpClient.get<SpendingCardResponse>(`http://localhost:5000/api/v1/spending/send-document/${url}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.sendDocumentCount = data.taskCount;
            this.sendDocumentSpend = data.taskSpend;
            this.cd.markForCheck();
        });
    }

    public updateOtherCard(url: string): void {
        this._httpClient.get<SpendingCardResponse>(`http://localhost:5000/api/v1/spending/other/${url}/61fe8602-af10-435c-b5e1-224f88a9aa61`).subscribe((data) => {
            this.otherCount = data.taskCount;
            this.otherSpend = data.taskSpend;
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
        // Github issues
        this.chartGithubIssues = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                background: {
                    borderWidth: 0
                }
            },
            grid: {
                borderColor: 'var(--fuse-border)'
            },
            labels: this.data.githubIssues.labels,
            legend: {
                show: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%'
                }
            },
            series: this.data.githubIssues.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75
                    }
                }
            },
            stroke: {
                width: [3, 0]
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    color: 'var(--fuse-border)'
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };

        // Task distribution
        this.chartTaskDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'polarArea',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            labels: this.data.taskDistribution.labels,
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    spokes: {
                        connectorColors: 'var(--fuse-border)'
                    },
                    rings: {
                        strokeColor: 'var(--fuse-border)'
                    }
                }
            },
            series: this.data.taskDistribution.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75
                    }
                }
            },
            stroke: {
                width: 2
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#93C5FD',
                    shadeIntensity: 0.75,
                    shadeTo: 'dark'
                }
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };

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
            series: this.data.budgetDistribution.series,
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
                categories: this.data.budgetDistribution.categories
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
            series: this.data.weeklyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.weeklyExpenses.labels
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
            series: this.data.monthlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.monthlyExpenses.labels
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
            series: this.data.yearlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.yearlyExpenses.labels
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
