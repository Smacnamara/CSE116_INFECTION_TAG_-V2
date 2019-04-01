import unittest
import json
import sys
sys.path.insert(0, "src/backend/player_name_input") # Adds higher directory to python modules path.
import jsonplayername

#Function tests the sending of json of playername, then returns as a string.
class PlayerNameTests(unittest.TestCase):
    def basictest(self):
        input = json.dumps("username")
        self.assertEqual("username", jsonplayername.jsonplayername(input))

    def basictest2(self):
        input = json.dumps("A2h4j4h29jkdjnfdg")
        self.assertEqual("A2h4j4h29jkdjnfdg", jsonplayername.jsonplayername(input))


if __name__ == "__main__":
    unittest.main()
