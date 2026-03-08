"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Heading, Text } from "@/components/ui/typography";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, Scale } from "lucide-react";

export function ProcessSection() {
  const { t, language } = useTranslation();

  const steps = [
    {
      id: "01",
      icon: FileText,
      title: language === "bn" ? "তথ্য সংগ্রহ ও যাচাই" : "Collect & Verify",
      description:
        language === "bn"
          ? "আমরা বিভিন্ন নির্ভরযোগ্য সূত্র থেকে ঘটনার তথ্য সংগ্রহ করি এবং পুঙ্খানুপুঙ্খভাবে যাচাই করি।"
          : "We gather incident reports from multiple reliable sources and rigorously verify the details.",
    },
    {
      id: "02",
      icon: Shield,
      title: language === "bn" ? "নিরপেক্ষ ডকুমেন্টেশন" : "Neutral Documentation",
      description:
        language === "bn"
          ? "যাচাইকৃত তথ্য আমাদের ডাটাবেসে অত্যন্ত নিরপেক্ষ ও স্বচ্ছভাবে সংরক্ষণ করা হয়।"
          : "Verified information is securely stored in our database with complete neutrality and transparency.",
    },
    {
      id: "03",
      icon: Scale,
      title: language === "bn" ? "বিচার ও ফলাফল ট্র্যাকিং" : "Track Outcomes",
      description:
        language === "bn"
          ? "মামলার শুরু থেকে শেষ রায় পর্যন্ত প্রতিটি ধাপ আমরা নজরে রাখি ও আপডেট করি।"
          : "We monitor each case from the initial filing through court proceedings to the final verdict.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary">
            {language === "bn" ? "আমাদের প্রক্রিয়া" : "How it Works"}
          </span>
          <Heading variant="h2" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-dynamic">
            {language === "bn" ? "আমরা কীভাবে কাজ করি" : "The Journey to Transparency"}
          </Heading>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-border z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <Card className="h-full bg-card border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 overflow-visible mt-8 md:mt-0">
                <div className="absolute -top-8 left-8 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <step.icon className="w-8 h-8" />
                </div>
                <CardContent className="pt-14 p-8 flex flex-col h-full text-left md:text-center">
                  <div className="text-primary/20 text-5xl font-black mb-4 font-mono">{step.id}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-dynamic">{step.title}</h3>
                  <Text variant="muted" className="leading-relaxed">
                    {step.description}
                  </Text>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}