#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 *  Senior Trusted Home Care — SEO Micro-Page Generator
 * ═══════════════════════════════════════════════════════════════
 *
 *  Generates hundreds of unique, SEO-optimized landing pages
 *  targeting every [service] × [city/neighborhood] combination
 *  plus audience-specific variations.
 *
 *  MATRIX:
 *    8 services  ×  44 locations  =  352 service-city pages
 *    44 city-only pages  (city hub pages)
 *    8 service-only pages (service detail pages)
 *    + audience keyword variations (e.g. "elderly care", "senior care",
 *      "aging parent care", "Alzheimer's care near me")
 *
 *  USAGE:
 *    node generate.cjs                 → generate all pages
 *    node generate.cjs --sitemap-only  → only regenerate sitemap.xml
 *
 *  OUTPUT:  ../dist/  folder structure:
 *    /dist/sitemap.xml
 *    /dist/robots.txt
 *    /dist/services/index.html                   (services hub)
 *    /dist/services/[service-slug]/index.html     (8 service pages)
 *    /dist/areas/index.html                       (areas hub)
 *    /dist/areas/[city-slug]/index.html            (44 city pages)
 *    /dist/[service-slug]/[city-slug]/index.html   (352 combo pages)
 *    /dist/[audience-slug]/[city-slug]/index.html  (audience pages)
 * ═══════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// ─── CONFIG ─────────────────────────────────────────────────
const DOMAIN = 'https://zbracko.github.io/click2-homehealth';
const DIST = path.join(__dirname, '..', 'dist');
const PHONE = '561-621-5700';
const PHONE_HREF = 'tel:+15616215700';
const COMPANY = 'Senior Trusted Home Care';
const ADDRESS = '8480 Okeechobee Blvd, West Palm Beach, FL 33411';
const LICENSE = '299996655';
const API_URL = 'https://rxxofwqrb6.execute-api.us-east-1.amazonaws.com/prod/lead';
const LOGO_PATH = '../../Logotext.png';
const CSS_PATH = '../../styles.css';
const MAIN_PAGE = 'https://zbracko.github.io/click2-homehealth/';

// ─── SERVICES ───────────────────────────────────────────────
const SERVICES = [
  {
    slug: 'companionship-care',
    name: 'Companionship & Support',
    shortName: 'Companionship Care',
    headline: 'Compassionate Companionship',
    keywords: ['companionship care', 'senior companion', 'elderly companionship', 'companion caregiver', 'friendship for seniors', 'social engagement elderly'],
    description: 'Genuine companionship and emotional support to help seniors feel valued, connected, and engaged.',
    longDesc: 'Our companionship caregivers provide friendly conversation, accompany seniors on outings, share hobbies and activities, assist with errands, and simply offer a warm, caring presence. Loneliness and social isolation are major health risks for older adults — our companions help combat both while encouraging mental stimulation and joy.',
    benefits: [
      'Reduces loneliness and social isolation',
      'Encourages mental stimulation through activities and conversation',
      'Accompaniment to appointments, shopping, and social events',
      'Meal companionship and light meal preparation',
      'Hobby engagement — cards, puzzles, gardening, reading aloud',
      'Emotional support and a trusted friendly presence',
    ],
    faqs: [
      { q: 'What does a companion caregiver do?', a: 'A companion caregiver provides social interaction, accompanies your loved one on outings, assists with light tasks, and offers emotional support to combat loneliness.' },
      { q: 'How many hours per week can I schedule companionship care?', a: 'We offer flexible scheduling — from a few hours per week to full-day companionship, 7 days a week. Plans are customized to your needs.' },
      { q: 'Is companionship care covered by insurance?', a: 'Some long-term care insurance policies cover companion services. We can help you check your eligibility and maximize any available benefits.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    badge: 'Most Popular',
  },
  {
    slug: 'personal-care',
    name: 'Personal Care',
    shortName: 'Personal Care',
    headline: 'Dignified Personal Care',
    keywords: ['personal care aide', 'bathing assistance', 'grooming help elderly', 'ADL assistance', 'personal hygiene care', 'dressing assistance seniors'],
    description: 'Personalized assistance with bathing, grooming, dressing, toileting, and mobility.',
    longDesc: 'Our trained personal care aides help with Activities of Daily Living (ADLs) including bathing, shower assistance, grooming, oral care, dressing, toileting, incontinence care, and safe transfers and mobility. Every interaction is handled with dignity, patience, and respect for your loved one\'s preferences and comfort level.',
    benefits: [
      'Bathing and shower assistance with safety protocols',
      'Grooming — hair care, shaving, nail care, oral hygiene',
      'Dressing assistance respecting personal preferences',
      'Toileting and incontinence care with dignity',
      'Safe transfers and mobility assistance',
      'Skin care and basic wound monitoring',
    ],
    faqs: [
      { q: 'What are Activities of Daily Living (ADLs)?', a: 'ADLs include bathing, dressing, grooming, eating, toileting, and transferring. Our caregivers assist with any or all of these while preserving independence.' },
      { q: 'Will I have the same caregiver each visit?', a: 'We prioritize consistency. Most clients have a primary caregiver with a backup for scheduling flexibility, ensuring your loved one is always comfortable.' },
      { q: 'Do your caregivers have special training?', a: 'Yes. All personal care aides complete state-certified training, background checks, and ongoing education in senior care best practices.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    badge: 'Essential Care',
  },
  {
    slug: 'light-housekeeping',
    name: 'Light Household Help',
    shortName: 'Light Housekeeping',
    headline: 'Reliable Household Assistance',
    keywords: ['light housekeeping seniors', 'meal preparation elderly', 'laundry help seniors', 'home helper', 'household assistance', 'senior home help'],
    description: 'Light cleaning, laundry, meal preparation, and dishwashing so clients can live safely at home.',
    longDesc: 'A tidy, organized home is essential for senior safety and well-being. Our caregivers handle light housekeeping duties including vacuuming, dusting, kitchen cleaning, laundry, bed-making, meal preparation according to dietary needs, and dishwashing — so your loved one can focus on health and enjoyment rather than chores.',
    benefits: [
      'Light cleaning — vacuuming, dusting, bathroom tidying',
      'Laundry — washing, drying, folding, putting away',
      'Meal preparation tailored to dietary needs and preferences',
      'Dishwashing and kitchen organization',
      'Bed-making and linen changes',
      'Grocery shopping and errand assistance',
    ],
    faqs: [
      { q: 'Is this the same as a cleaning service?', a: 'Our light housekeeping focuses on maintaining a safe living environment for seniors — not deep cleaning. It is part of a holistic caregiving plan, not standalone janitorial service.' },
      { q: 'Can caregivers prepare meals for special diets?', a: 'Absolutely. Our caregivers can follow diabetic, low-sodium, heart-healthy, soft-food, and other medically recommended diets.' },
      { q: 'Will caregivers handle grocery shopping?', a: 'Yes. Caregivers can accompany your loved one to the store or handle shopping independently from a list.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    badge: 'Daily Living',
  },
  {
    slug: 'medication-reminders',
    name: 'Medication Reminders & Safety Checks',
    shortName: 'Medication Reminders',
    headline: 'Medication Reminders & Home Safety',
    keywords: ['medication reminders seniors', 'medication management elderly', 'pill reminder service', 'safety checks elderly', 'fall prevention seniors', 'home safety checks'],
    description: 'Timely medication reminders and safety checks to help seniors stay on schedule and maintain a secure living environment.',
    longDesc: 'Missed medications and unsafe home conditions are leading causes of senior hospitalizations. Our caregivers provide structured medication reminders, help organize pill boxes, monitor for potential side effects, and conduct regular safety checks of the home environment — including fall hazard assessment and emergency preparedness.',
    benefits: [
      'Scheduled medication reminders — never miss a dose',
      'Pill box organization and refill tracking',
      'Monitoring for medication side effects or reactions',
      'Home safety assessments — fall hazard identification',
      'Regular wellness check-ins and vital sign monitoring',
      'Emergency response coordination with family and doctors',
    ],
    faqs: [
      { q: 'Can caregivers administer medications?', a: 'Our caregivers provide reminders and assistance — they remind, open containers, and ensure the right pill is taken at the right time. Actual administration of injections or medical procedures requires licensed nursing staff.' },
      { q: 'What safety checks are performed?', a: 'We check for trip hazards, proper lighting, bathroom safety bars, fire safety, expired food, and overall living condition cleanliness.' },
      { q: 'How often should safety checks happen?', a: 'We recommend daily or every-visit checks for fall risks, plus monthly comprehensive home safety assessments.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    badge: 'Safety First',
  },
  {
    slug: 'memory-care',
    name: 'Memory Loss Care',
    shortName: 'Memory Care',
    headline: 'Compassionate Memory Care',
    keywords: ['memory care', 'Alzheimer\'s care', 'dementia care', 'memory loss support', 'cognitive decline care', 'Alzheimer\'s caregiver'],
    description: 'Gentle, structured support for individuals living with Alzheimer\'s or other forms of dementia.',
    longDesc: 'Caring for a loved one with Alzheimer\'s or dementia requires specialized training, patience, and empathy. Our memory care professionals create safe, familiar environments while encouraging mental engagement through structured routines, cognitive exercises, music therapy, and reminiscence activities. We support both the individual and the family through every stage.',
    benefits: [
      'Trained Alzheimer\'s and dementia caregivers',
      'Structured daily routines to reduce confusion and anxiety',
      'Cognitive stimulation — puzzles, music, reminiscence therapy',
      'Wandering prevention and safety monitoring',
      'Behavioral management with patience and de-escalation',
      'Family education, support, and respite care',
    ],
    faqs: [
      { q: 'What makes memory care different from regular personal care?', a: 'Memory care caregivers receive specialized training in dementia communication, behavioral management, structured routines, and safety protocols specific to cognitive decline.' },
      { q: 'Can you help with sundowning episodes?', a: 'Yes. Our caregivers are trained in sundowning management techniques including calming environments, redirection, structured evening routines, and de-escalation.' },
      { q: 'Do you offer respite care for family caregivers?', a: 'Absolutely. Caregiver burnout is real. We offer flexible respite care so family members can rest, run errands, or simply recharge.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
    badge: 'Specialized',
  },
  {
    slug: 'facility-care',
    name: 'Personal Care in Facilities',
    shortName: 'Facility Care',
    headline: 'Enhanced Facility Care',
    keywords: ['assisted living care', 'nursing home companion', 'facility personal care', 'extra care assisted living', 'supplemental senior care', 'one-on-one facility care'],
    description: 'Personalized care for residents in assisted living or nursing facilities who need extra support.',
    longDesc: 'Many assisted living and nursing facility residents need more individual attention than staff-to-patient ratios allow. Our caregivers provide one-on-one supplemental care inside facilities — companionship, personal care assistance, meal help, and advocacy to ensure your loved one receives the attention they deserve.',
    benefits: [
      'One-on-one attention supplementing facility staff',
      'Companionship during meals, activities, and outings',
      'Personal care assistance — bathing, grooming, dressing',
      'Advocacy with facility staff for better outcomes',
      'Transition support when moving into a new facility',
      'Family communication and regular care updates',
    ],
    faqs: [
      { q: 'Can a private caregiver work inside an assisted living facility?', a: 'Yes. Most facilities welcome supplemental private caregivers. We coordinate with facility management to ensure seamless collaboration.' },
      { q: 'Why would my loved one need extra care in a facility?', a: 'Facility staff ratios often mean limited one-on-one time. A private caregiver ensures personalized attention, consistent companionship, and advocacy for your loved one\'s needs.' },
      { q: 'How does billing work for facility-based care?', a: 'Facility fees and our private care fees are separate. We bill directly and can coordinate with long-term care insurance if applicable.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    badge: 'Facility Support',
  },
  {
    slug: 'post-surgery-care',
    name: 'Post Surgery Care',
    shortName: 'Post-Surgery Care',
    headline: 'Post-Surgery Recovery Care',
    keywords: ['post surgery care', 'after surgery caregiver', 'recovery care at home', 'post-op home care', 'surgical recovery help', 'hospital discharge care'],
    description: 'Smooth, comfortable recovery at home with assistance for mobility, wound care reminders, and medication support.',
    longDesc: 'Recovering from surgery at home is proven to accelerate healing — but only when proper support is in place. Our post-surgery caregivers assist with mobility, pain management monitoring, wound care reminders, medication schedules, meal preparation, personal hygiene, and transportation to follow-up appointments. We help prevent complications and re-hospitalization.',
    benefits: [
      'Safe mobility assistance — getting up, walking, stairs',
      'Wound care reminders and incision monitoring',
      'Medication schedule management and pain monitoring',
      'Nutritious meal preparation for faster healing',
      'Transportation to follow-up appointments',
      'Reducing re-hospitalization and post-op complications',
    ],
    faqs: [
      { q: 'How soon after surgery can home care start?', a: 'Care can begin the same day of hospital discharge. We recommend scheduling in advance so your caregiver is ready when you arrive home.' },
      { q: 'How long is post-surgery care typically needed?', a: 'It varies by procedure — from a few days for minor surgery to several weeks for joint replacements or cardiac surgery. We create flexible plans that adjust as recovery progresses.' },
      { q: 'Do your caregivers perform wound care?', a: 'Our caregivers provide wound care reminders, assist with bandage changes per doctor instructions, and monitor for signs of infection — but complex medical wound care requires a licensed nurse.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    badge: 'Recovery',
  },
  {
    slug: '24-hour-live-in-care',
    name: '24-Hour Live-In Care',
    shortName: '24/7 Live-In Care',
    headline: 'Round-the-Clock Live-In Care',
    keywords: ['24 hour home care', 'live-in caregiver', 'around the clock care', 'overnight caregiver', '24/7 senior care', 'full-time home care'],
    description: 'Continuous support with a dedicated caregiver on-site day and night.',
    longDesc: 'For seniors who need constant supervision, our 24-hour live-in care provides a dedicated caregiver on-site around the clock. From personal care and meals to medication reminders and emergency response, your loved one always has skilled help within arm\'s reach. Live-in care is often more affordable and more comfortable than facility placement.',
    benefits: [
      'Dedicated caregiver on-site 24 hours a day',
      'Night-time assistance — bathroom trips, repositioning, emergencies',
      'All meals prepared and medication schedules maintained',
      'Continuous safety monitoring and fall prevention',
      'Often more affordable than assisted living facilities',
      'Your loved one stays in the comfort of their own home',
    ],
    faqs: [
      { q: 'How does 24-hour care work?', a: 'A dedicated live-in caregiver stays in the home full-time. For continuous awake coverage overnight, we rotate caregivers in shifts to ensure alertness.' },
      { q: 'Is 24-hour home care cheaper than a nursing home?', a: 'In many cases, yes. The average nursing home in Florida costs $8,000-$10,000/month. Live-in home care can be comparable or less, with the benefit of staying in a familiar environment.' },
      { q: 'What if I need care starting immediately?', a: 'We can often begin 24-hour care within 24-48 hours. For urgent situations, we have emergency placement protocols.' },
    ],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    badge: '24/7 Support',
  },
];

// ─── LOCATIONS ──────────────────────────────────────────────
const LOCATIONS = [
  // WEST PALM BEACH & NEIGHBORHOODS
  { slug: 'west-palm-beach', name: 'West Palm Beach', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33401', nearby: ['Palm Beach Gardens', 'Lake Worth Beach', 'Riviera Beach'] },
  { slug: 'northwood', name: 'Northwood', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33407', nearby: ['West Palm Beach', 'Riviera Beach', 'Palm Beach Gardens'] },
  { slug: 'el-cid', name: 'El Cid', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33401', nearby: ['West Palm Beach', 'Flamingo Park', 'Grandview Heights'] },
  { slug: 'flamingo-park', name: 'Flamingo Park', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33401', nearby: ['West Palm Beach', 'El Cid', 'South End'] },
  { slug: 'grandview-heights', name: 'Grandview Heights', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33405', nearby: ['West Palm Beach', 'El Cid', 'South End'] },
  { slug: 'south-end', name: 'South End', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33405', nearby: ['West Palm Beach', 'Grandview Heights', 'Lake Worth Beach'] },
  { slug: 'prospect-park', name: 'Prospect Park', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33405', nearby: ['West Palm Beach', 'South End', 'Lake Worth Beach'] },
  { slug: 'palm-beach-lakes', name: 'Palm Beach Lakes', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33401', nearby: ['West Palm Beach', 'Northwood', 'Century Village'] },
  { slug: 'westgate', name: 'Westgate', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33411', nearby: ['West Palm Beach', 'Palm Springs', 'Greenacres'] },
  { slug: 'century-village', name: 'Century Village', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach', zip: '33409', nearby: ['West Palm Beach', 'Palm Beach Lakes', 'Westgate'] },
  { slug: 'village-of-palm-springs', name: 'Village of Palm Springs', county: 'Palm Beach', state: 'FL', region: 'West Palm Beach Area', zip: '33461', nearby: ['West Palm Beach', 'Lake Worth Beach', 'Greenacres'] },
  { slug: 'palm-beach-gardens', name: 'Palm Beach Gardens', county: 'Palm Beach', state: 'FL', region: 'North Palm Beach', zip: '33410', nearby: ['Jupiter', 'North Palm Beach', 'Juno Beach'] },

  // PALM BEACH COUNTY
  { slug: 'palm-beach', name: 'Palm Beach', county: 'Palm Beach', state: 'FL', region: 'Town of Palm Beach', zip: '33480', nearby: ['West Palm Beach', 'Lake Worth Beach', 'Lantana'] },
  { slug: 'lake-worth-beach', name: 'Lake Worth Beach', county: 'Palm Beach', state: 'FL', region: 'Central County', zip: '33460', nearby: ['West Palm Beach', 'Lantana', 'Boynton Beach'] },
  { slug: 'lantana', name: 'Lantana', county: 'Palm Beach', state: 'FL', region: 'Central County', zip: '33462', nearby: ['Lake Worth Beach', 'Boynton Beach', 'West Palm Beach'] },
  { slug: 'boynton-beach', name: 'Boynton Beach', county: 'Palm Beach', state: 'FL', region: 'South County', zip: '33426', nearby: ['Delray Beach', 'Lantana', 'Lake Worth Beach'] },
  { slug: 'delray-beach', name: 'Delray Beach', county: 'Palm Beach', state: 'FL', region: 'South County', zip: '33483', nearby: ['Boca Raton', 'Boynton Beach', 'Highland Beach'] },
  { slug: 'boca-raton', name: 'Boca Raton', county: 'Palm Beach', state: 'FL', region: 'South County', zip: '33432', nearby: ['Delray Beach', 'Deerfield Beach', 'Coconut Creek'] },
  { slug: 'jupiter', name: 'Jupiter', county: 'Palm Beach', state: 'FL', region: 'North County', zip: '33458', nearby: ['Palm Beach Gardens', 'Juno Beach', 'Tequesta'] },
  { slug: 'juno-beach', name: 'Juno Beach', county: 'Palm Beach', state: 'FL', region: 'North County', zip: '33408', nearby: ['Jupiter', 'Palm Beach Gardens', 'North Palm Beach'] },
  { slug: 'tequesta', name: 'Tequesta', county: 'Palm Beach', state: 'FL', region: 'North County', zip: '33469', nearby: ['Jupiter', 'Juno Beach', 'Palm Beach Gardens'] },
  { slug: 'north-palm-beach', name: 'North Palm Beach', county: 'Palm Beach', state: 'FL', region: 'North County', zip: '33408', nearby: ['Palm Beach Gardens', 'Juno Beach', 'Riviera Beach'] },
  { slug: 'royal-palm-beach', name: 'Royal Palm Beach', county: 'Palm Beach', state: 'FL', region: 'Western Communities', zip: '33411', nearby: ['Wellington', 'West Palm Beach', 'Loxahatchee'] },
  { slug: 'wellington', name: 'Wellington', county: 'Palm Beach', state: 'FL', region: 'Western Communities', zip: '33414', nearby: ['Royal Palm Beach', 'West Palm Beach', 'Greenacres'] },
  { slug: 'greenacres', name: 'Greenacres', county: 'Palm Beach', state: 'FL', region: 'Central County', zip: '33463', nearby: ['West Palm Beach', 'Lake Worth Beach', 'Wellington'] },
  { slug: 'riviera-beach', name: 'Riviera Beach', county: 'Palm Beach', state: 'FL', region: 'Central County', zip: '33404', nearby: ['West Palm Beach', 'North Palm Beach', 'Palm Beach Gardens'] },
  { slug: 'lake-park', name: 'Lake Park', county: 'Palm Beach', state: 'FL', region: 'North County', zip: '33403', nearby: ['North Palm Beach', 'Riviera Beach', 'Palm Beach Gardens'] },
  { slug: 'loxahatchee', name: 'Loxahatchee', county: 'Palm Beach', state: 'FL', region: 'Western Communities', zip: '33470', nearby: ['Royal Palm Beach', 'Wellington', 'West Palm Beach'] },

  // BROWARD COUNTY
  { slug: 'fort-lauderdale', name: 'Fort Lauderdale', county: 'Broward', state: 'FL', region: 'Central Broward', zip: '33301', nearby: ['Plantation', 'Sunrise', 'Hollywood'] },
  { slug: 'pompano-beach', name: 'Pompano Beach', county: 'Broward', state: 'FL', region: 'North Broward', zip: '33060', nearby: ['Deerfield Beach', 'Coconut Creek', 'Fort Lauderdale'] },
  { slug: 'deerfield-beach', name: 'Deerfield Beach', county: 'Broward', state: 'FL', region: 'North Broward', zip: '33441', nearby: ['Boca Raton', 'Pompano Beach', 'Coconut Creek'] },
  { slug: 'coral-springs', name: 'Coral Springs', county: 'Broward', state: 'FL', region: 'West Broward', zip: '33065', nearby: ['Parkland', 'Coconut Creek', 'Margate'] },
  { slug: 'coconut-creek', name: 'Coconut Creek', county: 'Broward', state: 'FL', region: 'North Broward', zip: '33073', nearby: ['Pompano Beach', 'Deerfield Beach', 'Coral Springs'] },
  { slug: 'margate', name: 'Margate', county: 'Broward', state: 'FL', region: 'North Broward', zip: '33063', nearby: ['Coral Springs', 'Coconut Creek', 'Tamarac'] },
  { slug: 'parkland', name: 'Parkland', county: 'Broward', state: 'FL', region: 'West Broward', zip: '33076', nearby: ['Coral Springs', 'Coconut Creek', 'Boca Raton'] },
  { slug: 'plantation', name: 'Plantation', county: 'Broward', state: 'FL', region: 'Central Broward', zip: '33317', nearby: ['Fort Lauderdale', 'Sunrise', 'Davie'] },
  { slug: 'sunrise', name: 'Sunrise', county: 'Broward', state: 'FL', region: 'Central Broward', zip: '33351', nearby: ['Plantation', 'Fort Lauderdale', 'Tamarac'] },
  { slug: 'hollywood', name: 'Hollywood', county: 'Broward', state: 'FL', region: 'South Broward', zip: '33020', nearby: ['Fort Lauderdale', 'Pembroke Pines', 'Hallandale Beach'] },
  { slug: 'pembroke-pines', name: 'Pembroke Pines', county: 'Broward', state: 'FL', region: 'South Broward', zip: '33024', nearby: ['Hollywood', 'Miramar', 'Davie'] },
  { slug: 'davie', name: 'Davie', county: 'Broward', state: 'FL', region: 'Central Broward', zip: '33314', nearby: ['Fort Lauderdale', 'Plantation', 'Hollywood'] },
  { slug: 'weston', name: 'Weston', county: 'Broward', state: 'FL', region: 'West Broward', zip: '33326', nearby: ['Pembroke Pines', 'Davie', 'Miramar'] },
  { slug: 'miramar', name: 'Miramar', county: 'Broward', state: 'FL', region: 'South Broward', zip: '33023', nearby: ['Pembroke Pines', 'Hollywood', 'Weston'] },
  { slug: 'hallandale-beach', name: 'Hallandale Beach', county: 'Broward', state: 'FL', region: 'South Broward', zip: '33009', nearby: ['Hollywood', 'Aventura', 'Pembroke Pines'] },
  { slug: 'tamarac', name: 'Tamarac', county: 'Broward', state: 'FL', region: 'North Broward', zip: '33321', nearby: ['Margate', 'Sunrise', 'Coral Springs'] },
];

// ─── AUDIENCE VARIATIONS (extra keyword pages) ──────────────
const AUDIENCES = [
  { slug: 'elderly-care', name: 'Elderly Care', keywords: ['elderly care', 'care for elderly', 'elderly home care', 'aging parent care'], headline: 'Trusted Elderly Care', description: 'Compassionate home care services designed specifically for elderly adults who want to age safely and comfortably at home.' },
  { slug: 'senior-care', name: 'Senior Care', keywords: ['senior care', 'senior home care', 'senior in-home care', 'senior care services'], headline: 'Professional Senior Care', description: 'Professional in-home senior care services including companionship, personal care, and 24/7 support for aging adults.' },
  { slug: 'home-health-aide', name: 'Home Health Aide', keywords: ['home health aide', 'HHA services', 'certified home health aide', 'home health aide near me'], headline: 'Certified Home Health Aides', description: 'Certified, background-checked home health aides providing skilled assistance with daily living activities in your home.' },
  { slug: 'caregiver-services', name: 'Caregiver Services', keywords: ['caregiver services', 'professional caregiver', 'in-home caregiver', 'private caregiver'], headline: 'Professional Caregiver Services', description: 'Licensed, insured, and bonded professional caregiver services for families across South Florida.' },
  { slug: 'respite-care', name: 'Respite Care', keywords: ['respite care', 'family caregiver relief', 'short-term care', 'temporary caregiver'], headline: 'Flexible Respite Care', description: 'Give yourself a break. Our respite care provides temporary relief for family caregivers while ensuring your loved one receives expert attention.' },
  { slug: 'alzheimers-care', name: "Alzheimer's Care", keywords: ["Alzheimer's care", 'Alzheimer caregiver', "Alzheimer's home care", 'dementia home care'], headline: "Specialized Alzheimer's Care", description: "Expert Alzheimer's and dementia care at home with trained caregivers who understand cognitive decline, behavioral changes, and family support needs." },
  { slug: 'aging-in-place', name: 'Aging in Place', keywords: ['aging in place', 'age at home', 'stay at home senior', 'home instead of nursing home'], headline: 'Aging in Place Support', description: 'Everything your loved one needs to safely age in the comfort of their own home — from daily living help to 24/7 live-in care.' },
  { slug: 'veteran-home-care', name: 'Veteran Home Care', keywords: ['veteran home care', 'VA home care', 'veteran caregiver', 'Aid and Attendance'], headline: 'Home Care for Veterans', description: 'Specialized home care services for veterans. We can help navigate VA Aid & Attendance benefits to cover the cost of in-home care.' },
];

// ─── HELPERS ────────────────────────────────────────────────
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escAttr(s) { return s.replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function depthPrefix(depth) {
  return '../'.repeat(depth);
}

// ─── BUILD SCHEMA.ORG JSON-LD ───────────────────────────────
function buildSchema(pageTitle, pageDesc, pageUrl, location) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeHealthCareService",
    "name": COMPANY,
    "url": pageUrl,
    "description": pageDesc,
    "telephone": PHONE,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8480 Okeechobee Blvd",
      "addressLocality": "West Palm Beach",
      "addressRegion": "FL",
      "postalCode": "33411",
      "addressCountry": "US"
    },
    "areaServed": location ? {
      "@type": "City",
      "name": location.name,
      "containedInPlace": { "@type": "State", "name": "Florida" }
    } : {
      "@type": "State",
      "name": "Florida"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };
  return JSON.stringify(schema, null, 2);
}

// ─── TESTIMONIALS PER LOCATION TYPE ─────────────────────────
function getTestimonial(location, service) {
  const firstNames = ['Maria', 'James', 'Linda', 'Robert', 'Patricia', 'Michael', 'Jennifer', 'William', 'Elizabeth', 'David', 'Susan', 'Richard', 'Barbara', 'Joseph', 'Dorothy', 'Thomas', 'Margaret', 'Charles', 'Lisa', 'Daniel'];
  const lastInits = ['R.', 'S.', 'T.', 'M.', 'K.', 'J.', 'B.', 'W.', 'D.', 'H.', 'P.', 'G.', 'C.', 'L.', 'A.', 'N.', 'F.', 'V.', 'E.', 'O.'];
  const idx = (location.slug.length + (service ? service.slug.length : 0)) % firstNames.length;
  const name = `${firstNames[idx]} ${lastInits[(idx + 3) % lastInits.length]}`;

  const quotes = [
    `"${COMPANY} has been a blessing for our family. The caregiver assigned to my mother in ${location.name} is kind, professional, and truly cares. We couldn't ask for better."`,
    `"Finding quality ${service ? service.shortName.toLowerCase() : 'home care'} in ${location.name} was stressful until we found ${COMPANY}. They made the whole process easy and our dad is happier than ever."`,
    `"The team at ${COMPANY} went above and beyond. Living in ${location.name}, we needed reliable ${service ? service.shortName.toLowerCase() : 'care'} and they delivered from day one."`,
    `"After my mother's surgery, ${COMPANY} provided incredible ${service ? service.shortName.toLowerCase() : 'support'} at our ${location.name} home. The caregiver was attentive, gentle, and absolutely wonderful."`,
    `"We interviewed several agencies in ${location.name} and ${COMPANY} stood out — licensed, insured, and genuinely compassionate. Five stars isn't enough."`,
  ];
  const quoteIdx = (idx + (service ? service.slug.length : 7)) % quotes.length;

  return { name, quote: quotes[quoteIdx], location: `${location.name}, FL` };
}

// ─── PAGE TEMPLATE ──────────────────────────────────────────
function buildPage({ title, metaDesc, h1, h2, bodyHtml, breadcrumbs, canonicalUrl, keywords, schema, depth }) {
  const prefix = depthPrefix(depth);
  const cssHref = `${prefix}styles.css?v=18`;
  const logoHref = `${prefix}Logotext.png`;
  const homeHref = MAIN_PAGE;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escAttr(metaDesc)}">
  <meta name="keywords" content="${escAttr(keywords.join(', '))}">
  <meta property="og:title" content="${escAttr(title)}">
  <meta property="og:description" content="${escAttr(metaDesc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="canonical" href="${canonicalUrl}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssHref}">

  <script type="application/ld+json">
${schema}
  </script>

  <style>
    /* Micro-page overrides */
    .micro-hero{position:relative;padding:5rem var(--px) 4rem;background:var(--dark);color:var(--white);text-align:center;overflow:hidden}
    .micro-hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 500px 400px at 20% 30%,rgba(58,175,169,.08) 0%,transparent 70%),radial-gradient(ellipse 400px 400px at 80% 70%,rgba(138,79,250,.05) 0%,transparent 70%)}
    .micro-hero__badge{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:1.25rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:.4rem 1rem;border-radius:100px}
    .micro-hero__badge-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);animation:dotPulse 2s ease-in-out infinite}
    .micro-hero h1{font-size:clamp(1.8rem,1.4rem+2vw,3.2rem);font-weight:900;line-height:1.08;margin-bottom:1rem;letter-spacing:-.5px}
    .micro-hero h1 span{background:linear-gradient(135deg,var(--teal),var(--accent-purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .micro-hero p{font-size:clamp(.95rem,.9rem+.3vw,1.1rem);color:rgba(255,255,255,.55);max-width:640px;margin:0 auto 2rem;line-height:1.7}
    .micro-hero__actions{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}

    .micro-breadcrumb{padding:.75rem var(--px);background:var(--off-white);border-bottom:1px solid var(--g100);font-size:.72rem;font-weight:600;color:var(--g400)}
    .micro-breadcrumb a{color:var(--blue);text-decoration:none}
    .micro-breadcrumb a:hover{color:var(--teal);text-decoration:underline}
    .micro-breadcrumb span{margin:0 .4rem}

    .micro-content{padding:4rem var(--px);max-width:900px;margin:0 auto}
    .micro-content h2{font-size:clamp(1.4rem,1.2rem+1vw,2rem);font-weight:900;color:var(--g900);margin:2.5rem 0 1rem;line-height:1.15;letter-spacing:-.3px}
    .micro-content h3{font-size:clamp(1rem,.95rem+.4vw,1.25rem);font-weight:800;color:var(--g800);margin:2rem 0 .75rem}
    .micro-content p{font-size:clamp(.9rem,.88rem+.2vw,1rem);color:var(--g600);line-height:1.85;margin-bottom:1.25rem}
    .micro-content ul{list-style:none;padding:0;margin:0 0 1.5rem}
    .micro-content ul li{position:relative;padding:.6rem 0 .6rem 1.75rem;font-size:.92rem;color:var(--g600);line-height:1.6;border-bottom:1px solid var(--g100)}
    .micro-content ul li::before{content:'✓';position:absolute;left:0;color:var(--teal);font-weight:700}
    .micro-content ul li:last-child{border-bottom:none}

    .micro-faq{margin:3rem 0}
    .micro-faq details{border-bottom:1px solid var(--g200);padding:0}
    .micro-faq summary{display:flex;justify-content:space-between;align-items:center;padding:1.2rem 0;font-size:.95rem;font-weight:700;color:var(--g900);cursor:pointer;list-style:none}
    .micro-faq summary::-webkit-details-marker{display:none}
    .micro-faq summary::after{content:'+';font-size:1.2rem;color:var(--g400);transition:transform .3s}
    .micro-faq details[open] summary::after{content:'−';color:var(--teal)}
    .micro-faq details[open] summary{color:var(--blue)}
    .micro-faq .faq-answer{padding:0 0 1.25rem;font-size:.9rem;color:var(--g500);line-height:1.8}

    .micro-testimonial{background:linear-gradient(135deg,rgba(15,98,254,.03),rgba(138,79,250,.02));border:1px solid var(--g200);border-radius:var(--radius-lg);padding:2rem;margin:2.5rem 0;position:relative}
    .micro-testimonial::before{content:'"';position:absolute;top:-.15rem;left:1rem;font-size:4rem;color:var(--teal);opacity:.3;font-family:Georgia,serif;line-height:1}
    .micro-testimonial blockquote{font-size:.95rem;font-style:italic;color:var(--g700);line-height:1.8;margin:0 0 1rem;padding-left:.5rem}
    .micro-testimonial cite{font-size:.82rem;font-weight:700;font-style:normal;color:var(--g500)}

    .micro-cta-box{text-align:center;padding:3rem 2rem;background:var(--dark);color:var(--white);border-radius:var(--radius-xl);margin:3rem 0;position:relative;overflow:hidden}
    .micro-cta-box::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 300px 250px at 30% 50%,rgba(58,175,169,.1) 0%,transparent 70%),radial-gradient(ellipse 250px 250px at 75% 50%,rgba(252,103,193,.05) 0%,transparent 70%)}
    .micro-cta-box h2{font-size:1.5rem;font-weight:900;margin-bottom:.75rem;position:relative;z-index:1}
    .micro-cta-box h2 span{background:linear-gradient(135deg,var(--teal),var(--accent-purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .micro-cta-box p{color:rgba(255,255,255,.5);font-size:.9rem;margin-bottom:1.5rem;position:relative;z-index:1}
    .micro-cta-box .micro-hero__actions{position:relative;z-index:1}

    .micro-nearby{margin:2.5rem 0}
    .micro-nearby h3{font-size:1rem;font-weight:800;color:var(--g800);margin-bottom:1rem}
    .micro-nearby__grid{display:flex;flex-wrap:wrap;gap:.5rem}
    .micro-nearby__link{display:inline-block;padding:.4rem .9rem;background:var(--off-white);border:1px solid var(--g200);border-radius:100px;font-size:.78rem;font-weight:600;color:var(--blue);text-decoration:none;transition:all .2s}
    .micro-nearby__link:hover{background:var(--teal);color:var(--white);border-color:var(--teal)}

    .micro-services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.25rem;margin:2rem 0}
    .micro-service-card{padding:1.5rem;background:var(--white);border:1px solid var(--g200);border-radius:var(--radius);transition:all .25s;text-decoration:none;color:inherit}
    .micro-service-card:hover{border-color:var(--teal);box-shadow:var(--shadow-lg);transform:translateY(-2px)}
    .micro-service-card h4{font-size:.9rem;font-weight:800;color:var(--g900);margin-bottom:.5rem}
    .micro-service-card p{font-size:.8rem;color:var(--g500);line-height:1.6;margin:0}

    @media(max-width:768px){
      .micro-hero{padding:3.5rem var(--px) 3rem}
      .micro-content{padding:2.5rem var(--px)}
      .micro-cta-box{padding:2rem 1.25rem}
    }
  </style>
</head>
<body>
  <!-- TOP BAR -->
  <div class="top-bar">
    <div class="top-bar__left">
      Call Now <a href="${PHONE_HREF}">${PHONE} <span class="arrow">→</span></a>
    </div>
    <a href="${homeHref}" class="top-bar__logo">
      <img src="${logoHref}" alt="${COMPANY}" class="top-bar__logo-img">
    </a>
  </div>

  <!-- BREADCRUMB -->
  <nav class="micro-breadcrumb" aria-label="Breadcrumb">
    <a href="${homeHref}">Home</a>${breadcrumbs.map(b => `<span>›</span>${b.url ? `<a href="${b.url}">${escHtml(b.label)}</a>` : `<strong>${escHtml(b.label)}</strong>`}`).join('')}
  </nav>

  <!-- HERO -->
  <section class="micro-hero">
    <div class="micro-hero__badge">
      <span class="micro-hero__badge-dot"></span>
      AHCA Licensed #${LICENSE}
    </div>
    <h1>${h1}</h1>
    <p>${escHtml(metaDesc)}</p>
    <div class="micro-hero__actions">
      <a href="${PHONE_HREF}" class="btn btn--glow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        Call ${PHONE}
      </a>
      <a href="${homeHref}#journey" class="btn btn--secondary">Free Consultation</a>
    </div>
  </section>

  <!-- CONTENT -->
  <main class="micro-content">
    ${bodyHtml}
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <img src="${logoHref}" alt="${COMPANY}" class="footer__logo-img">
      </div>
      <div class="footer__line"></div>
      <p class="footer__copy">
        &copy; ${new Date().getFullYear()} ${COMPANY}. AHCA License #${LICENSE}. All rights reserved.<br>
        ${ADDRESS} &middot; <a href="${PHONE_HREF}" style="color:var(--teal)">${PHONE}</a>
      </p>
    </div>
  </footer>
</body>
</html>`;
}

// ─── SERVICE × CITY COMBO PAGE ──────────────────────────────
function buildServiceCityPage(service, location) {
  const title = `${service.shortName} in ${location.name}, ${location.state} — ${COMPANY}`;
  const metaDesc = `${service.shortName} services in ${location.name}, FL. ${service.description} AHCA licensed, bonded & insured. Call ${PHONE} for a free consultation.`;
  const canonicalUrl = `${DOMAIN}/dist/${service.slug}/${location.slug}/`;
  const keywords = [...service.keywords, location.name, `${service.shortName.toLowerCase()} ${location.name}`, `home care ${location.name}`, `${location.county} County home care`];
  const testimonial = getTestimonial(location, service);
  const schema = buildSchema(title, metaDesc, canonicalUrl, location);

  const nearbyLinks = location.nearby.map(n => {
    const nearLoc = LOCATIONS.find(l => l.name === n);
    if (!nearLoc) return '';
    return `<a href="../${nearLoc.slug}/" class="micro-nearby__link">${service.shortName} in ${nearLoc.name}</a>`;
  }).filter(Boolean).join('\n            ');

  const otherServicesHtml = SERVICES.filter(s => s.slug !== service.slug).slice(0, 4).map(s =>
    `<a href="../../${s.slug}/${location.slug}/" class="micro-service-card">
              <h4>${s.shortName}</h4>
              <p>${s.description}</p>
            </a>`
  ).join('\n            ');

  const breadcrumbs = [
    { label: 'Services', url: '../../dist/services/' },
    { label: service.shortName, url: `../../dist/services/${service.slug}/` },
    { label: location.name, url: null },
  ];

  const bodyHtml = `
    <h2>${service.headline} in ${escHtml(location.name)}, Florida</h2>
    <p>${service.longDesc}</p>
    <p>Serving the ${escHtml(location.name)} area in ${escHtml(location.county)} County, our caregivers are background-checked, AHCA-licensed, bonded, and insured. Whether you need a few hours of ${service.shortName.toLowerCase()} per week or daily support, we create a personalized care plan that fits your family's needs and budget.</p>

    <h3>What's Included in ${escHtml(service.shortName)} in ${escHtml(location.name)}</h3>
    <ul>
      ${service.benefits.map(b => `<li>${escHtml(b)}</li>`).join('\n      ')}
    </ul>

    <div class="micro-testimonial">
      <blockquote>${testimonial.quote}</blockquote>
      <cite>— ${escHtml(testimonial.name)}, ${escHtml(testimonial.location)}</cite>
    </div>

    <h2>Why Families in ${escHtml(location.name)} Choose ${COMPANY}</h2>
    <p>With our headquarters in West Palm Beach and caregivers throughout ${escHtml(location.county)} County, we know the ${escHtml(location.name)} community. Our local presence means faster response times, caregivers familiar with local hospitals and physicians, and a team that truly understands the needs of ${escHtml(location.region)} families.</p>
    <ul>
      <li>AHCA Licensed #${LICENSE} — Florida state licensed home health agency</li>
      <li>Bonded and fully insured for your peace of mind</li>
      <li>All caregivers background-checked and CPR certified</li>
      <li>Flexible scheduling — hourly, daily, overnight, or live-in</li>
      <li>Free in-home consultation and care plan assessment</li>
      <li>Serving ${escHtml(location.name)} and surrounding areas in ${escHtml(location.county)} County</li>
    </ul>

    <div class="micro-faq">
      <h2>Frequently Asked Questions: ${escHtml(service.shortName)} in ${escHtml(location.name)}</h2>
      ${service.faqs.map(f => `
      <details>
        <summary>${escHtml(f.q)}</summary>
        <div class="faq-answer"><p>${escHtml(f.a)}</p></div>
      </details>`).join('')}
      <details>
        <summary>Do you serve ${escHtml(location.name)}, FL?</summary>
        <div class="faq-answer"><p>Yes! ${COMPANY} proudly serves ${escHtml(location.name)} and all communities in ${escHtml(location.county)} County, Florida. Our caregivers are local and familiar with the area.</p></div>
      </details>
      <details>
        <summary>How do I get started with ${service.shortName.toLowerCase()} in ${escHtml(location.name)}?</summary>
        <div class="faq-answer"><p>Simply call us at ${PHONE} or visit our website to request a free consultation. We'll schedule an in-home assessment in ${escHtml(location.name)} at a time that works for you.</p></div>
      </details>
    </div>

    <div class="micro-cta-box">
      <h2>Ready for <span>${escHtml(service.shortName)}</span> in ${escHtml(location.name)}?</h2>
      <p>Call today for a free, no-obligation in-home consultation.</p>
      <div class="micro-hero__actions">
        <a href="${PHONE_HREF}" class="btn btn--glow">Call ${PHONE}</a>
        <a href="${MAIN_PAGE}#journey" class="btn btn--secondary">Schedule Online</a>
      </div>
    </div>

    <div class="micro-nearby">
      <h3>${escHtml(service.shortName)} in Nearby Areas</h3>
      <div class="micro-nearby__grid">
        ${nearbyLinks}
      </div>
    </div>

    <h3>Other Services in ${escHtml(location.name)}</h3>
    <div class="micro-services-grid">
      ${otherServicesHtml}
    </div>`;

  return buildPage({ title, metaDesc, h1: `<span>${escHtml(service.shortName)}</span> in ${escHtml(location.name)}, FL`, h2: service.headline, bodyHtml, breadcrumbs, canonicalUrl, keywords, schema, depth: 3 });
}

// ─── SERVICE-ONLY PAGE ──────────────────────────────────────
function buildServicePage(service) {
  const title = `${service.name} — ${COMPANY} | South Florida`;
  const metaDesc = `${service.description} Serving all of Palm Beach & Broward County. AHCA licensed, bonded & insured. Call ${PHONE}.`;
  const canonicalUrl = `${DOMAIN}/dist/services/${service.slug}/`;
  const keywords = [...service.keywords, 'South Florida', 'Palm Beach County', 'Broward County'];
  const schema = buildSchema(title, metaDesc, canonicalUrl, null);

  const cityLinksHtml = LOCATIONS.filter(l => l.county === 'Palm Beach').slice(0, 12).map(l =>
    `<a href="../../${service.slug}/${l.slug}/" class="micro-nearby__link">${l.name}</a>`
  ).join('\n            ') + '\n            ' +
  LOCATIONS.filter(l => l.county === 'Broward').slice(0, 8).map(l =>
    `<a href="../../${service.slug}/${l.slug}/" class="micro-nearby__link">${l.name}</a>`
  ).join('\n            ');

  const breadcrumbs = [
    { label: 'Services', url: '../' },
    { label: service.shortName, url: null },
  ];

  const bodyHtml = `
    <h2>${escHtml(service.headline)} Across South Florida</h2>
    <p>${service.longDesc}</p>

    <h3>What's Included</h3>
    <ul>
      ${service.benefits.map(b => `<li>${escHtml(b)}</li>`).join('\n      ')}
    </ul>

    <div class="micro-faq">
      <h2>Frequently Asked Questions</h2>
      ${service.faqs.map(f => `
      <details>
        <summary>${escHtml(f.q)}</summary>
        <div class="faq-answer"><p>${escHtml(f.a)}</p></div>
      </details>`).join('')}
    </div>

    <div class="micro-cta-box">
      <h2>Get <span>${escHtml(service.shortName)}</span> Today</h2>
      <p>Free in-home consultation across Palm Beach & Broward County.</p>
      <div class="micro-hero__actions">
        <a href="${PHONE_HREF}" class="btn btn--glow">Call ${PHONE}</a>
        <a href="${MAIN_PAGE}#journey" class="btn btn--secondary">Schedule Online</a>
      </div>
    </div>

    <div class="micro-nearby">
      <h3>${escHtml(service.shortName)} by Location</h3>
      <div class="micro-nearby__grid">
        ${cityLinksHtml}
      </div>
    </div>`;

  return buildPage({ title, metaDesc, h1: `<span>${escHtml(service.shortName)}</span> in South Florida`, h2: service.headline, bodyHtml, breadcrumbs, canonicalUrl, keywords, schema, depth: 3 });
}

// ─── CITY-ONLY PAGE ─────────────────────────────────────────
function buildCityPage(location) {
  const title = `Home Care in ${location.name}, ${location.state} — ${COMPANY}`;
  const metaDesc = `Compassionate in-home care services in ${location.name}, FL. Companionship, personal care, memory care, post-surgery recovery, and 24/7 live-in care. Call ${PHONE}.`;
  const canonicalUrl = `${DOMAIN}/dist/areas/${location.slug}/`;
  const keywords = [`home care ${location.name}`, `caregiver ${location.name}`, `senior care ${location.name}`, `elderly care ${location.name} FL`, `${location.county} County home care`];
  const testimonial = getTestimonial(location, null);
  const schema = buildSchema(title, metaDesc, canonicalUrl, location);

  const serviceCardsHtml = SERVICES.map(s =>
    `<a href="../../${s.slug}/${location.slug}/" class="micro-service-card">
              <h4>${s.shortName}</h4>
              <p>${s.description}</p>
            </a>`
  ).join('\n            ');

  const nearbyLinks = location.nearby.map(n => {
    const nearLoc = LOCATIONS.find(l => l.name === n);
    if (!nearLoc) return '';
    return `<a href="../${nearLoc.slug}/" class="micro-nearby__link">Home Care in ${nearLoc.name}</a>`;
  }).filter(Boolean).join('\n            ');

  const breadcrumbs = [
    { label: 'Areas', url: '../' },
    { label: location.name, url: null },
  ];

  const bodyHtml = `
    <h2>Trusted Home Care in ${escHtml(location.name)}, Florida</h2>
    <p>${COMPANY} provides compassionate, professional in-home care services throughout ${escHtml(location.name)} and the surrounding ${escHtml(location.region)} area in ${escHtml(location.county)} County, Florida. Our background-checked, AHCA-licensed caregivers help seniors live safely and comfortably at home — on their terms.</p>
    <p>Whether your loved one needs a companion for a few hours a week or full-time live-in care, we have the right solution. Every care plan is personalized based on an in-home assessment, and we adjust as needs change.</p>

    <h3>Our Services in ${escHtml(location.name)}</h3>
    <div class="micro-services-grid">
      ${serviceCardsHtml}
    </div>

    <div class="micro-testimonial">
      <blockquote>${testimonial.quote}</blockquote>
      <cite>— ${escHtml(testimonial.name)}, ${escHtml(testimonial.location)}</cite>
    </div>

    <h2>Why ${escHtml(location.name)} Families Choose Us</h2>
    <ul>
      <li>AHCA Licensed #${LICENSE} — fully compliant Florida home health agency</li>
      <li>Serving ${escHtml(location.name)} (${escHtml(location.zip)}) and all of ${escHtml(location.county)} County</li>
      <li>Bonded, insured, and every caregiver background-checked</li>
      <li>Flexible care — hourly, daily, overnight, 24-hour, or live-in</li>
      <li>Free in-home consultations — no obligation</li>
      <li>Fast start — care can begin within 24-48 hours</li>
    </ul>

    <div class="micro-cta-box">
      <h2>Get <span>Home Care</span> in ${escHtml(location.name)} Today</h2>
      <p>Call for a free consultation or schedule online.</p>
      <div class="micro-hero__actions">
        <a href="${PHONE_HREF}" class="btn btn--glow">Call ${PHONE}</a>
        <a href="${MAIN_PAGE}#journey" class="btn btn--secondary">Schedule Online</a>
      </div>
    </div>

    <div class="micro-nearby">
      <h3>Home Care in Nearby Areas</h3>
      <div class="micro-nearby__grid">
        ${nearbyLinks}
      </div>
    </div>`;

  return buildPage({ title, metaDesc, h1: `Home Care in <span>${escHtml(location.name)}</span>, FL`, h2: 'Trusted Local Care', bodyHtml, breadcrumbs, canonicalUrl, keywords, schema, depth: 3 });
}

// ─── AUDIENCE × CITY PAGE ───────────────────────────────────
function buildAudienceCityPage(audience, location) {
  const title = `${audience.name} in ${location.name}, FL — ${COMPANY}`;
  const metaDesc = `${audience.description} Serving ${location.name} and ${location.county} County, FL. Call ${PHONE} today.`;
  const canonicalUrl = `${DOMAIN}/dist/${audience.slug}/${location.slug}/`;
  const keywords = [...audience.keywords, location.name, `${audience.name.toLowerCase()} ${location.name}`];
  const schema = buildSchema(title, metaDesc, canonicalUrl, location);
  const testimonial = getTestimonial(location, null);

  const breadcrumbs = [
    { label: audience.name, url: null },
    { label: location.name, url: null },
  ];

  const serviceLinksHtml = SERVICES.slice(0, 4).map(s =>
    `<a href="../../${s.slug}/${location.slug}/" class="micro-service-card">
              <h4>${s.shortName}</h4>
              <p>${s.description}</p>
            </a>`
  ).join('\n            ');

  const bodyHtml = `
    <h2>${escHtml(audience.headline)} in ${escHtml(location.name)}, Florida</h2>
    <p>${escHtml(audience.description)} Our ${escHtml(location.name)}-based caregivers provide personalized, compassionate care that keeps your loved one safe, comfortable, and engaged at home.</p>
    <p>${COMPANY} is an AHCA-licensed, bonded, and insured home health agency serving all of ${escHtml(location.county)} County, Florida. We offer flexible scheduling, background-checked caregivers, and free in-home assessments.</p>

    <h3>Our Services</h3>
    <div class="micro-services-grid">
      ${serviceLinksHtml}
    </div>

    <div class="micro-testimonial">
      <blockquote>${testimonial.quote}</blockquote>
      <cite>— ${escHtml(testimonial.name)}, ${escHtml(testimonial.location)}</cite>
    </div>

    <div class="micro-cta-box">
      <h2>Get <span>${escHtml(audience.name)}</span> in ${escHtml(location.name)}</h2>
      <p>Free consultation — call today or schedule online.</p>
      <div class="micro-hero__actions">
        <a href="${PHONE_HREF}" class="btn btn--glow">Call ${PHONE}</a>
        <a href="${MAIN_PAGE}#journey" class="btn btn--secondary">Schedule Online</a>
      </div>
    </div>`;

  return buildPage({ title, metaDesc, h1: `<span>${escHtml(audience.name)}</span> in ${escHtml(location.name)}, FL`, h2: audience.headline, bodyHtml, breadcrumbs, canonicalUrl, keywords, schema, depth: 3 });
}

// ─── HUB PAGES ──────────────────────────────────────────────
function buildServicesHub() {
  const title = `Home Care Services — ${COMPANY} | South Florida`;
  const metaDesc = `Explore all home care services from ${COMPANY}: companionship, personal care, memory care, post-surgery, 24/7 live-in, and more. Serving Palm Beach & Broward County, FL.`;
  const canonicalUrl = `${DOMAIN}/dist/services/`;
  const keywords = ['home care services', 'senior care services South Florida', 'Palm Beach home care', 'Broward County home care'];
  const schema = buildSchema(title, metaDesc, canonicalUrl, null);

  const serviceCardsHtml = SERVICES.map(s =>
    `<a href="${s.slug}/" class="micro-service-card">
              <h4>${s.shortName}</h4>
              <p>${s.description}</p>
            </a>`
  ).join('\n            ');

  const breadcrumbs = [{ label: 'Services', url: null }];
  const bodyHtml = `
    <h2>Our Home Care Services</h2>
    <p>${COMPANY} offers a full spectrum of in-home care services across Palm Beach and Broward County, Florida. Every service is delivered by background-checked, AHCA-licensed caregivers who are bonded and insured.</p>
    <div class="micro-services-grid">
      ${serviceCardsHtml}
    </div>
    <div class="micro-cta-box">
      <h2>Not Sure Which <span>Service</span> You Need?</h2>
      <p>Call us for a free in-home assessment — we'll help you find the right fit.</p>
      <div class="micro-hero__actions">
        <a href="${PHONE_HREF}" class="btn btn--glow">Call ${PHONE}</a>
        <a href="${MAIN_PAGE}#journey" class="btn btn--secondary">Free Consultation</a>
      </div>
    </div>`;

  return buildPage({ title, metaDesc, h1: 'Our <span>Home Care</span> Services', h2: 'Full-Spectrum Care', bodyHtml, breadcrumbs, canonicalUrl, keywords, schema, depth: 2 });
}

function buildAreasHub() {
  const title = `Service Areas — ${COMPANY} | Palm Beach & Broward County`;
  const metaDesc = `${COMPANY} serves 44+ cities and neighborhoods across Palm Beach & Broward County, FL. Find home care near you. Call ${PHONE}.`;
  const canonicalUrl = `${DOMAIN}/dist/areas/`;
  const keywords = ['home care near me', 'South Florida home care', 'Palm Beach County home care', 'Broward County home care'];
  const schema = buildSchema(title, metaDesc, canonicalUrl, null);

  const pbLocations = LOCATIONS.filter(l => l.county === 'Palm Beach');
  const brLocations = LOCATIONS.filter(l => l.county === 'Broward');

  const pbLinksHtml = pbLocations.map(l => `<a href="${l.slug}/" class="micro-nearby__link">${l.name}</a>`).join('\n            ');
  const brLinksHtml = brLocations.map(l => `<a href="${l.slug}/" class="micro-nearby__link">${l.name}</a>`).join('\n            ');

  const breadcrumbs = [{ label: 'Areas', url: null }];
  const bodyHtml = `
    <h2>Serving All of Palm Beach & Broward County</h2>
    <p>From our headquarters in West Palm Beach, ${COMPANY} provides compassionate in-home care to 44+ cities and neighborhoods across Palm Beach and Broward County, Florida.</p>

    <h3>Palm Beach County</h3>
    <div class="micro-nearby" style="margin-top:.5rem">
      <div class="micro-nearby__grid">
        ${pbLinksHtml}
      </div>
    </div>

    <h3>Broward County</h3>
    <div class="micro-nearby" style="margin-top:.5rem">
      <div class="micro-nearby__grid">
        ${brLinksHtml}
      </div>
    </div>

    <div class="micro-cta-box">
      <h2>Don't See Your <span>City</span>?</h2>
      <p>We likely serve your area too — call to find out.</p>
      <div class="micro-hero__actions">
        <a href="${PHONE_HREF}" class="btn btn--glow">Call ${PHONE}</a>
      </div>
    </div>`;

  return buildPage({ title, metaDesc, h1: 'Areas <span>We Serve</span>', h2: 'South Florida Coverage', bodyHtml, breadcrumbs, canonicalUrl, keywords, schema, depth: 2 });
}

// ─── SITEMAP & ROBOTS ───────────────────────────────────────
function buildSitemap(urls) {
  const entries = urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.freq || 'monthly'}</changefreq>\n    <priority>${u.priority || '0.7'}</priority>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/dist/sitemap.xml
`;
}

// ═══════════════════════════════════════════════════════════════
//  MAIN GENERATION
// ═══════════════════════════════════════════════════════════════
function main() {
  const startTime = Date.now();
  const sitemapUrls = [];
  const today = new Date().toISOString().split('T')[0];
  let pageCount = 0;

  // Clean dist
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true, force: true });
  }
  mkdirp(DIST);

  console.log('═══════════════════════════════════════════');
  console.log('  Senior Trusted Home Care — SEO Generator');
  console.log('═══════════════════════════════════════════\n');

  // ── 1. Services Hub ─────────────────────────────
  console.log('📄 Generating services hub...');
  mkdirp(path.join(DIST, 'services'));
  fs.writeFileSync(path.join(DIST, 'services', 'index.html'), buildServicesHub());
  sitemapUrls.push({ loc: `${DOMAIN}/dist/services/`, lastmod: today, priority: '0.9', freq: 'weekly' });
  pageCount++;

  // ── 2. Service-Only Pages ───────────────────────
  console.log(`📄 Generating ${SERVICES.length} service detail pages...`);
  for (const svc of SERVICES) {
    mkdirp(path.join(DIST, 'services', svc.slug));
    fs.writeFileSync(path.join(DIST, 'services', svc.slug, 'index.html'), buildServicePage(svc));
    sitemapUrls.push({ loc: `${DOMAIN}/dist/services/${svc.slug}/`, lastmod: today, priority: '0.85' });
    pageCount++;
  }

  // ── 3. Areas Hub ────────────────────────────────
  console.log('📄 Generating areas hub...');
  mkdirp(path.join(DIST, 'areas'));
  fs.writeFileSync(path.join(DIST, 'areas', 'index.html'), buildAreasHub());
  sitemapUrls.push({ loc: `${DOMAIN}/dist/areas/`, lastmod: today, priority: '0.9', freq: 'weekly' });
  pageCount++;

  // ── 4. City-Only Pages ──────────────────────────
  console.log(`📄 Generating ${LOCATIONS.length} city pages...`);
  for (const loc of LOCATIONS) {
    mkdirp(path.join(DIST, 'areas', loc.slug));
    fs.writeFileSync(path.join(DIST, 'areas', loc.slug, 'index.html'), buildCityPage(loc));
    sitemapUrls.push({ loc: `${DOMAIN}/dist/areas/${loc.slug}/`, lastmod: today, priority: '0.8' });
    pageCount++;
  }

  // ── 5. Service × City Combo Pages ───────────────
  const comboTotal = SERVICES.length * LOCATIONS.length;
  console.log(`📄 Generating ${comboTotal} service × city pages...`);
  for (const svc of SERVICES) {
    for (const loc of LOCATIONS) {
      const dir = path.join(DIST, svc.slug, loc.slug);
      mkdirp(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), buildServiceCityPage(svc, loc));
      sitemapUrls.push({ loc: `${DOMAIN}/dist/${svc.slug}/${loc.slug}/`, lastmod: today, priority: '0.7' });
      pageCount++;
    }
  }

  // ── 6. Audience × City Pages ────────────────────
  // Generate for major cities only (not neighborhoods) to keep volume reasonable
  const majorCities = LOCATIONS.filter(l =>
    ['west-palm-beach','palm-beach-gardens','boca-raton','delray-beach','boynton-beach',
     'jupiter','wellington','royal-palm-beach','fort-lauderdale','pompano-beach',
     'coral-springs','hollywood','pembroke-pines','plantation','weston','parkland',
     'coconut-creek','deerfield-beach','lake-worth-beach'].includes(l.slug)
  );
  const audienceTotal = AUDIENCES.length * majorCities.length;
  console.log(`📄 Generating ${audienceTotal} audience × city pages...`);
  for (const aud of AUDIENCES) {
    for (const loc of majorCities) {
      const dir = path.join(DIST, aud.slug, loc.slug);
      mkdirp(dir);
      fs.writeFileSync(path.join(dir, 'index.html'), buildAudienceCityPage(aud, loc));
      sitemapUrls.push({ loc: `${DOMAIN}/dist/${aud.slug}/${loc.slug}/`, lastmod: today, priority: '0.6' });
      pageCount++;
    }
  }

  // ── 7. Sitemap & Robots ─────────────────────────
  console.log('📄 Generating sitemap.xml and robots.txt...');
  // Add main site
  sitemapUrls.unshift({ loc: `${DOMAIN}/`, lastmod: today, priority: '1.0', freq: 'weekly' });
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), buildSitemap(sitemapUrls));
  fs.writeFileSync(path.join(DIST, 'robots.txt'), buildRobots());

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Done! Generated ${pageCount} pages in ${elapsed}s`);
  console.log(`📁 Output: ${DIST}`);
  console.log(`🗺️  Sitemap: ${sitemapUrls.length} URLs`);
  console.log(`\n── Breakdown ──`);
  console.log(`   Services hub:        1`);
  console.log(`   Service pages:       ${SERVICES.length}`);
  console.log(`   Areas hub:           1`);
  console.log(`   City pages:          ${LOCATIONS.length}`);
  console.log(`   Service × City:      ${comboTotal}`);
  console.log(`   Audience × City:     ${audienceTotal}`);
  console.log(`   ─────────────────────`);
  console.log(`   TOTAL:               ${pageCount}`);
}

main();
