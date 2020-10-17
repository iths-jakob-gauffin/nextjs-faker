import styles from "./Nav.module.scss";
import Link from "next/link";

export const Nav = ({categories}) => (
  <nav className={styles["Nav"]}>
    <ul>
      {categories.length > 0 && categories.map(x => 
      <Link href={`/products/[category]`} as={`/products/${x}`} key={x + "_" + "1" }>
        <li className={styles["Nav__Link"]}>
          <a>{x}</a>
        </li>
      </Link>
      )}
    </ul>
  </nav>
)

