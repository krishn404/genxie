import AnimatedButton from '../components/AnimatedButton'; 
import CardSpotlight from '../components/CardSpotlight'; 

function LandingPage() {
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-5 space-y-6 md:space-y-0"> 
                <div className="md:w-1/2 flex flex-col items-start space-y-4">
                    <h1 className="text-left text-white text-5xl font-bold shadow-lg">
                        Transform Your Ideas into Polished Documents
                    </h1>
                    <p className="text-left text-white text-lg">
                        Our AI-powered document generator takes your prompts and turns them into beautifully formatted reports, proposals, and more. Save time and impress your clients.
                    </p>
                    <AnimatedButton 
                        onClick={() => console.log('Button clicked!')} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" 
                    />
                </div>
                
                <div className="md:w-1/2">
                    <CardSpotlight items={[
                        "Automated document generation",
                        "Data analysis and visualization",
                        "AI-driven customer support"
                    ]} className="p-4 bg-white rounded-lg shadow-md" /> 
                </div>
            </div>
        </>
    );
}

// Export the LandingPage component
export default LandingPage;
