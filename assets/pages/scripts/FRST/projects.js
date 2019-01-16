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
                        projects[projects.length - 1].complexityRisk.projectCharacteristics == null)) {
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
                            "projectCharacteristics": [],
                            "strategicRisks": [],
                            "procurmentRisks": [],
                            "hrRisks": [],
                            "businessRisks": [],
                            "projectManagementRisks": [],
                            "reqManagementRisks": []
                        }
                    };

                    // add the new undefined project to the project array
                    projects.push(project_placeholder)
                    // push the updated projects array to the localStorage
                    window.localStorage.setItem("projects", JSON.stringify(projects));
                    // check if the current project isn't null
                    if (window.localStorage.getItem("current_project") != null) {
                      // if it isn't set the current project to the newly created project
                        window.localStorage.setItem("current_project", projects.length-1);
                    }
                    // change window location
                    window.location.replace("/FRST/project")
                }
            });
        },


        /*select project from dropdown menu*/
        selectProject: function() {
            // setup event listener to detect click
            $("a[name='project']").click(function() {
                // get id of the button that has been clicked
                let current_id = $(this).attr("id");
                // obtain the project number from the end of the id set current project to said number
                let current_project = parseInt(current_id.charAt(current_id.length - 1));
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
            $("input[name='cost1'][value='" + projects[current_project].complexityRisk.projectCharacteristics[1] + "']").attr("checked", true);
            $("input[name='cost2'][value='" + projects[current_project].complexityRisk.projectCharacteristics[5] + "']").attr("checked", true);
            $("input[name='cost3'][value='" + projects[current_project].complexityRisk.projectCharacteristics[6] + "']").attr("checked", true);

            $("input[name='scope1'][value='" + projects[current_project].complexityRisk.projectCharacteristics[2] + "']").attr("checked", true);
            $("input[name='scope2'][value='" + projects[current_project].complexityRisk.reqManagementRisks[0] + "']").attr("checked", true);
            $("input[name='scope3'][value='" + projects[current_project].complexityRisk.reqManagementRisks[1] + "']").attr("checked", true);
            $("input[name='scope4'][value='" + projects[current_project].complexityRisk.reqManagementRisks[2] + "']").attr("checked", true);
            $("input[name='scope5'][value='" + projects[current_project].complexityRisk.reqManagementRisks[4] + "']").attr("checked", true);
            $("input[name='scope6'][value='" + projects[current_project].complexityRisk.reqManagementRisks[5] + "']").attr("checked", true);
            $("input[name='scope7'][value='" + projects[current_project].complexityRisk.reqManagementRisks[6] + "']").attr("checked", true);
            $("input[name='scope8'][value='" + projects[current_project].complexityRisk.reqManagementRisks[7] + "']").attr("checked", true);

            $("input[name='communications1'][value='" + projects[current_project].complexityRisk.projectCharacteristics[3] + "']").attr("checked", true);
            $("input[name='communications2'][value='" + projects[current_project].complexityRisk.strategicRisks[2] + "']").attr("checked", true);
            $("input[name='communications3'][value='" + projects[current_project].complexityRisk.projectManagementRisks[0] + "']").attr("checked", true);
            $("input[name='humanResourcesCommunications1'][value='" + projects[current_project].complexityRisk.businessRisks[0] + "']").attr("checked", true);
            $("input[name='humanResourcesCommunications2'][value='" + projects[current_project].complexityRisk.businessRisks[1] + "']").attr("checked", true);

            $("input[name='projectIntegrationManagement1'][value='" + projects[current_project].complexityRisk.projectCharacteristics[4] + "']").attr("checked", true);
            $("input[name='projectIntegrationManagement2'][value='" + projects[current_project].complexityRisk.strategicRisks[3] + "']").attr("checked", true);

            $("input[name='time1'][value='" + projects[current_project].complexityRisk.projectCharacteristics[7] + "']").attr("checked", true);
            $("input[name='time2'][value='" + projects[current_project].complexityRisk.projectCharacteristics[8] + "']").attr("checked", true);
            $("input[name='time3'][value='" + projects[current_project].complexityRisk.projectCharacteristics[9] + "']").attr("checked", true);
            $("input[name='time4'][value='" + projects[current_project].complexityRisk.projectCharacteristics[10] + "']").attr("checked", true);
            $("input[name='time5'][value='" + projects[current_project].complexityRisk.projectCharacteristics[11] + "']").attr("checked", true);
            $("input[name='time6'][value='" + projects[current_project].complexityRisk.projectCharacteristics[12] + "']").attr("checked", true);
            $("input[name='time7'][value='" + projects[current_project].complexityRisk.projectCharacteristics[13] + "']").attr("checked", true);

            $("input[name='investmentPortfolioManagement1'][value='" + projects[current_project].complexityRisk.projectCharacteristics[0] + "']").attr("checked", true);
            $("input[name='investmentPortfolioManagement2'][value='" + projects[current_project].complexityRisk.strategicRisks[0] + "']").attr("checked", true);
            $("input[name='investmentPortfolioManagement3'][value='" + projects[current_project].complexityRisk.strategicRisks[1] + "']").attr("checked", true);
            $("input[name='investmentPortfolioManagement4'][value='" + projects[current_project].complexityRisk.reqManagementRisks[3] + "']").attr("checked", true);

            $("input[name='procurement1'][value='" + projects[current_project].complexityRisk.procurmentRisks[0] + "']").attr("checked", true);
            $("input[name='procurement2'][value='" + projects[current_project].complexityRisk.procurmentRisks[1] + "']").attr("checked", true);
            $("input[name='procurement3'][value='" + projects[current_project].complexityRisk.procurmentRisks[2] + "']").attr("checked", true);

            $("input[name='humanResources1'][value='" + projects[current_project].complexityRisk.hrRisks[0] + "']").attr("checked", true);
            $("input[name='humanResources2'][value='" + projects[current_project].complexityRisk.hrRisks[1] + "']").attr("checked", true);
            $("input[name='humanResources3'][value='" + projects[current_project].complexityRisk.hrRisks[2] + "']").attr("checked", true);
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
            // ensure that a current click interval isn't already defined so that an inifinite
            // interval isn't set
            $("#plus-1").mousedown(function() {
              console.log(clickInterval)
              if (!clickInterval){
                  Projects.clickAndHold(0, 1, $("#fteNumberCostPhase1"));
                }
            });

            $("#minus-1").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(0, -1, $("#fteNumberCostPhase1"));
              }
            });

            $("#plus-2").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(1, 1, $("#fteNumberCostPhase2"));
              }
            });
            $("#minus-2").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(1, -1, $("#fteNumberCostPhase2"));
              }
            });

            $("#plus-3").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(2, 1, $("#fteNumberReleasePhase2"));
              }
            });
            $("#minus-3").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(2, -1, $("#fteNumberReleasePhase2"));
              }
            });

            $("#plus-4").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(3, 1, $("#fteNumberCostPhase3"));
              }
            });
            $("#minus-4").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(3, -1, $("#fteNumberCostPhase3"));
              }
            });

            $("#plus-5").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(4, 1, $("#fteNumberReleasePhase3"));
              }
            });
            $("#minus-5").mousedown(function() {
                if (!clickInterval){
                Projects.clickAndHold(4, -1, $("#fteNumberReleasePhase3"));
              }
            });
        },

        stopButtonHold: function() {
            // detect when mouse is up on the button or when mouse out and kill the interval
            $(".adjust-btn").mouseup(function() {
                clearInterval(clickInterval);
                clickInterval = 0;

            });

            $(".adjust-btn").mouseout(function() {
                clearInterval(clickInterval);
                clickInterval = 0;

            });

        }

    };

}();
