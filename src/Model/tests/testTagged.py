import unittest
import json
import sys
sys.path.insert(0, "src/backend/gets_tagged") # Adds higher directory to python modules path.
import jsontagged


class TaggedTests(unittest.TestCase):
    def basictest(self): #Newly tagged player
        input = '{"PLAYERTEST": {"is_tagged": 0, "was_tagged": 1}}'
        output = '{"PLAYERTEST": {"is_tagged": 1, "was_tagged": 1}}'
        self.assertEqual(output, jsontagged.jsontagged(input))

    def basictest2(self): #Already Tagged Player
        input = '{"EpicGamer420": {"is_tagged": 1, "was_tagged": 1}}'
        output = '{"EpicGamer420": {"is_tagged": 1, "was_tagged": 1}}'
        self.assertEqual(output, jsontagged.jsontagged(input))

    def basictest3(self): #Not Tagged Player
        input = json.dumps('{"RegularName69": {"is_tagged": 0, "was_tagged": 0}}')
        output = json.dumps('{"RegularName69": {"is_tagged": 0, "was_tagged": 0}}')
        self.assertEqual(output, jsontagged.jsontagged(input))


if __name__ == "__main__":
    unittest.main()
