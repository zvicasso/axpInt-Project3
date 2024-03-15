import { LegendOrdinal } from '@visx/legend';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import type { MetaFunction } from "@remix-run/node"

// import the mental health questionnaire data from the JSON file
import questionnaireData from "../data/questionnaire.json"
import StackedBarChart from '../components/StackedBarChart';

export const meta: MetaFunction = () => [{ title: "Project 3: Mental Health Questionnaire" }]

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
      <div className='flex flex-col justify-center items-center'> 
        <StackedBarChart width={width} height={height} margin={margin} />
        
        <LegendOrdinal scale={colorScale}  >
          {labels => (
            <div className="flex flex-row my-2">
              {labels.map((label, i) => (
                <div key={`legend-${i}`} className="flex items-center mx-6">
                  <svg className="w-4 h-4" viewBox="0 0 15 15">
                    <circle cx="7.5" cy="7.5" r="7.5" fill={label.value} />
                  </svg>
                  <span className="ml-2 text-md font-bold">{label.text}</span>
                </div>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </div>
    </>
  )
}
