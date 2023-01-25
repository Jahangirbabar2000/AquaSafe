import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function LineGraph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={0}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="Turbidity" />
        <Tooltip />
        <Line type="monotone" dataKey="Turbidity" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph
