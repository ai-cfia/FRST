var FormProject = function () {

	var submitProject = function() {

		function handleDatePickers() {
			if (jQuery().datepicker) {
				$(".date-picker").datepicker({
					rtl: App.isRTL()
				});
			}
		}

		function handleCheckedRadios() {
			$("input[type=radio]").each(function() {
				if ($(this).is(":checked")) {
					$(this).closest(".form-group").addClass("has-success");
				}
			});
		}

		function leftPad(number, targetLength) {
			var output = number + "";
			while (output.length < targetLength) {
				output = "0" + output;
			}
			return output;
		}

		/* This function updates the the second phases start date corresponding to
		the phase 1 start date and length */
		function updateStartDatePhase2() {

			// ensure that the phase one start date isn't null
			if ($("#quaterNumberPhase1").val() != null) {

				// store the phase 1 quarter number
				let quaterNumberPhase1 = parseInt($("#quaterNumberPhase1").val());

				// ensure teh date can be parsed properly
				if (Date.parse($("#startDatePhase1").val())) {
					// store phase 1's month day and year subtract one month to account for discrepancy when adding the quarters later on
					let startDatePhase1Month = parseInt($("#startDatePhase1").val().split("/")[0]);
					let startDatePhase1Day = parseInt($("#startDatePhase1").val().split("/")[1]);
					let startDatePhase1Year = parseInt($("#startDatePhase1").val().split("/")[2]);

					// store the date and get its time
					let startDatePhase1 = new Date(startDatePhase1Year, startDatePhase1Month - 1, startDatePhase1Day);
					let startDatePhase1Time = startDatePhase1.getTime();

					// store start date phase 2 by adding the amount of quarters for phase 1 converted to milliseconds
					let startDatePhase2Time = startDatePhase1Time + quaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3);

					// convert the time into a date
					let startDatePhase2 = new Date(startDatePhase2Time);

					// store the month day and year from the date
					let startDatePhase2Month = startDatePhase2.getMonth() + 1;
					let startDatePhase2Day = startDatePhase2.getDate();
					let startDatePhase2Year = startDatePhase2.getFullYear();

					// set the value of the date
					$("#startDatePhase2").val(leftPad(startDatePhase2Month, 2) + "/" + leftPad(startDatePhase2Day, 2) + "/" + startDatePhase2Year);
					$("#datePickerStartDatePhase2").datepicker("setStartDate", new Date(startDatePhase2.getFullYear(), startDatePhase2.getMonth(), startDatePhase2.getDate()));
					$("#datePickerStartDatePhase2").datepicker("update");
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
					$("#datePickerStartDatePhase3").datepicker("setStartDate", new Date(startDatePhase3.getFullYear(), startDatePhase3.getMonth(), startDatePhase3.getDate()));
					$("#datePickerStartDatePhase3").datepicker("update");
				}
			}
		}

		function tripleConstraint() {

			// caclculate total project cost
			let projectTotalCost = parseInt($("#quaterNumberPhase1").val()) * (parseFloat($("#fteNumberCostPhase1").val()) * 25000 + parseFloat($("#operatingMoneyCostPhase1").val()))
			+ parseInt($("#quaterNumberPhase2").val()) * (parseFloat($("#fteNumberCostPhase2").val()) * 25000 + parseFloat($("#operatingMoneyCostPhase2").val()))
			+ parseInt($("#quaterNumberPhase3").val()) * (parseFloat($("#fteNumberCostPhase3").val()) * 25000 + parseFloat($("#operatingMoneyCostPhase3").val()));

			// calculate the projects total length in quarters
			let projectTotalQuaterNumber = parseInt($("#quaterNumberPhase1").val()) + parseInt($("#quaterNumberPhase2").val()) + parseInt($("#quaterNumberPhase3").val());

			// assign a scaling factor to the project cost
			if (projectTotalCost <= 1250000) {
				projectTotalCost = "1";
			} else if (projectTotalCost > 1250000 && projectTotalCost <= 2500000) {
				projectTotalCost = "2";
			} else if (projectTotalCost > 2500000 && projectTotalCost <= 6250000) {
				projectTotalCost = "3";
			} else if (projectTotalCost > 6250000 && projectTotalCost <= 25000000) {
				projectTotalCost = "4";
			} else if (projectTotalCost > 25000000) {
				projectTotalCost = "5";
			}

			// assign a scaling factor for the project length
			if (projectTotalQuaterNumber <= 4) {
				projectTotalQuaterNumber = "1";
			} else if (projectTotalQuaterNumber > 4 && projectTotalQuaterNumber <= 8) {
				projectTotalQuaterNumber = "2";
			} else if (projectTotalQuaterNumber > 8 && projectTotalQuaterNumber <= 12) {
				projectTotalQuaterNumber = "3";
			} else if (projectTotalQuaterNumber > 12 && projectTotalQuaterNumber <= 16) {
				projectTotalQuaterNumber = "4";
			} else if (projectTotalQuaterNumber > 16) {
				projectTotalQuaterNumber = "5";
			}

			// if the user inputted that the project is large for the agency and has extremely high cost and high length
			// force maximum risk for project characteristics
			if ($("input[name='investmentPortfolioManagement1']:checked").val() == "5"
			&& projectTotalCost == "5" && projectTotalQuaterNumber == "5") {

				// trigger clicks on questions corresponding to project characteristics
				$("input[name='cost1'][value=5]").trigger('click');
				$("input[name='scope1'][value=5]").trigger('click');
				$("input[name='communications1'][value=5]").trigger('click');
				$("input[name='projectIntegrationManagement1'][value=5]").trigger('click');
				$("input[name='cost2'][value=5]").trigger('click');
				$("input[name='cost3'][value=5]").trigger('click');
				$("input[name='time1'][value=5]").trigger('click');
				$("input[name='time2'][value=5]").trigger('click');
				$("input[name='time3'][value=5]").trigger('click');
				$("input[name='time4'][value=5]").trigger('click');
				$("input[name='time5'][value=5]").trigger('click');
				$("input[name='time6'][value=5]").trigger('click');
				$("input[name='time7'][value=5]").trigger('click');

				// disable options for all triggered questions to block users from changing the values
				for (let i = 0; i < $("input[name='cost1']").length; i++) {
					// loop through all options for the question disabling them
					$("input[name='cost1']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='scope1']").length; i++) {
					$("input[name='scope1']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='communications1']").length; i++) {
					$("input[name='communications1']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='projectIntegrationManagement1']").length; i++) {
					$("input[name='projectIntegrationManagement1']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='cost2']").length; i++) {
					$("input[name='cost2']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='cost3']").length; i++) {
					$("input[name='cost3']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='time1']").length; i++) {
					$("input[name='time1']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='time2']").length; i++) {
					$("input[name='time2']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='time3']").length; i++) {
					$("input[name='time3']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='time4']").length; i++) {
					$("input[name='time4']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='time5']").length; i++) {
					$("input[name='time5']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='time6']").length; i++) {
					$("input[name='time6']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='time7']").length; i++) {
					$("input[name='time7']")[i].disabled = true;
				}
			} else {
				// if all the criteria aren't met or values change re-enable any
				// question that may have been checked and disabled
				for (let i = 0; i < $("input[name='cost1']").length; i++) {
					// check if the option was disabled
					if ($("input[name='cost1']")[i].disabled == true) {
						// if it was uncheck and enable it
						$("input[name='cost1']")[i].disabled = false;
						$("input[name='cost1']")[i].checked = false;
					}
				}
				$("input[name='cost1']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='scope1']").length; i++) {
					if ($("input[name='scope1']")[i].disabled == true) {
						$("input[name='scope1']")[i].disabled = false;
						$("input[name='scope1']")[i].checked = false;
					}
				}
				$("input[name='scope1']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='communications1']").length; i++) {
					if ($("input[name='communications1']")[i].disabled == true) {
						$("input[name='communications1']")[i].disabled = false;
						$("input[name='communications1']")[i].checked = false;
					}
				}
				$("input[name='communications1']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='projectIntegrationManagement1']").length; i++) {
					if ($("input[name='projectIntegrationManagement1']")[i].disabled == true) {
						$("input[name='projectIntegrationManagement1']")[i].disabled = false;
						$("input[name='projectIntegrationManagement1']")[i].checked = false;
					}
				}
				$("input[name='projectIntegrationManagement1']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='cost2']").length; i++) {
					if ($("input[name='cost2']")[i].disabled == true) {
						$("input[name='cost2']")[i].disabled = false;
						$("input[name='cost2']")[i].checked = false;
					}
				}
				$("input[name='cost2']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='cost3']").length; i++) {
					if ($("input[name='cost3']")[i].disabled == true) {
						$("input[name='cost3']")[i].disabled = false;
						$("input[name='cost3']")[i].checked = false;
					}
				}
				$("input[name='cost3']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='time1']").length; i++) {
					if ($("input[name='time1']")[i].disabled == true) {
						$("input[name='time1']")[i].disabled = false;
						$("input[name='time1']")[i].checked = false;
					}
				}
				$("input[name='time1']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='time2']").length; i++) {
					if ($("input[name='time2']")[i].disabled == true) {
						$("input[name='time2']")[i].disabled = false;
						$("input[name='time2']")[i].checked = false;
					}
				}
				$("input[name='time2']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='time3']").length; i++) {
					if ($("input[name='time3']")[i].disabled == true) {
						$("input[name='time3']")[i].disabled = false;
						$("input[name='time3']")[i].checked = false;
					}
				}
				$("input[name='time3']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='time4']").length; i++) {
					if ($("input[name='time4']")[i].disabled == true) {
						$("input[name='time4']")[i].disabled = false;
						$("input[name='time4']")[i].checked = false;
					}
				}
				$("input[name='time4']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='time5']").length; i++) {
					if ($("input[name='time5']")[i].disabled == true) {
						$("input[name='time5']")[i].disabled = false;
						$("input[name='time5']")[i].checked = false;
					}
				}
				$("input[name='time5']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='time6']").length; i++) {
					if ($("input[name='time6']")[i].disabled == true) {
						$("input[name='time6']")[i].disabled = false;
						$("input[name='time6']")[i].checked = false;
					}
				}
				$("input[name='time6']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='time7']").length; i++) {
					if ($("input[name='time7']")[i].disabled == true) {
						$("input[name='time7']")[i].disabled = false;
						$("input[name='time7']")[i].checked = false;
					}
				}
				$("input[name='time7']").closest(".form-group").removeClass("has-success");

			}

			handleCheckedRadios();
		}

		handleDatePickers();
		handleCheckedRadios();

		// check to see if the number of quarters for phase 1 isn't null
		if ($("#quaterNumberPhase1").val() != null) {
			// if it isn't null store the number of quarters
			let quaterNumberPhase1 = parseInt($("#quaterNumberPhase1").val());

			// check if the start date has been inputted
			if (Date.parse($("#startDatePhase1").val())) {
				// obtain the date if it has been inputted
				// split the date into month and year
				let startDatePhase1Month = parseInt($("#startDatePhase1").val().split("/")[0]);
				let startDatePhase1Day = parseInt($("#startDatePhase1").val().split("/")[1]);
				let startDatePhase1Year = parseInt($("#startDatePhase1").val().split("/")[2]);

				let startDatePhase1 = new Date(startDatePhase1Year, startDatePhase1Month - 1, startDatePhase1Day);
				let startDatePhase1Time = startDatePhase1.getTime();

				let startDatePhase2Time = startDatePhase1Time + quaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3);
				let startDatePhase2 = new Date(startDatePhase2Time);

				// update the start date based on the phase 1 quarters
				$("#datePickerStartDatePhase2").datepicker("setStartDate", new Date(startDatePhase2.getFullYear(), startDatePhase2.getMonth(), startDatePhase2.getDate()));
				$("#datePickerStartDatePhase2").datepicker("update");
			}
		}

		// repeat for phase 2
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

				$("#datePickerStartDatePhase3").datepicker("setStartDate", new Date(startDatePhase3.getFullYear(), startDatePhase3.getMonth(), startDatePhase3.getDate()));
				$("#datePickerStartDatePhase3").datepicker("update");
			}
		}

		$("#startDatePhase1").change(function() {
			// if the phase 1 start date changes update the phase 2 and 3 start dates
			updateStartDatePhase2();
			updateStartDatePhase3();
		});

		$("#startDatePhase2").change(function() {
			// if the phase 2 start date changes update the phase 3 start date
			updateStartDatePhase3();
		})

		$("#quaterNumberPhase1").change(function() {
			// If the phase 1 quarter number changes update phase 2 and 3 start dates
			updateStartDatePhase2();
			updateStartDatePhase3();
			tripleConstraint();
		});

		$("#quaterNumberPhase2").change(function() {
			// if the phase 2 quarter number changes update phase 3 start date
			updateStartDatePhase3();
			tripleConstraint();
		});

		// if the third phase quarter number changes or if any of the cost values change run triple constraint
		$("#quaterNumberPhase3").change(function() {
			tripleConstraint();
		});

		$("#fteNumberCostPhase1").change(function() {
			tripleConstraint();
		});

		$("#fteNumberCostPhase2").change(function() {
			tripleConstraint();
		});

		$("#fteNumberCostPhase3").change(function() {
			tripleConstraint();
		});

		$("#operatingMoneyCostPhase1").change(function() {
			tripleConstraint();
		});

		$("#operatingMoneyCostPhase2").change(function() {
			tripleConstraint();
		});

		$("#operatingMoneyCostPhase3").change(function() {
			tripleConstraint();
		});

		$("input[name='investmentPortfolioManagement1']").change(function() {
			tripleConstraint();
		});

		// check if the question asking if procurement is required's value has changed
		$("input[name='cost1']").change(function() {
			// if it has check if it states procurement is not required
			if ($("input[name='cost1']:checked").val() == "1") {
				// set the risk values for procurment questions to minimum
				$("input[name='procurement1'][value=1]").trigger('click');
				$("input[name='procurement2'][value=1]").trigger('click');
				$("input[name='procurement3'][value=1]").trigger('click');

				// disable options for the procurment questions so user can't manually change them
				for (let i = 0; i < $("input[name='procurement1']").length; i++) {
					$("input[name='procurement1']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='procurement2']").length; i++) {
					$("input[name='procurement2']")[i].disabled = true;
				}
				for (let i = 0; i < $("input[name='procurement3']").length; i++) {
					$("input[name='procurement3']")[i].disabled = true;
				}
			} else {
				// if procurment is required after the question changed then enable the options
				// that may have been disabled and re-enable and uncheck them if they were
				for (let i = 0; i < $("input[name='procurement1']").length; i++) {
					if ($("input[name='procurement1']")[i].disabled == true) {
						$("input[name='procurement1']")[i].disabled = false;
						$("input[name='procurement1']")[i].checked = false;
					}
				}
				$("input[name='procurement1']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='procurement2']").length; i++) {
					if ($("input[name='procurement2']")[i].disabled == true) {
						$("input[name='procurement2']")[i].disabled = false;
						$("input[name='procurement2']")[i].checked = false;
					}
				}
				$("input[name='procurement2']").closest(".form-group").removeClass("has-success");

				for (let i = 0; i < $("input[name='procurement3']").length; i++) {
					if ($("input[name='procurement3']")[i].disabled == true) {
						$("input[name='procurement3']")[i].disabled = false;
						$("input[name='procurement3']")[i].checked = false;
					}
				}
				$("input[name='procurement3']").closest(".form-group").removeClass("has-success");

			}

			handleCheckedRadios();
		});

		$("input[type=radio]").change(function() {
			handleCheckedRadios();
		});

		var form1 = $("#form_submit");
		var error1 = $(".alert-danger", form1);
		var success1 = $(".alert-success", form1);

		$.validator.addMethod("DateFormat", function(value,element) {
			return value.match(/^(0[1-9]|1[012])[- //.](0[1-9]|[12][0-9]|3[01])[- //.](19|20)\d\d$/);
		}, "Please enter a date in the format MM/DD/YYYY");

		form1.validate({
			// setup validator for the form submission
			errorElement: "span",
			errorClass: "help-block help-block-error",
			focusInvalid: false,
			ignore: "",
			rules: {
				// ensure all elements have been specified
				// ensure the dates is in the correct format
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
				// ensure the quarter numbers are only whole numbers
				quaterNumberPhase1: {
					digits: true,
					required: true
				},
				quaterNumberPhase2: {
					digits: true,
					required: true
				},
				quaterNumberPhase3: {
					digits: true,
					required: true
				},
				// allow any number for fte cost value
				fteNumberCostPhase1: {
					number: true,
					required: true
				},
				fteNumberCostPhase2: {
					number: true,
					required: true
				},
				fteNumberCostPhase3: {
					number: true,
					required: true
				},
				// allow only whole number values for operating costs
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
				// allow any number for fte release value
				fteNumberReleasePhase2: {
					number: true,
					required: true
				},
				fteNumberReleasePhase3: {
					number: true,
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
				// ensure all questionaire elements are required
				cost1: {
					required: true
				},
				cost2: {
					required: true
				},
				cost3: {
					required: true
				},
				scope1: {
					required: true
				},
				scope2: {
					required: true
				},
				scope3: {
					required: true
				},
				scope4: {
					required: true
				},
				scope5: {
					required: true
				},
				scope6: {
					required: true
				},
				scope7: {
					required: true
				},
				scope8: {
					required: true
				},
				communications1: {
					required: true
				},
				communications2: {
					required: true
				},
				communications3: {
					required: true
				},
				projectIntegrationManagement1: {
					required: true
				},
				projectIntegrationManagement2: {
					required: true
				},
				time1: {
					required: true
				},
				time2: {
					required: true
				},
				time3: {
					required: true
				},
				time4: {
					required: true
				},
				time5: {
					required: true
				},
				time6: {
					required: true
				},
				time7: {
					required: true
				},
				investmentPortfolioManagement1: {
					required: true
				},
				investmentPortfolioManagement2: {
					required: true
				},
				investmentPortfolioManagement3: {
					required: true
				},
				investmentPortfolioManagement4: {
					required: true
				},
				procurement1: {
					required: true
				},
				procurement2: {
					required: true
				},
				procurement3: {
					required: true
				},
				humanResources1: {
					required: true
				},
				humanResources2: {
					required: true
				},
				humanResources3: {
					required: true
				},
				humanResourcesCommunications1: {
					required: true
				},
				humanResourcesCommunications2: {
					required: true
				}
			},

			errorPlacement: function (error, element) {
				if (element.parents(".mt-radio-list").size() > 0) {
					error.appendTo(element.parents(".mt-radio-list")[0]);
				} else if (element.parent(".input-group").size() > 0) {
					error.insertAfter(element.parent(".input-group"));
				} else {
					error.insertAfter(element);
				}
			},

			invalidHandler: function (event, validator) {
				success1.hide();
				error1.show();
				$("html, body").animate({
					scrollTop: $(validator.errorList[0].element).offset().top-200
				}, 1000);
				//App.scrollTo(error1, -200);
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

				// obtain the projects array from the browsers storage
				let projects = JSON.parse(window.localStorage.getItem("projects"));

				// obtain the current projects index number
				let current_project = parseInt(window.localStorage.getItem("current_project"));

				// store the values inputted into the form to the project element obtained
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

				// calculate the projects total cost
				let projectTotalCost = parseInt($("#quaterNumberPhase1").val()) * (parseFloat($("#fteNumberCostPhase1").val()) * 25000 + parseFloat($("#operatingMoneyCostPhase1").val()))
				+ parseInt($("#quaterNumberPhase2").val()) * (parseFloat($("#fteNumberCostPhase2").val()) * 25000 + parseFloat($("#operatingMoneyCostPhase2").val()))
				+ parseInt($("#quaterNumberPhase3").val()) * (parseFloat($("#fteNumberCostPhase3").val()) * 25000 + parseFloat($("#operatingMoneyCostPhase3").val()));

				// calculate the total number of quarters
				let projectTotalQuaterNumber = parseInt($("#quaterNumberPhase1").val()) + parseInt($("#quaterNumberPhase2").val()) + parseInt($("#quaterNumberPhase3").val());

				// determine risk associated to the cost of the project
				if (projectTotalCost <= 1250000) {
					projectTotalCost = "1";
				} else if (projectTotalCost > 1250000 && projectTotalCost <= 2500000) {
					projectTotalCost = "2";
				} else if (projectTotalCost > 2500000 && projectTotalCost <= 6250000) {
					projectTotalCost = "3";
				} else if (projectTotalCost > 6250000 && projectTotalCost <= 25000000) {
					projectTotalCost = "4";
				} else if (projectTotalCost > 25000000) {
					projectTotalCost = "5";
				}

				// determine risk caused by the length of the project
				if (projectTotalQuaterNumber <= 4) {
					projectTotalQuaterNumber = "1";
				} else if (projectTotalQuaterNumber > 4 && projectTotalQuaterNumber <= 8) {
					projectTotalQuaterNumber = "2";
				} else if (projectTotalQuaterNumber > 8 && projectTotalQuaterNumber <= 12) {
					projectTotalQuaterNumber = "3";
				} else if (projectTotalQuaterNumber > 12 && projectTotalQuaterNumber <= 16) {
					projectTotalQuaterNumber = "4";
				} else if (projectTotalQuaterNumber > 16) {
					projectTotalQuaterNumber = "5";
				}


				// define arrays for each individual risk category
				// store the values of questions that correspond to each risk category
				let projectCharacteristics = [
				$("input[name='investmentPortfolioManagement1']:checked").val(),
				$("input[name='cost1']:checked").val(),
				$("input[name='scope1']:checked").val(),
				$("input[name='communications1']:checked").val(),
				$("input[name='projectIntegrationManagement1']:checked").val(),
				$("input[name='cost2']:checked").val(),
				$("input[name='cost3']:checked").val(),
				$("input[name='time1']:checked").val(),
				$("input[name='time2']:checked").val(),
				$("input[name='time3']:checked").val(),
				$("input[name='time4']:checked").val(),
				$("input[name='time5']:checked").val(),
				$("input[name='time6']:checked").val(),
				$("input[name='time7']:checked").val()
				];

				let strategicRisks = [
				$("input[name='investmentPortfolioManagement2']:checked").val(),
				$("input[name='investmentPortfolioManagement3']:checked").val(),
				$("input[name='communications2']:checked").val(),
				$("input[name='projectIntegrationManagement2']:checked").val()
				];

				let procurmentRisks = [
				$("input[name='procurement1']:checked").val(),
				$("input[name='procurement2']:checked").val(),
				$("input[name='procurement3']:checked").val()
				];

				let hrRisks = [
				$("input[name='humanResources1']:checked").val(),
				$("input[name='humanResources2']:checked").val(),
				$("input[name='humanResources3']:checked").val()
				];

				let businessRisks = [
				$("input[name='humanResourcesCommunications1']:checked").val(),
				$("input[name='humanResourcesCommunications2']:checked").val()
				];

				let projectManagementRisks = [
				$("input[name='communications3']:checked").val()
				];

				let reqManagementRisks = [
				$("input[name='scope2']:checked").val(),
				$("input[name='scope3']:checked").val(),
				$("input[name='scope4']:checked").val(),
				$("input[name='investmentPortfolioManagement4']:checked").val(),
				$("input[name='scope5']:checked").val(),
				$("input[name='scope6']:checked").val(),
				$("input[name='scope7']:checked").val(),
				$("input[name='scope8']:checked").val()
				];

				// store the arrays in the project element
				projects[current_project].complexityRisk.projectCharacteristics = projectCharacteristics;
				projects[current_project].complexityRisk.strategicRisks = strategicRisks;
				projects[current_project].complexityRisk.procurmentRisks = procurmentRisks;
				projects[current_project].complexityRisk.hrRisks = hrRisks;
				projects[current_project].complexityRisk.businessRisks = businessRisks;
				projects[current_project].complexityRisk.projectManagementRisks = projectManagementRisks;
				projects[current_project].complexityRisk.reqManagementRisks = reqManagementRisks;

				// save the arrays to the local storage
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
					if (current_project < visual_project2) {
						visual_project2 = visual_project2 - 1;
					}
					current_project = -1;
				} else if (current_project == visual_project2) {
					visual_project2 = -1;
					if (current_project < visual_project1) {
						visual_project1 = visual_project1 - 1;
					}
					current_project = -1;
				}
				window.localStorage.setItem("checked", JSON.stringify([]));
				window.localStorage.setItem("current_project", current_project);
				window.localStorage.setItem("visual_project1", visual_project1);
				window.localStorage.setItem("visual_project2", visual_project2);
				window.location.replace("/FRST/");
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
