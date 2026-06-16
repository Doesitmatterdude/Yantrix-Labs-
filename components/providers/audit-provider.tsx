"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AuditData {
  businessName: string;
  overallScore: number;
  scores: {
    technical: number;
    seo: number;
    ai: number;
    conversion: number;
    competitive: number;
  };
  issues: string[];
  recommendations: {
    text: string;
    impact: string;
  }[];
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
