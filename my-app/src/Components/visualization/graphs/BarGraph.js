import React from 'react';
import { ReferenceLine, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
function BarGraph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart margin={{
        top: 0,
      }} data={props.data}>
        <XAxis dataKey="Dates" reversed={true} />
        <YAxis dataKey={props.datakey} />
        <Tooltip />
        <Bar dataKey={props.datakey} fill="#8884d8" />
        <ReferenceLine y={props.min} stroke="#de4545" strokeDasharray="3 3" />
        <ReferenceLine y={props.max} stroke="#de4545" strokeDasharray="3 3" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarGraph
