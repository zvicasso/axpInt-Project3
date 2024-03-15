// Import necessary modules
import type { MetaFunction } from "@remix-run/node"
import StackedBarChart from '../components/StackedBarChart';

//Define the page metadata (title)
export const meta: MetaFunction = () => [{ title: "Project 3: Mental Health Questionnaire" }]

// Set your width and height
const width = 720;
const height = 540;

// Define your margin object
const margin = { top: 20, right: 20, bottom: 40, left: 40 };

export default function Index() {
  return (
    <>
      <div className='flex flex-col justify-center items-center py-6'> 
        <h1 className='font-bold'>Mental Health Questionnaire Scores for Eaglesvale Senior School</h1>
        <StackedBarChart width={width} height={height} margin={margin} />
      </div>
    </>
  )
}
