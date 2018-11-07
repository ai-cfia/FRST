var Charts = function() {

    return {

        costColours: (["rgba(238, 59, 59, 0.8)", "rgba(231, 019, 99, 0.8)", "rgba(250, 128, 114, 0.8)", "rgba(250, 0, 0, 0.8)", "rgba(255, 165, 0, 0.8)",
            "rgba(238, 59, 59, 0.4)", "rgba(231, 019, 99, 0.4)", "rgba(250, 128, 114, 0.4)", "rgba(250, 0, 0, 0.4)", "rgba(255, 165, 0, 0.4)"
        ]),

        releaseColours: (["rgba(30,144,255,0.8)", "rgba(0,255,255,0.8)", "rgba(134,206,235,0.8)", "rgba(50,205,50,0.8)", "rgba(66,105,225,0.8)",
            "rgba(30,144,255,0.4)", "rgba(0,255,255,0.4)", "rgba(134,206,235,0.8)", "rgba(50,205,50,0.8)", "rgba(66,105,225,0.8)"
        ]),

        riskFillColour: (["rgba(238, 59, 59, 0.2)", "rgba(30,144,255,0.2)", "rgba(231, 019, 99, 0.2)", "rgba(0,255,255,0.2)", "rgba(250, 128, 114, 0.2)",
            "rgba(134,206,235,0.2)", "rgba(250, 0, 0, 0.2)", "rgba(50,205,50,0.2)", "rgba(255, 165, 0, 0.2)", "rgba(66,105,225,0.2)"
        ]),

        riskBorderColour: (["rgba(238, 59, 59, 0.8)", "rgba(30,144,255,0.8)", "rgba(231, 019, 99, 0.8)", "rgba(0,255,255,0.8)", "rgba(250, 128, 114, 0.8)",
            "rgba(134,206,235,0.8)", "rgba(250, 0, 0, 0.8)", "rgba(50,205,50,0.8)", "rgba(255, 165, 0, 0.8)", "rgba(66,105,225,0.8)"
        ]),


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
            // load the charts dropdown
            Charts.loadCharts();
            // obtain projects array
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            Charts.initalizeCharts(projects, costReleaseChart, complexityRiskChart);
            Charts.updateCharts(projects, costReleaseChart, complexityRiskChart);

            // ensure the correct span elements are present based on the set language
            if (Cookies.get("lang") === "en") {
                $("[lang='fr']").attr("style", "display:none !important");

            } else {
                $("[lang='en']").attr("style", "display:none !important");

            }


        },

        /* load the charts drop down list */
        loadCharts: function() {
            // first obtain and store the list of projects from the browser
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            // create a fore loop to loop through each variable in the array
            var currChart = "";
            for (var i = 0; i < projects.length; i++) {
                // add the html for each list item in the drop down list
                if (!(projects[i].costRelease.quaterNumberPhase1 == null ||
                        projects[i].complexityRisk._cost == null)) {

                    currChart += '<li class = "nav-item chart-dropdown">';
                    currChart += '<label class="chart-list-item">' + projects[i].title;
                    currChart += '<input type="checkbox" id=chart' + i + '>';
                    currChart += '<span class="checkmark"></span></label></li>';
                }
            }
            // append the html code to the actual list
            $(currChart).insertAfter("li.items-title");

        },

        /* generate the correct data sets based on a given project
           @param {Project} project - the current project object to generate data for
           @param {string} costColour -  the colour for the cost bar
           @param {string} releaseColour - the colour for the release bar
           @param {string} riskBorder - the colour of the complexity risk chart border
           @param {string} riskFill - the fill colour of the complexity risk chart
        */
        generateData: function(project, costColour, releaseColour, riskBorder, riskFill) {
            // degfine some variables for later use
            let projectTotalQuaterNumber = 0;
            let projectCostData = [];
            let projectReleaseData = [];
            let projectError = [];
            let projectCost = {};
            let projectRelease = {};
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
            // loop through every element in section1 array
            for (let i = 0; i < project.complexityRisk.section1.length; i++) {
                // sum all the values together
                projectFactor1 += parseFloat(project.complexityRisk.section1[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor1Uniformed = projectFactor1 / project.complexityRisk.section1.length;

            let projectFactor2 = 0;
            // loop through every element in section2 array
            for (let i = 0; i < project.complexityRisk.section2.length; i++) {
                // sum all the values together
                projectFactor2 += parseFloat(project.complexityRisk.section2[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor2Uniformed = projectFactor2 / project.complexityRisk.section2.length;

            let projectFactor3 = 0;
            // loop through every element in section3 array
            for (let i = 0; i < project.complexityRisk.section3.length; i++) {
                // sum all the values together
                projectFactor3 += parseFloat(project.complexityRisk.section3[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor3Uniformed = projectFactor3 / project.complexityRisk.section3.length;

            let projectFactor4 = 0;
            // loop through every element in section4 array
            for (let i = 0; i < project.complexityRisk.section4.length; i++) {
                // sum all the values together
                projectFactor4 += parseFloat(project.complexityRisk.section4[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor4Uniformed = projectFactor4 / project.complexityRisk.section4.length;

            let projectFactor5 = 0;
            // loop through every element in section5 array
            for (let i = 0; i < project.complexityRisk.section5.length; i++) {
                // sum all the values together
                projectFactor5 += parseFloat(project.complexityRisk.section5[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor5Uniformed = projectFactor5 / project.complexityRisk.section5.length;

            let projectFactor6 = 0;
            // loop through every element in section6 array
            for (let i = 0; i < project.complexityRisk.section6.length; i++) {
                // sum all the values together
                projectFactor6 += parseFloat(project.complexityRisk.section6[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor6Uniformed = projectFactor6 / project.complexityRisk.section6.length;

            let projectFactor7 = 0;
            // loop through every element in section7 array
            for (let i = 0; i < project.complexityRisk.section7.length; i++) {
                // sum all the values together
                projectFactor7 += parseFloat(project.complexityRisk.section7[i]);
            }
            // divide the sum by the length of the array to calculate the average risk
            let projectFactor7Uniformed = projectFactor7 / project.complexityRisk.section7.length;

            // sum together all the factor values to calculate the total uncertainty
            projectUncertainty = projectFactor1 + projectFactor2 + projectFactor3 +
                projectFactor4 + projectFactor5 + projectFactor6 + projectFactor7;

            // calculate the cost per quarter of phase one by multiplying the number of FTE's per quarter by 25000 and adding the total operating cost
            // also we need to parse the values because the input from sliders are text
            let projectCostPhase1 = parseFloat(project.costRelease.fteNumberCostPhase1) * 25000 + parseFloat(project.costRelease.operatingMoneyCostPhase1);
            // set release and error values to 0 and null respectively since there is no release for the first phase
            let projectReleasePhase1 = 0;
            let projectErrorPhase1 = null;

            // loop for each quarter in the phase
            for (let i = 1; i <= projectQuaterNumberPhase1; i++) {
                // push the cost, release and error data into the data arrays for the project for each quarter in the current phase
                projectCostData.push(projectCostPhase1);
                projectReleaseData.push(projectReleasePhase1);
                projectError.push(projectErrorPhase1);
            }

            // calculate the gap between phase 1 and phase 2
            let projectDifferenceP1P2 = parseInt((projectStartDatePhase2.getTime() -
                    (projectStartDatePhase1.getTime() + projectQuaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                (1000 * 60 * 60 * 24 * 30 * 3));

            for (let i = 0; i < projectDifferenceP1P2; i++) {
                // for each additional quarter push empty data into the arrays, this is to account for projects that will have a gap between phases
                projectCostData.push(0);
                projectReleaseData.push(0);
                projectError.push(null);
            }

            // calculate the phase 2 cost
            let projectCostPhase2 = parseFloat(project.costRelease.fteNumberCostPhase2) * 25000 + parseFloat(project.costRelease.operatingMoneyCostPhase2);
            // calculate the release by following the same process followed to calculate the cost
            let projectReleasePhase2 = parseFloat(project.costRelease.fteNumberReleasePhase2) * 25000 + parseFloat(project.costRelease.operatingMoneyReleasePhase2);

            // calculate the lowest possible release based on the error
            // multiply the release by a calculated factor to obtain this value
            let projectErrorPhase2 = projectUncertainty / 170 * projectReleasePhase2;

            // loop for every quarter in the phase
            for (let i = 1; i <= projectQuaterNumberPhase2; i++) {
                // push the cost, release and uncertainty for every quarter
                projectCostData.push(projectCostPhase2);
                projectReleaseData.push(projectReleasePhase2);
                projectError.push(projectErrorPhase2);
            }

            // calculate the gap between phase2 and phase 3
            let projectDifferenceP2P3 = parseInt((projectStartDatePhase3.getTime() -
                    (projectStartDatePhase2.getTime() + projectQuaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3))) /
                (1000 * 60 * 60 * 24 * 30 * 3));

            // push blank info in for each quarter difference
            for (let i = 0; i < projectDifferenceP2P3; i++) {
                projectCostData.push(0);
                projectReleaseData.push(0);
                projectError.push(null);
            }


            // calculate phase3 cost, release and lowest possible release value
            let projectCostPhase3 = parseFloat(project.costRelease.fteNumberCostPhase3) * 25000 + parseFloat(project.costRelease.operatingMoneyCostPhase3);
            let projectReleasePhase3 = parseFloat(project.costRelease.fteNumberReleasePhase3) * 25000 + parseFloat(project.costRelease.operatingMoneyReleasePhase3);
            let projectErrorPhase3 = projectUncertainty / 170 * projectReleasePhase3;

            // loop for each quarter and push data into the data arrays for each
            for (let i = 1; i <= projectQuaterNumberPhase3; i++) {
                projectCostData.push(projectCostPhase3);
                projectReleaseData.push(projectReleasePhase3);
                projectError.push(projectErrorPhase3);
            }

            // calculate the total amount of quarters including the gaps calculated
            projectTotalQuaterNumber = projectQuaterNumberPhase1 + projectDifferenceP1P2 + projectQuaterNumberPhase2 + projectDifferenceP2P3 + projectQuaterNumberPhase3;

            // generate data for cost and release graph
            projectCost = {
                label: "Cost of " + project.title,
                // set the data array to be the final cost array generated
                data: projectCostData,
                // set bar colour
                backgroundColor: costColour
            };

            projectRelease = {
                label: "Release of " + project.title,
                // set the data of this chart to be release array generated
                data: projectReleaseData,
                // the error array becomes the error for this chart
                error: projectError,
                // set bar colour
                backgroundColor: releaseColour
            };

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
                backgroundColor: riskFill,
                borderColor: riskBorder,
                label: "Uncertainty of " + project.title + ", Total Score: " + projectUncertainty
            };

            return [projectCost, projectRelease, projectFactors, projectTotalQuaterNumber];

        },

        /* This function will calculate the total cost, release in addition to
           the minimum and maximum benfits of a project

           @param cost - the cost data2
           @param release - the release data
           @param error - the error data
        */
        calculateTotals: function(cost, release, error) {
            let totalCost = 0;
            let totalRelease = 0;
            let totalError = 0;
            let maxBenefit = 0;
            let minBenefit = 0;

            // calculate the sum total cost from all quarters
            totalCost = cost.reduce(function(acc, val) {
                return acc + val;
            });
            // calculate the maximum total release
            totalRelease = release.reduce(function(acc, val) {
                return acc + val;
            });

            // calculate the minimum total release
            totalError = error.reduce(function(acc, val) {
                return acc + val;
            });

            // calculate the minimum and max benefits
            maxBenefit = totalRelease - totalCost;
            minBenefit = totalRelease - totalCost - totalError;

            // return cost, release and the benefits
            return [totalCost, totalRelease, maxBenefit, minBenefit];

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
            var tabHTML = Charts.generateDataTabText(projectNumber, projects[projectNumber], active, data);

            // append the data to the DOM
            $(".nav-tabs").append(tabHTML[0]);
            $(".tab-content").append(tabHTML[1]);

        },

        /* This method will generate the HTML text for each data tab

           @param projectNumber {int} - the index number of the project in the projects array
           @param currProject - the actual project object for the current project
           @param active {boolean} - a boolean indicating whether the current project tab is active or not
           @param data - an array that contains all the computed data for the project(generated by generateData())
        */
        generateDataTabText: function(projectNumber, currProject, active, data) {
            // store the data from the data array into its own variables
            projectCost = data[0];
            projectRelease = data[1];
            projectFactors = data[2];
            projectTotalQuaterNumber = (data[3]);

            // calculate totals and benefits
            projectTotalData = Charts.calculateTotals(projectCost.data, projectRelease.data, projectRelease.error);

            // generate opening headers for the tab and the data pane including the project numbers in their IDs
            // check if the currrent tab needs to be active
            if (active) {

                // if it is active add the active class to the relevant div tags
                var tabText = '<li id="tabNavProject"' + projectNumber + ' class = "tab-element active"><a style="padding: 0 5px 0 5px" href="#tabProject' + projectNumber + '" data-toggle="tab">' + currProject.title + '</a></li>'
                var dataText = '<div class="tab-pane active" id="tabProject' + projectNumber + '" >';
            } else {

                // if not active then no active class
                var tabText = '<li id="tabNavProject ' + projectNumber + '" class = "tab-element"><a style="padding: 0 5px 0 5px" href="#tabProject' + projectNumber + '" data-toggle="tab">' + currProject.title + '</a></li>'
                var dataText = '<div class="tab-pane" id="tabProject' + projectNumber + '" >';
            }

            // add the remaining text to the data pane which adds the labels and the relevant values for the current project
            dataText += '<p style="margin:0 5px 0 5px; color: #555">' +
                '<span lang="en">Total cost: </span>' +
                '<span lang="fr">Coût total : </span>' +
                '<span>' + projectTotalData[0].toFixed(2).toLocaleString() + '</span>' +
                '</p>' +
                '<p style="margin:0 5px 0 5px; color: #555">' +
                '<span lang="en">Gross Revenue: </span>' +
                '<span lang="fr">Revenu brut : </span>' +
                '<span>' + projectTotalData[1].toFixed(2).toLocaleString() + '</span>' +
                '</p>' +
                '<p style="margin:0 5px 0 5px; color: #555">' +
                '<span lang="en">Maximum net benefit: </span>' +
                '<span lang="fr">Bénéfice net maximal : </span>' +
                '<span>' + projectTotalData[2].toFixed(2).toLocaleString() + '</span>' +
                '</p>' +
                '<p style="margin:0 5px 0 5px; color: #555">' +
                '<span lang="en">Minimum net benefit: </span>' +
                '<span lang="fr">Bénéfice net minimal : </span>' +
                '<span>' + projectTotalData[3].toFixed(2).toLocaleString() + '</span>' +
                '</p>' +
                '</div>';

            // return the HTML for the tav and the data pane
            return [tabText, dataText];
        },

        /* this method will display the the relevant charts for the selected projects

           @param projects - the array of projects
           @param costRelease - the costRelease chart to be rendered
           @param complexityRisk - the complexity risk chart to be rendered
           @param checkedElements - an array containing the IDs of the cheked elements from the drop down
        */
        displayCharts: function(projects, costRelease, complexityRisk, checkedElements) {

            // initialize the costRelease and complexityRisk datasets
            // this is so there aren't duplicate bars and to account
            // for when no charts are selected
            costRelease.data.datasets = [];
            complexityRisk.data.datasets = [];
            costRelease.data.labels = [];

            // delete all present tabs and data
            $(".tab-element").remove();
            $(".tab-pane").remove();

            if (checkedElements.length != 0) {
                //loop through every clicked element obtain each projects data
                // store all the data in an array
                var projectData = [];

                // define variables to track the earliest start time
                var lowestTime = Number.MAX_SAFE_INTEGER;

                // loop through every element that is checked
                for (var i = 0; i < checkedElements.length; i++) {

                    // parse the project number from the elements ID
                    projectNumber = parseInt(checkedElements[i].charAt(checkedElements[i].length - 1));

                    // generate the data for the current project
                    var data = Charts.generateData(projects[projectNumber],
                        Charts.costColours[projectNumber],
                        Charts.releaseColours[projectNumber],
                        Charts.riskBorderColour[projectNumber],
                        Charts.riskFillColour[projectNumber]);
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

                // now for each project from the selected projects compare the start times and add the difference in quarters
                // keep track of the highest
                var highestQuarters = 0;
                for (var i = 0; i < checkedElements.length; i++) {

                    // parse the current project number from the element id
                    projectNumber = parseInt(checkedElements[i].charAt(checkedElements[i].length - 1))

                    // obtain the start time of the current project
                    let projectStartDate = new Date(projects[projectNumber].costRelease.startDatePhase1);
                    let projectStartTime = projectStartDate.getTime();

                    // calculate the difference and convert to quarters
                    let difference = parseInt((projectStartTime - lowestTime) / (1000 * 60 * 60 * 24 * 30 * 3));

                    // add the difference to project 1s total quarter number
                    // this is to have to total number of quarters that project 1 accounts for including all the blank quarters
                    projectData[i][3] += difference;
                    if (projectData[i][3] > highestQuarters) {
                        highestQuarters = projectData[i][3]
                    }

                    // for every quarter difference loop through the project
                    for (var j = 0; j < difference; j++) {

                        // add blank data to account for the difference in the start time
                        projectData[i][0].data.unshift(0);
                        projectData[i][1].data.unshift(0);
                        projectData[i][1].error.unshift(null);
                    }

                    // after adding the distance push the current projects data to the chart
                    // write data from project1 to cost and release graph
                    costRelease.data.datasets.push(projectData[i][0]);
                    costRelease.data.datasets.push(projectData[i][1]);

                    // write data from project1 to complexity and risk graph
                    complexityRisk.data.datasets.push(projectData[i][2]);
                }

                // give title and labels to cost and release graph
                costRelease.options.title.text = "Cost & Released Benefit";

                // define the label for the x-axes of cost release graph to be the quarter number
                let projectQuaters = [];
                for (let i = 1; i <= highestQuarters; i++) {
                    projectQuaters.push(i);
                }

                // push the labels to the chart
                costRelease.data.labels = projectQuaters;

                // give title to complexity and risk graph
                complexityRisk.options.title.text = "Complexity & Risk Factors";

            } else {

                // set these to the titles if the list is blank
                costRelease.options.title.text = "Nothing to show, please select a project";
                complexityRisk.options.title.text = "Nothing to show, please select a project";
            }

            // update and render the charts
            costRelease.update();
            costRelease.render();
            complexityRisk.update();
            complexityRisk.render();

        },


        /* This method listens for updates to the drop down list and updates
           the charts and data tabs accordingly

           @param projects - the array of projects
           @param costRelease - the costRelease chart to be rendered
           @param complexityRisk - the complexity risk chart to be rendered
        */
        updateCharts: function(projects, costRelease, complexityRisk) {

            // define the event listener
            $(".chart-dropdown").click(function() {
                // obtain all the checked elements
                var checkedElements = $(".chart-list-item input:checked");

                // store all checkedElements' IDs in an arrays
                var checkedIDs = [];
                for (var i = 0; i < checkedElements.length; i++) {
                    // store the id's in the array
                    checkedIDs.push(checkedElements[i].id);
                }
                // set the checkedElements in localStorage
                window.localStorage.setItem("checked", JSON.stringify(checkedIDs));
                // define variable to ensure the function only executes on the after click
                var clicks = $(this).data('clicks');

                if (clicks) {

                    // display the charts
                    Charts.displayCharts(projects, costRelease, complexityRisk, checkedIDs);
                }
                $(this).data("clicks", !clicks);

            });
        },

        /*
          This method initalizes the charts and the dropdown list on start up
          to display the charts selected last time the page was loaded

          @param projects - the array of projects
          @param costRelease - the costRelease chart to be rendered
          @param complexityRisk - the complexity risk chart to be rendered

        */
        initalizeCharts: function(projects, costRelease, complexityRisk) {
            // obtain previously checked items and display the charts
            let checkedElements = JSON.parse(window.localStorage.getItem("checked"));

            if (checkedElements != null) {
                // loop through each id and set the given element
                Charts.displayCharts(projects, costRelease, complexityRisk, checkedElements);

                // loop through each id in checkedElements and set those list items to checked
                for (var i = 0; i < checkedElements.length; i++) {
                    // use jquery to obtain the relevant DOM element and set the class
                    $("#" + checkedElements[i]).prop('checked', true);
                }

            }

        }

    };

}();
