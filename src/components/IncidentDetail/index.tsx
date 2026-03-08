"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Incident } from "@/types";
import { getLocalized, getDescriptionText, getDescriptionBlocksForLanguage } from "./utils";
import { IncidentArticleHeader } from "./IncidentArticleHeader";
import { IncidentDescription } from "./IncidentDescription";
import { IncidentGallery } from "./IncidentGallery";
import { IncidentVictims } from "./IncidentVictims";
import { IncidentVerdict } from "./IncidentVerdict";
import { IncidentTimelineDetails } from "./IncidentTimelineDetails";
import { IncidentTimelineSummary } from "./IncidentTimelineSummary";

interface IncidentDetailProps {
  incident: Incident | null;
}

export function IncidentDetail({ incident }: IncidentDetailProps) {
  const { t, language } = useTranslation();

  if (!incident) {
    return (
      <div className="text-center py-20 text-red-500">
        {t.common.incidents.failedToLoad}
      </div>
    );
  }

  const descriptionBlocks = getDescriptionBlocksForLanguage(incident.description, language);
  const descriptionPlain = getDescriptionText(incident.description, language);
  const hasDescription = (descriptionBlocks && descriptionBlocks.length > 0) || descriptionPlain.length > 0;
  const verdict = getLocalized(incident.verdict, language);
  const hasTimeline = incident.timeline && incident.timeline.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <IncidentArticleHeader
        incident={incident}
        t={t}
        language={language}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-8 space-y-16">
          {hasDescription && (
            <IncidentDescription
              description={descriptionBlocks && descriptionBlocks.length > 0 ? descriptionBlocks : descriptionPlain}
              language={language}
            />
          )}

          {incident.images && incident.images.length > 0 && (
            <IncidentGallery
              images={incident.images}
              galleryLabel={t.common.incidents.gallery}
            />
          )}

          {incident.victims && incident.victims.length > 0 && (
            <IncidentVictims
              victims={incident.victims}
              language={language}
              victimsLabel={t.common.incidents.victims}
              ageLabel={t.common.incidents.age}
            />
          )}

          {verdict && (
            <IncidentVerdict
              verdict={verdict}
              verdictLabel={t.common.incidents.verdict}
            />
          )}

          {hasTimeline && incident.timeline && (
            <IncidentTimelineDetails
              timeline={incident.timeline}
              language={language}
              timelineDetailsLabel={`${t.common.incidents.timeline} ${language === "bn" ? "বিস্তারিত" : "Details"}`}
            />
          )}
        </div>

        <div className="lg:col-span-4 relative">
          {hasTimeline && incident.timeline && (
            <IncidentTimelineSummary
              timeline={incident.timeline}
              language={language}
              summaryLabel={`${t.common.incidents.timeline} ${language === "bn" ? "সারসংক্ষেপ" : "Summary"}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
