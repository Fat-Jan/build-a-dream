# Demo-first plan: Student Habit Tracker

## Idea
A simple habit tracker that helps students see whether they studied, slept, and exercised this week.

## What people should see
A clean web page with today's habits, a weekly streak view, and one-click toggles.

## Recommended stack
TypeScript + Vite + React, because the demo is visual and should be visible in a browser quickly.

## MVP scope
- Show three default habits: Study, Sleep, Exercise.
- Let the user toggle each habit for today.
- Show a seven-day streak row using local browser storage.
- Include a small "demo data" button so judges can see the final state immediately.

## Not in this demo
- User accounts: not needed for a local demo.
- Database: browser storage is enough for the first version.
- Mobile app: responsive web is faster and easier to show.

## Build steps
1. Create the Vite React app and render a static habit card layout.  
   Verify: run `npm run dev` and open the local URL.
2. Add toggle state for today's three habits.  
   Verify: click each toggle and confirm the UI changes.
3. Save habit state to localStorage.  
   Verify: refresh the page and confirm toggles remain.
4. Add seven-day streak display and demo data button.  
   Verify: click demo data and confirm the week view fills in.
5. Polish copy and add README instructions.  
   Verify: a new user can run the app from README commands.

## First prompt to paste
`Use this plan. Build step 1 only, then stop and show me how to verify it.`


## Silent demo transcript
- User asks for a demo-first plan.
- Assistant asks what people should see first.
- Assistant recommends the simplest stack and a short verified plan.
