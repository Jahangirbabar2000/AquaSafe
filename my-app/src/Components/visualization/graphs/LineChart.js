import React from 'react';
import { ReferenceLine, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
function LineGraph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart margin={{
        top: 0,
      }} data={props.data}>
        <XAxis dataKey="Dates" reversed={true} />
        <YAxis dataKey={props.datakey} />
        <Tooltip />
        <Line type="Monotone" dataKey={props.datakey} stroke="#82ca9d" />
        <ReferenceLine y={props.min} stroke="#de4545" strokeDasharray="3 3" />
        <ReferenceLine y={props.max} stroke="#de4545" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph
