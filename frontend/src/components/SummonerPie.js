import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, } from 'recharts';


const COLORS = ['#223f25', '#522424',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text style={{textShadow:'1px 1px 2px black', fontSize: '1.5em'}} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${value}`}
    </text>
  );
};

export default class SummonerPie extends PureComponent {

  constructor(props)
  {
    super(props);
    this.state={
      losses: props.losses,
      wins: props.wins,
    };
  }
  
  render() {
    const data = [
      { name: 'WIN', value: this.state.wins},
      { name: 'LOOSE', value: this.state.losses}
      
    ];

    

    return (
      <div className="chart">
        <h5 style={{textAlign: 'center'}}> {this.state.wins + this.state.losses} Games</h5>
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          innerRadius={30}
          outerRadius={40}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}

        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      </div>
    );
  }
}
