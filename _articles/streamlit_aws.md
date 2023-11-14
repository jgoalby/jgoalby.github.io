---
layout: default
title: "Running Streamlit Apps in AWS EC2"
date: 2023-10-31
---

# AWS EC2 Instance Running Streamlit Using an iPad

## Key Pair

First step is to create a key pair so your iPad can SSH into your EC2 instance.
- Search for "EC2" and then click Key pairs.
- Create a key pair as a .pem file and save the file somewhere you can remember as you will need it again. Also give it a good name so you can remember what it is later.

## iPad SSH Client

It appears terminus has gone subscription, so I recommend Shelly instead which has a single inexpensive purchase option for more functionality. You can use the trial version.
- <https://apps.apple.com/us/app/shelly-ssh-client/id989642999>

Create a new connection, go to settings, click Key file, and go through the steps to import the .pem file you saved previously.

## Launch an Instance

Go to the EC2 page, and go to instances. Select launch an instance.
- Pick Ubuntu free tier.
- Pick t2.micro free tier.
- Select the key pair you created earlier.
- Network settings, edit
- Add security group rule
- Port range 8501
- Source 0.0.0.0
- Launch instance
- Copy the Public DNS(IPv4) address as that is the server you connect to in Shelly

## iPad SSH Client Continued

- Finish setting up the connection using ubuntu as username
- Use the public DNS value from above for the host
- You should be able to connect now and go to the next step

## Installing Miniconda

- sudo apt-get update
- Check your python version and get the following for your version
- wget https://repo.anaconda.com/miniconda/Miniconda3-py310_22.11.1-1-Linux-x86_64.sh
- sudo chmod +x Miniconda3-py310_22.11.1-1-Linux-x86_64.sh
- bash Miniconda3-py310_22.11.1-1-Linux-x86_64.sh
- export PATH=/home/ubuntu/miniconda3/bin/:$PATH
- pip install streamlit
- pip install plotly_express
- git clone https://github.com/MLWhiz/streamlit_football_demo.git
- cd streamlit_football_demo
- streamlit run helloworld.py
- Note the External URL in the output from the streamlit command
- Go to the external URL in a browser, which should be at port 8501

## Tmux installing and running and detaching

- sudo apt-get install tmux
- tmux new -s StreamlitSession
- streamlit run helloworld.py
- CTRL-B then d (without keeping down CTRL)

## Tmux attaching and killing

- tmux attach -t StreamlitSession
- ps aux \| grep streamlit
- Kill -9 nnn
