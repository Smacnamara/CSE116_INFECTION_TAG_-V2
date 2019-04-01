import unittest
import json
import sys
sys.path.insert(0, "src/backend/end_game") # Adds higher directory to python modules path.
import jsongameends


class TaggedTests(unittest.TestCase):
    def basictest(self): #Everyone is tagged
        input = '{"saveState": [{"PLAYERTEST": {"is_tagged": 1, "was_tagged": 1}}, {"EpicGamer420": {"is_tagged": 1, "was_tagged": 1}}], "game_end": 0}'
        output = '{"saveState": [{"PLAYERTEST": {"is_tagged": 1, "was_tagged": 1}}, {"EpicGamer420": {"is_tagged": 1, "was_tagged": 1}}], "game_end": 1}'
        self.assertEqual(output, jsongameends.jsongameends(input))

    def basictest2(self): #Some players are tagged
        input = '{"saveState": [{"PLAYERTEST": {"is_tagged": 1, "was_tagged": 1}}, {"EpicGamer420": {"is_tagged": 0, "was_tagged": 0}}], "game_end": 0}'
        output = '{"saveState": [{"PLAYERTEST": {"is_tagged": 1, "was_tagged": 1}}, {"EpicGamer420": {"is_tagged": 0, "was_tagged": 0}}], "game_end": 0}'
        self.assertEqual(output, jsongameends.jsongameends(input))

    def basictest3(self): #Noone is tagged
        input = '{"saveState": [{"PLAYERTEST": {"is_tagged": 0, "was_tagged": 0}}, {"EpicGamer420": {"is_tagged": 0, "was_tagged": 0}}], "game_end": 0}'
        output = '{"saveState": [{"PLAYERTEST": {"is_tagged": 0, "was_tagged": 0}}, {"EpicGamer420": {"is_tagged": 0, "was_tagged": 0}}], "game_end": 0}'
        self.assertEqual(output, jsongameends.jsongameends(input))


if __name__ == "__main__":
    unittest.main()
