#!/bin/bash

session="yDown"

tmux new-session -d -s $session
tmux split-window 'cd backend;npm start'
tmux split-window 'cd frontend;npm start'
tmux select-layout tiled

tmux new-window -t $session -n "mongo" "mongod --dbpath ~/.config/mongodb/db"

