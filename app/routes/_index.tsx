// Import necessary modules
import type { MetaFunction } from "@remix-run/node"
import StackedBarChart from '../components/StackedBarChart';
import { useEffect, useState } from "react";

//Define the page metadata (title)
export const meta: MetaFunction = () => [{ title: "Project 3: Mental Health Questionnaire" }]

// Set your width and height
const width = 720;
const height = 540;

// Define your margin object
const margin = { top: 20, right: 20, bottom: 40, left: 40 };

export default function Index() {
   // State to hold dynamic dimensions
   const [dimensions, setDimensions] = useState({ width: 720, height: 540 });

   // Effect hook to update dimensions on window resize
  useEffect(() => {

    window.addEventListener('resize',()=>{
      if (window.innerWidth <=768){
        setDimensions({
          width: window.innerWidth,
          height: window.innerWidth * 0.75 // Adjust this ratio as needed
        });  
      }
    })
  }, []);
  return (
    <>
      <div className='flex flex-col justify-center items-center py-6'> 
        <h1 className='font-bold text-center text-base md:text-lg lg:text-xl'>Mental Health Questionnaire Scores for Eaglesvale Senior School</h1>
        <StackedBarChart width={dimensions.width} height={dimensions.height} margin={margin} />
      </div>
    </>
  )
}
