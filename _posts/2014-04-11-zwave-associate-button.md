---
layout: post
title:  "Hardware button and LED to control association in wireless networks"
date:   2014-04-11 17:00:00
categories: news
---

Almost all wireless technologies use some kind of association process to enable devices to join the network. Such a process is typically initiated by pressing a button on the network controller and by subsequently pressing another button on the device to associate.

Software gateways, like Dog, cannot naturally support this press-and-join interaction and the association process is usually initiated by software (e.g., using an app).
In this post we present a really simple design for adding a push-button and a LED to a RaspberryPi running Dog and we show how to control the gateway association through them, using a very simple Python script.

The button and LED circuit uses the Raspberry Pi GPIO ports to respectively drive the LED, through a BC337 transistor used as switch, and to read the button position. Figure below shows the corresponding circuit and resistors' values.

<img src="/assets/img/pictures/schematic.png"/>


Instead, the resulting circuit and its connection to the Raspberry Pi is shown below.

<img src="/assets/img/pictures/associate_button.jpg"/>

<img src="/assets/img/pictures/pi_associate_button.jpg"/>

The script for checking the GPIO input, and sending the "associate" command is really simple and can be [downloaded](https://gist.github.com/dbonino/10271299) as a gist from GitHub (see below for the core code).

	'''
	Created on Apr 4, 2014
	 
	@author: bonino
	 
	Copyright (c) 2014 Dario Bonino 
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	 
	http://www.apache.org/licenses/LICENSE-2.0
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License
	'''
	import rest,time, RPi.GPIO as GPIO
	 
	def button_to_gw (RCpin):
		# the base url
		base_url = 'http://localhost:8080/api/v1/'
		# gateway URL
		gw_associate_url = base_url+'devices/zwave-gateway/commands/associate'
		gw_state_url = base_url+'devices/zwave-gateway/status'
		# request body
		body = '{}'
	 
		#setup the gpio output
		GPIO.setmode(GPIO.BOARD)
		GPIO.setup(RCpin, GPIO.IN)
		GPIO.setup(18,GPIO.OUT)
	 
		# This takes about 1 millisecond per loop cycle
		status = 'idle'
		while (True):
	 
			status = rest.send(url=gw_state_url)
			print status
			if status['status']['DeviceAssociationState'][0]['value'] == 'associating':
				GPIO.output(18,GPIO.HIGH)
			else:
				GPIO.output(18,GPIO.LOW)
			if(GPIO.input(RCpin) == False):
				try:
					rest.send('PUT', gw_associate_url, body, { 'Content-Type':'application/json' })
					print 'sending associate'
				except:
					pass
	 
			time.sleep(0.1)
			return
	 
	if __name__ == '__main__':
		button_to_gw(22)