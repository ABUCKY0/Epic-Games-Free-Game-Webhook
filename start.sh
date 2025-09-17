#!/bin/bash

# Default interval in minutes if not set
INTERVAL_MINUTES="${INTERVAL_MINUTES:-10}"

while true; do
  node index.js
  sleep $((INTERVAL_MINUTES * 60))
done