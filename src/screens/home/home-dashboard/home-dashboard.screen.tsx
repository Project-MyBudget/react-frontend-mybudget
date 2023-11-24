import { useState, useEffect } from 'react';
import HoursUtils from '../../../util/hours.util';
import Header from '../../../components/header/header.component';
import Menu from '../../../components/menu/menu.component';
import UserChartService from '../../../services/user-chart.service';
import { Chart } from "react-google-charts";
import './home-dashboard.style.css';

function App() {

    // const [userInformation, setUserInformation] = useState({});


    // const chartDebts = [
    //     ["Legendas", "Gastos"],
    //     ["Gastos essenciais", 1000.9],
    //     ["Gastos não essenciais", 23450.00],
    //     ["Para economizar", 660],
    //     ["Cuidados com você", 1030],
    // ];


    const options = {
        chart: {
            title: "Suas despesas nos últimos meses:",
            subtitle: "Acompanhe seus gastos no seu último seis meses.",
        },
        colors: ['#ED7D31', '#4472C4', '#FFBB71', '#A5A5A5'],
        xAxis: { format: 'decimal' }
    };


    const PreviousDebtsChartComponent = (props: any) => {
        const [chartPreviousDebts, setChartPreviousDebts] = useState([["Mês", "Gastos"]]);

        useEffect(() => {
            const userChartService = new UserChartService();
            userChartService.getUserHistoric(1).then(res => {
                const newChart = [["Mês", "Gastos"]];
                res.forEach(item => {
                    const date = new Date();
                    date.setMonth(Number.parseInt(item.month) - 1);
                    newChart.push([
                        date.toLocaleString('default', { month: 'long' }),
                        item.totalValueExpenses.toString()
                    ]);
                });
                setChartPreviousDebts(newChart);
            });
        }, []);

        return (
            <section className='debts-per-months'>
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="100%"
                    data={chartPreviousDebts}
                    options={options}
                />
            </section>
        );
    };


    const PiesCharts = () => {
        const [userChart, setUserChart] = useState([]);
        const [suggestionChart, setSuggestionChart] = useState([]);

        useEffect(() => {
            const userChartService = new UserChartService();
            userChartService.getUserCharts(2).then(res => {
                const newSuggestionChart = [["Legendas", "Gastos"]];
                const newUserChart = [["Legendas", "Gastos"]];

                // Recommended charts
                newSuggestionChart.push([
                    "Gastos essenciais",
                    res.chartRecommendedDebts.essentialsDebts
                ]);

                newSuggestionChart.push([
                    "Gastos não essenciais",
                    res.chartRecommendedDebts.notEssentialsDebts
                ]);

                newSuggestionChart.push([
                    "Para economizar",
                    res.chartRecommendedDebts.spendingLimitEconomy
                ]);

                newSuggestionChart.push([
                    "Cuidados com você",
                    res.chartRecommendedDebts.spendingLimitLeisure
                ]);

                // User chart
                newUserChart.push([
                    "Gastos essenciais",
                    res.chartUserDebts.essentialsDebts
                ]);

                newUserChart.push([
                    "Gastos não essenciais",
                    res.chartUserDebts.notEssentialsDebts
                ]);

                newUserChart.push([
                    "Para economizar",
                    res.chartUserDebts.spendingLimitEconomy
                ]);

                newUserChart.push([
                    "Cuidados com você",
                    res.chartUserDebts.spendingLimitLeisure
                ]);

                setUserChart(newUserChart);
                setSuggestionChart(newSuggestionChart);
            });
        }, []);

        return (
            <>
                <section className='suggestion-debts'>
                    <span className='charts-title'>Nossa sugestão de despesas</span>
                    <Chart
                        width={'100%'}
                        height={'100%'}
                        chartType="PieChart"
                        data={suggestionChart}
                        options={options}
                    />
                </section>
                <section className='graph-debts'>
                    <span className='charts-title'>Suas despesas até o momento</span>
                    {userChart.length > 1 ? (
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            data={userChart}
                            options={options}
                        />
                    ) : (
                        <h1 style={{ color: "black" }}>Para incluir suas despesas, gerencie seus gastos</h1>
                    )}
                </section>
            </>
        );
    };

    return (
        <>
            <Header />
            <div className='home-container'>
                <h2>{HoursUtils.getGreetingMessage("Danilo")}</h2>
                <div className='graph-box'>
                    <PiesCharts />
                    <PreviousDebtsChartComponent />
                </div>

                <div className='goals-and-legends-box'>
                    <section className='legends-box'>
                        <div className='legend-topic'>
                            <span className='legend-topic-ball' style={{ backgroundColor: "#ED7D31", color: "#ED7D31" }}>......</span>
                            Despesas essenciais : Aquelas que não podem ser cortadas, pois garantem a sobrevivência. Exemplos: aluguel, energia elétrica, alimentação e água.
                        </div>
                        <div className='legend-topic'>
                            <span className='legend-topic-ball' style={{ backgroundColor: "#4472C4", color: "#4472C4" }}>......</span>
                            Despesas não essenciais: Aquelas que são importantes para a sua qualidade de vida e da sua família. Exemplos: plano de saúde, mensalidade escolar, faculdade, academia, etc.
                        </div>
                        <div className='legend-topic'>
                            <span className='legend-topic-ball' style={{ backgroundColor: "#FFBB71", color: "#FFBB71" }}>......</span>
                            Para economizar: Pensando em alguma finalidade especifica ou emergencial. Exemplos: investimentos, viagem, aquisição de um carro ou perda do trabalho.
                        </div>
                        <div className='legend-topic'>
                            <span className='legend-topic-ball' style={{ backgroundColor: "#A5A5A5", color: "#A5A5A5" }}>......</span>
                            Cuidado com você: Pensando no seu bem-estar momentâneo. Exemplos: ida ao restaurante, shopping, salão de beleza, jogos, saída com amigos e familiares.
                        </div>
                    </section>
                    <section className='goals-box'>
                        <span className='charts-title'>Suas metas:</span>
                        <div className='legend-topic'>
                            <span className='legend-topic-ball' style={{ backgroundColor: "#4472C4", color: "#4472C4" }}>......</span>
                            Economizar R$ 20.000,00
                        </div>
                    </section>
                </div>
            </div>
            <Menu selectedItem="home" />
        </>

    );

}

export default App;