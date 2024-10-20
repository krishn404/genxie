import AnimatedButton from '../components/AnimatedButton'; 
import CardSpotlight from '../components/CardSpotlight'; 

function LandingPage() {
    return (
        <>
          
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            
            <div className="flex flex-col items-center justify-center min-h-screen p-5 space-y-6"> 
                
                <h1 className="text-center text-white text-5xl font-bold shadow-lg">New Tool to generate documents with help of AI</h1> 
                
                
                <CardSpotlight items={[
                    "Automated document generation",
                    "Data analysis and visualization",
                    "AI-driven customer support"
                ]} className="p-4 bg-white rounded-lg shadow-md" /> 

                
                <AnimatedButton 
                    onClick={() => console.log('Button clicked!')} 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" 
                /> {/* Removed mt-4 to use space-y for spacing */}
            </div>
        </>
    );
}

// Export the LandingPage component
export default LandingPage;
