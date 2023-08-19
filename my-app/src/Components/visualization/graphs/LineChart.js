import React from 'react';
import { ReferenceLine, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Skeleton from '@mui/material/Skeleton';

function LineGraph(props) {
  const { data, datakey, min, max } = props;

  // Render skeleton loader if data is not available
  if (!data || data.length === 0) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart margin={{ top: 0 }} data={data}>
        <XAxis dataKey="Dates" reversed={true} />
        <YAxis dataKey={datakey} />
        {/* <YAxis dataKey={props.datakey} domain={[props.min, props.max]} /> */}
        <Tooltip />
        <Line type="Monotone" dataKey={datakey} stroke="#82ca9d" />
        <ReferenceLine y={min} stroke="#de4545" strokeDasharray="3 3" />
        <ReferenceLine y={max} stroke="#de4545" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
