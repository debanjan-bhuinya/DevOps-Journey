# Day 94: The Black Box (Log Aggregation with Loki & Promtail) 📦🕵️‍♂️

Today, I engineered a centralized log aggregation pipeline, eliminating the need to manually query individual Docker containers for debugging data.

### **Today's Achievements:**
1. **Agent Deployment:** Configured and deployed `Promtail` with direct access to the `docker.sock`, enabling it to scrape stdout/stderr logs from all running containers in the fleet.
2. **Cutting-Edge Database:** Successfully resolved a major version-breaking change by writing a modern `v13` `tsdb` configuration for the newly released `Loki 3.0` log database.
3. **Grafana Integration:** Linked the Loki database to Grafana, establishing a centralized "Explore" interface to query, filter, and stream live logs using LogQL.
4. **Label Mapping:** Implemented regex relabeling in Promtail to automatically tag incoming logs with their specific `__meta_docker_container_name`, making the logs instantly searchable by microservice.

The platform now possesses a fully searchable, real-time audit trail for every component in the architecture.
