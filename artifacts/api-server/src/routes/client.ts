import { Router, type IRouter } from "express";
import {
  AskRecommendationBody,
  AskRecommendationResponse,
  CreateContentItemBody,
  CreateContentItemResponse,
  CreateSupportRequestBody,
  CreateSupportRequestResponse,
  CreateTaskBody,
  CreateTaskResponse,
  GetBillingResponse,
  GetCompetitorsResponse,
  GetContentItemsResponse,
  GetDashboardResponse,
  GetListingsResponse,
  GetRankingsResponse,
  GetRecommendationsResponse,
  GetReviewsResponse,
  GetSettingsResponse,
  GetTasksResponse,
  RespondToReviewBody,
  RespondToReviewParams,
  RespondToReviewResponse,
  UpdateSettingsBody,
  UpdateSettingsResponse,
  UpdateTaskBody,
  UpdateTaskParams,
  UpdateTaskResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const business = {
  name: "Bridge Legal Services",
  category: "Traffic Ticket Defence / Paralegal",
  location: "Toronto, Ontario",
};

let reviews = [
  { id: 1, customer: "Michael Chen", rating: 5, platform: "Google", date: "2 days ago", text: "Excellent service and very professional. They handled my traffic ticket quickly and explained everything clearly.", responded: false, avatar: "MC" },
  { id: 2, customer: "Sarah Wilson", rating: 5, platform: "Google", date: "5 days ago", text: "They handled my traffic ticket quickly and kept me updated throughout the process. Very knowledgeable team.", responded: false, avatar: "SW" },
  { id: 3, customer: "Daniel Kim", rating: 5, platform: "Yelp", date: "8 days ago", text: "Very helpful and responsive. I highly recommend Bridge Legal Services to anyone needing support.", responded: true, avatar: "DK" },
  { id: 4, customer: "Alyssa Patel", rating: 4, platform: "Google", date: "12 days ago", text: "Professional experience from start to finish. I appreciated the clear communication.", responded: true, avatar: "AP" },
];

const listings = [
  { id: 1, directory: "Google Business Profile", status: "healthy", nameMatch: true, addressMatch: true, phoneMatch: true, websiteMatch: true, issue: null, lastChecked: "Aug 08, 2026" },
  { id: 2, directory: "Yelp", status: "healthy", nameMatch: true, addressMatch: true, phoneMatch: true, websiteMatch: true, issue: null, lastChecked: "Aug 08, 2026" },
  { id: 3, directory: "YellowPages", status: "healthy", nameMatch: true, addressMatch: true, phoneMatch: true, websiteMatch: true, issue: null, lastChecked: "Aug 07, 2026" },
  { id: 4, directory: "Apple Maps", status: "healthy", nameMatch: true, addressMatch: true, phoneMatch: true, websiteMatch: true, issue: null, lastChecked: "Aug 07, 2026" },
  { id: 5, directory: "Bing Places", status: "healthy", nameMatch: true, addressMatch: true, phoneMatch: true, websiteMatch: true, issue: null, lastChecked: "Aug 06, 2026" },
  { id: 6, directory: "Facebook", status: "healthy", nameMatch: true, addressMatch: true, phoneMatch: true, websiteMatch: true, issue: null, lastChecked: "Aug 06, 2026" },
  { id: 7, directory: "411.ca", status: "attention", nameMatch: true, addressMatch: false, phoneMatch: true, websiteMatch: true, issue: "Address mismatch", lastChecked: "Aug 05, 2026" },
  { id: 8, directory: "BBB", status: "attention", nameMatch: true, addressMatch: true, phoneMatch: false, websiteMatch: true, issue: "Phone mismatch", lastChecked: "Aug 04, 2026" },
];

const rankings = [
  { id: 1, keyword: "Traffic Ticket Toronto", current: 5, previous: 8, change: 3, trend: [11, 10, 9, 8, 7, 5] },
  { id: 2, keyword: "Traffic Ticket Etobicoke", current: 3, previous: 5, change: 2, trend: [8, 7, 6, 5, 4, 3] },
  { id: 3, keyword: "Speeding Ticket Toronto", current: 8, previous: 10, change: 2, trend: [14, 13, 12, 11, 10, 8] },
  { id: 4, keyword: "Careless Driving Toronto", current: 11, previous: 9, change: -2, trend: [8, 8, 9, 9, 10, 11] },
  { id: 5, keyword: "Stunt Driving Toronto", current: 14, previous: 18, change: 4, trend: [25, 22, 20, 18, 16, 14] },
  { id: 6, keyword: "Paralegal Traffic Ticket", current: 6, previous: 9, change: 3, trend: [12, 12, 11, 10, 8, 6] },
];

const competitors = [
  { id: 1, name: "Bridge Legal Services", reviews: 76, rating: 4.9, visibility: 87, keywords: 12, citations: 46 },
  { id: 2, name: "Competitor A", reviews: 102, rating: 4.8, visibility: 91, keywords: 16, citations: 53 },
  { id: 3, name: "Competitor B", reviews: 89, rating: 4.7, visibility: 89, keywords: 14, citations: 50 },
  { id: 4, name: "Competitor C", reviews: 64, rating: 4.6, visibility: 79, keywords: 9, citations: 42 },
];

const recommendations = [
  { id: 1, priority: "high", title: "Increase review volume", description: "Competitor A has 26 more reviews than you.", action: "Launch a review request campaign for recent customers.", impact: "+4 visibility points" },
  { id: 2, priority: "medium", title: "Citation opportunity", description: "You are missing 4 directories where your competitors are listed.", action: "Review the citation gap and add the highest-value directories.", impact: "+3 visibility points" },
  { id: 3, priority: "medium", title: "Keyword opportunity", description: "Stunt Driving Toronto improved to #14.", action: "Optimize the related service page to strengthen local relevance.", impact: "Reach page one" },
];

let tasks = [
  { id: 1, title: "Fix BBB listing", priority: "high", dueDate: "Aug 12, 2026", status: "todo" },
  { id: 2, title: "Update YellowPages information", priority: "medium", dueDate: "Aug 16, 2026", status: "in_progress" },
  { id: 3, title: "Approve 3 review responses", priority: "medium", dueDate: "Aug 14, 2026", status: "todo" },
  { id: 4, title: "Add 4 missing citations", priority: "low", dueDate: "Aug 22, 2026", status: "todo" },
  { id: 5, title: "Optimize Stunt Driving page", priority: "low", dueDate: "Aug 30, 2026", status: "completed" },
];

let contentItems = [
  { id: 1, title: "Traffic Ticket Tips", type: "Google Post", date: "Aug 12, 2026", status: "scheduled" },
  { id: 2, title: "What To Do After Getting A Speeding Ticket", type: "Service Content", date: "Aug 15, 2026", status: "draft" },
  { id: 3, title: "Stunt Driving FAQ", type: "FAQ", date: "Aug 18, 2026", status: "draft" },
];

let settings = {
  businessName: business.name,
  phone: "+1 (416) 555-0148",
  website: "https://bridgelegal.ca",
  address: "120 Adelaide St W, Toronto, ON M5H 1T1",
  category: "Paralegal",
  services: "Traffic tickets, speeding tickets, careless driving, stunt driving defence",
  notifications: { newReview: true, rankingChanges: true, citationIssues: true, monthlyReport: true, competitorAlerts: false },
};

const assistantAnswers: Record<string, string> = {
  "why did my visibility score change": "Your score is up 6.4% this month because review velocity improved, three priority keywords moved up, and your Google Business Profile remained 92% complete.",
  "what should i fix first": "Start with the BBB phone mismatch. It is a high-confidence citation issue and fixing it will remove one of the only remaining inconsistencies in your profile.",
  "which competitor is strongest": "Competitor A is strongest overall by visibility and review volume, while Bridge Legal Services still leads on rating quality at 4.9.",
  "where am i losing visibility": "The largest gaps are review volume versus Competitor A and coverage for Stunt Driving and Careless Driving terms in the Toronto area.",
  "what should i do this month": "Resolve the two citation mismatches, request reviews from recent customers, and publish the two drafted service-content pieces.",
};

function nextId(items: Array<{ id: number }>): number {
  return Math.max(...items.map((item) => item.id), 0) + 1;
}

router.get("/dashboard", (_req, res) => {
  const data = {
    business,
    visibilityScore: 87,
    visibilityChange: 6.4,
    rating: 4.9,
    reviewCount: 76,
    listingHealthy: 46,
    listingTotal: 50,
    keywordsImproving: 12,
    trend: [
      { month: "Mar", score: 71 }, { month: "Apr", score: 74 }, { month: "May", score: 78 },
      { month: "Jun", score: 81 }, { month: "Jul", score: 84 }, { month: "Aug", score: 87 },
    ],
    profileHealth: [
      { label: "Google Business Profile", value: 92 }, { label: "Citations", value: 92 },
      { label: "Reviews", value: 95 }, { label: "Keyword Visibility", value: 78 }, { label: "Competitor Position", value: 81 },
    ],
    recentReviews: reviews.slice(0, 3),
    recommendations: recommendations.slice(0, 3),
    tasks: tasks.filter((task) => task.status !== "completed").slice(0, 4),
  };
  res.json(GetDashboardResponse.parse(data));
});

router.get("/listings", (_req, res) => res.json(GetListingsResponse.parse(listings)));
router.get("/reviews", (_req, res) => res.json(GetReviewsResponse.parse(reviews)));

router.post("/reviews/:id/response", (req, res) => {
  const params = RespondToReviewParams.parse({ id: Number(req.params.id) });
  const body = RespondToReviewBody.parse(req.body);
  const review = reviews.find((item) => item.id === params.id);
  if (!review) {
    res.status(404).json({ error: "Review not found" });
    return;
  }
  review.responded = body.response.trim().length > 0;
  res.json(RespondToReviewResponse.parse(review));
});

router.get("/rankings", (_req, res) => res.json(GetRankingsResponse.parse(rankings)));
router.get("/competitors", (_req, res) => res.json(GetCompetitorsResponse.parse(competitors)));
router.get("/content", (_req, res) => res.json(GetContentItemsResponse.parse(contentItems)));

router.post("/content", (req, res) => {
  const body = CreateContentItemBody.parse(req.body);
  const item = { id: nextId(contentItems), title: body.title, type: body.type, date: body.date ?? "Not scheduled", status: "draft" as const };
  contentItems = [item, ...contentItems];
  res.status(201).json(CreateContentItemResponse.parse(item));
});

router.get("/recommendations", (_req, res) => res.json(GetRecommendationsResponse.parse(recommendations)));

router.post("/recommendations/ask", (req, res) => {
  const body = AskRecommendationBody.parse(req.body);
  const normalized = body.question.trim().toLowerCase();
  const match = Object.keys(assistantAnswers).find((key) => normalized.includes(key));
  const answer = match ? assistantAnswers[match] : "Based on your current profile, prioritize the BBB phone mismatch, then focus on review velocity and the two drafted local service pages. Those actions have the clearest path to measurable improvement.";
  res.json(AskRecommendationResponse.parse({ question: body.question, answer }));
});

router.get("/tasks", (_req, res) => res.json(GetTasksResponse.parse(tasks)));

router.post("/tasks", (req, res) => {
  const body = CreateTaskBody.parse(req.body);
  const task = { id: nextId(tasks), title: body.title, priority: body.priority, dueDate: body.dueDate, status: "todo" as const };
  tasks = [...tasks, task];
  res.status(201).json(CreateTaskResponse.parse(task));
});

router.patch("/tasks/:id", (req, res) => {
  const params = UpdateTaskParams.parse({ id: Number(req.params.id) });
  const body = UpdateTaskBody.parse(req.body);
  const task = tasks.find((item) => item.id === params.id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  if (body.status) task.status = body.status;
  res.json(UpdateTaskResponse.parse(task));
});

router.get("/settings", (_req, res) => res.json(GetSettingsResponse.parse(settings)));

router.patch("/settings", (req, res) => {
  const body = UpdateSettingsBody.parse(req.body);
  settings = {
    ...settings,
    ...body,
    notifications: { ...settings.notifications, ...(body.notifications ?? {}) },
  };
  res.json(UpdateSettingsResponse.parse(settings));
});

router.get("/billing", (_req, res) => res.json(GetBillingResponse.parse({
  plan: "LOCAL PRO",
  price: 299,
  currency: "CAD",
  status: "Active",
  nextBilling: "September 10, 2026",
  included: ["50+ Business Listings", "Google Profile Monitoring", "Review Monitoring", "Review Outreach", "20 Keyword Tracking", "Competitor Monitoring", "AI Recommendations", "Monthly Reports", "Dashboard", "Support"],
})));

router.post("/support", (req, res) => {
  const body = CreateSupportRequestBody.parse(req.body);
  const request = { id: Date.now(), subject: body.subject, message: body.message, status: "Open" };
  res.status(201).json(CreateSupportRequestResponse.parse(request));
});

export default router;