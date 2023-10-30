import { useState } from 'react';
import HoursUtils from '../../../util/hours.util';
import Header from '../../../components/header/header.component';
import Menu from '../../../components/menu/menu.component';
import { Chart } from "react-google-charts";
import './home-dashboard.style.css';

function App() {

    const [userInformation, setUserInformation] = useState({});

    const data = [
        ["Mês", "Gastos", "Orçamento do Mês"],
        ["Janeiro", 1000.9, 100000],
        ["Fevereiro", 23450.00, 100000],
        ["Março", 660, 100000],
        ["Abril", 1030, 100000],
    ];

    const options = {
        chart: {
            title: "Suas despesas nos últimos meses:",
            subtitle: "Acompanhe seus gastos no seu último seis meses.",
        },
        colors: ['#ED7D31', '#4472C4', '#FFBB71', '#A5A5A5'],
        xAxis: {format: 'decimal'}
    };

    return (
        <>
            <Header />
            <div className='home-container'>
                <h2>{HoursUtils.getGreetingMessage("Danilo")}</h2>
                <div className='graph-box'>
                    <section className='suggestion-debts'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            data={data}
                            options={options}
                        />
                    </section>
                    <section className='graph-debts'>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            data={data}
                            options={options}
                        />
                    </section>
                    <section className='debts-per-months'>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="100%"
                            data={data}
                            options={options}
                        />
                    </section>
                </div>

                <div className='goals-and-legends-box'>
                    <section className='legends-box'>

                    </section>
                    <section className='goals-box'>

                    </section>
                </div>
            </div>
            <Menu selectedItem="home" />
        </>

    );

}

export default App;