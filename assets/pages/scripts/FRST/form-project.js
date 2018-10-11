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
			let projectTotalCost = parseInt($("#quaterNumberPhase1").val()) * (parseInt($("#fteNumberCostPhase1").val()) * 100000 + parseInt($("#operatingMoneyCostPhase1").val()))
			+ parseInt($("#quaterNumberPhase2").val()) * (parseInt($("#fteNumberCostPhase2").val()) * 100000 + parseInt($("#operatingMoneyCostPhase2").val()))
			+ parseInt($("#quaterNumberPhase3").val()) * (parseInt($("#fteNumberCostPhase3").val()) * 100000 + parseInt($("#operatingMoneyCostPhase3").val()));

			let projectTotalQuaterNumber = parseInt($("#quaterNumberPhase1").val()) + parseInt($("#quaterNumberPhase2").val()) + parseInt($("#quaterNumberPhase3").val());

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

			if ($("input[name='investmentPortfolioManagement1']:checked").val() == "5"
			&& projectTotalCost == "5" && projectTotalQuaterNumber == "5") {
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

				for (let i = 0; i < $("input[name='cost1']").length; i++) {
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
				for (let i = 0; i < $("input[name='cost1']").length; i++) {
					if ($("input[name='cost1']")[i].disabled == true) {
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

				$("#datePickerStartDatePhase2").datepicker("setStartDate", new Date(startDatePhase2.getFullYear(), startDatePhase2.getMonth(), startDatePhase2.getDate()));
				$("#datePickerStartDatePhase2").datepicker("update");
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

				$("#datePickerStartDatePhase3").datepicker("setStartDate", new Date(startDatePhase3.getFullYear(), startDatePhase3.getMonth(), startDatePhase3.getDate()));
				$("#datePickerStartDatePhase3").datepicker("update");
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
			tripleConstraint();
		});

		$("#quaterNumberPhase2").change(function() {
			updateStartDatePhase3();
			tripleConstraint();
		});

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

		$("input[name='cost1']").change(function() {
			if ($("input[name='cost1']:checked").val() == "1") {
				$("input[name='procurement1'][value=1]").trigger('click');
				$("input[name='procurement2'][value=1]").trigger('click');
				$("input[name='procurement3'][value=1]").trigger('click');

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

				let projectTotalCost = parseInt($("#quaterNumberPhase1").val()) * (parseInt($("#fteNumberCostPhase1").val()) * 100000 + parseInt($("#operatingMoneyCostPhase1").val()))
				+ parseInt($("#quaterNumberPhase2").val()) * (parseInt($("#fteNumberCostPhase2").val()) * 100000 + parseInt($("#operatingMoneyCostPhase2").val()))
				+ parseInt($("#quaterNumberPhase3").val()) * (parseInt($("#fteNumberCostPhase3").val()) * 100000 + parseInt($("#operatingMoneyCostPhase3").val()));

				let projectTotalQuaterNumber = parseInt($("#quaterNumberPhase1").val()) + parseInt($("#quaterNumberPhase2").val()) + parseInt($("#quaterNumberPhase3").val());

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

				let _cost = [
				projectTotalCost,
				$("input[name='cost1']:checked").val(),
				$("input[name='cost2']:checked").val(),
				$("input[name='cost3']:checked").val()
				];

				let _scope = [
				$("input[name='scope1']:checked").val(),
				$("input[name='scope2']:checked").val(),
				$("input[name='scope3']:checked").val(),
				$("input[name='scope4']:checked").val(),
				$("input[name='scope5']:checked").val(),
				$("input[name='scope6']:checked").val(),
				$("input[name='scope7']:checked").val(),
				$("input[name='scope8']:checked").val()
				];

				let _communications = [
				$("input[name='communications1']:checked").val(),
				$("input[name='communications2']:checked").val(),
				$("input[name='communications3']:checked").val(),
				$("input[name='humanResourcesCommunications1']:checked").val(),
				$("input[name='humanResourcesCommunications2']:checked").val()
				];

				let _projectIntegrationManagement = [
				$("input[name='projectIntegrationManagement1']:checked").val(),
				$("input[name='projectIntegrationManagement2']:checked").val()
				];

				let _time = [
				projectTotalQuaterNumber,
				$("input[name='time1']:checked").val(),
				$("input[name='time2']:checked").val(),
				$("input[name='time3']:checked").val(),
				$("input[name='time4']:checked").val(),
				$("input[name='time5']:checked").val(),
				$("input[name='time6']:checked").val(),
				$("input[name='time7']:checked").val()
				];

				let _investmentPortfolioManagement = [
				$("input[name='investmentPortfolioManagement1']:checked").val(),
				$("input[name='investmentPortfolioManagement2']:checked").val(),
				$("input[name='investmentPortfolioManagement3']:checked").val(),
				$("input[name='investmentPortfolioManagement4']:checked").val()
				];

				let _procurement = [
				$("input[name='procurement1']:checked").val(),
				$("input[name='procurement2']:checked").val(),
				$("input[name='procurement3']:checked").val()
				];

				let _humanResources = [
				$("input[name='humanResources1']:checked").val(),
				$("input[name='humanResources2']:checked").val(),
				$("input[name='humanResources3']:checked").val(),
				$("input[name='humanResourcesCommunications1']:checked").val(),
				$("input[name='humanResourcesCommunications2']:checked").val()
				];

				projects[current_project].complexityRisk._cost = _cost;
				projects[current_project].complexityRisk._scope = _scope;
				projects[current_project].complexityRisk._communications = _communications;
				projects[current_project].complexityRisk._projectIntegrationManagement = _projectIntegrationManagement;
				projects[current_project].complexityRisk._time = _time;
				projects[current_project].complexityRisk._investmentPortfolioManagement = _investmentPortfolioManagement;
				projects[current_project].complexityRisk._procurement = _procurement;
				projects[current_project].complexityRisk._humanResources = _humanResources;

				let section1 = [
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

				let section2 = [
				$("input[name='investmentPortfolioManagement2']:checked").val(),
				$("input[name='investmentPortfolioManagement3']:checked").val(),
				$("input[name='communications2']:checked").val(),
				$("input[name='projectIntegrationManagement2']:checked").val()
				];

				let section3 = [
				$("input[name='procurement1']:checked").val(),
				$("input[name='procurement2']:checked").val(),
				$("input[name='procurement3']:checked").val()
				];

				let section4 = [
				$("input[name='humanResources1']:checked").val(),
				$("input[name='humanResources2']:checked").val(),
				$("input[name='humanResources3']:checked").val()
				];

				let section5 = [
				$("input[name='humanResourcesCommunications1']:checked").val(),
				$("input[name='humanResourcesCommunications2']:checked").val()
				];

				let section6 = [
				$("input[name='communications3']:checked").val()
				];

				let section7 = [
				$("input[name='scope2']:checked").val(),
				$("input[name='scope3']:checked").val(),
				$("input[name='scope4']:checked").val(),
				$("input[name='investmentPortfolioManagement4']:checked").val(),
				$("input[name='scope5']:checked").val(),
				$("input[name='scope6']:checked").val(),
				$("input[name='scope7']:checked").val(),
				$("input[name='scope8']:checked").val()
				];

				projects[current_project].complexityRisk.section1 = section1;
				projects[current_project].complexityRisk.section2 = section2;
				projects[current_project].complexityRisk.section3 = section3;
				projects[current_project].complexityRisk.section4 = section4;
				projects[current_project].complexityRisk.section5 = section5;
				projects[current_project].complexityRisk.section6 = section6;
				projects[current_project].complexityRisk.section7 = section7;

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
