var FormProject = function () {

	var submitProject = function() {

		function handleDatePickers() {
			if (jQuery().datepicker) {
				$(".date-picker").datepicker({
					rtl: App.isRTL()
				});
			}
		}

		function leftPad(number, targetLength) {
			var output = number + "";
			while (output.length < targetLength) {
				output = "0" + output;
			}
			return output;
		}

		function updateStartDatePhase2() {
			if ($("#quaterNumberPhase1").val() != null) {
				let quaterNumberPhase1 = parseInt($("#quaterNumberPhase1").val());

				if (Date.parse($("#startDatePhase1").val())) {
					let startDatePhase1Month = parseInt($("#startDatePhase1").val().split("/")[0]);
					let startDatePhase1Day = parseInt($("#startDatePhase1").val().split("/")[1]);
					let startDatePhase1Year = parseInt($("#startDatePhase1").val().split("/")[2]);

					let startDatePhase1 = new Date(startDatePhase1Year, startDatePhase1Month - 1, startDatePhase1Day);
					let startDatePhase1Time = startDatePhase1.getTime();

					let startDatePhase2Time = startDatePhase1Time + quaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3);
					let startDatePhase2 = new Date(startDatePhase2Time);

					let startDatePhase2Month = startDatePhase2.getMonth() + 1;
					let startDatePhase2Day = startDatePhase2.getDate();
					let startDatePhase2Year = startDatePhase2.getFullYear();

					$("#startDatePhase2").val(leftPad(startDatePhase2Month, 2) + "/" + leftPad(startDatePhase2Day, 2) + "/" + startDatePhase2Year);
					$("#startDatePhase2").datepicker("setStartDate", new Date(startDatePhase2.getFullYear(), startDatePhase2.getMonth(), startDatePhase2.getDate()));
					$("#startDatePhase2").datepicker("update");
				}
			}
		}

		function updateStartDatePhase3() {
			if ($("#quaterNumberPhase2").val() != null) {
				let quaterNumberPhase2 = parseInt($("#quaterNumberPhase2").val());

				if (Date.parse($("#startDatePhase2").val())) {
					let startDatePhase2Month = parseInt($("#startDatePhase2").val().split("/")[0]);
					let startDatePhase2Day = parseInt($("#startDatePhase2").val().split("/")[1]);
					let startDatePhase2Year = parseInt($("#startDatePhase2").val().split("/")[2]);

					let startDatePhase2 = new Date(startDatePhase2Year, startDatePhase2Month - 1, startDatePhase2Day);
					let startDatePhase2Time = startDatePhase2.getTime();

					let startDatePhase3Time = startDatePhase2Time + quaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3);
					let startDatePhase3 = new Date(startDatePhase3Time);

					let startDatePhase3Month = startDatePhase3.getMonth() + 1;
					let startDatePhase3Day = startDatePhase3.getDate();
					let startDatePhase3Year = startDatePhase3.getFullYear();

					$("#startDatePhase3").val(leftPad(startDatePhase3Month, 2) + "/" + leftPad(startDatePhase3Day, 2) + "/" + startDatePhase3Year);
					$("#startDatePhase3").datepicker("setStartDate", new Date(startDatePhase3.getFullYear(), startDatePhase3.getMonth(), startDatePhase3.getDate()));
					$("#startDatePhase3").datepicker("update");
				}
			}
		}

		handleDatePickers();

		if ($("#quaterNumberPhase1").val() != null) {
			let quaterNumberPhase1 = parseInt($("#quaterNumberPhase1").val());

			if (Date.parse($("#startDatePhase1").val())) {
				let startDatePhase1Month = parseInt($("#startDatePhase1").val().split("/")[0]);
				let startDatePhase1Day = parseInt($("#startDatePhase1").val().split("/")[1]);
				let startDatePhase1Year = parseInt($("#startDatePhase1").val().split("/")[2]);

				let startDatePhase1 = new Date(startDatePhase1Year, startDatePhase1Month - 1, startDatePhase1Day);
				let startDatePhase1Time = startDatePhase1.getTime();

				let startDatePhase2Time = startDatePhase1Time + quaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3);
				let startDatePhase2 = new Date(startDatePhase2Time);

				$("#startDatePhase2").datepicker("setStartDate", new Date(startDatePhase2.getFullYear(), startDatePhase2.getMonth(), startDatePhase2.getDate()));
				$("#startDatePhase2").datepicker("update");
			}
		}

		if ($("#quaterNumberPhase2").val() != null) {
			let quaterNumberPhase2 = parseInt($("#quaterNumberPhase2").val());

			if (Date.parse($("#startDatePhase2").val())) {
				let startDatePhase2Month = parseInt($("#startDatePhase2").val().split("/")[0]);
				let startDatePhase2Day = parseInt($("#startDatePhase2").val().split("/")[1]);
				let startDatePhase2Year = parseInt($("#startDatePhase2").val().split("/")[2]);

				let startDatePhase2 = new Date(startDatePhase2Year, startDatePhase2Month - 1, startDatePhase2Day);
				let startDatePhase2Time = startDatePhase2.getTime();

				let startDatePhase3Time = startDatePhase2Time + quaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3);
				let startDatePhase3 = new Date(startDatePhase3Time);

				$("#startDatePhase3").datepicker("setStartDate", new Date(startDatePhase3.getFullYear(), startDatePhase3.getMonth(), startDatePhase3.getDate()));
				$("#startDatePhase3").datepicker("update");
			}
		}

		$("#startDatePhase1").change(function() {
			updateStartDatePhase2();
			updateStartDatePhase3();
		});

		$("#startDatePhase2").change(function() {
			updateStartDatePhase3();
		})

		$("#quaterNumberPhase1").change(function() {
			updateStartDatePhase2();
			updateStartDatePhase3();
		});

		$("#quaterNumberPhase2").change(function() {
			updateStartDatePhase3();
		});

		var form1 = $("#form_submit");
		var error1 = $(".alert-danger", form1);
		var success1 = $(".alert-success", form1);

		$.validator.addMethod("DateFormat", function(value,element) {
			return value.match(/^(0[1-9]|1[012])[- //.](0[1-9]|[12][0-9]|3[01])[- //.](19|20)\d\d$/);
		}, "Please enter a date in the format MM/DD/YYYY");

		form1.validate({
			errorElement: "span",
			errorClass: "help-block help-block-error",
			focusInvalid: false,
			ignore: "",
			rules: {
				startDatePhase1: {
					required: true,
					DateFormat: true
				},
				startDatePhase2: {
					required: true,
					DateFormat: true
				},
				startDatePhase3: {
					required: true,
					DateFormat: true
				},
				quaterNumberPhase1: {
					digits: true,
					required: true,
					range: [1, 5]
				},
				quaterNumberPhase2: {
					digits: true,
					required: true,
					range: [1, 5]
				},
				quaterNumberPhase3: {
					digits: true,
					required: true,
					range: [1, 5]
				},
				fteNumberCostPhase1: {
					digits: true,
					required: true
				},
				fteNumberCostPhase2: {
					digits: true,
					required: true
				},
				fteNumberCostPhase3: {
					digits: true,
					required: true
				},
				operatingMoneyCostPhase1: {
					digits: true,
					required: true
				},
				operatingMoneyCostPhase2: {
					digits: true,
					required: true
				},
				operatingMoneyCostPhase3: {
					digits: true,
					required: true
				},
				fteNumberReleasePhase2: {
					digits: true,
					required: true
				},
				fteNumberReleasePhase3: {
					digits: true,
					required: true
				},
				operatingMoneyReleasePhase2: {
					digits: true,
					required: true
				},
				operatingMoneyReleasePhase3: {
					digits: true,
					required: true
				},
				cost: {
					required: true
				},
				novelty: {
					required: true
				},
				duration: {
					required: true
				},
				reach: {
					required: true
				},
				agencyExperience: {
					required: true
				},
				dependence: {
					required: true
				},
				procurement: {
					required: true
				},
				peakHR: {
					required: true
				},
				HRAvailability: {
					required: true
				}
			},

			errorPlacement: function (error, element) {
				if (element.parents(".mt-radio-list").size() > 0) {
					error.appendTo(element.parents(".mt-radio-list")[0]);
				} else {
					error.insertAfter(element);
				}
			},

			invalidHandler: function (event, validator) {
				success1.hide();
				error1.show();
				App.scrollTo(error1, -200);
			},

			highlight: function (element) {
			   $(element).closest(".form-group").addClass("has-error");
			},

			unhighlight: function (element) {
				$(element).closest(".form-group").removeClass("has-error");
			},

			success: function (label) {
				label.closest(".form-group").removeClass("has-error");
			},

			submitHandler: function (form) {
				success1.show();
				error1.hide();

				let projects = JSON.parse(window.localStorage.getItem("projects"));
				let current_project = parseInt(window.localStorage.getItem("current_project"));

				projects[current_project].costRelease.startDatePhase1 = $("#startDatePhase1").val();
				projects[current_project].costRelease.quaterNumberPhase1 = $("#quaterNumberPhase1").val();
				projects[current_project].costRelease.fteNumberCostPhase1 = $("#fteNumberCostPhase1").val();
				projects[current_project].costRelease.operatingMoneyCostPhase1 = $("#operatingMoneyCostPhase1").val();

				projects[current_project].costRelease.startDatePhase2 = $("#startDatePhase2").val();
				projects[current_project].costRelease.quaterNumberPhase2 = $("#quaterNumberPhase2").val();
				projects[current_project].costRelease.fteNumberCostPhase2 = $("#fteNumberCostPhase2").val();
				projects[current_project].costRelease.operatingMoneyCostPhase2 = $("#operatingMoneyCostPhase2").val();
				projects[current_project].costRelease.fteNumberReleasePhase2 = $("#fteNumberReleasePhase2").val();
				projects[current_project].costRelease.operatingMoneyReleasePhase2 = $("#operatingMoneyReleasePhase2").val();

				projects[current_project].costRelease.startDatePhase3 = $("#startDatePhase3").val();
				projects[current_project].costRelease.quaterNumberPhase3 = $("#quaterNumberPhase3").val();
				projects[current_project].costRelease.fteNumberCostPhase3 = $("#fteNumberCostPhase3").val();
				projects[current_project].costRelease.operatingMoneyCostPhase3 = $("#operatingMoneyCostPhase3").val();
				projects[current_project].costRelease.fteNumberReleasePhase3 = $("#fteNumberReleasePhase3").val();
				projects[current_project].costRelease.operatingMoneyReleasePhase3 = $("#operatingMoneyReleasePhase3").val();

				projects[current_project].complexityRisk.cost = $("input[name='cost']:checked").val();
				projects[current_project].complexityRisk.novelty = $("input[name='novelty']:checked").val();
				projects[current_project].complexityRisk.duration = $("input[name='duration']:checked").val();
				projects[current_project].complexityRisk.reach = $("input[name='reach']:checked").val();
				projects[current_project].complexityRisk.agencyExperience = $("input[name='agencyExperience']:checked").val();
				projects[current_project].complexityRisk.dependence = $("input[name='dependence']:checked").val();
				projects[current_project].complexityRisk.procurement = $("input[name='procurement']:checked").val();
				projects[current_project].complexityRisk.peakHR = $("input[name='peakHR']:checked").val();
				projects[current_project].complexityRisk.HRAvailability = $("input[name='HRAvailability']:checked").val();

				window.localStorage.setItem("projects", JSON.stringify(projects));
				window.localStorage.setItem("visual_project1", current_project);
				window.localStorage.setItem("visual_project2", -1);

				alert("Data updated!");

				window.location.href = "/FRST/charts";
			}

		});

	}

	var editProject = function () {

		var form2 = $("#form_edit");
		var error2 = $(".alert-danger", form2);
		var success2 = $(".alert-success", form2);

		form2.validate({
			errorElement: "span",
			errorClass: "help-block help-block-error",
			focusInvalid: false,
			ignore: "",
			rules: {
				newTitle: {
					required: true,
					maxlength: 20
				},
			},

			invalidHandler: function (event, validator) {
				success2.hide();
				error2.show();
				App.scrollTo(error2, -200);
			},

			highlight: function (element) {
			   $(element).closest(".form-group").addClass("has-error");
			},

			unhighlight: function (element) {
				$(element).closest(".form-group").removeClass("has-error");
			},

			success: function (label) {
				label.closest(".form-group").removeClass("has-error");
			},

			submitHandler: function (form) {
				success2.show();
				error2.hide();

				let projects = JSON.parse(window.localStorage.getItem("projects"));
				let current_project = parseInt(window.localStorage.getItem("current_project"));

				projects[current_project].title = $("#newTitle").val();
				window.localStorage.setItem("projects", JSON.stringify(projects));
					
				window.reload();
			}

		});

		$("#form_edit button[name='delete']").click(function () {
			if (confirm("Please click OK to confirm deletion")) {
				let projects = JSON.parse(window.localStorage.getItem("projects"));
				let current_project = parseInt(window.localStorage.getItem("current_project"));
				projects.splice(current_project, 1);
				window.localStorage.setItem("projects", JSON.stringify(projects));
				let visual_project1 = parseInt(window.localStorage.getItem("visual_project1"));
				let visual_project2 = parseInt(window.localStorage.getItem("visual_project2"));
				if (current_project == visual_project1) {
					visual_project1 = -1;
				}
				if (current_project == visual_project2) {
					visual_project2 = -1;
				}
				window.localStorage.setItem("visual_project1", visual_project1);
				window.localStorage.setItem("visual_project2", visual_project2);
				window.location.replace("/FRST");
			}

		});

	}

	return {

		init: function () {

			submitProject();
			editProject();

		}

	};

}();
