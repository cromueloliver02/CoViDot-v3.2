// INIT UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
	// INIT API
	const api = new API();
	// INIT UI
	const ui = new UI();

	// FETCH API DATA
	api
		.getData()
		.then((res) => {
			// CHECK IF RESPONSE IS NOT NULL
			if (res.resGlobalJson !== null && res.resCountriesJson !== null) {
				// DISPLAY GLOBAL CASES
				ui.displayGlobalCases(res.resGlobalJson).then((res) => {
					if (res === 'globalCasesSuccess') {
						ui.showHiddenItems();
						ui.animateNums();
					}
				}).catch((err) => {
					console.log(`ERROR: ${err}`);
				});

				// DISPLAY GLOBAL CHART CASES
				ui.displayGlobalChart(res.resGlobalHistoJson).then((res) => {
					if (res === 'globalChartSuccess') {
						// console.log(res)
					}
				}).catch((err) => {
					console.log(err);
				});

				// DISPLAY PHILIPPINE CASES
				ui.displayPHCases(res.resPhJson).then((res) => {
					if (res === 'phCasesSuccess') {
						// console.log(res);
					}
				}).catch((err) => {
					console.log(err)
				});

				// DISPLAY PHILIPPINE CHART
				ui.displayPhChart(res.resCountriesHistoJson).then((res) => {
					if (res === 'phChartSuccess') {
						// console.log(res)
					}
				}).catch((err) => {
					console.log(err)
				});


				// DISPLAY ALL COUNTRIES WITH CASE DATAS
				ui.displayTable(res.resGlobalJson, res.resCountriesJson).then((res) => {
					if (res === 'success') {
						ui.stripeTable();
						ui.paintDanger();
						ui.paintDark();
						ui.paintSuccess();
						ui.paintWarning();
						ui.paintInfo();
						ui.paintPrimary();
					} else {
						console.log('API ERROR: Response failed...');
					}
				}).catch((err) => {
					console.log(err);
				});

				// ANIMATE PH DATAS ON SCROLL
				countLayer1 = $('.countUp1').offset().top;
				countLayer2 = $('.countUp2').offset().top;
				window.addEventListener('scroll', () => {
					if (window.pageYOffset > countLayer1 - $(window).height()) {
						ui.countLayer1();
					}

					if (window.pageYOffset > countLayer2 - $(window).height()) {
						ui.countLayer2();
					}
				})
			} else {
				console.log('Something went wrong with the api...');
			}
		})
		.catch((error) => {
			console.log(error);
		});

	// START DISPLAYING REAL TIME
	setInterval(() => {
		ui.displayTime();
	}, 1000);

	// DISPLAY CURRENT YEAR FOOTER
	ui.displayCurrentYear();
});

document.querySelectorAll('.continental-buttons .nav-link').forEach((navLink) => {
	navLink.addEventListener('click', (e) => {
		ui.filterByCont(e.target);
		ui.stripeTable(e.target);
	});
});

