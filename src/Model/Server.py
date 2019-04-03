import os

import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket

import jsongameends
import jsontagged
import jsonplayername

from tornado.options import define, options

define("port", default= 8888, help = "port to run server on", type=int)

class MainHandler(tornado.web.RequestHandler):    # these calsses define what is done at what path on the server
    def get(self):
        self.write("hello world")

class homeHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(r'src\backend\frontend\HTML\homePage.html')

class gameHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(r'src\backend\frontend\HTML\gamePage.html')

class UserNameHandler(tornado.web.RequestHandler):
    content_return = ""
    
    def get(self):
        print("got")

    def post(self):
        content = self.request.body
        return jsonplayername.jsonplayername(content)

'''
class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print("websocket opened by " + self)

    def on_message(self, message):
        gets_tagged.jsontagged.jsontagged(message)
        end_game.jsongameends.jsongameends()
        self.write("src/saveState.json")
        self.write("eat ass")

    def on_close(self):
        print("websocket closed")
'''

settings = {
    "template_path": r"src\backend\frontend\HTML",
    "static_path": r"src\backend\frontend\HTML\Static"
}

print(os.path.join(settings["template_path"], "homePage"))

def make_app():
    return tornado.web.Application([            #these are all the server paths, the class written next to them defines what will happen when that path is pinged
        (r"/HelloWorld", MainHandler),
        (r"/", homeHandler),
        (r"/home/zombie", tornado.web.StaticFileHandler, dict(path = os.path.join(settings["static_path"], 'zombieImage'))),
        #(r"/about", tornado.web.StaticFileHandler, dict(path = os.path.join(settings["static_path"], "aboutPage"))),
        (r"/game", gameHandler),
        #(r"/websocket", WebSocketHandler),
    ], **settings)

if __name__ == "__main__":                      #actually starts the server when the code is run, to view run the server and in your browser type localhost:8888
    tornado.options.parse_command_line
    app = make_app()
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()