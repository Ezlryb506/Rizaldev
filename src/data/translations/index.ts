import { coreTranslations } from "./core";
import { techStackTranslations } from "./tech-stack";
import { projectsTranslations } from "./projects";
import { servicesTranslations } from "./services";
import { contactTranslations } from "./contact";

type CombinedTranslationEn = typeof coreTranslations.en &
  typeof techStackTranslations.en &
  typeof projectsTranslations.en &
  typeof servicesTranslations.en &
  typeof contactTranslations.en;

type CombinedTranslationId = typeof coreTranslations.id &
  typeof techStackTranslations.id &
  typeof projectsTranslations.id &
  typeof servicesTranslations.id &
  typeof contactTranslations.id;

export const translations = {
  en: {
    ...coreTranslations.en,
    ...techStackTranslations.en,
    ...projectsTranslations.en,
    ...servicesTranslations.en,
    ...contactTranslations.en,
  } satisfies CombinedTranslationEn,
  id: {
    ...coreTranslations.id,
    ...techStackTranslations.id,
    ...projectsTranslations.id,
    ...servicesTranslations.id,
    ...contactTranslations.id,
  } satisfies CombinedTranslationId,
} as const;

export * from "./core";
export * from "./tech-stack";
export * from "./projects";
export * from "./services";
export * from "./contact";
