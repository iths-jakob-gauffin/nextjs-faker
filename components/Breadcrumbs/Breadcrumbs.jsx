import styles from "./Breadcrumbs.module.scss";
import Link from "next/link";
import {useRouter} from "next/router";

export const Breadcrumbs = ({url}) => {
  console.log("OUTPUT ÄR: Breadcrumbs -> url", url)
  let router = useRouter();
  
  let { product } = router.query;
  
  let productCrumbs = product.filter(name => isNaN(name));

  // let decoded = productCrumbs.map(crumb => decodeURI(crumb));
  
  let crumbLinks = [];
  
  url.map((path, idx) => {
    let sliced = url.slice(0, idx + 1);

    let string = "";

    if(!Number(sliced[idx] * 1)){
    
      if(!sliced[idx]){
        string = "/";
      } else {
        string = sliced.join("/");
      }
      crumbLinks = [...crumbLinks, string];
    }

  })

  // const renderBreadcrumbs = () => {
  //   return (
  //     {crumbLinks.map((x, idx) => {
  //       return(
  //       <Link href={x}><a className={styles["Breadcrumbs__Link"]}>{x === "/" ? "Home" : decodeURI(url[idx])}</a></Link>
  //       )
  //     })}
  //   )
  // }

  return (
    <div className={styles["Breadcrumbs"]}>
      {crumbLinks.map((x, idx) => {
        let text = "";
        if(x === "/"){
          text = "Home"
        } else if (idx === crumbLinks.length - 1){
          text = productCrumbs[1];
        } else {
          text = decodeURI(url[idx]);
        }
        return (
          <Link href={x}><a className={styles["Breadcrumbs__Link"]}>{text}</a></Link>
        )
      })}
    </div>
  )
}




// import styles from "./Breadcrumbs.module.scss";
// import Link from "next/link";
// import {useRouter} from "next/router";

// export const Breadcrumbs = ({url}) => {
//   let router = useRouter();
//   console.log("OUTPUT ÄR: Breadcrumbs -> router", router)

//   let crumbs = [];
  
//   url.map((path, idx) => {
//     let sliced = url.slice(0, idx + 1);
//     // console.log("OUTPUT ÄR: Breadcrumbs -> sliced", sliced[idx]);

//     // if(!Number(sliced[idx] * 1)){
//     //   console.log("japp");
//     // } else {
//     //   console.log("nej");
//     // }
    

//     let string = "";

//     if(!Number(sliced[idx] * 1)){
     
//       if(!sliced[idx]){
//         string = "/";
//       } else {
//         string = sliced.join("/");
//       }
//       crumbs = [...crumbs, string];
//     }

//   })

//   return (
//     <div className={styles["Breadcrumbs"]}>
//       {crumbs.map((x, idx) => {
//       console.log("OUTPUT ÄR: Breadcrumbs -> x", x)
//         return (
//         // <Link href={x}><a className={styles["Breadcrumbs__Link"]}>{x === "/" ? "Home" : decodeURI(url[idx])}</a></Link>
//         <Link href={x}><a className={styles["Breadcrumbs__Link"]}>{writeBreadcrumbs()}</a></Link>
//       )})}
//     </div>
//   )
// }