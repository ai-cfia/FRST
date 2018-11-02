var Charts = function() {

    return {

        costColours: (["rgba(238, 59, 59, 0.8)", "rgba(231, 019, 99, 0.8)", "rgba(250, 128, 114, 0.8)", "rgba(250, 0, 0, 0.8)" , "rgba(255, 165, 0, 0.8)",
       "rgba(238, 59, 59, 0.4)", "rgba(231, 019, 99, 0.4)", "rgba(250, 128, 114, 0.4)", "rgba(250, 0, 0, 0.4)" , "rgba(255, 165, 0, 0.4)"]),

       releaseColours: (["rgba(30,144,255,0.8)","rgba(0,255,255,0.8)","rgba(134,206,235,0.8)","rgba(50,205,50,0.8)","rgba(66,105,225,0.8)",
       "rgba(30,144,255,0.4)","rgba(0,255,255,0.4)","rgba(134,206,235,0.8)","rgba(50,205,50,0.8)","rgba(66,105,225,0.8)"]),

       riskFillColour: (["rgba(238, 59, 59, 0.2)", "rgba(30,144,255,0.2)", "rgba(231, 019, 99, 0.2)", "rgba(0,255,255,0.2)", "rgba(250, 128, 114, 0.2)",
       "rgba(134,206,235,0.2)", "rgba(250, 0, 0, 0.2)", "rgba(50,205,50,0.2)", "rgba(255, 165, 0, 0.2)", "rgba(66,105,225,0.2)"]),

       riskBorderColour: (["rgba(238, 59, 59, 0.8)", "rgba(30,144,255,0.8)", "rgba(231, 019, 99, 0.8)", "rgba(0,255,255,0.8)", "rgba(250, 128, 114, 0.8)",
       "rgba(134,206,235,0.8)", "rgba(250, 0, 0, 0.8)", "rgba(50,205,50,0.8)", "rgba(255, 165, 0, 0.8)", "rgba(66,105,225,0.8)"]),


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

            // define an array that stores all that stores all the colours for the cost bars

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
                        var data = Charts.generateData(project1, Charts.costColours[0], Charts.releaseColours[0], Charts.riskBorderColour[0], Charts.riskFillColour[0]);
                        console.log(data);
                        project1Cost = data[0];
                        project1Release = data[1];
                        project1Factors = data[2];
                        project1TotalQuaterNumber = (data[3]);
                        console.log();

                        // calculate totals and benefits
                        project1TotalData = Charts.calculateTotals(project1Cost.data, project1Release.data, project1Release.error);



                    }

                    if ($("#selectProject2").val() != "-1") {
                        project2 = projects[$("#selectProject2").val()];
                        var data2 = Charts.generateData(project2, Charts.costColours[1], Charts.releaseColours[1], Charts.riskBorderColour[1], Charts.riskFillColour[1]);
                        project2Cost = data2[0];
                        project2Release = data2[1];
                        project2Factors = data2[2];
                        project2TotalQuaterNumber = data2[3];

                        // calculate totals and benefits
                        project2TotalData = Charts.calculateTotals(project2Cost.data, project2Release.data, project2Release.error);
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
                            let difference = parseInt((project1StartTime - project2StartTime) / (1000 * 60 * 60 * 24 * 30 * 3));
                            // add the difference to project 1s total quarter number
                            // this is to have to total number of quarters that project 1 accounts for including all the blank quarters
                            project1TotalQuaterNumber += difference;
                            // for every quarter difference loop through project1
                            for (let i = 0; i < difference; i++) {
                                // add blank data to account for the difference in the start time
                                project1Cost.data.unshift(0);
                                project1Release.data.unshift(0);
                                project1Error.unshift(null);
                            }
                        } else {
                            // if project 2 has a higher start time
                            // calculate difference in terms of quarters
                            let difference = parseInt((project2StartTime - project1StartTime) / (1000 * 60 * 60 * 24 * 30 * 3));
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

                        //append the tab item to the nav-tabs list
                        $(".nav-tabs").append('<li id="tabNavProject1" class = "active"><a style="padding: 0 5px 0 5px" href="#tabProject1" data-toggle="tab">Project 1</a></li>')

                        var text = '<div class="tab-pane active" id="tabProject1">' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Total cost: </span>' +
                                '<span lang="fr">Coût total : </span>' +
                                '<span id="totalCostProject1">' + project1TotalData[0].toFixed(2).toLocaleString() +'</span>' +
                            '</p>' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Gross Revenue: </span>' +
                                '<span lang="fr">Revenu brut : </span>' +
                                '<span id="totalReleaseProject1">' + project1TotalData[1].toFixed(2).toLocaleString() + '</span>' +
                            '</p>' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Maximum net benefit: </span>' +
                                '<span lang="fr">Bénéfice net maximal : </span>' +
                                '<span id="maximumNetReleaseProject1">' + project1TotalData[2].toFixed(2).toLocaleString() + '</span>' +
                            '</p>' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Minimum net benefit: </span>' +
                                '<span lang="fr">Bénéfice net minimal : </span>' +
                                '<span id="minimumNetReleaseProject1">' + project1TotalData[3].toFixed(2).toLocaleString() + '</span>' +
                            '</p>' +
                        '</div>'

                        $(".tab-content").append(text);

                    }

                    if (project2 != null) {
                        // write data from project2 to cost and release graph
                        costReleaseChart.data.datasets.push(project2Cost);
                        costReleaseChart.data.datasets.push(project2Release);

                        // write data from project2 to complexity and risk graph
                        complexityRiskChart.data.datasets.push(project2Factors);

                        //append the tab item to the nav-tabs list
                        $(".nav-tabs").append('<li id="tabNavProject2"><a style="padding: 0 5px 0 5px" href="#tabProject2" data-toggle="tab">Project 2</a></li>')

                        var text = '<div class="tab-pane" id="tabProject2">' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Total cost: </span>' +
                                '<span lang="fr">Coût total : </span>' +
                                '<span id="totalCostProject2">' + project2TotalData[0].toFixed(2).toLocaleString() +'</span>' +
                            '</p>' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Gross Revenue: </span>' +
                                '<span lang="fr">Revenu brut : </span>' +
                                '<span id="totalReleaseProject2">' + project2TotalData[2].toFixed(2).toLocaleString() + '</span>' +
                            '</p>' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Maximum net benefit: </span>' +
                                '<span lang="fr">Bénéfice net maximal : </span>' +
                                '<span id="maximumNetReleaseProject2">' + project2TotalData[2].toFixed(2).toLocaleString() + '</span>' +
                            '</p>' +
                            '<p style="margin:0 5px 0 5px; color: #555">' +
                                '<span lang="en">Minimum net benefit: </span>' +
                                '<span lang="fr">Bénéfice net minimal : </span>' +
                                '<span id="minimumNetReleaseProject2">' + project2TotalData[3].toFixed(2).toLocaleString() + '</span>' +
                            '</p>' +
                        '</div>'

                        $(".tab-content").append(text);
                    }
                }

                costReleaseChart.update();
                costReleaseChart.render();
                complexityRiskChart.update();
                complexityRiskChart.render();

                //disable correct span elements
                if (Cookies.get("lang") === "en") {
                    $("[lang='fr']").attr("style", "display");
                    $("[lang='en']").attr("style", "display:none !important");
                    Cookies.set("lang", "fr");
                } else {
                    $("[lang='en']").attr("style", "display");
                    $("[lang='fr']").attr("style", "display:none !important");
                    Cookies.set("lang", "en");
                }

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
            Charts.displayDataTabs()

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
            console.log(project);
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
        calculateTotals: function(cost, release, error){
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

        displayDataTabs: function() {
          //obtain projects array from local storage
          let projects = JSON.parse(window.localStorage.getItem("projects"));
          // check if any of the check boxes have been clicked
          $(".chart-dropdown").click(function() {
            // define variable to ensure the function only executes on the after click
            var clicks = $(this).data('clicks');
            if (clicks) {
              // obtain all checked elements
              var checkedElements = $(".chart-list-item input:checked");
              //loop through every clicked element
              for (var i = 0; i < checkedElements.length; i++){
                //
              }
            }
            $(this).data("clicks", !clicks);

          });


        },

        generateDataTabText: function(projectNumber, currProject, active) {
          // create data for the current project
          var data = Charts.generateData(currProject, costColours[0], releaseColours[0], riskBorderColour[0], riskFillColour[0]);
          console.log(data);
          projectCost = data[0];
          projectRelease = data[1];
          projectFactors = data[2];
          projectTotalQuaterNumber = (data[3]);

          // calculate totals and benefits
          projectTotalData = Charts.calculateTotals(projectCost.data, projectRelease.data, projectRelease.error);
          if (active){
            var tabText = '<li id="tabNavProject"' + projectNumber + ' class = "active"><a style="padding: 0 5px 0 5px" href="#tabProject1" data-toggle="tab">' + currProject.title + '</a></li>'
            var dataText = '<div class="tab-pane active" id="tabProject">';
          }else{
            var tabText = '<li id="tabNavProject"' + projectNumber + '><a style="padding: 0 5px 0 5px" href="#tabProject1" data-toggle="tab">' + currProject.title + '</a></li>'
            var dataText = '<div class="tab-pane" id="tabProject">';
          }
          dataText += '<p style="margin:0 5px 0 5px; color: #555">' +
                  '<span lang="en">Total cost: </span>' +
                  '<span lang="fr">Coût total : </span>' +
                  '<span id="totalCostProject1">' + projectTotalData[0].toFixed(2).toLocaleString() +'</span>' +
              '</p>' +
              '<p style="margin:0 5px 0 5px; color: #555">' +
                  '<span lang="en">Gross Revenue: </span>' +
                  '<span lang="fr">Revenu brut : </span>' +
                  '<span id="totalReleaseProject1">' + projectTotalData[1].toFixed(2).toLocaleString() + '</span>' +
              '</p>' +
              '<p style="margin:0 5px 0 5px; color: #555">' +
                  '<span lang="en">Maximum net benefit: </span>' +
                  '<span lang="fr">Bénéfice net maximal : </span>' +
                  '<span id="maximumNetReleaseProject1">' + projectTotalData[2].toFixed(2).toLocaleString() + '</span>' +
              '</p>' +
              '<p style="margin:0 5px 0 5px; color: #555">' +
                  '<span lang="en">Minimum net benefit: </span>' +
                  '<span lang="fr">Bénéfice net minimal : </span>' +
                  '<span id="minimumNetReleaseProject1">' + projectTotalData[3].toFixed(2).toLocaleString() + '</span>' +
              '</p>' +
          '</div>';

          return [tabText, dataText];
        }

    };

}();
