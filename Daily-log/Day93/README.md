# Day 93: The Control Room (Prometheus & Grafana) 📈📡

Today, I engineered a complete observability and monitoring stack for the Autonomous Auditor, providing real-time telemetry for the entire Docker environment.

### **Today's Achievements:**
1. **Metrics Collection:** Deployed Google's `cAdvisor` to hook directly into the Linux Kernel's cgroups, extracting raw CPU, memory, and network statistics from the running containers.
2. **Time-Series Database:** Configured and launched `Prometheus` to act as the central scraping engine, pulling and storing telemetry data every 5 seconds.
3. **Data Visualization:** Deployed `Grafana` on a dedicated port (3001) to prevent collisions with Next.js, and successfully linked it to the Prometheus data source via Docker's internal DNS network.
4. **Custom PromQL Dashboards:** Bypassed broken legacy community templates by writing custom `PromQL` queries (e.g., `sum by (name) (container_memory_usage_bytes{name=~"auditor-.*"})`) to build a bespoke, highly accurate memory tracking dashboard.

The platform is now fully observable, transitioning me from reactive debugging to proactive monitoring.
