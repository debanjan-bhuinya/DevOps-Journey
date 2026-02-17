#!/bin/bash

# ------------------------------
# CONFIGURATION
# ------------------------------
set -e
set -u
set -o pipefail


CPU_THRESHOLD=80
MEM_THRESHOLD=80
DISK_THRESHOLD=80

LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/server_health.log"

# ------------------------------
# SETUP
mkdir -p "$LOG_DIR"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# ------------------------------

# Create logs directory if not exists


# Get timestamp


# ------------------------------
# FUNCTIONS
# ------------------------------

check_cpu() {
 local timestamp
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  
 CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8}' | cut -d. -f1)

    echo "$TIMESTAMP - CPU Usage: $CPU_USAGE%" >> "$LOG_FILE"

    if [ "$CPU_USAGE" -gt "$CPU_THRESHOLD" ]; then
        echo "$TIMESTAMP - WARNING: CPU usage exceeded threshold!" >> "$LOG_FILE"
        EXIT_STATUS=1
    fi
}


check_memory() {
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    MEM_USAGE=$(free | awk '/Mem:/ {printf("%.0f"), $3/$2 * 100}')

    echo "$TIMESTAMP - Memory Usage: $MEM_USAGE%" >> "$LOG_FILE"

    if [ "$MEM_USAGE" -gt "$MEM_THRESHOLD" ]; then
        echo "$TIMESTAMP - WARNING: Memory usage exceeded threshold!" >> "$LOG_FILE"
        EXIT_STATUS=1
    fi
}


check_disk() {
    local timestamp
     timestamp=$(date '+%Y-%m-%d %H:%M:%S')

     DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | cut -d'%' -f1)

    echo "$TIMESTAMP - Disk Usage: $DISK_USAGE%" >> "$LOG_FILE"

    if [ "$DISK_USAGE" -gt "$DISK_THRESHOLD" ]; then
        echo "$TIMESTAMP - WARNING: Disk usage exceeded threshold!" >> "$LOG_FILE"
        EXIT_STATUS=1
    fi
}


# ------------------------------
# MAIN
# ------------------------------

EXIT_STATUS=0

check_cpu
check_memory
check_disk

exit $EXIT_STATUS
