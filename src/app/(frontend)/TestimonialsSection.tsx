"use client";

import { useAppStore } from "@/store/useAppStore";
import { Heading } from "@/components/ui/typography";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const { language } = useAppStore();

  const testimonials = [
    {
      id: 1,
      quote: language === "bn" ? "এই প্ল্যাটফর্মটি সাধারণ মানুষের কাছে আইনি প্রক্রিয়ার স্বচ্ছতা নিয়ে এসেছে যা আগে কখনো ছিল না।" : "This platform brings an unprecedented level of transparency to the legal process for everyday people.",
      author: language === "bn" ? "অ্যাডভোকেট শফিকুর রহমান" : "Advocate Shafiqur Rahman",
      role: language === "bn" ? "মানবাধিকার কর্মী" : "Human Rights Lawyer",
    },
    {
      id: "2",
      quote: language === "bn" ? "সঠিক সময়ে সঠিক তথ্য পাওয়া এবং তা ট্র্যাক করা এখন অনেক সহজ হয়েছে। এটি একটি দারুণ উদ্যোগ।" : "Accessing and tracking accurate information in real-time has never been easier. A brilliant initiative.",
      author: language === "bn" ? "ড. আয়েশা সিদ্দিকা" : "Dr. Ayesha Siddiqa",
      role: language === "bn" ? "গবেষক, ঢাকা বিশ্ববিদ্যালয়" : "Researcher, Dhaka University",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop')] opacity-5 mix-blend-overlay bg-cover bg-center" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <Heading variant="h2" className="text-4xl md:text-5xl font-bold tracking-tight font-dynamic mb-6">
            {language === "bn" ? "মানুষের মতামত" : "Voices of Impact"}
          </Heading>
          <p className="text-primary-foreground/80 text-lg">{language === "bn" ? "যাঁরা আমাদের কাজ অনুসরণ করছেন, তাঁদের দৃষ্টিতে আমাদের উদ্যোগ।" : "What advocates and researchers are saying about our tracking platform."}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }} className="bg-black/20 border border-white/10 p-8 md:p-10 rounded-3xl relative">
              <Quote className="w-12 h-12 text-white/20 absolute top-8 right-8" />
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10 text-white/90">&quot;{item.quote}&quot;</p>
              <div>
                <h4 className="font-bold text-lg text-white font-dynamic">{item.author}</h4>
                <p className="text-primary-foreground/70 text-sm mt-1">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
