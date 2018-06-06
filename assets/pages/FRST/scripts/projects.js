var Projects = function () {

	return {

		addProject: function () {
			$("a[name='newProject']").click(function() {
				let projects = JSON.parse(window.localStorage.getItem("projects"));
				if (projects.length > 0 
					&& (projects[projects.length - 1].costRelease.quaterNumberPhase1 == null
					|| projects[projects.length - 1].complexityRisk.cost == null)) {
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
							"cost": null,
							"novelty": null,
							"duration": null,
							"reach": null,
							"agencyExperience": null,
							"dependence": null,
							"procurement": null,
							"peakHR": null,
							"HRAvailability": null
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
				let current_project = parseInt(current_id.charAt(current_id.length - 1));
				if (window.localStorage.getItem("current_project") != null) {
					window.localStorage.setItem("current_project", current_project);
				}
				window.location.replace("/FRST/project");
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
			$("#quaterNumberPhase1").val(projects[current_project].costRelease.quaterNumberPhase1);
			$("#fteNumberCostPhase1").val(projects[current_project].costRelease.fteNumberCostPhase1);
			$("#operatingMoneyCostPhase1").val(projects[current_project].costRelease.operatingMoneyCostPhase1);

			$("#startDatePhase2").val(projects[current_project].costRelease.startDatePhase2);
			$("#quaterNumberPhase2").val(projects[current_project].costRelease.quaterNumberPhase2);
			$("#fteNumberCostPhase2").val(projects[current_project].costRelease.fteNumberCostPhase2);
			$("#operatingMoneyCostPhase2").val(projects[current_project].costRelease.operatingMoneyCostPhase2);
			$("#fteNumberReleasePhase2").val(projects[current_project].costRelease.fteNumberReleasePhase2);
			$("#operatingMoneyReleasePhase2").val(projects[current_project].costRelease.operatingMoneyReleasePhase2);

			$("#startDatePhase3").val(projects[current_project].costRelease.startDatePhase3);
			$("#quaterNumberPhase3").val(projects[current_project].costRelease.quaterNumberPhase3);
			$("#fteNumberCostPhase3").val(projects[current_project].costRelease.fteNumberCostPhase3);
			$("#operatingMoneyCostPhase3").val(projects[current_project].costRelease.operatingMoneyCostPhase3);
			$("#fteNumberReleasePhase3").val(projects[current_project].costRelease.fteNumberReleasePhase3);
			$("#operatingMoneyReleasePhase3").val(projects[current_project].costRelease.operatingMoneyReleasePhase3);

			$("input[name='cost'][value='" + projects[current_project].complexityRisk.cost + "']").attr("checked", true);
			$("input[name='cost'][value='" + projects[current_project].complexityRisk.cost + "']").parent().addClass("checked");

			$("input[name='novelty'][value='" + projects[current_project].complexityRisk.novelty + "']").attr("checked", true);
			$("input[name='novelty'][value='" + projects[current_project].complexityRisk.novelty + "']").parent().addClass("checked");

			$("input[name='duration'][value='" + projects[current_project].complexityRisk.duration + "']").attr("checked", true);
			$("input[name='duration'][value='" + projects[current_project].complexityRisk.duration + "']").parent().addClass("checked");

			$("input[name='reach'][value='" + projects[current_project].complexityRisk.reach + "']").attr("checked", true);
			$("input[name='reach'][value='" + projects[current_project].complexityRisk.reach + "']").parent().addClass("checked");

			$("input[name='agencyExperience'][value='" + projects[current_project].complexityRisk.agencyExperience + "']").attr("checked", true);
			$("input[name='agencyExperience'][value='" + projects[current_project].complexityRisk.agencyExperience + "']").parent().addClass("checked");

			$("input[name='dependence'][value='" + projects[current_project].complexityRisk.dependence + "']").attr("checked", true);
			$("input[name='dependence'][value='" + projects[current_project].complexityRisk.dependence + "']").parent().addClass("checked");

			$("input[name='procurement'][value='" + projects[current_project].complexityRisk.procurement + "']").attr("checked", true);
			$("input[name='procurement'][value='" + projects[current_project].complexityRisk.procurement + "']").parent().addClass("checked");

			$("input[name='peakHR'][value='" + projects[current_project].complexityRisk.peakHR + "']").attr("checked", true);
			$("input[name='peakHR'][value='" + projects[current_project].complexityRisk.peakHR + "']").parent().addClass("checked");

			$("input[name='HRAvailability'][value='" + projects[current_project].complexityRisk.HRAvailability + "']").attr("checked", true);
			$("input[name='HRAvailability'][value='" + projects[current_project].complexityRisk.HRAvailability + "']").parent().addClass("checked");
		},

		updateProjectsDropDownLists: function() {
			let projects = JSON.parse(window.localStorage.getItem("projects"));
			let visual_project1 = parseInt(window.localStorage.getItem("visual_project1"));
			let visual_project2 = parseInt(window.localStorage.getItem("visual_project2"));

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
		}

	};

}();
