import React from 'react';

import HeroSlider from './HeroSlider';

const Hero = () => {
    return (
        <section className='min-h-[748px] relative pt-24 pb-12 flex items-center overflow-hidden lg:px-[50px] lg:pt-24'>
            <HeroSlider />
        </section>
    );
};

export default Hero;
