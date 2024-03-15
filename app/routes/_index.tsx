import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';

import type { MetaFunction } from "@remix-run/node"


// import the mental health questionnaire data from the JSON file
import {questionnaireData} from "#app/data/questionnaire.json"

// Define the data structure for the questionnaire objects
interface YearlyData {
  totalStudents : number,
  scores: number[]
}

interface SchoolData {
  [year:string]: YearlyData
}

export const meta: MetaFunction = () => [{ title: "Project 3: Mental Health Questionnaire" }]

// Define the colour scale for the legend
const colorScale = scaleOrdinal({
  domain: ['Mild', 'Moderate', 'Moderate Severe', 'Severe'],
  range: ['#00a687', '#fec200', '#ee7309', '#ff4063'],
});

export default function Index() {
  return (
    <>
      <div>
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
