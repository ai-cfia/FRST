var Charts = function() {

    return {

        initCharts: function() {

            // setting some basic defualt for chart texts
            Chart.defaults.global.defaultFontFamily = "Arial";
            Chart.defaults.global.defaultFontSize = 12;
            Chart.defaults.global.defaultFontColor = "#777";

            // define Chart object for the cost release bar chart
            let costReleaseChart = new Chart($("canvas[name='costReleaseChart']"), {
                // type is a custom type defined in the Chart.js plugin
                type: "barError",
                // initialize the data arrays
                data: {
                    labels: [],
                    datasets: [],
                    error: []
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

                    // set position of the legend
                    legend: {
                        position: "bottom"
                    },
                    // set labels for the x and y axes
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Number of Quaters"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                // define a function to add a dollar sign to the labels for y axes
                                userCallback: function(value, index, values) {
                                    return "$" + value.toLocaleString();
                                },
                                min: 0,
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
                            }
                        }
                    }
                },
            });

            // initialize the complexity risk chart
            let complexityRiskChart = new Chart($("canvas[name='complexityRiskChart']"), {
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

                    // set legend properties
                    legend: {
                        labels: {
                            defaultFontSize: 15
                        },
                        position: "bottom"
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
            });

            /* Function to display the the complexity risk and cost release chart */
            function displayCharts() {
                // ensure that either project 1 or 2 has been selected
                if ($("#selectProject1").val() != "-1" || $("#selectProject2").val() != "-1") {
                    // obtain projects array from local storage
                    let projects = JSON.parse(window.localStorage.getItem("projects"));

                    // degfine some variables for later use
                    let project1TotalQuaterNumber = 0;
                    let project2TotalQuaterNumber = 0;

                    let project1 = null;
                    let project2 = null;

                    let project1CostData = [];
                    let project1ReleaseData = [];
                    let project1Error = [];

                    let project2CostData = [];
                    let project2ReleaseData = [];
                    let project2Error = [];

                    let project1Cost = {};
                    let project1Release = {};
                    let project1Factors = {};

                    let project1TotalCost = 0;
                    let project1TotalRelease = 0;
                    let project1TotalError = 0;

                    let project2Cost = {};
                    let project2Release = {};
                    let project2Factors = {};

                    let project2TotalCost = 0;
                    let project2TotalRelease = 0;
                    let project2TotalError = 0;

                    let project1Uncertainty = 0;
                    let project2Uncertainty = 0;

                    // show the cost release values
                    $("#costReleaseValues").removeAttr("hidden");

                    // check if Project 1 has been selected
                    if ($("#selectProject1").val() != "-1") {

                        // store the relevant project from the array 
                        project1 = projects[$("#selectProject1").val()];

                        // fetch data from project1

                        // first obtain the amount of quarters for the project
                        let project1QuaterNumberPhase1 = parseFloat(project1.costRelease.quaterNumberPhase1);
                        let project1QuaterNumberPhase2 = parseFloat(project1.costRelease.quaterNumberPhase2);
                        let project1QuaterNumberPhase3 = parseFloat(project1.costRelease.quaterNumberPhase3);

                        // obtain all the start dates
                        let project1StartDatePhase1 = new Date(project1.costRelease.startDatePhase1);
                        let project1StartDatePhase2 = new Date(project1.costRelease.startDatePhase2);
                        let project1StartDatePhase3 = new Date(project1.costRelease.startDatePhase3);


                        // define and calculate all 7 seven factors based on the complexity risk secttion answers
                        // used to calculate the overall uncertainty for the project
                        let project1Factor1 = 0;
                        // loop through every element in section1 array
                        for (let i = 0; i < project1.complexityRisk.section1.length; i++) {
                            // sum all the values together 
                            project1Factor1 += parseFloat(project1.complexityRisk.section1[i]);
                        }
                        // divide the sum by the length of the array to calculate the average risk
                        let project1Factor1Uniformed = project1Factor1 / project1.complexityRisk.section1.length;

                        let project1Factor2 = 0;
                        // loop through every element in section2 array
                        for (let i = 0; i < project1.complexityRisk.section2.length; i++) {
                            // sum all the values together
                            project1Factor2 += parseFloat(project1.complexityRisk.section2[i]);
                        }
                        // divide the sum by the length of the array to calculate the average risk
                        let project1Factor2Uniformed = project1Factor2 / project1.complexityRisk.section2.length;

                        let project1Factor3 = 0;
                        // loop through every element in section3 array
                        for (let i = 0; i < project1.complexityRisk.section3.length; i++) {
                            // sum all the values together
                            project1Factor3 += parseFloat(project1.complexityRisk.section3[i]);
                        }
                        // divide the sum by the length of the array to calculate the average risk
                        let project1Factor3Uniformed = project1Factor3 / project1.complexityRisk.section3.length;

                        let project1Factor4 = 0;
                        // loop through every element in section4 array
                        for (let i = 0; i < project1.complexityRisk.section4.length; i++) {
                            // sum all the values together
                            project1Factor4 += parseFloat(project1.complexityRisk.section4[i]);
                        }
                        // divide the sum by the length of the array to calculate the average risk
                        let project1Factor4Uniformed = project1Factor4 / project1.complexityRisk.section4.length;

                        let project1Factor5 = 0;
                        // loop through every element in section5 array
                        for (let i = 0; i < project1.complexityRisk.section5.length; i++) {
                            // sum all the values together
                            project1Factor5 += parseFloat(project1.complexityRisk.section5[i]);
                        }
                        // divide the sum by the length of the array to calculate the average risk
                        let project1Factor5Uniformed = project1Factor5 / project1.complexityRisk.section5.length;

                        let project1Factor6 = 0;
                        // loop through every element in section6 array
                        for (let i = 0; i < project1.complexityRisk.section6.length; i++) {
                            // sum all the values together
                            project1Factor6 += parseFloat(project1.complexityRisk.section6[i]);
                        }
                        // divide the sum by the length of the array to calculate the average risk
                        let project1Factor6Uniformed = project1Factor6 / project1.complexityRisk.section6.length;

                        let project1Factor7 = 0;
                        // loop through every element in section7 array
                        for (let i = 0; i < project1.complexityRisk.section7.length; i++) {
                            // sum all the values together
                            project1Factor7 += parseFloat(project1.complexityRisk.section7[i]);
                        }
                        // divide the sum by the length of the array to calculate the average risk
                        let project1Factor7Uniformed = project1Factor7 / project1.complexityRisk.section7.length;

                        // sum together all the factor values to calculate the total uncertainty
                        project1Uncertainty = project1Factor1 + project1Factor2 + project1Factor3 +
                            project1Factor4 + project1Factor5 + project1Factor6 + project1Factor7;

                        // calculate the cost per quarter of phase one by multiplying the number of FTE's per quarter by 25000 and adding the total operating cost
                        // also we need to parse the values because the input from sliders are text
                        let project1CostPhase1 = parseFloat(project1.costRelease.fteNumberCostPhase1) * 25000 + parseFloat(project1.costRelease.operatingMoneyCostPhase1);
                        // set release and error values to 0 and null respectively since there is no release for the first phase
                        let project1ReleasePhase1 = 0;
                        let project1ErrorPhase1 = null;

                        // loop for each quarter in the phase
                        for (let i = 1; i <= project1QuaterNumberPhase1; i++) {
                            // push the cost, release and error data into the data arrays for the project for each quarter in the current phase
                            project1CostData.push(project1CostPhase1);
                            project1ReleaseData.push(project1ReleasePhase1);
                            project1Error.push(project1ErrorPhase1);
                        }

                        // calculate the gap between phase 1 and phase 2
                        let project1DifferenceP1P2 = parseFloat((project1StartDatePhase2.getTime() -
                                (project1StartDatePhase1.getTime() + project1QuaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                            (1000 * 60 * 60 * 24 * 30 * 3));

                        for (let i = 0; i < project1DifferenceP1P2; i++) {
                            // for each additional quarter push empty data into the arrays, this is to account for projects that will have a gap between phases
                            project1CostData.push(0);
                            project1ReleaseData.push(0);
                            project1Error.push(null);
                        }

                        // calculate the phase 2 cost
                        let project1CostPhase2 = parseFloat(project1.costRelease.fteNumberCostPhase2) * 25000 + parseFloat(project1.costRelease.operatingMoneyCostPhase2);
                        // calculate the release by following the same process followed to calculate the cost
                        let project1ReleasePhase2 = parseFloat(project1.costRelease.fteNumberReleasePhase2) * 25000 + parseFloat(project1.costRelease.operatingMoneyReleasePhase2);

                        // calculate the lowest possible release based on the error
                        // multiply the release by a calculated factor to obtain this value
                        let project1ErrorPhase2 = project1Uncertainty / 170 * project1ReleasePhase2;

                        // loop for every quarter in the phase
                        for (let i = 1; i <= project1QuaterNumberPhase2; i++) {
                            // push the cost, release and uncertainty for every quarter
                            project1CostData.push(project1CostPhase2);
                            project1ReleaseData.push(project1ReleasePhase2);
                            project1Error.push(project1ErrorPhase2);
                        }

                        // calculate the gap between phase2 and phase 3
                        let project1DifferenceP2P3 = parseFloat((project1StartDatePhase3.getTime() -
                                (project1StartDatePhase2.getTime() + project1QuaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                            (1000 * 60 * 60 * 24 * 30 * 3));

                        // push blank info in for each quarter difference
                        for (let i = 0; i < project1DifferenceP2P3; i++) {
                            project1CostData.push(0);
                            project1ReleaseData.push(0);
                            project1Error.push(null);
                        }

                        // calculate phase3 cost, release and lowest possible release value
                        let project1CostPhase3 = parseFloat(project1.costRelease.fteNumberCostPhase3) * 25000 + parseFloat(project1.costRelease.operatingMoneyCostPhase3);
                        let project1ReleasePhase3 = parseFloat(project1.costRelease.fteNumberReleasePhase3) * 25000 + parseFloat(project1.costRelease.operatingMoneyReleasePhase3);
                        let project1ErrorPhase3 = project1Uncertainty / 170 * project1ReleasePhase3;

                        // loop for each quarter and push data into the data arrays for each
                        for (let i = 1; i <= project1QuaterNumberPhase3; i++) {
                            project1CostData.push(project1CostPhase3);
                            project1ReleaseData.push(project1ReleasePhase3);
                            project1Error.push(project1ErrorPhase3);
                        }

                        // calculate the total amount of quarters including the gaps calculated
                        project1TotalQuaterNumber = project1QuaterNumberPhase1 + project1DifferenceP1P2 + project1QuaterNumberPhase2 + project1DifferenceP2P3 + project1QuaterNumberPhase3;

                        // generate data for cost and release graph
                        project1Cost = {
                            label: "Cost of " + project1.title,
                            // set the data array to be the final cost array generated
                            data: project1CostData,
                            // set bar colour
                            backgroundColor: "rgba(238, 59, 59, 0.8)"
                        };

                        project1Release = {
                            label: "Release of " + project1.title,
                            // set the data of this chart to be release array generated
                            data: project1ReleaseData,
                            // the error array becomes the error for this chart
                            error: project1Error,
                            // set bar colour
                            backgroundColor: "rgba(30, 144, 255, 0.8)"
                        };

                        // calculate the sum total cost from all quarters 
                        project1TotalCost = project1CostData.reduce(function(acc, val) {
                            return acc + val;
                        });
                        // calculate the maximum total release
                        project1TotalRelease = project1ReleaseData.reduce(function(acc, val) {
                            return acc + val;
                        });

                        // calculate the minimum total release
                        project1TotalError = project1Error.reduce(function(acc, val) {
                            return acc + val;
                        });

                        // generate data for complexity and risk graph
                        project1Factors = {
                            // input each averaged out risk score as the data
                            data: [
                                project1Factor1Uniformed,
                                project1Factor2Uniformed,
                                project1Factor3Uniformed,
                                project1Factor4Uniformed,
                                project1Factor5Uniformed,
                                project1Factor6Uniformed,
                                project1Factor7Uniformed
                            ],
                            // set the background and border colour for the radar
                            backgroundColor: "rgba(238, 59, 59, 0.2)",
                            borderColor: "rgba(238, 59, 59, 0.8)",
                            label: "Uncertainty of " + project1.title + ", Total Score: " + project1Uncertainty
                        };

                    }

                    if ($("#selectProject2").val() != "-1") {
                        project2 = projects[$("#selectProject2").val()];

                        // fetch data from project2
                        let project2QuaterNumberPhase1 = parseFloat(project2.costRelease.quaterNumberPhase1);
                        let project2QuaterNumberPhase2 = parseFloat(project2.costRelease.quaterNumberPhase2);
                        let project2QuaterNumberPhase3 = parseFloat(project2.costRelease.quaterNumberPhase3);

                        let project2StartDatePhase1 = new Date(project2.costRelease.startDatePhase1);
                        let project2StartDatePhase2 = new Date(project2.costRelease.startDatePhase2);
                        let project2StartDatePhase3 = new Date(project2.costRelease.startDatePhase3);

                        let project2Factor1 = 0;
                        for (let i = 0; i < project2.complexityRisk.section1.length; i++) {
                            project2Factor1 += parseFloat(project2.complexityRisk.section1[i]);
                        }
                        let project2Factor1Uniformed = project2Factor1 / project2.complexityRisk.section1.length;

                        let project2Factor2 = 0;
                        for (let i = 0; i < project2.complexityRisk.section2.length; i++) {
                            project2Factor2 += parseFloat(project2.complexityRisk.section2[i]);
                        }
                        let project2Factor2Uniformed = project2Factor2 / project2.complexityRisk.section2.length;

                        let project2Factor3 = 0;
                        for (let i = 0; i < project2.complexityRisk.section3.length; i++) {
                            project2Factor3 += parseFloat(project2.complexityRisk.section3[i]);
                        }
                        let project2Factor3Uniformed = project2Factor3 / project2.complexityRisk.section3.length;

                        let project2Factor4 = 0;
                        for (let i = 0; i < project2.complexityRisk.section4.length; i++) {
                            project2Factor4 += parseFloat(project2.complexityRisk.section4[i]);
                        }
                        let project2Factor4Uniformed = project2Factor4 / project2.complexityRisk.section4.length;

                        let project2Factor5 = 0;
                        for (let i = 0; i < project2.complexityRisk.section5.length; i++) {
                            project2Factor5 += parseFloat(project2.complexityRisk.section5[i]);
                        }
                        let project2Factor5Uniformed = project2Factor5 / project2.complexityRisk.section5.length;

                        let project2Factor6 = 0;
                        for (let i = 0; i < project2.complexityRisk.section6.length; i++) {
                            project2Factor6 += parseFloat(project2.complexityRisk.section6[i]);
                        }
                        let project2Factor6Uniformed = project2Factor6 / project2.complexityRisk.section6.length;

                        let project2Factor7 = 0;
                        for (let i = 0; i < project2.complexityRisk.section7.length; i++) {
                            project2Factor7 += parseFloat(project2.complexityRisk.section7[i]);
                        }
                        let project2Factor7Uniformed = project2Factor7 / project2.complexityRisk.section7.length;

                        project2Uncertainty = project2Factor1 + project2Factor2 + project2Factor3 +
                            project2Factor4 + project2Factor5 + project2Factor6 + project2Factor7;

                        let project2CostPhase1 = parseFloat(project2.costRelease.fteNumberCostPhase1) * 25000 + parseFloat(project2.costRelease.operatingMoneyCostPhase1);
                        let project2ReleasePhase1 = 0;
                        let project2ErrorPhase1 = null;

                        for (let i = 1; i <= project2QuaterNumberPhase1; i++) {
                            project2CostData.push(project2CostPhase1);
                            project2ReleaseData.push(project2ReleasePhase1);
                            project2Error.push(project2ErrorPhase1);
                        }

                        let project2DifferenceP1P2 = parseFloat((project2StartDatePhase2.getTime() -
                                (project2StartDatePhase1.getTime() + project2QuaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                            (1000 * 60 * 60 * 24 * 30 * 3));

                        for (let i = 0; i < project2DifferenceP1P2; i++) {
                            project2CostData.push(0);
                            project2ReleaseData.push(0);
                            project2Error.push(null);
                        }

                        let project2CostPhase2 = parseFloat(project2.costRelease.fteNumberCostPhase2) * 25000 + parseFloat(project2.costRelease.operatingMoneyCostPhase2);
                        let project2ReleasePhase2 = parseFloat(project2.costRelease.fteNumberReleasePhase2) * 25000 + parseFloat(project2.costRelease.operatingMoneyReleasePhase2);
                        let project2ErrorPhase2 = project2Uncertainty / 170 * project2ReleasePhase2;

                        for (let i = 1; i <= project2QuaterNumberPhase2; i++) {
                            project2CostData.push(project2CostPhase2);
                            project2ReleaseData.push(project2ReleasePhase2);
                            project2Error.push(project2ErrorPhase2);
                        }

                        let project2DifferenceP2P3 = parseFloat((project2StartDatePhase3.getTime() -
                                (project2StartDatePhase2.getTime() + project2QuaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                            (1000 * 60 * 60 * 24 * 30 * 3));

                        for (let i = 0; i < project2DifferenceP2P3; i++) {
                            project2CostData.push(0);
                            project2ReleaseData.push(0);
                            project2Error.push(null);
                        }

                        let project2CostPhase3 = parseFloat(project2.costRelease.fteNumberCostPhase3) * 25000 + parseFloat(project2.costRelease.operatingMoneyCostPhase3);
                        let project2ReleasePhase3 = parseFloat(project2.costRelease.fteNumberReleasePhase3) * 25000 + parseFloat(project2.costRelease.operatingMoneyReleasePhase3);
                        let project2ErrorPhase3 = project2Uncertainty / 170 * project2ReleasePhase3;

                        for (let i = 1; i <= project2QuaterNumberPhase3; i++) {
                            project2CostData.push(project2CostPhase3);
                            project2ReleaseData.push(project2ReleasePhase3);
                            project2Error.push(project2ErrorPhase3);
                        }

                        project2TotalQuaterNumber = project2QuaterNumberPhase1 + project2DifferenceP1P2 + project2QuaterNumberPhase2 + project2DifferenceP2P3 + project2QuaterNumberPhase3;

                        project2Cost = {
                            label: "Cost of " + project2.title,
                            data: project2CostData,
                            backgroundColor: "rgba(238, 59, 59, 0.4)"
                        };

                        project2Release = {
                            label: "Release of " + project2.title,
                            data: project2ReleaseData,
                            error: project2Error,
                            backgroundColor: "rgba(30, 144, 255, 0.4)"
                        };

                        project2TotalCost = project2CostData.reduce(function(acc, val) {
                            return acc + val;
                        });
                        project2TotalRelease = project2ReleaseData.reduce(function(acc, val) {
                            return acc + val;
                        });
                        project2TotalError = project2Error.reduce(function(acc, val) {
                            return acc + val;
                        });

                        // generate data for complexity and risk graph
                        project2Factors = {
                            data: [
                                project2Factor1Uniformed,
                                project2Factor2Uniformed,
                                project2Factor3Uniformed,
                                project2Factor4Uniformed,
                                project2Factor5Uniformed,
                                project2Factor6Uniformed,
                                project2Factor7Uniformed
                            ],
                            backgroundColor: "rgba(30, 144, 255, 0.2)",
                            borderColor: "rgba(30, 144, 255, 0.8)",
                            label: "Uncertainty of " + project2.title + ", Total Score: " + project2Uncertainty
                        };

                    }

                    // check if both projects are enabled
                    if (($("#selectProject1").val() != "-1") && ($("#selectProject2").val() != "-1")) {
                        // if they are obtain the start dates for both
                        let project1StartDate = new Date(project1.costRelease.startDatePhase1);
                        let project2StartDate = new Date(project2.costRelease.startDatePhase1);

                        // get the exact start time from the date
                        let project1StartTime = project1StartDate.getTime();
                        let project2StartTime = project2StartDate.getTime();

                        // check which time is higher
                        if (project1StartTime >= project2StartTime) {
                            // if project1 start time is higher
                            // calculate the difference and convert to quarters
                            let difference = parseFloat((project1StartTime - project2StartTime) / (1000 * 60 * 60 * 24 * 30 * 3));
                            // add the difference to project 1s total quarter number 
                            // this is to have to total number of quarters that project 1 accounts for including all the blank quarters
                            project1TotalQuaterNumber += difference;
                            // for every quarter difference loop through project1
                            for (let i = 0; i < difference; i++) {
                                // add blank data to account for the difference in the start time
                                project1CostData.unshift(0);
                                project1ReleaseData.unshift(0);
                                project1Error.unshift(null);
                            }
                        } else {
                            // if project 2 has a higher start time
                            // calculate difference in terms of quarters
                            let difference = parseFloat((project2StartTime - project1StartTime) / (1000 * 60 * 60 * 24 * 30 * 3));
                            // add the difference project2 total quarter number
                            // this is to have to total number of quarters that project 2 accounts for including all the blank quarters
                            project2TotalQuaterNumber += difference;
                            for (let i = 0; i < difference; i++) {
                                // push blank data in for each quarter difference
                                project2CostData.unshift(0);
                                project2ReleaseData.unshift(0);
                                project2Error.unshift(null);
                            }
                        }

                    }

                    // use the larger quarter number of the two projects to account for the full range
                    projectTotalQuaterNumber = project1TotalQuaterNumber >= project2TotalQuaterNumber ? project1TotalQuaterNumber : project2TotalQuaterNumber;

                    // give title and labels to cost and release graph
                    costReleaseChart.options.title.text = "Cost & Released Benefit";

                    // define the label for the x-axes of cost release graph to be the quarter number
                    let projectQuaters = [];
                    for (let i = 1; i <= projectTotalQuaterNumber; i++) {
                        projectQuaters.push(i);
                    }
                    costReleaseChart.data.labels = projectQuaters;

                    // give title to complexity and risk graph
                    complexityRiskChart.options.title.text = "Complexity & Risk Factors";

                    if (project1 != null) {
                        // write data from project1 to cost and release graph
                        costReleaseChart.data.datasets.push(project1Cost);
                        costReleaseChart.data.datasets.push(project1Release);

                        // write data from project1 to complexity and risk graph
                        complexityRiskChart.data.datasets.push(project1Factors);

                        $("#tabNavProject1").show();
                        $("#tabNavProject1 a").text(project1.title);
                        $("#tabNavProject1").addClass("active");
                        $("#tabProject1").addClass("active");

                        $("#totalCostProject1").text(project1TotalCost.toFixed(2).toLocaleString());
                        $("#totalReleaseProject1").text(project1TotalRelease.toFixed(2).toLocaleString());
                        $("#maximumNetReleaseProject1").text((project1TotalRelease - project1TotalCost).toFixed(2).toLocaleString());
                        $("#minimumNetReleaseProject1").text(parseFloat(project1TotalRelease - project1TotalCost - project1TotalError).toFixed(2).toLocaleString());
                    }

                    if (project2 != null) {
                        // write data from project2 to cost and release graph
                        costReleaseChart.data.datasets.push(project2Cost);
                        costReleaseChart.data.datasets.push(project2Release);

                        // write data from project2 to complexity and risk graph
                        complexityRiskChart.data.datasets.push(project2Factors);

                        $("#tabNavProject2").show();
                        $("#tabNavProject2 a").text(project2.title);
                        if (!$("#tabNavProject1").hasClass("active")) {
                            $("#tabNavProject2").addClass("active");
                            $("#tabProject2").addClass("active");
                        }

                        $("#totalCostProject2").text(project2TotalCost.toFixed(2).toLocaleString());
                        $("#totalReleaseProject2").text(project2TotalRelease.toFixed(2).toLocaleString());
                        $("#maximumNetReleaseProject2").text((project2TotalRelease - project2TotalCost).toFixed(2).toLocaleString());
                        $("#minimumNetReleaseProject2").text(parseFloat(project2TotalRelease - project2TotalCost - project2TotalError).toFixed(2).toLocaleString());
                    }
                }

                costReleaseChart.update();
                costReleaseChart.render();
                complexityRiskChart.update();
                complexityRiskChart.render();

            }

            $("button[name='select']").click(function() {
                window.localStorage.setItem("visual_project1", $("#selectProject1").val());
                window.localStorage.setItem("visual_project2", $("#selectProject2").val());

                costReleaseChart.data.datasets = [];
                complexityRiskChart.data.datasets = [];

                costReleaseChart.options.title.text = "Nothing to show, please select a project";
                complexityRiskChart.options.title.text = "Nothing to show, please select a project";

                $("#costReleaseValues").attr("hidden", "");
                $("#tabNavProject1").hide();
                $("#tabNavProject2").hide();
                $("#tabNavProject1").removeClass("active");
                $("#tabProject1").removeClass("active");
                $("#tabNavProject2").removeClass("active");
                $("#tabProject2").removeClass("active");

                displayCharts();

            });

            displayCharts();

        },

        loadCharts: function() {
            // first obtain and store the list of projects from the browser
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            // create a fore loop to loop through each variable in the array
            var currChart = "";
            for (var i = 0; i < projects.length; i++) {
                // add the html for each list item in the drop down list
                if (!(projects[i].costRelease.quaterNumberPhase1 == null ||
                        projects[i].complexityRisk._cost == null)) {

                    currChart += '<li class = "nav-item">';
                    currChart += '<label class="chart-list-item">' + projects[i].title;
                    currChart += '<input type="checkbox" id=chart' + i + '>';
                    currChart += '<span class="checkmark"></span></label></li>';
                }
            }
            // append the html code to the actual list
            $(currChart).insertAfter("li.items-title");

        }

    };

}();