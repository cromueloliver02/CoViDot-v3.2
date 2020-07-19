class API {
	async getData() {
		// FETCH GLOBAL
		// const resGlobal = await fetch(`https://disease.sh/v3/covid-19/all?yesterday=false&allowNull=true`);
		const resGlobal = await fetch(`https://disease.sh/v3/covid-19/all`);
		const resGlobalJson = await resGlobal.json();

		// FETCH COUNTRIES
		const resCountries = await fetch(
			`https://disease.sh/v3/covid-19/countries?yesterday=false&sort=cases&allowNull=true`
		);
		const resCountriesJson = await resCountries.json();

		// FETCH PHILIPPINE CASES
		const resPh = await fetch(`https://disease.sh/v3/covid-19/countries/Philippines?yesterday=false&strict=true&allowNull=true`);
		const resPhJson = await resPh.json();

		// FETCH HISTORICAL GLOBAL CASES
		const resGlobalHisto = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`);
		const resGlobalHistoJson = await resGlobalHisto.json();

		// FETCH COUNTRY HISTORICAL CASES
		const resCountriesHisto = await fetch(`https://disease.sh/v3/covid-19/historical?lastdays=all`);
		const resCountriesHistoJson = await resCountriesHisto.json();

		return {
			resGlobalJson,
			resCountriesJson,
			resGlobalHistoJson,
			resPhJson,
			resCountriesHistoJson
		};

	}

}