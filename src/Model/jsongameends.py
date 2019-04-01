# Parses player data to see if every player is tagged, is set the game end variable to 1. E
import json


def jsongameends():
    fileread = open('../../saveState.json', 'r')  # open the saveState.json file
    saveStateFile = json.loads(fileread.read())  # Parses the file to data
    saveStateList = saveStateFile["saveState"]
    localsaveStateList = saveStateList

    numberofplayers = len(localsaveStateList)  # Number of players in the game, based on length of list of "saveState"
    taggedcount = 0  # Count of how many players are tagged.
    for player in localsaveStateList:  # for each player in playerdata list "saveState"
        if list(player.values())[0]["is_tagged"] == 1:  # if that player has "is_tagged" set to 1
            taggedcount += 1  # add 1 to tagged count.
    if taggedcount == numberofplayers:  # if tagged count is equal to number of players, so all players are tagged.
        saveStateFile["game_end"] = 1  # set "game_end" to 1
    finalWrite = json.dumps(saveStateFile)  # converts entire modified file to json
    filewrite = open('../../saveState.json', "w")  # opens saveState.json file again in write mode
    filewrite.write(finalWrite)  # rewrites the file
    return finalWrite

# =============== READ ME =============== READ ME =============== READ ME =============== READ ME ===============
# =============== READ ME =============== READ ME =============== READ ME =============== READ ME ===============
# This return value is temporary for the lab demo on March 8th, due to the nature of the function, this is how its tested
# For the demo the return will be the player data modified.
# After the demo there is no return, as it modifies the output to a file.

# Test Function
'''
testInput = '{"saveState": [{"user_name": {"is_tagged": 1, "was_tagged": 0}}, {"KENusernameTEST": {"is_tagged": 1, "was_tagged": 0}}, {"OTHERPLAYER": {"is_tagged": 1, "was_tagged": 0}}], "game_end": 0}'
print(jsongameends())
'''
