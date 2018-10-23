var Projects = function () {

	return {

		addProject: function () {
			$("a[name='newProject']").click(function() {
				let projects = JSON.parse(window.localStorage.getItem("projects"));
				if (projects.length > 0 
					&& (projects[projects.length - 1].costRelease.quaterNumberPhase1 == null
					|| projects[projects.length - 1].complexityRisk._cost == null)) {
					alert("Please first fill out the project " + projects[projects.length - 1].title);
				} else if (projects.length >= 10) {
					alert("Add 10 projects at most!");
				} else {
					let project_placeholder = {
						"title": "Project " + (projects.length + 1),
						"costRelease": {
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
						"complexityRisk": {
							"_cost": [],
							"_scope": [],
							"_communications": [],
							"_projectIntegrationManagement": [],
							"_time": [],
							"_investmentPortfolioManagement": [],
							"_procurement": [],
							"_humanResources": [],
							"section1":[],
							"section2":[],
							"section3":[],
							"section4":[],
							"section5":[],
							"section6":[],
							"section7":[]
						}
					};

					projects.push(project_placeholder)
					window.localStorage.setItem("projects", JSON.stringify(projects));

					let text = "";
					text += '<li class="nav-item" name="project' + projects.length + '">';
					text += '<a href="javascript:;" class="nav-link" name="project" id="project' + projects.length + '"><span class="title">' + projects[projects.length-1].title + '</span></a>';
					text += '</li>';

					$("li[name='newProject']").before(text);
					location.reload();
				}
			});
		},

		loadProjects: function () {
			let projects = JSON.parse(window.localStorage.getItem("projects"));

			let text = "";
			for (let i = 0; i < projects.length; i++) {
				text += '<li class="nav-item" name="project' + i + '">';
				text += '<a href="javascript:;" class="nav-link" name="project" id="project' + i + '"><span class="title">' + projects[i].title + '</span></a>';
				text += '</li>';
			}

			$("li[name='newProject']").before(text);
		},

		selectProject: function () {
			$("a[name='project']").click(function() {
				let current_id = $(this).attr("id");
				let current_project = parseFloat(current_id.charAt(current_id.length - 1));
				if (window.localStorage.getItem("current_project") != null) {
					window.localStorage.setItem("current_project", current_project);
				}
				window.location.replace("/IRR/FRST/project");
			});

		},

		setupCurrentProject: function () {
			let projects = JSON.parse(window.localStorage.getItem("projects"));
			let current_project = window.localStorage.getItem("current_project");
			$(".page-title").prepend(projects[current_project].title);
			$("a[name='projectTitle']").prepend(projects[current_project].title);
			$("li[name='project" + current_project + "']").addClass("active");
			$("#project" + current_project).append("<span class='selected'></span>");
		},

		showProjectCharacteristics: function () {
			let projects = JSON.parse(window.localStorage.getItem("projects"));
			let current_project = window.localStorage.getItem("current_project");

			$("#startDatePhase1").val(projects[current_project].costRelease.startDatePhase1);
			$("#quaterNumberPhase1").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.quaterNumberPhase1
			});
			$("#fteNumberCostPhase1").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.fteNumberCostPhase1
			});
			$("#operatingMoneyCostPhase1").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.operatingMoneyCostPhase1
			});

			$("#startDatePhase2").val(projects[current_project].costRelease.startDatePhase2);
			$("#quaterNumberPhase2").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.quaterNumberPhase2
			});
			$("#fteNumberCostPhase2").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.fteNumberCostPhase2
			});
			$("#operatingMoneyCostPhase2").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.operatingMoneyCostPhase2
			});
			$("#fteNumberReleasePhase2").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.fteNumberReleasePhase2
			});
			$("#operatingMoneyReleasePhase2").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.operatingMoneyReleasePhase2
			});

			$("#startDatePhase3").val(projects[current_project].costRelease.startDatePhase3);
			$("#quaterNumberPhase3").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.quaterNumberPhase3
			});
			$("#fteNumberCostPhase3").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.fteNumberCostPhase3
			});
			$("#operatingMoneyCostPhase3").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.operatingMoneyCostPhase3
			});
			$("#fteNumberReleasePhase3").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.fteNumberReleasePhase3
			});
			$("#operatingMoneyReleasePhase3").data("ionRangeSlider").update({
				from: projects[current_project].costRelease.operatingMoneyReleasePhase3
			});

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
				if (projects[i].costRelease.quaterNumberPhase1 != null
					|| projects[i].complexityRisk.cost != null) {
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
		
        updateRange: function (direction, currVal, slider) {
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

       updateClick: function (fromIndex, direction, selector) {
            // accounts for the functionality of a single click of the button
            from[fromIndex] = Projects.updateRange(direction, from[fromIndex], selector);
        },

        clickAndHold: function (fromIndex, direction, selector) {
            // clicks the button once and sets an intervale to repeat that click every 90 milliseconds
            //this simulates a click and hold
            Projects.updateClick(fromIndex, direction, selector);
            clickInterval = setInterval(function () { Projects.updateClick(fromIndex, direction, selector) }, 90);
        }

	};

}();