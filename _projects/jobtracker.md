---
title: JobTracker
description: A local-first web application that turns pasted LinkedIn job alerts into a structured job-search workspace.
date: 2026-08-13
section: Project 002
---

## Turn job-alert noise into a working system.

**JobTracker** is a dependency-free Node.js application for collecting, enriching, and organizing job opportunities without connecting an email account or handing personal job-search data to another service.

Paste a LinkedIn alert into the application and it extracts the individual roles. Each job can then be reviewed, enriched with the full posting, grouped by company, and tracked from initial interest through the application process.

[View the source on GitHub](https://github.com/jgoalby/JobTracker/)

## The problem

Job-alert emails are useful for discovery, but an inbox is a poor place to manage a search. The same role may appear in several alerts, important details disappear when a listing closes, and there is no natural place to record why a job is interesting—or why it is not.

Existing job trackers can solve parts of this problem, but they often require an account, a browser extension, or access to personal browsing and email data. I wanted something smaller and more explicit: copy information in, review what was detected, and keep the result locally.

## Design constraints

- It should run locally without an account or hosted service.
- It should not scrape LinkedIn or require LinkedIn credentials.
- The parser should tolerate several alert and job-page layouts.
- Imported jobs should be reviewable before they are saved.
- Duplicate listings should update an existing record instead of creating clutter.
- Full source text should remain available when structured extraction misses something.
- The application should have no build step or third-party runtime packages.

## What it does

- Parses multiple jobs from pasted LinkedIn alert emails.
- Extracts titles, companies, locations, canonical job URLs, and LinkedIn job IDs.
- Detects duplicates using the LinkedIn job ID, canonical URL, or a company/title/location fallback.
- Accepts a second paste from the full job page to capture the description and additional details.
- Preserves the original title, company, location, and URL while enriching a job.
- Tracks application status separately from initial interest and follow-up decisions.
- Stores notes and user-defined custom fields.
- Groups jobs by company and filters or sorts them by status and date.
- Summarizes recurring skills, experience expectations, work arrangements, and data coverage.
- Exports a readable JSON backup.

## Engineering approach

JobTracker uses Node’s built-in HTTP and SQLite modules, with a browser interface written in plain HTML, CSS, and JavaScript. The result is a self-contained application with no package dependencies and no compilation step.

The data model combines a relational core with flexible JSON. Jobs, companies, source records, and custom-field definitions have stable relationships in SQLite, while the structured details extracted from varied postings can evolve without requiring a new column for every employer-specific section.

Parsing is deterministic and local. LinkedIn tracking URLs are reduced to canonical job URLs, repeated links are grouped by job ID, and nearby text is evaluated for company and location context. Full postings are divided into recognizable and employer-specific sections, then analyzed for practical job-seeker signals such as skills, education, experience, leadership expectations, and listing status.

Because copied pages contain navigation labels and other unrelated text, enrichment deliberately protects the job’s identity fields. The parser can contribute salary, employment type, qualifications, benefits, company information, and other details without replacing a known title or company with page chrome such as “Home” or “Notifications.”

## Privacy and trust

The server listens only on the local computer by default and makes no external requests. It does not need an email login, LinkedIn login, API key, or analytics account.

Pasted source history is retained so extraction can be inspected later. That history may include personal email text and temporary URL parameters, so the database and exported backups are treated as private data and excluded from Git. The public repository contains only anonymized parser fixtures.

## What I learned

Unstructured-data tools need more than a clever parser. They also need visible provenance, a review step, sensible fallbacks, and clear rules about which existing values new input is allowed to change.

The most useful design decision was separating discovery from enrichment. An alert supplies a reliable job identity and a link; the full posting supplies depth. Keeping those as two explicit actions makes the workflow understandable and avoids pretending that every paste has the same shape or authority.

Future work will focus on broader import formats, more portable backup and restore options, and deeper insights that remain transparent and local.
