# Parses json for playername, returns name.
import json

def jsonplayername(jsoninput):
    parsedjson = json.loads(jsoninput)
    if len(parsedjson["player_name"]):
        return parsedjson["player_name"]
    else:
        return "Error: Name must have at least 1 char"
        


# Test Function.
'''
testinput = '{ "player_name": "(player_inputted_username)" }'
 print(jsonplayername(testinput))
'''