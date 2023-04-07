import React from 'react';
import { ReferenceLine, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function LineGraph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={props.data}
        margin={0}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
