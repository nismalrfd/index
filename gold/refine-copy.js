const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
    // HRMS
    ['Manage employees, departments, attendance, and performance.', 'Elevate staff management with seamless oversight of your teams, performance, and boutique operations.'],
    // Payroll
    ['Fast, accurate & fully automated salary calculations.', 'Flawless, automated compensation management ensuring precise payroll execution.'],
    // Marketing
    ['Smart campaigns & personalized communication.', 'Orchestrate bespoke marketing campaigns and deliver highly personalized client communications.'],
    // AI Analytics
    ['Transform data into actionable insights instantly.', 'Distill complex enterprise data into immediately actionable, visionary insights.'],
    // Internal Communication
    ['Enable smooth collaboration across departments.', 'Foster seamless, secure collaboration across all echelons of your organization.'],
    // Zoho Workplace
    ['Enterprise-grade productivity tools unified.', 'A unified, enterprise-grade suite of elite productivity tools.'],
    // CRM
    ['Build long-term customer relationships and tracking.', 'Cultivate enduring, high-net-worth client relationships with sophisticated engagement tools.'],
    // Mobile Apps
    ['Business in your pocket for Android & iOS.', 'Command your global enterprise from anywhere with our flawless mobile ecosystem.'],
    // eCommerce
    ['Sell online instantly, synced with your ERP.', 'Deploy a luxurious digital storefront, perfectly synchronized with your backend ERP.'],
    // Pro Web
    ['Premium digital presence and store locator.', 'Establish an immaculate digital presence and seamless global boutique locator.'],
    // AI Business Assistant
    ['Intelligent 24/7 support for customers and staff, powered by predictive models.', 'Provide sophisticated, 24/7 intelligent support driven by state-of-the-art predictive AI models.'],
    // Security & Scalability
    ['Enterprise-level protection built for infinite growth and 99.9% uptime.', 'Uncompromising enterprise-grade protection, engineered for infinite scalability and flawless uptime.'],
    // Top glass cards minor tweaks
    ['Our AI continuously analyzes your business data to forecast sales trends, inventory demand, customer behavior, and operational risks helping you make smarter decisions before opportunities are lost.', 'Our AI continuously analyzes your enterprise data to forecast sales trends, inventory demand, and client behavior, empowering you to make brilliant decisions before opportunities are lost.'],
    ['Every number tells a story. AI converts raw business data into strategic insights that drive revenue, efficiency, and smarter operations.', 'Every number tells a story. Our AI converts raw operational data into strategic insights that drive revenue, flawless efficiency, and elite operations.'],
    ['Stay One Step Ahead of the Market. While others rely on yesterday’s reports, your business is guided by tomorrow’s insights. Identify growth opportunities, reduce risks, and outperform competitors with predictive intelligence.', 'Stay One Step Ahead of the Market. While others rely on yesterday’s reports, your enterprise is guided by tomorrow’s insights. Identify growth opportunities, mitigate risks, and outperform competitors with predictive intelligence.']
];

replacements.forEach(([oldText, newText]) => {
    // Escape regex characters just in case, but string replace is safer if exact
    html = html.replace(oldText, newText);
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Phase 2 Execution complete: Copywriting refined for premium tone.');
