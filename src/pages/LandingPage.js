import AnimatedButton from '../components/AnimatedButton'; 
import CardSpotlight from '../components/CardSpotlight'; 

function LandingPage() {
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" role="presentation"></div>
            
            <div className="flex flex-col items-center justify-center min-h-screen p-5 space-y-6"> 
                <h1 className="text-center text-white text-4xl md:text-5xl font-bold shadow-lg" tabIndex="0">
                    Transform Your Ideas into Polished Documents
                </h1>
                
                <div className="w-full md:w-1/2">
                    <CardSpotlight/> 
                </div>

                <p className="text-center text-white text-base md:text-lg" aria-label="Description of the service">
                    Our AI-powered document generator takes your prompts and turns them into beautifully formatted reports, proposals, and more. Save time and impress your clients.
                </p>

                <AnimatedButton 
                    onClick={() => console.log('Button clicked!')} 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" 
                    aria-label="Generate Document"
                />
            </div>
        </>
    );
}

// Export the LandingPage component
export default LandingPage;
