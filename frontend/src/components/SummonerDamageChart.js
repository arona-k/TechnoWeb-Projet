import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class SummonerDamageChart extends PureComponent {

    constructor(props)
    {
        super(props);
        this.state ={
            total: props.total ,
            tC: props.tC ,

            pTotal: props.pTotal ,
            ptC: props.ptC ,

            mTotal: props.mTotal ,
            mtC: props.mtC ,

            tTotal: props.tTotal ,
            ttC: props.ttC ,
        };
    }

    render() {
        const stateData = this.state;
        const data = [
            {
                name: 'Total Damage',
                total: stateData.total,
                toChampions: stateData.tC,
            },
            {
                name: 'Physical Damage',
                total: stateData.pTotal,
                toChampions: stateData.ptC,
            },
            {
                name: 'Magic Damage',
                total: stateData.mTotal,
                toChampions: stateData.mtC,
            },
            {
                name: 'True Damage',
                total: stateData.tTotal,
                toChampions: stateData.ttC,
            },
        ];

        return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            
            <Bar dataKey="toChampions" stackId="a" fill="#82ca9d" />
            <Bar dataKey="total" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        );
    }
}
