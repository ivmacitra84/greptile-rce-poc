#!/bin/sh
id; uname -a; cat /proc/self/status | grep -i cap; cat /proc/1/cgroup; mount; ls -la /sys/fs/cgroup; ls -la /var/run/docker.sock
