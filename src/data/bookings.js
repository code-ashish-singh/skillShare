export const seekerBookings = [
  { id: "BK001", provider: { name: "Alex Morgan", avatar: "https://i.pravatar.cc/80?img=11", skill: "Full Stack Web Development" }, plan: "Standard", amount: 149, date: "2024-11-15", status: "Completed", deliveryDate: "2024-11-22" },
  { id: "BK002", provider: { name: "Priya Sharma", avatar: "https://i.pravatar.cc/80?img=5", skill: "UI/UX Design" }, plan: "Premium", amount: 299, date: "2024-11-20", status: "Ongoing", deliveryDate: "2024-12-02" },
  { id: "BK003", provider: { name: "Elena Vasquez", avatar: "https://i.pravatar.cc/80?img=9", skill: "Graphic Design" }, plan: "Basic", amount: 25, date: "2024-11-25", status: "Pending", deliveryDate: "2024-11-26" },
  { id: "BK004", provider: { name: "Marcus Johnson", avatar: "https://i.pravatar.cc/80?img=15", skill: "Mobile App Development" }, plan: "Standard", amount: 199, date: "2024-10-10", status: "Completed", deliveryDate: "2024-10-24" },
  { id: "BK005", provider: { name: "James Park", avatar: "https://i.pravatar.cc/80?img=18", skill: "Content Writing & SEO" }, plan: "Basic", amount: 15, date: "2024-11-28", status: "Cancelled", deliveryDate: "2024-11-29" },
];

export const providerBookings = [
  { id: "PBK001", seeker: { name: "Michael Torres", avatar: "https://i.pravatar.cc/80?img=33" }, plan: "Standard", amount: 149, date: "2024-11-20", status: "Pending", service: "E-commerce Website" },
  { id: "PBK002", seeker: { name: "Lisa Richardson", avatar: "https://i.pravatar.cc/80?img=23" }, plan: "Premium", amount: 349, date: "2024-11-18", status: "Accepted", service: "Full Web App" },
  { id: "PBK003", seeker: { name: "David Kim", avatar: "https://i.pravatar.cc/80?img=42" }, plan: "Basic", amount: 49, date: "2024-11-10", status: "Completed", service: "Landing Page" },
  { id: "PBK004", seeker: { name: "Anna Williams", avatar: "https://i.pravatar.cc/80?img=47" }, plan: "Standard", amount: 149, date: "2024-10-25", status: "Completed", service: "Portfolio Website" },
  { id: "PBK005", seeker: { name: "Chris Miller", avatar: "https://i.pravatar.cc/80?img=55" }, plan: "Premium", amount: 349, date: "2024-11-22", status: "Pending", service: "SaaS Dashboard" },
];

export const providerSkills = [
  { id: 1, name: "React Development", category: "Web Development", experience: "5 years", level: "Expert", projects: 42 },
  { id: 2, name: "Node.js & Express", category: "Backend", experience: "4 years", level: "Expert", projects: 38 },
  { id: 3, name: "PostgreSQL", category: "Database", experience: "4 years", level: "Advanced", projects: 30 },
  { id: 4, name: "AWS & DevOps", category: "Cloud", experience: "3 years", level: "Advanced", projects: 15 },
  { id: 5, name: "TypeScript", category: "Language", experience: "3 years", level: "Expert", projects: 28 },
];
