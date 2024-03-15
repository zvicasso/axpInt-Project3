import { Group } from '@visx/group';
import { BarStack } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { Grid } from '@visx/grid';

// Assuming questionnaireData is imported from your JSON file
import questionnaireData  from '../data/questionnaire.json';

// Define an interface for the props
interface StackedBarChartProps {
    width: number;
    height: number;
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  }

// Define the keys for the stacked bar chart
const keys = ['Mild', 'Moderate', 'Moderate Severe', 'Severe'];

// Extract scores for each year
const quartileData = Object.values(questionnaireData).map(d => {
    return {
      year: d.year,
      ...d.scores.reduce((acc, score, i) => {
        acc[keys[i]] = score;
        return acc;
      }, {}),
    };
  });

// Create scales
const xScale = scaleBand<string>({
  domain: Object.keys(questionnaireData),
  padding: 0.2,
});

const yScale = scaleLinear<number>({
  domain: [0, Math.max(...Object.values(questionnaireData).map(d => d.totalStudents))],
  nice: true,
});

const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: ['#00a687', '#fec200', '#ee7309', '#ff4063'],
});

export default function StackedBarChart( {width, height, margin}:StackedBarChartProps ){
  // Set the dimensions of the graph
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Update scale output dimensions
  xScale.rangeRound([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#fff" />
      <Group left={margin.left} top={margin.top}>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
        />
        <BarStack
          data={quartileData}
          keys={keys}
          x={(d) => String(d.year)}
          xScale={xScale}
          yScale={yScale}
          color={colorScale}
        >
          {barStacks =>
            barStacks.map(barStack =>
              barStack.bars.map(bar => (
                <rect
                  key={`bar-stack-${barStack.index}-${bar.index}`}
                  x={bar.x}
                  y={bar.y}
                  height={bar.height}
                  width={bar.width}
                  fill={bar.color}
                />
              ))
            )
          }
        </BarStack>
        <AxisLeft scale={yScale} />
        <AxisBottom top={yMax} scale={xScale} />
      </Group>
    </svg>
  );
}