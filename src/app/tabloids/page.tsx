"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TABLOID_ISSUES, TabloidIssue } from "@/data/tabloidsData";
import { DigitalFlipbook } from "@/components/tabloids/DigitalFlipbook";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Sparkles,
  Download,
  ExternalLink,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function TabloidsPage() {
  const [selectedIssue, setSelectedIssue] = useState<TabloidIssue>(TABLOID_ISSUES[0]);

  const handleSelectIssue = (issue: TabloidIssue) => {
    setSelectedIssue(issue);
    // Smoothly scroll back to the flipbook reader stage
    const readerElement = document.getElementById("flipbook-reader-stage");
    if (readerElement) {
      readerElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="animate-in-subtle space-y-10 pb-16">
      {/* Header Banner */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4 text-accent-warm" />
              <span>Interactive Print Archive</span>
            </div>
            <h1 className="editorial-heading mt-1 text-3xl font-normal sm:text-4xl lg:text-5xl">
              Our Tabloids
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Explore the digital editions of The HIT Times print newspaper. Flip through the pages
              with realistic paper animations, high-fidelity typography, and archives dating back to 2017.
            </p>
          </div>

          {/* Quick Issue Picker */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground mr-1">
              Jump to:
            </span>
            {TABLOID_ISSUES.slice(0, 5).map((issue) => (
              <button
                key={issue.id}
                onClick={() => handleSelectIssue(issue)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedIssue.id === issue.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                Issue {issue.issueNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="section-divider-accent my-4" />
      </header>

      {/* Main Interactive Flipbook Stage */}
      <section id="flipbook-reader-stage" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Reading: <span className="text-primary">{selectedIssue.title}</span>
            </h2>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {selectedIssue.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="h-4 w-4 text-accent-warm" />
            <span>Turn pages by clicking corners, dragging, or using keyboard arrows</span>
          </div>
        </div>

        {/* Digital Flipbook Component */}
        <DigitalFlipbook
          key={selectedIssue.id}
          issue={selectedIssue}
          onSelectIssue={(id) => {
            const found = TABLOID_ISSUES.find((item) => item.id === id);
            if (found) setSelectedIssue(found);
          }}
        />
      </section>

      {/* Issue Archive Collection */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="editorial-heading text-2xl font-normal sm:text-3xl">
              All Print Editions
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Click any tabloid cover to open and flip pages in the reader above.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Layers className="h-4 w-4 text-primary" />
            <span>{TABLOID_ISSUES.length} Editions Available</span>
          </div>
        </div>

        <Separator className="bg-border-strong" />

        {/* Grid of Issues */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
          {TABLOID_ISSUES.map((issue) => {
            const isCurrent = issue.id === selectedIssue.id;

            return (
              <Card
                key={issue.id}
                onClick={() => handleSelectIssue(issue)}
                className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isCurrent
                    ? "border-primary ring-2 ring-primary/40 shadow-lg"
                    : "border-border/80 hover:border-primary/60"
                }`}
              >
                {/* Cover Thumbnail */}
                <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={issue.thumbnailUrl}
                    alt={issue.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

                  {/* Active Indicator Badge */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-md">
                      Reading Now
                    </div>
                  )}

                  {/* Year Tag */}
                  {issue.date && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      <Calendar className="h-2.5 w-2.5 text-accent-warm" />
                      <span>{issue.date}</span>
                    </div>
                  )}
                </div>

                {/* Content info */}
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-primary transition-colors">
                      {issue.title}
                    </h3>
                  </div>
                  <p className="line-clamp-1 mt-0.5 text-xs text-muted-foreground">
                    {issue.subtitle}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-1 border-t border-border/60 pt-2 text-[11px]">
                    <span className="font-semibold text-primary group-hover:underline flex items-center gap-0.5">
                      Flip Pages <ArrowRight className="h-3 w-3 inline" />
                    </span>

                    <a
                      href={issue.drivePreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground"
                      title="Open in Drive"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
