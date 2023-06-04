import { useQuery } from "@tanstack/react-query";
import QueryService from "../../services/query-service"
import LoadingScreen from "../../components/loader";
import AllCasesGlobal from "./allCasesChart";
import CovidCasesByCountryMap from "./casesPerCountry";

export default function ChartsAndMapMain() {

    // Query to fetch covid data from API
    const { getAllCovid19Cases, getCovid19CasesByCountry } = QueryService
    const allCovidDataResponse = useQuery({ queryKey: ['allCovidCasesGlobally'], queryFn: getAllCovid19Cases })
    const covidDataByCountryResponse = useQuery({ queryKey: ['covidCasesByCountry'], queryFn: getCovid19CasesByCountry })


    return <div>
        {allCovidDataResponse?.isLoading && <LoadingScreen centered />}
        {allCovidDataResponse?.isError && <h2>Something went wrong while fetching global cases data.</h2>}
        {allCovidDataResponse?.data && <div className="global-cases">
            <h2>Global Cases</h2>
            <AllCasesGlobal chartData={allCovidDataResponse.data?.cases} />
        </div>}

        {covidDataByCountryResponse?.isLoading && <LoadingScreen centered />}
        {covidDataByCountryResponse?.isError && <h2>Something went wrong while fetching global cases data.</h2>}
        {covidDataByCountryResponse?.data && <div className="global-cases">
            <h2>Countrywise Cases</h2>
            <CovidCasesByCountryMap casesData={covidDataByCountryResponse?.data} />
        </div>}
    </div>
}