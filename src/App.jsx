import Hero from './components/Hero';

const App = () => {
    return (
        <div className='w-full max-w-[1440px] mx-auto bg-orange-quaternary relative'>
        
        
            <div className="bg-orange-tertiary text-white p-4 text-xl mb-4">
                TailwindCSS po funksionon 🎉
            </div>

            <Hero />
        </div>
    );
};

export default App;
