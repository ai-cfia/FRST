var Charts = function () {

	return {

		initCharts: function() {

			Chart.defaults.global.defaultFontFamily = "Arial";
			Chart.defaults.global.defaultFontSize = 12;
			Chart.defaults.global.defaultFontColor = "#777";

			let costReleaseChart = new Chart($("canvas[name='costReleaseChart']"), {
				type: "barError",
				data: {
					labels: [],
					datasets: [],
					error: []
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Nothing to show, please select a project",
						fontSize: 19
					},
					legend: {
						position: "bottom"
					},
					scales: {
						xAxes: [{
							scaleLabel: {
								display: true,
								labelString: "Number of Quaters"
							}
						}],
						yAxes: [{
							ticks: {
								userCallback: function(value, index, values) {
									return "$" + value.toLocaleString();
								},
								min: 0,
								suggestedMax: 100000,
								beginAtZero: true
							},
						}]
					},
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

			let complexityRiskChart = new Chart($("canvas[name='complexityRiskChart']"), {
				type: "radar",
				data: {
					labels: [
						/*
						"Cost",
						"Scope",
						"Communications",
						"Project Integration Management",
						"Time",
						"Investment Portfolio Management",
						"Procurement",
						"Human Resources"
						*/
						"Projet Characteristics",
						"Strategic Management Risks",
						"Procurement Risks",
						"Human Resources Risks",
						"Business Risks",
						"Project Management Risks",
						"Project Requirement Management"
					],
					datasets: []
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Nothing to show, please select a project",
						fontSize: 19
					},
					legend: {
						labels: {
							defaultFontSize: 15
						},
						position: "bottom"
					},
					scale: {
						ticks: {
							max: 5.0,
							min: 0.0
						},
						pointLabels: {
							fontSize: 12
						}
					},
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

			function displayCharts() {
				if ($("#selectProject1").val() != "-1" || $("#selectProject2").val() != "-1") {
					let projects = JSON.parse(window.localStorage.getItem("projects"));

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
					let project2Release ={};
					let project2Factors = {};

					let project2TotalCost = 0;
					let project2TotalRelease = 0;
					let project2TotalError = 0;

					let project1Uncertainty = 0;
					let project2Uncertainty = 0;

					$("#costReleaseValues").removeAttr("hidden");

					if ($("#selectProject1").val() != "-1") {
						project1 = projects[$("#selectProject1").val()];

						// fetch data from project1
						let project1QuaterNumberPhase1 = parseInt(project1.costRelease.quaterNumberPhase1);
						let project1QuaterNumberPhase2 = parseInt(project1.costRelease.quaterNumberPhase2);
						let project1QuaterNumberPhase3 = parseInt(project1.costRelease.quaterNumberPhase3);

						let project1StartDatePhase1 = new Date(project1.costRelease.startDatePhase1);
						let project1StartDatePhase2 = new Date(project1.costRelease.startDatePhase2);
						let project1StartDatePhase3 = new Date(project1.costRelease.startDatePhase3);

						/*
						let project1Factor1 = 0;
						for (let i = 0; i < project1.complexityRisk._cost.length; i++) {
							project1Factor1 += parseInt(project1.complexityRisk._cost[i]);
						}
						project1Factor1 = project1Factor1 / project1.complexityRisk._cost.length;

						let project1Factor2 = 0;
						for (let i = 0; i < project1.complexityRisk._scope.length; i++) {
							project1Factor2 += parseInt(project1.complexityRisk._scope[i]);
						}
						project1Factor2 = project1Factor2 / project1.complexityRisk._scope.length;

						let project1Factor3 = 0;
						for (let i = 0; i < project1.complexityRisk._communications.length; i++) {
							project1Factor3 += parseInt(project1.complexityRisk._communications[i]);
						}
						project1Factor3 = project1Factor3 / project1.complexityRisk._communications.length;

						let project1Factor4 = 0;
						for (let i = 0; i < project1.complexityRisk._projectIntegrationManagement.length; i++) {
							project1Factor4 += parseInt(project1.complexityRisk._projectIntegrationManagement[i]);
						}
						project1Factor4 = project1Factor4 / project1.complexityRisk._projectIntegrationManagement.length;

						let project1Factor5 = 0;
						for (let i = 0; i < project1.complexityRisk._time.length; i++) {
							project1Factor5 += parseInt(project1.complexityRisk._time[i]);
						}
						project1Factor5 = project1Factor5 / project1.complexityRisk._time.length;

						let project1Factor6 = 0;
						for (let i = 0; i < project1.complexityRisk._communications.length; i++) {
							project1Factor6 += parseInt(project1.complexityRisk._communications[i]);
						}
						project1Factor6 = project1Factor6 / project1.complexityRisk._communications.length;

						let project1Factor7 = 0;
						for (let i = 0; i < project1.complexityRisk._procurement.length; i++) {
							project1Factor7 += parseInt(project1.complexityRisk._procurement[i]);
						}
						project1Factor7 = project1Factor7 / project1.complexityRisk._procurement.length;

						let project1Factor8 = 0;
						for (let i = 0; i < project1.complexityRisk._humanResources.length; i++) {
							project1Factor8 += parseInt(project1.complexityRisk._humanResources[i]);
						}
						project1Factor8 = project1Factor8 / project1.complexityRisk._humanResources.length;
						*/

						let project1Factor1 = 0;
						for (let i = 0; i < project1.complexityRisk.section1.length; i++) {
							project1Factor1 += parseInt(project1.complexityRisk.section1[i]);
						}
						let project1Factor1Uniformed = project1Factor1 / project1.complexityRisk.section1.length;

						let project1Factor2 = 0;
						for (let i = 0; i < project1.complexityRisk.section2.length; i++) {
							project1Factor2 += parseInt(project1.complexityRisk.section2[i]);
						}
						let project1Factor2Uniformed = project1Factor2 / project1.complexityRisk.section2.length;

						let project1Factor3 = 0;
						for (let i = 0; i < project1.complexityRisk.section3.length; i++) {
							project1Factor3 += parseInt(project1.complexityRisk.section3[i]);
						}
						let project1Factor3Uniformed = project1Factor3 / project1.complexityRisk.section3.length;

						let project1Factor4 = 0;
						for (let i = 0; i < project1.complexityRisk.section4.length; i++) {
							project1Factor4 += parseInt(project1.complexityRisk.section4[i]);
						}
						let project1Factor4Uniformed = project1Factor4 / project1.complexityRisk.section4.length;

						let project1Factor5 = 0;
						for (let i = 0; i < project1.complexityRisk.section5.length; i++) {
							project1Factor5 += parseInt(project1.complexityRisk.section5[i]);
						}
						let project1Factor5Uniformed = project1Factor5 / project1.complexityRisk.section5.length;

						let project1Factor6 = 0;
						for (let i = 0; i < project1.complexityRisk.section6.length; i++) {
							project1Factor6 += parseInt(project1.complexityRisk.section6[i]);
						}
						let project1Factor6Uniformed = project1Factor6 / project1.complexityRisk.section6.length;

						let project1Factor7 = 0;
						for (let i = 0; i < project1.complexityRisk.section7.length; i++) {
							project1Factor7 += parseInt(project1.complexityRisk.section7[i]);
						}
						let project1Factor7Uniformed = project1Factor7 / project1.complexityRisk.section7.length;

						project1Uncertainty = project1Factor1 + project1Factor2 + project1Factor3
						+ project1Factor4 + project1Factor5 + project1Factor6 + project1Factor7;

						//let project1CostPhase1 = -(parseInt(project1.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase1));
						let project1CostPhase1 = parseInt(project1.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase1);
						let project1ReleasePhase1 = 0;
						let project1ErrorPhase1 = null;

						for (let i = 1; i <= project1QuaterNumberPhase1; i++) {
							project1CostData.push(project1CostPhase1);
							project1ReleaseData.push(project1ReleasePhase1);
							project1Error.push(project1ErrorPhase1);
						}

						let project1DifferenceP1P2 = parseInt((project1StartDatePhase2.getTime()
							- (project1StartDatePhase1.getTime() + project1QuaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3)))
							/ (1000 * 60 * 60 * 24 * 30 * 3));

						for (let i = 0; i < project1DifferenceP1P2; i++) {
							project1CostData.push(0);
							project1ReleaseData.push(0);
							project1Error.push(null);
						}

						//let project1CostPhase2 = -(parseInt(project1.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase2));
						let project1CostPhase2 = parseInt(project1.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase2);
						let project1ReleasePhase2 = parseInt(project1.costRelease.fteNumberReleasePhase2) * 100000 + parseInt(project1.costRelease.operatingMoneyReleasePhase2);
						let project1ErrorPhase2 = project1Uncertainty / 170 * project1ReleasePhase2;

						for (let i = 1; i <= project1QuaterNumberPhase2; i++) {
							project1CostData.push(project1CostPhase2);
							project1ReleaseData.push(project1ReleasePhase2);
							project1Error.push(project1ErrorPhase2);
						}

						let project1DifferenceP2P3 = parseInt((project1StartDatePhase3.getTime()
							- (project1StartDatePhase2.getTime() + project1QuaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3)))
							/ (1000 * 60 * 60 * 24 * 30 * 3));

						for (let i = 0; i < project1DifferenceP2P3; i++) {
							project1CostData.push(0);
							project1ReleaseData.push(0);
							project1Error.push(null);
						}

						//let project1CostPhase3 = -(parseInt(project1.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase3));
						let project1CostPhase3 = parseInt(project1.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project1.costRelease.operatingMoneyCostPhase3);
						let project1ReleasePhase3 = parseInt(project1.costRelease.fteNumberReleasePhase3) * 100000 + parseInt(project1.costRelease.operatingMoneyReleasePhase3);
						let project1ErrorPhase3 = project1Uncertainty / 170 * project1ReleasePhase3;

						for (let i = 1; i <= project1QuaterNumberPhase3; i++) {
							project1CostData.push(project1CostPhase3);
							project1ReleaseData.push(project1ReleasePhase3);
							project1Error.push(project1ErrorPhase3);
						}

						project1TotalQuaterNumber = project1QuaterNumberPhase1 + project1DifferenceP1P2 + project1QuaterNumberPhase2 + project1DifferenceP2P3 + project1QuaterNumberPhase3;

						// generate data for cost and release graph
						project1Cost = {
							label: "Cost of " + project1.title,
							data: project1CostData,
							backgroundColor: "rgba(238, 59, 59, 0.8)"
						};

						project1Release = {
							label: "Release of " + project1.title,
							data: project1ReleaseData,
							error: project1Error,
							backgroundColor: "rgba(30, 144, 255, 0.8)"
						};

						project1TotalCost = project1CostData.reduce(function(acc, val) { return acc + val; });
						project1TotalRelease = project1ReleaseData.reduce(function(acc, val) { return acc + val; });
						project1TotalError = project1Error.reduce(function(acc, val) { return acc + val; });

						// generate data for complexity and risk graph
						/*
						project1Factors = {
							data: [
							project1Factor1,
							project1Factor2,
							project1Factor3,
							project1Factor4,
							project1Factor5,
							project1Factor6,
							project1Factor7,
							project1Factor8,
							project1Factor9
							],
							backgroundColor: [
							"rgba(244, 96, 108, 0.6)",
							"rgba(236, 173, 158, 0.6)",
							"rgba(230, 206, 172, 0.6)",
							"rgba(209, 186, 116, 0.6)",
							"rgba(214, 213, 183, 0.6)",
							"rgba(190, 237, 199, 0.6)",
							"rgba(190, 231, 233, 0.6)",
							"rgba(160, 238, 225, 0.6)",
							"rgba(140, 199, 181, 0.6)",
							]
						};
						*/
						project1Factors = {
							data: [
							project1Factor1Uniformed,
							project1Factor2Uniformed,
							project1Factor3Uniformed,
							project1Factor4Uniformed,
							project1Factor5Uniformed,
							project1Factor6Uniformed,
							project1Factor7Uniformed
							],
							backgroundColor: "rgba(238, 59, 59, 0.2)",
							borderColor: "rgba(238, 59, 59, 0.8)",
							label: "Uncertainty of " + project1.title + ", Total Score: " + project1Uncertainty
						};

					}

					if ($("#selectProject2").val() != "-1") {
						project2 = projects[$("#selectProject2").val()];

						// fetch data from project2
						let project2QuaterNumberPhase1 = parseInt(project2.costRelease.quaterNumberPhase1);
						let project2QuaterNumberPhase2 = parseInt(project2.costRelease.quaterNumberPhase2);
						let project2QuaterNumberPhase3 = parseInt(project2.costRelease.quaterNumberPhase3);

						let project2StartDatePhase1 = new Date(project2.costRelease.startDatePhase1);
						let project2StartDatePhase2 = new Date(project2.costRelease.startDatePhase2);
						let project2StartDatePhase3 = new Date(project2.costRelease.startDatePhase3);

						/*
						let project2Factor1 = 0;
						for (let i = 0; i < project2.complexityRisk._cost.length; i++) {
							project2Factor1 += parseInt(project2.complexityRisk._cost[i]);
						}
						project2Factor1 = project2Factor1 / project2.complexityRisk._cost.length;

						let project2Factor2 = 0;
						for (let i = 0; i < project2.complexityRisk._scope.length; i++) {
							project2Factor2 += parseInt(project2.complexityRisk._scope[i]);
						}
						project2Factor2 = project2Factor2 / project2.complexityRisk._scope.length;

						let project2Factor3 = 0;
						for (let i = 0; i < project2.complexityRisk._communications.length; i++) {
							project2Factor3 += parseInt(project2.complexityRisk._communications[i]);
						}
						project2Factor3 = project2Factor3 / project2.complexityRisk._communications.length;

						let project2Factor4 = 0;
						for (let i = 0; i < project2.complexityRisk._projectIntegrationManagement.length; i++) {
							project2Factor4 += parseInt(project2.complexityRisk._projectIntegrationManagement[i]);
						}
						project2Factor4 = project2Factor4 / project2.complexityRisk._projectIntegrationManagement.length;

						let project2Factor5 = 0;
						for (let i = 0; i < project2.complexityRisk._time.length; i++) {
							project2Factor5 += parseInt(project2.complexityRisk._time[i]);
						}
						project2Factor5 = project2Factor5 / project2.complexityRisk._time.length;

						let project2Factor6 = 0;
						for (let i = 0; i < project2.complexityRisk._communications.length; i++) {
							project2Factor6 += parseInt(project2.complexityRisk._communications[i]);
						}
						project2Factor6 = project2Factor6 / project2.complexityRisk._communications.length;

						let project2Factor7 = 0;
						for (let i = 0; i < project2.complexityRisk._procurement.length; i++) {
							project2Factor7 += parseInt(project2.complexityRisk._procurement[i]);
						}
						project2Factor7 = project2Factor7 / project2.complexityRisk._procurement.length;

						let project2Factor8 = 0;
						for (let i = 0; i < project2.complexityRisk._humanResources.length; i++) {
							project2Factor8 += parseInt(project2.complexityRisk._humanResources[i]);
						}
						project2Factor8 = project2Factor8 / project2.complexityRisk._humanResources.length;
						*/

						let project2Factor1 = 0;
						for (let i = 0; i < project2.complexityRisk.section1.length; i++) {
							project2Factor1 += parseInt(project2.complexityRisk.section1[i]);
						}
						let project2Factor1Uniformed = project2Factor1 / project2.complexityRisk.section1.length;

						let project2Factor2 = 0;
						for (let i = 0; i < project2.complexityRisk.section2.length; i++) {
							project2Factor2 += parseInt(project2.complexityRisk.section2[i]);
						}
						let project2Factor2Uniformed = project2Factor2 / project2.complexityRisk.section2.length;

						let project2Factor3 = 0;
						for (let i = 0; i < project2.complexityRisk.section3.length; i++) {
							project2Factor3 += parseInt(project2.complexityRisk.section3[i]);
						}
						let project2Factor3Uniformed = project2Factor3 / project2.complexityRisk.section3.length;

						let project2Factor4 = 0;
						for (let i = 0; i < project2.complexityRisk.section4.length; i++) {
							project2Factor4 += parseInt(project2.complexityRisk.section4[i]);
						}
						let project2Factor4Uniformed = project2Factor4 / project2.complexityRisk.section4.length;

						let project2Factor5 = 0;
						for (let i = 0; i < project2.complexityRisk.section5.length; i++) {
							project2Factor5 += parseInt(project2.complexityRisk.section5[i]);
						}
						let project2Factor5Uniformed = project2Factor5 / project2.complexityRisk.section5.length;

						let project2Factor6 = 0;
						for (let i = 0; i < project2.complexityRisk.section6.length; i++) {
							project2Factor6 += parseInt(project2.complexityRisk.section6[i]);
						}
						let project2Factor6Uniformed = project2Factor6 / project2.complexityRisk.section6.length;

						let project2Factor7 = 0;
						for (let i = 0; i < project2.complexityRisk.section7.length; i++) {
							project2Factor7 += parseInt(project2.complexityRisk.section7[i]);
						}
						let project2Factor7Uniformed = project2Factor7 / project2.complexityRisk.section7.length;

						project2Uncertainty = project2Factor1 + project2Factor2 + project2Factor3
						+ project2Factor4 + project2Factor5 + project2Factor6 + project2Factor7;

						//let project2CostPhase1 = -(parseInt(project2.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase1));
						let project2CostPhase1 = parseInt(project2.costRelease.fteNumberCostPhase1) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase1);
						let project2ReleasePhase1 = 0;
						let project2ErrorPhase1 = null;

						for (let i = 1; i <= project2QuaterNumberPhase1; i++) {
							project2CostData.push(project2CostPhase1);
							project2ReleaseData.push(project2ReleasePhase1);
							project2Error.push(project2ErrorPhase1);
						}

						let project2DifferenceP1P2 = parseInt((project2StartDatePhase2.getTime()
							- (project2StartDatePhase1.getTime() + project2QuaterNumberPhase1 * (1000 * 60 * 60 * 24 * 30 * 3)))
							/ (1000 * 60 * 60 * 24 * 30 * 3));

						for (let i = 0; i < project2DifferenceP1P2; i++) {
							project2CostData.push(0);
							project2ReleaseData.push(0);
							project2Error.push(null);
						}

						//let project2CostPhase2 = -(parseInt(project2.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase2));
						let project2CostPhase2 = parseInt(project2.costRelease.fteNumberCostPhase2) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase2);
						let project2ReleasePhase2 = parseInt(project2.costRelease.fteNumberReleasePhase2) * 100000 + parseInt(project2.costRelease.operatingMoneyReleasePhase2);
						let project2ErrorPhase2 = project2Uncertainty / 170 * project2ReleasePhase2;

						for (let i = 1; i <= project2QuaterNumberPhase2; i++) {
							project2CostData.push(project2CostPhase2);
							project2ReleaseData.push(project2ReleasePhase2);
							project2Error.push(project2ErrorPhase2);
						}

						let project2DifferenceP2P3 = parseInt((project2StartDatePhase3.getTime()
							- (project2StartDatePhase2.getTime() + project2QuaterNumberPhase2 * (1000 * 60 * 60 * 24 * 30 * 3)))
							/ (1000 * 60 * 60 * 24 * 30 * 3));

						for (let i = 0; i < project2DifferenceP2P3; i++) {
							project2CostData.push(0);
							project2ReleaseData.push(0);
							project2Error.push(null);
						}

						//let project2CostPhase3 = -(parseInt(project2.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase3));
						let project2CostPhase3 = parseInt(project2.costRelease.fteNumberCostPhase3) * 100000 + parseInt(project2.costRelease.operatingMoneyCostPhase3);
						let project2ReleasePhase3 = parseInt(project2.costRelease.fteNumberReleasePhase3) * 100000 + parseInt(project2.costRelease.operatingMoneyReleasePhase3);
						let project2ErrorPhase3 = project2Uncertainty / 170 * project2ReleasePhase3;

						for (let i = 1; i <= project2QuaterNumberPhase3; i++) {
							project2CostData.push(project2CostPhase3);
							project2ReleaseData.push(project2ReleasePhase3);
							project2Error.push(project2ErrorPhase3);
						}

						project2TotalQuaterNumber = project2QuaterNumberPhase1 + project2DifferenceP1P2 + project2QuaterNumberPhase2 + project2DifferenceP2P3 + project2QuaterNumberPhase3;

						// generate data for cost and release graph
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

						project2TotalCost = project2CostData.reduce(function(acc, val) { return acc + val; });
						project2TotalRelease = project2ReleaseData.reduce(function(acc, val) { return acc + val; });
						project2TotalError = project2Error.reduce(function(acc, val) { return acc + val; });
						
						// generate data for complexity and risk graph
						/*
						project2Factors = {
							data: [
							project2Factor1,
							project2Factor2,
							project2Factor3,
							project2Factor4,
							project2Factor5,
							project2Factor6,
							project2Factor7,
							project2Factor8,
							project2Factor9
							],
							backgroundColor: [
							"rgba(244, 96, 108, 0.6)",
							"rgba(236, 173, 158, 0.6)",
							"rgba(230, 206, 172, 0.6)",
							"rgba(209, 186, 116, 0.6)",
							"rgba(214, 213, 183, 0.6)",
							"rgba(190, 237, 199, 0.6)",
							"rgba(190, 231, 233, 0.6)",
							"rgba(160, 238, 225, 0.6)",
							"rgba(140, 199, 181, 0.6)",
							]
						};
						*/
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

					if (($("#selectProject1").val() != "-1") && ($("#selectProject2").val() != "-1")) {
						let project1StartDate = new Date(project1.costRelease.startDatePhase1);
						let project2StartDate = new Date(project2.costRelease.startDatePhase1);

						let project1StartTime = project1StartDate.getTime();
						let project2StartTime = project2StartDate.getTime();

						if (project1StartTime >= project2StartTime) {
							let difference = parseInt((project1StartTime - project2StartTime) / (1000 * 60 * 60 * 24 * 30 * 3));
							project1TotalQuaterNumber += difference;
							for (let i = 0; i < difference; i++) {
								project1CostData.unshift(0);
								project1ReleaseData.unshift(0);
								project1Error.unshift(null);
							}
						} else {
							let difference = parseInt((project2StartTime - project1StartTime) / (1000 * 60 * 60 * 24 * 30 * 3));
							project2TotalQuaterNumber += difference;
							for (let i = 0; i < difference; i++) {
								project2CostData.unshift(0);
								project2ReleaseData.unshift(0);
								project2Error.unshift(null);
							}
						}

					}

					// use the larger quater number of the two projects to make full data being displayed
					projectTotalQuaterNumber = project1TotalQuaterNumber >= project2TotalQuaterNumber ? project1TotalQuaterNumber : project2TotalQuaterNumber;

					// give title and labels to cost and release graph
					costReleaseChart.options.title.text = "Cost & Released Benefit";

					let projectQuaters = [];
					for (let i = 1; i <=  projectTotalQuaterNumber; i++) {
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

						$("#totalCostProject1").text(project1TotalCost.toLocaleString());
						$("#totalReleaseProject1").text(project1TotalRelease.toLocaleString());
						$("#maximumNetReleaseProject1").text((project1TotalRelease - project1TotalCost).toLocaleString());
						$("#minimumNetReleaseProject1").text(parseInt(project1TotalRelease - project1TotalCost - project1TotalError).toLocaleString());
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

						$("#totalCostProject2").text(project2TotalCost.toLocaleString());
						$("#totalReleaseProject2").text(project2TotalRelease.toLocaleString());
						$("#maximumNetReleaseProject2").text((project2TotalRelease - project2TotalCost).toLocaleString());
						$("#minimumNetReleaseProject2").text(parseInt(project2TotalRelease - project2TotalCost - project2TotalError).toLocaleString());
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

		}

	};

}();
