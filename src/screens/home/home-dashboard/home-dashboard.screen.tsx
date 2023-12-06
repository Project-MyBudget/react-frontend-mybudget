import { useState, useEffect } from 'react';
import HoursUtils from '../../../util/hours.util';
import Header from '../../../components/header/header.component';
import Menu from '../../../components/menu/menu.component';
import UserChartService from '../../../services/user-chart.service';
import { Chart } from "react-google-charts";
import './home-dashboard.style.css';
import VLibras from '@moreiraste/react-vlibras'
import GoalsResponseModel from '../../../models/GoalsResponse.model';
import GoalsService from '../../../services/goals.service';

function App() {

    const userInfo: any = localStorage.getItem('info');

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
            const userId: number = JSON.parse(userInfo).id;
            const userChartService = new UserChartService();
            userChartService.getUserHistoric(userId).then(res => {
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
                {
                    chartPreviousDebts.length > 1 ?
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="100%"
                            data={chartPreviousDebts}
                            options={options}
                        />
                        : <>
                            <h1 className='user-chart-info'>
                                Você não tem histórico de gastos nesse site, cadastre <a href="/user/financial-control">Clicando aqui.</a>
                            </h1>
                        </>
                }

            </section>
        );
    };


    const PiesCharts = () => {
        const [userChart, setUserChart] = useState([]);
        const [suggestionChart, setSuggestionChart] = useState([]);
        const [hasDebts, setHasDebts] = useState<boolean>(false);

        useEffect(() => {
            const userId: number = JSON.parse(userInfo).id;
            const userChartService = new UserChartService();
            userChartService.getUserCharts(userId).then(res => {
                const newSuggestionChart = [["Legendas", "Gastos"]];
                const newUserChart = [["Legendas", "Gastos"]];

                // Recommended charts
                newSuggestionChart.push([
                    "Gastos essenciais",
                    res.chartRecommendedDebts.essentialsDebts
                ], [
                    "Gastos não essenciais",
                    res.chartRecommendedDebts.notEssentialsDebts
                ], [
                    "Para economizar",
                    res.chartRecommendedDebts.spendingLimitEconomy
                ], [
                    "Cuidados com você",
                    res.chartRecommendedDebts.spendingLimitLeisure
                ]);

                // User chart
                newUserChart.push([
                    "Gastos essenciais",
                    res.chartUserDebts.essentialsDebts
                ], [
                    "Gastos não essenciais",
                    res.chartUserDebts.notEssentialsDebts
                ], [
                    "Para economizar",
                    res.chartUserDebts.spendingLimitEconomy
                ], [
                    "Cuidados com você",
                    res.chartUserDebts.spendingLimitLeisure
                ]);

                setHasDebts(
                    res.chartUserDebts.essentialsDebts > 0 ||
                    res.chartUserDebts.notEssentialsDebts > 0 ||
                    res.chartUserDebts.spendingLimitEconomy > 0 ||
                    res.chartUserDebts.spendingLimitLeisure > 0
                );

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
                    {hasDebts ?
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            data={userChart}
                            options={options}
                        />
                        : <>
                            <h1 className='user-chart-info'>
                                Você não cadastrou informações suficientes para calcularmos seus gastos, acesse nosso paineis de controle financeiro e calcule seus gastos
                                <a href="/initial/financial-control"> Clicando aqui.</a>
                            </h1>
                        </>}
                </section>
            </>
        );
    };

    const GoalsComponent = () => {
        const [goalMap, setGoalMap] = useState<GoalsResponseModel>({ goals: [] });

        useEffect(() => {
            const userId: number = JSON.parse(userInfo).id;
            const goalService = new GoalsService();
            const response = goalService.findGoalsByUser(userId);

            response.then((data) => {
                setGoalMap(data);
            });
        }, []);

        return (
            <section className='goals-box'>
                <span className='charts-title'>Suas metas:</span>
                {
                    goalMap?.goals?.map((data) => {
                        return (
                            <>
                                <div className='legend-topic'>
                                    <div className='legend-topic-ball'
                                        style={data.progress === 'FEITO' ? { backgroundColor: "#009e2f", color: "#009e2f" } : { backgroundColor: "#4472C4", color: "#4472C4" }}
                                    >......</div>
                                    {data.description} - {data.progress}
                                </div>
                            </>
                        );
                    })
                }
            </section>
        );
    }

    return (
        <>
            <Header />
            <div className='home-container'>
                <h2>{HoursUtils.getGreetingMessage(JSON.parse(userInfo)?.name) || ''}</h2>
                <div className='graph-box'>
                    <PiesCharts />
                    <PreviousDebtsChartComponent />
                </div>
                <VLibras forceOnload={true} />
                <div className='goals-and-legends-box'>
                    <section className='legends-box'>
                        <div className='legend-topic'>
                            <div className='legend-topic-ball' style={{ backgroundColor: "#ED7D31", color: "#ED7D31" }}></div>
                            Despesas essenciais : Aquelas que não podem ser cortadas, pois garantem a sobrevivência. Exemplos: aluguel, energia elétrica, alimentação e água.
                        </div>
                        <div className='legend-topic'>
                            <div className='legend-topic-ball' style={{ backgroundColor: "#4472C4", color: "#4472C4" }}></div>
                            Despesas não essenciais: Aquelas que são importantes para a sua qualidade de vida e da sua família. Exemplos: plano de saúde, mensalidade escolar, faculdade, academia, etc.
                        </div>
                        <div className='legend-topic'>
                            <div className='legend-topic-ball' style={{ backgroundColor: "#FFBB71", color: "#FFBB71" }}></div>
                            Para economizar: Pensando em alguma finalidade especifica ou emergencial. Exemplos: investimentos, viagem, aquisição de um carro ou perda do trabalho.
                        </div>
                        <div className='legend-topic'>
                            <div className='legend-topic-ball' style={{ backgroundColor: "#A5A5A5", color: "#A5A5A5" }}></div>
                            Cuidado com você: Pensando no seu bem-estar momentâneo. Exemplos: ida ao restaurante, shopping, salão de beleza, jogos, saída com amigos e familiares.
                        </div>
                    </section>
                    <GoalsComponent />
                </div>
            </div>
            <Menu />
        </>

    );

}

export default App;