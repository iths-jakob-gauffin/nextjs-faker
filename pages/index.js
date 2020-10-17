import App from "../components/App";

import {Nav} from "../components/Nav/Nav";

export default function Index(props) {
console.log("OUTPUT ÄR: Index -> props", props)
  
  return (
    <>
    {/* <Nav categories={["men clothing", "jewelery", "electronics", "women clothing"]}/> */}
    <App/> 
    </>
  )
}
