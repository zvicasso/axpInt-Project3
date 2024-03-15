import { Group } from '@visx/group';
import { BarStack } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { Grid } from '@visx/grid';
import { localPoint } from '@visx/event';
import { LegendOrdinal } from '@visx/legend';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';

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

  const {
    tooltipOpen,
    tooltipData,
    tooltipTop,
    tooltipLeft,
    showTooltip,
    hideTooltip
  } = useTooltip();
  
  const { TooltipInPortal } = useTooltipInPortal();

  return (
    <>
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
                    onMouseMove={(event) => {
                      const eventSvgCoords = localPoint(event);
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: eventSvgCoords?.x
                      });
                    }}
                    onMouseLeave={() => hideTooltip()}
                  />
                ))
              )
            }
          </BarStack>
          {tooltipOpen && (
              <TooltipInPortal
                top={tooltipTop}
                left={tooltipLeft}
                style={{
                  ...defaultStyles,
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <div>
                  <strong>{tooltipData.key}</strong>: {tooltipData.bar.data[tooltipData.key]}
                </div>
              </TooltipInPortal>
            )}

          <AxisLeft scale={yScale} />
          <AxisBottom top={yMax} scale={xScale}/>
        </Group>
      </svg>
      <LegendOrdinal scale={colorScale} >
          {labels => (
            <div className="flex flex-row flex-wrap my-2">
              {labels.map((label, i) => (
                <div key={`legend-${i}`} className="flex items-center mx-6">
                  <svg className="w-4 h-4" viewBox="0 0 15 15">
                    <circle cx="7.5" cy="7.5" r="7.5" fill={label.value} />
                  </svg>
                  <span className="ml-2 py-1 font-semibold text-xs md:text-sm lg:text-base">{label.text}</span>
                </div>
              ))}
            </div>
          )}
      </LegendOrdinal>
    </>
  );
}