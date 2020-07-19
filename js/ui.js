class UI {
	constructor() {
		this.worldSection = document.getElementById('world-cases');
		this.phSection = document.getElementById('ph-cases');
		this.tbody = document.getElementById('tbody-cases');
		this.today = document.getElementById('today');
		this.countLayer1Finished = false;
		this.countLayer2Finished = false;
	}

	showHiddenItems() {
		document.getElementById('globalCharts').classList.remove('invisible')
		document.getElementById('phCharts').classList.remove('d-none')
		document.getElementById('table-cases').classList.remove('d-none')
	}

	countLayer1() {
		if (!this.countLayer1Finished) {
			$('.countUp1').each(function () {
				var el = $(this);
				var endVal = parseInt(el.text());

				el.countup(endVal);
			});

			this.countLayer1Finished = true
		}
	}

	countLayer2() {
		if (!this.countLayer2Finished) {
			$('.countUp2').each(function () {
				var el = $(this);
				var endVal = parseInt(el.text());

				el.countup(endVal);
			});

			this.countLayer2Finished = true
		}
	}

	// DISPLAY GLOBAL CASES
	async displayGlobalCases(globalObj) {
		const promise = new Promise((resolve, reject) => {
			const output = `
				<div class="container">
					<div class="title-container d-flex justify-content-center align-items-center mb-3">
						<h2 class="mr-2">World</h2>
						<img id="world-icon" src="./img/world_icon.png" alt="">
					</div>
				</div>
				<div class="container">
					<div class="row mb-3">
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Cases</h4>
								</div>
								<div class="card-body d-flex flex-column justify-content-center align-items-center">
									<i class="fas fa-users text-danger case-icon"></i>
									<span class="case-num countUp">${globalObj.cases}</span>
								</div>
								<div class="card-footer">
									<p class="text-center m-0">
										New cases: +<span class="countUp">${globalObj.todayCases}</span>
									</p>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Deaths</h4>
								</div>
								<div class="card-body d-flex flex-column justify-content-center align-items-center">
									<i class="fas fa-user-minus text-dark case-icon"></i>
									<span class="case-num countUp">${globalObj.deaths}</span>
								</div>
								<div class="card-footer">
									<p class="text-center m-0">
										New deaths: +<span class="countUp">${globalObj.todayDeaths}</span>
									</p>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Recovered</h4>
								</div>
								<div class="card-body d-flex flex-column justify-content-center align-items-center">
									<i class="fas fa-user-plus text-success case-icon"></i>
									<span class="case-num countUp">${globalObj.recovered}</span>
								</div>
								<div class="card-footer">
									<p class="text-center m-0">
										New recovered: +<span class="countUp">${globalObj.todayRecovered}</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Active</h4>
								</div>
								<div class="card-body d-flex flex-column align-items-center">
									<i class="fas fa-user text-info case-icon"></i>
									<span class="case-num countUp">${globalObj.active}</span>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Critical</h4>
								</div>
								<div class="card-body d-flex flex-column align-items-center">
									<i class="fas fa-user-times text-warning case-icon"></i>
									<span class="case-num countUp">${globalObj.critical}</span>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Tests</h4>
								</div>
								<div class="card-body d-flex flex-column align-items-center">
									<i class="fas fa-user-check text-primary case-icon"></i>
									<span class="case-num countUp">${globalObj.tests}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;

			this.worldSection.innerHTML = output;

			resolve('globalCasesSuccess');
		});

		const res = await promise;
		return res;
	}

	// DISPLAY GLOBAL CHART
	async displayGlobalChart(globalObj) {
		const labels = Object.keys(globalObj.cases);
		const cases = Object.values(globalObj.cases);
		const deaths = Object.values(globalObj.deaths);
		const recovered = Object.values(globalObj.recovered);

		const promise = new Promise((resolve, reject) => {

			// CASES WORLD CHART
			var ctxCases = document.getElementById('global-cases-chart').getContext('2d');

			var globalCasesChart = new Chart(ctxCases, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [{
						label: 'Cases',
						data: cases,
						backgroundColor: 'red',
						borderColor: 'red',
						borderWidth: 3,
						fill: false,
						pointBorderWidth: 1,
						pointHitRadius: 3,
						pointRadius: 0,
						pointHoverBorderWidth: 1,
						pointHoverRadius: 4,
						pointHoverBackgroundColor: 'red'
					}]
				},
				options: {
					title: {
						fontSize: 25
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
								// FORMAT NUMBER
								callback: function (value) {
									return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								}
							}
						}]
					}
				}
			});

			/// DEATHS WORLD CHART
			var ctxDeaths = document.getElementById('global-deaths-chart').getContext('2d');

			var globalDeathsChart = new Chart(ctxDeaths, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [{
						label: 'Deaths',
						data: deaths,
						backgroundColor: 'black',
						borderColor: 'black',
						borderWidth: 3,
						fill: false,
						pointBorderWidth: 1,
						pointHitRadius: 3,
						pointRadius: 0,
						pointHoverBorderWidth: 1,
						pointHoverRadius: 4,
						pointHoverBackgroundColor: 'black'
					}]
				},
				options: {
					title: {
						fontSize: 25
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
								// FORMAT NUMBER
								callback: function (value) {
									return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								}
							}
						}]
					}
				}
			});

			/// RECOVERED WORLD CHART
			var ctxRecovered = document.getElementById('global-recovered-chart').getContext('2d');

			var globalRecoveredChart = new Chart(ctxRecovered, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [{
						label: 'Recovered',
						data: recovered,
						backgroundColor: 'green',
						borderColor: 'green',
						borderWidth: 3,
						fill: false,
						pointBorderWidth: 1,
						pointHitRadius: 3,
						pointRadius: 0,
						pointHoverBorderWidth: 1,
						pointHoverRadius: 4,
						pointHoverBackgroundColor: 'green'
					}]
				},
				options: {
					title: {
						fontSize: 25
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
								// FORMAT NUMBER
								callback: function (value) {
									return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								}
							}
						}]
					}
				}
			});

			resolve('globalChartSuccess');
		});


		const res = await promise;
		return res;
	}

	// DISPLAY PH CASES
	async displayPHCases(phObj) {
		const promise = new Promise((resolve, reject) => {
			const output = `
				<div class="container mb-3">
					<div class="title-container d-flex justify-content-center align-items-center">
						<h2 class="mr-2">Philippines</h2>
						<img id="world-icon" src="./img/philippines-flag-small.png" alt="">
					</div>
				</div>
				<div class="container">
					<div class="row mb-3">
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Cases</h4>
								</div>
								<div class="card-body d-flex flex-column justify-content-center align-items-center">
									<i class="fas fa-users text-danger case-icon"></i>
									<span class="case-num countUp1">${phObj.cases}</span>
								</div>
								<div class="card-footer">
									<p class="text-center m-0">
										New cases: +<span class="countUp1">${phObj.todayCases}</span>
									</p>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Deaths</h4>
								</div>
								<div class="card-body d-flex flex-column justify-content-center align-items-center">
									<i class="fas fa-user-minus text-dark case-icon"></i>
									<span class="case-num countUp1">${phObj.deaths}</span>
								</div>
								<div class="card-footer">
									<p class="text-center m-0">
										New deaths: +<span class="countUp1">${phObj.todayDeaths}</span>
									</p>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Recovered</h4>
								</div>
								<div class="card-body d-flex flex-column justify-content-center align-items-center">
									<i class="fas fa-user-plus text-success case-icon"></i>
									<span class="case-num countUp1">${phObj.recovered}</span>
								</div>
								<div class="card-footer">
									<p class="text-center m-0">
										New recovered: +<span class="countUp1">${phObj.todayRecovered}</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Active</h4>
								</div>
								<div class="card-body d-flex flex-column align-items-center">
									<i class="fas fa-user text-info case-icon"></i>
									<span class="case-num countUp2">${phObj.active}</span>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Critical</h4>
								</div>
								<div class="card-body d-flex flex-column align-items-center">
									<i class="fas fa-user-times text-warning case-icon"></i>
									<span class="case-num countUp2">${phObj.critical}</span>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title text-center m-0">Tests</h4>
								</div>
								<div class="card-body d-flex flex-column align-items-center">
									<i class="fas fa-user-check text-primary case-icon"></i>
									<span class="case-num countUp2">${phObj.tests}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;

			this.phSection.innerHTML = output;

			resolve('phCasesSuccess');
		});

		const res = await promise;
		return res;
	}

	async displayPhChart(countriesArr) {
		const promise = new Promise((resolve, reject) => {

			countriesArr.forEach((countryObj) => {
				if (countryObj.country === 'Philippines') {
					const labels = Object.keys(countryObj.timeline.cases);
					const cases = Object.values(countryObj.timeline.cases);
					const deaths = Object.values(countryObj.timeline.deaths);
					const recovered = Object.values(countryObj.timeline.recovered);

					// CASES WORLD CHART
					var ctxPhChart = document.getElementById('ph-cases-chart').getContext('2d');

					var phCasesChart = new Chart(ctxPhChart, {
						type: 'line',
						data: {
							labels: labels,
							datasets: [{
								label: 'Cases',
								data: cases,
								backgroundColor: 'red',
								borderColor: 'red',
								borderWidth: 3,
								fill: false,
								pointBorderWidth: 1,
								pointHitRadius: 3,
								pointRadius: 0,
								pointHoverBorderWidth: 1,
								pointHoverRadius: 4,
								pointHoverBackgroundColor: 'red'
							}]
						},
						options: {
							title: {
								fontSize: 25
							},
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true,
										// FORMAT NUMBER
										callback: function (value) {
											return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
										}
									}
								}]
							}
						}
					});

					/// DEATHS WORLD CHART
					var ctxDeaths = document.getElementById('ph-deaths-chart').getContext('2d');

					var phDeathsChart = new Chart(ctxDeaths, {
						type: 'line',
						data: {
							labels: labels,
							datasets: [{
								label: 'Deaths',
								data: deaths,
								backgroundColor: 'black',
								borderColor: 'black',
								borderWidth: 3,
								fill: false,
								pointBorderWidth: 1,
								pointHitRadius: 3,
								pointRadius: 0,
								pointHoverBorderWidth: 1,
								pointHoverRadius: 4,
								pointHoverBackgroundColor: 'black'
							}]
						},
						options: {
							title: {
								fontSize: 25
							},
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true,
										// FORMAT NUMBER
										callback: function (value) {
											return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
										}
									}
								}]
							}
						}
					});

					/// RECOVERED WORLD CHART
					var ctxRecovered = document.getElementById('ph-recovered-chart').getContext('2d');

					var phRecoveredChart = new Chart(ctxRecovered, {
						type: 'line',
						data: {
							labels: labels,
							datasets: [{
								label: 'Recovered',
								data: recovered,
								backgroundColor: 'green',
								borderColor: 'green',
								borderWidth: 3,
								fill: false,
								pointBorderWidth: 1,
								pointHitRadius: 3,
								pointRadius: 0,
								pointHoverBorderWidth: 1,
								pointHoverRadius: 4,
								pointHoverBackgroundColor: 'green'
							}]
						},
						options: {
							title: {
								fontSize: 25
							},
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true,
										// FORMAT NUMBER
										callback: function (value) {
											return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
										}
									}
								}]
							}
						}
					});

					resolve('phChartSuccess');
				}
			});
		});


		const res = await promise;
		return res;
	}

	async displayTable(globalObj, countryArr) {

		const tr = document.createElement('tr');
		tr.className = ` table-active`;
		tr.innerHTML = `
			<th scope='row'></th>
			<td class="world-column">
				<div class="font-weight-bold">
					Earth
				</div>
				<div>
					<img id="world" src="./img/world_icon.png">
				</div>
			</td >
			<td>${this.checkValue(globalObj.cases)}</td>
			<td class="new-cases">${this.checkTodayValue(globalObj.todayCases)}</td>
			<td>${this.checkValue(globalObj.deaths)}</td>
			<td class="new-deaths">${this.checkTodayValue(globalObj.todayDeaths)}</td>
			<td>${this.checkValue(globalObj.recovered)}</td>
			<td class="new-recovered">${this.checkTodayValue(globalObj.todayRecovered)}</td>
			<td class="active">${this.checkValue(globalObj.active)}</td>
			<td class="critical">${this.checkValue(globalObj.critical)}</td>
			<td class="tests">${this.checkValue(globalObj.tests)}</td>
			<td>${this.checkValue(globalObj.casesPerOneMillion)}</td>
			<td>${this.checkValue(globalObj.deathsPerOneMillion)}</td>
			<td>${this.checkValue(globalObj.recoveredPerOneMillion)}</td>
			<td>${this.checkValue(globalObj.activePerOneMillion)}</td>
			<td>${this.checkValue(globalObj.criticalPerOneMillion)}</td>
		    <td>${this.checkValue(globalObj.testsPerOneMillion)}</td>
			<td>${this.checkValue(globalObj.population)}</td>
		`;
		this.tbody.appendChild(tr);

		const promise = new Promise((resolve, reject) => {
			countryArr.forEach((countryObj, index) => {
				const tr = document.createElement('tr');
				tr.className = `${this.checkContinent(countryObj.continent)}`;
				tr.innerHTML = `
					<th scope='row'>${++index}</th>
					<td class="country-column">
						<div>
							${countryObj.country}
						</div>
						<div>
							<img class="flag" src="${countryObj.countryInfo.flag}">
						</div>
					</td >
					<td>${this.checkValue(countryObj.cases)}</td>
					<td class="new-cases">${this.checkTodayValue(countryObj.todayCases)}</td>
					<td>${this.checkValue(countryObj.deaths)}</td>
					<td class="new-deaths">${this.checkTodayValue(countryObj.todayDeaths)}</td>
					<td>${this.checkValue(countryObj.recovered)}</td>
					<td class="new-recovered">${this.checkTodayValue(countryObj.todayRecovered)}</td>
					<td class="active">${this.checkValue(countryObj.active)}</td>
					<td class="critical">${this.checkValue(countryObj.critical)}</td>
					<td class="tests">${this.checkValue(countryObj.tests)}</td>
					<td>${this.checkValue(countryObj.casesPerOneMillion)}</td>
					<td>${this.checkValue(countryObj.deathsPerOneMillion)}</td>
					<td>${this.checkValue(countryObj.recoveredPerOneMillion)}</td>
					<td>${this.checkValue(countryObj.activePerOneMillion)}</td>
					<td>${this.checkValue(countryObj.criticalPerOneMillion)}</td>
					<td>${this.checkValue(countryObj.testsPerOneMillion)}</td>
					<td>${this.checkValue(countryObj.population)}</td>
				`;

				this.tbody.appendChild(tr);
			});
			resolve('success');
		});


		const res = await promise;
		return res;
	}

	animateNums() {
		setTimeout(() => {
			$('.countUp').each(function () {
				var el = $(this);
				var endVal = parseInt(el.text());

				el.countup(endVal);
			});
		}, 10)
	}

	filterByCont(target) {
		const tbody = document.getElementById('tbody-cases');
		const trs = tbody.querySelectorAll('tr');

		// REMOVE CURRENT BUTTON CONTINENT CLASS
		this.removeCurrentClass();

		// DISPLAY ALL ROWS
		trs.forEach((tr) => {
			tr.style.display = 'table-row';
		});

		// DISPLAY ASIA COUNTRY ROWS
		if (target.innerText === 'Asia') {
			trs.forEach((tr) => {

				tr.style.display = 'table-row';

				if (tr.classList.contains('Asia')) {
					tr.style.display = 'table-row';
				} else {
					tr.style.display = 'none';
				}
			});
		}

		// DISPLAY EUROPE COUNTRY ROWS
		if (target.innerText === 'Europe') {
			trs.forEach((tr) => {
				tr.style.display = 'table-row';
				if (tr.classList.contains('Europe')) {
					tr.style.display = 'table-row';
				} else {
					tr.style.display = 'none';
				}
			});
		}

		// DISPLAY NORTH AMERICA COUNTRY ROWS
		if (target.innerText === 'North America') {
			trs.forEach((tr) => {
				tr.style.display = 'table-row';
				if (tr.classList.contains('North')) {
					tr.style.display = 'table-row';
				} else {
					tr.style.display = 'none';
				}
			});
		}

		// DISPLAY SOUTH AMERICA COUNTRY ROWS
		if (target.innerText === 'South America') {
			trs.forEach((tr) => {
				tr.style.display = 'table-row';
				if (tr.classList.contains('South')) {
					tr.style.display = 'table-row';
				} else {
					tr.style.display = 'none';
				}
			});
		}

		// DISPLAY AFRICA COUNTRY ROWS
		if (target.innerText === 'Africa') {
			trs.forEach((tr) => {
				tr.style.display = 'table-row';
				if (tr.classList.contains('Africa')) {
					tr.style.display = 'table-row';
				} else {
					tr.style.display = 'none';
				}
			});
		}

		// DISPLAY AUSTRALIA/OCENIA COUNTRY ROWS
		if (target.innerText === 'Oceania') {
			trs.forEach((tr) => {
				tr.style.display = 'table-row';
				if (tr.classList.contains('Oceania')) {
					tr.style.display = 'table-row';
				} else {
					tr.style.display = 'none';
				}
			});
		}

		// DISPLAY CRUISE SHIP ROWS
		if (target.innerText === 'Cruise Ship') {
			trs.forEach((tr) => {
				tr.style.display = 'table-row';
				if (tr.classList.contains('ship')) {
					tr.style.display = 'table-row';
				} else {
					tr.style.display = 'none';
				}
			});
		}

		// MAKE IT AS NEW CURRENT BUTTON
		target.classList.add('current');
	}

	stripeTable(target) {
		if (target !== undefined) {
			const className = target.innerText.split(' ')[0];
			const visibleRows = document.querySelectorAll(`#tbody-cases .${className}`);

			if (target.innerText !== 'All') {
				visibleRows.forEach((visibleRow, index) => {
					visibleRow.style.background = 'transparent';
					if (index % 2 === 0) {
						visibleRow.style.background = 'rgba(0, 0, 0, 0.05)';
					}
				});
			} else {
				const visibleRows = document.querySelectorAll(`#tbody-cases tr`);

				visibleRows.forEach((visibleRow, index) => {
					visibleRow.style.background = 'transparent';
					if (index % 2 === 0) {
						visibleRow.style.background = 'rgba(0, 0, 0, 0.05)';
					}
				});
			}

		} else {
			const visibleRows = document.querySelectorAll(`#tbody-cases tr`);

			visibleRows.forEach((visibleRow, index) => {
				visibleRow.style.background = 'transparent';
				if (index % 2 === 0) {
					visibleRow.style.background = 'rgba(0, 0, 0, 0.05)';
				}
			});
		}
	}

	checkContinent(continent) {
		if (continent === '') {
			return 'ship';
		} else {
			if (continent === 'Australia/Oceania') {
				return 'Oceania';
			} else {
				return continent;
			}
		}
	}

	checkValue(data) {
		if (data !== null) {
			return this.formatNumber(data);
		} else {
			return '';
		}
	}

	checkTodayValue(todayData) {
		if (todayData !== null) {
			// GET DATA'S PARENT ELEMENT
			return `+${this.formatNumber(todayData)}`;
		} else {
			return '';
		}
	}

	formatNumber(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	paintDanger() {
		const newCases = document.querySelectorAll('.new-cases');
		newCases.forEach((newCase) => {
			if (newCase.textContent !== '') {
				newCase.classList.add('bg-danger', 'text-white')
			}
		});
	}

	paintDark() {
		const newDeaths = document.querySelectorAll('.new-deaths');
		newDeaths.forEach((newdeath) => {
			if (newdeath.textContent !== '') {
				newdeath.classList.add('bg-dark', 'text-white')
			}
		});
	}

	paintSuccess() {
		const newRecovers = document.querySelectorAll('.new-recovered');
		newRecovers.forEach((newRecover) => {
			if (newRecover.textContent !== '') {
				newRecover.classList.add('bg-success', 'text-white')
			}
		});
	}

	paintWarning() {
		const criticals = document.querySelectorAll('.critical');
		criticals.forEach((critical) => {
			if (critical.textContent !== '') {
				critical.classList.add('bg-warning', 'text-white')
			}
		});
	}

	paintInfo() {
		const actives = document.querySelectorAll('.active');
		actives.forEach((active) => {
			if (active.textContent !== '') {
				active.classList.add('bg-info', 'text-white')
			}
		});
	}

	paintPrimary() {
		const actives = document.querySelectorAll('.tests');
		actives.forEach((active) => {
			if (active.textContent !== '') {
				active.classList.add('bg-primary', 'text-white')
			}
		});
	}

	removeCurrentClass() {
		const currentBtn = document.querySelector('.current');

		currentBtn.classList.remove('current');
	}

	displayTime() {
		let currentDate = new Date();
		let currentTime = new Date();
		let hh = String(currentTime.getHours());
		let mm = String(currentTime.getMinutes()).padStart(2, '0');
		let ss = String(currentTime.getSeconds()).padStart(2, '0');
		let noon = '',
			today = '',
			time = '';
		const month = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		const day = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];
		let current_month = month[currentDate.getMonth()];
		const current_date = currentDate.getDate();
		const current_day = day[currentDate.getDay()];
		const current_year = currentDate.getFullYear();

		// AM    24 - 11
		if ((hh >= 0 && hh <= 11) || hh === 24) {
			noon = 'AM';
		}
		// PM    12 - 23
		if (hh >= 12 && hh <= 23) {
			noon = 'PM';
		}
		// convert to standard time
		if (hh > 12) {
			// hh -= 12;
		}
		if (hh == 0) {
			hh = 12;
		}

		time = `${hh} : ${mm} : ${ss} ${noon}`;
		today = `${current_month} ${current_date}(${current_day}), ${current_year}`;

		this.today.innerHTML = `${today} | ${time}`;
	}

	displayCurrentYear() {
		const year = new Date().getFullYear();
		document.getElementById('year').textContent = year;
	}
}
