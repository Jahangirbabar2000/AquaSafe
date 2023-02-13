import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function LineGraph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={props.data}
        margin={0}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Dates" />
        <YAxis dataKey={props.datakey} />
        <Tooltip />
        <Line type="monotone" dataKey={props.datakey} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph
