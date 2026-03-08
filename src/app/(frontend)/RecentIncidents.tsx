"use client";

import { Incident } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import { IncidentCard } from "@/components/IncidentCard";
import { motion } from "motion/react";
import { useAppStore } from "@/store/useAppStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Props {
  incidents: Incident[];
}

export function RecentIncidents({ incidents }: Props) {
  const { t } = useTranslation();
  const { language } = useAppStore();

  if (!incidents || incidents.length === 0) return null;

  const featured = incidents[0];
  
  // Categorize incidents for tabs
  const openIncidents = incidents.filter(i => i.status === "open").slice(0, 4);
  const closedIncidents = incidents.filter(i => i.status === "closed").slice(0, 4);
  const recentIncidents = incidents.slice(1, 5);

  const TabGrid = ({ items }: { items: Incident[] }) => {
    if (items.length === 0) {
      return (
        <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
          {language === "bn" ? "কোনো ঘটনা পাওয়া যায়নি।" : "No incidents found."}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6">
        {items.map((incident, i) => (
          <IncidentCard key={incident._id} incident={incident} index={i} />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 border-b border-border/50 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
        >
          <div className="min-w-0">
            <span className="flex items-center gap-2 sm:gap-3 text-xs font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              {language === "bn" ? "সাম্প্রতিক আপডেট" : "Recent Updates"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-dynamic">
              {t.home.incidentsSection.heading}
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-col gap-10 sm:gap-12 md:gap-20">
          {/* Top Featured Post */}
          <IncidentCard incident={featured} index={0} featured={true} />

          {/* Categorized Feed via Tabs */}
          <div className="pt-6 sm:pt-8 md:pt-12 border-t border-border">
            <Tabs defaultValue="all" className="w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                <TabsList className="bg-background/50 border border-border/50 p-1 w-full sm:w-auto flex flex-nowrap sm:flex-wrap justify-stretch sm:justify-center gap-0 min-w-0">
                  <TabsTrigger value="all" className="rounded-md flex-1 sm:flex-initial min-w-0 text-xs sm:text-sm px-3 sm:px-4">
                    {language === "bn" ? "সবগুলো" : "All Recent"}
                  </TabsTrigger>
                  <TabsTrigger value="open" className="rounded-md flex-1 sm:flex-initial min-w-0 text-xs sm:text-sm px-3 sm:px-4">
                    {language === "bn" ? "চলমান" : "In Progress"}
                  </TabsTrigger>
                  <TabsTrigger value="closed" className="rounded-md flex-1 sm:flex-initial min-w-0 text-xs sm:text-sm px-3 sm:px-4">
                    {language === "bn" ? "মীমাংসিত" : "Resolved"}
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0 outline-none">
                <TabGrid items={recentIncidents} />
              </TabsContent>
              <TabsContent value="open" className="mt-0 outline-none">
                <TabGrid items={openIncidents} />
              </TabsContent>
              <TabsContent value="closed" className="mt-0 outline-none">
                <TabGrid items={closedIncidents} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}