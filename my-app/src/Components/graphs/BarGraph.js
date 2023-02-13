import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
function BarGraph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart margin={{
        top: 0,
      }} data={props.data}>
        <XAxis dataKey="Dates" />
        <YAxis dataKey={props.datakey} />
        <Tooltip />
        <Bar dataKey={props.datakey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarGraph
