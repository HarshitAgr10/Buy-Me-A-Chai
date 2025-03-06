import Dashboard from '@/components/Dashboard'

/**
 * This component serves as the main page for the Dashboard.
 * It renders the <Dashboard/> component, which contains the dashboard UI.
*/
const DashboardPage = () => {
    return (
        <Dashboard/>
    )
}

export default DashboardPage

/* Metadata for page to set the title of page in browser tab. */
export const metadata = {
    title: "DashBoard - Buy Me A Chai",
}