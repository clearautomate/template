import Image from "next/image";
import styles from "./page.module.css";
import SideNavigation from "./Components/SideNavigation/SideNavigation";
import Page from "./Components/Page/Page";
import CrudTable from "./Components/CrudTable/CrudTable";
import { tableData } from "./types/mockData";
import { read as reactAction } from "./actions/table/read.action";

export default function Home() {
  // const users = await read("user");

  return (
    <SideNavigation>
      <div className={styles.container}>
        {/* <Page title="Dashboard" description="Overview of key metrics, activity, and system status at a glance."> */}
        <CrudTable table={tableData} crudOptions={{
          prismaModelName: 'test',
          read: reactAction
        }} />
        {/* </Page> */}
      </div>
    </SideNavigation>
  );
}
