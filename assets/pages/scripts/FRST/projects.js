var Projects = function() {

    return {

        /* add a new project */
        addProject: function() {
            // set up event listener to check if a new project wants to be made
            $("a[name='newProject']").click(function() {
                // obtain the project from the local storage
                let projects = JSON.parse(window.localStorage.getItem("projects"));
                // check if the last project added has been filled out
                if (projects.length > 0 &&
                    (projects[projects.length - 1].costRelease.quaterNumberPhase1 == null ||
                        projects[projects.length - 1].complexityRisk._cost == null)) {
                    // alert if the project has not been completed
                    alert("Please first fill out the project " + projects[projects.length - 1].title);
                } else if (projects.length >= 10) {
                    // warn user if there are already ten projects
                    alert("Add 10 projects at most!");
                } else {
                    // if there are less than ten projects define a project object
                    let project_placeholder = {
                        // define a temp project title
                        "title": "Project " + (projects.length + 1),
                        // define properties for cost release chart values for the project
                        "costRelease": {
                            // define all as null until defined later when the project form is submitted
                            "startDatePhase1": null,
                            "quaterNumberPhase1": null,
                            "fteNumberCostPhase1": null,
                            "operatingMoneyCostPhase1": null,
                            "quaterNumberPhase2": null,
                            "fteNumberCostPhase2": null,
                            "operatingMoneyCostPhase2": null,
                            "fteNumberReleasePhase2": null,
                            "operatingMoneyReleasePhase2": null,
                            "quaterNumberPhase3": null,
                            "fteNumberCostPhase3": null,
                            "operatingMoneyCostPhase3": null,
                            "fteNumberReleasePhase3": null,
                            "operatingMoneyReleasePhase3": null
                        },
                        // define the properties corresponding to the complexity risk assessment
                        "complexityRisk": {
                            // state all as empty arrays until later defined when form is submitted
                            "_cost": [],
                            "_scope": [],
                            "_communications": [],
                            "_projectIntegrationManagement": [],
                            "_time": [],
                            "_investmentPortfolioManagement": [],
                            "_procurement": [],
                            "_humanResources": [],
                            "section1": [],
                            "section2": [],
                            "section3": [],
                            "section4": [],
                            "section5": [],
                            "section6": [],
                            "section7": []
                        }
                    };

                    // add the new undefined project to the project array
                    projects.push(project_placeholder)
                    // push the updated projects array to the localStorage
                    window.localStorage.setItem("projects", JSON.stringify(projects));
                    // reload the page to update the list
                    location.reload();
                }
            });
        },
        /* load projects drop down menu*/
        loadProjects: function() {
            // obtain project array from local storage
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            // intialize variable to store html code
            let text = "";
            // generate HTML text for all the drop down elements
            for (let i = 0; i < projects.length; i++) {
                text += '<li class="nav-item" name="project' + i + '">';
                text += '<a href="javascript:;" class="nav-link" name="project" id="project' + i + '"><span class="title">' + projects[i].title + '</span></a>';
                text += '</li>';
            }
            // insert text into the DOM 
            $("li[name='newProject']").before(text);
        },


        /*select project from dropdown menu*/
        selectProject: function() {
            // setup event listener to detect click
            $("a[name='project']").click(function() {
                // get id of the button that has been clicked
                let current_id = $(this).attr("id");
                // obtain the project number from the end of the id set current project to said number
                let current_project = parseFloat(current_id.charAt(current_id.length - 1));
                // check if there is any project already set as the current project
                if (window.localStorage.getItem("current_project") != null) {
                    window.localStorage.setItem("current_project", current_project);
                }
                //redirect to the project page
                window.location.replace("/FRST/project");
            });

        },

        /* sets up the current project on the project page */
        setupCurrentProject: function() {
            // obtain the array of all projects
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            // obtain the current project index
            let current_project = window.localStorage.getItem("current_project");
            // add the current projects title to the page
            $(".page-title").prepend(projects[current_project].title);
            $("a[name='projectTitle']").prepend(projects[current_project].title);
            // change the current projects status in drop down menu to active for aesthetic purposes
            $("li[name='project" + current_project + "']").addClass("active");
            // Finally display the current project form
            $("#project" + current_project).append("<span class='selected'></span>");
        },

        /* display current set project characteristics to the project form */
        showProjectCharacteristics: function() {
            // obtain project array and current project from localStorage
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            let current_project = window.localStorage.getItem("current_project");
            // set phase 1 values
            // set date
            $("#startDatePhase1").val(projects[current_project].costRelease.startDatePhase1);
            // set quarter number slider
            $("#quaterNumberPhase1").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.quaterNumberPhase1
            });
            // set FTE cost slider 
            $("#fteNumberCostPhase1").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.fteNumberCostPhase1
            });
            // set operating cost slider
            $("#operatingMoneyCostPhase1").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.operatingMoneyCostPhase1
            });

            // set phase 2 values
            $("#startDatePhase2").val(projects[current_project].costRelease.startDatePhase2);

            // set quarter number slider
            $("#quaterNumberPhase2").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.quaterNumberPhase2
            });

            // set FTE cost slider
            $("#fteNumberCostPhase2").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.fteNumberCostPhase2
            });

            // set operating cost slider
            $("#operatingMoneyCostPhase2").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.operatingMoneyCostPhase2
            });

            // set FTE release slider 
            $("#fteNumberReleasePhase2").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.fteNumberReleasePhase2
            });

            // set operating release slider
            $("#operatingMoneyReleasePhase2").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.operatingMoneyReleasePhase2
            });

            // set phase 3 values
            // set start date
            $("#startDatePhase3").val(projects[current_project].costRelease.startDatePhase3);
            // set quarter number slider
            $("#quaterNumberPhase3").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.quaterNumberPhase3
            });

            // set FTE cost slider
            $("#fteNumberCostPhase3").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.fteNumberCostPhase3
            });

            // set operating cost slider
            $("#operatingMoneyCostPhase3").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.operatingMoneyCostPhase3
            });

            // set FTE release slider
            $("#fteNumberReleasePhase3").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.fteNumberReleasePhase3
            });

            // set operating release slider
            $("#operatingMoneyReleasePhase3").data("ionRangeSlider").update({
                from: projects[current_project].costRelease.operatingMoneyReleasePhase3
            });


            // setting currently checked radio buttons for the complexity risk questionnaire
            // obtain the current value for each question from the current project object
            // each value is associated to one of the options for each question on the questionnaire
            // use value obtained to select the correct button using jQuery and set its checked attribute to true
            $("input[name='cost1'][value='" + projects[current_project].complexityRisk._cost[1] + "']").attr("checked", true);
            $("input[name='cost2'][value='" + projects[current_project].complexityRisk._cost[2] + "']").attr("checked", true);
            $("input[name='cost3'][value='" + projects[current_project].complexityRisk._cost[3] + "']").attr("checked", true);

            $("input[name='scope1'][value='" + projects[current_project].complexityRisk._scope[0] + "']").attr("checked", true);
            $("input[name='scope2'][value='" + projects[current_project].complexityRisk._scope[1] + "']").attr("checked", true);
            $("input[name='scope3'][value='" + projects[current_project].complexityRisk._scope[2] + "']").attr("checked", true);
            $("input[name='scope4'][value='" + projects[current_project].complexityRisk._scope[3] + "']").attr("checked", true);
            $("input[name='scope5'][value='" + projects[current_project].complexityRisk._scope[4] + "']").attr("checked", true);
            $("input[name='scope6'][value='" + projects[current_project].complexityRisk._scope[5] + "']").attr("checked", true);
            $("input[name='scope7'][value='" + projects[current_project].complexityRisk._scope[6] + "']").attr("checked", true);
            $("input[name='scope8'][value='" + projects[current_project].complexityRisk._scope[7] + "']").attr("checked", true);

            $("input[name='communications1'][value='" + projects[current_project].complexityRisk._communications[0] + "']").attr("checked", true);
            $("input[name='communications2'][value='" + projects[current_project].complexityRisk._communications[1] + "']").attr("checked", true);
            $("input[name='communications3'][value='" + projects[current_project].complexityRisk._communications[2] + "']").attr("checked", true);
            $("input[name='humanResourcesCommunications1'][value='" + projects[current_project].complexityRisk._communications[3] + "']").attr("checked", true);
            $("input[name='humanResourcesCommunications2'][value='" + projects[current_project].complexityRisk._communications[4] + "']").attr("checked", true);

            $("input[name='projectIntegrationManagement1'][value='" + projects[current_project].complexityRisk._projectIntegrationManagement[0] + "']").attr("checked", true);
            $("input[name='projectIntegrationManagement2'][value='" + projects[current_project].complexityRisk._projectIntegrationManagement[1] + "']").attr("checked", true);

            $("input[name='time1'][value='" + projects[current_project].complexityRisk._time[1] + "']").attr("checked", true);
            $("input[name='time2'][value='" + projects[current_project].complexityRisk._time[2] + "']").attr("checked", true);
            $("input[name='time3'][value='" + projects[current_project].complexityRisk._time[3] + "']").attr("checked", true);
            $("input[name='time4'][value='" + projects[current_project].complexityRisk._time[4] + "']").attr("checked", true);
            $("input[name='time5'][value='" + projects[current_project].complexityRisk._time[5] + "']").attr("checked", true);
            $("input[name='time6'][value='" + projects[current_project].complexityRisk._time[6] + "']").attr("checked", true);
            $("input[name='time7'][value='" + projects[current_project].complexityRisk._time[7] + "']").attr("checked", true);

            $("input[name='investmentPortfolioManagement1'][value='" + projects[current_project].complexityRisk._investmentPortfolioManagement[0] + "']").attr("checked", true);
            $("input[name='investmentPortfolioManagement2'][value='" + projects[current_project].complexityRisk._investmentPortfolioManagement[1] + "']").attr("checked", true);
            $("input[name='investmentPortfolioManagement3'][value='" + projects[current_project].complexityRisk._investmentPortfolioManagement[2] + "']").attr("checked", true);
            $("input[name='investmentPortfolioManagement4'][value='" + projects[current_project].complexityRisk._investmentPortfolioManagement[3] + "']").attr("checked", true);

            $("input[name='procurement1'][value='" + projects[current_project].complexityRisk._procurement[0] + "']").attr("checked", true);
            $("input[name='procurement2'][value='" + projects[current_project].complexityRisk._procurement[1] + "']").attr("checked", true);
            $("input[name='procurement3'][value='" + projects[current_project].complexityRisk._procurement[2] + "']").attr("checked", true);

            $("input[name='humanResources1'][value='" + projects[current_project].complexityRisk._humanResources[0] + "']").attr("checked", true);
            $("input[name='humanResources2'][value='" + projects[current_project].complexityRisk._humanResources[1] + "']").attr("checked", true);
            $("input[name='humanResources3'][value='" + projects[current_project].complexityRisk._humanResources[2] + "']").attr("checked", true);
        },

        updateProjectsDropDownLists: function() {
            let projects = JSON.parse(window.localStorage.getItem("projects"));
            let visual_project1 = parseFloat(window.localStorage.getItem("visual_project1"));
            let visual_project2 = parseFloat(window.localStorage.getItem("visual_project2"));

            let options = [];
            options.push("<option value='-1'>Not Selected</option>");
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].costRelease.quaterNumberPhase1 != null ||
                    projects[i].complexityRisk.cost != null) {
                    options.push("<option value ='" + i + "'>" + projects[i].title + "</option>");
                }
            }

            for (let i = 0; i < options.length; i++) {
                $("#selectProject1").append(options[i]);
                $("#selectProject2").append(options[i]);
            }
            $("#selectProject1").val(visual_project1);
            $("#selectProject1").attr("old", visual_project1);
            if (visual_project1 != "-1") {
                $("#selectProject1 option[value='" + visual_project1 + "']").hide();
            }
            if (visual_project2 != "-1") {
                $("#selectProject1 option[value='" + visual_project2 + "']").hide();
            }
            $("#selectProject2").val(visual_project2);
            $("#selectProject2").attr("old", visual_project2);
            if (visual_project1 != "-1") {
                $("#selectProject2 option[value='" + visual_project1 + "']").hide();
            }
            if (visual_project2 != "-1") {
                $("#selectProject2 option[value='" + visual_project2 + "']").hide();
            }

            $("select").change(function(e) {
                var oldvalue = $(this).attr("old");
                var currentvalue = $(this).val();
                if (oldvalue) {
                    $("select option[value='" + oldvalue + "']").show();
                }
                if (currentvalue != "-1") {
                    $("select option[value='" + currentvalue + "']").hide();
                }
                $(this).attr("old", currentvalue);
            });
        },

        updateRange: function(direction, currVal, slider) {
            // update the current value on the slider based on the direction and original value
            var range_instance = slider.data("ionRangeSlider");
            // add the value change to the original value
            currVal += step * direction;
            if (currVal < 0) {
                // if the current value is less than the minimum then set it to the minimum
                currVal = 0;
            } else if (currVal > 30) {
                // set to max value if the opposite is true
                currVal = 30;
            }

            // update the value on the slider
            range_instance.update({
                from: currVal
            });
            return currVal
        },

        updateClick: function(fromIndex, direction, selector) {
            // accounts for the functionality of a single click of the button
            from[fromIndex] = Projects.updateRange(direction, from[fromIndex], selector);
        },

        clickAndHold: function(fromIndex, direction, selector) {
            // clicks the button once and sets an intervale to repeat that click every 90 milliseconds
            //this simulates a click and hold
            Projects.updateClick(fromIndex, direction, selector);
            clickInterval = setInterval(function() {
                Projects.updateClick(fromIndex, direction, selector)
            }, 90);
        },

        detectButtonPress: function() {
            // event listener for each button to detect when theres mousedown
            // each button adjusts its own slider either positively or negatively by one step value
            $("#plus-1").on('mousedown', function() {
                Projects.clickAndHold(0, 1, $("#fteNumberCostPhase1"));
            });

            $("#minus-1").on('mousedown', function() {
                Projects.clickAndHold(0, -1, $("#fteNumberCostPhase1"));
            });

            $("#plus-2").on('mousedown', function() {
                Projects.clickAndHold(1, 1, $("#fteNumberCostPhase2"));
            });
            $("#minus-2").on('mousedown', function() {
                Projects.clickAndHold(1, -1, $("#fteNumberCostPhase2"));
            });

            $("#plus-3").on('mousedown', function() {
                Projects.clickAndHold(2, 1, $("#fteNumberReleasePhase2"));
            });
            $("#minus-3").on('mousedown', function() {
                Projects.clickAndHold(2, -1, $("#fteNumberReleasePhase2"));
            });

            $("#plus-4").on('mousedown', function() {
                Projects.clickAndHold(3, 1, $("#fteNumberCostPhase3"));
            });
            $("#minus-4").on('mousedown', function() {
                Projects.clickAndHold(3, -1, $("#fteNumberCostPhase3"));
            });

            $("#plus-5").on('mousedown', function() {
                Projects.clickAndHold(4, 1, $("#fteNumberReleasePhase3"));
            });
            $("#minus-5").on('mousedown', function() {
                Projects.clickAndHold(4, -1, $("#fteNumberReleasePhase3"));
            });
        },

        stopButtonHold: function() {
            // detect when mouse is up on the button or when mouse out and kill the interval
            $(".adjust-btn").on('mouseup', function() {
                clearInterval(clickInterval);

            });

            $(".adjust-btn").on('mouseout', function() {
                clearInterval(clickInterval);

            });
        }

    };

}();