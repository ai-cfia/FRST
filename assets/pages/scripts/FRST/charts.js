let Charts = function() {

    return {

        costColours: (["rgba(238, 59, 59, 0.8)", "rgba(231, 019, 99, 0.8)", "rgba(250, 128, 114, 0.8)", "rgba(250, 0, 0, 0.8)", "rgba(165, 48, 48, 0.8)",
            "rgba(238, 59, 59, 0.4)", "rgba(231, 019, 99, 0.4)", "rgba(250, 128, 114, 0.4)", "rgba(250, 0, 0, 0.4)", "rgba(165, 48, 48, 0.4)"
        ]),

        releaseColours: (["rgba(30,144,255,0.8)", "rgba(0,255,255,0.8)", "rgba(134,206,235,0.8)", "rgba(0,0,250,0.8)", "rgba(66,105,225,0.8)",
            "rgba(30,144,255,0.4)", "rgba(0,255,255,0.4)", "rgba(134,206,235,0.4)", "rgba(0,0,250,0.4)", "rgba(66,105,225,0.4)"
        ]),

        minReleaseColours: (["rgba(50,204,0,0.8)", "rgba(102,255,102, 0.8)", "rgba(51,255,153, 0.8)", "rgba(0,255,0,0.8)", "rgba(0,102,51, 0.8)",
            "rgba(50,204,0,0.4)", "rgba(102,255,102, 0.4)", "rgbs(51,255,153, 0.4)", "rgba(0,255,0,0.4)", "rgba(0,102,51, 0.4)"
        ]),

        riskFillColour: (["rgba(238, 59, 59, 0.2)", "rgba(30,144,255,0.2)", "rgba(231, 019, 99, 0.2)", "rgba(0,255,255,0.2)", "rgba(250, 128, 114, 0.2)",
            "rgba(134,206,235,0.2)", "rgba(250, 0, 0, 0.2)", "rgba(50,205,50,0.2)", "rgba(255, 165, 0, 0.2)", "rgba(66,105,225,0.2)"
        ]),

        riskBorderColour: (["rgba(238, 59, 59, 0.8)", "rgba(30,144,255,0.8)", "rgba(231, 019, 99, 0.8)", "rgba(0,255,255,0.8)", "rgba(250, 128, 114, 0.8)",
            "rgba(134,206,235,0.8)", "rgba(250, 0, 0, 0.8)", "rgba(50,205,50,0.8)", "rgba(255, 165, 0, 0.8)", "rgba(66,105,225,0.8)"
        ]),

        costReleaseChart: new Chart($("canvas[name='costReleaseChart']"), {
            type: "bar",
            // initialize the data arrays
            data: {
                labels: [],
                datasets: []
            },
            // set options for the chart
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    // show title and set default title to show when no complete project is selected
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },
                // add a bounce animation for graphs on load
                animation: {
                    easing: 'easeOutBounce'
                },

                // set position of the legend
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 11.5
                    }
                },
                // set labels for the x and y axes
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Quarter Number"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            // define a function to add a dollar sign to the labels for y axes
                            userCallback: function(value, index, values) {
                                return "$" + value.toLocaleString();
                            },
                            suggestedMin: 0,
                            suggestedMax: 100000,
                            beginAtZero: true
                        },
                    }]
                },
                // enable tooltips to show quarter number and current cost/release values on hover over the bar
                tooltips: {
                    enabled: true,
                    callbacks: {
                        title: function(tooltipItems, data) {
                            let tooltipItem = tooltipItems[0];
                            title = "Quater " + data.labels[tooltipItem.index];
                            return title;
                        },

                        label: function(tooltipItem, data) {
                            // store current dataset
                            currSet = data.datasets[tooltipItem.datasetIndex];
                            // retrieve the title of the dataset
                            label = currSet.label +
                                ": $" + tooltipItem.yLabel.toFixed(2);
                            return (label);
                        }
                    }
                }
            },
        }),

        // initialize the complexity risk chart
        complexityRiskChart: new Chart($("canvas[name='complexityRiskChart']"), {
            // set it to be a radar chart
            type: "radar",
            // initialize the data arrays
            data: {
                // manually set the labels to be 7 predefined risk categories
                labels: [
                    "Project Characteristics",
                    "Strategic Management Risks",
                    "Procurement Risks",
                    "Human Resources Risks",
                    "Business Risks",
                    "Project Management Risks",
                    "Project Requirement Management"
                ],
                datasets: []
            },

            // set options for the chart
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // set default title to be displayed when there's no active project
                title: {
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },

                animation: {
                    easing: 'easeOutCirc'
                },

                // set legend properties
                legend: {

                    labels: {
                        defaultFontSize: 15
                    },
                    position: "bottom",
                    labels: {
                        boxWidth: 11.5
                    }
                },
                // set properties for the scale
                scale: {
                    ticks: {
                        max: 5.0,
                        min: 0.0
                    },
                    pointLabels: {
                        fontSize: 12
                    }
                },

                // enable tool tips to show property and calculated risk score at a given point
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return parseFloat(Math.round(tooltipItem.yLabel * 100) / 100).toFixed(2);
                        }
                    }
                }
            }
        }),

        // initialize the min and max benefit chart
        minMaxBenefitChart: new Chart($("canvas[name='minMaxBenefitChart']"), {
            type: "horizontalBar",
            // initialize the data arrays
            data: {
                labels: [],
                datasets: []
            },
            // set options for the chart
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    // show title and set default title to show when no complete project is selected
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },

                animation: {
                    easing: 'easeOutBounce'
                },

                // set position of the legend
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 11.5
                    }
                },

                // set labels for the x and y axes
                scales: {
                    xAxes: [{

                        ticks: {
                            // define a function to add a dollar sign to the labels for y axes
                            userCallback: function(value, index, values) {
                                return "$" + value.toLocaleString();
                            },
                            suggestedMax: 100000,
                            beginAtZero: true
                        }

                    }],
                    yAxes: [{

                        scaleLabel: {
                            display: true,
                            labelString: "Project Name"
                        }
                    }]
                },

                tooltips: {
                    // enable tooltipItems
                    enabled: true,
                    // set custom label for the tool tips
                    callbacks: {
                        label: function(tooltipItem, data) {
                            // store current dataset
                            currSet = data.datasets[tooltipItem.datasetIndex];
                            // retrieve the title of the dataset
                            label = currSet.label +
                                ": $" + tooltipItem.xLabel.toFixed(2);
                            return (label);
                        }
                    }
                }
            },
        }),

        costPerQuarterChart: new Chart($("canvas[name='costPerQuarterChart']"), {
            // set type to be line chart
            type: 'line',

            data: {
                labels: [],
                datasets: []
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    // show title and set default title to show when no complete project is selected
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },

                animation: {
                    easing: 'easeOutBounce'
                },

                // set position of the legend
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 11.5
                    }
                },

                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Quarter Number"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            // define a function to add a dollar sign to the labels for y axes
                            userCallback: function(value, index, values) {
                                return "$" + value.toLocaleString();
                            },
                            suggestedMax: 100000,
                            beginAtZero: true
                        },
                    }]
                },

                tooltips: {
                    // enable tooltipItems
                    enabled: true,
                    // show all values at any given index
                    mode: "index",
                    intersect: false,
                    position: "nearest",
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return "Quarter " + tooltipItem[0].xLabel;
                        },
                        label: function(tooltipItem, data) {
                            // store current dataset
                            currSet = data.datasets[tooltipItem.datasetIndex];
                            // retrieve the title of the dataset
                            label = currSet.label +
                                ": $" + tooltipItem.yLabel.toFixed(2);
                            return (label);
                        },

                        labelColor: function(tooltipItem, data) {
                            currSet = data.tooltip._data.datasets[tooltipItem.datasetIndex]
                            return {
                                borderColor: currSet.borderColor,
                                backgroundColor: currSet.borderColor
                            }
                        }
                    }
                }
            },




        }),

        costReleaseModal: new Chart($("canvas[name='costReleaseModal']"), {
            type: "bar",
            // initialize the data arrays
            data: {
                labels: [],
                datasets: []
            },
            // set options for the chart
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    // show title and set default title to show when no complete project is selected
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },
                // add a bounce animation for graphs on load
                animation: {
                    easing: 'easeOutBounce'
                },

                // set position of the legend
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 11.5
                    }
                },
                // set labels for the x and y axes
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Quarter Number"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            // define a function to add a dollar sign to the labels for y axes
                            userCallback: function(value, index, values) {
                                return "$" + value.toLocaleString();
                            },
                            suggestedMin: 0,
                            suggestedMax: 100000,
                            beginAtZero: true
                        },
                    }]
                },
                // enable tooltips to show quarter number and current cost/release values on hover over the bar
                tooltips: {
                    enabled: true,
                    callbacks: {
                        title: function(tooltipItems, data) {
                            let tooltipItem = tooltipItems[0];
                            title = "Quater " + data.labels[tooltipItem.index];
                            return title;
                        },

                        label: function(tooltipItem, data) {
                            // store current dataset
                            currSet = data.datasets[tooltipItem.datasetIndex];
                            // retrieve the title of the dataset
                            label = currSet.label +
                                ": $" + tooltipItem.yLabel.toFixed(2);
                            return (label);
                        }
                    }
                }
            },
        }),

        // initialize the complexity risk chart
        complexityRiskModal: new Chart($("canvas[name='complexityRiskModal']"), {
            // set it to be a radar chart
            type: "radar",
            // initialize the data arrays
            data: {
                // manually set the labels to be 7 predefined risk categories
                labels: [
                    "Project Characteristics",
                    "Strategic Management Risks",
                    "Procurement Risks",
                    "Human Resources Risks",
                    "Business Risks",
                    "Project Management Risks",
                    "Project Requirement Management"
                ],
                datasets: []
            },

            // set options for the chart
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // set default title to be displayed when there's no active project
                title: {
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },

                animation: {
                    easing: 'easeOutCirc'
                },

                // set legend properties
                legend: {

                    labels: {
                        defaultFontSize: 15
                    },
                    position: "bottom",
                    labels: {
                        boxWidth: 11.5
                    }
                },
                // set properties for the scale
                scale: {
                    ticks: {
                        max: 5.0,
                        min: 0.0
                    },
                    pointLabels: {
                        fontSize: 12
                    }
                },

                // enable tool tips to show property and calculated risk score at a given point
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return parseFloat(Math.round(tooltipItem.yLabel * 100) / 100).toFixed(2);
                        }
                    }
                }
            }
        }),

        // initialize the min and max benefit chart
        minMaxBenefitModal: new Chart($("canvas[name='minMaxBenefitModal']"), {
            type: "horizontalBar",
            // initialize the data arrays
            data: {
                labels: [],
                datasets: []
            },
            // set options for the chart
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    // show title and set default title to show when no complete project is selected
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },

                animation: {
                    easing: 'easeOutBounce'
                },

                // set position of the legend
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 11.5
                    }
                },

                // set labels for the x and y axes
                scales: {
                    xAxes: [{

                        ticks: {
                            // define a function to add a dollar sign to the labels for y axes
                            userCallback: function(value, index, values) {
                                return "$" + value.toLocaleString();
                            },
                            suggestedMax: 100000,
                            beginAtZero: true
                        }

                    }],
                    yAxes: [{

                        scaleLabel: {
                            display: true,
                            labelString: "Project Name"
                        }
                    }]
                },

                tooltips: {
                    // enable tooltipItems
                    enabled: true,
                    // set custom label for the tool tips
                    callbacks: {
                        label: function(tooltipItem, data) {
                            // store current dataset
                            currSet = data.datasets[tooltipItem.datasetIndex];
                            // retrieve the title of the dataset
                            label = currSet.label +
                                ": $" + tooltipItem.xLabel.toFixed(2);
                            return (label);
                        }
                    }
                }
            },
        }),

        costPerQuarterModal: new Chart($("canvas[name='costPerQuarterModal']"), {
            // set type to be line chart
            type: 'line',

            data: {
                labels: [],
                datasets: []
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    // show title and set default title to show when no complete project is selected
                    display: true,
                    text: "Nothing to show, please select a project",
                    fontSize: 19
                },

                animation: {
                    easing: 'easeOutBounce'
                },

                // set position of the legend
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 11.5
                    }
                },

                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Quarter Number"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            // define a function to add a dollar sign to the labels for y axes
                            userCallback: function(value, index, values) {
                                return "$" + value.toLocaleString();
                            },
                            suggestedMax: 100000,
                            beginAtZero: true
                        },
                    }]
                },

                tooltips: {
                    // enable tooltipItems
                    enabled: true,
                    // show all values at any given index
                    mode: "index",
                    intersect: false,
                    position: "nearest",
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return "Quarter " + tooltipItem[0].xLabel;
                        },
                        label: function(tooltipItem, data) {
                            // store current dataset
                            currSet = data.datasets[tooltipItem.datasetIndex];
                            // retrieve the title of the dataset
                            label = currSet.label +
                                ": $" + tooltipItem.yLabel.toFixed(2);
                            return (label);
                        },

                        labelColor: function(tooltipItem, data) {
                            currSet = data.tooltip._data.datasets[tooltipItem.datasetIndex]
                            return {
                                borderColor: currSet.borderColor,
                                backgroundColor: currSet.borderColor
                            }
                        }
                    }
                }
            },




        }),


        initCharts: function() {

            // setting some basic defualt for chart texts
            Chart.defaults.global.defaultFontFamily = "Arial";
            Chart.defaults.global.defaultFontSize = 12;
            Chart.defaults.global.defaultFontColor = "#777";
            // load the charts dropdown
            Charts.loadChartsDropdown();
            // obtain projects array
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            Charts.initalizeCharts(projects);
            Charts.updateCharts(projects);

        },

        /* load the charts drop down list */
        loadChartsDropdown: function() {
            // first obtain and store the list of projects from the browser
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            // create a fore loop to loop through each variable in the array
            let currChart = "";
            for (let i = 0; i < projects.length; i++) {
                // add the html for each list item in the drop down list
                if (!(projects[i].costRelease.quaterNumberPhase1 == null ||
                        projects[i].complexityRisk.projectCharacteristics == null)) {

                    currChart += '<li class = "nav-item chart-dropdown">';
                    currChart += '<label class="chart-list-item">' + projects[i].title;
                    currChart += '<input type="checkbox" id=chart' + i + '>';
                    currChart += '<span class="checkmark"></span></label></li>';
                }
            }
            // append the html code to the actual list
            $("ul.charts.sub-menu").append(currChart);

        },

        /* generate the correct data sets based on a given project
           @param  project - the current project object to generate data for
           @param  projectNumber - the index of the project in the projects array
           @returns an array that contains the data for the project cost,
                    the project release, the complexity risk data and the total
                    number or quarters in that order
        */
        generateData: function(project, projectNumber) {
            // degfine some variables for later use
            let projectTotalQuaterNumber = 0;
            let projectCostData = [];
            let maxReleaseData = [];
            let minReleaseData = [];
            let projectCost = {};
            let maxRelease = {};
            let projectFactors = {};
            let projectUncertainty = 0;

            // first obtain the amount of quarters for the project
            let projectQuaterNumberPhase1 = parseInt(project.costRelease.quaterNumberPhase1);
            let projectQuaterNumberPhase2 = parseInt(project.costRelease.quaterNumberPhase2);
            let projectQuaterNumberPhase3 = parseInt(project.costRelease.quaterNumberPhase3);

            // obtain all the start dates
            let projectStartDatePhase1 = new Date(project.costRelease.startDatePhase1);
            let projectStartDatePhase2 = new Date(project.costRelease.startDatePhase2);
            let projectStartDatePhase3 = new Date(project.costRelease.startDatePhase3);

            // define and calculate all 7 seven factors based on the complexity risk secttion answers
            // used to calculate the overall uncertainty for the project
            let projectFactor1 = 0;
            // loop through every element in projectCharacteristics array
            for (let i = 0; i < project.complexityRisk.projectCharacteristics.length; i++) {
                // sum all the values together
                projectFactor1 += parseFloat(project.complexityRisk.projectCharacteristics[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor1Uniformed = projectFactor1 / project.complexityRisk.projectCharacteristics.length;

            let projectFactor2 = 0;
            // loop through every element in strategicRisks array
            for (let i = 0; i < project.complexityRisk.strategicRisks.length; i++) {
                // sum all the values together
                projectFactor2 += parseFloat(project.complexityRisk.strategicRisks[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor2Uniformed = projectFactor2 / project.complexityRisk.strategicRisks.length;

            let projectFactor3 = 0;
            // loop through every element in procurmentRisks array
            for (let i = 0; i < project.complexityRisk.procurmentRisks.length; i++) {
                // sum all the values together
                projectFactor3 += parseFloat(project.complexityRisk.procurmentRisks[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor3Uniformed = projectFactor3 / project.complexityRisk.procurmentRisks.length;

            let projectFactor4 = 0;
            // loop through every element in hrRisks array
            for (let i = 0; i < project.complexityRisk.hrRisks.length; i++) {
                // sum all the values together
                projectFactor4 += parseFloat(project.complexityRisk.hrRisks[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor4Uniformed = projectFactor4 / project.complexityRisk.hrRisks.length;

            let projectFactor5 = 0;
            // loop through every element in businessRisks array
            for (let i = 0; i < project.complexityRisk.businessRisks.length; i++) {
                // sum all the values together
                projectFactor5 += parseFloat(project.complexityRisk.businessRisks[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor5Uniformed = projectFactor5 / project.complexityRisk.businessRisks.length;

            let projectFactor6 = 0;
            // loop through every element in projectManagementRisks array
            for (let i = 0; i < project.complexityRisk.projectManagementRisks.length; i++) {
                // sum all the values together
                projectFactor6 += parseFloat(project.complexityRisk.projectManagementRisks[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor6Uniformed = projectFactor6 / project.complexityRisk.projectManagementRisks.length;

            let projectFactor7 = 0;
            // loop through every element in reqManagementRisks array
            for (let i = 0; i < project.complexityRisk.reqManagementRisks.length; i++) {
                // sum all the values together
                projectFactor7 += parseFloat(project.complexityRisk.reqManagementRisks[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor7Uniformed = projectFactor7 / project.complexityRisk.reqManagementRisks.length;

            // sum together all the factor values to calculate the total uncertainty
            projectUncertainty = projectFactor1 + projectFactor2 + projectFactor3 +
                projectFactor4 + projectFactor5 + projectFactor6 + projectFactor7;

            // calculate the cost per quarter of phase one by multiplying the number of FTE's per quarter by 25000 and adding the total operating cost
            // also we need to parse the values because the input from sliders are text
            let projectCostPhase1 = parseFloat(project.costRelease.fteNumberCostPhase1) * 25000 + parseFloat(project.costRelease.operatingMoneyCostPhase1);
            // set release and risk values to 0 and null respectively since there is no release for the first phase
            let maxReleasePhase1 = 0;
            let minReleasePhase1 = 0;

            // loop for each quarter in the phase
            for (let i = 1; i <= projectQuaterNumberPhase1; i++) {
                // push the cost, release and risk data into the data arrays for the project for each quarter in the current phase
                projectCostData.push(projectCostPhase1);
                maxReleaseData.push(maxReleasePhase1);
                minReleaseData.push(minReleasePhase1);
            }

            // calculate the gap between phase 1 and phase 2
            let projectDifferenceP1P2 = parseInt((projectStartDatePhase2.getTime() -
                    (projectStartDatePhase1.getTime() + projectQuaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                (1000 * 60 * 60 * 24 * 30 * 3));

            for (let i = 0; i < projectDifferenceP1P2; i++) {
                // for each additional quarter push empty data into the arrays, this is to account for projects that will have a gap between phases
                projectCostData.push(0);
                maxReleaseData.push(0);
                minReleaseData.push(0);
            }

            // calculate the phase 2 cost
            let projectCostPhase2 = parseFloat(project.costRelease.fteNumberCostPhase2) * 25000 + parseFloat(project.costRelease.operatingMoneyCostPhase2);
            // calculate the release by following the same process followed to calculate the cost
            let maxReleasePhase2 = parseFloat(project.costRelease.fteNumberReleasePhase2) * 25000 + parseFloat(project.costRelease.operatingMoneyReleasePhase2);

            // calculate the lowest possible release based on the risk
            // multiply the release by a calculated factor to obtain this value
            let minReleasePhase2 = (maxReleasePhase2 - (projectUncertainty / 170 * maxReleasePhase2));

            // loop for every quarter in the phase
            for (let i = 1; i <= projectQuaterNumberPhase2; i++) {
                // push the cost, release and uncertainty for every quarter
                projectCostData.push(projectCostPhase2);
                maxReleaseData.push(maxReleasePhase2);
                minReleaseData.push(minReleasePhase2);
            }

            // calculate the gap between phase2 and phase 3
            let projectDifferenceP2P3 = parseInt((projectStartDatePhase3.getTime() -
                    (projectStartDatePhase2.getTime() + projectQuaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                (1000 * 60 * 60 * 24 * 30 * 3));

            // push blank info in for each quarter difference
            for (let i = 0; i < projectDifferenceP2P3; i++) {
                projectCostData.push(0);
                maxReleaseData.push(0);
                minReleaseData.push(0);
            }


            // calculate phase3 cost, release and lowest possible release value
            let projectCostPhase3 = parseFloat(project.costRelease.fteNumberCostPhase3) * 25000 + parseFloat(project.costRelease.operatingMoneyCostPhase3);
            let maxReleasePhase3 = parseFloat(project.costRelease.fteNumberReleasePhase3) * 25000 + parseFloat(project.costRelease.operatingMoneyReleasePhase3);
            let minReleasePhase3 = (maxReleasePhase3 - (projectUncertainty / 170 * maxReleasePhase3));

            // loop for each quarter and push data into the data arrays for each
            for (let i = 1; i <= projectQuaterNumberPhase3; i++) {
                projectCostData.push(projectCostPhase3);
                maxReleaseData.push(maxReleasePhase3);
                minReleaseData.push(minReleasePhase3);
            }

            // calculate the total amount of quarters including the gaps calculated
            projectTotalQuaterNumber = projectQuaterNumberPhase1 + projectDifferenceP1P2 + projectQuaterNumberPhase2 + projectDifferenceP2P3 + projectQuaterNumberPhase3;

            // generate a data object for project cost
            projectCost = {
                label: "Cost of " + project.title,
                // set the data array to be the final cost array generated
                data: projectCostData,
                // set bar colour
                backgroundColor: Charts.costColours[projectNumber]
            };

            // generate a data object for the maxRelease
            maxRelease = {
                label: "Max Release of " + project.title,
                // set the data of this chart to be max release array generated
                data: maxReleaseData,
                // the risk array becomes the risk for this chart
                risk: minReleaseData,
                // set bar colour
                backgroundColor: Charts.releaseColours[projectNumber]
            };

            // create a data object for the minRelease
            minRelease = {
                label: "Min Release of " + project.title,
                // set the data to the be the min release risk generated
                data: minReleaseData,
                // set the bar colour
                backgroundColor: Charts.minReleaseColours[projectNumber]

            }

            // generate data for complexity and risk graph
            projectFactors = {
                // input each averaged out risk score as the data
                data: [
                    projectFactor1Uniformed,
                    projectFactor2Uniformed,
                    projectFactor3Uniformed,
                    projectFactor4Uniformed,
                    projectFactor5Uniformed,
                    projectFactor6Uniformed,
                    projectFactor7Uniformed
                ],
                // set the background and border colour for the radar
                backgroundColor: Charts.riskFillColour[projectNumber],
                borderColor: Charts.riskBorderColour[projectNumber],
                label: "Uncertainty of " + project.title + ", Total Score: " + projectUncertainty
            };

            return [projectCost, maxRelease, minRelease, projectFactors, projectTotalQuaterNumber];

        },

        /* This function will calculate the total cost, release in addition to
           the minimum and maximum benfits of a project

           @param cost - the cost data
           @param release - the release data
           @param risk - the risk data
           @returns an array containing the total cost, total release,
                    the minimum benefit and maximum benefit in that order all
                    values are floats
        */
        calculateTotals: function(cost, release, risk) {
            let totalCost = 0;
            let maxRelease = 0;
            let minRelease = 0;
            let maxBenefit = 0;
            let minBenefit = 0;

            // calculate the sum total cost from all quarters
            totalCost = cost.reduce(function(acc, val) {
                return acc + val;
            });
            // calculate the maximum total release
            maxRelease = release.reduce(function(acc, val) {
                return acc + val;
            });

            // calculate the minimum total release
            minRelease = risk.reduce(function(acc, val) {
                return acc + val;
            });

            // calculate the minimum and max benefits
            maxBenefit = maxRelease - totalCost;
            minBenefit = minRelease - totalCost;

            // return cost, release and the benefits
            return [totalCost, maxRelease, maxBenefit, minBenefit];

        },

        /* This method will display the data tabs for each selected chart

           @param projects - the project array that stores the information for
                             all submitted projects
           @param projectNumber {int} - the index number of the project in the projects array
           @param data - an array that contains all the computed data for the project(generated by generateData())
           @param active {boolean} - a boolean indicating whether the current project tab is active or not
        */
        displayDataTabs: function(projects, projectNumber, data, active) {
            // generate the data for the tabs
            let tabHTML = Charts.generateDataTabText(projectNumber, projects[projectNumber], active, data);

            // append the data to the DOM
            $(".nav-tabs").append(tabHTML[0]);
            $(".tab-content").append(tabHTML[1]);

        },

        /* This method will generate the HTML text for each data tab on the cost release chart

           @param projectNumber - the index number of the project in the projects array
           @param currProject - the actual project object for the current project
           @param active - a boolean indicating whether the current project tab is active or not
           @param data - an array that contains all the computed data for the project(generated by generateData())
           @returns an array contianing the HTML text for the actual tab and the data pane in that order
        */
        generateDataTabText: function(projectNumber, currProject, active, data) {
            // store the data from the data array into its own variables
            projectCost = data[0];
            maxRelease = data[1];
            minRelease - data[2];
            projectFactors = data[3];
            projectTotalQuaterNumber = (data[4]);

            // calculate totals and benefits
            projectTotalData = Charts.calculateTotals(projectCost.data, maxRelease.data, minRelease.data);

            // generate opening headers for the tab and the data pane including the project numbers in their IDs
            // check if the currrent tab needs to be active
            let tabText = '';
            let dataText = '';
            if (active) {

                // if it is active add the active class to the relevant div tags
                tabText = '<li id="tabNavProject"' + projectNumber + ' class = "tab-element active"><a style="padding: 0 5px 0 5px" href="#tabProject' + projectNumber + '" data-toggle="tab">' + currProject.title + '</a></li>'
                dataText = '<div class="tab-pane active" id="tabProject' + projectNumber + '" >';
            } else {

                // if not active then no active class
                tabText = '<li id="tabNavProject ' + projectNumber + '" class = "tab-element"><a style="padding: 0 5px 0 5px" href="#tabProject' + projectNumber + '" data-toggle="tab">' + currProject.title + '</a></li>'
                dataText = '<div class="tab-pane" id="tabProject' + projectNumber + '" >';
            }

            // add the remaining text to the data pane which adds the labels and the relevant values for the current project
            dataText += '<p style="margin:0 5px 0 5px; color: #555">' +
                '<span lang="en">Total cost: </span>' +
                '<span lang="fr">Coût total : </span>' +
                '<span>$' + projectTotalData[0].toFixed(2).toLocaleString() + '</span>' +
                '</p>' +
                '<p style="margin:0 5px 0 5px; color: #555">' +
                '<span lang="en">Gross Revenue: </span>' +
                '<span lang="fr">Revenu brut : </span>' +
                '<span>$' + projectTotalData[1].toFixed(2).toLocaleString() + '</span>' +
                '</p>' +
                '</div>';

            // return the HTML for the tav and the data pane
            return [tabText, dataText];
        },

        /* this method will display the the relevant charts for the selected projects

           @param projects - the array of projects
           @param checkedElements - an array containing the IDs of the cheked elements from the drop down
        */
        displayCharts: function(projects, checkedElements) {
            // store each gloabal chart into a local variables
            let costRelease = Charts.costReleaseChart,
                complexityRisk = Charts.complexityRiskChart,
                minMaxBenefit = Charts.minMaxBenefitChart,
                costPerQuarter = Charts.costPerQuarterChart,
                costReleaseModal = Charts.costReleaseModal,
                complexityRiskModal = Charts.complexityRiskModal,
                minMaxBenefitModal = Charts.minMaxBenefitModal,
                costPerQuarterModal = Charts.costPerQuarterModal;

            // initialize the costRelease and complexityRisk datasets
            // this is so there aren't duplicate bars and to account
            // for when no charts are selected
            costRelease.data.datasets = [];
            complexityRisk.data.datasets = [];
            minMaxBenefit.data.datasets = [];
            costPerQuarter.data.datasets = [];
            costReleaseModal.data.datasets = [];
            complexityRiskModal.data.datasets = [];
            minMaxBenefitModal.data.datasets = [];
            costPerQuarterModal.data.datasets = [];
            costRelease.data.labels = [];
            minMaxBenefit.data.labels = [];
            costPerQuarter.data.labels = [];
            costReleaseModal.data.labels = [];
            minMaxBenefitModal.data.labels = [];
            costPerQuarterModal.data.labels = [];

            // delete all present tabs and data
            $(".tab-element").remove();
            $(".tab-pane").remove();

            if (checkedElements.length != 0) {
                //loop through every clicked element obtain each projects data
                // store all the data in an array
                let projectData = [];

                // define variables to track the earliest start time
                let lowestTime = Number.MAX_SAFE_INTEGER;

                //TESTING only
                if (!checkedElements) {
                    checkedElements = [];
                }
                // loop through every element that is checked
                for (let i = 0; i < checkedElements.length; i++) {

                    // parse the project number from the elements ID
                    projectNumber = parseInt(checkedElements[i].charAt(checkedElements[i].length - 1));

                    // generate the data for the current project
                    let data = Charts.generateData(projects[projectNumber], projectNumber);
                    // add the current projects data to the projectData array
                    projectData.push(data);

                    // generate the data tabs
                    Charts.displayDataTabs(projects, projectNumber, data, (i === 0));

                    // check the startTime of the current project
                    let projectStartDate = new Date(projects[projectNumber].costRelease.startDatePhase1);
                    let projectStartTime = projectStartDate.getTime();

                    // check if the current projects time is less than the current lowest time
                    if (projectStartTime < lowestTime) {

                        // set new lowest time if current time is lower
                        lowestTime = projectStartTime;
                    }

                }

                // generate the datasets for the cost release and complexity risk charts
                let cr2Data = Charts.generateCR2(projectData, checkedElements, projects, lowestTime);

                // define the label for the x-axes of cost release graph to be the quarter number
                let projectQuarters = [];
                for (let i = 1; i <= cr2Data[2]; i++) {
                    projectQuarters.push(i);
                }

                Charts.displayCR2(costRelease, complexityRisk, cr2Data, projectQuarters);
                Charts.displayCR2(costReleaseModal, complexityRiskModal, cr2Data, projectQuarters);

                // generate and display minMaxBenefit charts
                Charts.displayMinMax(minMaxBenefit, projectData, checkedElements, projects);
                Charts.displayMinMax(minMaxBenefitModal, projectData, checkedElements, projects);

                // generate and display cost per quarter charts
                Charts.displayCPQ(costPerQuarter, cr2Data, projectQuarters);
                Charts.displayCPQ(costPerQuarterModal, cr2Data, projectQuarters);

                charts = [costRelease, complexityRisk, minMaxBenefit, costReleaseModal, complexityRiskModal, minMaxBenefitModal];
                Charts.updateAndRenderCharts(charts);


            } else {

                // set these to the titles if the list is blank
                costRelease.options.title.text = "Nothing to show, please select a project";
                complexityRisk.options.title.text = "Nothing to show, please select a project";
                minMaxBenefit.options.title.text = "Nothing to show, please select a project";
                costPerQuarter.options.title.text = "Nothing to show, please select a project"
            }

        },

        /*
          This function will update and render a given chart
          @param charts - the charts to be updated and rendered
        */
        updateAndRenderCharts: function(charts) {

            for (let i = 0; i < charts.length; i++) {
                charts[i].update();
                charts[i].render();
            }
        },

        /*
        This method will display the data for a minMaxBenefit chart

        @param chart - the chart element to be displayed
        @param projectData - the data for the current project
        @param checkedElements - which projects have been selected from the project selection
        @param projects - the data for all submitted projects
        */

        displayMinMax: function(chart, projectData, checkedElements, projects) {
            // generate minMaxBenefit data and update the chart
            minMax = Charts.generateMinMax(projectData, checkedElements, projects);
            chart.options.title.display = false;
            chart.data.datasets.push(minMax[0]);
            chart.data.datasets.push(minMax[1]);
            chart.data.labels = minMax[2];
        },

        /*
        This method will display the data for a cost per quarter charts

        @param chart - the chart element to be displayed
        @param cr2Data - data array generated for the cost release graph
        @param projectQuarters - an array consisting of the project quarter numbers
        */

        displayCPQ: function(chart, cr2Data, projectQuarters) {
            // generate cost Per quarter data and update charts
            cpq = Charts.generateCPQ(cr2Data[0], cr2Data[2]);
            chart.data.datasets = cpq;
            chart.data.labels = projectQuarters;
            chart.options.title.display = false;
        },

        /*
        This method wukk display the data for the cost release charts

        @param costRelease - the cost release chart element to be displated
        @param comRisk - the complexity risk chart element to be displayed
        @param cr2Data - the data generated for the complexity risk and cost release charts
        @param projectQuarters - an array containing numbers indicating the project quarter
        */

        displayCR2: function(costRelease, comRisk, cr2Data, projectQuarters) {

            // set the data sets for the charts to the ones returned by the method
            costRelease.data.datasets = cr2Data[0];
            comRisk.data.datasets = cr2Data[1];

            // disable title for cost release
            costRelease.options.title.display = false;

            // push the labels to the chart
            costRelease.data.labels = projectQuarters;

            // disable title for complexity risk
            comRisk.options.title.display = false;
        },


        /* This method listens for updates to the drop down list and updates
           the charts and data tabs accordingly

           @param projects - the array of projects
        */
        updateCharts: function(projects) {

            // define the event listener
            $(".chart-dropdown").click(function() {
                // obtain all the checked elements
                let checkedElements = $(".chart-list-item input:checked");

                // store all checkedElements' IDs in an arrays
                let checkedIDs = [];
                for (let i = 0; i < checkedElements.length; i++) {
                    // store the id's in the array
                    checkedIDs.push(checkedElements[i].id);
                }
                // set the checkedElements in localStorage
                window.localStorage.setItem("checked", JSON.stringify(checkedIDs));
                // define variable to ensure the function only executes on the after click
                let clicks = $(this).data('clicks');

                if (clicks) {

                    // display the charts
                    Charts.displayCharts(projects, checkedIDs);

                    // set correct language
                    Charts.setLanguage();
                }
                $(this).data("clicks", !clicks);

            });

        },

        /* This method initalizes the charts and the dropdown list on start up
           to display the charts selected last time the page was loaded

           @param projects - the array of projects
        */
        initalizeCharts: function(projects) {
            // obtain previously checked items and display the charts
            let checkedElements = JSON.parse(window.localStorage.getItem("checked"));

            if (checkedElements != null) {
                // loop through each id and set the given element
                Charts.displayCharts(projects, checkedElements);

                // loop through each id in checkedElements and set those list items to checked
                for (let i = 0; i < checkedElements.length; i++) {
                    // use jquery to obtain the relevant DOM element and set the class
                    $("#" + checkedElements[i]).prop('checked', true);
                }

            }

            // set correct language
            Charts.setLanguage();

        },

        /* This method ensures that the correct span elements are displayed based on the selected lang */
        setLanguage: function() {
            // ensure the correct span elements are present based on the set language
            if (Cookies.get("lang") === "en") {
                $("[lang='fr']").attr("style", "display:none !important");

            } else {
                $("[lang='en']").attr("style", "display:none !important");

            }
        },

        /* This function will display the Min and Max Benefit chart

           @param projectData - an array containing all the data arrays for each selected project
           @param checkedElements - an array containing the ID's of all the projects that have been selected
           @param projects - an array containing all created projects
           @returns an array containing the data for the maximum and minimum benefit and all project names

        */
        generateMinMax: function(projectData, checkedElements, projects) {

            // define an array to store each projects name, max benefit and min benefit
            let names = [],
                maxBenefits = [],
                minBenefits = [];

            // loop through the data generating the totals and retrieving the project names
            for (let i = 0; i < projectData.length; i++) {
                // first obtain the project number
                projectNumber = parseInt(checkedElements[i].charAt(checkedElements[i].length - 1));

                // obtain the name from the project and push it to the names array
                names.push(projects[projectNumber].title);

                // generate the data for the minimum and maximum maxBenefits
                let totals = Charts.calculateTotals(projectData[i][0].data, projectData[i][1].data, projectData[i][2].data);
                // push the min and max benefits to the arrays
                maxBenefits.push(totals[2]);
                minBenefits.push(totals[3]);

            }

            // define datasets for minimum and maximum
            maxBen = {
                label: "Maximum Benefit",
                // set the data array to be the maximum benefit array
                data: maxBenefits,
                // set bar colour
                backgroundColor: Charts.costColours[2]
            };

            minBen = {
                label: "Minimum Benefit",
                // set the data array to be the maximum benefit array
                data: minBenefits,
                // set bar colour
                backgroundColor: Charts.releaseColours[2]
            };

            // return the data sets and the names array
            return [maxBen, minBen, names];

        },

        /* This method will generate the datasets for the cost release and complexity risk charts

           @param projectData - an array containing all the data arrays for each selected project
           @param checkedElements - an array containing the ID's of all the projects that have been selected
           @param projects - an array containing all created projects
           @param lowestTime - an int indicating the lowest startTime between all selected projects
           @param datasets - an array containing all the cost release and complexity risk datasets
           @returns an array containing the datasets for the cost release and complexity risk charts
                    the total amount of quarters to be generated

        */
        generateCR2: function(projectData, checkedElements, projects, lowestTime) {

            // keep track of the highest amount of quarters and the two new Datasets
            let highestQuarters = 0,
                costReleaseSets = [],
                complexityRiskSets = [];


            for (let i = 0; i < checkedElements.length; i++) {

                // parse the current project number from the element id
                projectNumber = parseInt(checkedElements[i].charAt(checkedElements[i].length - 1))

                // obtain the start time of the current project
                let projectStartDate = new Date(projects[projectNumber].costRelease.startDatePhase1);
                let projectStartTime = projectStartDate.getTime();

                // calculate the difference and convert to quarters
                let difference = parseInt((projectStartTime - lowestTime) / (1000 * 60 * 60 * 24 * 30 * 3));

                // add the difference to project 1s total quarter number
                // this is to have to total number of quarters that project 1 accounts for including all the blank quarters
                projectData[i][4] += difference;
                if (projectData[i][4] > highestQuarters) {
                    highestQuarters = projectData[i][4]
                }

                // for every quarter difference loop through the project
                for (let j = 0; j < difference; j++) {

                    // add blank data to account for the difference in the start time
                    projectData[i][0].data.unshift(0);
                    projectData[i][1].data.unshift(0);
                    projectData[i][2].data.unshift(0);
                }

                // after adding the distance push the current projects data to the chart
                // write data from project1 to cost and release graph
                costReleaseSets.push(projectData[i][0]);
                costReleaseSets.push(projectData[i][1]);
                costReleaseSets.push(projectData[i][2]);

                // write data from project1 to complexity and risk graph
                complexityRiskSets.push(projectData[i][3]);
            }

            // return the both sets
            return [costReleaseSets, complexityRiskSets, highestQuarters];


        },

        /* this method will generate the relative data for the cost per quarter chart*/
        generateCPQ: function(costReleaseData, highestQuarters) {
            // declare an array to store each datasets
            let projectsCost = []
            let projectsMax = []
            let projectsMin = []

            // loop through each project
            let numProjects = costReleaseData.length / 3;
            for (let i = 0; i < numProjects; i++) {
                // store the individual arrays representing each projects cost max and min releases
                projectsCost[i] = costReleaseData[i * 3].data;
                projectsMax[i] = costReleaseData[i * 3 + 1].data;
                projectsMin[i] = costReleaseData[i * 3 + 2].data;
            }

            console.log(projectsCost)
            console.log(projectsMax)
            console.log(projectsMin)

            // define two data sets per project
            // one for max and one for min ben per quarter
            // calculate the data for each data set


        }

    };

}();
