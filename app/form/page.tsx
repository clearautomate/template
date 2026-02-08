import Form from "../Components/Form/Form";
import Page from "../Components/Page/Page";
import SideNavigation from "../Components/SideNavigation/SideNavigation";
import { myForm } from "../types/mockForm";

export default function page() {
    return (
        <>
            <SideNavigation>
                <Page title="Form Page" description="This is the form page where users can submit their information.">
                    <Form formData={myForm} />
                </Page>
            </SideNavigation>
        </>
    );
}