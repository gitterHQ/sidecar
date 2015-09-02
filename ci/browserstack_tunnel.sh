#!/bin/bash

if [[ "$1" == "stop" ]]
then
  echo "Stopping browserstack tunnel..."
  killall BrowserStackLocal
  exit
fi

if [[ ! -e browserstack ]]
then
  echo "Downloading browserstack tunnel..."
  mkdir -p browserstack
  curl https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip > browserstack/BrowserStackLocal-linux-x64.zip
  cd browserstack && unzip BrowserStackLocal-linux-x64.zip && chmod a+x BrowserStackLocal
  cd ..
fi

echo "Browserstack tunnel ready..."
