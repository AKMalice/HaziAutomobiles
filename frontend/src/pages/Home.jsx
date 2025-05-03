import React from 'react';
import Navbar from '../components/Navbar';
import img from '../assets/hero.png';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <Navbar/>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white pt-16">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8 py-20">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-neutral">
                Engineering <br/>
                <span className="text-primary">Excellence</span> in <br/>
                Heavy Equipment
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Industry-leading manufacturer of premium excavator parts, dozer components, and precision-engineered solutions.
              </p>
              <div>
                <button onClick={() => navigate('/products')} className="btn btn-primary text-white">Explore Products</button>
              </div>
            </div>
            <div className="relative h-[500px]">
              <img 
                src={img}
                alt="Excavator" 
                className="absolute rounded-lg shadow-2xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-neutral text-neutral-content">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Hazi Automobiles?</h2>
            <p className="opacity-90">Delivering excellence through innovation and precision engineering</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { title: "Expert Team", value: "50+", desc: "Skilled professionals" },
              { title: "Experience", value: "15+", desc: "Years in industry" },
              { title: "Production", value: "1000+", desc: "Parts per year" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <h3 className="text-lg font-medium opacity-90">{stat.title}</h3>
                <div className="text-4xl font-bold">{stat.value}</div>
                <p className="text-sm opacity-75">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-8 bg-base-100">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our range of high-performance parts engineered for reliability</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              {
                name: "Excavator Pins",
                desc: "High-strength alloy steel pins designed for maximum durability",
                specs: ["Heat treated", "Custom sizes"],
                img: p1
              },
              {
                name: "Dozer Bushings",
                desc: "Premium quality bushings engineered for optimal performance",
                specs: ["Wear resistant", "Extended life"],
                img: p2
              },
              {
                name: "Custom Parts",
                desc: "Specialized components tailored to your exact specifications",
                specs: ["Custom design", "Fast delivery"],
                img: p3
              }
            ].map((product, idx) => (
              <div key={idx} className="card bg-white hover:shadow-xl border border-primary transition-all duration-300">
                <figure className="px-4 pt-4">
                  <img src={product.img} alt={product.name} className="rounded-xl w-full h-64 object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="text-gray-600">{product.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-outline">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content">
        <div className="footer py-6">
          <div className="mx-auto">
            <p>© {new Date().getFullYear()} Hazi Automobiles. All rights reserved.</p>
          </div> 
        </div>
      </footer>
    </div>
  );
};

export default Home;
