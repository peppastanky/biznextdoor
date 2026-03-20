import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Search, ShoppingCart, Shield, Heart } from "lucide-react";
import { reviews } from "../data/mockData";
import { motion } from "motion/react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with glassmorphism */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/5 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tighter">BizNextDoor</h1>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="rounded-full px-6 hover:bg-black/5">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="rounded-full px-8 bg-black text-white hover:bg-black/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-48 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
            Discover Local Businesses
            <br />
            Right Next Door
          </h2>
          <p className="text-lg text-black/60 mb-16 max-w-2xl mx-auto leading-relaxed">
            Connect with home-based businesses in your community. Find unique products and services crafted with care.
          </p>
          <Link to="/register">
            <Button size="lg" className="rounded-full px-12 py-7 bg-black text-white hover:bg-black/90 text-base transition-all duration-300 hover:scale-105">
              Start Exploring
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Image Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            src="https://images.unsplash.com/photo-1611588275568-72ecc1a502d1?w=600"
            alt="Home bakery"
            className="w-full h-96 object-cover rounded-3xl"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src="https://images.unsplash.com/photo-1769578683495-88c7c5adbaad?w=600"
            alt="Handmade crafts"
            className="w-full h-96 object-cover rounded-3xl"
          />
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600"
            alt="Beauty services"
            className="w-full h-96 object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 text-center mb-4">Features</p>
          <h3 className="text-5xl font-bold tracking-tighter leading-tight mb-24 text-center">
            Everything You Need
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center">
                <Search className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-4">Easy Discovery</h4>
              <p className="text-white/60 leading-relaxed">
                Find local businesses offering unique products and services in your area
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center">
                <ShoppingCart className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-4">Simple Ordering</h4>
              <p className="text-white/60 leading-relaxed">
                Browse, select, and book products or services with just a few clicks
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center">
                <Shield className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-4">Verified Businesses</h4>
              <p className="text-white/60 leading-relaxed">
                Shop with confidence from verified local entrepreneurs
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Customers */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 text-center mb-4">For Customers</p>
        <h3 className="text-5xl font-bold tracking-tighter leading-tight mb-24 text-center">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { num: "1", title: "Create Account", desc: "Sign up in seconds and start exploring local businesses" },
            { num: "2", title: "Browse & Search", desc: "Discover products and services tailored to your needs" },
            { num: "3", title: "Select & Book", desc: "Choose your preferred timeslot and add to cart" },
            { num: "4", title: "Enjoy", desc: "Collect your products or enjoy your booked service" }
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mb-6">
                {step.num}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-black/60 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works - Businesses */}
      <section className="bg-black/5 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 text-center mb-4">For Businesses</p>
          <h3 className="text-5xl font-bold tracking-tighter leading-tight mb-24 text-center">
            Grow Your Business
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { num: "1", title: "Register", desc: "Create your business profile with verification" },
              { num: "2", title: "List Products", desc: "Add your products and services with photos and details" },
              { num: "3", title: "Manage Orders", desc: "Track and fulfill customer orders efficiently" },
              { num: "4", title: "Grow", desc: "Analyze insights and expand your customer base" }
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mb-6">
                  {step.num}
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-black/60 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 text-center mb-4">Testimonials</p>
        <h3 className="text-5xl font-bold tracking-tighter leading-tight mb-24 text-center">
          Trusted by Our Community
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex gap-4 mb-6">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-sm text-black/40">{review.username}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Heart key={i} className="w-4 h-4 fill-black" />
                  ))}
                </div>
                <p className="text-black/60 leading-relaxed">{review.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-6xl font-bold tracking-tighter leading-none mb-8">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-white/60 mb-16 leading-relaxed">
            Join thousands of customers and businesses connecting in your community
          </p>
          <Link to="/register">
            <Button size="lg" className="rounded-full px-12 py-7 bg-white text-black hover:bg-white/90 text-base transition-all duration-300 hover:scale-105">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-black/40">&copy; 2026 BizNextDoor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
