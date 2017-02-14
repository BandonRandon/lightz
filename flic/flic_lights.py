#!/usr/bin/env python3

# Test Client application.
#
# This program attempts to connect to all previously verified Flic buttons by this server.
# Once connected, it prints Down and Up when a button is pressed or released.
# It also monitors when new buttons are verified and connects to them as well. For example, run this program and at the same time the s$

import fliclib
import requests

client = fliclib.FlicClient("localhost")
seeedAccessToken = "YOUR_SEEED_ACCESS_TOKEN" //replace with your token
seeedAPIServer = "https://us.wio.seeed.io/v1/node/GroveRelay" // replace with your API Server

def got_button(bd_addr):
        cc = fliclib.ButtonConnectionChannel(bd_addr)
        cc.on_button_single_or_double_click_or_hold = hueActions
        client.add_connection_channel(cc)

def got_info(items):
        #print(items)
        for bd_addr in items["bd_addr_of_verified_buttons"]:
                got_button(bd_addr)

def seeedAction(status, seedAPIServer, seeedAccessToken):
        1 if status == "on" else 0
        r = requests.post(seeedAPIServer + "D0/onoff/" + status + "/?access_token=" + seeedAccessToken)
        print(r.status_code, r.reason)

def hueActions(channel, click_type, was_queued, time_diff):
        if (str(click_type)  == "ClickType.ButtonSingleClick"):
                print ("Single")
                seeedAction("on", seeedAPIServer, seeedAccessToken)

        elif (str(click_type) == "ClickType.ButtonDoubleClick"):
                print ("Double")
                seeedAction("on", seeedAPIServer, seeedAccessToken)

        elif (str(click_type) == "ClickType.ButtonHold"):
                print ("Hold")


client.get_info(got_info)

client.on_new_verified_button = got_button

client.handle_events()
