"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AuditData {
  businessName: string;
  overallScore: number;
  scores: {
    technical: { score: number; reason: string };
    seo: { score: number; reason: string };
    ai: { score: number; reason: string };
    conversion: { score: number; reason: string };
    competitive: { score: number; reason: string };
  };
  issues: string[];
  recommendations: {
    text: string;
    impact: string;
  }[];
  signalsSummary?: string;
  signals?: any; // typed in html-analyzer
}

interface AuditContextType {
  auditData: AuditData | null;
  setAuditData: (data: AuditData | null) => void;
  isUnlocked: boolean;
  setIsUnlocked: (val: boolean) => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <AuditContext.Provider
      value={{ auditData, setAuditData, isUnlocked, setIsUnlocked }}
    >
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error("useAudit must be used within an AuditProvider");
  }
  return context;
}
