"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Heading } from "@/components/ui/typography";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppStore } from "@/store/useAppStore";

export function FaqSection() {
  const { language } = useAppStore();

  const faqs = [
    {
      id: "faq-1",
      question: language === "bn" ? "সত্য ট্র্যাকার কী?" : "What is the Shottyo Tracker?",
      answer:
        language === "bn"
          ? "এটি একটি উন্মুক্ত প্ল্যাটফর্ম যা সারা দেশে ঘটে যাওয়া বিভিন্ন ঘটনা এবং বিচার প্রক্রিয়ার অগ্রগতি নিরপেক্ষভাবে ট্র্যাক করে।"
          : "It is an open platform that neutrally tracks various incidents and the progress of judicial proceedings across the country.",
    },
    {
      id: "faq-2",
      question: language === "bn" ? "আপনারা কীভাবে তথ্য সংগ্রহ করেন?" : "How do you collect information?",
      answer:
        language === "bn"
          ? "আমরা প্রতিষ্ঠিত সংবাদমাধ্যম, আদালতের রেকর্ড এবং ভেরিফায়েড ক্রাউডসোর্সিংয়ের মাধ্যমে তথ্য সংগ্রহ করি।"
          : "We gather information through established news outlets, court records, and verified crowdsourcing.",
    },
    {
      id: "faq-3",
      question: language === "bn" ? "আমি কি কোনো ঘটনার রিপোর্ট করতে পারি?" : "Can I report an incident?",
      answer:
        language === "bn"
          ? "হ্যাঁ, খুব শিগগিরই আমাদের প্ল্যাটফর্মে রিপোর্ট সাবমিট করার ফিচার যুক্ত করা হবে। আপাতত আমরা সরাসরি সংগৃহীত ডেটা প্রকাশ করছি।"
          : "Yes, we will soon add a feature to submit reports on our platform. Currently, we publish directly sourced data.",
    },
    {
      id: "faq-4",
      question: language === "bn" ? "এই প্ল্যাটফর্মটি কি সরকারি?" : "Is this an official government platform?",
      answer:
        language === "bn"
          ? "না, এটি একটি স্বাধীন এবং অলাভজনক উদ্যোগ, যার লক্ষ্য সমাজে জবাবদিহিতা ও স্বচ্ছতা বৃদ্ধি করা।"
          : "No, this is an independent, non-profit initiative aimed at increasing accountability and transparency in society.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <Heading variant="h2" className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground font-dynamic mb-3 sm:mb-4">
            {language === "bn" ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"}
          </Heading>
          <p className="text-base sm:text-lg text-muted-foreground">
            {language === "bn"
              ? "আমাদের উদ্যোগ সম্পর্কে আপনার প্রশ্নের উত্তরগুলো এখানে পাবেন।"
              : "Find answers to common questions about our initiative here."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card border border-border/60 rounded-xl px-4 sm:px-6 data-[state=open]:border-primary/50 transition-colors shadow-sm"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-4 sm:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-4 sm:pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}