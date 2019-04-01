# Parses json for "was_tagged" value, if equal to 1. "is_tagged" = 1
import json


def jsontagged(jsoninput):
    parsedjson = json.loads(jsoninput)  # Converts from json to data
    playername = list(parsedjson.keys())  # Player username the first key of dictionary
    playerdata = list(parsedjson.values())[0]  # Player data from the first value of the dictionary
    if playerdata["was_tagged"] == 1:  # If was tagged is set to 1
        playerdata["is_tagged"] = 1  # Set is tagged to 1.

    fileread = open('../../saveState.json', 'r')  # open the saveState.json file
    saveStateFile = json.loads(fileread.read())  # Parses the file to data
    saveStateList = saveStateFile["saveState"]
    localsaveStateList = saveStateList
    playerExist = False
    for storedPlayer in localsaveStateList:  # Player from list of saved players
        storedPlayername = list(storedPlayer.keys())  # Player name from player data
        if storedPlayername == playername:  # if player is found in saved file
            list(storedPlayer.values())[0]["was_tagged"] = playerdata["was_tagged"]  # change the local version of the file to match input json
            list(storedPlayer.values())[0]["is_tagged"] = playerdata["is_tagged"]  # change the local version of the file to match input json
            playerExist = True
    if playerExist == False:  # if player doesnt exist in the list of saved players
        localsaveStateList.append(parsedjson)  # append the player data to the list
    saveStateFile["saveState"] = localsaveStateList  # updates the savestate dictionary value
    finalWrite = json.dumps(saveStateFile)  # converts entire modified file to json
    filewrite = open('../../saveState.json', "w")  # opens saveState.json file again in write mode
    filewrite.write(finalWrite)  # rewrites the file
    return json.dumps(parsedjson)

  # =============== READ ME =============== READ ME =============== READ ME =============== READ ME ===============
  # =============== READ ME =============== READ ME =============== READ ME =============== READ ME ===============
  # This return value is temporary for the lab demo on March 8th, due to the nature of the function, this is how its tested
  # For the demo the return will be the player data modified.
  # After the demo there is no return, as it modifies the output to a file.

# Test Function.
'''
testPlayerData = '{"AHHHH": {"is_tagged": 0, "was_tagged": 0}}'
print(jsontagged(testPlayerData))
'''