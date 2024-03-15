import { LegendOrdinal } from '@visx/legend';
import { Group } from '@visx/group';
import { BarStack } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { Grid } from '@visx/grid';
import type { MetaFunction } from "@remix-run/node"


// import the mental health questionnaire data from the JSON file
import questionnaireData from "../data/questionnaire.json"
import StackedBarChart from '../components/StackedBarChart';

// Define the data structure for the questionnaire objects
interface YearlyData {
  year: number
  totalStudents : number,
  scores: number[]
}

export const meta: MetaFunction = () => [{ title: "Project 3: Mental Health Questionnaire" }]

// Create scales
const xScale = scaleBand<string>({
  domain: Object.keys(questionnaireData),
  padding: 0.2,
});

const yScale = scaleLinear<number>({
  domain: [0, Math.max(...Object.values(questionnaireData).map(d => d.totalStudents))],
  nice: true,
});

// Define the colour scale for the legend
const colorScale = scaleOrdinal({
  domain: ['Mild', 'Moderate', 'Moderate Severe', 'Severe'],
  range: ['#00a687', '#fec200', '#ee7309', '#ff4063'],
});

// Set your width and height
const width = 800;
const height = 600;

// Define your margin object
const margin = { top: 20, right: 20, bottom: 20, left: 40 };

export default function Index() {
  

  return (
    <>
      <div> 
      <StackedBarChart width={width} height={height} margin={margin} />
        
        <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 15px 0 0">
          {labels => (
            <div className="flex flex-row">
              {labels.map((label, i) => (
                <div key={`legend-${i}`} className="flex items-center mx-2">
                  <svg className="w-4 h-4" viewBox="0 0 15 15">
                    <circle cx="7.5" cy="7.5" r="7.5" fill={label.value} />
                  </svg>
                  <span className="ml-2 text-md">{label.text}</span>
                </div>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </div>
    </>
  )
}
