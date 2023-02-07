import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
function BarGraph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart margin={{
        top: 0,
      }} width={150} height={40} data={props.data}>
        <XAxis dataKey="Time" />
        <YAxis dataKey="Reading" />
        <Tooltip />
        <Bar dataKey="Reading" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarGraph
