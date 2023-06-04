export const API_URLS = {
    ALL_COVID_19_CASES: "https://disease.sh/v3/covid-19/historical/all?lastdays=all",
    COVID_19_CASES_BY_COUNTRY: "https://disease.sh/v3/covid-19/countries"
}

const QueryService = {
    getAllCovid19Cases() {
        return fetch(API_URLS.ALL_COVID_19_CASES)
            .then((res) => res.json())
            .then(data => data)
            .catch(err => new Error("Caught error while getting all covid data."))
    },
    getCovid19CasesByCountry() {
        return fetch(API_URLS.COVID_19_CASES_BY_COUNTRY)
            .then((res) => res.json())
            .then(data => data)
            .catch(err => new Error("Caught error while getting covid cases by country data."))
    },
}

export default QueryService;
