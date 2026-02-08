import Page from '../Components/Page/Page';
import Report from '../Components/Report/Report';
import SideNavigation from '../Components/SideNavigation/SideNavigation';
import styles from '../page.module.css';

export default function page() {
    return (
        <>
            <SideNavigation />
            <div className={styles.container}>
                <Page title='Report' description='View detailed reports and analytics'>
                    <Report />
                </Page>
            </div>
        </>
    );
}