#!/bin/bash

echo "Script started at $(date)" > /var/www/automation-testing/web/test_output.txt # Log the start time

cd /var/www/automation-testing # Go to root directory

npm run wdio:testing >> /var/www/automation-testing/web/test_output.txt 2>&1 # Append output and errors to the log (if enabled)

echo ""

